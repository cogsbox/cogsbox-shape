import { createPluginContext } from "cogsbox-state";

const { createPlugin } = createPluginContext();

export function createShapePlugin<
  const TBox extends Record<string, { generateDefaults: () => unknown }>,
>(box: TBox) {
  return createPlugin("shape").initialState(() => {
    const state = {} as {
      [K in keyof TBox]: ReturnType<TBox[K]["generateDefaults"]>;
    };
    for (const key of Object.keys(box) as (keyof TBox & string)[]) {
      state[key] = box[key]!.generateDefaults() as (typeof state)[typeof key];
    }
    return state;
  });
}
