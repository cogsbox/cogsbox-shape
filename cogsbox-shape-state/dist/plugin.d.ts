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
export declare function createShapePlugin<const TBox extends ShapeSchemaBox>(box: TBox): import("cogsbox-state").CogsPluginBuilder<"shape", undefined, unknown, unknown, never, {}, false, false, false, false, false, true, InferShapeBoxState<TBox>>;
