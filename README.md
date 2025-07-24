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
SQL ←→ Transform ←→ Client ←→ Validation
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

When creating new records, you often need different types than what's stored in the database:

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState(() => crypto.randomUUID()),
  // DB stores integers, but new records start with UUID strings
  // This automatically creates a union type: number | string on the client
});
```

### 3. Client - Define Client Representation

Transform how data appears to clients:

```typescript
const productSchema = schema({
  _tableName: "products",
  id: s.sql({ type: "int", pk: true }).initialState(() => `tmp_${Date.now()}`),

  price: s
    .sql({ type: "int" }) // Stored as cents in DB
    .client(() => z.number().multipleOf(0.01)) // But dollars on client
    .transform({
      toClient: (cents) => cents / 100,
      toDb: (dollars) => Math.round(dollars * 100),
    }),
});
```

### 4. Validation - Define Business Rules

Add validation that runs at your client -> server boundary:

```typescript
const userSchema = schema({
  _tableName: "users",
  email: s
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.email().toLowerCase()),

  age: s.sql({ type: "int" }).validation(({ sql }) => sql.min(18).max(120)),
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

## Relationships with Schema Box Registry

Define relationships between schemas using the Schema Box Registry pattern:

```typescript
import { s, schema, createSchemaBox } from "cogsbox-shape";

// Define schemas with relationship placeholders
const users = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }),
  name: s.sql({ type: "varchar" }),
  posts: s.hasMany(), // Placeholder for relationship
});

const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  title: s.sql({ type: "varchar" }),
  authorId: s.reference(() => users.id), // Reference to user
});

// Create registry and resolve relationships
const schemas = createSchemaBox({ users, posts }, (s) => ({
  users: {
    posts: { fromKey: "id", toKey: s.posts.authorId },
  },
  posts: {}, // No outgoing relationships
}));

// Use the schemas
const { zodSchemas } = schemas.users;
const { clientSchema, defaultValues, toClient, toDb } = zodSchemas;

// Type-safe operations
const newUser = defaultValues; // Fully typed with defaults
const dbUser = toDb(clientData); // Transform for database
const apiUser = toClient(dbData); // Transform for API
```

## Real-World Example

Here's a complete example showing the power of the flow:

```typescript
import { s, schema, createSchemaBox, z } from "cogsbox-shape";

const users = schema({
  _tableName: "users",
  id: s
    .sql({ type: "int", pk: true })
    .initialState(() => `user_${crypto.randomUUID()}`),

  email: s
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.email()),

  metadata: s
    .sql({ type: "text" })
    .initialState(() => ({
      preferences: { theme: "light", notifications: true },
    }))
    .client(() =>
      z.object({
        preferences: z.object({
          theme: z.enum(["light", "dark"]),
          notifications: z.boolean(),
        }),
      })
    )
    .transform({
      toClient: (json) => JSON.parse(json),
      toDb: (obj) => JSON.stringify(obj),
    }),

  posts: s.hasMany({ defaultCount: 0 }),
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

const schemas = createSchemaBox({ users, posts }, (s) => ({
  users: {
    posts: { fromKey: "id", toKey: s.posts.authorId },
  },
}));

// Use in your app
const userSchemas = schemas.users.zodSchemas;
type User = z.infer<typeof userSchemas.clientSchema>;
// {
//   id: string | number;
//   email: string;
//   metadata: { preferences: { theme: "light" | "dark"; notifications: boolean } };
//   posts: Array<Post>;
// }

// Create new user with defaults
const newUser = userSchemas.defaultValues;

// Validate user input
const validated = userSchemas.validationSchema.parse(userInput);

// Transform for database
const dbUser = userSchemas.toDb(validated);

// Transform for API response
const apiUser = userSchemas.toClient(dbUser);
```

## Why This Approach?

1. **Type Safety**: Full TypeScript support with inferred types at every layer
2. **Single Source of Truth**: Define your schema once, use it everywhere
3. **Transformation Co-location**: Keep data transformations next to field definitions
4. **Progressive Enhancement**: Start simple, add complexity as needed
5. **Framework Agnostic**: Works with any TypeScript project

## API Reference

### Schema Definition

- `s.sql(config)`: Define SQL column type
- `.initialState(value)`: Set default value for new records
- `.client(schema)`: Define client-side schema
- `.validation(schema)`: Add validation rules
- `.transform(transforms)`: Define bidirectional transformations

### Relationships

- `s.reference(getter)`: Create a foreign key reference
- `s.hasMany(config)`: Define one-to-many relationship
- `s.hasOne()`: Define one-to-one relationship
- `s.manyToMany(config)`: Define many-to-many relationship

### Schema Processing

- `schema(definition)`: Create a schema definition
- `createSchemaBox(schemas, resolver)`: Create and resolve schema relationships
- `createSchema(schema, relations?)`: Generate Zod schemas (legacy API)

## License

MIT
