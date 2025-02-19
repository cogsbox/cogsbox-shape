import type { Schema } from "./schema";
type SchemaInput = Record<string, Schema<any>> | {
    schemas: Record<string, Schema<any>>;
};
export declare function generateSQL(input: SchemaInput, outputPath?: string): Promise<string>;
export {};
