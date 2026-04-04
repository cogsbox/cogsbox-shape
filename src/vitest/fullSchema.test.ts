// Imports at the top - added 'expect' for runtime tests
import { expect, describe, it } from "vitest";
import { expectTypeOf } from "expect-type";

// Import the new primary method for schema creation
import { s, schema, createSchemaBox } from "../schema";
import z from "zod";

/*
================================================================
SECTION A: TYPE-LEVEL TESTS (Using the new pattern)
================================================================
*/
describe("Schema Builder Type Tests (with expect-type)", () => {
  describe("Basic Field Definitions", () => {
    it("should correctly type a simple varchar field", () => {
      const nameField = s.sql({ type: "varchar" });
      expectTypeOf(nameField.config.zodSqlSchema).toEqualTypeOf<z.ZodString>();
    });

    it("should correctly type a nullable integer field", () => {
      const ageField = s.sql({ type: "int", nullable: true });
      expectTypeOf(ageField.config.zodClientSchema).toEqualTypeOf<
        z.ZodNullable<z.ZodNumber>
      >();
    });

    it("should correctly type a primary key field", () => {
      const idField = s.sql({ type: "int", pk: true });
      expectTypeOf(idField.config.zodSqlSchema).toEqualTypeOf<z.ZodNumber>();
    });
  });

  describe("Chainable Methods", () => {
    it("should create a union type when .initialState provides a different type", () => {
      const idField = s.sql({ type: "int", pk: true }).initialState({
        value: () => "temp-uuid-123",
        schema: z.literal("temp-uuid-123"),
      });
      type InferredClient = z.infer<typeof idField.config.zodClientSchema>;
      expectTypeOf<InferredClient>().toEqualTypeOf<number | "temp-uuid-123">();
    });

    it("should NOT create a union type when .initialState provides the same type", () => {
      const countField = s
        .sql({ type: "int" })
        .initialState({ value: () => 0, schema: z.number() });
      type InferredClient = z.infer<typeof countField.config.zodClientSchema>;
      expectTypeOf<InferredClient>().toEqualTypeOf<number>();
    });

    it("should correctly override the client schema with .client()", () => {
      const statusField = s.sql({ type: "int" }).client(() => z.boolean());
      type InferredSql = z.infer<typeof statusField.config.zodSqlSchema>;
      type InferredClient = z.infer<typeof statusField.config.zodClientSchema>;
      expectTypeOf<InferredSql>().toEqualTypeOf<number>();
      expectTypeOf<InferredClient>().toEqualTypeOf<boolean>();
    });
  });

  describe("`createSchemaBoxRegistry` Integration with Relations", () => {
    // 1. Define schemas with placeholders
    const users = schema({
      _tableName: "users",
      id: s.sql({ type: "int", pk: true }).initialState({
        value: () => "new-user" as const,
        schema: z.literal("new-user"),
      }),
      posts: s.hasMany(),
    });

    const posts = schema({
      _tableName: "posts",
      id: s.sql({ type: "int", pk: true }),
      isPublished: s.sql({ type: "int" }).client(() => z.boolean()),
      authorId: s.reference(() => users.id),
    });

    // 2. Create the registry and resolve relations
    const box = createSchemaBox(
      { users, posts },
      {
        users: {
          posts: { fromKey: "id", toKey: posts.authorId },
        },
      },
    );

    const finalPostResult = box.posts.schemas;

    it("should correctly handle reference types", () => {
      type PostClient = z.infer<typeof finalPostResult.client>;
      // The authorId should be a union of the DB type (number) and the initial state of the referenced field
      expectTypeOf<PostClient["authorId"]>().toEqualTypeOf<
        "new-user" | number
      >();
    });
  });
});

/*
================================================================
SECTION B: RUNTIME BEHAVIOR TESTS (Using the new pattern)
================================================================
*/
describe("Schema Builder Runtime Behavior", () => {
  describe("Default Value Generation", () => {
    // Define the schema using the new builder syntax
    const defaultsSchema = schema({
      _tableName: "defaults",
      fromInitialState: s.sql({ type: "varchar" }).initialState({
        value: () => "from-initial-state",
        schema: z.string(),
      }),
      fromSqlDefault: s.sql({ type: "int", default: 99 }),
      isNullable: s.sql({ type: "boolean", nullable: true }),
      hasNoDefault: s.sql({ type: "int" }),
    });

    // Process it with the registry
    const box = createSchemaBox(
      { defaults: defaultsSchema },
      {
        defaults: {},
      },
    );
    const defaults = box.defaults.defaults;

    it("should get default from .initialState()", () => {
      expect(defaults.fromInitialState).toBe("from-initial-state");
    });

    it("should get default from SQL config", () => {
      expect(defaults.fromSqlDefault).toBe(99);
    });

    it("should default a nullable field to null", () => {
      expect(defaults.isNullable).toBeNull();
    });

    it("should use the generated default (e.g., 0 for int) when none is provided", () => {
      expect(defaults.hasNoDefault).toBe(0);
    });
  });

  describe("Schema Parsing, Validation, and Transformation", () => {
    const complexSchemaDef = schema({
      _tableName: "complex",
      id: s.sql({ type: "int", pk: true }),
      status: s
        .sql({ type: "int" }) // DB: 0=Inactive, 1=Active
        .client(() => z.enum(["inactive", "active"])) // Client: "inactive" | "active"
        .transform({
          toClient: (dbValue) => (dbValue === 1 ? "active" : "inactive"),
          toDb: (clientValue) => (clientValue === "active" ? 1 : 0),
        }),
      name: s
        .sql({ type: "varchar" })
        .server(({ sql }) => sql.min(3, "Name is too short")),
    });

    // Use the new registry to process the schema
    const box = createSchemaBox(
      { complex: complexSchemaDef },
      {
        complex: {},
      },
    );
    const { client, sql, server } = box.complex.schemas;
    const { toClient, toDb } = box.complex.transforms;
    it("should correctly transform a DB object to a Client object", () => {
      const dbData = { id: 1, status: 1, name: "Test" };
      const clientResult = toClient(dbData);
      expect(clientResult.status).toBe("active");
      expect(() => client.parse(clientResult)).not.toThrow();
    });

    it("should correctly transform a Client object to a DB object", () => {
      const clientData = { id: 1, status: "inactive", name: "Test" } as const;
      const dbResult = toDb(clientData);
      expect(dbResult.status).toBe(0);
      expect(() => sql.parse(dbResult)).not.toThrow();
    });

    it("should still use the validationSchema for pure validation", () => {
      const invalidClientData = { id: 1, status: "inactive", name: "ab" };
      const result = server.safeParse(invalidClientData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Name is too short");
      }
    });
  });
});
describe("New Session Features - Base Schema Without Relations", () => {
  const users = schema({
    _tableName: "users",
    id: s
      .sql({ type: "int", pk: true })
      .initialState({ value: () => "user-123", schema: z.string() }),

    petId: s.reference(() => pets.id),
    pets: s.hasMany(),
  });

  const pets = schema({
    _tableName: "pets",
    id: s.sql({ type: "int", pk: true }),
    userId: s.reference(() => users.id),
    owner: s.hasOne(),
  });

  const box = createSchemaBox(
    { users, pets },
    {
      users: {
        pets: { fromKey: "id", toKey: pets.userId },
      },
      pets: {
        owner: { fromKey: "userId", toKey: users.id },
      },
    },
  );

  describe("Base Schema Excludes Relations", () => {
    it("should exclude relations from base client schema", () => {
      type UserClient = z.infer<typeof box.users.schemas.client>;
      type ExpectedUser = {
        id: string | number;
        petId: number;
      };
      expectTypeOf<UserClient>().toEqualTypeOf<ExpectedUser>();

      // Runtime check - the schema shape should not include 'pets'
      const clientShape = box.users.schemas.client.shape;
      expect(clientShape).not.toHaveProperty("pets");
      expect(clientShape).toHaveProperty("id");
      expect(clientShape).toHaveProperty("petId");
    });

    it("should exclude relations from default values", () => {
      const defaults = box.pets.defaults;
      expectTypeOf(defaults).toEqualTypeOf<{
        id: number;
        userId: string;
      }>();

      // Runtime check
      expect(defaults).not.toHaveProperty("owner");
      expect(defaults).toHaveProperty("id");
      expect(defaults).toHaveProperty("userId");
    });
  });

  describe("View Creation", () => {
    it("should include only selected relations in view", () => {
      const userView = box.users.createView({
        pets: true,
      });

      type ViewClient = z.infer<typeof userView.schemas.client>;
      expectTypeOf<ViewClient>().toEqualTypeOf<{
        id: string | number;
        petId: number;
        pets: {
          id: number;
          userId: string | number;
        }[];
      }>();

      // Runtime check
      const viewShape = userView.schemas.client.shape;
      expect(viewShape).toHaveProperty("pets");
      expect(viewShape.pets).toBeInstanceOf(z.ZodArray);
    });

    it("should handle nested relations correctly", () => {
      const userViewNested = box.users.createView({
        pets: { owner: true },
      });

      type ViewClientNested = z.infer<typeof userViewNested.schemas.client>;
      expectTypeOf<ViewClientNested>().toEqualTypeOf<{
        id: string | number;
        petId: number;
        pets: {
          id: number;
          userId: string | number;
          owner: {
            id: string | number;
            petId: number;
          } | null;
        }[];
      }>();

      // Runtime check - owner should not have pets
      const shape = userViewNested.schemas.client.shape;
      if (shape.pets instanceof z.ZodArray) {
        const petSchema = shape.pets.element;
        if (petSchema instanceof z.ZodObject) {
          const petShape = petSchema.shape;
          expect(petShape).toHaveProperty("owner");

          // Check that owner is optional
          expect(petShape.owner).toBeInstanceOf(z.ZodNullable);

          // Check that owner doesn't include pets
          if (petShape.owner instanceof z.ZodNullable) {
            const ownerSchema = petShape.owner._def.innerType;
            if (ownerSchema instanceof z.ZodObject) {
              expect(ownerSchema.shape).not.toHaveProperty("pets");
            }
          }
        }
      }
    });
  });

  it("should provide type-safe navigation", () => {
    type NavType = typeof box.users.nav.pets.owner.pets;
    expectTypeOf<NavType>().not.toBeNever();

    // Runtime test - nav proxy should return nested proxies
    expect(box.users.nav).toBeDefined();
    expect(box.users.nav.pets).toBeDefined();
    expect(box.users.nav.pets.owner).toBeDefined();
  });

  describe("Default Values Accessibility", () => {
    it("should expose default values at top level", () => {
      expect(box.users.defaults).toBeDefined();
      expect(box.users.defaults.id).toBe("user-123");
      expect(box.pets.defaults.id).toBe(0);
      expect(box.pets.defaults.userId).toBe("user-123");
    });
  });

  describe("Reference Resolution", () => {
    it("should correctly resolve reference types", () => {
      type UserClient = z.infer<typeof box.users.schemas.client>;
      type PetClient = z.infer<typeof box.pets.schemas.client>;

      expectTypeOf<UserClient["petId"]>().toEqualTypeOf<number>();
      expectTypeOf<PetClient["userId"]>().toEqualTypeOf<string | number>();
    });
  });
});

describe("Relation Defaults in Views", () => {
  const users = schema({
    _tableName: "users",
    id: s
      .sql({ type: "int", pk: true })
      .initialState({ value: () => "user-123", schema: z.string() }),
    name: s.sql({ type: "varchar" }).initialState({ value: "John" }),
    posts: s.hasMany({ count: 2 }), // Should generate 2 posts
    comments: s.hasMany([]), // Should be empty array
    profile: s.hasOne(true), // Changed from {} to true
    settings: s.hasOne(null), // Should be null
    followers: s.hasMany(undefined), // Should not be included
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sql({ type: "int", pk: true }),
    title: s.sql({ type: "varchar" }).initialState({ value: "Default Post" }),
    authorId: s.reference(() => users.id),
    user: s.hasOne(true),
  });

  const comments = schema({
    _tableName: "comments",
    id: s.sql({ type: "int", pk: true }),
    text: s.sql({ type: "varchar" }).initialState({ value: "Default Comment" }),
    userId: s.reference(() => users.id),
    user: s.hasOne(true),
  });

  const profiles = schema({
    _tableName: "profiles",
    id: s.sql({ type: "int", pk: true }),
    bio: s.sql({ type: "varchar" }).initialState({ value: "Default Bio" }),
    userId: s.reference(() => users.id),
    user: s.hasOne(true),
  });

  const box = createSchemaBox(
    { users, posts, comments, profiles },
    {
      users: {
        posts: { fromKey: "id", toKey: posts.authorId },
        comments: { fromKey: "id", toKey: comments.userId },
        profile: { fromKey: "id", toKey: profiles.userId },
        settings: { fromKey: "id", toKey: profiles.userId },
        followers: { fromKey: "id", toKey: users.id },
      },
      posts: {
        user: { fromKey: "id", toKey: users.id },
      },
      comments: {
        user: { fromKey: "id", toKey: users.id },
      },
      profiles: {
        user: { fromKey: "id", toKey: users.id },
      },
    },
  );

  it("should generate correct defaults based on relation config", () => {
    const view = box.users.createView({
      posts: true,
      comments: true,
      profile: true,
      settings: true,
      followers: true,
    });

    const defaults = view.defaults;

    // Base fields
    expect(defaults.id).toBe("user-123");
    expect(defaults.name).toBe("John");

    // posts with count: 2
    expect(defaults.posts).toHaveLength(2);
    expect(defaults.posts?.[0]).toEqual({
      id: 0,
      title: "Default Post",
      authorId: "user-123",
    });
    expect(defaults.posts?.[1]).toEqual({
      id: 0,
      title: "Default Post",
      authorId: "user-123",
    });

    // comments with []
    expect(defaults.comments).toEqual([]);

    // profile with {}
    expect(defaults.profile).toEqual({
      id: 0,
      bio: "Default Bio",
      userId: "user-123",
    });

    // settings with null
    expect(defaults.settings).toBeNull();

    // followers with undefined - should not exist
    expect(defaults).not.toHaveProperty("followers");
  });

  it("should handle nested relation defaults", () => {
    const nestedView = box.users.createView({
      posts: {},
    });

    const defaults = nestedView.defaults;

    expect(defaults.posts).toHaveLength(2);
    expect(defaults.posts?.[0]).not.toHaveProperty("author"); // Relation not selected
  });
});

describe("Transform affects defaults", () => {
  const userSchema = schema({
    _tableName: "users",

    id: s.sql({ type: "int", pk: true }).initialState({
      value: () => `temp_${Math.random().toString(36).substr(2, 9)}`,
      schema: z.string(),
    }),

    email: s
      .sql({ type: "varchar", length: 255 })
      .server(({ sql }) => sql.email("Invalid email address")),

    isActive: s
      .sql({ type: "int" })
      .client(() => z.boolean())
      .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
      }),

    role: s.sql({ type: "varchar" }).initialState({
      value: "user",
      schema: z.enum(["user", "admin"]),
    }),
  });

  const box = createSchemaBox({ users: userSchema }, { users: {} });
  const { schemas, transforms, defaults } = box.users;

  it("should have defaults that match the client schema type", () => {
    const d = defaults;

    type ClientType = z.infer<typeof schemas.client>;
    type DefaultsType = typeof defaults;

    expectTypeOf<DefaultsType>().toMatchTypeOf<ClientType>();

    expect(d.isActive).toBe(false);
    expect(typeof d.isActive).toBe("boolean");
  });

  it("should have isActive typed as boolean in defaults, not number", () => {
    expectTypeOf(defaults.isActive).toEqualTypeOf<boolean>();
  });

  it("should have isActive typed as boolean in client schema", () => {
    type ClientIsActive = z.infer<typeof schemas.client>["isActive"];
    expectTypeOf<ClientIsActive>().toEqualTypeOf<boolean>();
  });

  it("should have isActive typed as number in sql schema", () => {
    type SqlIsActive = z.infer<typeof schemas.sql>["isActive"];
    expectTypeOf<SqlIsActive>().toEqualTypeOf<number>();
  });

  it("should correctly round-trip transform defaults", () => {
    const dbVersion = transforms.toDb(defaults);
    expect(dbVersion.isActive).toBe(0);
    expect(typeof dbVersion.isActive).toBe("number");

    const clientVersion = transforms.toClient(dbVersion);
    expect(clientVersion.isActive).toBe(false);
    expect(typeof clientVersion.isActive).toBe("boolean");
  });
});

describe("UUID generation in initialState", () => {
  it("should call value function with uuid tool", () => {
    const field = s.sql({ type: "int", pk: true }).initialState({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true,
    });

    expect(typeof field.config.initialValue).toBe("string");
    expect(field.config.initialValue.length).toBeGreaterThan(0);
  });
});

describe("Missing properties - parseForDb, parseFromDb, pk, clientPk, isClientRecord", () => {
  const users = schema({
    _tableName: "users",
    id: s.sql({ type: "int", pk: true }).initialState({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true,
    }),
    name: s.sql({ type: "varchar" }).initialState({ value: "John" }),
    isActive: s
      .sql({ type: "int" })
      .client(() => z.boolean())
      .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
      }),
    email: s.sql({ type: "varchar", field: "email_address" }),
    posts: s.hasMany({ count: 1 }),
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sql({ type: "int", pk: true }),
    title: s.sql({ type: "varchar" }).initialState({ value: "Untitled" }),
    authorId: s.reference(() => users.id),
  });

  const box = createSchemaBox(
    { users, posts },
    {
      users: {
        posts: { fromKey: "id", toKey: posts.authorId },
      },
    },
  );

  describe("DB Field Key Mapping (field property)", () => {
    it("should correctly map 'field' property to sqlSchema types and runtime shapes", () => {
      type SqlShape = z.infer<typeof box.users.schemas.sql>;
      expectTypeOf<SqlShape>().toHaveProperty("email_address");
      expectTypeOf<SqlShape>().not.toHaveProperty("email");

      type ClientShape = z.infer<typeof box.users.schemas.client>;
      expectTypeOf<ClientShape>().toHaveProperty("email");
      expectTypeOf<ClientShape>().not.toHaveProperty("email_address");

      const sqlKeys = Object.keys(box.users.schemas.sql.shape);
      expect(sqlKeys).toContain("email_address");
      expect(sqlKeys).not.toContain("email");

      const clientKeys = Object.keys(box.users.schemas.client.shape);
      expect(clientKeys).toContain("email");
      expect(clientKeys).not.toContain("email_address");
    });

    it("parseForDb should return an object with the DB keys typed correctly", () => {
      const clientData = {
        id: 1,
        name: "Alice",
        isActive: true,
        email: "alice@test.com",
      };

      const dbData = box.users.transforms.parseForDb(clientData);

      expectTypeOf(dbData).toHaveProperty("email_address");
      expectTypeOf(dbData).not.toHaveProperty("email");

      expect(dbData.email_address).toBe("alice@test.com");
      expect((dbData as any).email).toBeUndefined();
    });
  });

  describe("pk and clientPk", () => {
    it("should expose pk array on base schema", () => {
      expect(box.users.pk).toEqual(["id"]);
      expect(box.posts.pk).toEqual(["id"]);
    });

    it("should expose clientPk array for fields with clientPk: true", () => {
      expect(box.users.clientPk).toEqual(["id"]);
    });

    it("should inherit clientPk on reference fields", () => {
      expect(box.posts.clientPk).toEqual(["authorId"]);
    });
  });

  describe("isClientRecord", () => {
    it("should auto-detect client records when clientPk is string but sql is int", () => {
      expect(box.users.isClientRecord).toBeDefined();
      expect(typeof box.users.isClientRecord).toBe("function");

      expect(box.users.isClientRecord!({ id: "some-uuid", name: "Test" })).toBe(
        true,
      );
      expect(box.users.isClientRecord!({ id: 42, name: "Test" })).toBe(false);
    });

    it("should also have isClientRecord on posts due to inherited clientPk from reference", () => {
      expect(box.posts.isClientRecord).toBeDefined();
      expect(typeof box.posts.isClientRecord).toBe("function");
    });
  });

  describe("parseFromDb and parseForDb", () => {
    it("should map DB column names to client keys on parseFromDb", () => {
      const dbRow = {
        id: 1,
        name: "Alice",
        isActive: 1,
        email_address: "a@b.com",
      };
      const result = box.users.transforms.parseFromDb(dbRow);
      expect(result.email).toBe("a@b.com");
      expect(result.isActive).toBe(true);
    });

    it("should map client keys to DB column names on parseForDb", () => {
      const clientData = {
        id: 1,
        name: "Alice",
        isActive: true,
        email: "a@b.com",
      };
      const result = box.users.transforms.parseForDb(clientData);
      expect(result.isActive).toBe(1);
      expect(result.email_address).toBe("a@b.com");
    });
  });
});

// =======================================================
// NEW TEST SUITE: Smart ClientPK & Mapped DB Keys Logic
// =======================================================
describe("Smart clientPk and isClientRecord logic", () => {
  const smartSchema = schema({
    _tableName: "smart_table",
    // 1. Auto-detect function execution
    id: s.sql({ type: "int", pk: true }).initialState({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true, // Should auto-detect by dummy-executing the uuid factory
    }),
    // 2. Custom function + mapped db key
    mappedId: s.sql({ type: "int", field: "db_mapped_id" }).initialState({
      value: "temp_999",
      schema: z.string(),
      clientPk: (val) => typeof val === "string" && val.startsWith("temp_"),
    }),
  });

  const smartBox = createSchemaBox(
    { smart: smartSchema },
    {
      smart: {},
    },
  );

  it("should auto-detect client records by dummy-executing the factory function", () => {
    // Because value: ({ uuid }) => uuid() returns a string, the system should auto-infer `typeof val === "string"`
    expect(smartBox.smart.isClientRecord({ id: "some-uuid-123" })).toBe(true);
    expect(smartBox.smart.isClientRecord({ id: 1 })).toBe(false);
  });

  it("should use a custom checker function if provided to clientPk", () => {
    // Valid custom format
    expect(smartBox.smart.isClientRecord({ mappedId: "temp_abc" })).toBe(true);
    // Invalid custom format (doesn't start with temp_)
    expect(smartBox.smart.isClientRecord({ mappedId: "invalid_abc" })).toBe(
      false,
    );
    // Integer is not a client record
    expect(smartBox.smart.isClientRecord({ mappedId: 42 })).toBe(false);
  });

  it("should safely check BOTH the client key and the db key at runtime", () => {
    // Provide ONLY the client key
    expect(smartBox.smart.isClientRecord({ mappedId: "temp_client" })).toBe(
      true,
    );

    // Provide ONLY the db key (how it might look coming straight from a SQL query)
    expect(smartBox.smart.isClientRecord({ db_mapped_id: "temp_db" })).toBe(
      true,
    );

    // Ensure failures correctly resolve when testing either key
    expect(smartBox.smart.isClientRecord({ mappedId: 100 })).toBe(false);
    expect(smartBox.smart.isClientRecord({ db_mapped_id: 100 })).toBe(false);
  });
});
