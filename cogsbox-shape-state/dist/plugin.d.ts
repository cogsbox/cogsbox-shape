import { z } from "zod";
/** Minimal shape of a createSchemaBox entry — matches journalSchemaBox.journalTechnical etc. */
export type ShapeRefineInfo = {
    fieldToGroup: Record<string, number[]>;
    groups: {
        deps: string[] | null;
    }[];
};
export type ShapeSchemaBoxEntry = {
    /** Field-key → value map from DeriveStateType (not z.infer on a flattened client object). */
    stateType: Record<string, unknown>;
    generateDefaults: () => unknown;
    schemas: {
        client: z.ZodTypeAny;
    };
    validators?: {
        client: z.ZodTypeAny;
    };
    transforms?: {
        parseForDb?: (value: any) => any;
        parsePatchForDb?: (value: any) => any;
        parseFromDb?: (value: any) => any;
        toClient?: (value: any) => any;
    };
    pk?: readonly string[] | null;
    clientPk?: readonly string[] | null;
    isClientRecord?: (value: any) => boolean;
    refineInfo?: ShapeRefineInfo;
};
type ShapeViewEntry = Omit<ShapeSchemaBoxEntry, "generateDefaults" | "stateType" | "isClientRecord"> & {
    defaults: () => any;
    reconcile?: any;
    isView: true;
    viewSelection: unknown;
    baseTable: string;
};
type ShapeSchemaBoxEntryWithViews = ShapeSchemaBoxEntry & {
    RelationSelection?: unknown;
    createView?: (selection: any) => ShapeViewEntry;
};
export type ShapeSchemaBox = Record<string, ShapeSchemaBoxEntryWithViews>;
type NormalizedShapeEntry<TState extends Record<string, unknown> = Record<string, unknown>> = ShapeSchemaBoxEntry & {
    stateType: TState;
};
/** Per-box-key state: each entry's field keys stay typed via stateType. */
export type InferShapeBoxState<TBox extends ShapeSchemaBox> = {
    [K in keyof TBox]: TBox[K]["stateType"];
};
type ShapeBoxKey<TBox extends ShapeSchemaBox> = keyof TBox & string;
type ViewStateShape<TBox extends ShapeSchemaBox, TFrom extends ShapeBoxKey<TBox>, TWith> = TBox[TFrom] extends {
    createView: (selection: TWith) => infer TView;
} ? TView extends {
    schemas: {
        client: z.ZodTypeAny;
    };
} ? z.infer<TView["schemas"]["client"]> : Record<string, unknown> : Record<string, unknown>;
type TransformStateParams = {
    stateKey: string;
    setOptions: (options: {
        validation?: {
            zodSchemaV4?: z.ZodTypeAny;
            onBlur?: "error" | "warning";
        };
    }) => void;
};
type FormUpdateParams = {
    stateKey: string;
    path: string[];
    event: {
        activityType: string;
        details?: Record<string, unknown>;
    };
    getState: () => unknown;
    addZodErrors: (errors: Array<{
        path: string[];
        message: string;
        code?: string;
    }>) => void;
    clearZodErrors?: (paths: string[][]) => void;
};
type UpdateParams = {
    stateKey: string;
    update: {
        path: string[];
        updateType: string;
        oldValue: unknown;
        newValue: unknown;
    };
    getState: () => unknown;
    addZodErrors: (errors: Array<{
        path: string[];
        message: string;
        code?: string;
    }>) => void;
    clearZodErrors?: (paths: string[][]) => void;
};
type ShapeKeyValidationParams = {
    stateKey: string;
    path: string[];
    keys?: readonly string[];
    getState?: () => unknown;
    /** When true (default), writes filtered issues to shadow validation metadata. */
    persist?: boolean;
    /** When true, clears existing errors on sibling fields outside `keys`. */
    clearOutsideKeys?: boolean;
};
export type ValidateGroupOptions = Pick<ShapeKeyValidationParams, "persist" | "clearOutsideKeys">;
type ShapeStatusValue = "idle" | "loading" | "success" | "error";
export type ShapeStatus = {
    cacheKey: string;
    isDirty: boolean;
    dirtyPaths: string[];
    isLoading: boolean;
    isSaving: boolean;
    loadStatus: ShapeStatusValue;
    saveStatus: Exclude<ShapeStatusValue, "loading"> | "saving";
    error?: unknown;
    lastLoadedAt?: number;
    lastSavedAt?: number;
};
type ShapePluginOptions = {
    logs?: boolean;
};
type ShapePersistenceContext<TEntry extends ShapeSchemaBoxEntry> = {
    stateKey: string;
    cacheKey: string;
    path: string[];
    value: TEntry["stateType"];
    data?: unknown;
    entry: TEntry;
    id?: Record<string, unknown>;
    operation?: "insert" | "update";
    options?: ShapePluginOptions;
    status: ShapeStatus;
};
export type ShapePersistenceAdapter<TEntry extends ShapeSchemaBoxEntry = ShapeSchemaBoxEntry> = {
    key?: (ctx: {
        shape: TEntry["stateType"];
        stateKey: string;
    }) => string | number | boolean | null | undefined;
    load?: (ctx: ShapePersistenceContext<TEntry>) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
    save?: (ctx: ShapePersistenceContext<TEntry> & {
        data: unknown;
        operation: "insert" | "update";
    }) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
    insert?: (ctx: ShapePersistenceContext<TEntry> & {
        data: unknown;
        operation: "insert";
    }) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
    update?: (ctx: ShapePersistenceContext<TEntry> & {
        data: unknown;
        operation: "update";
    }) => Promise<TEntry["stateType"] | unknown> | TEntry["stateType"] | unknown;
};
type ShapeViewStateConfig<TBox extends ShapeSchemaBox, TFrom extends ShapeBoxKey<TBox>, TWith> = Omit<ShapePersistenceAdapter<NormalizedShapeEntry<ViewStateShape<TBox, TFrom, TWith>>>, "key"> & {
    from: TFrom;
    with: TWith;
    key?: (ctx: {
        shape: TBox[TFrom]["stateType"];
        stateKey: string;
    }) => string | number | boolean | null | undefined;
};
type ShapeViewStateConfigUnion<TBox extends ShapeSchemaBox> = {
    [K in ShapeBoxKey<TBox>]: ShapeViewStateConfig<TBox, K, any>;
}[ShapeBoxKey<TBox>];
type ShapeBoxAdapterUnion<TBox extends ShapeSchemaBox> = {
    [K in ShapeBoxKey<TBox>]: ShapePersistenceAdapter<TBox[K]>;
}[ShapeBoxKey<TBox>];
type ShapeStateConfigEntry<TBox extends ShapeSchemaBox, TKey extends PropertyKey> = TKey extends ShapeBoxKey<TBox> ? ShapePersistenceAdapter<TBox[TKey]> | ShapeViewStateConfigUnion<TBox> : ShapeViewStateConfigUnion<TBox>;
type ShapeStateConfig<TBox extends ShapeSchemaBox> = Partial<{
    [K in ShapeBoxKey<TBox>]: ShapeStateConfigEntry<TBox, K>;
}> & Record<string, ShapeViewStateConfigUnion<TBox> | ShapeBoxAdapterUnion<TBox> | undefined>;
type StateEntryShape<TBox extends ShapeSchemaBox, TEntry, TFallbackKey extends PropertyKey> = TEntry extends {
    from: infer TFrom;
    with: infer TWith;
} ? TFrom extends ShapeBoxKey<TBox> ? ViewStateShape<TBox, TFrom, TWith> : never : TFallbackKey extends ShapeBoxKey<TBox> ? TBox[TFallbackKey]["stateType"] : never;
type InferConfiguredShapeState<TBox extends ShapeSchemaBox, TState extends ShapeStateConfig<TBox>> = InferShapeBoxState<TBox> & {
    [K in keyof TState]: StateEntryShape<TBox, NonNullable<TState[K]>, K>;
};
export type ShapePluginConfig<TBox extends ShapeSchemaBox, TState extends ShapeStateConfig<TBox> = {}> = {
    state?: TState;
    /** @deprecated use state */
    server?: {
        [K in keyof TBox & string]?: ShapePersistenceAdapter<TBox[K]>;
    };
};
export declare function wireShapeValidationOptions(box: ShapeSchemaBox, params: TransformStateParams): void;
/** Cross-field refine errors only — field rules are handled by state via setOptions. */
export declare function validateShapeRefines(box: ShapeSchemaBox, params: FormUpdateParams): void;
export declare function validateShapeRefinesOnUpdate(box: ShapeSchemaBox, params: UpdateParams): void;
export declare function validateShapeKeys(box: ShapeSchemaBox, params: ShapeKeyValidationParams): {
    success: boolean;
    results: {
        key: string;
        path: string[];
        success: boolean;
        data: unknown;
    }[];
};
export declare function createShapePlugin<const TBox extends ShapeSchemaBox, const TState extends ShapeStateConfig<TBox> = {}>(box: TBox, config?: ShapePluginConfig<TBox, TState> & {
    state?: ShapeStateConfig<TBox>;
}): import("cogsbox-state").CogsPluginBuilder<"shape", {
    logs: boolean | undefined;
}, {
    cacheKey: string | undefined;
    baseline: any;
    dirtyPaths: string[] | undefined;
    isDirty: boolean | undefined;
    isLoading: boolean | undefined;
    isSaving: boolean | undefined;
    loadStatus: "error" | "idle" | "loading" | "success" | undefined;
    saveStatus: "error" | "idle" | "success" | "saving" | undefined;
    error: any;
    lastLoadedAt: number | undefined;
    lastSavedAt: number | undefined;
    suppressDirtyOnce: boolean | undefined;
}, unknown, never, {
    validateGroup: import("cogsbox-state").ChainMethodDefinition<(ctx: import("cogsbox-state").ChainMethodContext<any, any>, keys?: readonly string[] | undefined) => {
        success: boolean;
        results: {
            key: string;
            path: string[];
            success: boolean;
            data: unknown;
        }[];
    }>;
    status: import("cogsbox-state").ChainMethodDefinition<(ctx: import("cogsbox-state").ChainMethodContext<any, any>) => ShapeStatus>;
    load: import("cogsbox-state").ChainMethodDefinition<(ctx: import("cogsbox-state").ChainMethodContext<any, any>) => Promise<{
        success: boolean;
        data: any;
        cacheKey: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        cacheKey: string;
        data?: undefined;
    }>>;
    save: import("cogsbox-state").ChainMethodDefinition<(ctx: import("cogsbox-state").ChainMethodContext<any, any>) => Promise<{
        success: boolean;
        data: any;
        operation: string;
        cacheKey: string;
        error?: undefined;
    } | {
        success: boolean;
        error: unknown;
        operation: string;
        cacheKey: string;
        data?: undefined;
    }>>;
    revert: import("cogsbox-state").ChainMethodDefinition<(ctx: import("cogsbox-state").ChainMethodContext<any, any>) => {
        success: boolean;
        error: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {} | null;
        error?: undefined;
    }>;
}, true, true, true, true, false, true, InferConfiguredShapeState<TBox, TState>>;
export {};
