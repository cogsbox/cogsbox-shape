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

type UpdateParams = {
  stateKey: string;
  update: {
    path: string[];
    updateType: string;
    oldValue: unknown;
    newValue: unknown;
  };
  getState: () => unknown;
  addZodErrors: (
    errors: Array<{ path: string[]; message: string; code?: string }>,
  ) => void;
  clearZodErrors?: (paths: string[][]) => void;
};

type ValidationParams = Pick<
  FormUpdateParams,
  "stateKey" | "getState" | "addZodErrors" | "clearZodErrors"
>;

type ShapeKeyValidationParams = {
  stateKey: string;
  path: string[];
  keys?: readonly string[];
  getState?: () => unknown;
  /** When true (default), writes filtered issues to shadow validation metadata. */
  persist?: boolean;
};

function pathKey(path: string[]) {
  return path.join("\0");
}

function getValueAtPath(value: unknown, path: string[]) {
  let cursor = value;
  for (const segment of path) {
    if (cursor === null || typeof cursor !== "object") return undefined;
    cursor = (cursor as Record<string, unknown>)[segment];
  }
  return cursor;
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

function clearValidationPaths(params: ValidationParams, paths: string[][]) {
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
  params: ValidationParams,
  issues: Array<{ path: string[]; message: string; code?: string }>,
) {
  if (issues.length === 0) return;

  params.addZodErrors(issues);
  notifyValidationPaths(
    params.stateKey,
    issues.map((issue) => issue.path),
  );
}

function createShadowValidationBridge(stateKey: string): ValidationParams {
  const store = getGlobalStore.getState();
  return {
    stateKey,
    getState: () => store.getShadowValue(stateKey, []),
    addZodErrors: (issues) => {
      for (const error of issues) {
        const errorPath = error.path;
        const currentMeta = store.getShadowMetadata(stateKey, errorPath) || {};
        store.setShadowMetadata(stateKey, errorPath, {
          ...currentMeta,
          validation: {
            status: "INVALID",
            errors: [
              {
                source: "client",
                message: error.message,
                severity: "error",
                code: error.code,
              },
            ],
            lastValidated: Date.now(),
            validatedValue: undefined,
          },
        });
      }
    },
    clearZodErrors: (paths) => {
      for (const path of paths) {
        const currentMeta = store.getShadowMetadata(stateKey, path) || {};
        store.setShadowMetadata(stateKey, path, {
          ...currentMeta,
          validation: {
            status: "NOT_VALIDATED",
            errors: [],
            lastValidated: Date.now(),
            validatedValue: undefined,
          },
        });
      }
    },
  };
}

function notifyStateComponents(stateKey: string) {
  const store = getGlobalStore.getState();
  const stateEntry = store.getShadowMetadata(stateKey, []);
  if (!stateEntry?.components) return;

  const updates = new Set<() => void>();
  stateEntry.components.forEach((component) => {
    const reactiveTypes = component
      ? Array.isArray(component.reactiveType)
        ? component.reactiveType
        : [component.reactiveType || "component"]
      : null;
    if (!reactiveTypes?.includes("none")) {
      updates.add(() => component.forceUpdate());
    }
  });

  queueMicrotask(() => {
    updates.forEach((update) => update());
  });
}

function persistValidateGroupResults(
  params: Pick<ShapeKeyValidationParams, "stateKey" | "path">,
  keys: readonly string[],
  mapped: Array<{ path: string[]; message: string; code?: string }>,
) {
  const validationParams = createShadowValidationBridge(params.stateKey);
  const keyPaths = keys.map((key) => [...params.path, key]);
  const activeKeys = new Set(mapped.map((issue) => pathKey(issue.path)));

  const stalePaths = keyPaths.filter(
    (targetPath) => !activeKeys.has(pathKey(targetPath)),
  );
  clearValidationPaths(validationParams, stalePaths);

  if (mapped.length > 0) {
    addValidationIssues(validationParams, mapped);
  }

  notifyStateComponents(params.stateKey);
}

function issueMatchesSelectedKeys(
  issue: { path: ReadonlyArray<PropertyKey> },
  parentPath: string[],
  selectedKeys: Set<string>,
) {
  const issuePath = issue.path.map(String);
  if (issuePath.length <= parentPath.length) return false;

  for (let index = 0; index < parentPath.length; index++) {
    if (issuePath[index] !== parentPath[index]) return false;
  }

  return selectedKeys.has(issuePath[parentPath.length]!);
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

function getChangedObjectFields(oldValue: unknown, newValue: unknown) {
  if (
    oldValue === null ||
    newValue === null ||
    typeof oldValue !== "object" ||
    typeof newValue !== "object" ||
    Array.isArray(oldValue) ||
    Array.isArray(newValue)
  ) {
    return null;
  }

  const fields = new Set<string>();
  const oldRecord = oldValue as Record<string, unknown>;
  const newRecord = newValue as Record<string, unknown>;
  for (const key of new Set([
    ...Object.keys(oldRecord),
    ...Object.keys(newRecord),
  ])) {
    if (!Object.is(oldRecord[key], newRecord[key])) fields.add(key);
  }
  return fields;
}

function resolveUpdateRefineTarget(
  entry: ShapeSchemaBoxEntry,
  updatePath: string[],
  oldValue: unknown,
  newValue: unknown,
) {
  const changedObjectFields = getChangedObjectFields(oldValue, newValue);
  if (changedObjectFields) {
    const parentPath = updatePath;
    const relatedFields = new Set<string>();
    for (const field of changedObjectFields) {
      const groupFields = getRelatedFields(entry, field);
      if (!groupFields) continue;
      for (const related of groupFields) relatedFields.add(related);
    }

    if (relatedFields.size === 0) return null;
    return {
      relatedFields,
      relatedPaths: [...relatedFields].map((field) => [...parentPath, field]),
    };
  }

  const field = updatePath.at(-1);
  if (!field) return null;

  const relatedFields = getRelatedFields(entry, field);
  if (!relatedFields) return null;

  return {
    relatedFields,
    relatedPaths: resolveRelatedPaths(updatePath, relatedFields),
  };
}

function applyRefineValidation(
  box: ShapeSchemaBox,
  params: ValidationParams,
  target: { relatedFields: Set<string>; relatedPaths: string[][] },
  state: unknown,
) {
  const entry = box[params.stateKey];
  const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
  if (!entry || !clientSchema) return;

  const result = clientSchema.safeParse(state);

  if (result.success) {
    clearValidationPaths(params, target.relatedPaths);
    return;
  }

  const issues = result.error.issues.filter((issue) =>
    issueMatchesRelatedFields(issue, target.relatedFields),
  );
  const mapped = mapZodIssues(issues);
  const activeKeys = new Set(mapped.map((entry) => pathKey(entry.path)));

  const stalePaths = target.relatedPaths.filter(
    (targetPath) => !activeKeys.has(pathKey(targetPath)),
  );
  clearValidationPaths(params, stalePaths);
  addValidationIssues(params, mapped);
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
  if (!entry) return;

  const field = params.path.at(-1);
  if (!field) return;

  const relatedFields = getRelatedFields(entry, field);
  if (!relatedFields) return;

  applyRefineValidation(
    box,
    params,
    {
      relatedFields,
      relatedPaths: resolveRelatedPaths(params.path, relatedFields),
    },
    getStateForValidation(params),
  );
}

export function validateShapeRefinesOnUpdate(
  box: ShapeSchemaBox,
  params: UpdateParams,
): void {
  if (params.update.updateType !== "update") return;

  const entry = box[params.stateKey];
  if (!entry) return;

  const target = resolveUpdateRefineTarget(
    entry,
    params.update.path,
    params.update.oldValue,
    params.update.newValue,
  );
  if (!target) return;

  applyRefineValidation(box, params, target, params.getState());
}

export function validateShapeKeys(
  box: ShapeSchemaBox,
  params: ShapeKeyValidationParams,
) {
  const entry = box[params.stateKey];
  const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
  if (!entry || !clientSchema) return { success: true, results: [] };

  const rootState =
    params.getState?.() ?? getGlobalStore.getState().getShadowValue(params.stateKey, []);
  const result = clientSchema.safeParse(rootState);
  const selectedKeys = params.keys ? new Set(params.keys) : null;
  const shouldPersist = params.persist !== false && !!params.keys?.length;

  if (result.success) {
    if (shouldPersist) {
      persistValidateGroupResults(params, params.keys!, []);
    }

    return {
      success: true,
      results:
        params.keys?.map((key) => ({
          key,
          path: [...params.path, key],
          success: true,
          data: getValueAtPath(rootState, [...params.path, key]),
        })) ?? [],
    };
  }

  const issues = selectedKeys
    ? result.error.issues.filter((issue) =>
        issueMatchesSelectedKeys(issue, params.path, selectedKeys),
      )
    : result.error.issues;
  const mapped = mapZodIssues(issues);

  if (shouldPersist) {
    persistValidateGroupResults(params, params.keys!, mapped);
  }

  return {
    success: mapped.length === 0,
    results:
      params.keys?.map((key) => {
        const keyPath = [...params.path, key];
        const keyIssues = mapped.filter(
          (issue) => issue.path[params.path.length] === key,
        );

        return {
          key,
          path: keyPath,
          success: keyIssues.length === 0,
          data:
            keyIssues.length === 0
              ? getValueAtPath(rootState, keyPath)
              : undefined,
          error: keyIssues.length === 0 ? undefined : { issues: keyIssues },
        };
      }) ?? [],
  };
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
    })
    .onUpdate((params) => {
      validateShapeRefinesOnUpdate(box, params);
    })
    .methods((m) => ({
      validateGroup: m.object(
        (ctx, keys?: readonly string[]) =>
          validateShapeKeys(box, {
            stateKey: ctx.stateKey,
            path: ctx.path,
            keys,
            getState: ctx.$get,
          }),
      ),
    }));
}
