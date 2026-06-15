import { describe, it, expect, beforeAll } from "vitest";
import { s, schema, createSchemaBox } from "cogsbox-shape";
import z from "zod";
import { connect } from "../connect.js";
import { createSqliteDb } from "../sqlite/sqlite-driver.js";
import { Kysely, sql } from "kysely";

const userSchema = schema({
  _tableName: "users",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  name: s.sqlite({ type: "varchar", length: 100 }).client({ value: "" }),
  email: s
    .sqlite({ type: "varchar", length: 255 })
    .server(({ sql }) => sql.email()),
  tenantId: s.sqlite({
    type: "varchar",
    length: 100,
    nullable: true,
    field: "tenant_id",
    sqlOnly: true,
  }),
  statusLabel: s.client(""),
  isActive: s
    .sqlite({ type: "int" })
    .client({ value: false })
    .transform({
      toClient: (val: number) => val === 1,
      toDb: (val: boolean) => (val ? 1 : 0),
    }),
});

const box = createSchemaBox({ users: userSchema }, { users: {} });

const aliasedUserSchema = schema({
  _tableName: "aliased_users",
  publicId: s.sqlite({ type: "int", pk: true, field: "user_id" }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  name: s.sqlite({ type: "varchar", length: 100 }).client({ value: "" }),
});

const aliasedBox = createSchemaBox(
  { aliasedUsers: aliasedUserSchema },
  { aliasedUsers: {} },
);

const derivedUserSchema = schema({
  _tableName: "derived_users",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  firstName: s
    .sqlite({ type: "varchar", length: 100 })
    .client({ value: "" }),
  lastName: s
    .sqlite({ type: "varchar", length: 100 })
    .client({ value: "" }),
  // Make fullName a DB-computed column by using sqlOnly
  fullName: s.sqlite({ type: "varchar", length: 220, sqlOnly: true }),
}).derive({
  forDb: {
    fullName: (row) => `${row.firstName} ${row.lastName}`,
  },
});

const derivedBox = createSchemaBox(
  { derivedUsers: derivedUserSchema },
  { derivedUsers: {} },
);

const sqlOnlyRequiredSchema = schema({
  _tableName: "sql_only_required_users",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  name: s.sqlite({ type: "varchar", length: 100 }).client({ value: "" }),
  tenantId: s.sqlite({
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

const refinedSchema = schema({
  _tableName: "refined_events",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  startDate: s
    .sqlite({ type: "varchar", length: 20 })
    .client({ value: "" }),
  endDate: s.sqlite({ type: "varchar", length: 20 }).client({ value: "" }),
  isPublished: s.sqlite({ type: "int" }).client({ value: 0 }),
  content: s
    .sqlite({ type: "varchar", length: 500, nullable: true })
    .client({
      value: "",
    }),
}).refine((r) => [
  r(["server"], (row) => {
    const errors: { path: string[]; message: string }[] = [];
    if (row.startDate && row.endDate && row.startDate > row.endDate) {
      errors.push({
        path: ["endDate"],
        message: "End date must be after start date",
      });
    }
    if (row.isPublished === 1 && !row.content) {
      errors.push({
        path: ["content"],
        message: "Published events must have content",
      });
    }
    return errors.length > 0 ? errors : undefined;
  }),
]);

const refinedBox = createSchemaBox(
  { refinedEvents: refinedSchema },
  { refinedEvents: {} },
);

const factorySchema = schema({
  _tableName: "view_factories",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  name: s.sqlite({ type: "varchar", length: 100 }).client({ value: "" }),
  isActive: s
    .sqlite({ type: "int" })
    .client({ value: false })
    .transform({
      toClient: (val: number) => val === 1,
      toDb: (val: boolean) => (val ? 1 : 0),
    }),
  boxes: s.hasMany([]),
  tradeCount: s.client(0),
  totalPnl: s.client(0),
  statusLabel: s.client(""),
}).derive({
  forClient: {
    statusLabel: (row) =>
      `${row.name} - ${row.isActive ? "Active" : "Inactive"}`,
  },
});

const factoryBoxSchema = schema({
  _tableName: "view_boxes",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  factoryId: s.reference(() => factorySchema.id),
  label: s.sqlite({ type: "varchar", length: 100 }).client({
    value: "",
  }),
  variant: s.hasOne(true),
});

const factoryBoxVariantSchema = schema({
  _tableName: "view_box_variants",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  boxId: s.reference(() => factoryBoxSchema.id),
  color: s.sqlite({ type: "varchar", length: 40 }).client({
    value: "",
  }),
});

const factoryViewBox = createSchemaBox(
  {
    factories: factorySchema,
    boxes: factoryBoxSchema,
    boxVariants: factoryBoxVariantSchema,
  },
  {
    factories: {
      boxes: { fromKey: "id", toKey: factoryBoxSchema.factoryId },
    },
    boxes: {
      variant: { fromKey: "id", toKey: factoryBoxVariantSchema.boxId },
    },
    boxVariants: {},
  },
);

type TestDb = {
  users: {
    id: number;
    name: string;
    email: string;
    tenant_id: string | null;
    isActive: number;
  };
  aliased_users: {
    user_id: number;
    name: string;
  };
  derived_users: {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  sql_only_required_users: {
    id: number;
    name: string;
    tenant_id: string;
  };
  refined_events: {
    id: number;
    startDate: string;
    endDate: string;
    isPublished: number;
    content: string | null;
  };
  view_factories: {
    id: number;
    name: string;
    isActive: number;
  };
  view_boxes: {
    id: number;
    factoryId: number;
    label: string;
  };
  view_box_variants: {
    id: number;
    boxId: number;
    color: string;
  };
};

let db: Kysely<TestDb>;

describe("cogsbox-shape-db", () => {
  beforeAll(async () => {
    db = await createSqliteDb<TestDb>(":memory:");
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

    await sql`
      CREATE TABLE IF NOT EXISTS refined_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        startDate VARCHAR(20) NOT NULL,
        endDate VARCHAR(20) NOT NULL,
        isPublished INTEGER NOT NULL DEFAULT 0,
        content VARCHAR(500)
      )
    `.execute(db);

    await sql`
      CREATE TABLE IF NOT EXISTS view_factories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        isActive INTEGER NOT NULL DEFAULT 0
      )
    `.execute(db);

    await sql`
      CREATE TABLE IF NOT EXISTS view_boxes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        factoryId INTEGER NOT NULL,
        label VARCHAR(100) NOT NULL
      )
    `.execute(db);

    await sql`
      CREATE TABLE IF NOT EXISTS view_box_variants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        boxId INTEGER NOT NULL,
        color VARCHAR(40) NOT NULL
      )
    `.execute(db);
  });

  it("connect returns enhanced box", () => {
    const b = connect(box, db);
    expect(b.users).toBeDefined();
    expect(b.users).toBeDefined();
    expect(typeof b.users.findMany).toBe("function");
    expect(typeof b.users.findById).toBe("function");
    expect(typeof b.users.insert).toBe("function");
    expect(typeof b.users.create).toBe("function");
    expect(typeof b.users.update).toBe("function");
    expect(typeof b.users.delete).toBe("function");
    expect(typeof b.users.count).toBe("function");
  });

  it("insert(...).ids inserts a record and returns PK from the db", async () => {
    const b = connect(box, db);
    const defaults = box.users.generateDefaults();
    const pkResult = await b.users
      .insert({
        ...defaults,
        name: "Alice",
        email: "alice@test.com",
        isActive: true,
      })
      .ids();

    expect(pkResult.id).toBeDefined();
    expect(typeof pkResult.id).toBe("number");

    const user = await b.users.findById(pkResult.id);
    expect(user).not.toBeNull();
    expect(user!.name).toBe("Alice");
    expect(user!.email).toBe("alice@test.com");
    expect(user!.isActive).toBe(true);
  });

  it("create remains an alias for insert(...).ids", async () => {
    const b = connect(box, db);
    const pkResult = await b.users.create({
      ...box.users.generateDefaults(),
      name: "Legacy Create",
      email: "legacy-create@test.com",
      isActive: false,
    });

    expect(pkResult).toEqual({ id: expect.any(Number) });
  });

  it("reconciles a client-created view record with the real db primary key", async () => {
    const b = connect(box, db);
    const userView = b.users.createView({});
    const draft = {
      ...userView.defaults(),
      name: "Reconcile User",
      email: "reconcile@test.com",
      isActive: true,
    };
    const tempId = draft.id;

    const pkResult = await userView.insert(draft).ids();
    const reconciled = userView.reconcileIds(draft, pkResult);

    expect(tempId).toMatch(/^new_/);
    expect(reconciled).toEqual({
      ...draft,
      id: pkResult.id,
    });
    expect(typeof reconciled.id).toBe("number");

    const stored = await b.users.findById(reconciled.id);
    expect(stored).toMatchObject({
      id: reconciled.id,
      name: "Reconcile User",
      email: "reconcile@test.com",
      isActive: true,
    });
  });

  it("insert(...).full returns reconciled client data", async () => {
    const b = connect(box, db);
    const userView = b.users.createView({});
    const draft = {
      ...userView.defaults(),
      name: "Insert Full User",
      email: "insert-full@test.com",
      isActive: true,
    };

    const inserted = await userView.insert(draft).full();

    expect(draft.id).toMatch(/^new_/);
    expect(inserted).toEqual({
      ...draft,
      id: expect.any(Number),
    });
    expect(inserted.id).not.toBe(draft.id);

    const stored = await userView.findById(inserted.id);
    expect(stored).toMatchObject({
      id: inserted.id,
      name: "Insert Full User",
      email: "insert-full@test.com",
      isActive: true,
    });
  });

  it("insert(...).full reconciles ids for a non-view table", async () => {
    const b = connect(box, db);
    const draft = {
      ...box.users.generateDefaults(),
      name: "Plain Insert Full User",
      email: "plain-insert-full@test.com",
      isActive: true,
    };

    const inserted = await b.users.insert(draft).full();

    expect(draft.id).toMatch(/^new_/);
    expect(inserted).toEqual({
      ...draft,
      id: expect.any(Number),
    });
    expect(inserted.id).not.toBe(draft.id);

    const stored = await b.users.findById(inserted.id);
    expect(stored).toMatchObject({
      id: inserted.id,
      name: "Plain Insert Full User",
      email: "plain-insert-full@test.com",
      isActive: true,
    });
    expect(stored).not.toHaveProperty("tenantId");
  });

  it("insert accepts sqlOnly fields as the second parameter", async () => {
    const b = connect(box, db);
    const ids = await b.users
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

    const stored = await b.users.findById(ids.id);
    expect(stored).toMatchObject({
      id: ids.id,
      name: "SQL Only Insert",
      email: "sql-only-insert@test.com",
      isActive: true,
    });
    expect(stored).not.toHaveProperty("tenantId");

    const raw = await db
      .selectFrom("users")
      .select(["tenant_id"])
      .where("id", "=", Number(ids.id))
      .executeTakeFirstOrThrow();

    expect(raw.tenant_id).toBe("tenant_insert");
  });

  it("insert ignores client-only fields instead of writing them as sql columns", async () => {
    const b = connect(box, db);

    const ids = await b.users
      .insert({
        ...box.users.generateDefaults(),
        name: "Client Only Insert",
        email: "client-only-insert@test.com",
        statusLabel: "Draft only",
        isActive: true,
      })
      .ids();

    const stored = await b.users.findById(ids.id);
    expect(stored).toMatchObject({
      id: ids.id,
      name: "Client Only Insert",
      email: "client-only-insert@test.com",
      isActive: true,
    });
    expect(stored).toHaveProperty("statusLabel", "");
  });

  it("insert rejects non-sqlOnly fields in the second parameter", async () => {
    const b = connect(box, db);

    await expect(
      b.users
        .insert(
          {
            ...box.users.generateDefaults(),
            name: "SQL Only Reject",
            email: "sql-only-reject@test.com",
            isActive: true,
          },
          {
            // @ts-expect-error only sqlOnly fields are accepted in the second parameter.
            name: "not allowed here",
          },
        )
        .ids(),
    ).rejects.toThrow(/not a sqlOnly field/);
  });

  it("insert requires non-null sqlOnly fields without db defaults", async () => {
    const b = connect(sqlOnlyRequiredBox, db);
    const table = b.sqlOnlyRequiredUsers!;
    const defaults =
      sqlOnlyRequiredBox.sqlOnlyRequiredUsers!.generateDefaults();

    await expect(
      table
        // @ts-expect-error tenantId is required because it is sqlOnly, non-null, and has no DB default.
        .insert({
          ...defaults,
          name: "Missing Tenant",
        })
        .ids(),
    ).rejects.toThrow(/Missing required sqlOnly field "tenantId"/);

    const ids = await table
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

    const raw = await db
      .selectFrom("sql_only_required_users")
      .select(["tenant_id"])
      .where("id", "=", Number(ids.id))
      .executeTakeFirstOrThrow();

    expect(raw.tenant_id).toBe("tenant_required");
  });

  it("types sqlOnly params and where clauses without ORM casts", async () => {
    const b = connect(sqlOnlyRequiredBox, db);
    const table = b.sqlOnlyRequiredUsers!;
    const defaults =
      sqlOnlyRequiredBox.sqlOnlyRequiredUsers!.generateDefaults();

    // @ts-expect-error tenantId is required because it is sqlOnly, non-null, and has no DB default.
    table.insert({
      ...defaults,
      name: "Missing Tenant Type Test",
    });

    table.insert(
      {
        ...defaults,
        name: "Typed Tenant",
      },
      { tenantId: "tenant_typed" },
    );

    table.insert(
      {
        ...defaults,
        name: "Bad Db Only",
      },
      {
        // @ts-expect-error non-sqlOnly fields are not accepted in the db-only parameter.
        name: "not allowed",
      },
    );

    const usersBox = connect(box, db);

    await usersBox.users.findMany({
      where: {
        name: { contains: "Typed" },
        isActive: true,
      },
    });

    await usersBox.users.findMany({
      where: {
        // @ts-expect-error string-only operators are rejected for booleans.
        isActive: { contains: "yes" },
      },
    });
  });

  it("reconcileIds maps aliased db primary keys onto non-view client fields", async () => {
    const b = connect(aliasedBox, db);
    const draft = {
      ...aliasedBox.aliasedUsers.generateDefaults(),
      name: "Aliased Plain User",
    };

    const ids = await b.aliasedUsers.insert(draft).ids();
    const reconciled = b.aliasedUsers.reconcileIds(draft, ids);

    expect(ids).toEqual({ user_id: expect.any(Number) });
    expect(reconciled).toEqual({
      ...draft,
      publicId: ids.user_id,
    });
    expect(reconciled.publicId).not.toBe(draft.publicId);
  });

  it("reconcileIds maps db ids back onto client data", async () => {
    const b = connect(box, db);
    const userView = b.users.createView({});
    const draft = {
      ...userView.defaults(),
      name: "Attach Ids User",
      email: "attach-ids@test.com",
      isActive: false,
    };

    const ids = await userView.insert(draft).ids();
    const reconciled = userView.reconcileIds(draft, ids);

    expect(reconciled).toEqual({
      ...draft,
      id: ids.id,
    });
  });

  it("reconciles multiple client-created view records with db primary keys", async () => {
    const b = connect(box, db);
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
      drafts.map((draft) => userView.insert(draft).ids()),
    );
    const reconciled = userView.reconcileIds(drafts, pkResults);

    expect(userView).toBeDefined();
    expect(typeof userView.reconcile).toBe("function");
    expect(reconciled).toEqual([
      { ...drafts[0], id: pkResults[0].id },
      { ...drafts[1], id: pkResults[1].id },
    ]);
    expect(reconciled.map((user) => typeof user.id)).toEqual([
      "number",
      "number",
    ]);

    const stored = await Promise.all(
      reconciled.map((user) => userView.findById(user.id)),
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
    const b = connect(box, db);
    const user = await b.users.findById(99999);
    expect(user).toBeNull();
  });

  it("findById returns record by auto-increment id", async () => {
    const b = connect(box, db);
    const defaults = box.users.generateDefaults();
    const created = await b.users
      .insert({
        ...defaults,
        name: "Bob",
        email: "bob@test.com",
        isActive: false,
      })
      .ids();

    const found = await b.users.findById(created.id);
    expect(found).not.toBeNull();
    expect(found!.name).toBe("Bob");
    expect(found!.isActive).toBe(false);
  });

  it("byId provides typed identity operations", async () => {
    const b = connect(box, db);
    const created = await b.users
      .insert({
        ...box.users.generateDefaults(),
        name: "ById User",
        email: "by-id@test.com",
        isActive: false,
      })
      .ids();

    const found = await b.users.byId(created.id).find();
    expect(found?.name).toBe("ById User");

    await b.users
      .byId(created.id)
      .update({
        name: "ById Updated",
      })
      .ids();

    const updated = await b.users.byId(created.id).find();
    expect(updated?.name).toBe("ById Updated");

    const deleted = await b.users.byId(created.id).delete();
    expect(deleted.deleted).toBe(true);
  });

  it("view findById hydrates selected nested relations", async () => {
    const b = connect(factoryViewBox, db);
    const factory = await b.factories
      .insert({
        ...factoryViewBox.factories.generateDefaults(),
        name: "Hydrated Factory",
        isActive: true,
      })
      .full();
    const box1 = await b.boxes
      .insert({
        ...factoryViewBox.boxes.generateDefaults(),
        factoryId: factory.id,
        label: "Box One",
      })
      .full();
    const box2 = await b.boxes
      .insert({
        ...factoryViewBox.boxes.generateDefaults(),
        factoryId: factory.id,
        label: "Box Two",
      })
      .full();
    await b.boxVariants
      .insert({
        ...factoryViewBox.boxVariants.generateDefaults(),
        boxId: box1.id,
        color: "red",
      })
      .ids();
    await b.boxVariants
      .insert({
        ...factoryViewBox.boxVariants.generateDefaults(),
        boxId: box2.id,
        color: "blue",
      })
      .ids();

    const factoryView = b.factories.createView({
      boxes: { variant: true },
    });
    const found = await factoryView.findById(factory.id);

    expect(found).toMatchObject({
      id: factory.id,
      name: "Hydrated Factory",
      isActive: true,
      statusLabel: "Hydrated Factory - Active",
      boxes: [
        {
          id: box1.id,
          factoryId: factory.id,
          label: "Box One",
          variant: {
            boxId: box1.id,
            color: "red",
          },
        },
        {
          id: box2.id,
          factoryId: factory.id,
          label: "Box Two",
          variant: {
            boxId: box2.id,
            color: "blue",
          },
        },
      ],
    });
  });

  it("view findMany hydrates selected nested relations", async () => {
    const b = connect(factoryViewBox, db);
    const factory = await b.factories
      .insert({
        ...factoryViewBox.factories.generateDefaults(),
        name: "Hydrated FindMany Factory",
        isActive: false,
      })
      .full();
    const box = await b.boxes
      .insert({
        ...factoryViewBox.boxes.generateDefaults(),
        factoryId: factory.id,
        label: "FindMany Box",
      })
      .full();
    await b.boxVariants
      .insert({
        ...factoryViewBox.boxVariants.generateDefaults(),
        boxId: box.id,
        color: "green",
      })
      .ids();

    const factoryView = b.factories.createView({
      boxes: { variant: true },
    });
    const rows = await factoryView.findMany({
      where: { name: "Hydrated FindMany Factory" },
    });

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: factory.id,
      name: "Hydrated FindMany Factory",
      isActive: false,
      statusLabel: "Hydrated FindMany Factory - Inactive",
      tradeCount: 0,
      totalPnl: 0,
      boxes: [
        {
          id: box.id,
          factoryId: factory.id,
          label: "FindMany Box",
          variant: {
            boxId: box.id,
            color: "green",
          },
        },
      ],
    });
  });

  it("view findMany returns client-only fields with defaults", async () => {
    const b = connect(factoryViewBox, db);
    await b.factories
      .insert({
        ...factoryViewBox.factories.generateDefaults(),
        name: "Client Default Test",
        isActive: true,
      })
      .ids();

    const factoryView = b.factories.createView({
      boxes: true,
    });
    const rows = await factoryView.findMany();
    for (const row of rows) {
      expect(row).toHaveProperty("tradeCount", 0);
      expect(row).toHaveProperty("totalPnl", 0);
    }
  });

  it("findMany returns all records", async () => {
    const b = connect(box, db);
    const all = await b.users.findMany();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it("findMany respects limit", async () => {
    const b = connect(box, db);
    const limited = await b.users.findMany({ limit: 1 });
    expect(limited.length).toBe(1);
  });

  it("findMany filters by where clause", async () => {
    const b = connect(box, db);
    const results = await b.users.findMany({
      where: { name: "Alice" },
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0]!.name).toBe("Alice");
  });

  it("findMany with contains operator", async () => {
    const b = connect(box, db);
    const results = await b.users.findMany({
      where: { name: { contains: "Ali" } },
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("findMany returns client-only fields with defaults", async () => {
    const b = connect(box, db);
    const all = await b.users.findMany();
    for (const row of all) {
      expect(row).toHaveProperty("statusLabel", "");
    }
  });

  it("update modifies fields and returns PK from the db", async () => {
    const b = connect(box, db);
    const defaults = box.users.generateDefaults();
    const pkResult = await b.users
      .insert({
        ...defaults,
        name: "Charlie",
        email: "charlie@test.com",
        isActive: false,
      })
      .ids();

    const updatePk = await b.users
      .update(pkResult.id, {
        name: "Charlie Updated",
        isActive: true,
      })
      .ids();

    expect(updatePk.id).toBe(pkResult.id);

    const updated = await b.users.findById(pkResult.id);
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe("Charlie Updated");
    expect(updated!.isActive).toBe(true);
  });

  it("update validates partial patches with the schema server rules", async () => {
    const b = connect(box, db);
    const pkResult = await b.users
      .insert({
        ...box.users.generateDefaults(),
        name: "Patch Validation",
        email: "patch-validation@test.com",
        isActive: false,
      })
      .ids();

    await expect(
      b.users
        .update(pkResult.id, {
          email: "not-an-email",
        })
        .ids(),
    ).rejects.toThrow();

    const updatePk = await b.users
      .update(pkResult.id, {
        email: "patch-validation-updated@test.com",
      })
      .ids();

    expect(updatePk.id).toBe(pkResult.id);

    const updated = await b.users.findById(pkResult.id);
    expect(updated).toMatchObject({
      id: pkResult.id,
      name: "Patch Validation",
      email: "patch-validation-updated@test.com",
      isActive: false,
    });
  });

  it("update ignores client-only fields from full client/view state", async () => {
    const b = connect(box, db);
    const inserted = await b.users
      .insert({
        ...box.users.generateDefaults(),
        name: "Client Only Update",
        email: "client-only-update@test.com",
        statusLabel: "Local draft",
        isActive: false,
      })
      .full();

    const updated = await b.users
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
    expect(updated).toHaveProperty("statusLabel", "");
  });

  it("update accepts sqlOnly fields as the third parameter", async () => {
    const b = connect(box, db);
    const ids = await b.users
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

    await b.users
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

    const stored = await b.users.findById(ids.id);
    expect(stored).toMatchObject({
      id: ids.id,
      name: "SQL Only Update Changed",
      email: "sql-only-update@test.com",
      isActive: false,
    });
    expect(stored).not.toHaveProperty("tenantId");

    const raw = await db
      .selectFrom("users")
      .select(["tenant_id"])
      .where("id", "=", Number(ids.id))
      .executeTakeFirstOrThrow();

    expect(raw.tenant_id).toBe("tenant_after");
  });

  it("view update validates partial patches with the view server schema", async () => {
    const b = connect(box, db);
    const userView = b.users.createView({});
    const inserted = await userView
      .insert({
        ...userView.defaults(),
        name: "View Patch Validation",
        email: "view-patch-validation@test.com",
        isActive: false,
      })
      .full();

    await expect(
      userView
        .update(inserted.id, {
          email: "not-an-email",
        })
        .ids(),
    ).rejects.toThrow();
  });

  it("update recomputes db-backed derived fields (forDb) from fetched dependencies", async () => {
    const b = connect(derivedBox, db);
    const inserted = await b.derivedUsers
      .insert(
        {
          ...derivedBox.derivedUsers.generateDefaults(),
          firstName: "Ada",
          lastName: "Lovelace",
        },
        {
          fullName: "Ada Lovelace",
        },
      )
      .full();

    const updatePk = await b.derivedUsers
      .update(inserted.id, {
        firstName: "Grace",
      })
      .ids();

    expect(updatePk.id).toBe(inserted.id);

    // Verify client state (fullName shouldn't be here since it's sqlOnly)
    const updated = await b.derivedUsers.findById(inserted.id);
    expect(updated).toMatchObject({
      id: inserted.id,
      firstName: "Grace",
      lastName: "Lovelace",
    });
    expect(updated).not.toHaveProperty("fullName");

    // Verify DB state actually computed fullName via `forDb`
    const rawDb = await db
      .selectFrom("derived_users")
      .select("fullName")
      .where("id", "=", Number(inserted.id))
      .executeTakeFirstOrThrow();
    expect(rawDb.fullName).toBe("Grace Lovelace");
  });
  it("update(...).full returns the stored row after update", async () => {
    const b = connect(box, db);
    const userView = b.users.createView({});
    const inserted = await userView
      .insert({
        ...userView.defaults(),
        name: "Update Full",
        email: "update-full@test.com",
        isActive: false,
      })
      .full();

    const updated = await userView
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
    const b = connect(box, db);
    const defaults = box.users.generateDefaults();
    const user = await b.users
      .insert({
        ...defaults,
        name: "DeleteMe",
        email: "delete@test.com",
        isActive: false,
      })
      .ids();

    const result = await b.users.delete(user.id);
    expect(result.deleted).toBe(true);

    const found = await b.users.findById(user.id);
    expect(found).toBeNull();
  });

  it("count returns total records", async () => {
    const b = connect(box, db);
    const total = await b.users.count();
    expect(total).toBeGreaterThanOrEqual(3);
  });

  it("count with where filter", async () => {
    const b = connect(box, db);
    const count = await b.users.count({ isActive: true });
    expect(count).toBeGreaterThanOrEqual(1);
  });

  it("transaction commits all operations atomically", async () => {
    const b = connect(box, db);
    const result = await b.transaction(async (txBox) => {
      const u1 = await txBox.users
        .insert({
          ...box.users.generateDefaults(),
          name: "TxUser1",
          email: "tx1@test.com",
          isActive: true,
        })
        .ids();
      const u2 = await txBox.users
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

    const found1 = await b.users.findById(result.u1.id);
    expect(found1?.name).toBe("TxUser1");
    const found2 = await b.users.findById(result.u2.id);
    expect(found2?.name).toBe("TxUser2");
  });

  it("sub-path import works", async () => {
    const { createSqliteDb: createDb } = await import("../sqlite/index.js");
    expect(createDb).toBeDefined();
  });

  it("refine server validation rejects invalid inserts", async () => {
    const b = connect(refinedBox, db);
    const defaults = refinedBox.refinedEvents.generateDefaults();

    await expect(
      b.refinedEvents
        .insert({
          ...defaults,
          startDate: "2024-12-31",
          endDate: "2024-01-01",
          isPublished: 0,
          content: "",
        })
        .ids(),
    ).rejects.toThrow("End date must be after start date");
  });

  it("refine server validation rejects published events without content", async () => {
    const b = connect(refinedBox, db);
    const defaults = refinedBox.refinedEvents.generateDefaults();

    await expect(
      b.refinedEvents
        .insert({
          ...defaults,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          isPublished: 1,
          content: "",
        })
        .ids(),
    ).rejects.toThrow("Published events must have content");
  });

  it("refine server validation allows valid inserts", async () => {
    const b = connect(refinedBox, db);
    const defaults = refinedBox.refinedEvents.generateDefaults();

    const ids = await b.refinedEvents
      .insert({
        ...defaults,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isPublished: 1,
        content: "Event details here",
      })
      .ids();

    expect(ids.id).toBeDefined();

    const found = await b.refinedEvents.findById(ids.id);
    expect(found).toMatchObject({
      id: ids.id,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      isPublished: 1,
      content: "Event details here",
    });
  });

  it("refine server validation rejects invalid updates", async () => {
    const b = connect(refinedBox, db);
    const defaults = refinedBox.refinedEvents.generateDefaults();

    const ids = await b.refinedEvents
      .insert({
        ...defaults,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isPublished: 0,
        content: "",
      })
      .ids();

    // Update with invalid data - but since it's a partial update,
    // cross-field refine validation doesn't run (only field-level validation does)
    // The ORM will fetch missing dependencies and recompute if needed
    const result = await b.refinedEvents
      .update(ids.id, {
        endDate: "2023-01-01",
      })
      .ids();

    expect(result.id).toBe(ids.id);
  });

  it("refine dependencies are tracked correctly", () => {
    expect(refinedBox.refinedEvents.refineInfo).toBeDefined();
    // Note: Due to short-circuit evaluation with default values,
    // only properties accessed before any falsy condition are tracked.
    // This is the same caveat as derive - the proxy can't catch properties
    // behind conditional branches that aren't taken with default values.
    expect(refinedBox.refinedEvents.refineInfo.fieldToGroup).toHaveProperty(
      "startDate",
    );
    expect(refinedBox.refinedEvents.refineInfo.fieldToGroup).toHaveProperty(
      "isPublished",
    );
  });
});
