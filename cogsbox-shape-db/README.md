# cogsbox-shape-db

ORM layer for `cogsbox-shape` — type-safe database queries with automatic client/server transforms.

```ts
import { connect } from "cogsbox-shape-db";
import { createSqliteDb } from "cogsbox-shape-db/sqlite";
import { s, schema, createSchemaBox } from "cogsbox-shape";

const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).clientInput({ value: () => crypto.randomUUID(), clientPk: true }),
  name: s.sql({ type: "varchar", length: 100 }).clientInput({ value: "" }),
  email: s.sql({ type: "varchar", length: 255 }),
  isActive: s.sql({ type: "int" }).clientInput({ value: false }).transform({
    toClient: (v: number) => v === 1,
    toDb: (v: boolean) => (v ? 1 : 0),
  }),
});

const box = createSchemaBox({ users: userSchema }, { users: {} });
const db = await createSqliteDb("myapp.db");
const bx = connect(box, db);
```

---

## `connect(box, db)`

Enhances every table in the schema box with a `.db` property exposing CRUD methods. Also adds `bx.db.transaction()`.

| Argument | Type | Description |
|----------|------|-------------|
| `box` | Schema box from `createSchemaBox` | The shape definition |
| `db` | `Kysely<unknown>` | A Kysely database instance |

Returns a proxy of the box where every table entry is augmented with `.db: TableDB`.

### Transactions

```ts
const result = await bx.db.transaction(async (txBox) => {
  const u1 = await txBox.users.db.insert({ name: "Alice", email: "a@a.com" }).ids();
  const u2 = await txBox.users.db.insert({ name: "Bob", email: "b@b.com" }).ids();
  return { u1, u2 };
});
```

---

## `TableDB` Methods

Every table gets these methods via `.db`:

---

### `.findMany(opts?)`

Query multiple records.

```ts
bx.users.db.findMany()                                           // all
bx.users.db.findMany({ where: { isActive: true } })              // filter
bx.users.db.findMany({ where: { name: { contains: "Ali" } } })   // operator
bx.users.db.findMany({ orderBy: { name: "asc" }, limit: 10, offset: 20 })
```

**`FindManyOpts<T>`:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `where` | `WhereInput<Partial<T>>` | — | Filter conditions (see below) |
| `orderBy` | `{ [K in keyof T]?: "asc"\|"desc" }` | — | Sort columns |
| `limit` | `number` | `100` | Max rows to return |
| `offset` | `number` | — | Number of rows to skip |

Returns `Promise<TClient[]>`

---

### `.findById(id)`

```ts
const user = await bx.users.db.findById(1);   // single-column PK
const rel = await bx.parents.db.findById([1, "en"]);  // composite PK
```

Returns `Promise<TClient | null>`.

---

### `.insert(data).ids()`

Inserts a record and returns only the generated primary key(s).

```ts
const pk = await bx.users.db.insert({
  name: "Alice",
  email: "alice@test.com",
  isActive: true,
}).ids();
// { id: 1 }
```

### `.insert(data).full()`

Inserts a record and returns the client-side row with DB-assigned primary keys reconciled back onto it.

For plain tables, returned DB PK columns are mapped onto the matching client fields. For views, the view reconciler is used, so nested view data can be merged with the server response.

```ts
const user = await bx.users.db.insert(bx.users.generateDefaults()).full();
// { id: 1, name: "...", email: "...", isActive: false }
```

### `.create(data)` (legacy)

Alias for `.insert(data).ids()`.

---

### `.update(id, data).ids()`

Updates a record by primary key and returns the PK.

```ts
const pk = await bx.users.db.update(1, { name: "Alice Updated", isActive: true }).ids();
```

### `.update(id, data).full()`

Updates and returns the full stored row after the update.

Throws `RecordNotFoundError` if no row matched.

---

### `.delete(id)`

```ts
const { deleted } = await bx.users.db.delete(1);
// { deleted: true } or { deleted: false }
```

---

### `.count(where?)`

```ts
const total = await bx.users.db.count();
const active = await bx.users.db.count({ isActive: true });
```

---

### `.reconcileIds(clientData, ids)`

Maps DB-assigned IDs back onto client data without doing a database insert.

For plain tables, DB column names are mapped back to client field names, so `{ user_id: 1 }` can become `{ publicId: 1 }` when `publicId` is configured with `field: "user_id"`. For views, this delegates to the view reconciler.

```ts
const reconciled = bx.users.db.reconcileIds(draft, { id: 1 });
// { id: 1, name: "...", ... }
```

---

## Where Filters & Operators

Filters are passed via `{ where: { field: value } }`.

**Short form** — exact match:

```ts
{ where: { name: "Alice" } }
// WHERE "name" = 'Alice'
```

**Operator form** — supported operators:

| Operator | Example | SQL |
|----------|---------|-----|
| `contains` | `{ name: { contains: "Ali" } }` | `WHERE "name" LIKE '%Ali%'` |
| `startsWith` | `{ name: { startsWith: "A" } }` | `WHERE "name" LIKE 'A%'` |
| `endsWith` | `{ name: { endsWith: "ce" } }` | `WHERE "name" LIKE '%ce'` |
| `gt` | `{ age: { gt: 18 } }` | `WHERE "age" > 18` |
| `gte` | `{ age: { gte: 18 } }` | `WHERE "age" >= 18` |
| `lt` | `{ age: { lt: 65 } }` | `WHERE "age" < 65` |
| `lte` | `{ age: { lte: 65 } }` | `WHERE "age" <= 65` |
| `in` | `{ status: { in: ["a", "b"] } }` | `WHERE "status" IN ('a', 'b')` |
| `not` | `{ status: { not: "deleted" } }` | `WHERE "status" != 'deleted'` |
| `not.contains` | `{ name: { not: { contains: "x" } } }` | `WHERE "name" NOT LIKE '%x%'` |

Values are automatically run through the field's `toDb` transform before being sent to the database.

---

## Views & Reconciliation

Views create a client-side "draft" of a record with a temporary primary key, which gets replaced with the real DB-assigned PK on insert.

### Creating a view

```ts
const view = bx.users.createView({});
const draft = view.defaults();
// { id: "new_a1b2c3d4", name: "", email: "", isActive: false }
```

### Inserting with reconciliation

```ts
const pk = await view.db.insert(draft).ids();
const user = view.reconcile(draft).withServer(pk);
// { id: 1, name: "", email: "", isActive: false }
```

Or use the shorthand:

```ts
const user = await view.db.insert(draft).full();
```

### Batch reconciliation

```ts
const drafts = [view.defaults(), view.defaults()];
const pks = await Promise.all(drafts.map(d => view.db.insert(d).ids()));
const users = view.reconcile(drafts).withServer(pks);
```

---

## SQLite Driver

```ts
import { createSqliteDb } from "cogsbox-shape-db/sqlite";

// File-backed
const db = await createSqliteDb("./data.db");

// In-memory
const db = await createSqliteDb(":memory:");
```

Uses `better-sqlite3` under the hood. Passes a raw `Kysely` instance — you own the table creation (run `CREATE TABLE` statements directly on it before using `connect`).

---

## Errors

| Error | When |
|-------|------|
| `RecordNotFoundError` | `update().ids()` or `update().full()` when no row matches the PK |
| `ValidationError` | Future hook-based validation (exposes an `.issues` array) |

---

## Import Paths

| Path | Exports |
|------|---------|
| `cogsbox-shape-db` | `connect`, `TableDB`, `WhereInput`, `WhereValue`, `FindManyOpts`, `TableMeta`, `RecordNotFoundError`, `ValidationError` |
| `cogsbox-shape-db/sqlite` | `createSqliteDb` |
