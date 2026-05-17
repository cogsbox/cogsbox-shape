export declare class RecordNotFoundError extends Error {
    constructor(table: string, pk: unknown);
}
export declare class ValidationError extends Error {
    issues: Record<string, unknown>[];
    constructor(issues: Record<string, unknown>[]);
}
