export declare function createShapePlugin<const TBox extends Record<string, {
    generateDefaults: () => unknown;
}>>(box: TBox): import("cogsbox-state").CogsPluginBuilder<"shape", undefined, unknown, unknown, never, {}, false, false, false, false, false, true, { [K in keyof TBox]: ReturnType<TBox[K]["generateDefaults"]>; }>;
