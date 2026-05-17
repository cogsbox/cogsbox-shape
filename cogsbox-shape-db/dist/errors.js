export class RecordNotFoundError extends Error {
    constructor(table, pk) {
        super(`Record not found in "${table}" with pk: ${JSON.stringify(pk)}`);
        this.name = "RecordNotFoundError";
    }
}
export class ValidationError extends Error {
    issues;
    constructor(issues) {
        super("Validation failed");
        this.name = "ValidationError";
        this.issues = issues;
    }
}
