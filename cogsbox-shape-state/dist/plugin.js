import { createPluginContext } from "cogsbox-state";
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
    if (params.event.activityType !== "blur")
        return;
    const entry = box[params.stateKey];
    const clientSchema = entry?.validators?.client ?? entry?.schemas.client;
    if (!entry || !clientSchema)
        return;
    const field = params.path.at(-1);
    if (!field)
        return;
    const relatedFields = getRelatedFields(entry, field);
    if (!relatedFields)
        return;
    const relatedPaths = resolveRelatedPaths(params.path, relatedFields);
    const result = clientSchema.safeParse(params.getState());
    if (result.success) {
        params.clearZodErrors(relatedPaths);
        return;
    }
    const issues = result.error.issues.filter((issue) => issueMatchesRelatedFields(issue, relatedFields));
    const mapped = mapZodIssues(issues);
    const activeKeys = new Set(mapped.map((entry) => pathKey(entry.path)));
    const stalePaths = relatedPaths.filter((targetPath) => !activeKeys.has(pathKey(targetPath)));
    if (stalePaths.length > 0) {
        params.clearZodErrors(stalePaths);
    }
    if (mapped.length > 0) {
        params.addZodErrors(mapped);
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
        .transformState((params) => wireShapeValidationOptions(box, params))
        .onFormUpdate((params) => {
        if (params.options?.logs) {
            console.log("[shape]", params.stateKey, params.path, params.event.activityType);
        }
        validateShapeRefines(box, params);
    });
}
