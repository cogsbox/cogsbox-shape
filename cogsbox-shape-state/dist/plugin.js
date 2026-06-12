import { createPluginContext } from "cogsbox-state";
const { createPlugin } = createPluginContext();
function buildInitialState(box) {
    const state = {};
    for (const key of Object.keys(box)) {
        const entry = box[key];
        if (!entry)
            continue;
        state[key] = entry.generateDefaults();
    }
    return state;
}
export function createShapePlugin(box) {
    return createPlugin("shape").initialState(() => buildInitialState(box));
}
