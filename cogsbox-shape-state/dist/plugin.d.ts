type ShapeBoxEntry = {
    generateDefaults: () => any;
    stateType?: any;
};
type InferShapeEntryState<TEntry> = TEntry extends {
    stateType: infer S;
} ? S : TEntry extends {
    generateDefaults: () => infer R;
} ? R : never;
export declare function createShapePlugin<const TBox extends Record<string, ShapeBoxEntry>>(box: TBox): import("cogsbox-state").CogsPluginBuilder<"shape", undefined, unknown, unknown, never, {}, false, false, false, false, false, true, { [K in keyof TBox]: InferShapeEntryState<TBox[K]>; }>;
export {};
