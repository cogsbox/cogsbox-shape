import { createPluginContext } from "cogsbox-state";

const { createPlugin } = createPluginContext();

type ShapeBoxEntry = {
  generateDefaults: () => any;
  stateType?: any;
};

type InferShapeEntryState<TEntry> = TEntry extends { stateType: infer S }
  ? S
  : TEntry extends { generateDefaults: () => infer R }
    ? R
    : never;

export function createShapePlugin<
  const TBox extends Record<string, ShapeBoxEntry>,
>(box: TBox) {
  type ShapeState = {
    [K in keyof TBox]: InferShapeEntryState<TBox[K]>;
  };

  return createPlugin("shape").initialState(() => {
    const state = {} as ShapeState;
    for (const key of Object.keys(box) as Array<keyof TBox & string>) {
      const entry = box[key];
      if (!entry) continue;
      state[key] = entry.generateDefaults();
    }
    return state;
  });
}
