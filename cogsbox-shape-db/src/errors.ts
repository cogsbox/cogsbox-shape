export class RecordNotFoundError extends Error {
  constructor(table: string, pk: unknown) {
    super(`Record not found in "${table}" with pk: ${JSON.stringify(pk)}`);
    this.name = "RecordNotFoundError";
  }
}

export class ValidationError extends Error {
  issues: Record<string, unknown>[];

  constructor(issues: Record<string, unknown>[]) {
    super("Validation failed");
    this.name = "ValidationError";
    this.issues = issues;
  }
}
