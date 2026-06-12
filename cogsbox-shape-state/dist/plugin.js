import { createPluginContext } from "cogsbox-state";
const { createPlugin } = createPluginContext();
export function createShapePlugin(box) {
    return createPlugin("shape").initialState(() => {
        const state = {};
        for (const key of Object.keys(box)) {
            state[key] = box[key].generateDefaults();
        }
        return state;
    });
}
