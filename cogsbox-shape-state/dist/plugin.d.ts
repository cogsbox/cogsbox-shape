export type ShapeStateSource<TState extends Record<string, unknown>> = {
    generateDefaults: () => TState;
};
export declare function createShapeInitialState<const TState extends Record<string, unknown>>(shape: ShapeStateSource<TState>): TState;
export declare const useCogsState: <StateKey extends "tasks" | "filter">(stateKey: StateKey, options?: {
    formElements?: import("cogsbox-state").FormsElementsType<unknown, []> | undefined;
    validation?: {
        key?: string;
        zodSchemaV3?: import("zod/v3").ZodType<any, any, any>;
        zodSchemaV4?: import("zod").ZodType;
        onBlur?: "error" | "warning";
        onChange?: "error" | "warning";
        blockSync?: boolean;
    } | undefined;
    plugins?: [] | undefined;
    log?: boolean | undefined;
    componentId?: string | undefined;
    syncOptions?: {
        apiParams: never;
        stateKey?: string;
        stateRoom: number | string | (({ clientId }: {
            clientId: string;
        }) => string | null);
        connect?: boolean;
        inMemoryState?: boolean;
    } | undefined;
    serverState?: {
        id?: string | number;
        data?: {
            tasks: Array<{
                id: number;
                title: string;
                done: boolean;
            }>;
            filter: string;
        }[StateKey] | undefined;
        status?: "pending" | "error" | "success" | "loading";
        timestamp?: number;
        merge?: boolean | {
            strategy: "append" | "prepend" | "diff";
            key?: string;
        };
    } | undefined;
    sync?: {
        action: (state: {
            tasks: Array<{
                id: number;
                title: string;
                done: boolean;
            }>;
            filter: string;
        }[StateKey]) => Promise<{
            success: boolean;
            data?: any;
            error?: any;
            errors?: Array<{
                path: (string | number)[];
                message: string;
            }>;
        }>;
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
    } | undefined;
    middleware?: (({ update }: {
        update: import("cogsbox-state").UpdateTypeDetail;
    }) => void) | undefined;
    localStorage?: {
        key: string | ((state: {
            tasks: Array<{
                id: number;
                title: string;
                done: boolean;
            }>;
            filter: string;
        }[StateKey]) => string);
        onChange?: ((state: {
            tasks: Array<{
                id: number;
                title: string;
                done: boolean;
            }>;
            filter: string;
        }[StateKey]) => void) | undefined;
    } | undefined;
    reactiveDeps?: ((state: {
        tasks: Array<{
            id: number;
            title: string;
            done: boolean;
        }>;
        filter: string;
    }[StateKey]) => any[] | true) | undefined;
    reactiveType?: import("cogsbox-state").ReactivityType | undefined;
    syncUpdate?: Partial<import("cogsbox-state").UpdateTypeDetail> | undefined;
    defaultState?: {
        tasks: Array<{
            id: number;
            title: string;
            done: boolean;
        }>;
        filter: string;
    }[StateKey] | undefined;
    dependencies?: any[] | undefined;
    taskManager?: unknown;
} | undefined) => import("cogsbox-state").StateObject<{
    tasks: Array<{
        id: number;
        title: string;
        done: boolean;
    }>;
    filter: string;
}[StateKey]>;
