# Real-World ORM Gap Notes

This is a working product/engineering note for the ORM layer. The goal is not to list every possible ORM feature, but to track the things this package will need if it is used in normal app flows: forms, optimistic UI, partial saves, validation errors, transactions, and production data safety.

## Current Shape

The core idea is strong:

- `cogsbox-shape` owns field definitions, defaults, validation, transforms, client PKs, and DB field names.
- `cogsbox-shape-db` attaches `.db` methods to a schema box.
- Inserts can return either DB ids or a reconciled client object.
- Updates now validate patches through the schema's partial server schema before transforming to DB.
- Views can reconcile nested optimistic records.
- Plain tables can now reconcile DB-assigned ids back onto client objects.

That gives us a useful foundation for real app workflows:

```ts
const draft = box.users.generateDefaults();
const created = await bx.users.db.insert(draft).full();
```

## Fixed Core Contract

### Partial Update Validation

The ORM must not bypass the schema validation layer. This is now wired as:

```ts
insert(data)
// schema.server.parse(data)
// then transform to DB

update(id, patch)
// schema.server.partial().parse(patch)
// then transform to DB
```

Real-world behavior:

```ts
await bx.users.db.update(id, { email: "bad-email" }).ids();
// rejects if email fails the schema's server validation

await bx.users.db.update(id, { email: "valid@test.com" }).ids();
// validates only email, does not require the whole row
```

This was the most important correctness fix because the schema is supposed to be the DB write contract.

## Highest Priority Remaining Gaps

### 1. Query/Filter Validation

Writes now use the schema validation path. Reads and filters are different because filter objects are not row-shaped data.

Example:

```ts
await bx.users.db.findMany({
  where: { email: { contains: "test.com" } },
});
```

That object cannot be passed directly into `serverSchema.parse()` because `{ contains: string }` is query syntax, not a user row.

Needed:

- Filter keys should be checked against schema fields.
- Filter values should use the field transform before SQL.
- Operator values should be type-aware where possible.
- Bad query fields should fail before SQL is built.

This should be schema-derived, not a separate hand-written model.

### 2. Derived Fields During Partial Updates

Patch validation works, but derived fields need a clear policy.

If a derived DB field depends on multiple columns, a partial update may not contain enough data to recompute it correctly. The safe options are:

- do not recompute derived fields on patches
- recompute only when all needed inputs are present
- fetch the current row, merge the patch, recompute, then update

### 3. Insert Defaults And Server Defaults

Inserts currently validate the object passed by the caller. In real apps, inserts often combine:

- client defaults
- DB defaults
- server-generated fields
- fields omitted from forms

We need a crisp policy:

- Should `insert()` require a fully valid server object?
- Should it merge schema defaults automatically?
- Should DB-default fields be omitted instead of sent?
- Should `insert(data).full()` fetch the row after insert when DB defaults exist?

The current reconciled full object is great for client PK replacement, but it may not include DB-generated values such as timestamps unless we fetch or support `returning`.

### 4. Reliable `.full()` Semantics

There are two meanings of `.full()` today:

- insert full: reconcile ids into the original client object
- update full: fetch the stored row after update

That is useful, but we should document the difference clearly and maybe tighten insert behavior.

Real-world issue:

```ts
const created = await bx.posts.db.insert(draft).full();
```

If the DB adds `createdAt`, `slug`, or trigger-generated data, the returned object may not include it unless insert `.full()` fetches after insert or uses database `returning`.

Possible modes:

- `.full()` means "client object plus reconciled ids"
- `.stored()` means "fetch row after write"
- `.ids()` remains minimal

This choice matters before the API gets widely used.

### 5. Error Shape And Validation Errors

`ValidationError` exists, but the ORM mostly lets Zod errors and Kysely/native errors escape.

Real apps need predictable errors:

- validation error with field issues
- not found
- unique constraint conflict
- foreign key conflict
- unknown field
- connection/driver failure

Suggested direction:

- Wrap Zod errors into the local `ValidationError`.
- Add `ConflictError` for unique violations.
- Add `ConstraintError` for FK/not-null/check failures.
- Preserve the original cause.

## Important Next Gaps

### Bulk Inserts And Batch Reconciliation

Views support manual batch reconciliation, but ORM-level batch APIs are missing.

Useful APIs:

```ts
await bx.users.db.insertMany(drafts).ids();
await bx.users.db.insertMany(drafts).full();
```

Needed behavior:

- preserve order
- transaction by default
- reconcile each returned PK to the matching draft
- clear behavior for partial failures

### Upsert

Many apps need idempotent writes:

```ts
await bx.users.db.upsert(draft).onConflict("email").full();
```

This needs careful design because SQLite/Postgres/MySQL differ, but it is a common production need.

### Query Shape

Current `findMany()` covers basic filters, ordering, limit, and offset. Real apps will likely need:

- cursor pagination
- selected columns
- relation loading
- count plus rows
- more operators: `isNull`, `notIn`, `between`
- grouped `and`/`or`
- case-insensitive search

The main caution: do not turn the ORM into a half-built SQL builder. Keep the ergonomic common path, and allow a Kysely escape hatch for advanced queries.

### Transactions As A First-Class Workflow

Transactions exist, which is good. Next real-world needs:

- helpers for multi-table create flows
- nested transaction behavior or explicit "reuse current transaction" behavior
- transaction-aware hooks
- rollback tests for thrown validation and DB errors

### Relationships And Nested Writes

Views can model relations for reads/defaults/reconciliation, but ORM writes are still table-local.

Missing workflows:

- create parent and children together
- update nested child collections
- delete or detach relations safely
- reconcile nested inserted rows from a single workflow

This should probably be explicit and transaction-backed rather than magic.

### Migrations And SQL Generation

`generateSQL` exists, but it is not yet a production migration story.

Gaps:

- dialect-specific SQL: SQLite/Postgres/MySQL differ
- no schema diffing
- no migration history table
- no indexes/unique constraints in schema metadata
- noisy debug logging in SQL generation
- field aliases need to be honored consistently

Short-term target:

- generate reliable create-table SQL per dialect
- support unique/index metadata
- remove debug `console.log`
- add tests for field aliases, defaults, nullable columns, and FKs

## Design Questions To Settle

### Should Insert Merge Defaults?

Option A: caller must pass a complete server-valid object.

Option B: ORM merges schema defaults before validation.

Real app ergonomics lean toward B, but API predictability may prefer A. A middle path:

```ts
bx.users.db.insert(data).withDefaults().full()
```

### Should Insert `.full()` Fetch From DB?

If `.full()` means "the full stored row", then insert needs to fetch after insert. If it means "the full client draft with ids reconciled", the current behavior is okay but should be named clearly.

This is a product semantics decision, not just an implementation detail.

### How Should Derived Fields Work In Patches?

Derived fields are easy when you have the whole row. Partial updates may not have enough context.

Possible rules:

- Do not recompute derives in partial updates.
- Recompute only derives whose dependencies are present.
- Fetch current row, merge patch, recompute, then update.

The third option is safest but more expensive.

## Suggested Roadmap

### Phase 1: Safety And Correctness

- Keep `parsePatchForDb()` covered by tests for plain tables and views.
- Add schema-derived validation for query/filter objects.
- Wrap Zod errors in `ValidationError`.
- Add tests for invalid filters, client-only fields in queries, and field aliases.

### Phase 2: Write Ergonomics

- Decide `.full()` semantics.
- Add a fetch-after-insert mode if needed.
- Add `insertMany()`.
- Add rollback tests for multi-write transactions.

### Phase 3: Production Data Features

- Add unique/index metadata.
- Improve SQL generation by dialect.
- Add conflict/upsert APIs.
- Add cursor pagination and grouped where conditions.

### Phase 4: Relationship Workflows

- Add explicit nested create/update helpers.
- Keep them transaction-backed.
- Reuse view reconciliation rather than inventing a second nested mapping model.

## Immediate Recommendation

Do query/filter validation next.

Writes now go through the schema validation contract. Filters are the next place where user input becomes SQL, but their shape is query syntax rather than row data, so they need their own schema-derived validation path.
