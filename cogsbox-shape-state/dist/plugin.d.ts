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
    refineInfo?: ShapeRefineInfo;
};
export type ShapeSchemaBox = Record<string, ShapeSchemaBoxEntry>;
/** Per-box-key state: each entry's field keys stay typed via stateType. */
export type InferShapeBoxState<TBox extends ShapeSchemaBox> = {
    [K in keyof TBox]: TBox[K]["stateType"];
};
type FormUpdateParams = {
    stateKey: string;
    path: string[];
    event: {
        activityType: string;
    };
    getState: () => unknown;
    addZodErrors: (errors: Array<{
        path: string[];
        message: string;
        code?: string;
    }>) => void;
};
export declare function validateShapeFormUpdate(box: ShapeSchemaBox, params: FormUpdateParams): void;
export declare function createShapePlugin<const TBox extends ShapeSchemaBox>(box: TBox): import("cogsbox-state").CogsPluginBuilder<"shape", {
    logs: boolean | undefined;
}, unknown, unknown, never, {}, false, false, true, false, false, true, InferShapeBoxState<TBox>>;
export {};
