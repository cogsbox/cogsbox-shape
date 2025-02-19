# Unified Schema

A TypeScript library for creating type-safe database schemas with Zod validation, SQL type definitions, and automatic client/server transformations. Unifies client, server, and database types through a single schema definition, with built-in support for relationships and serialization.

## Features

- Single source of truth for database, server, and client types
- Type-safe schema definitions with TypeScript
- Built-in Zod validation
- Automatic type transformations between client and database
- Support for SQL type definitions
- Relationship handling (hasMany, hasOne, belongsTo)
- Schema serialization
- Default value generation

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
