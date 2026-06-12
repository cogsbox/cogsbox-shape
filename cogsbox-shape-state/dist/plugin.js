import { createPluginContext } from "cogsbox-state";
import { z } from "zod";
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
export function wireShapeValidationOptions(box, params) {
    const entry = box[params.stateKey];
    if (!entry)
        return;
    params.setOptions({
        validation: {
            zodSchemaV4: entry.schemas.client,
            onBlur: "error",
        },
    });
}
/** Cross-field refine errors only — field rules are handled by state via setOptions. */
export function validateShapeRefines(box, params) {
    if (params.event.activityType !== "blur")
        return;
    const entry = box[params.stateKey];
    const clientSchema = entry?.schemas.client;
    if (!entry || !clientSchema)
        return;
    const field = params.path.at(-1);
    if (!field)
        return;
    const relatedFields = getRelatedFields(entry, field);
    if (!relatedFields)
        return;
    const result = clientSchema.safeParse(params.getState());
    if (result.success)
        return;
    const issues = result.error.issues.filter((issue) => relatedFields.has(String(issue.path[0])));
    if (issues.length > 0) {
        params.addZodErrors(mapZodIssues(issues));
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
