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
export type ShapeSchemaBox = Record<string, ShapeSchemaBoxEntry>;
/** Per-box-key state: each entry's field keys stay typed via stateType. */
export type InferShapeBoxState<TBox extends ShapeSchemaBox> = {
    [K in keyof TBox]: TBox[K]["stateType"];
};
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
    key?: string;
};
type ShapePersistenceContext<TEntry extends ShapeSchemaBoxEntry> = {
    stateKey: string;
    cacheKey: string;
    path: string[];
    value: unknown;
    data?: unknown;
    entry: TEntry;
    id?: Record<string, unknown>;
    operation?: "insert" | "update";
    options?: ShapePluginOptions;
    status: ShapeStatus;
};
export type ShapePersistenceAdapter<TEntry extends ShapeSchemaBoxEntry = ShapeSchemaBoxEntry> = {
    load?: (ctx: ShapePersistenceContext<TEntry>) => Promise<unknown> | unknown;
    save?: (ctx: ShapePersistenceContext<TEntry> & {
        data: unknown;
        operation: "insert" | "update";
    }) => Promise<unknown> | unknown;
    insert?: (ctx: ShapePersistenceContext<TEntry> & {
        data: unknown;
        operation: "insert";
    }) => Promise<unknown> | unknown;
    update?: (ctx: ShapePersistenceContext<TEntry> & {
        data: unknown;
        operation: "update";
    }) => Promise<unknown> | unknown;
};
export type ShapePluginConfig<TBox extends ShapeSchemaBox> = {
    server?: Partial<Record<keyof TBox & string, ShapePersistenceAdapter>>;
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
export declare function createShapePlugin<const TBox extends ShapeSchemaBox>(box: TBox, config?: ShapePluginConfig<TBox>): import("cogsbox-state").CogsPluginBuilder<"shape", {
    logs: boolean | undefined;
    key: string | undefined;
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
}, true, true, true, true, false, true, InferShapeBoxState<TBox>>;
export {};
