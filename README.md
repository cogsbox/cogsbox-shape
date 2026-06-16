# cogsbox-shape

> [!CAUTION]
> **This library is under active development and the API is rapidly changing. Do not use in production.**
>
> Breaking changes are expected between any release. The library is currently in an experimental phase as we work towards a stable v1.0 release.

A TypeScript-first schema declaration and validation library for full-stack applications. Define your database schema once and get type-safe schemas for your database, client, and validation layers with automatic transformations.

## Installation

```bash
npm install cogsbox-shape
# or
yarn add cogsbox-shape
# or
pnpm add cogsbox-shape
```

## State Plugin

Shape can be used with `cogsbox-state` through the `cogsbox-shape/state` export:

```typescript
import { createShapePlugin } from "cogsbox-shape/state";

const shapePlugin = createShapePlugin(schemaBox);
```

The state plugin wires Shape defaults and validation into state, and adds persistence methods such as `$save()`, `$load()`, `$revert()`, and `$status()` for server-backed state.

See [cogsbox-shape-state/README.md](./cogsbox-shape-state/README.md) for the plugin API, server adapters, cache keys, dirty tracking, and status behaviour.

## The Problem

In full-stack applications, data flows through multiple layers:

- **Database** stores data in SQL types (integers, varchars, etc.)
- **Client** needs different types for UI work (booleans instead of 0/1, temp string IDs instead of auto-increment integers)
- **Validation** rules differ between client and server boundaries
- **Forms** need typed default values that match the client representation

Traditional approaches require defining these layers separately, leading to type mismatches and duplicated logic.

## The Shape Flow

Define a field by chaining methods. Each step is optional — use only what you need.

```
s.sqlite()/s.postgres()/s.mysql()  →  .client()  →  .clientCheck()  →  .server()  →  .transform()
```

| Method                            | Purpose                                                        |
| --------------------------------- | -------------------------------------------------------------- |
| `s.sqlite/postgres/mysql({ type, sqlOnly })` | Database column type. `sqlOnly` excludes from client layer. |
| `.client({ value, schema })`      | Client-side input schema and default value for new records.    |
| `.clientCheck(fn)`                | Client-side validation on the final client union type.         |
| `.server(fn)`                     | Server-side validation. Stricter rules before database writes. |
| `.transform({ toClient, toDb })`  | Converts between database and client representations.          |

Note: `.derive()` and `.refine()` are schema-level methods, not chainable on individual fields.

### 1. SQL — Define Your Database Schema

Start with your database reality:

```typescript
import { s, schema } from "cogsbox-shape";

const userSchema = schema({
  _tableName: "users",
  id: s.sqlite({ type: "int", pk: true }),
  email: s.sqlite({ type: "varchar", length: 255 }),
  createdAt: s.sqlite({ type: "datetime", default: "CURRENT_TIMESTAMP" }),
});
```

This generates a Zod schema matching your SQL types exactly.

Use the SQL engine function that matches the database this schema targets:

```typescript
s.sqlite({ type: "text" });
s.postgres({ type: "varchar", length: 255 });
s.mysql({ type: "varchar", length: 255 });
```

Enums are real SQL column configs:

```typescript
s.sqlite({ type: "enum", values: ["draft", "published"] });
// SQL: TEXT CHECK (...)

s.postgres({
  type: "enum",
  name: "post_status",
  values: ["draft", "published"],
});
// SQL: CREATE TYPE post_status AS ENUM (...), then column uses post_status

s.mysql({ type: "enum", values: ["draft", "published"] });
// SQL: ENUM('draft', 'published')
```

### 2. Client — Defaults and Client-Side Validation

`.client()` sets the default value and client-side validation type for new records.

```typescript
const userSchema = schema({
  _tableName: "users",
  // DB stores auto-increment integers, but new records need a temp string ID
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => crypto.randomUUID(),
    schema: z.string(),
  }),
  // client type: string (just the user's schema)
  // Default value: a generated UUID string

  // Simple default without type override
  name: s.sqlite({ type: "varchar" }).client({ value: "Anonymous" }),
  // client type: string (inherits from SQL)
  // Default value: "Anonymous"

  // Type-only override; default is inferred from the client schema
  count: s.sqlite({ type: "int" }).client(() => z.number().min(0)),
  // client type: number (with min validation)
  // Default value: inferred from the client schema (0 for number)
});
```

**Note:** The final `client` schema is a union of `sql | client` types, representing the complete app state after transforms.

`generateDefaults()` uses the client schema to pick a default when no explicit `value` is provided. `toClient()` stays for DB-shaped data.

### 3. Client Check — Client-Side Validation

`.clientCheck()` adds validation rules to the final `client` schema (the union of sql | client). Use it for client-side validation that operates on the complete client type.

```typescript
name: s.sqlite({ type: "varchar" })
  .client({ value: "" })
  .clientCheck((tools) => tools.client.min(3, "Too short"))
  .server((tools) => tools.client.min(5, "Must be at least 5 chars")),
```

The `.clientCheck()` callback receives `tools` with `sql`, `client`, and `clientCheck` schemas.

### 4. Server — Server-Side Validation

`.server()` adds validation rules that run at the server boundary before database writes. It builds on the client schema, adding stricter constraints.

```typescript
const userSchema = schema({
  _tableName: "users",
  email: s
    .sqlite({ type: "varchar", length: 255 })
    .server(({ sql }) => sql.email("Invalid email")),

  age: s
    .sqlite({ type: "int" })
    .server(({ sql }) => sql.min(18, "Must be 18+").max(120)),
});
```

The callback receives the previous schema in the chain so you can refine it:

```typescript
name: s
  .sqlite({ type: "varchar" })
  .client(() => z.string().trim())
  .server(({ client }) => client.min(2, "Too short")),
```

### 5. Transform — Convert Between Layers

`.transform()` defines bidirectional conversion functions. These run on the server when reading from or writing to the database.

```typescript
status: s
  .sqlite({ type: "int" })                              // DB: 0 or 1
  .client(() => z.enum(["active", "inactive"])) // Client input: string enum
  .transform({
    toClient: (dbValue) => dbValue === 1 ? "active" : "inactive",
    toDb: (clientValue) => clientValue === "active" ? 1 : 0,
  }),
```

Transforms are optional — only needed when the client type differs from the SQL type.

### 6. Layer Separation: DB-Only, Client-Only, and Derived Fields

`cogsbox-shape` lets you explicitly define fields that only exist in specific layers, or dynamically compute them.

#### DB-Only Fields (`sqlOnly: true`)

Use `sqlOnly: true` to define fields that belong to the database exclusively (like internal tokens). They are saved in the DB, but dropped before data reaches the client.

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s.sqlite({ type: "int", pk: true }),
  email: s.sqlite({ type: "varchar" }),
  internalToken: s.sqlite({ type: "varchar", sqlOnly: true }),
});
// DB reads/writes: { id, email, internalToken }
// Client sees: { id, email }
```

#### Client-Only Fields

By skipping `s.sqlite()` entirely and just using `s.client()`, you can define fields that exist purely on the client (like a temporary UI state or computed field) and will not be sent to the database.

```typescript
const products = schema({
  _tableName: "products",
  price: s.sqlite({ type: "int" }),
  formattedPrice: s.client(""), // Client-only field!
});
```

#### Derived Fields (`.derive()`)

`.derive()` populates _existing fields_ dynamically. Define the target field first, then choose where the derivation runs:

- `forClient` computes client-only fields during `generateDefaults()` and `toClient()`.
- `forDb` computes DB-backed fields during `toDb()`, `parseForDb()`, and ORM writes. Use `sqlOnly: true` when the computed column should stay hidden from the client.

```typescript
const users = schema({
  _tableName: "users",
  firstName: s.sqlite({ type: "varchar" }).client({ value: "John" }),
  lastName: s.sqlite({ type: "varchar" }).client({ value: "Doe" }),

  // Virtual field. It exists in app/view state, not SQL.
  fullName: s.client(""),

  // Hidden DB column. It is written to SQL, but not sent to the client.
  searchIndex: s.sqlite({ type: "varchar", sqlOnly: true }),
}).derive({
  forClient: {
    fullName: (row) => `${row.firstName} ${row.lastName}`,
  },
  forDb: {
    searchIndex: (row) => `${row.firstName} ${row.lastName}`.toLowerCase(),
  },
});
```

During partial ORM updates, DB-backed derivations fetch only missing dependency fields they actually read, then recompute the affected `forDb` fields. Client-only derived fields are ignored by SQL writes.

### 7. Refinement (`.refine()`)

`.refine()` adds cross-field validation rules that the entire row must satisfy. Unlike `.clientCheck()`/`.server()` which validate individual fields, `refine` can check relationships between fields.

```typescript
const events = schema({
  _tableName: "events",
  id: s.sqlite({ type: "int", pk: true }),
  startDate: s.sqlite({ type: "varchar" }).client({ value: "" }),
  endDate: s.sqlite({ type: "varchar" }).client({ value: "" }),
  content: s.sqlite({ type: "varchar", nullable: true }).client({
    value: null,
    schema: z.string().nullable(),
  }),
  isPublished: s.sqlite({ type: "boolean" }).client({ value: false }),
}).refine((r) => [
  r("server", (row) => {
    const errors: { path: string[]; message: string }[] = [];
    if (row.startDate && row.endDate && row.startDate > row.endDate) {
      errors.push({ path: ["endDate"], message: "End date must be after start date" });
    }
    if (row.isPublished && !row.content) {
      errors.push({ path: ["content"], message: "Published events must have content" });
    }
    return errors.length > 0 ? errors : undefined;
  }),
]);

const box = createSchemaBox({ events }, { events: {} });

// Server refinement runs on parseForDb (before DB writes)
box.events.transforms.parseForDb({
  id: 1, startDate: "2024-12-31", endDate: "2024-01-01",
  content: null, isPublished: false,
});
// Throws: "End date must be after start date"
```

The `refine()` method takes a callback that receives an `r` helper function. Each call to `r(layer, check, deps?)` creates a refine entry:

| Layer | Applies to | Purpose |
|-------|-----------|---------|
| `"server"` | `parseForDb()`, `server` schema | Cross-field validation before DB writes |
| `"clientCheck"` | `clientCheck` schema | Cross-field validation on client output |
| `"client"` | `client` schema | Cross-field validation on raw client input |
| `"sql"` | `parseFromDb()`, `sql` schema | Cross-field validation on DB reads |
| `"all"` | all of the above | Universal cross-field validation |
| `string[]` | specified layers | Apply to multiple layers at once |

The check function receives the full row and returns:
- `undefined` or `null` — validation passes
- A single `{ path: string[]; message: string }` — one error
- An array of `{ path: string[]; message: string }` — multiple errors

Optional third argument `deps` specifies explicit dependency fields as a string or string array. If omitted, the library uses proxy-based tracking (same caveat as `derive()` — conditional branches with falsy defaults can hide dependencies).

**Dependency tracking**: Dependencies are exposed as `refineInfo` on the box entry:
```typescript
box.events.refineInfo;
// { groups: RefineEntry[], fieldToGroup: Record<string, number[]> }
```

**Chaining**: `refine()` can be chained after `derive()`:

```typescript
schema({ ... })
  .derive({ forDb: { fullName: (row) => `${row.firstName} ${row.lastName}` } })
  .refine((r) => [r("server", (row) => { ... })]);
```

**Note**: `parsePatchForDb` uses the base schema (without refinement) since partial data may not satisfy cross-field rules.

### Schemas vs Validators

Each box entry exposes two sets of Zod schemas:

- **`schemas`** — plain `ZodObject` shapes. Always composable with `.pick()`, `.omit()`, `.partial()`, etc. Use these for form field extraction, type inference, and partial validation.
- **`validators`** — schema + refinements. These are `ZodEffects` when `.refine()` is used, otherwise the same `ZodObject`. Use these for full validation that enforces cross-field rules.

```typescript
const box = createSchemaBox({ events }, { events: {} });

// Base schema — always a ZodObject, always composable
box.events.schemas.client.pick({ startDate: true, endDate: true }); // works!

// Validator — enforces refine rules
box.events.validators.client.safeParse(data); // runs cross-field checks

// Internal transforms use validators automatically
box.events.transforms.parseForDb(data); // uses validator.server
```

Why the split? After `.refine()`, Zod wraps the schema in `ZodEffects`, which loses `.shape`, `.pick()`, `.omit()`, and `.partial()`. By keeping the base schema separate from refinements, you can always compose the shape while still enforcing cross-field rules when needed.

### Schema Object Structure

The returned schema object has a clear separation of concerns:

```typescript
const schema = createSchema(mySchema);

schema.schemas; // { sql, client, clientChecked, server } — ZodObject shapes (composable)
schema.validators; // { sql, client, clientChecked, server } — with refinements enforced
schema.transforms; // { toClient, toDb, parseForDb, parseFromDb } — transformations
schema.defaults; // Default values for forms
schema.generateDefaults; // Function to generate fresh client defaults (executes randomizers)
schema.pk; // Primary key field names
schema.clientPk; // Client-side primary key field names
schema.isClientRecord; // Function to check if a record is client-created
schema.deriveDependencies; // Derive function dependencies ({ [field]: string[] })
schema.refineInfo; // Refinement info ({ groups: RefineEntry[], fieldToGroup: Record<string, number[]> })
```

## Using Schemas

### Single Schema with `createSchema`

For standalone schemas without relationships:

```typescript
import { s, schema, createSchema } from "cogsbox-shape";

const contactSchema = schema({
  _tableName: "contacts",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
  }),
  name: s.sqlite({ type: "varchar" }).server(({ sql }) => sql.min(2)),
  email: s.sqlite({ type: "varchar" }).server(({ sql }) => sql.email()),
  isActive: s
    .sqlite({ type: "boolean", default: true })
    .client(() => z.boolean())
    .transform({
      toClient: (val) => Boolean(val),
      toDb: (val) => (val ? 1 : 0),
    }),
});

const schema = createSchema(contactSchema);

// Access schemas directly
const { sql, client, clientChecked, server } = schema.schemas;
const { defaults, generateDefaults } = schema;

// Transforms for converting between layers
const { toClient, toDb, parseForDb, parseFromDb } = schema.transforms;

// Use in a form
const [data, setData] = useState(generateDefaults());
// { id: "new_a1b2c3d4", name: "", email: "", isActive: true }

// Validate explicitly (use validators for refinement enforcement)
const result = schema.validators.server.safeParse(data);

// Or use the base schema for shape operations
const pickedSchema = schema.schemas.server.pick({ email: true, age: true });

// Or handle validation & transformation in a single step!
const safeDbRow = parseForDb(data);
// Validates using server schema, outputs { isActive: 1, ... }
```

## Relationships and Views

For schemas with relationships, use `createSchemaBox`.

### 1. Define Schemas with Placeholders

```typescript
import { s, schema, createSchemaBox, addViews } from "cogsbox-shape";

const users = schema({
  _tableName: "users",
  id: s.sqlite({ type: "int", pk: true }),
  name: s.sqlite({ type: "varchar" }),
  posts: s.hasMany(), // Placeholder — resolved later
});

const posts = schema({
  _tableName: "posts",
  id: s.sqlite({ type: "int", pk: true }),
  title: s.sqlite({ type: "varchar" }),
  authorId: s.reference(() => users.id), // Foreign key
});
```

### 2. Create the Registry

The `createSchemaBox` function resolves relationships and gives you a type-safe API:

```typescript
const box = createSchemaBox(
  { users, posts },
  {
    users: {
      posts: { fromKey: "id", toKey: posts.authorId },
    },
  },
);
```

### 3. Access Base Schemas

Base schemas **exclude relations** by default, preventing circular dependencies:

```typescript
const { schemas, defaults, transforms, pk, clientPk } = box.users;

type UserClient = z.infer<typeof schemas.client>;
// { id: number; name: string; }
// No 'posts' — relations are excluded from base schemas

// Convert data between layers
const dbRow = transforms.toDb(clientData);
const clientData = transforms.toClient(dbRow);

// Validate and convert in one step
const dbRow = transforms.parseForDb(appData);
const clientData = transforms.parseFromDb(dbRow);
```

### 4. Create Views to Include Relations

Explicitly select which relations to include. The resulting views automatically apply nested transforms and deep schema validations.

```typescript
const userWithPosts = box.users.createView({
  posts: true,
});

type UserWithPosts = z.infer<typeof userWithPosts.schemas.client>;
// {
//   id: number;
//   name: string;
//   posts: { id: number; title: string; authorId: number; }[]
// }

// Views also have transforms for the selected fields
const { defaults, transforms } = userWithPosts;
// transforms.toClient() handles nested relation transforms automatically
```

### 5. Expose Views on the Box with `addViews`

Relations are **excluded from base schemas** — `box.journals` doesn't have `imports` or `tradeEvents` on it. To access those joined shapes, you create a view. But calling `box.journals.createView(...)` every time is repetitive, and you often want views as stable, named entries you can pass around.

`addViews` takes a box and merges named views as top-level keys on a new extended box:

```typescript
import { addViews } from "cogsbox-shape";

const box = createSchemaBox(
  { journals, importBatches, tradeEvents, tradingRulesForm },
  {
    journals: {
      imports: { fromKey: "id", toKey: importBatches.journalId },
      tradeEvents: { fromKey: "id", toKey: tradeEvents.journalId },
      tradingRules: { fromKey: "id", toKey: tradingRulesForm.journalId },
    },
  },
);

const extendedBox = addViews(box, {
  journalSummary: box.journals.createView({
    imports: true,
    tradeEvents: true,
  }),
  journalFull: box.journals.createView({
    imports: true,
    tradeEvents: true,
  }),
});

// Views are now first-class entries on the box
extendedBox.journalSummary;     // full view entry with schemas, transforms, defaults, etc.
extendedBox.journalFull;        // same shape, different view selection

// Use with the state plugin — views are normalized automatically
const plugin = createShapePlugin(extendedBox);

// Connect to the ORM — views hydrate their relations automatically
const db = createSqliteDb("app.sqlite");
const bx = connect(extendedBox, db);
const journals = await bx.journalSummary.findMany({ where: { userId } });
// Each journal already has imports[] and tradeEvents[] hydrated from SQL
```

**Why is this important?** Without `addViews`, views are local variables — you'd call `box.journals.createView(...)` at each call site. `addViews` gives views named keys on the box so they can be:
- Used as keys in state management (e.g., `shapePlugin.initialState.journalSummary`)
- Queried via the ORM with automatic relation hydration (`bx.journalSummary.findMany(...)`)
- Passed as a single box object to `createShapePlugin()` and `connect()` instead of managing loose views

`addViews` is how you turn relations from invisible schema definitions into usable, named shape entries.

When a box with views is connected to the ORM, view reads hydrate the selected relation tree before parsing:

```typescript
import { connect } from "cogsbox-shape/db";
import { createSqliteDb } from "cogsbox-shape/db/sqlite";

const db = createSqliteDb("app.sqlite");
const bx = connect(box, db);

const userView = bx.users.createView({
  posts: true,
});

const user = await userView.findById(1);
// user.posts is loaded and validated as part of the view shape
```

Cloudflare D1 uses the same SQLite schema dialect with a D1 connection helper:

```typescript
import { connect } from "cogsbox-shape/db";
import { createD1Db } from "cogsbox-shape/db/cloudflare-d1";

export default {
  async fetch(_request, env) {
    const db = createD1Db(env.DB);
    const bx = connect(box, db);

    return Response.json(await bx.users.findMany());
  },
};
```

Use `insert(data).ids()` when you only need the database identity, or `insert(data).full()` when you want optimistic client IDs reconciled back into the submitted client object. `create()` is kept as an alias for older code; prefer `insert()` in new code.

### 6. Nested Defaults and Form Definitions (`defaultsDefinition`)

When working with forms and nested array relations (like `hasMany`), you often need the default state for a _single new item_ to add to a form array.

While `view.defaults` gives you the actual runtime defaults (e.g., an array of 2 default posts if you defined `count: 2`), `view.defaultsDefinition` provides an easy way to grab the structure of a _single element_ using the `__def__relationName` key:

```typescript
const userView = box.users.createView({
  posts: { user: true },
});

// Actual runtime defaults (an array)
console.log(userView.defaults.posts);
// => [{ title: "Default Post", user: { ... } }, { title: "Default Post", user: { ... } }]

// Structural definition of a single item for adding to forms
console.log(userView.defaultsDefinition.__def__posts);
// => { title: "Default Post", user: { ... } }
```

This makes it incredibly simple to implement "Add Item" buttons in complex nested forms without having to manually construct or guess the default object shape.
