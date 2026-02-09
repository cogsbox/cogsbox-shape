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
- **Server** needs to transform data for clients (e.g., convert cents to dollars)
- **Client** expects data in specific formats (e.g., temporary UUIDs for new records)
- **Forms** need validation rules and default values

Traditional approaches require defining these transformations in multiple places, leading to type mismatches and runtime errors.

## The Solution: The Shape Flow

cogsbox-shape introduces a unified flow that mirrors how data moves through your application:

```
        Initial State
                   \
SQL ←→ Transform ←→ Client ←→ Server (Validation)
```

This flow ensures type safety at every step while giving you control over transformations.

## Core Concept: The Shape Flow

### 1. SQL - Define Your Database Schema

Start with your database reality:

```typescript
import { s, schema } from "cogsbox-shape";

const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }), // In DB: integer auto-increment
  email: s.sql({ type: "varchar", length: 255 }),
  createdAt: s.sql({ type: "datetime", default: "CURRENT_TIMESTAMP" }),
});
```

### 2. Initial State - Define Creation Defaults

When creating new records, you often need different types than what's stored in the database.

**Note:** `initialState` takes an object configuration where you provide the runtime `value` and optionally the Zod `schema`.

```typescript
import { z } from "zod";

const userSchema = schema({
  _tableName: "users",
  // DB stores integers, but new records start with UUID strings
  id: s.sql({ type: "int", pk: true }).initialState({
    value: () => crypto.randomUUID(),
    schema: z.string(),
  }),
  // This automatically creates a union type: number | string on the client
});
```

### 3. Client - Define Client Representation

Transform how data appears to clients using `.client()`:

```typescript
const productSchema = schema({
  _tableName: "products",
  id: s.sql({ type: "int", pk: true }).initialState({
    value: () => `tmp_${Date.now()}`,
    schema: z.string(),
  }),

  price: s
    .sql({ type: "int" }) // Stored as cents in DB
    .client(() => z.number().multipleOf(0.01)) // But dollars on client
    .transform({
      toClient: (cents) => cents / 100,
      toDb: (dollars) => Math.round(dollars * 100),
    }),
});
```

### 4. Server - Define Validation Rules

Add validation that runs at your client -> server boundary using `.server()`:

```typescript
const userSchema = schema({
  _tableName: "users",
  email: s
    .sql({ type: "varchar", length: 255 })
    .server(({ sql }) => sql.email().toLowerCase()),

  age: s.sql({ type: "int" }).server(({ sql }) => sql.min(18).max(120)),
});
```

### 5. Transform - Convert Between Representations

Define bidirectional transformations between database and client:

```typescript
const userSchema = schema({
  _tableName: "users",
  status: s
    .sql({ type: "int" }) // 0 or 1 in database
    .client(() => z.enum(["active", "inactive"])) // String enum on client
    .transform({
      toClient: (dbValue) => (dbValue === 1 ? "active" : "inactive"),
      toDb: (clientValue) => (clientValue === "active" ? 1 : 0),
    }),
});
```

## Relationships and Views

Define relationships between schemas and create specific data views using the `createSchemaBox`.

### 1. Define Schemas with Placeholders

```typescript
import { s, schema, createSchemaBox } from "cogsbox-shape";

// Define schemas with relationship placeholders
const users = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }),
  name: s.sql({ type: "varchar" }),
  posts: s.hasMany(), // Placeholder for a one-to-many relationship
});

const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  title: s.sql({ type: "varchar" }),
  authorId: s.reference(() => users.id), // Foreign key reference
});
```

### 2. Create the Registry (The "Box")

The `createSchemaBox` function processes your raw schemas, resolves the relationships, and gives you a powerful, type-safe API for accessing them.

```typescript
const box = createSchemaBox({ users, posts }, (s) => ({
  users: {
    // Resolve the 'posts' relation on the 'users' schema
    posts: { fromKey: "id", toKey: s.posts.authorId },
  },
}));
```

### 3. Access Base Schemas

By default, the schemas accessed directly on the box **exclude relations**. This prevents circular dependencies and over-fetching.

```typescript
// Access the processed schemas for the 'users' table
const userSchemas = box.users.schemas;

// The base schema does NOT include the 'posts' relation
type UserClient = z.infer<typeof userSchemas.client>;
// { id: number; name: string; }
```

### 4. Create Views to Include Relations

To include relationships, you must explicitly create a view. This ensures you only load the data you need.

```typescript
// Create a view that includes the 'posts' for a user
const userWithPostsView = box.users.createView({
  posts: true, // Select the 'posts' relation
});

// The type of this view now includes the nested posts
type UserWithPosts = z.infer<typeof userWithPostsView.schemas.client>;
// {
//   id: number;
//   name: string;
//   posts: {
//     id: number;
//     title: string;
//     authorId: number;
//   }[];
// }

// You can also get default values specifically for this view
const defaults = userWithPostsView.defaults;
// { id: 0, name: '', posts: [] }
```

## Real-World Example

Here's a complete example showing the power of the flow:

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

  metadata: s
    .sql({ type: "text" })
    .client(
      z.object({
        preferences: z.object({
          theme: z.enum(["light", "dark"]),
          notifications: z.boolean(),
        }),
      }),
    )
    .transform({
      toClient: (json) => JSON.parse(json),
      toDb: (obj) => JSON.stringify(obj),
    }),

  posts: s.hasMany({ count: 0 }), // Default to an empty array
});

const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  title: s.sql({ type: "varchar" }),
  published: s
    .sql({ type: "int" }) // 0 or 1 in DB
    .client(() => z.boolean())
    .transform({
      toClient: (int) => Boolean(int),
      toDb: (bool) => (bool ? 1 : 0),
    }),
  authorId: s.reference(() => users.id),
});

const box = createSchemaBox({ users, posts }, (s) => ({
  users: {
    posts: { fromKey: "id", toKey: s.posts.authorId },
  },
}));

// 1. Create a View for your API response
const userApiView = box.users.createView({ posts: true });
const { client, server } = userApiView.schemas;
const { toClient, toDb } = userApiView.transforms;

// 2. Type Inference
type UserApiResponse = z.infer<typeof client>;

// 3. Validation
// Validate user input against the view's server schema
const validated = server.parse(userInput);

// 4. Transformation
const dbUser = toDb(validated); // Ready for SQL
const apiUser = toClient(dbUser); // Ready for API response
```

## API Reference

### Schema Definition

- `s.sql(config)`: Define SQL column type.
- `.initialState({ value, schema })`: Set default value for new records and the Zod schema for that state.
- `.client(schema | fn)`: Define client-side schema.
- `.server(schema | fn)`: Add validation rules (runs on server before DB insertion).
- `.transform(transforms)`: Define `toClient` and `toDb` transformations.

### Relationships

- `s.reference(getter)`: Create a foreign key reference.
- `s.hasMany(config)`: Define one-to-many relationship placeholder.
- `s.hasOne(config)`: Define one-to-one relationship placeholder.
- `s.manyToMany(config)`: Define many-to-many relationship placeholder.

### Schema Processing

- `schema(definition)`: Create a schema definition.
- `createSchemaBox(schemas, resolver)`: The main function to create and resolve a schema registry.
- From the box entry (e.g., `box.users`):
  - `.schemas`: Access base Zod schemas (excludes relations).
  - `.defaults`: Access base default values.
  - `.createView(selection)`: Creates a specific view including selected relations.

## License

MIT
