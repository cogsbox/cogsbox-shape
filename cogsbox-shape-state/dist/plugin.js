import { createPluginContext, getGlobalStore } from "cogsbox-state";
import { z } from "zod";
function pathKey(path) {
    return path.join("\0");
}
function getValueAtPath(value, path) {
    let cursor = value;
    for (const segment of path) {
        if (cursor === null || typeof cursor !== "object")
            return undefined;
        cursor = cursor[segment];
    }
    return cursor;
}
function setValueAtPath(value, path, nextValue) {
    if (path.length === 0)
        return nextValue;
    if (value === null || typeof value !== "object")
        return value;
    const root = Array.isArray(value)
        ? [...value]
        : { ...value };
    let cursor = root;
    for (let index = 0; index < path.length - 1; index++) {
        const segment = path[index];
        const current = cursor[segment];
        cursor[segment] =
            current && typeof current === "object"
                ? Array.isArray(current)
                    ? [...current]
                    : { ...current }
                : {};
        cursor = cursor[segment];
    }
    cursor[path[path.length - 1]] = nextValue;
    return root;
}
function valuesEqual(left, right) {
    if (Object.is(left, right))
        return true;
    try {
        return JSON.stringify(left) === JSON.stringify(right);
    }
    catch {
        return false;
    }
}
function cacheKeyFor(stateKey, adapter, shape) {
    const key = adapter?.key?.({ shape: shape, stateKey });
    if (key === undefined || key === null || key === "")
        return stateKey;
    return `${stateKey}:${String(key)}`;
}
function dirtyPathKey(path) {
    return path.length === 0 ? "$" : path.join(".");
}
function shapeStatusDependencyPath(path) {
    return [...path, "$pluginMeta", "shape", "status"];
}
function notifyShapeStatus(stateKey, path = []) {
    const store = getGlobalStore.getState();
    const rootMeta = store.getShadowMetadata(stateKey, []);
    const statusMeta = store.getShadowMetadata(stateKey, shapeStatusDependencyPath(path));
    statusMeta?.pathComponents?.forEach((componentId) => {
        rootMeta?.components?.get(componentId)?.forceUpdate();
    });
}
function sameStatus(left, right) {
    return (left.cacheKey === right.cacheKey &&
        left.isDirty === right.isDirty &&
        left.isLoading === right.isLoading &&
        left.isSaving === right.isSaving &&
        left.loadStatus === right.loadStatus &&
        left.saveStatus === right.saveStatus &&
        left.error === right.error &&
        left.lastLoadedAt === right.lastLoadedAt &&
        left.lastSavedAt === right.lastSavedAt &&
        valuesEqual(left.dirtyPaths, right.dirtyPaths));
}
function statusFromMeta(stateKey, cacheKey, meta) {
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
function normaliseFromServer(entry, data) {
    const clientSchema = entry.validators?.client ?? entry.schemas.client;
    const parsed = clientSchema.safeParse(data);
    if (parsed.success)
        return parsed.data;
    if (entry.transforms?.parseFromDb) {
        try {
            return entry.transforms.parseFromDb(data);
        }
        catch {
            // Fall through to the raw data. The caller's save/load handler may
            // already return client-shaped data with server-side metadata attached.
        }
    }
    if (entry.transforms?.toClient) {
        try {
            return entry.transforms.toClient(data);
        }
        catch {
            // Same fallback as parseFromDb.
        }
    }
    return data;
}
function identityFor(entry, value) {
    if (value === null || typeof value !== "object")
        return undefined;
    const source = value;
    const keys = [...(entry.pk ?? []), ...(entry.clientPk ?? [])];
    if (keys.length === 0)
        return undefined;
    return Object.fromEntries(keys
        .filter((key) => Object.prototype.hasOwnProperty.call(source, key))
        .map((key) => [key, source[key]]));
}
function resolveRelatedPaths(blurPath, relatedFields) {
    const parent = blurPath.slice(0, -1);
    return [...relatedFields].map((field) => [...parent, field]);
}
function mapZodIssues(issues) {
    return issues.map((issue) => ({
        path: issue.path.map(String),
        message: issue.message,
        code: issue.code,
    }));
}
function cloneStateForInputEvent(state, path, value) {
    if (path.length === 0)
        return value;
    if (state === null || typeof state !== "object")
        return state;
    const root = Array.isArray(state)
        ? [...state]
        : { ...state };
    let cursor = root;
    for (let index = 0; index < path.length - 1; index++) {
        const segment = path[index];
        if (Array.isArray(cursor)) {
            const arrayIndex = Number(segment);
            if (!Number.isInteger(arrayIndex))
                return root;
            const next = cursor[arrayIndex];
            const cloned = next && typeof next === "object"
                ? Array.isArray(next)
                    ? [...next]
                    : { ...next }
                : {};
            cursor[arrayIndex] = cloned;
            cursor = cloned;
        }
        else {
            const next = cursor[segment];
            const cloned = next && typeof next === "object"
                ? Array.isArray(next)
                    ? [...next]
                    : { ...next }
                : {};
            cursor[segment] = cloned;
            cursor = cloned;
        }
    }
    const leaf = path[path.length - 1];
    if (Array.isArray(cursor)) {
        const arrayIndex = Number(leaf);
        if (Number.isInteger(arrayIndex))
            cursor[arrayIndex] = value;
    }
    else {
        cursor[leaf] = value;
    }
    return root;
}
function getStateForValidation(params) {
    const state = params.getState();
    if (params.event.activityType !== "input" ||
        !("details" in params.event) ||
        !params.event.details ||
        typeof params.event.details !== "object" ||
        !("value" in params.event.details)) {
        return state;
    }
    return cloneStateForInputEvent(state, params.path, params.event.details.value);
}
function notifyValidationPaths(stateKey, paths) {
    const store = getGlobalStore.getState();
    for (const path of paths) {
        store.notifyPathSubscribers([stateKey, ...path].join("."), {
            type: "VALIDATION_UPDATE",
        });
    }
}
function clearValidationPaths(params, paths) {
    if (paths.length === 0)
        return;
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
function addValidationIssues(params, issues) {
    if (issues.length === 0)
        return;
    params.addZodErrors(issues);
    notifyValidationPaths(params.stateKey, issues.map((issue) => issue.path));
}
function createShadowValidationBridge(stateKey) {
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
function notifyStateComponents(stateKey) {
    const store = getGlobalStore.getState();
    const stateEntry = store.getShadowMetadata(stateKey, []);
    if (!stateEntry?.components)
        return;
    const updates = new Set();
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
function persistValidateGroupResults(params, keys, mapped) {
    const validationParams = createShadowValidationBridge(params.stateKey);
    if (params.clearOutsideKeys === true) {
        clearOutsideGroupValidation(params, keys, validationParams);
    }
    const keyPaths = keys.map((key) => [...params.path, key]);
    const activeKeys = new Set(mapped.map((issue) => pathKey(issue.path)));
    const stalePaths = keyPaths.filter((targetPath) => !activeKeys.has(pathKey(targetPath)));
    clearValidationPaths(validationParams, stalePaths);
    if (mapped.length > 0) {
        addValidationIssues(validationParams, mapped);
    }
    notifyStateComponents(params.stateKey);
}
function clearOutsideGroupValidation(params, keys, validationParams) {
    const store = getGlobalStore.getState();
    const parentNode = store.getShadowNode(params.stateKey, params.path);
    if (!parentNode)
        return;
    const keySet = new Set(keys);
    const outsidePaths = [];
    for (const childKey of Object.keys(parentNode)) {
        if (childKey === "_meta" || keySet.has(childKey))
            continue;
        const fieldPath = [...params.path, childKey];
        const status = store.getShadowMetadata(params.stateKey, fieldPath)
            ?.validation?.status;
        if (status === "INVALID") {
            outsidePaths.push(fieldPath);
        }
    }
    clearValidationPaths(validationParams, outsidePaths);
}
function issueMatchesSelectedKeys(issue, parentPath, selectedKeys) {
    const issuePath = issue.path.map(String);
    if (issuePath.length <= parentPath.length)
        return false;
    for (let index = 0; index < parentPath.length; index++) {
        if (issuePath[index] !== parentPath[index])
            return false;
    }
    return selectedKeys.has(issuePath[parentPath.length]);
}
function getRelatedFields(entry, field) {
    const groupIndexes = entry.refineInfo?.fieldToGroup[field];
    if (!groupIndexes?.length)
        return null;
    const related = new Set([field]);
    for (const index of groupIndexes) {
        const deps = entry.refineInfo?.groups[index]?.deps;
        if (!deps)
            continue;
        for (const dep of deps)
            related.add(dep);
    }
    return related;
}
function issueMatchesRelatedFields(issue, relatedFields) {
    const leaf = String(issue.path.at(-1) ?? "");
    return relatedFields.has(leaf);
}
function getChangedObjectFields(oldValue, newValue) {
    if (oldValue === null ||
        newValue === null ||
        typeof oldValue !== "object" ||
        typeof newValue !== "object" ||
        Array.isArray(oldValue) ||
        Array.isArray(newValue)) {
        return null;
    }
    const fields = new Set();
    const oldRecord = oldValue;
    const newRecord = newValue;
    for (const key of new Set([
        ...Object.keys(oldRecord),
        ...Object.keys(newRecord),
    ])) {
        if (!Object.is(oldRecord[key], newRecord[key]))
            fields.add(key);
    }
    return fields;
}
function resolveUpdateRefineTarget(entry, updatePath, oldValue, newValue) {
    const changedObjectFields = getChangedObjectFields(oldValue, newValue);
    if (changedObjectFields) {
        const parentPath = updatePath;
        const relatedFields = new Set();
        for (const field of changedObjectFields) {
            const groupFields = getRelatedFields(entry, field);
            if (!groupFields)
                continue;
            for (const related of groupFields)
                relatedFields.add(related);
        }
        if (relatedFields.size === 0)
            return null;
        return {
            relatedFields,
            relatedPaths: [...relatedFields].map((field) => [...parentPath, field]),
        };
    }
    const field = updatePath.at(-1);
    if (!field)
        return null;
    const relatedFields = getRelatedFields(entry, field);
    if (!relatedFields)
        return null;
    return {
        relatedFields,
        relatedPaths: resolveRelatedPaths(updatePath, relatedFields),
    };
}
function clearStaleRefineValidation(box, params, target, state) {
    const entry = box[params.stateKey];
    const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
    if (!entry || !clientSchema)
        return;
    const result = clientSchema.safeParse(state);
    if (result.success) {
        clearValidationPaths(params, target.relatedPaths);
        return;
    }
    const issues = result.error.issues.filter((issue) => issueMatchesRelatedFields(issue, target.relatedFields));
    const mapped = mapZodIssues(issues);
    const activeKeys = new Set(mapped.map((entry) => pathKey(entry.path)));
    const stalePaths = target.relatedPaths.filter((targetPath) => !activeKeys.has(pathKey(targetPath)));
    clearValidationPaths(params, stalePaths);
}
function applyRefineValidation(box, params, target, state) {
    const entry = box[params.stateKey];
    const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
    if (!entry || !clientSchema)
        return;
    const result = clientSchema.safeParse(state);
    if (result.success) {
        clearValidationPaths(params, target.relatedPaths);
        return;
    }
    const issues = result.error.issues.filter((issue) => issueMatchesRelatedFields(issue, target.relatedFields));
    const mapped = mapZodIssues(issues);
    const activeKeys = new Set(mapped.map((entry) => pathKey(entry.path)));
    const stalePaths = target.relatedPaths.filter((targetPath) => !activeKeys.has(pathKey(targetPath)));
    clearValidationPaths(params, stalePaths);
    addValidationIssues(params, mapped);
}
export function wireShapeValidationOptions(box, params) {
    const entry = box[params.stateKey];
    if (!entry)
        return;
    params.setOptions({
        validation: {
            zodSchemaV4: entry.validators?.client ?? entry.schemas.client,
            onBlur: "error",
        },
    });
}
/** Cross-field refine errors only — field rules are handled by state via setOptions. */
export function validateShapeRefines(box, params) {
    if (params.event.activityType !== "blur" &&
        params.event.activityType !== "input") {
        return;
    }
    const entry = box[params.stateKey];
    if (!entry)
        return;
    const field = params.path.at(-1);
    if (!field)
        return;
    const relatedFields = getRelatedFields(entry, field);
    if (!relatedFields)
        return;
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
export function validateShapeRefinesOnUpdate(box, params) {
    if (params.update.updateType !== "update")
        return;
    const entry = box[params.stateKey];
    if (!entry)
        return;
    const target = resolveUpdateRefineTarget(entry, params.update.path, params.update.oldValue, params.update.newValue);
    if (!target)
        return;
    clearStaleRefineValidation(box, params, target, params.getState());
}
export function validateShapeKeys(box, params) {
    const entry = box[params.stateKey];
    const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
    if (!entry || !clientSchema)
        return { success: true, results: [] };
    const rootState = params.getState?.() ?? getGlobalStore.getState().getShadowValue(params.stateKey, []);
    const result = clientSchema.safeParse(rootState);
    const selectedKeys = params.keys ? new Set(params.keys) : null;
    const shouldPersist = params.persist !== false && !!params.keys?.length;
    if (result.success) {
        if (shouldPersist) {
            persistValidateGroupResults(params, params.keys, []);
        }
        return {
            success: true,
            results: params.keys?.map((key) => ({
                key,
                path: [...params.path, key],
                success: true,
                data: getValueAtPath(rootState, [...params.path, key]),
            })) ?? [],
        };
    }
    const issues = selectedKeys
        ? result.error.issues.filter((issue) => issueMatchesSelectedKeys(issue, params.path, selectedKeys))
        : result.error.issues;
    const mapped = mapZodIssues(issues);
    if (shouldPersist) {
        persistValidateGroupResults(params, params.keys, mapped);
    }
    return {
        success: mapped.length === 0,
        results: params.keys?.map((key) => {
            const keyPath = [...params.path, key];
            const keyIssues = mapped.filter((issue) => issue.path[params.path.length] === key);
            return {
                key,
                path: keyPath,
                success: keyIssues.length === 0,
                data: keyIssues.length === 0
                    ? getValueAtPath(rootState, keyPath)
                    : undefined,
                error: keyIssues.length === 0 ? undefined : { issues: keyIssues },
            };
        }) ?? [],
    };
}
function buildInitialState(box) {
    const state = {};
    for (const key of Object.keys(box)) {
        const entry = box[key];
        if (!entry)
            continue;
        state[key] =
            entry.generateDefaults();
    }
    return state;
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
export function createShapePlugin(box, config = {}) {
    const getAdapter = (stateKey) => config.server?.[stateKey];
    const getCacheKey = (stateKey, shape) => cacheKeyFor(stateKey, getAdapter(stateKey), shape);
    return createPlugin("shape")
        .initialState(() => buildInitialState(box))
        .transformState((params) => {
        wireShapeValidationOptions(box, params);
        const meta = (params.getPluginMetaData?.() ?? {});
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
            console.log("[shape]", params.stateKey, params.path, params.event.activityType);
        }
        validateShapeRefines(box, params);
    })
        .onUpdate((params) => {
        validateShapeRefinesOnUpdate(box, params);
        if (params.update.updateType !== "update")
            return;
        const meta = (params.getPluginMetaData?.() ?? {});
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
        const baseline = meta.baseline ?? box[params.stateKey]?.generateDefaults?.();
        const dirty = new Set(meta.dirtyPaths ?? []);
        const key = dirtyPathKey(params.update.path);
        const baselineValue = getValueAtPath(baseline, params.update.path);
        if (valuesEqual(baselineValue, params.update.newValue)) {
            dirty.delete(key);
        }
        else {
            dirty.add(key);
        }
        const nextMeta = {
            ...meta,
            cacheKey,
            dirtyPaths: [...dirty],
            isDirty: dirty.size > 0,
        };
        params.setPluginMetaData(nextMeta);
        if (!sameStatus(beforeStatus, statusFromMeta(params.stateKey, cacheKey, nextMeta))) {
            notifyShapeStatus(params.stateKey, []);
        }
    })
        .methods((m) => ({
        validateGroup: m.object((ctx, keys) => validateShapeKeys(box, {
            stateKey: ctx.stateKey,
            path: ctx.path,
            keys,
            getState: ctx.$get,
        })),
        status: m.object((ctx) => {
            ctx.watchPluginMeta?.("status");
            const cacheKey = getCacheKey(ctx.stateKey, ctx.$get());
            return statusFromMeta(ctx.stateKey, cacheKey, ctx.getFieldMetaData());
        }),
        load: m.object(async (ctx) => {
            const entry = box[ctx.stateKey];
            const adapter = getAdapter(ctx.stateKey);
            if (!entry || !adapter?.load) {
                throw new Error(`No shape load adapter registered for ${ctx.stateKey}`);
            }
            const value = ctx.$get();
            const meta = (ctx.getFieldMetaData() ?? {});
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
            }
            catch (error) {
                ctx.setFieldMetaData({ loadStatus: "error", error });
                ctx.notifyPluginMeta?.("status");
                return { success: false, error, cacheKey };
            }
        }),
        save: m.object(async (ctx) => {
            const entry = box[ctx.stateKey];
            const adapter = getAdapter(ctx.stateKey);
            if (!entry || !adapter) {
                throw new Error(`No shape save adapter registered for ${ctx.stateKey}`);
            }
            const value = ctx.$get();
            const meta = (ctx.getFieldMetaData() ?? {});
            const cacheKey = getCacheKey(ctx.stateKey, value);
            const operation = entry.isClientRecord?.(value) ? "insert" : "update";
            const data = operation === "insert"
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
                const saved = adapter.save !== undefined
                    ? await adapter.save(baseCtx)
                    : operation === "insert"
                        ? await adapter.insert?.(baseCtx)
                        : await adapter.update?.(baseCtx);
                if (saved === undefined) {
                    throw new Error(`No ${operation} handler returned data for ${ctx.stateKey}`);
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
            }
            catch (error) {
                ctx.setFieldMetaData({ saveStatus: "error", error });
                ctx.notifyPluginMeta?.("status");
                return { success: false, error, operation, cacheKey };
            }
        }),
        revert: m.object((ctx) => {
            const meta = (ctx.getFieldMetaData() ?? {});
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
