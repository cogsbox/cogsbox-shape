import { createPluginContext } from "cogsbox-state";

const { createPlugin } = createPluginContext();

/** Minimal shape of a createSchemaBox entry — matches journalSchemaBox.journalTechnical etc. */
export type ShapeSchemaBoxEntry = {
  /** Field-key → value map from DeriveStateType (not z.infer on a flattened client object). */
  stateType: Record<string, unknown>;
  generateDefaults: () => unknown;
};

export type ShapeSchemaBox = Record<string, ShapeSchemaBoxEntry>;

/** Per-box-key state: each entry's field keys stay typed via stateType. */
export type InferShapeBoxState<TBox extends ShapeSchemaBox> = {
  [K in keyof TBox]: TBox[K]["stateType"];
};

function buildInitialState<TBox extends ShapeSchemaBox>(
  box: TBox,
): InferShapeBoxState<TBox> {
  const state = {} as InferShapeBoxState<TBox>;
  for (const key of Object.keys(box) as Array<keyof TBox & string>) {
    const entry = box[key];
    if (!entry) continue;
    state[key] = entry.generateDefaults() as InferShapeBoxState<TBox>[typeof key];
  }
  return state;
}

export function createShapePlugin<const TBox extends ShapeSchemaBox>(
  box: TBox,
) {
  return createPlugin("shape").initialState(
    (): InferShapeBoxState<TBox> => buildInitialState(box),
  );
}
