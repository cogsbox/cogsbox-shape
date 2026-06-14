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
export declare function wireShapeValidationOptions(box: ShapeSchemaBox, params: TransformStateParams): void;
/** Cross-field refine errors only — field rules are handled by state via setOptions. */
export declare function validateShapeRefines(box: ShapeSchemaBox, params: FormUpdateParams): void;
export declare function validateShapeRefinesOnUpdate(box: ShapeSchemaBox, params: UpdateParams): void;
export declare function createShapePlugin<const TBox extends ShapeSchemaBox>(box: TBox): import("cogsbox-state").CogsPluginBuilder<"shape", {
    logs: boolean | undefined;
}, unknown, unknown, never, {}, true, true, true, false, false, true, InferShapeBoxState<TBox>>;
export {};
