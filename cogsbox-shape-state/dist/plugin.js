import { createPluginContext } from "cogsbox-state";
const { createPlugin } = createPluginContext();
export function createShapePlugin(box) {
    return createPlugin("shape").initialState(() => {
        const state = {};
        for (const key of Object.keys(box)) {
            const entry = box[key];
            if (!entry)
                continue;
            state[key] = entry.generateDefaults();
        }
        return state;
    });
}
