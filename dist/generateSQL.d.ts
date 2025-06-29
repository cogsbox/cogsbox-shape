type SchemaInput = Record<string, any> | {
    schemas: Record<string, any>;
};
export declare function generateSQL(input: SchemaInput, outputPath?: string, options?: {
    includeForeignKeys?: boolean;
}): Promise<string>;
export {};
