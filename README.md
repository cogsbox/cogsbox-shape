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
s.sql()  →  .clientInput()  →  .client()  →  .server()  →  .transform()
```

| Method                                         | Purpose                                                        |
| ---------------------------------------------- | -------------------------------------------------------------- |
| `s.sql({ type, sqlOnly })`                      | Database column type. `sqlOnly` excludes from client.         |
| `.clientInput({ value, schema })`               | Client-side input schema and default value for new records.   |
| `.client(fn)`                                  | Client-side validation on the final client union type.         |
| `.server(fn)`                                  | Server-side validation. Stricter rules before database writes. |
| `.transform({ toClient, toDb })`                | Converts between database and client representations.          |

Note: `.derive()` is a schema-level method, not chainable on fields.

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

### 2. Client Input — Defaults and Client-Side Validation

`.clientInput()` sets the default value and client-side validation type for new records.

```typescript
const userSchema = schema({
  _tableName: "users",
  // DB stores auto-increment integers, but new records need a temp string ID
  id: s.sql({ type: "int", pk: true }).clientInput({
    value: () => crypto.randomUUID(),
    schema: z.string(),
  }),
  // clientInput type: string (just the user's schema)
  // Default value: a generated UUID string

  // Simple default without type override
  name: s.sql({ type: "varchar" }).clientInput({ value: "Anonymous" }),
  // clientInput type: string (inherits from SQL)
  // Default value: "Anonymous"

  // Type-only override (no default value change)
  count: s.sql({ type: "int" }).clientInput(() => z.number().min(0)),
  // clientInput type: number (with min validation)
  // Default value: inferred from type (0 for number)
});
```

**Note:** The final `client` schema is a union of `sql | clientInput` types, representing the complete app state after transforms.

### 3. Client — Client-Side Validation

`.client()` adds validation rules to the final `client` schema (the union of sql | clientInput). Use it for client-side validation that operates on the complete client type.

```typescript
name: s.sql({ type: "varchar" })
  .clientInput({ value: "" })
  .client((tools) => tools.clientInput.min(3, "Too short"))
  .server((tools) => tools.clientInput.min(5, "Must be at least 5 chars")),
```

The `.client()` callback receives `tools` with `sql`, `clientInput`, and `client` schemas.

### 4. Server — Server-Side Validation

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
  .clientInput(() => z.string().trim())
  .server(({ clientInput }) => clientInput.min(2, "Too short")),
```

### 5. Transform — Convert Between Layers

`.transform()` defines bidirectional conversion functions. These run on the server when reading from or writing to the database.

```typescript
status: s
  .sql({ type: "int" })                              // DB: 0 or 1
  .clientInput(() => z.enum(["active", "inactive"])) // Client input: string enum
  .transform({
    toClient: (dbValue) => dbValue === 1 ? "active" : "inactive",
    toDb: (clientValue) => clientValue === "active" ? 1 : 0,
  }),
```

Transforms are optional — only needed when the client type differs from the SQL type.

### 6. Derive — Computed Fields

`.derive()` is a schema-level method that adds computed fields based on other field values. These are available in defaults and client schema but NOT stored in the database.

```typescript
const userSchema = schema({
  _tableName: "users",
  firstName: s.sql({ type: "varchar" }).clientInput({ value: "John" }),
  lastName: s.sql({ type: "varchar" }).clientInput({ value: "Doe" }),
  fullName: s.clientInput(""),
}).derive({
  fullName: (row) => `${row.firstName} ${row.lastName}`,
});

// Defaults: { firstName: "John", lastName: "Doe", fullName: "John Doe" }
```

### 7. sqlOnly — Server-Only Fields

Use `sqlOnly: true` in `s.sql()` to mark a field as server-only. It will be stored in the database but excluded from the client schema.

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }),
  email: s.sql({ type: "varchar" }),
  internalToken: s.sql({ type: "varchar", sqlOnly: true }),
});

// Client schema: { id, email } — internalToken excluded
// SQL schema: { id, email, internalToken } — all fields
```

### Schema Object Structure

The returned schema object has a clear separation of concerns:

```typescript
const schema = createSchema(mySchema);

schema.schemas;             // { sql, clientInput, client, server } — Zod schemas
schema.transforms;         // { toClient, toDb, parseForDb, parseFromDb } — transformations
schema.defaults;           // Default values for forms
schema.generateDefaults;   // Function to generate fresh defaults (executes randomizers)
schema.pk;                 // Primary key field names
schema.clientPk;           // Client-side primary key field names
schema.isClientRecord;     // Function to check if a record is client-created
```

- `sql` — Raw database types (e.g., `number` for booleans)
- `clientInput` — User's input schema before transforms
- `client` — Union of `sql | clientInput`, the final app state after transforms
- `server` — Validation state for server boundary

## Using Schemas

### Single Schema with `createSchema`

For standalone schemas without relationships:

```typescript
import { s, schema, createSchema } from "cogsbox-shape";

const contactSchema = schema({
  _tableName: "contacts",
  id: s.sql({ type: "int", pk: true }).clientInput({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
  }),
  name: s.sql({ type: "varchar" }).server(({ sql }) => sql.min(2)),
  email: s.sql({ type: "varchar" }).server(({ sql }) => sql.email()),
  isActive: s
    .sql({ type: "boolean", default: true })
    .clientInput(() => z.boolean())
    .transform({
      toClient: (val) => Boolean(val),
      toDb: (val) => (val ? 1 : 0),
    }),
});

const schema = createSchema(contactSchema);

// Access schemas directly
const { sql, clientInput, client, server } = schema.schemas;
const { defaults, generateDefaults } = schema;

// Transforms for converting between layers
const { toClient, toDb, parseForDb, parseFromDb } = schema.transforms;

// Use in a form
const [data, setData] = useState(generateDefaults());
// { id: "new_a1b2c3d4", name: "", email: "", isActive: true }

// Validate explicitly
const result = server.safeParse(data);

// Or handle validation & transformation in a single step!
const safeDbRow = parseForDb(data);
// Validates using server schema, outputs { isActive: 1, ... }
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
// { id: number; name: string; isActive: boolean; }
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
