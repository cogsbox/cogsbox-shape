# Unified Schema

> ⚠️ **Warning**: This package is currently a work in progress and not ready for production use. The API is unstable and subject to breaking changes. Please do not use in production environments.

---

A TypeScript library for creating type-safe database schemas with Zod validation, SQL type definitions, and automatic client/server transformations. Unifies client, server, and database types through a single schema definition, with built-in support for relationships and serialization.

## Features

- Single source of truth for database, server, and client types
- Type-safe schema definitions with TypeScript
- Built-in Zod validation
- Automatic type transformations between client and database
- SQL migrations codegen from schemas
- Relationship handling (hasMany, hasOne, belongsTo)
- Schema serialization
- Default value generation
- CLI tool for SQL generation

## Installation

```bash
npm install cogsbox-shape
```

## Basic Usage

```typescript
import { shape, hasMany, createSchema } from "cogsbox-shape";

// Define your schemas with type safety
const userSchema = {
  _tableName: "users",
  id: shape.sql({ type: "int", pk: true }),
  firstname: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.min(1)),
  surname: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.min(1)),
  email: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.email()),
  pets: hasMany({
    fromKey: "id",
    toKey: () => petSchema.userId,
    schema: () => petSchema,
    defaultCount: 1,
  }),
};

// Create your schema and get typed utilities
const { dbSchema, clientSchema, initialValues, serialized } =
  createSchema(userSchema);
```

## Schema Export and SQL Generation

### Exporting Schemas

You can export your schemas for use with the CLI tool:

```typescript
// schemas.ts
import { petSchema, userSchema } from "./schemas";

const schemas = {
  user: userSchema,
  pet: petSchema,
};

export { schemas };
```

### Using the CLI

The package includes a CLI tool for generating SQL from your schemas. After installation, you can use it with:

```bash
npx cogsbox-shape generate-sql <file>
```

The CLI supports both TypeScript and JavaScript files:

```bash
# For TypeScript files
npx cogsbox-shape generate-sql schemas.ts

# For JavaScript files
npx cogsbox-shape generate-sql schemas.js
```

This will generate a SQL file (`cogsbox-shape-sql.sql`) containing the table definitions for all your schemas.

## Advanced Features

### Type Transformations

Transform data between client and database representations:

```typescript
const petSchema = {
  _tableName: "pets",
  fluffynessScale: shape
    .sql({ type: "text" })
    .client(({ zod }) => z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"])))
    .transform({
      toClient: (value) => value.split(",").filter(Boolean),
      toDb: (value) => value.join(","),
    }),
  favourite: shape
    .sql({ type: "int" })
    .client(({ zod }) => z.boolean())
    .transform({
      toClient: (dbValue) => dbValue === 1,
      toDb: (clientValue) => (clientValue ? 1 : 0),
    }),
};
```

### Relationships

Define relationships between schemas:

```typescript
const userSchema = {
  // ... other fields
  pets: hasMany({
    fromKey: "id",
    toKey: () => petSchema.userId,
    schema: () => petSchema,
    defaultCount: 1,
  }),
};
```

Supported relationships:

- `hasMany`
- `hasOne`
- `belongsTo`
- `manyToMany`

### SQL Types

Built-in SQL type definitions:

```typescript
shape.int({ nullable: true });
shape.varchar({ length: 255 });
shape.boolean();
shape.date();
shape.datetime();
shape.text();
shape.longtext();
```

### Validation

Add Zod validation to your schemas:

```typescript
const schema = {
  email: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.email()),
  age: shape.sql({ type: "int" }).db(({ zod }) => zod.min(0).max(120)),
};
```

## Type Safety

The library provides full type inference:

```typescript
const { dbSchema, clientSchema, initialValues } = createSchema(userSchema);

// These are fully typed:
type DBUser = z.infer<typeof dbSchema>;
type ClientUser = z.infer<typeof clientSchema>;
const defaults: typeof initialValues = {
  // TypeScript will ensure this matches your schema
};
```

## License

MIT
