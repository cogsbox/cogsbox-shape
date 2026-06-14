import { createPluginContext, getGlobalStore } from "cogsbox-state";
import { z } from "zod";
function pathKey(path) {
    return path.join("\0");
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
function setValidationIssues(stateKey, issues) {
    if (issues.length === 0)
        return;
    const store = getGlobalStore.getState();
    for (const issue of issues) {
        const currentMeta = store.getShadowMetadata(stateKey, issue.path) || {};
        store.setShadowMetadata(stateKey, issue.path, {
            ...currentMeta,
            validation: {
                status: "INVALID",
                errors: [
                    {
                        source: "client",
                        message: issue.message,
                        severity: "error",
                        code: issue.code,
                    },
                ],
                lastValidated: Date.now(),
                validatedValue: store.getShadowValue(stateKey, issue.path),
            },
        });
    }
    notifyValidationPaths(stateKey, issues.map((issue) => issue.path));
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
    applyRefineValidation(box, params, {
        relatedFields,
        relatedPaths: resolveRelatedPaths(params.path, relatedFields),
    }, getStateForValidation(params));
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
    applyRefineValidation(box, params, target, params.getState());
}
export function validateShapeKeys(box, params) {
    const entry = box[params.stateKey];
    const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
    if (!entry || !clientSchema)
        return { success: true, results: [] };
    const store = getGlobalStore.getState();
    const rootState = params.getState?.() ?? store.getShadowValue(params.stateKey, []);
    const result = clientSchema.safeParse(rootState);
    const selectedKeys = params.keys ? new Set(params.keys) : null;
    const targetPaths = params.keys?.map((key) => [...params.path, key]) ??
        (result.success
            ? []
            : mapZodIssues(result.error.issues).map((issue) => issue.path));
    if (result.success) {
        clearValidationPaths({
            stateKey: params.stateKey,
            getState: () => rootState,
            addZodErrors: () => { },
        }, targetPaths);
        return {
            success: true,
            results: params.keys?.map((key) => ({
                key,
                path: [...params.path, key],
                success: true,
                data: store.getShadowValue(params.stateKey, [...params.path, key]),
            })) ?? [],
        };
    }
    const issues = selectedKeys
        ? result.error.issues.filter((issue) => issueMatchesSelectedKeys(issue, params.path, selectedKeys))
        : result.error.issues;
    const mapped = mapZodIssues(issues);
    const activeKeys = new Set(mapped.map((issue) => pathKey(issue.path)));
    const stalePaths = targetPaths.filter((targetPath) => !activeKeys.has(pathKey(targetPath)));
    clearValidationPaths({
        stateKey: params.stateKey,
        getState: () => rootState,
        addZodErrors: () => { },
    }, stalePaths);
    setValidationIssues(params.stateKey, mapped);
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
                    ? store.getShadowValue(params.stateKey, keyPath)
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
});
export function createShapePlugin(box) {
    return createPlugin("shape")
        .initialState(() => buildInitialState(box))
        .transformState((params) => {
        wireShapeValidationOptions(box, params);
    })
        .onFormUpdate((params) => {
        if (params.options?.logs) {
            console.log("[shape]", params.stateKey, params.path, params.event.activityType);
        }
        validateShapeRefines(box, params);
    })
        .onUpdate((params) => {
        validateShapeRefinesOnUpdate(box, params);
    })
        .methods((m) => ({
        validateGroup: m.object((ctx, keys) => validateShapeKeys(box, {
            stateKey: ctx.stateKey,
            path: ctx.path,
            keys,
            getState: ctx.$get,
        })),
    }));
}
