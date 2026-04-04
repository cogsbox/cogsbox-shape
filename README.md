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
s.sql()  →  .client()  →  .server()  →  .transform()
        →  .derive()   →  .sqlOnly()
```

| Method                                       | Purpose                                                        |
| -------------------------------------------- | -------------------------------------------------------------- |
| `s.sql({ type })`                            | Database column type. The starting point for every field.      |
| `.client({ value, schema })`                 | Client-side validation and default value for new records.      |
| `.server(fn)`                                | Server-side validation. Stricter rules before database writes. |
| `.transform({ toClient, toDb })`              | Converts between database and client representations.          |
| `.derive({ field: (row) => computedValue })` | Adds computed fields based on other field values.              |
| `.sqlOnly`                                   | Marks a field as server-only (not sent to client).             |

### 1. SQL — Define Your Database Schema

Start with your database reality:

```typescript
import { s, schema } from "cogsbox-shape";

const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }),
  email: s.sql({ type: "varchar", length: 255 }),
  createdAt: s.sql({ type: "datetime", default: "CURRENT_TIMESTAMP" }),
});
```

This generates a Zod schema matching your SQL types exactly.

### 2. Client — Defaults and Client-Side Validation

`.client()` sets the default value and client-side validation type for new records.

```typescript
const userSchema = schema({
  _tableName: "users",
  // DB stores auto-increment integers, but new records need a temp string ID
  id: s.sql({ type: "int", pk: true }).client({
    value: () => crypto.randomUUID(),
    schema: z.string(),
  }),
  // Client type becomes: string | number (union of SQL + client)
  // Default value: a generated UUID string

  // Simple default without type override
  name: s.sql({ type: "varchar" }).client({ value: "Anonymous" }),
  // Client type: string (inherits from SQL)
  // Default value: "Anonymous"

  // Type-only override (no default value change)
  count: s.sql({ type: "int" }).client(() => z.number().min(0)),
  // Client type: number (with min validation)
  // Default value: inferred from type (0 for number)
});
```

### 3. Server — Server-Side Validation

`.server()` adds validation rules that run at the server boundary before database writes. It builds on the client schema, adding stricter constraints.

```typescript
const userSchema = schema({
  _tableName: "users",
  email: s
    .sql({ type: "varchar", length: 255 })
    .server(({ sql }) => sql.email("Invalid email")),

  age: s
    .sql({ type: "int" })
    .server(({ sql }) => sql.min(18, "Must be 18+").max(120)),
});
```

The callback receives the previous schema in the chain so you can refine it:

```typescript
name: s
  .sql({ type: "varchar" })
  .client(() => z.string().trim())
  .server(({ client }) => client.min(2, "Too short")),
```

### 4. Transform — Convert Between Layers

`.transform()` defines bidirectional conversion functions. These run on the server when reading from or writing to the database.

```typescript
status: s
  .sql({ type: "int" })                              // DB: 0 or 1
  .client(() => z.enum(["active", "inactive"]))       // Client: string enum
  .transform({
    toClient: (dbValue) => dbValue === 1 ? "active" : "inactive",
    toDb: (clientValue) => clientValue === "active" ? 1 : 0,
  }),
```

Transforms are optional — only needed when the client type differs from the SQL type.

### 6. Derive — Computed Fields

`.derive()` adds computed fields that are calculated from other values in the row. These are:
- Available in client schema and defaults
- NOT stored in the database (computed at runtime)
- Useful for display-only fields, combinations, or formatted values

```typescript
const userSchema = schema({
  _tableName: "users",
  firstName: s.sql({ type: "varchar" }).client({ value: "John" }),
  lastName: s.sql({ type: "varchar" }).client({ value: "Doe" }),
  // Define placeholder for derived field
  fullName: s.client(""),  // Required: tells schema this field exists on client
}).derive({
  fullName: (row) => `${row.firstName} ${row.lastName}`,
});

// Now defaults and toClient include the computed value
const defaults = box.users.defaults;
// { firstName: "John", lastName: "Doe", fullName: "John Doe" }
```

The derived field's default value is computed from other defaults at initialization time.

### 7. sqlOnly — Server-Only Fields

`.sql({ sqlOnly: true })` marks a field as server-only:
- Included in SQL schema (stored in DB)
- Excluded from client schema (not sent to client)
- Useful for internal tokens, computed scores, or sensitive data

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }),
  email: s.sql({ type: "varchar" }),
  internalToken: s.sql({ type: "varchar", sqlOnly: true }),
  trustScore: s.sql({ type: "int", sqlOnly: true }),
});

// Client schema: { id, email } — internalToken and trustScore excluded
// SQL schema: { id, email, internalToken, trustScore } — all fields
// Defaults: { id: 0, email: "" } — sqlOnly fields excluded
```

### 8. Client-Only Fields

Use `s.client()` without `s.sql()` to define fields that exist only on the client:

```typescript
const orderSchema = schema({
  _tableName: "orders",
  id: s.sql({ type: "int", pk: true }),
  total: s.sql({ type: "int" }).client({ value: 0 }),
  // Client-only: computed from other fields, not stored
  formattedTotal: s.client(""),
}).derive({
  formattedTotal: (row) => `$${(row.total / 100).toFixed(2)}`,
});
```

### Schema Object Structure

The returned schema object has a clear separation of concerns:

```typescript
const schema = createSchema(mySchema);

schema.schemas;           // { sqlSchema, clientSchema, serverSchema } — Zod schemas
schema.transforms;        // { toClient, toDb, parseForDb, parseFromDb } — transformations
schema.defaults;          // Default values for forms
schema.generateDefaults; // Function to generate fresh defaults (executes randomizers)
schema.pk;               // Primary key field names
schema.clientPk;         // Client-side primary key field names
schema.isClientRecord;   // Function to check if a record is client-created
```

## Using Schemas

### Single Schema with `createSchema`

For standalone schemas without relationships:

```typescript
import { s, schema, createSchema } from "cogsbox-shape";

const contactSchema = schema({
  _tableName: "contacts",
  id: s.sql({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
  }),
  name: s.sql({ type: "varchar" }).server(({ sql }) => sql.min(2)),
  email: s.sql({ type: "varchar" }).server(({ sql }) => sql.email()),
  isArchived: s
    .sql({ type: "int" })
    .client(() => z.boolean())
    .transform({
      toClient: (val) => val === 1,
      toDb: (val) => (val ? 1 : 0),
    }),
});

const schema = createSchema(contactSchema);

// Access schemas directly
const { clientSchema, serverSchema, sqlSchema } = schema;
const { defaultValues, generateDefaults } = schema;

// Transforms for converting between layers
const { toClient, toDb, parseForDb, parseFromDb } = schema.transforms;

// Use in a form
const [data, setData] = useState(generateDefaults());
// { id: "new_a1b2c3d4", name: "", email: "", isArchived: false }

// Validate explicitly
const result = serverSchema.safeParse(data);

// Or handle validation & transformation in a single step!
const safeDbRow = parseForDb(data);
// Validates using serverSchema, outputs { isArchived: 0, ... }
```

## Relationships and Views

For schemas with relationships, use `createSchemaBox`.

### 1. Define Schemas with Placeholders

```typescript
import { s, schema, createSchemaBox } from "cogsbox-shape";

const users = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }),
  name: s.sql({ type: "varchar" }),
  posts: s.hasMany(), // Placeholder — resolved later
});

const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  title: s.sql({ type: "varchar" }),
  authorId: s.reference(() => users.id), // Foreign key
});
```

### 2. Create the Registry

The `createSchemaBox` function resolves relationships and gives you a type-safe API:

```typescript
const box = createSchemaBox({ users, posts }, (s) => ({
  users: {
    posts: { fromKey: "id", toKey: s.posts.authorId },
  },
}));
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
// transforms.apply() handles nested relations automatically
```
```
