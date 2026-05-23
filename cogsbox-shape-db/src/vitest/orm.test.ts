import { describe, it, expect, beforeAll } from "vitest";
import { s, schema, createSchemaBox } from "cogsbox-shape";
import { connect } from "../connect.js";
import { createSqliteDb } from "../sqlite/sqlite-driver.js";
import { Kysely, sql } from "kysely";

const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).clientInput({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  name: s.sql({ type: "varchar", length: 100 }).clientInput({ value: "" }),
  email: s
    .sql({ type: "varchar", length: 255 })
    .server(({ sql }) => sql.email()),
  tenantId: s.sql({
    type: "varchar",
    length: 100,
    nullable: true,
    field: "tenant_id",
    sqlOnly: true,
  }),
  statusLabel: s.clientInput(""),
  isActive: s
    .sql({ type: "int" })
    .clientInput({ value: false })
    .transform({
      toClient: (val: number) => val === 1,
      toDb: (val: boolean) => (val ? 1 : 0),
    }),
});

const box = createSchemaBox({ users: userSchema }, { users: {} }) as any;

const aliasedUserSchema = schema({
  _tableName: "aliased_users",
  publicId: s.sql({ type: "int", pk: true, field: "user_id" }).clientInput({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  name: s.sql({ type: "varchar", length: 100 }).clientInput({ value: "" }),
});

const aliasedBox = createSchemaBox(
  { aliasedUsers: aliasedUserSchema },
  { aliasedUsers: {} },
) as any;

const derivedUserSchema = schema({
  _tableName: "derived_users",
  id: s.sql({ type: "int", pk: true }).clientInput({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  firstName: s.sql({ type: "varchar", length: 100 }).clientInput({
    value: "",
  }),
  lastName: s.sql({ type: "varchar", length: 100 }).clientInput({
    value: "",
  }),
  fullName: s.sql({ type: "varchar", length: 220 }).clientInput({
    value: "",
  }),
}).derive({
  fullName: (row) => `${row.firstName} ${row.lastName}`,
});

const derivedBox = createSchemaBox(
  { derivedUsers: derivedUserSchema },
  { derivedUsers: {} },
) as any;

const sqlOnlyRequiredSchema = schema({
  _tableName: "sql_only_required_users",
  id: s.sql({ type: "int", pk: true }).clientInput({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  name: s.sql({ type: "varchar", length: 100 }).clientInput({ value: "" }),
  tenantId: s.sql({
    type: "varchar",
    length: 100,
    field: "tenant_id",
    sqlOnly: true,
  }),
});

const sqlOnlyRequiredBox = createSchemaBox(
  { sqlOnlyRequiredUsers: sqlOnlyRequiredSchema },
  { sqlOnlyRequiredUsers: {} },
);

let db: Kysely<unknown>;

describe("cogsbox-shape-db", () => {
  beforeAll(async () => {
    db = await createSqliteDb(":memory:");
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        tenant_id VARCHAR(100),
        isActive INTEGER NOT NULL DEFAULT 0
      )
    `.execute(db);

    await sql`
      CREATE TABLE IF NOT EXISTS aliased_users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL
      )
    `.execute(db);

    await sql`
      CREATE TABLE IF NOT EXISTS derived_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        fullName VARCHAR(220) NOT NULL
      )
    `.execute(db);

    await sql`
      CREATE TABLE IF NOT EXISTS sql_only_required_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        tenant_id VARCHAR(100) NOT NULL
      )
    `.execute(db);
  });

  it("connect returns enhanced box with .db", () => {
    const b = connect(box, db) as any;
    expect(b.users).toBeDefined();
    expect(b.users.db).toBeDefined();
    expect(typeof b.users.db.findMany).toBe("function");
    expect(typeof b.users.db.findById).toBe("function");
    expect(typeof b.users.db.insert).toBe("function");
    expect(typeof b.users.db.create).toBe("function");
    expect(typeof b.users.db.update).toBe("function");
    expect(typeof b.users.db.delete).toBe("function");
    expect(typeof b.users.db.count).toBe("function");
  });

  it("insert(...).ids inserts a record and returns PK from the db", async () => {
    const b = connect(box, db) as any;
    const defaults = box.users.generateDefaults();
    const pkResult = await b.users.db
      .insert({
        ...defaults,
        name: "Alice",
        email: "alice@test.com",
        isActive: true,
      })
      .ids();

    expect(pkResult.id).toBeDefined();
    expect(typeof pkResult.id).toBe("number");

    const user = await b.users.db.findById(pkResult.id);
    expect(user).not.toBeNull();
    expect(user!.name).toBe("Alice");
    expect(user!.email).toBe("alice@test.com");
    expect(user!.isActive).toBe(true);
  });

  it("create remains an alias for insert(...).ids", async () => {
    const b = connect(box, db) as any;
    const pkResult = await b.users.db.create({
      ...box.users.generateDefaults(),
      name: "Legacy Create",
      email: "legacy-create@test.com",
      isActive: false,
    });

    expect(pkResult).toEqual({ id: expect.any(Number) });
  });

  it("reconciles a client-created view record with the real db primary key", async () => {
    const b = connect(box, db) as any;
    const userView = b.users.createView({});
    const draft = {
      ...userView.defaults(),
      name: "Reconcile User",
      email: "reconcile@test.com",
      isActive: true,
    };
    const tempId = draft.id;

    const pkResult = await userView.db.insert(draft).ids();
    const reconciled = userView.reconcile(draft).withServer(pkResult);

    expect(tempId).toMatch(/^new_/);
    expect(reconciled).toEqual({
      ...draft,
      id: pkResult.id,
    });
    expect(typeof reconciled.id).toBe("number");

    const stored = await b.users.db.findById(reconciled.id);
    expect(stored).toMatchObject({
      id: reconciled.id,
      name: "Reconcile User",
      email: "reconcile@test.com",
      isActive: true,
    });
  });

  it("insert(...).full returns reconciled client data", async () => {
    const b = connect(box, db) as any;
    const userView = b.users.createView({});
    const draft = {
      ...userView.defaults(),
      name: "Insert Full User",
      email: "insert-full@test.com",
      isActive: true,
    };

    const inserted = await userView.db.insert(draft).full();

    expect(draft.id).toMatch(/^new_/);
    expect(inserted).toEqual({
      ...draft,
      id: expect.any(Number),
    });
    expect(inserted.id).not.toBe(draft.id);

    const stored = await userView.db.findById(inserted.id);
    expect(stored).toMatchObject({
      id: inserted.id,
      name: "Insert Full User",
      email: "insert-full@test.com",
      isActive: true,
    });
  });

  it("insert(...).full reconciles ids for a non-view table", async () => {
    const b = connect(box, db) as any;
    const draft = {
      ...box.users.generateDefaults(),
      name: "Plain Insert Full User",
      email: "plain-insert-full@test.com",
      isActive: true,
    };

    const inserted = await b.users.db.insert(draft).full();

    expect(draft.id).toMatch(/^new_/);
    expect(inserted).toEqual({
      ...draft,
      id: expect.any(Number),
    });
    expect(inserted.id).not.toBe(draft.id);

    const stored = await b.users.db.findById(inserted.id);
    expect(stored).toMatchObject({
      id: inserted.id,
      name: "Plain Insert Full User",
      email: "plain-insert-full@test.com",
      isActive: true,
    });
    expect(stored).not.toHaveProperty("tenantId");
  });

  it("insert accepts sqlOnly fields as the second parameter", async () => {
    const b = connect(box, db) as any;
    const ids = await b.users.db
      .insert(
        {
          ...box.users.generateDefaults(),
          name: "SQL Only Insert",
          email: "sql-only-insert@test.com",
          isActive: true,
        },
        {
          tenantId: "tenant_insert",
        },
      )
      .ids();

    const stored = await b.users.db.findById(ids.id);
    expect(stored).toMatchObject({
      id: ids.id,
      name: "SQL Only Insert",
      email: "sql-only-insert@test.com",
      isActive: true,
    });
    expect(stored).not.toHaveProperty("tenantId");

    const raw = await (db as any)
      .selectFrom("users")
      .select(["tenant_id"])
      .where("id", "=", ids.id)
      .executeTakeFirst();

    expect(raw.tenant_id).toBe("tenant_insert");
  });

  it("insert ignores client-only fields instead of writing them as sql columns", async () => {
    const b = connect(box, db) as any;

    const ids = await b.users.db
      .insert({
        ...box.users.generateDefaults(),
        name: "Client Only Insert",
        email: "client-only-insert@test.com",
        statusLabel: "Draft only",
        isActive: true,
      })
      .ids();

    const stored = await b.users.db.findById(ids.id);
    expect(stored).toMatchObject({
      id: ids.id,
      name: "Client Only Insert",
      email: "client-only-insert@test.com",
      isActive: true,
    });
    expect(stored).not.toHaveProperty("statusLabel");
  });

  it("insert rejects non-sqlOnly fields in the second parameter", async () => {
    const b = connect(box, db) as any;

    await expect(
      b.users.db
        .insert(
          {
            ...box.users.generateDefaults(),
            name: "SQL Only Reject",
            email: "sql-only-reject@test.com",
            isActive: true,
          },
          {
            name: "not allowed here",
          },
        )
        .ids(),
    ).rejects.toThrow(/not a sqlOnly field/);
  });

  it("insert requires non-null sqlOnly fields without db defaults", async () => {
    const b = connect(sqlOnlyRequiredBox, db);
    const table = b.sqlOnlyRequiredUsers!;
    const defaults = sqlOnlyRequiredBox.sqlOnlyRequiredUsers!.generateDefaults();

    await expect(
      table.db
        // @ts-expect-error tenantId is required because it is sqlOnly, non-null, and has no DB default.
        .insert({
          ...defaults,
          name: "Missing Tenant",
        })
        .ids(),
    ).rejects.toThrow(/Missing required sqlOnly field "tenantId"/);

    const ids = await table.db
      .insert(
        {
          ...defaults,
          name: "Has Tenant",
        },
        {
          tenantId: "tenant_required",
        },
      )
      .ids();

    const raw = await (db as any)
      .selectFrom("sql_only_required_users")
      .select(["tenant_id"])
      .where("id", "=", ids.id)
      .executeTakeFirst();

    expect(raw.tenant_id).toBe("tenant_required");
  });

  it("reconcileIds maps aliased db primary keys onto non-view client fields", async () => {
    const b = connect(aliasedBox, db) as any;
    const draft = {
      ...aliasedBox.aliasedUsers.generateDefaults(),
      name: "Aliased Plain User",
    };

    const ids = await b.aliasedUsers.db.insert(draft).ids();
    const reconciled = b.aliasedUsers.db.reconcileIds(draft, ids);

    expect(ids).toEqual({ user_id: expect.any(Number) });
    expect(reconciled).toEqual({
      ...draft,
      publicId: ids.user_id,
    });
    expect(reconciled.publicId).not.toBe(draft.publicId);
  });

  it("reconcileIds maps db ids back onto client data", async () => {
    const b = connect(box, db) as any;
    const userView = b.users.createView({});
    const draft = {
      ...userView.defaults(),
      name: "Attach Ids User",
      email: "attach-ids@test.com",
      isActive: false,
    };

    const ids = await userView.db.insert(draft).ids();
    const reconciled = userView.db.reconcileIds(draft, ids);

    expect(reconciled).toEqual({
      ...draft,
      id: ids.id,
    });
  });

  it("reconciles multiple client-created view records with db primary keys", async () => {
    const b = connect(box, db) as any;
    const userView = b.users.createView({});
    const drafts = [
      {
        ...userView.defaults(),
        name: "Reconcile User 1",
        email: "reconcile-1@test.com",
        isActive: true,
      },
      {
        ...userView.defaults(),
        name: "Reconcile User 2",
        email: "reconcile-2@test.com",
        isActive: false,
      },
    ];

    const pkResults = await Promise.all(
      drafts.map((draft) => userView.db.insert(draft).ids()),
    );
    const reconciled = userView.reconcile(drafts).withServer(pkResults);

    expect(userView.db).toBeDefined();
    expect(typeof userView.reconcile).toBe("function");
    expect(reconciled).toEqual([
      { ...drafts[0], id: pkResults[0].id },
      { ...drafts[1], id: pkResults[1].id },
    ]);
    expect(reconciled.map((user: any) => typeof user.id)).toEqual([
      "number",
      "number",
    ]);

    const stored = await Promise.all(
      reconciled.map((user: any) => userView.db.findById(user.id)),
    );
    expect(stored[0]).toMatchObject({
      id: reconciled[0].id,
      name: "Reconcile User 1",
      email: "reconcile-1@test.com",
      isActive: true,
    });
    expect(stored[1]).toMatchObject({
      id: reconciled[1].id,
      name: "Reconcile User 2",
      email: "reconcile-2@test.com",
      isActive: false,
    });
  });

  it("findById returns null for non-existent record", async () => {
    const b = connect(box, db) as any;
    const user = await b.users.db.findById(99999);
    expect(user).toBeNull();
  });

  it("findById returns record by auto-increment id", async () => {
    const b = connect(box, db) as any;
    const defaults = box.users.generateDefaults();
    const created = await b.users.db
      .insert({
        ...defaults,
        name: "Bob",
        email: "bob@test.com",
        isActive: false,
      })
      .ids();

    const found = await b.users.db.findById(created.id);
    expect(found).not.toBeNull();
    expect(found!.name).toBe("Bob");
    expect(found!.isActive).toBe(false);
  });

  it("findMany returns all records", async () => {
    const b = connect(box, db) as any;
    const all = await b.users.db.findMany();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it("findMany respects limit", async () => {
    const b = connect(box, db) as any;
    const limited = await b.users.db.findMany({ limit: 1 });
    expect(limited.length).toBe(1);
  });

  it("findMany filters by where clause", async () => {
    const b = connect(box, db) as any;
    const results = await b.users.db.findMany({
      where: { name: "Alice" },
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0]!.name).toBe("Alice");
  });

  it("findMany with contains operator", async () => {
    const b = connect(box, db) as any;
    const results = await b.users.db.findMany({
      where: { name: { contains: "Ali" } },
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("update modifies fields and returns PK from the db", async () => {
    const b = connect(box, db) as any;
    const defaults = box.users.generateDefaults();
    const pkResult = await b.users.db
      .insert({
        ...defaults,
        name: "Charlie",
        email: "charlie@test.com",
        isActive: false,
      })
      .ids();

    const updatePk = await b.users.db
      .update(pkResult.id, {
        name: "Charlie Updated",
        isActive: true,
      })
      .ids();

    expect(updatePk.id).toBe(pkResult.id);

    const updated = await b.users.db.findById(pkResult.id);
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe("Charlie Updated");
    expect(updated!.isActive).toBe(true);
  });

  it("update validates partial patches with the schema server rules", async () => {
    const b = connect(box, db) as any;
    const pkResult = await b.users.db
      .insert({
        ...box.users.generateDefaults(),
        name: "Patch Validation",
        email: "patch-validation@test.com",
        isActive: false,
      })
      .ids();

    await expect(
      b.users.db
        .update(pkResult.id, {
          email: "not-an-email",
        })
        .ids(),
    ).rejects.toThrow();

    const updatePk = await b.users.db
      .update(pkResult.id, {
        email: "patch-validation-updated@test.com",
      })
      .ids();

    expect(updatePk.id).toBe(pkResult.id);

    const updated = await b.users.db.findById(pkResult.id);
    expect(updated).toMatchObject({
      id: pkResult.id,
      name: "Patch Validation",
      email: "patch-validation-updated@test.com",
      isActive: false,
    });
  });

  it("update ignores client-only fields from full client/view state", async () => {
    const b = connect(box, db) as any;
    const inserted = await b.users.db
      .insert({
        ...box.users.generateDefaults(),
        name: "Client Only Update",
        email: "client-only-update@test.com",
        statusLabel: "Local draft",
        isActive: false,
      })
      .full();

    const updated = await b.users.db
      .update(inserted.id, {
        ...inserted,
        name: "Client Only Update Changed",
        statusLabel: "Still local only",
      })
      .full();

    expect(updated).toMatchObject({
      id: inserted.id,
      name: "Client Only Update Changed",
      email: "client-only-update@test.com",
      isActive: false,
    });
    expect(updated).not.toHaveProperty("statusLabel");
  });

  it("update accepts sqlOnly fields as the third parameter", async () => {
    const b = connect(box, db) as any;
    const ids = await b.users.db
      .insert(
        {
          ...box.users.generateDefaults(),
          name: "SQL Only Update",
          email: "sql-only-update@test.com",
          isActive: false,
        },
        {
          tenantId: "tenant_before",
        },
      )
      .ids();

    await b.users.db
      .update(
        ids.id,
        {
          name: "SQL Only Update Changed",
        },
        {
          tenantId: "tenant_after",
        },
      )
      .ids();

    const stored = await b.users.db.findById(ids.id);
    expect(stored).toMatchObject({
      id: ids.id,
      name: "SQL Only Update Changed",
      email: "sql-only-update@test.com",
      isActive: false,
    });
    expect(stored).not.toHaveProperty("tenantId");

    const raw = await (db as any)
      .selectFrom("users")
      .select(["tenant_id"])
      .where("id", "=", ids.id)
      .executeTakeFirst();

    expect(raw.tenant_id).toBe("tenant_after");
  });

  it("view update validates partial patches with the view server schema", async () => {
    const b = connect(box, db) as any;
    const userView = b.users.createView({});
    const inserted = await userView.db
      .insert({
        ...userView.defaults(),
        name: "View Patch Validation",
        email: "view-patch-validation@test.com",
        isActive: false,
      })
      .full();

    await expect(
      userView.db
        .update(inserted.id, {
          email: "not-an-email",
        })
        .ids(),
    ).rejects.toThrow();
  });

  it("update recomputes db-backed derived fields from fetched dependencies", async () => {
    const b = connect(derivedBox, db) as any;
    const inserted = await b.derivedUsers.db
      .insert({
        ...derivedBox.derivedUsers.generateDefaults(),
        firstName: "Ada",
        lastName: "Lovelace",
      })
      .full();

    const updatePk = await b.derivedUsers.db
      .update(inserted.id, {
        firstName: "Grace",
      })
      .ids();

    expect(updatePk.id).toBe(inserted.id);

    const updated = await b.derivedUsers.db.findById(inserted.id);
    expect(updated).toMatchObject({
      id: inserted.id,
      firstName: "Grace",
      lastName: "Lovelace",
      fullName: "Grace Lovelace",
    });
  });

  it("update(...).full returns the stored row after update", async () => {
    const b = connect(box, db) as any;
    const userView = b.users.createView({});
    const inserted = await userView.db
      .insert({
        ...userView.defaults(),
        name: "Update Full",
        email: "update-full@test.com",
        isActive: false,
      })
      .full();

    const updated = await userView.db
      .update(inserted.id, {
        name: "Update Full Changed",
        isActive: true,
      })
      .full();

    expect(updated).toMatchObject({
      id: inserted.id,
      name: "Update Full Changed",
      email: "update-full@test.com",
      isActive: true,
    });
  });

  it("delete removes a record", async () => {
    const b = connect(box, db) as any;
    const defaults = box.users.generateDefaults();
    const user = await b.users.db
      .insert({
        ...defaults,
        name: "DeleteMe",
        email: "delete@test.com",
        isActive: false,
      })
      .ids();

    const result = await b.users.db.delete(user.id);
    expect(result.deleted).toBe(true);

    const found = await b.users.db.findById(user.id);
    expect(found).toBeNull();
  });

  it("count returns total records", async () => {
    const b = connect(box, db) as any;
    const total = await b.users.db.count();
    expect(total).toBeGreaterThanOrEqual(3);
  });

  it("count with where filter", async () => {
    const b = connect(box, db) as any;
    const count = await b.users.db.count({ isActive: true });
    expect(count).toBeGreaterThanOrEqual(1);
  });

  it("transaction commits all operations atomically", async () => {
    const b = connect(box, db) as any;
    const result = await b.db.transaction(async (txBox: any) => {
      const u1 = await txBox.users.db
        .insert({
          ...box.users.generateDefaults(),
          name: "TxUser1",
          email: "tx1@test.com",
          isActive: true,
        })
        .ids();
      const u2 = await txBox.users.db
        .insert({
          ...box.users.generateDefaults(),
          name: "TxUser2",
          email: "tx2@test.com",
          isActive: true,
        })
        .ids();
      return { u1, u2 };
    });

    expect(result.u1.id).toBeDefined();
    expect(result.u2.id).toBeDefined();

    const found1 = await b.users.db.findById(result.u1.id);
    expect(found1?.name).toBe("TxUser1");
    const found2 = await b.users.db.findById(result.u2.id);
    expect(found2?.name).toBe("TxUser2");
  });

  it("sub-path import works", async () => {
    const { createSqliteDb: createDb } = await import("../sqlite/index.js");
    expect(createDb).toBeDefined();
  });
});
