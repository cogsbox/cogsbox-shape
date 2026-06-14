import { createPluginContext, getGlobalStore } from "cogsbox-state";
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
  validators?: {
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
  event: { activityType: string; details?: Record<string, unknown> };
  getState: () => unknown;
  addZodErrors: (
    errors: Array<{ path: string[]; message: string; code?: string }>,
  ) => void;
  clearZodErrors?: (paths: string[][]) => void;
};

function pathKey(path: string[]) {
  return path.join("\0");
}

function resolveRelatedPaths(
  blurPath: string[],
  relatedFields: Set<string>,
): string[][] {
  const parent = blurPath.slice(0, -1);
  return [...relatedFields].map((field) => [...parent, field]);
}

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

function cloneStateForInputEvent(
  state: unknown,
  path: string[],
  value: unknown,
) {
  if (path.length === 0) return value;
  if (state === null || typeof state !== "object") return state;

  const root = Array.isArray(state)
    ? [...state]
    : { ...(state as Record<string, unknown>) };
  let cursor: Record<string, unknown> | unknown[] = root;

  for (let index = 0; index < path.length - 1; index++) {
    const segment = path[index]!;
    if (Array.isArray(cursor)) {
      const arrayIndex = Number(segment);
      if (!Number.isInteger(arrayIndex)) return root;

      const next = cursor[arrayIndex];
      const cloned =
        next && typeof next === "object"
          ? Array.isArray(next)
            ? [...next]
            : { ...(next as Record<string, unknown>) }
          : {};
      cursor[arrayIndex] = cloned;
      cursor = cloned as Record<string, unknown> | unknown[];
    } else {
      const next = cursor[segment];
      const cloned =
        next && typeof next === "object"
          ? Array.isArray(next)
            ? [...next]
            : { ...(next as Record<string, unknown>) }
          : {};
      cursor[segment] = cloned;
      cursor = cloned as Record<string, unknown> | unknown[];
    }
  }

  const leaf = path[path.length - 1]!;
  if (Array.isArray(cursor)) {
    const arrayIndex = Number(leaf);
    if (Number.isInteger(arrayIndex)) cursor[arrayIndex] = value;
  } else {
    cursor[leaf] = value;
  }

  return root;
}

function getStateForValidation(params: FormUpdateParams) {
  const state = params.getState();
  if (
    params.event.activityType !== "input" ||
    !("details" in params.event) ||
    !params.event.details ||
    typeof params.event.details !== "object" ||
    !("value" in params.event.details)
  ) {
    return state;
  }

  return cloneStateForInputEvent(
    state,
    params.path,
    (params.event.details as { value: unknown }).value,
  );
}

function notifyValidationPaths(stateKey: string, paths: string[][]) {
  const store = getGlobalStore.getState();
  for (const path of paths) {
    store.notifyPathSubscribers([stateKey, ...path].join("."), {
      type: "VALIDATION_UPDATE",
    });
  }
}

function clearValidationPaths(params: FormUpdateParams, paths: string[][]) {
  if (paths.length === 0) return;

  if (params.clearZodErrors) {
    params.clearZodErrors(paths);
    notifyValidationPaths(params.stateKey, paths);
    return;
  }

  const store = getGlobalStore.getState();
  for (const path of paths) {
    const currentMeta = store.getShadowMetadata(params.stateKey, path) || {};
    store.setShadowMetadata(params.stateKey, path, {
      ...currentMeta,
      validation: {
        status: "NOT_VALIDATED",
        errors: [],
        lastValidated: Date.now(),
        validatedValue: undefined,
      },
    });
  }
  notifyValidationPaths(params.stateKey, paths);
}

function addValidationIssues(
  params: FormUpdateParams,
  issues: Array<{ path: string[]; message: string; code?: string }>,
) {
  if (issues.length === 0) return;

  params.addZodErrors(issues);
  notifyValidationPaths(
    params.stateKey,
    issues.map((issue) => issue.path),
  );
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

function issueMatchesRelatedFields(
  issue: { path: ReadonlyArray<PropertyKey> },
  relatedFields: Set<string>,
): boolean {
  const leaf = String(issue.path.at(-1) ?? "");
  return relatedFields.has(leaf);
}

export function wireShapeValidationOptions(
  box: ShapeSchemaBox,
  params: TransformStateParams,
): void {
  const entry = box[params.stateKey];
  if (!entry) return;

  params.setOptions({
    validation: {
      zodSchemaV4: entry.validators?.client ?? entry.schemas.client,
      onBlur: "error",
    },
  });
}

/** Cross-field refine errors only — field rules are handled by state via setOptions. */
export function validateShapeRefines(
  box: ShapeSchemaBox,
  params: FormUpdateParams,
): void {
  if (
    params.event.activityType !== "blur" &&
    params.event.activityType !== "input"
  ) {
    return;
  }

  const entry = box[params.stateKey];
  const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
  if (!entry || !clientSchema) return;

  const field = params.path.at(-1);
  if (!field) return;

  const relatedFields = getRelatedFields(entry, field);
  if (!relatedFields) return;

  const relatedPaths = resolveRelatedPaths(params.path, relatedFields);
  const result = clientSchema.safeParse(getStateForValidation(params));

  if (result.success) {
    clearValidationPaths(params, relatedPaths);
    return;
  }

  const issues = result.error.issues.filter((issue) =>
    issueMatchesRelatedFields(issue, relatedFields),
  );
  const mapped = mapZodIssues(issues);
  const activeKeys = new Set(mapped.map((entry) => pathKey(entry.path)));

  const stalePaths = relatedPaths.filter(
    (targetPath) => !activeKeys.has(pathKey(targetPath)),
  );
  clearValidationPaths(params, stalePaths);
  addValidationIssues(params, mapped);
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
    .transformState((params) => {
      wireShapeValidationOptions(box, params);
    })
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
