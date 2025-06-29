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
- **Client** expects data in specific formats (e.g., UUIDs as strings, not numbers)
- **Forms** need validation rules and default values

Traditional approaches require defining these transformations in multiple places, leading to type mismatches and runtime errors.

## The Solution: The Shape Flow

cogsbox-shape introduces a unified flow that mirrors how data moves through your application:

```
SQL → Initial State → Client → Validation
```

This flow ensures type safety at every step while giving you control over transformations.

## Core Concept: The Shape Flow

### 1. SQL - Define Your Database Schema

Start with your database reality:

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s.int({ pk: true }), // In DB: integer auto-increment
  email: s.varchar({ length: 255 }),
  createdAt: s.datetime({ default: "CURRENT_TIMESTAMP" }),
});
```

### 2. Initial State - Define Creation Defaults

When creating new records, you often need different types than what's stored in the database. Initial state serves two purposes: defining default values AND adding additional types to the client schema.

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s
    .int({ pk: true })
    .initialState(z.string().uuid(), () => crypto.randomUUID()),
  // DB stores integers, but client can work with UUID strings for new records
  // This automatically creates a union type: number | string on the client
});
```

### 3. Client - Define Client Representation

Transform how data appears to clients:

```typescript
const productSchema = schema({
  _tableName: "products",
  id: s
    .int({ pk: true })
    .initialState(z.string(), () => `tmp_${Date.now()}`)
    .client(({ sql, initialState }) => z.union([sql, initialState])),
  // Client can receive either the integer (from DB) or string (when creating)

  price: s
    .int() // Stored as cents in DB
    .client(() => z.number().multipleOf(0.01)) // But dollars on client
    .transform({
      toClient: (cents) => cents / 100,
      toDb: (dollars) => Math.round(dollars * 100),
    }),
});
```

### 4. Validation - Define Business Rules

Add validation that runs before data enters your system:

```typescript
const userSchema = schema({
  _tableName: "users",
  email: s
    .varchar({ length: 255 })
    .client(({ sql }) => sql)
    .validation(({ client }) => client.email().toLowerCase()),

  age: s.int().validation(({ sql }) => sql.min(18).max(120)),
});
```

## Why This Flow?

The flow matches how data moves through your application:

1. **SQL**: Database constraints and types
2. **Initial State**: What shape new records take before persistence
3. **Client**: How data looks in your UI/API
4. **Validation**: Business rules applied to user input
5. **Transform**: Convert between database and client representations

Each step can reference previous steps, creating a pipeline:

```typescript
const orderSchema = schema({
  _tableName: "orders",
  status: s
    .varchar({ length: 20 })
    // 1. SQL: Simple varchar in database
    .initialState(z.literal("draft"), () => "draft")
    // 2. Initial: New orders start as 'draft'
    .client(({ sql }) => z.enum(["draft", "pending", "shipped", "delivered"]))
    // 3. Client: Enforce enum on client
    .validation(({ client }) => client),
  // 4. Validation: Use same rules as client

  totalPrice: s
    .int()
    // 1. SQL: Store as cents (integer)
    .client(() => z.number().multipleOf(0.01))
    // 2. Client: Work with dollars (decimal)
    .transform({
      toClient: (cents) => cents / 100,
      toDb: (dollars) => Math.round(dollars * 100),
    }),
  // 3. Transform: Automatically convert between cents and dollars
});
```

This approach ensures type safety throughout your entire data lifecycle while keeping transformations co-located with your schema definition.

## Real-World Example

Here's a complete example showing the power of the flow:

```typescript
const userSchema = schema({
  _tableName: "users",
  id: s.int({ pk: true }).initialState(z.string().uuid(), () => uuidv4()),

  email: s.varchar({ length: 255 }).validation(({ sql }) => sql.email()),

  metadata: s
    .text()
    .initialState(
      z.object({
        preferences: z.object({
          theme: z.enum(["light", "dark"]),
          notifications: z.boolean(),
        }),
      }),
      () => ({ preferences: { theme: "light", notifications: true } })
    )
    .client(({ initialState }) => initialState)
    .transform({
      toClient: (json) => JSON.parse(json),
      toDb: (obj) => JSON.stringify(obj),
    }),
});

const userRelations = schemaRelations(userSchema, (rel) => ({
  posts: rel
    .hasMany({
      fromKey: "id",
      toKey: () => postRelations.userId,
      defaultCount: 0,
    })
    .validation(({ client }) =>
      client.min(1, "User must have at least one post")
    ),
}));

// Generate schemas
const { sqlSchema, clientSchema, validationSchema, defaultValues } =
  createSchema(userSchema, userRelations);

// Use in your app
const newUser = defaultValues; // Fully typed with defaults
const validated = validationSchema.parse(userInput); // Runtime validation
const dbUser = toDb(validated); // Transform for database
const apiUser = toClient(dbUser); // Transform for API
```

## Relationships

Define relationships that are type-safe across all layers:

```typescript
const messageSchema = schema({
  _tableName: "messages",
  id: s.int({ pk: true }).initialState(z.string(), () => uuidv4()),
  content: s.text(),
  timestamp: s.datetime(),
});

const messageRelations = schemaRelations(messageSchema, (rel) => ({
  recipients: rel
    .hasMany({
      fromKey: "id",
      toKey: () => recipientRelations.messageId,
    })
    .validation(({ sql }) => sql.min(1, "Must have at least one recipient")),
}));

// The flow works with relationships too!
const { clientSchema } = createSchema(messageSchema, messageRelations);
type Message = z.infer<typeof clientSchema>;
// {
//   id: string | number;
//   content: string;
//   timestamp: Date;
//   recipients: Array<Recipient>;
// }
```

## License

MIT
