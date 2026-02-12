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
s.sql()  →  .initialState()  →  .client()  →  .server()  →  .transform()
```

| Method                             | Purpose                                                        |
| ---------------------------------- | -------------------------------------------------------------- |
| `s.sql({ type })`                  | Database column type. The starting point for every field.      |
| `.initialState({ value, schema })` | Default value and type for new records created on the client.  |
| `.client(fn)`                      | Client-side validation. Overrides the client type if needed.   |
| `.server(fn)`                      | Server-side validation. Stricter rules before database writes. |
| `.transform({ toClient, toDb })`   | Converts between database and client representations.          |

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

### 2. Initial State — Defaults for New Records

When creating new records on the client, you often need different types than what the database stores. `.initialState()` sets the default value and optionally narrows or widens the client type.

```typescript
const userSchema = schema({
  _tableName: "users",
  // DB stores auto-increment integers, but new records need a temp string ID
  id: s.sql({ type: "int", pk: true }).initialState({
    value: () => crypto.randomUUID(),
    schema: z.string(),
  }),
  // Client type becomes: string | number (union of SQL + initialState)
  // Default value: a generated UUID string
});
```

If the type you pass to `.initialState()` matches the SQL type, no union is created:

```typescript
count: s.sql({ type: "int" }).initialState({ value: 0 }),
// Client type: number (no union, same type)
// Default value: 0
```

### 3. Client — Client-Side Validation

The client schema is automatically derived as a union of the SQL type (data fetched from the database) and the initial state type (data created on the client). `.client()` lets you override this to add client-side validation rules or declare a completely different type.

```typescript
// Without .client() — the type is inferred automatically
id: s.sql({ type: "int", pk: true }).initialState({
  value: () => crypto.randomUUID(),
  schema: z.string(),
}),
// Client type: string | number
// (string from initialState + number from SQL)

// With .client() — add validation rules
name: s
  .sql({ type: "varchar" })
  .client(({ sql }) => sql.min(2).max(100)),
// Client type: string (with min/max validation)

// With .client() — declare a different type entirely
// Pair with .transform() to convert between them
isActive: s
  .sql({ type: "int" })
  .client(() => z.boolean())
  .transform({
    toClient: (dbValue) => dbValue === 1,
    toDb: (clientValue) => (clientValue ? 1 : 0),
  }),
// Client type: boolean (DB stores 0/1, client works with true/false)
```

When `.client()` overrides the type without `.initialState()`, the default value is inferred from the client schema (e.g., `boolean` → `false`, `string` → `""`).

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
  .client(() => z.string().trim())
  .server(({ client }) => client.min(2, "Too short")),
```

### 5. Transform — Convert Between Layers

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

## Using Schemas

### Single Schema with `createSchema`

For standalone schemas without relationships:

```typescript
import { s, schema, createSchema } from "cogsbox-shape";

const contactSchema = schema({
  _tableName: "contacts",
  id: s.sql({ type: "int", pk: true }).initialState({
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

const {
  clientSchema, // Zod schema for client-side validation
  validationSchema, // Zod schema with .server() rules
  sqlSchema, // Zod schema matching DB column types
  defaultValues, // Typed defaults matching clientSchema
  toClient, // DB row → client object
  toDb, // Client object → DB row
} = createSchema(contactSchema);

// Use in a form
const [data, setData] = useState(defaultValues);
// { id: "new_a1b2c3d4", name: "", email: "", isArchived: false }

// Validate
const result = validationSchema.safeParse(data);

// Transform (on the server)
const dbRow = toDb(data); // { isArchived: 0, ... }
const clientObj = toClient(row); // { isArchived: true, ... }
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
const { schemas, defaults } = box.users;

type UserClient = z.infer<typeof schemas.client>;
// { id: number; name: string; }
// No 'posts' — relations are excluded from base schemas
```

### 4. Create Views to Include Relations

Explicitly select which relations to include:

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

const defaults = userWithPosts.defaults;
// { id: 0, name: '', posts: [] }
```

## Complete Example

```typescript
import { s, schema, createSchemaBox } from "cogsbox-shape";
import { z } from "zod";

const users = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState({
    value: () => `user_${crypto.randomUUID()}`,
    schema: z.string(),
  }),
  email: s
    .sql({ type: "varchar", length: 255 })
    .server(({ sql }) => sql.email()),
  isActive: s
    .sql({ type: "int" })
    .client(() => z.boolean())
    .transform({
      toClient: (val) => val === 1,
      toDb: (val) => (val ? 1 : 0),
    }),
  posts: s.hasMany({ count: 0 }),
});

const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  title: s.sql({ type: "varchar" }),
  authorId: s.reference(() => users.id),
});

const box = createSchemaBox({ users, posts }, (s) => ({
  users: {
    posts: { fromKey: "id", toKey: s.posts.authorId },
  },
}));

// Base schema (no relations)
const { schemas, defaults, transforms } = box.users;

// View with relations
const userView = box.users.createView({ posts: true });
const { client, server } = userView.schemas;

// Type inference
type User = z.infer<typeof client>;

// Validation
const result = server.safeParse(formData);

// Transformation (server-side)
const dbRow = transforms.toDb(validated);
const apiResponse = transforms.toClient(dbRow);
```

## API Reference

### Schema Definition

- `s.sql(config)` — Define SQL column type. The starting point for every field.
- `.initialState({ value, schema })` — Set default value for new records. Optionally provide a Zod schema to widen or narrow the client type.
- `.client(schema | fn)` — Define the client-side Zod schema for validation. Use when the client type differs from SQL.
- `.server(schema | fn)` — Add server-side validation rules. Receives the previous schema in the chain for refinement.
- `.transform({ toClient, toDb })` — Define bidirectional conversion between SQL and client types. Runs on the server.

### Relationships

- `s.reference(getter)` — Create a foreign key reference to another schema's field.
- `s.hasMany(config)` — Declare a one-to-many relationship placeholder.
- `s.hasOne(config)` — Declare a one-to-one relationship placeholder.
- `s.manyToMany(config)` — Declare a many-to-many relationship placeholder.

### Schema Processing

- `schema(definition)` — Create a schema definition from field declarations.
- `createSchema(schema)` — Process a single schema. Returns `clientSchema`, `validationSchema`, `sqlSchema`, `defaultValues`, `toClient`, `toDb`.
- `createSchemaBox(schemas, resolver)` — Process multiple schemas with relationships. Returns a registry with:
  - `.schemas` — Base Zod schemas (excludes relations).
  - `.defaults` — Typed default values.
  - `.transforms` — `toClient` and `toDb` functions.
  - `.createView(selection)` — Create a view including selected relations.

## License

MIT
