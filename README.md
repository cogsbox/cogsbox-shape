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

| Method                                       | Purpose                                                        |
| -------------------------------------------- | -------------------------------------------------------------- |
| `s.sql({ type })`                            | Database column type. The starting point for every field.      |
| `.initialState({ value, schema, clientPk })` | Default value and type for new records created on the client.  |
| `.client(fn)`                                | Client-side validation. Overrides the client type if needed.   |
| `.server(fn)`                                | Server-side validation. Stricter rules before database writes. |
| `.transform({ toClient, toDb })`             | Converts between database and client representations.          |

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
    clientPk: true, // Explicitly marks this as a client PK, auto-creating a union type
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
    clientPk: true,
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
  serverSchema, // Zod schema with .server() rules
  sqlSchema, // Zod schema matching DB column types
  defaultValues, // Typed defaults matching clientSchema
  generateDefaults, // Generates fresh defaults (executes randomizers/dates)
  parseForDb, // Validates client app data & transforms to DB format
  parseFromDb, // Transforms DB data & validates to Client format
} = createSchema(contactSchema);

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
const { schemas, defaults } = box.users;

type UserClient = z.infer<typeof schemas.client>;
// { id: number; name: string; }
// No 'posts' — relations are excluded from base schemas
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

const defaults = userWithPosts.defaults;
// { id: 0, name: '', posts:
```
