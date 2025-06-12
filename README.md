# Unified Schema

> ⚠️ **Warning**: This package is currently a work in progress and not ready for production use. The API is unstable and subject to breaking changes. Please do not use in production environments.

---

A TypeScript library for creating type-safe database schemas with Zod validation, SQL type definitions, and automatic client/server transformations. Unifies client, server, and database types through a single schema definition, with built-in support for relationships and serialization.

## Features

- Single source of truth for database, server, and client types
- Type-safe schema definitions with TypeScript
- Built-in Zod validation
- Automatic type transformations between client and database
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

const productSchema = {
  _tableName: "products",
  id: shape.sql({ type: "int", pk: true }),
  sku: shape
    .sql({ type: "varchar", length: 50 })
    .initialState(
      z.string(),
      () => "PRD-" + Math.random().toString(36).slice(2)
    )
    .validation(({ sql }) => sql.min(5).max(50)),
  price: shape
    .sql({ type: "int" })
    .client(({ sql }) => z.number().multipleOf(0.01))
    .transform({
      toClient: (dbValue) => dbValue / 100,
      toDb: (clientValue) => Math.round(clientValue * 100),
    }),
  inStock: shape
    .sql({ type: "boolean" })
    .client(({ sql }) => z.boolean())
    .initialState(z.boolean(), () => true),
  categories: hasMany({
    fromKey: "id",
    toKey: () => categorySchema.productId,
    schema: () => categorySchema,
  }),
};

const { sqlSchema, clientSchema, validationSchema, defaultValues } =
  createSchema(productSchema);
```

## Advanced Features

### Type Transformations

Transform data between client and database representations:

```typescript
const orderSchema = {
  _tableName: "orders",
  id: shape
    .sql({ type: "int", pk: true })
    .initialState(z.string().uuid(), () => crypto.randomUUID())
    .client(({ sql, initialState }) => z.union([sql, initialState])),
  status: shape
    .sql({ type: "varchar", length: 20 })
    .client(({ sql }) =>
      z.enum(["pending", "processing", "shipped", "delivered"])
    )
    .validation(({ sql }) =>
      sql.refine((val) =>
        ["pending", "processing", "shipped", "delivered"].includes(val)
      )
    ),
  metadata: shape
    .sql({ type: "text" })
    .client(({ sql }) => z.record(z.unknown()))
    .transform({
      toClient: (value) => JSON.parse(value),
      toDb: (value) => JSON.stringify(value),
    }),
  createdAt: shape
    .sql({ type: "datetime" })
    .client(({ sql }) => z.string().datetime())
    .transform({
      toClient: (date) => date.toISOString(),
      toDb: (isoString) => new Date(isoString),
    }),
};
```

### Relationships

Define relationships between schemas:

```typescript
const customerSchema = {
  _tableName: "customers",
  id: shape.sql({ type: "int", pk: true }),
  name: shape.sql({ type: "varchar", length: 100 }),
  orders: hasMany({
    fromKey: "id",
    toKey: () => orderSchema.customerId,
    schema: () => orderSchema,
  }),
  primaryAddress: hasOne({
    fromKey: "id",
    toKey: () => addressSchema.customerId,
    schema: () => addressSchema,
  }),
  company: belongsTo({
    fromKey: "companyId",
    toKey: () => companySchema.id,
    schema: () => companySchema,
  }),
};
```

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
const userSchema = {
  _tableName: "users",
  email: shape
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.email().toLowerCase()),
  password: shape
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) =>
      sql
        .min(8)
        .regex(/[A-Z]/, "Must contain uppercase letter")
        .regex(/[0-9]/, "Must contain number")
    ),
  birthDate: shape
    .sql({ type: "date" })
    .validation(({ sql }) => sql.min(new Date("1900-01-01")).max(new Date())),
};
```

## Type Safety

The library provides full type inference:

```typescript
const { sqlSchema, clientSchema, validationSchema, defaultValues } =
  createSchema(userSchema);

// These are fully typed:
type DBUser = z.infer<typeof sqlSchema>;
type ClientUser = z.infer<typeof clientSchema>;
type ValidationUser = z.infer<typeof validationSchema>;
const defaults: typeof defaultValues = {
  // TypeScript will ensure this matches your schema
};
```

## License

MIT
