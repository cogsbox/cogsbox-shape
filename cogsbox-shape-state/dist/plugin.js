import { createPluginContext } from "cogsbox-state";
import { z } from "zod";
function getValueAtPath(state, path) {
    return path.reduce((current, key) => {
        if (current !== null && typeof current === "object") {
            return current[key];
        }
        return undefined;
    }, state);
}
function getClientFieldSchema(clientSchema, field) {
    const shape = clientSchema
        .shape;
    return shape?.[field];
}
function getRelatedFields(entry, field) {
    const related = new Set([field]);
    const groupIndexes = entry.refineInfo?.fieldToGroup[field] ?? [];
    for (const index of groupIndexes) {
        const deps = entry.refineInfo?.groups[index]?.deps;
        if (!deps)
            continue;
        for (const dep of deps)
            related.add(dep);
    }
    return related;
}
function mapZodIssues(issues, pathPrefix = []) {
    return issues.map((issue) => ({
        path: [...pathPrefix, ...issue.path.map(String)],
        message: issue.message,
        code: issue.code,
    }));
}
export function validateShapeFormUpdate(box, params) {
    const entry = box[params.stateKey];
    const clientSchema = entry?.schemas.client;
    if (!entry || !clientSchema)
        return;
    const state = params.getState();
    const field = params.path.at(-1);
    if (!field)
        return;
    if (params.event.activityType === "blur") {
        const result = clientSchema.safeParse(state);
        if (result.success)
            return;
        const relatedFields = getRelatedFields(entry, field);
        const issues = result.error.issues.filter((issue) => relatedFields.has(String(issue.path[0])));
        if (issues.length > 0) {
            params.addZodErrors(mapZodIssues(issues));
        }
        return;
    }
    if (params.event.activityType === "input") {
        const fieldSchema = getClientFieldSchema(clientSchema, field);
        if (!fieldSchema)
            return;
        const value = getValueAtPath(state, params.path);
        const result = fieldSchema.safeParse(value);
        if (result.success)
            return;
        params.addZodErrors(mapZodIssues(result.error.issues, params.path));
    }
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
        .onFormUpdate((params) => {
        if (params.options?.logs) {
            console.log("[shape]", params.stateKey, params.path, params.event.activityType);
        }
        validateShapeFormUpdate(box, params);
    });
}
