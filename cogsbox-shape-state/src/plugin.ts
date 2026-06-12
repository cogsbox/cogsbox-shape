import { createPluginContext } from "cogsbox-state";
import { z } from "zod";

/** Minimal shape of a createSchemaBox entry — matches journalSchemaBox.journalTechnical etc. */
export type ShapeRefineInfo = {
  fieldToGroup: Record<string, number[]>;
  groups: { deps: string[] | null }[];
};

export type ShapeSchemaBoxEntry = {
  /** Field-key → value map from DeriveStateType (not z.infer on a flattened client object). */
  stateType: Record<string, unknown>;
  generateDefaults: () => unknown;
  schemas: {
    client: z.ZodTypeAny;
  };
  refineInfo?: ShapeRefineInfo;
};

export type ShapeSchemaBox = Record<string, ShapeSchemaBoxEntry>;

/** Per-box-key state: each entry's field keys stay typed via stateType. */
export type InferShapeBoxState<TBox extends ShapeSchemaBox> = {
  [K in keyof TBox]: TBox[K]["stateType"];
};

type TransformStateParams = {
  stateKey: string;
  setOptions: (options: {
    validation?: {
      zodSchemaV4?: z.ZodTypeAny;
      onBlur?: "error" | "warning";
    };
  }) => void;
};

type FormUpdateParams = {
  stateKey: string;
  path: string[];
  event: { activityType: string };
  getState: () => unknown;
  addZodErrors: (
    errors: Array<{ path: string[]; message: string; code?: string }>,
  ) => void;
};

function mapZodIssues(
  issues: ReadonlyArray<{
    path: ReadonlyArray<PropertyKey>;
    message: string;
    code?: string;
  }>,
) {
  return issues.map((issue) => ({
    path: issue.path.map(String),
    message: issue.message,
    code: issue.code,
  }));
}

function getRelatedFields(
  entry: ShapeSchemaBoxEntry,
  field: string,
): Set<string> | null {
  const groupIndexes = entry.refineInfo?.fieldToGroup[field];
  if (!groupIndexes?.length) return null;

  const related = new Set<string>([field]);
  for (const index of groupIndexes) {
    const deps = entry.refineInfo?.groups[index]?.deps;
    if (!deps) continue;
    for (const dep of deps) related.add(dep);
  }

  return related;
}

export function wireShapeValidationOptions(
  box: ShapeSchemaBox,
  params: TransformStateParams,
): void {
  const entry = box[params.stateKey];
  if (!entry) return;

  params.setOptions({
    validation: {
      zodSchemaV4: entry.schemas.client,
      onBlur: "error",
    },
  });
}

/** Cross-field refine errors only — field rules are handled by state via setOptions. */
export function validateShapeRefines(
  box: ShapeSchemaBox,
  params: FormUpdateParams,
): void {
  if (params.event.activityType !== "blur") return;

  const entry = box[params.stateKey];
  const clientSchema = entry?.schemas.client;
  if (!entry || !clientSchema) return;

  const field = params.path.at(-1);
  if (!field) return;

  const relatedFields = getRelatedFields(entry, field);
  if (!relatedFields) return;

  const result = clientSchema.safeParse(params.getState());
  if (result.success) return;

  const issues = result.error.issues.filter((issue) =>
    relatedFields.has(String(issue.path[0])),
  );

  if (issues.length > 0) {
    params.addZodErrors(mapZodIssues(issues));
  }
}

function buildInitialState<TBox extends ShapeSchemaBox>(
  box: TBox,
): InferShapeBoxState<TBox> {
  const state = {} as InferShapeBoxState<TBox>;
  for (const key of Object.keys(box) as Array<keyof TBox & string>) {
    const entry = box[key];
    if (!entry) continue;
    state[key] =
      entry.generateDefaults() as InferShapeBoxState<TBox>[typeof key];
  }
  return state;
}

const { createPlugin } = createPluginContext({
  options: z.object({
    logs: z.boolean().optional(),
  }),
});

export function createShapePlugin<const TBox extends ShapeSchemaBox>(
  box: TBox,
) {
  return createPlugin("shape")
    .initialState((): InferShapeBoxState<TBox> => buildInitialState(box))
    .transformState((params) => wireShapeValidationOptions(box, params))
    .onFormUpdate((params) => {
      if (params.options?.logs) {
        console.log(
          "[shape]",
          params.stateKey,
          params.path,
          params.event.activityType,
        );
      }
      validateShapeRefines(box, params);
    });
}
