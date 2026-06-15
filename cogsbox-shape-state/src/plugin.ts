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
  transforms?: {
    parseForDb?: (value: any) => any;
    parsePatchForDb?: (value: any) => any;
    parseFromDb?: (value: any) => any;
    toClient?: (value: any) => any;
  };
  pk?: readonly string[] | null;
  clientPk?: readonly string[] | null;
  isClientRecord?: (value: any) => boolean;
  refineInfo?: ShapeRefineInfo;
};

type ShapeViewEntry = Omit<
  ShapeSchemaBoxEntry,
  "generateDefaults" | "stateType" | "isClientRecord"
> & {
  defaults: () => any;
  reconcile?: any;
  isView: true;
  viewSelection: unknown;
  baseTable: string;
};

type ShapeSchemaBoxEntryWithViews = ShapeSchemaBoxEntry & {
  RelationSelection?: unknown;
  createView?: (selection: any) => ShapeViewEntry;
};

export type ShapeSchemaBox = Record<string, ShapeSchemaBoxEntryWithViews>;

type NormalizedShapeEntry<TState extends Record<string, unknown> = Record<string, unknown>> =
  ShapeSchemaBoxEntry & {
    stateType: TState;
  };

/** Per-box-key state: each entry's field keys stay typed via stateType. */
export type InferShapeBoxState<TBox extends ShapeSchemaBox> = {
  [K in keyof TBox]: TBox[K]["stateType"];
};

type ShapeBoxKey<TBox extends ShapeSchemaBox> = keyof TBox & string;

type ViewStateShape<
  TBox extends ShapeSchemaBox,
  TFrom extends ShapeBoxKey<TBox>,
  TWith,
> = TBox[TFrom] extends { createView: (selection: TWith) => infer TView }
  ? TView extends { schemas: { client: z.ZodTypeAny } }
    ? z.infer<TView["schemas"]["client"]>
    : Record<string, unknown>
  : Record<string, unknown>;

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
  /** When true, clears existing errors on sibling fields outside `keys`. */
  clearOutsideKeys?: boolean;
};

export type ValidateGroupOptions = Pick<
  ShapeKeyValidationParams,
  "persist" | "clearOutsideKeys"
>;

type ShapeStatusValue = "idle" | "loading" | "success" | "error";

export type ShapeStatus = {
  cacheKey: string;
  isDirty: boolean;
  dirtyPaths: string[];
  isLoading: boolean;
  isSaving: boolean;
  loadStatus: ShapeStatusValue;
  saveStatus: Exclude<ShapeStatusValue, "loading"> | "saving";
  error?: unknown;
  lastLoadedAt?: number;
  lastSavedAt?: number;
};

type ShapeMeta = Partial<ShapeStatus> & {
  baseline?: unknown;
  suppressDirtyOnce?: boolean;
};

type ShapePluginOptions = {
  logs?: boolean;
};

type RuntimeShapePersistenceAdapter =
  ShapePersistenceAdapter<ShapeSchemaBoxEntry>;

type ShapePersistenceContext<TEntry extends ShapeSchemaBoxEntry> = {
  stateKey: string;
  cacheKey: string;
  path: string[];
  value: TEntry["stateType"];
  data?: unknown;
  entry: TEntry;
  id?: Record<string, unknown>;
  operation?: "insert" | "update";
  options?: ShapePluginOptions;
  status: ShapeStatus;
};

export type ShapePersistenceAdapter<
  TEntry extends ShapeSchemaBoxEntry = ShapeSchemaBoxEntry,
> = {
  key?: (ctx: {
    shape: TEntry["stateType"];
    stateKey: string;
  }) => string | number | boolean | null | undefined;
  load?: (
    ctx: ShapePersistenceContext<TEntry>,
  ) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
  save?: (
    ctx: ShapePersistenceContext<TEntry> & {
      data: unknown;
      operation: "insert" | "update";
    },
  ) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
  insert?: (
    ctx: ShapePersistenceContext<TEntry> & {
      data: unknown;
      operation: "insert";
    },
  ) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
  update?: (
    ctx: ShapePersistenceContext<TEntry> & {
      data: unknown;
      operation: "update";
    },
  ) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
};

type ShapeViewStateConfig<
  TBox extends ShapeSchemaBox,
  TFrom extends ShapeBoxKey<TBox>,
  TWith,
> = Omit<
  ShapePersistenceAdapter<NormalizedShapeEntry<ViewStateShape<TBox, TFrom, TWith>>>,
  "key"
> & {
  from: TFrom;
  with: TWith;
  key?: (ctx: {
    shape: TBox[TFrom]["stateType"];
    stateKey: string;
  }) => string | number | boolean | null | undefined;
};

type ShapeViewStateConfigUnion<TBox extends ShapeSchemaBox> = {
  [K in ShapeBoxKey<TBox>]: ShapeViewStateConfig<TBox, K, any>;
}[ShapeBoxKey<TBox>];

type ShapeStateConfigEntry<
  TBox extends ShapeSchemaBox,
  TKey extends PropertyKey,
> = TKey extends ShapeBoxKey<TBox>
  ? ShapePersistenceAdapter<TBox[TKey]>
  : ShapeViewStateConfigUnion<TBox>;

type ShapeStateConfig<TBox extends ShapeSchemaBox> = Partial<{
  [K in ShapeBoxKey<TBox>]: ShapeStateConfigEntry<TBox, K>;
}>;

type StateEntryShape<
  TBox extends ShapeSchemaBox,
  TEntry,
  TFallbackKey extends PropertyKey,
> = TEntry extends { from: infer TFrom; with: infer TWith }
  ? TFrom extends ShapeBoxKey<TBox>
    ? ViewStateShape<TBox, TFrom, TWith>
    : never
  : TFallbackKey extends ShapeBoxKey<TBox>
    ? TBox[TFallbackKey]["stateType"]
    : never;

type InferConfiguredShapeState<
  TBox extends ShapeSchemaBox,
  TState extends Record<string, unknown>,
> = InferShapeBoxState<TBox> & {
  [K in keyof TState]: StateEntryShape<TBox, NonNullable<TState[K]>, K>;
};

export type ShapePluginConfig<
  TBox extends ShapeSchemaBox,
  TState extends Record<string, unknown> = {},
> = {
  state?: TState & ShapeStateConfig<TBox>;
  /** @deprecated use state */
  server?: {
    [K in keyof TBox & string]?: ShapePersistenceAdapter<TBox[K]>;
  };
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

function setValueAtPath(value: unknown, path: string[], nextValue: unknown) {
  if (path.length === 0) return nextValue;
  if (value === null || typeof value !== "object") return value;

  const root = Array.isArray(value)
    ? [...value]
    : { ...(value as Record<string, unknown>) };
  let cursor: any = root;

  for (let index = 0; index < path.length - 1; index++) {
    const segment = path[index]!;
    const current = cursor[segment];
    cursor[segment] =
      current && typeof current === "object"
        ? Array.isArray(current)
          ? [...current]
          : { ...current }
        : {};
    cursor = cursor[segment];
  }

  cursor[path[path.length - 1]!] = nextValue;
  return root;
}

function valuesEqual(left: unknown, right: unknown) {
  if (Object.is(left, right)) return true;
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
}

function cacheKeyFor(
  stateKey: string,
  adapter: RuntimeShapePersistenceAdapter | undefined,
  shape: unknown,
) {
  const key = adapter?.key?.({ shape: shape as any, stateKey });
  if (key === undefined || key === null || key === "") return stateKey;
  return `${stateKey}:${String(key)}`;
}

function dirtyPathKey(path: string[]) {
  return path.length === 0 ? "$" : path.join(".");
}

function shapeStatusDependencyPath(path: string[]) {
  return [...path, "$pluginMeta", "shape", "status"];
}

function notifyShapeStatus(stateKey: string, path: string[] = []) {
  const store = getGlobalStore.getState();
  const rootMeta = store.getShadowMetadata(stateKey, []);
  const statusMeta = store.getShadowMetadata(
    stateKey,
    shapeStatusDependencyPath(path),
  );

  statusMeta?.pathComponents?.forEach((componentId) => {
    rootMeta?.components?.get(componentId)?.forceUpdate();
  });
}

function sameStatus(left: ShapeStatus, right: ShapeStatus) {
  return (
    left.cacheKey === right.cacheKey &&
    left.isDirty === right.isDirty &&
    left.isLoading === right.isLoading &&
    left.isSaving === right.isSaving &&
    left.loadStatus === right.loadStatus &&
    left.saveStatus === right.saveStatus &&
    left.error === right.error &&
    left.lastLoadedAt === right.lastLoadedAt &&
    left.lastSavedAt === right.lastSavedAt &&
    valuesEqual(left.dirtyPaths, right.dirtyPaths)
  );
}

function statusFromMeta(
  stateKey: string,
  cacheKey: string,
  meta?: ShapeMeta,
): ShapeStatus {
  const dirtyPaths = meta?.dirtyPaths ?? [];
  const loadStatus = meta?.loadStatus ?? "idle";
  const saveStatus = meta?.saveStatus ?? "idle";

  return {
    cacheKey: meta?.cacheKey ?? cacheKey,
    dirtyPaths,
    isDirty: dirtyPaths.length > 0,
    isLoading: loadStatus === "loading",
    isSaving: saveStatus === "saving",
    loadStatus,
    saveStatus,
    error: meta?.error,
    lastLoadedAt: meta?.lastLoadedAt,
    lastSavedAt: meta?.lastSavedAt,
  };
}

function normaliseFromServer(entry: ShapeSchemaBoxEntry, data: unknown) {
  const clientSchema = entry.validators?.client ?? entry.schemas.client;
  const parsed = clientSchema.safeParse(data);
  if (parsed.success) return parsed.data;

  if (entry.transforms?.parseFromDb) {
    try {
      return entry.transforms.parseFromDb(data);
    } catch {
      // Fall through to the raw data. The caller's save/load handler may
      // already return client-shaped data with server-side metadata attached.
    }
  }

  if (entry.transforms?.toClient) {
    try {
      return entry.transforms.toClient(data);
    } catch {
      // Same fallback as parseFromDb.
    }
  }

  return data;
}

function identityFor(entry: ShapeSchemaBoxEntry, value: unknown) {
  if (value === null || typeof value !== "object") return undefined;
  const source = value as Record<string, unknown>;
  const keys = [...(entry.pk ?? []), ...(entry.clientPk ?? [])];
  if (keys.length === 0) return undefined;

  return Object.fromEntries(
    keys
      .filter((key) => Object.prototype.hasOwnProperty.call(source, key))
      .map((key) => [key, source[key]]),
  );
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
  params: Pick<
    ShapeKeyValidationParams,
    "stateKey" | "path" | "clearOutsideKeys"
  >,
  keys: readonly string[],
  mapped: Array<{ path: string[]; message: string; code?: string }>,
) {
  const validationParams = createShadowValidationBridge(params.stateKey);

  if (params.clearOutsideKeys === true) {
    clearOutsideGroupValidation(params, keys, validationParams);
  }

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

function clearOutsideGroupValidation(
  params: Pick<ShapeKeyValidationParams, "stateKey" | "path">,
  keys: readonly string[],
  validationParams: ValidationParams,
) {
  const store = getGlobalStore.getState();
  const parentNode = store.getShadowNode(params.stateKey, params.path);
  if (!parentNode) return;

  const keySet = new Set(keys);
  const outsidePaths: string[][] = [];

  for (const childKey of Object.keys(parentNode)) {
    if (childKey === "_meta" || keySet.has(childKey)) continue;

    const fieldPath = [...params.path, childKey];
    const status = store.getShadowMetadata(params.stateKey, fieldPath)
      ?.validation?.status;
    if (status === "INVALID") {
      outsidePaths.push(fieldPath);
    }
  }

  clearValidationPaths(validationParams, outsidePaths);
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

function clearStaleRefineValidation(
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

  const target = {
    relatedFields,
    relatedPaths: resolveRelatedPaths(params.path, relatedFields),
  };
  const state = getStateForValidation(params);

  if (params.event.activityType === "input") {
    clearStaleRefineValidation(box, params, target, state);
    return;
  }

  applyRefineValidation(box, params, target, state);
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

  clearStaleRefineValidation(box, params, target, params.getState());
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

function buildInitialState<TState extends Record<string, ShapeSchemaBoxEntry>>(
  entries: TState,
): { [K in keyof TState]: TState[K]["stateType"] } {
  const state = {} as { [K in keyof TState]: TState[K]["stateType"] };
  for (const key of Object.keys(entries) as Array<keyof TState & string>) {
    const entry = entries[key];
    if (!entry) continue;
    state[key] = entry.generateDefaults() as TState[typeof key]["stateType"];
  }
  return state;
}

function normalizeViewEntry(view: ShapeViewEntry): ShapeSchemaBoxEntry {
  return {
    stateType: {} as Record<string, unknown>,
    generateDefaults: view.defaults,
    schemas: view.schemas,
    validators: view.validators,
    transforms: view.transforms,
    pk: view.pk,
    clientPk: view.clientPk,
    isClientRecord: () => false,
  };
}

const { createPlugin } = createPluginContext({
  options: z.object({
    logs: z.boolean().optional(),
  }),
  pluginMetaData: z.object({
    cacheKey: z.string().optional(),
    baseline: z.any().optional(),
    dirtyPaths: z.array(z.string()).optional(),
    isDirty: z.boolean().optional(),
    isLoading: z.boolean().optional(),
    isSaving: z.boolean().optional(),
    loadStatus: z
      .enum(["idle", "loading", "success", "error"])
      .optional(),
    saveStatus: z
      .enum(["idle", "saving", "success", "error"])
      .optional(),
    error: z.any().optional(),
    lastLoadedAt: z.number().optional(),
    lastSavedAt: z.number().optional(),
    suppressDirtyOnce: z.boolean().optional(),
  }),
});

export function createShapePlugin<
  const TBox extends ShapeSchemaBox,
  const TState extends Record<string, unknown> = {},
>(
  box: TBox,
  config: ShapePluginConfig<TBox, TState> = {},
) {
  const entries: Record<string, ShapeSchemaBoxEntry> = { ...box };
  const stateConfig = config.state ?? {};

  for (const [stateKey, rawStateEntry] of Object.entries(stateConfig)) {
    const stateEntry = rawStateEntry as
      | ShapeViewStateConfig<TBox, ShapeBoxKey<TBox>, any>
      | undefined;
    if (!stateEntry || typeof stateEntry !== "object" || !("from" in stateEntry)) {
      continue;
    }
    const base = box[stateEntry.from as ShapeBoxKey<TBox>];
    const view = base?.createView?.(stateEntry.with);
    if (!view) {
      throw new Error(
        `No shape view could be created for state key "${stateKey}"`,
      );
    }
    entries[stateKey] = normalizeViewEntry(view);
  }

  const getAdapter = (stateKey: string) =>
    ((config.state as Record<string, unknown> | undefined)?.[stateKey] ??
      config.server?.[stateKey as keyof TBox & string]) as
      | RuntimeShapePersistenceAdapter
      | undefined;
  const getCacheKey = (stateKey: string, shape: unknown) =>
    cacheKeyFor(stateKey, getAdapter(stateKey), shape);

  return createPlugin("shape")
    .initialState(
      (): InferConfiguredShapeState<TBox, TState> =>
        buildInitialState(entries) as InferConfiguredShapeState<TBox, TState>,
    )
    .transformState((params) => {
      wireShapeValidationOptions(entries, params);
      const meta = (params.getPluginMetaData?.() ?? {}) as ShapeMeta;
      const cacheKey = getCacheKey(params.stateKey, params.getState());
      if (!meta.baseline || meta.cacheKey !== cacheKey) {
        params.setPluginMetaData({
          cacheKey,
          baseline: params.getState(),
          dirtyPaths: [],
          isDirty: false,
          loadStatus: meta.loadStatus ?? "idle",
          saveStatus: meta.saveStatus ?? "idle",
        });
      }
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
      validateShapeRefines(entries, params);
    })
    .onUpdate((params) => {
      validateShapeRefinesOnUpdate(entries, params);
      if (params.update.updateType !== "update") return;

      const meta = (params.getPluginMetaData?.() ?? {}) as ShapeMeta;
      if (meta.suppressDirtyOnce) {
        params.setPluginMetaData({ suppressDirtyOnce: false });
        return;
      }

      const cacheKey = getCacheKey(params.stateKey, params.getState());
      if (meta.cacheKey && meta.cacheKey !== cacheKey) {
        const nextMeta = {
          ...meta,
          cacheKey,
          baseline: params.getState(),
          dirtyPaths: [],
          isDirty: false,
        };
        params.setPluginMetaData(nextMeta);
        notifyShapeStatus(params.stateKey, []);
        return;
      }

      const beforeStatus = statusFromMeta(params.stateKey, cacheKey, meta);
      const baseline =
        meta.baseline ?? entries[params.stateKey]?.generateDefaults?.();
      const dirty = new Set(meta.dirtyPaths ?? []);
      const key = dirtyPathKey(params.update.path);
      const baselineValue = getValueAtPath(baseline, params.update.path);

      if (valuesEqual(baselineValue, params.update.newValue)) {
        dirty.delete(key);
      } else {
        dirty.add(key);
      }

      const nextMeta = {
        ...meta,
        cacheKey,
        dirtyPaths: [...dirty],
        isDirty: dirty.size > 0,
      };
      params.setPluginMetaData(nextMeta);

      if (
        !sameStatus(
          beforeStatus,
          statusFromMeta(params.stateKey, cacheKey, nextMeta),
        )
      ) {
        notifyShapeStatus(params.stateKey, []);
      }
    })
    .methods((m) => ({
      validateGroup: m.object(
        (ctx, keys?: readonly string[]) =>
          validateShapeKeys(entries, {
            stateKey: ctx.stateKey,
            path: ctx.path,
            keys,
            getState: ctx.$get,
          }),
      ),
      status: m.object((ctx) => {
        ctx.watchPluginMeta?.("status");
        const cacheKey = getCacheKey(ctx.stateKey, ctx.$get());
        return statusFromMeta(
          ctx.stateKey,
          cacheKey,
          ctx.getFieldMetaData() as ShapeMeta | undefined,
        );
      }),
      load: m.object(async (ctx) => {
        const entry = entries[ctx.stateKey];
        const adapter = getAdapter(ctx.stateKey);
        if (!entry || !adapter?.load) {
          throw new Error(`No shape load adapter registered for ${ctx.stateKey}`);
        }

        const value = ctx.$get();
        const meta = (ctx.getFieldMetaData() ?? {}) as ShapeMeta;
        const cacheKey = getCacheKey(ctx.stateKey, value);
        const status = statusFromMeta(ctx.stateKey, cacheKey, meta);

        ctx.setFieldMetaData({
          cacheKey,
          loadStatus: "loading",
          error: undefined,
        });
        ctx.notifyPluginMeta?.("status");

        try {
          const serverData = await adapter.load({
            stateKey: ctx.stateKey,
            cacheKey,
            path: ctx.path,
            value,
            entry,
            id: identityFor(entry, value),
            options: ctx.options,
            status,
          });
          const nextState = normaliseFromServer(entry, serverData);

          ctx.setFieldMetaData({
            suppressDirtyOnce: true,
            baseline: nextState,
            dirtyPaths: [],
            isDirty: false,
            loadStatus: "success",
            lastLoadedAt: Date.now(),
            error: undefined,
          });
          ctx.$update(nextState);
          ctx.notifyPluginMeta?.("status");
          return { success: true, data: nextState, cacheKey };
        } catch (error) {
          ctx.setFieldMetaData({ loadStatus: "error", error });
          ctx.notifyPluginMeta?.("status");
          return { success: false, error, cacheKey };
        }
      }),
      save: m.object(async (ctx) => {
        const entry = entries[ctx.stateKey];
        const adapter = getAdapter(ctx.stateKey);
        if (!entry || !adapter) {
          throw new Error(`No shape save adapter registered for ${ctx.stateKey}`);
        }

        const value = ctx.$get();
        const meta = (ctx.getFieldMetaData() ?? {}) as ShapeMeta;
        const cacheKey = getCacheKey(ctx.stateKey, value);
        const operation = entry.isClientRecord?.(value) ? "insert" : "update";
        const data =
          operation === "insert"
            ? entry.transforms?.parseForDb?.(value) ?? value
            : entry.transforms?.parsePatchForDb?.(value) ??
              entry.transforms?.parseForDb?.(value) ??
              value;
        const status = statusFromMeta(ctx.stateKey, cacheKey, meta);

        ctx.setFieldMetaData({
          cacheKey,
          saveStatus: "saving",
          error: undefined,
        });
        ctx.notifyPluginMeta?.("status");

        try {
          const baseCtx = {
            stateKey: ctx.stateKey,
            cacheKey,
            path: ctx.path,
            value,
            data,
            entry,
            id: identityFor(entry, value),
            operation,
            options: ctx.options,
            status,
          };
          const saved =
            adapter.save !== undefined
              ? await adapter.save(baseCtx as any)
              : operation === "insert"
                ? await adapter.insert?.(baseCtx as any)
                : await adapter.update?.(baseCtx as any);

          if (saved === undefined) {
            throw new Error(
              `No ${operation} handler returned data for ${ctx.stateKey}`,
            );
          }

          const nextState = normaliseFromServer(entry, saved);
          ctx.setFieldMetaData({
            suppressDirtyOnce: true,
            baseline: nextState,
            dirtyPaths: [],
            isDirty: false,
            saveStatus: "success",
            lastSavedAt: Date.now(),
            error: undefined,
          });
          ctx.$update(nextState);
          ctx.notifyPluginMeta?.("status");
          return { success: true, data: nextState, operation, cacheKey };
        } catch (error) {
          ctx.setFieldMetaData({ saveStatus: "error", error });
          ctx.notifyPluginMeta?.("status");
          return { success: false, error, operation, cacheKey };
        }
      }),
      revert: m.object((ctx) => {
        const meta = (ctx.getFieldMetaData() ?? {}) as ShapeMeta;
        const baseline = meta.baseline;
        if (baseline === undefined) {
          return { success: false, error: "No shape baseline to revert to" };
        }

        ctx.setFieldMetaData({
          suppressDirtyOnce: true,
          dirtyPaths: [],
          isDirty: false,
        });
        ctx.$update(baseline);
        ctx.notifyPluginMeta?.("status");
        return { success: true, data: baseline };
      }),
    }));
}
