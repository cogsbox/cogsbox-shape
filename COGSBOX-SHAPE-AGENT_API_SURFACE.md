# Cogsbox Shape API Surface For Agents

This file is meant to be copied into other repos so another coding agent can make sensible decisions without rediscovering the library from scratch.

The short version: `cogsbox-shape` defines the schema, validation, defaults, transforms, client IDs, DB field names, derived fields, views, and DB/ORM entry points. The repo has an internal `cogsbox-shape-db` workspace folder, but the public npm API should come from the main `cogsbox-shape` package. The schema is the source of truth for writes.

## Packages

### `cogsbox-shape`

Main schema package.

```ts
import { s, schema, createSchema, createSchemaBox } from "cogsbox-shape";
```

Public root export currently re-exports `src/schema.ts`.

### DB API

The ORM code lives in the repo under `cogsbox-shape-db`, but it ships inside the main `cogsbox-shape` npm package through subpath exports. Do not tell users to install `cogsbox-shape-db`; it is an internal workspace package unless the project explicitly decides to publish it separately.

```ts
import { connect } from "cogsbox-shape/db";
import { createSqliteDb } from "cogsbox-shape/db/sqlite";
```

Exports:

- `connect`
- `TableDB`
- `RecordNotFoundError`
- `ValidationError`
- ORM types such as `WhereInput`, `WhereValue`, `FindManyOpts`, `TableMeta`

The SQLite helper uses `better-sqlite3` through Kysely's `SqliteDialect`.

Packaging expectation:

- `cogsbox-shape` publishes the root schema API.
- `cogsbox-shape/db` publishes the ORM API.
- `cogsbox-shape/db/sqlite` publishes the SQLite helper.
- The internal `cogsbox-shape-db` workspace package should stay private unless there is an intentional decision to split packages later.

The package export map must expose all public runtime entries:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./db": {
      "types": "./cogsbox-shape-db/dist/index.d.ts",
      "import": "./cogsbox-shape-db/dist/index.js",
      "default": "./cogsbox-shape-db/dist/index.js"
    },
    "./db/sqlite": {
      "types": "./cogsbox-shape-db/dist/sqlite/index.d.ts",
      "import": "./cogsbox-shape-db/dist/sqlite/index.js",
      "default": "./cogsbox-shape-db/dist/sqlite/index.js"
    }
  }
}
```

There is a runtime package export test in `src/vitest/packageExports.test.ts`. Keep it: it catches the exact server-side failure where Node/tsx tries to resolve `import { s, schema } from "cogsbox-shape"` and the package root is not exported.

Install expectation for consumers:

```bash
npm install cogsbox-shape zod
```

Then import:

```ts
import { s, schema, createSchemaBox } from "cogsbox-shape";
import { connect } from "cogsbox-shape/db";
import { createSqliteDb } from "cogsbox-shape/db/sqlite";
```

`kysely` is a dependency of `cogsbox-shape`. `better-sqlite3` is an optional dependency because it is only needed for the SQLite helper. If another driver is used, callers can pass their own Kysely instance to `connect()`.

## Mental Model

A table is defined once, then the library derives several views of that shape:

- SQL shape: what exists in the database.
- Client input shape: what the client can create locally, including optimistic IDs.
- Client shape: what app code usually reads.
- Server validation shape: what is allowed to be written.
- DB transform shape: how client/server values map into DB column names and DB values.

The ORM should not invent validation rules. It should use the schema's validation and transform functions.

For writes:

```ts
insert(data);
// validates full server schema
// transforms through parseForDb()

update(id, patch);
// validates partial server schema
// transforms through parsePatchForDb()
```

If an agent changes write behavior, it must preserve that contract.

## Defining Fields

Use the database engine function for DB-backed fields:

- `s.sqlite(config)`
- `s.postgres(config)`
- `s.mysql(config)`

Do not use `s.sql(...)`; the public API is engine-specific.

```ts
const users = schema("users", {
  id: s.sqlite({ type: "int", pk: true }),
  email: s.sqlite({ type: "varchar", length: 255 }),
  name: s.sqlite({ type: "varchar", length: 120 }),
  createdAt: s.sqlite({ type: "timestamp", default: "CURRENT_TIMESTAMP" }),
});
```

Supported SQL field config includes:

- `type`: `"int"`, `"boolean"`, `"date"`, `"datetime"`, `"timestamp"`, `"varchar"`, `"char"`, `"text"`, `"longtext"`, `"enum"`
- `pk: true`
- `nullable: true`
- `default`
- `defaultValue`
- `length`
- `values` for enum values
- `name` for named Postgres enum types
- `field`: DB column name when it differs from the client key
- `sqlOnly: true`: exists in DB but should be hidden from client shapes

Enum examples:

```ts
status: s.sqlite({
  type: "enum",
  values: ["draft", "published", "archived"],
});
// SQLite SQL generation: TEXT CHECK (status IN (...))

status: s.postgres({
  type: "enum",
  name: "post_status",
  values: ["draft", "published", "archived"],
});
// Postgres SQL generation: CREATE TYPE post_status AS ENUM (...), then status post_status

status: s.mysql({
  type: "enum",
  values: ["draft", "published", "archived"],
});
// MySQL SQL generation: ENUM('draft', 'published', 'archived')
```

`generateSQL()` rejects mixed SQL dialects inside the same table.

Use `s.clientInput()` for client-only/default fields.

```ts
localId: s.clientInput(({ uuid }) => `new_${uuid()}`);
```

For optimistic records, a DB primary key can also have a client-side temporary value.

```ts
id: s.sqlite({ type: "int", pk: true }).clientInput({
  value: ({ uuid }) => `new_${uuid()}`,
  clientPk: true,
});
```

Use `.client()`, `.server()`, and `.transform()` to customize client validation, server validation, and DB/client conversion.

```ts
email: s.sqlite({ type: "varchar", length: 255 }).server((t) => t.sql.email());
```

```ts
published: s.sqlite({ type: "boolean" })
  .client((t) => t.sql.boolean())
  .transform({
    toClient: (value) => Boolean(value),
    toDb: (value) => (value ? 1 : 0),
  });
```

## Schemas And Boxes

Define an individual table with `schema(tableName, fields)`.

```ts
const users = schema("users", {
  id: s.sqlite({ type: "int", pk: true }).clientInput({
    value: ({ uuid }) => `new_${uuid()}`,
    clientPk: true,
  }),
  email: s.sqlite({ type: "varchar", length: 255 }),
  firstName: s.sqlite({ type: "varchar", length: 120 }),
  lastName: s.sqlite({ type: "varchar", length: 120 }),
});
```

Create a box with `createSchemaBox()`.

```ts
export const box = createSchemaBox({
  users,
});
```

A box entry provides:

- `schemas.sql`
- `schemas.clientInput`
- `schemas.client`
- `schemas.server`
- `transforms.toClient`
- `transforms.toDb`
- `transforms.parseForDb`
- `transforms.parsePatchForDb`
- `transforms.parseFromDb`
- `defaults`
- `generateDefaults()`
- `pk`
- `clientPk`
- `isClientRecord`
- `deriveDependencies`
- `refineDependencies`
- `createView(selection)`

Prefer using the transform methods over calling lower-level Zod schemas manually.

## Derived Fields

Use schema-level `.derive()` for same-row deterministic derived values. Derivations are strictly split into two directions: `forClient` (virtual fields) and `forDb` (computed DB-backed fields).

```ts
const users = schema({
  _tableName: "users",
  id: s.sqlite({ type: "int", pk: true }),
  firstName: s.sqlite({ type: "varchar", length: 120 }),
  lastName: s.sqlite({ type: "varchar", length: 120 }),

  // Virtual field (no DB column): allowed in forClient
  statusLabel: s.clientInput(""),

  // Computed DB column hidden from the client: allowed in forDb
  searchVector: s.sqlite({ type: "varchar", length: 255, sqlOnly: true }),
}).derive({
  forClient: {
    statusLabel: (row) => `${row.firstName} ${row.lastName} - Active`,
  },
  forDb: {
    searchVector: (row) => `${row.firstName} ${row.lastName}`.toLowerCase(),
  },
});
```

TypeScript strictly enforces this split:

- `forClient` can only target fields defined without SQL (`s.clientInput(...)`). These fields are ignored during SQL inserts/updates but dynamically computed when formatting data for the client.
- `forDb` can target any DB-backed scalar field. Use `sqlOnly: true` when the computed column should be written to SQL but hidden from client output.

The library tracks which row fields a derive function reads by running it against a Proxy. The ORM uses those dependencies during partial updates.

Current DB-backed derived update behavior:

- If a patch changes a dependency of a DB-backed derived field, the ORM recomputes that derived field.
- If the patch does not contain all required inputs, the ORM fetches only the missing dependency fields for that row.
- The write then updates only the patch fields plus affected derived fields.

Important caution: conditional derive functions can hide dependencies if the default branch does not read every field they may later need. Keep derives straightforward and same-row where possible.

Good use cases:

- `statusLabel` from `isActive` status (`forClient`)
- normalized display/search fields (`forDb`)
- deterministic same-row values

Avoid using derives for:

- relation counts
- permission checks
- external service calls
- current time values that should change at write time
- aggregate data across rows

## Refinement (`.refine()`)

Schema-level cross-field validation. Unlike `.client()`/`.server()` which validate individual fields, `refine()` checks relationships between fields.

```ts
const events = schema({
  _tableName: "events",
  id: s.sqlite({ type: "int", pk: true }),
  startDate: s.sqlite({ type: "varchar" }).clientInput({ value: "" }),
  endDate: s.sqlite({ type: "varchar" }).clientInput({ value: "" }),
  content: s.sqlite({ type: "varchar", nullable: true }).clientInput({
    value: null,
    schema: z.string().nullable(),
  }),
  isPublished: s.sqlite({ type: "boolean" }).clientInput({ value: false }),
}).refine({
  server: (row) => {
    const errors: { path: string[]; message: string }[] = [];
    if (row.startDate && row.endDate && row.startDate > row.endDate) {
      errors.push({ path: ["endDate"], message: "End date must be after start date" });
    }
    if (row.isPublished && !row.content) {
      errors.push({ path: ["content"], message: "Published events must have content" });
    }
    return errors.length > 0 ? errors : undefined;
  },
});
```

The `refine()` config accepts two optional callbacks, `server` and `client`:

- **`server`** — runs on `parseForDb()` (before DB writes). Applied via `superRefine` on the final validation schema.
- **`client`** — runs on the `clientInput` schema (client-side validation). Applied via `superRefine` on the final client input schema.

Each callback receives the full row and returns:
- `undefined` or `null` — validation passes
- `{ path: string[]; message: string }` — single error
- `{ path: string[]; message: string }[]` — multiple errors

Dependency tracking uses the same Proxy approach as `derive()`. The tracked dependencies are exposed as `refineDependencies` on the box entry:
```ts
box.events.refineDependencies;
// { server: string[], client: string[] }
```

**Important**: `parsePatchForDb()` uses the base schema without refinements, because partial patch data may not satisfy cross-field rules (Zod v4 limitation).

Can be chained after `derive()`:
```ts
schema({ ... })
  .derive({ forDb: { fullName: (row) => `${row.firstName} ${row.lastName}` } })
  .refine({ server: (row) => { ... } });
```

## Views

`createView(selection)` creates a selected/nested client shape over a base table.

```ts
const userView = box.users.createView({
  posts: true,
});
```

Views provide:

- view-specific schemas
- view-specific transforms
- defaults/default definitions
- reconciliation support for nested optimistic data
- the base table's PK/client PK information

After `connect()`, views also get direct ORM methods.

```ts
const bx = connect(box, db);
const userView = bx.users.createView({ posts: true });

await userView.insert(draft).full();
```

Use views when the client shape includes selected relations or nested optimistic records. Use plain tables for table-local CRUD.

Connected view queries hydrate selected relations:

```ts
const factoryView = bx.factory.createView({
  boxes: { variant: true },
});

const factory = await factoryView.findById(id);
// includes boxes[] and each box.variant
```

This belongs in the ORM, not in route/sync overrides. Automatic server routes that receive a view should be able to call `view.findById()` / `view.findMany()` and get the selected relation shape.

## ORM Setup

```ts
const db = await createSqliteDb("app.sqlite");
const bx = connect(box, db);
```

`connect(box, db)` returns an enhanced box where each table has direct ORM methods, and `createView()` returns enhanced views with direct ORM methods.

It also exposes transactions:

```ts
await bx.transaction(async (txBox) => {
  const user = await txBox.users.insert(draftUser).full();
  await txBox.posts.insert({ ...draftPost, userId: user.id }).ids();
});
```

Tables must currently exist in the database. SQL generation exists in the root package, but it is not yet a complete production migration system.

## ORM Methods

### `findMany(opts?)`

```ts
const users = await bx.users.findMany({
  where: {
    email: { contains: "@example.com" },
  },
  orderBy: { id: "desc" },
  limit: 50,
  offset: 0,
});
```

Supported `where` operators:

- exact value
- `contains`
- `startsWith`
- `endsWith`
- `gt`
- `gte`
- `lt`
- `lte`
- `in`
- `not`
- `not.contains`

Filter values are transformed through field `toDb` where possible.

On connected views, `findMany()` hydrates the selected relation tree before parsing to the view client shape.

Important current gap: filter objects are not fully schema-validated yet. Unknown/bad query fields should be treated as an unsafe edge to fix, not as intended behavior.

### `findById(id)`

```ts
const user = await bx.users.findById(1);
```

Returns a client row or `null`. Composite IDs can be passed as an array.

On connected views, `findById()` hydrates selected relations before parsing. A base-table select alone is not enough for view shapes.

### `insert(data).ids()`

```ts
const ids = await bx.users.insert(draft).ids();
```

Validates the full server schema and inserts the row.

Returns the DB primary key payload in DB column-name format.

```ts
{
  id: 42;
}
// or, with field aliases:
{
  user_id: 42;
}
```

For DB-generated PKs, the ORM omits client temporary PK fields before insert.

SQL-only fields can be supplied as the second argument:

```ts
const ids = await bx.users.insert(draft, {
    tenantId,
    createdByUserId: userId,
  })
  .ids();
```

The second argument only accepts fields marked `sqlOnly: true`. Those fields are validated against their SQL schema, mapped through DB field aliases, written to the database, and excluded from returned client objects.

TypeScript treats non-null `sqlOnly` fields without DB defaults as required on insert:

```ts
tenantId: s.sqlite({
  type: "varchar",
  length: 100,
  field: "tenant_id",
  sqlOnly: true,
});

await bx.users.insert(draft).ids();
// Type error and runtime error: missing tenantId

await bx.users.insert(draft, { tenantId }).ids();
// ok
```

Nullable `sqlOnly` fields, or fields with DB defaults/default values, are optional in the second argument.

The connected table hover should look like this for a required hidden field:

```ts
(data: UserInsert, dbOnlyData: { tenantId: string }) => ...
```

This depends on `createSchemaBox()` preserving concrete table definitions. If an agent sees `any`, `unknown`, or a broad index signature in this path, fix the schema-box typing instead of hiding the problem with casts.

### `insert(data).full()`

```ts
const created = await bx.users.insert(draft).full();
```

Validates and inserts, then reconciles returned DB IDs into the original client object.

This is primarily for optimistic client flows. Current semantics are "client object plus real IDs", not guaranteed "fresh DB row after insert". If DB triggers/defaults generate additional values, those may not be present unless the object already had them.

### `create(data)`

Legacy alias for:

```ts
insert(data).ids();
```

Prefer `insert()` in new code.

### `update(id, patch).ids()`

```ts
const ids = await bx.users.update(1, {
    email: "new@example.com",
  })
  .ids();
```

Validates `patch` through the partial server schema, transforms it through `parsePatchForDb()`, updates the row, and returns the PK payload.

Throws `RecordNotFoundError` if no row was updated.

For DB-backed derived fields, the ORM recomputes affected derives and fetches only missing dependency fields.

SQL-only fields can be supplied as the third argument:

```ts
await bx.users.update(1, { email: "new@example.com" }, { updatedByUserId: userId })
  .ids();
```

As with insert, the third argument is only for fields marked `sqlOnly: true`.

Update `sqlOnly` fields are always partial. A non-null hidden column may be required when the row is first inserted, but it should not be required on every later update.

### `update(id, patch).full()`

```ts
const user = await bx.users.update(1, {
    firstName: "Ada",
  })
  .full();
```

Runs the update, then fetches the stored row with `findById()`.

Unlike `insert(...).full()`, this currently means "stored row after update".

### `delete(id)`

```ts
const result = await bx.users.delete(1);
// { deleted: true } or { deleted: false }
```

### `count(where?)`

```ts
const total = await bx.users.count({
  email: { contains: "@example.com" },
});
```

Uses the same current filter limitations as `findMany()`.

### `reconcileIds(clientData, ids)`

```ts
const ids = await bx.users.insert(draft).ids();
const created = bx.users.reconcileIds(draft, ids);
```

Maps DB primary key payloads back onto client data.

For views with rich reconciliation support, this delegates to:

```ts
view.reconcile(clientData).withServer(ids);
```

For plain tables, it flat-maps DB column names back to client keys.

```ts
// DB payload
{ user_id: 42 }

// client object
{ id: "new_abc", name: "Ada" }

// reconciled
{ id: 42, name: "Ada" }
```

Arrays are reconciled by index.

## Reconciliation Pattern

For optimistic UI:

```ts
const draft = bx.users.generateDefaults();

// draft.id might be "new_xxx"
const created = await bx.users.insert({
    ...draft,
    email: "ada@example.com",
  })
  .full();

// created.id is the real DB id
```

Use `.ids()` when the caller wants to attach IDs manually or only needs the DB PK.

Use `.full()` when the client wants the optimistic object back with real IDs attached.

## Validation Rules

The schema is the validation contract.

Current guarantees:

- `insert()` validates full data (including server refinement).
- `update()` validates partial data (without refinement; only field-level validation).
- view updates validate through the view/server patch schema.
- DB transforms run after validation.
- client-only fields such as `s.clientInput("")` are removed by `parseForDb()` / `parsePatchForDb()` and ignored by ORM insert/update SQL generation.
- only schema-mapped DB-backed fields are written to SQL.
- DB-backed derived fields (`forDb`) are recomputed during relevant partial updates, while client derivations (`forClient`) safely append to fetched data without triggering SQL errors.

Known weak spots:

- query/filter validation is not complete
- Zod errors are not consistently wrapped in `ValidationError`
- constraint errors are not normalized yet

Agents should not bypass validation by calling raw `toDb()` for writes. Use `parseForDb()` for full writes and `parsePatchForDb()` for patches.

## What Works Now

Solid/currently covered:

- schema-defined DB/client/server shapes
- client defaults and generated defaults
- client temporary primary keys
- DB field aliases with `field`
- `sqlOnly` DB fields
- inserting and updating `sqlOnly` DB fields through the explicit second/third ORM parameter
- required insert typing for non-null `sqlOnly` fields without DB defaults
- full insert validation
- partial update validation
- client-only fields are not written as SQL columns during insert/update
- insert ID return via `.ids()`
- optimistic ID reconciliation via `.full()` and `reconcileIds()`
- plain table reconciliation
- view reconciliation
- basic `findMany`, `findById`, `delete`, `count`
- connected view `findById()` / `findMany()` hydrate selected nested relations
- transactions through connected boxes
- strict type-safe derivations splitting virtual client fields (`forClient`) and computed DB columns (`forDb`)
- DB-backed derived field (`forDb`) recomputation during partial update
- cross-field refinement (`refine()`) with `server` and `client` callbacks
- refinement dependency tracking for ORM-aware partial updates
- private playground app using the ORM in a real React/Hono flow

Partial/limited:

- relationship metadata and views exist, but nested ORM writes are not complete
- SQL generation exists, but is not a production migration system
- type inference can widen in app contexts and may need library work
- insert `.full()` does not guarantee fetching DB-generated defaults/triggers
- filter validation is not strict enough yet

Not built yet:

- `insertMany`
- `upsert`
- cursor pagination
- selected columns
- relation loading in ORM queries
- nested create/update/delete workflows
- indexes/unique constraints as mature schema metadata
- schema diffing and migration history
- normalized constraint/conflict errors
- grouped `and`/`or` query filters

## Safe Decisions For Future Agents

Prefer:

- `refine()` for cross-field validation; keep `.client()`/`.server()` for per-field rules
- `insert()` over legacy `create()`
- `insert(data).ids()` for minimal DB identity
- `insert(data).full()` for optimistic UI reconciliation
- `update(id, patch).full()` when the caller needs the stored row after update
- `parsePatchForDb()` for partial writes
- fetching only missing derived dependencies during update, not whole rows by default
- explicit transactions for multi-table writes

Do not assume:

- `insert(...).full()` has fetched DB trigger/default values
- filters are fully validated
- relations are fully ORM-loadable or writable
- SQL generation is ready as a migration engine
- raw Kysely errors are already converted into app-friendly errors

When adding features:

- preserve schema-first validation
- keep DB/client field aliasing working
- keep optimistic reconciliation working for both plain tables and views
- add tests in `cogsbox-shape-db/src/vitest/orm.test.ts` for ORM behavior
- use the playground for real app smoke testing when changing client/server flows

## Playground

The repo has a private playground app under `apps/playground`.

Run from the workspace root:

```bash
pnpm playground
```

It exercises:

- schema defaults
- optimistic insert with `.full()`
- partial update with `.full()`
- validation errors
- DB-backed derived fields
- React client flows through a Hono API

The playground is for development and should not be installed as part of the package.

## Current Highest-Priority Improvements

1. Add schema-derived query/filter validation.
2. Normalize Zod errors into `ValidationError`.
3. Decide and document final `.full()` semantics for insert.
4. Add a fetch-after-insert mode if "stored row after insert" is needed.
5. Add `insertMany()` with ordered reconciliation.
6. Add unique/index metadata before treating SQL generation as migrations.

The most important design constraint: this library exists so the schema remains the source of truth. Any ORM feature that writes data should route through the schema validation and transform pipeline.
