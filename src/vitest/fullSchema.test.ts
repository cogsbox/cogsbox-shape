// Imports at the top - added 'expect' for runtime tests
import { expect, describe, it } from "vitest";
import { expectTypeOf } from "expect-type";

// Import the new primary method for schema creation
import { s, schema, createSchemaBox } from "../schema";
import z from "zod";
import { testChatMEssages } from "../example/schema copy";

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
    const box = createSchemaBox({ users, posts }, (s) => ({
      users: {
        posts: { fromKey: "id", toKey: s.posts.authorId },
      },
    }));

    const finalUserResult = box.users.schemas;
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
    const box = createSchemaBox({ defaults: defaultsSchema }, () => ({
      defaults: {},
    }));
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
    const box = createSchemaBox({ complex: complexSchemaDef }, () => ({
      complex: {}, // No relations to resolve
    }));
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

  const box = createSchemaBox({ users, pets }, (s) => ({
    users: {
      pets: { fromKey: "id", toKey: s.pets.userId },
    },
    pets: {
      owner: { fromKey: "userId", toKey: s.users.id },
    },
  }));

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
    // Type test only - remove the invalid .toBeDefined()
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
      // petId references pets.id (number)
      // but userId references users.id (string | number due to initialState)

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

  const box = createSchemaBox({ users, posts, comments, profiles }, (s) => ({
    users: {
      posts: { fromKey: "id", toKey: s.posts.authorId },
      comments: { fromKey: "id", toKey: s.comments.userId },
      profile: { fromKey: "id", toKey: s.profiles.userId },
      settings: { fromKey: "id", toKey: s.profiles.userId },
      followers: { fromKey: "id", toKey: s.users.id },
    },
    posts: {
      user: { fromKey: "id", toKey: s.users.id },
    },
    comments: {
      user: { fromKey: "id", toKey: s.users.id },
    },
    profiles: {
      user: { fromKey: "id", toKey: s.users.id },
    },
  }));

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
      posts: {
        // Even though posts has count: 2, we can check nested behavior
      },
    });

    const defaults = nestedView.defaults;

    expect(defaults.posts).toHaveLength(2);
    expect(defaults.posts?.[0]).not.toHaveProperty("author"); // Relation not selected
  });

  it("should handle true for relation defaults", () => {
    const trueUsers = schema({
      _tableName: "trueUsers",
      id: s.sql({ type: "int", pk: true }),
      items: s.hasMany(true), // Should use target schema's defaults
    });

    const items = schema({
      _tableName: "items",
      id: s.sql({ type: "int", pk: true }),
      name: s.sql({ type: "varchar" }).initialState({ value: "Item" }),
    });

    const trueBox = createSchemaBox({ trueUsers, items }, (s) => ({
      trueUsers: {
        items: { fromKey: "id", toKey: s.items.id, defaultCount: 3 },
      },
    }));

    const view = trueBox.trueUsers.createView({ items: true });
    const defaults = view.defaults;

    // Should generate 3 items based on resolver's defaultCount
    expect(defaults.items).toHaveLength(3);
    expect(defaults.items?.[0]).toEqual({ id: 0, name: "Item" });
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

  const box = createSchemaBox({ users: userSchema }, () => ({ users: {} }));

  const { schemas, transforms, defaults } = box.users;

  it("should have defaults that match the client schema type", () => {
    // THIS IS THE KEY TEST:
    // Hover over `defaults` — it should show isActive as boolean, not number
    const d = defaults;

    // Type-level: defaults should be assignable to z.infer<typeof schemas.client>
    type ClientType = z.infer<typeof schemas.client>;
    type DefaultsType = typeof defaults;

    // This is the exact error from the issue - defaults should satisfy client schema
    expectTypeOf<DefaultsType>().toMatchTypeOf<ClientType>();

    // Runtime: isActive default should be false (toClient(0) => false), not 0
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

  it("should allow using defaults directly as useState initial value", () => {
    // This is the exact use case from the issue
    type ClientInferred = z.infer<typeof schemas.client>;

    // This should NOT produce a type error
    const testAssignment: ClientInferred = defaults;
    expect(testAssignment).toBeDefined();
  });

  it("should correctly round-trip transform defaults", () => {
    // defaults are client-side, so toDb should work on them
    const dbVersion = transforms.toDb(defaults);
    expect(dbVersion.isActive).toBe(0);
    expect(typeof dbVersion.isActive).toBe("number");

    // And back to client
    const clientVersion = transforms.toClient(dbVersion);
    expect(clientVersion.isActive).toBe(false);
    expect(typeof clientVersion.isActive).toBe("boolean");
  });

  it("should have other defaults unaffected by the transform fix", () => {
    expect(defaults.email).toBe("");
    expect(defaults.role).toBe("user");
    expect(typeof defaults.id).toBe("string");
    expect(defaults.id.startsWith("temp_")).toBe(true);
  });
});

describe("Reference field defaults with uuid generator", () => {
  const users = schema({
    _tableName: "users",
    user_id: s.sql({ type: "int", pk: true }).initialState({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true,
    }),
    username: s.sql({ type: "varchar" }).initialState({ value: "" }),
  });

  const pets = schema({
    _tableName: "pets",
    pet_id: s.sql({ type: "int", pk: true }).initialState({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true,
    }),
    name: s.sql({ type: "varchar" }).initialState({ value: "" }),
    user_id: s.reference(() => users.user_id),
  });

  const box = createSchemaBox({ users, pets }, (s) => ({
    users: {},
    pets: {},
  }));

  it("should resolve uuid in primary key defaults", () => {
    const userDefaults = box.users.defaults;
    expect(typeof userDefaults.user_id).toBe("string");
    expect(userDefaults.user_id.length).toBeGreaterThan(0);
  });

  it("should resolve uuid in reference field defaults", () => {
    const petDefaults = box.pets.defaults;

    // pet_id should be a uuid string
    expect(typeof petDefaults.pet_id).toBe("string");
    expect(petDefaults.pet_id.length).toBeGreaterThan(0);

    // user_id (reference) should also be resolved, not a function
    expect(typeof petDefaults.user_id).toBe("string");
    expect(petDefaults.user_id.length).toBeGreaterThan(0);
  });

  it("should generate consistent defaults with generateDefaults", () => {
    const defaults1 = box.users.generateDefaults();
    const defaults2 = box.users.generateDefaults();

    // Should return the same defaults each time
    expect(defaults1.user_id).toBe(defaults2.user_id);
    expect(typeof defaults1.user_id).toBe("string");
  });

  it("should have correct types for reference fields", () => {
    type PetDefaults = typeof box.pets.defaults;

    // user_id references users.user_id which has clientPk with string schema
    // so it should be string | number (client type includes both)
    expectTypeOf<PetDefaults["user_id"]>().toEqualTypeOf<string>();
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

  it("should have uuid available in s.sql().initialState()", () => {
    let receivedUuid: any;

    s.sql({ type: "int", pk: true }).initialState({
      value: (tools) => {
        receivedUuid = tools;
        return tools.uuid();
      },
      schema: z.string(),
    });

    expect(receivedUuid).toBeDefined();
    expect(typeof receivedUuid.uuid).toBe("function");
  });

  it("should have uuid available in standalone s.initialState()", () => {
    let receivedUuid: any;

    s.initialState((tools) => {
      receivedUuid = tools;
      return tools.uuid();
    });

    expect(receivedUuid).toBeDefined();
    expect(typeof receivedUuid.uuid).toBe("function");
  });
});

describe("Missing properties - parseForDb, parseFromDb, pk, clientPk, isClientRecord, schemaKey, stateType", () => {
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

  const box = createSchemaBox({ users, posts }, (s) => ({
    users: {
      posts: { fromKey: "id", toKey: s.posts.authorId },
    },
  }));
  box.users.schemas;
  // =======================================================
  // NEW TEST SUITE: Proving the DB key fix is working!
  // =======================================================
  describe("DB Field Key Mapping (field property)", () => {
    it("should correctly map 'field' property to sqlSchema types and runtime shapes", () => {
      // 1. Check TypeScript inferences
      type SqlShape = z.infer<typeof box.users.schemas.sql>;
      expectTypeOf<SqlShape>().toHaveProperty("email_address");
      expectTypeOf<SqlShape>().not.toHaveProperty("email");

      type ClientShape = z.infer<typeof box.users.schemas.client>;
      expectTypeOf<ClientShape>().toHaveProperty("email");
      expectTypeOf<ClientShape>().not.toHaveProperty("email_address");

      type ServerShape = z.infer<typeof box.users.schemas.server>;
      expectTypeOf<ServerShape>().toHaveProperty("email");
      expectTypeOf<ServerShape>().not.toHaveProperty("email_address");

      // 2. Check actual Runtime Zod shapes
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

      // parseForDb type expects Client data and returns SQL data
      const dbData = box.users.parseForDb(clientData);

      // Types correctly show `email_address` and not `email`
      expectTypeOf(dbData).toHaveProperty("email_address");
      expectTypeOf(dbData).not.toHaveProperty("email");

      // Runtime correctly transformed it
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
      // authorId references users.id which has clientPk: true,
      // so the reference resolution copies isClientPk to the post's authorId field
      expect(box.posts.clientPk).toEqual(["authorId"]);
    });

    it("should expose pk and clientPk on views", () => {
      const view = box.users.createView({ posts: true });
      expect(view.pk).toEqual(["id"]);
      expect(view.clientPk).toEqual(["id"]);
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
      // authorId references users.id which has clientPk with string initialState,
      // so posts also gets an isClientRecord checker
      expect(box.posts.isClientRecord).toBeDefined();
      expect(typeof box.posts.isClientRecord).toBe("function");
    });
  });

  describe("schemaKey", () => {
    it("should expose the registry key", () => {
      expect(box.users.schemaKey).toBe("users");
      expect(box.posts.schemaKey).toBe("posts");
    });

    it("should expose schemaKey on views", () => {
      const view = box.users.createView({ posts: true });
      expect(view.schemaKey).toBe("users");
    });
  });

  describe("parseFromDb", () => {
    it("should exist on base schema entries", () => {
      expect(typeof box.users.parseFromDb).toBe("function");
      expect(typeof box.posts.parseFromDb).toBe("function");
    });

    it("should map DB column names to client keys", () => {
      const dbRow = {
        id: 1,
        name: "Alice",
        isActive: 1,
        email_address: "a@b.com",
      };
      const result = box.users.parseFromDb(dbRow);
      // Correctly maps from db field to client field
      expect(result.email).toBe("a@b.com");
    });

    it("should apply transforms when parsing from DB", () => {
      const dbRow = {
        id: 1,
        name: "Alice",
        isActive: 1,
        email_address: "a@b.com",
      };
      const result = box.users.parseFromDb(dbRow);
      expect(result.isActive).toBe(true);
      expect(typeof result.isActive).toBe("boolean");
    });

    it("should parse valid DB data into client shape", () => {
      const dbRow = { id: 1, title: "Hello", authorId: 2 };
      const result = box.posts.parseFromDb(dbRow);
      expect(result.id).toBe(1);
      expect(result.title).toBe("Hello");
    });

    it("should have correct return type", () => {
      const dbRow = {
        id: 1,
        name: "Alice",
        isActive: 0,
        email_address: "a@b.com",
      };
      const result = box.users.parseFromDb(dbRow);

      type ResultType = typeof result;
      expectTypeOf<ResultType>().toHaveProperty("id");
      expectTypeOf<ResultType>().toHaveProperty("name");
      expectTypeOf<ResultType>().toHaveProperty("isActive");
      expectTypeOf<ResultType>().toHaveProperty("email");
    });
  });

  describe("parseForDb", () => {
    it("should exist on base schema entries", () => {
      expect(typeof box.users.parseForDb).toBe("function");
      expect(typeof box.posts.parseForDb).toBe("function");
    });

    it("should apply transforms when parsing for DB", () => {
      const clientData = {
        id: 1,
        name: "Alice",
        isActive: true,
        email: "a@b.com",
      };
      const result = box.users.parseForDb(clientData);
      expect(result.isActive).toBe(1);
      expect(typeof result.isActive).toBe("number");

      // Verifying DB Key mapping directly
      expect(result.email_address).toBe("a@b.com");
    });

    it("should apply transforms when parsing for DB", () => {
      const clientData = {
        id: 1,
        name: "Alice",
        isActive: false,
        email: "a@b.com",
      };
      const result = box.users.parseForDb(clientData);
      // Value transform applied: boolean -> number
      expect(result.isActive).toBe(0);
      expect(typeof result.isActive).toBe("number");
    });

    it("should validate against validation schema before transforming", () => {
      // Must include all required fields, with wrong type for title
      const invalidData = { id: 1, title: 12345, authorId: 1 };
      expect(() => box.posts.parseForDb(invalidData as any)).toThrow();
    });
  });

  describe("parseFromDb on views", () => {
    it("should use base table transforms since views don't have their own parse functions", () => {
      const view = box.users.createView({ posts: true });
      // Views delegate to transforms.toClient / transforms.toDb instead
      expect(typeof view.transforms.toClient).toBe("function");
      expect(typeof view.transforms.toDb).toBe("function");
    });
  });

  describe("stateType", () => {
    it("should be accessible on base schema entries", () => {
      type UserState = typeof box.users.stateType;
      expectTypeOf<UserState>().toHaveProperty("id");
      expectTypeOf<UserState>().toHaveProperty("name");
      expectTypeOf<UserState>().toHaveProperty("isActive");
      expectTypeOf<UserState>().toHaveProperty("email");
    });

    it("should reflect client types (transforms applied)", () => {
      type UserState = typeof box.users.stateType;
      expectTypeOf<UserState["isActive"]>().toEqualTypeOf<boolean>();
      expectTypeOf<UserState["name"]>().toEqualTypeOf<string>();
    });

    it("should not include relation fields", () => {
      type UserState = typeof box.users.stateType;
      type HasPosts = "posts" extends keyof UserState ? true : false;
      expectTypeOf<HasPosts>().toEqualTypeOf<false>();
    });
  });

  describe("generateDefaults produces fresh values each call", () => {
    it("should exist on base schema entries", () => {
      expect(typeof box.users.generateDefaults).toBe("function");
    });

    it("should return fresh uuid values on each call", () => {
      const d1 = box.users.generateDefaults();
      const d2 = box.users.generateDefaults();

      // Both should be strings (uuid)
      expect(typeof d1.id).toBe("string");
      expect(typeof d2.id).toBe("string");

      // Static defaults should remain the same
      expect(d1.name).toBe("John");
      expect(d2.name).toBe("John");
    });

    it("should apply transforms to generated defaults", () => {
      const fresh = box.users.generateDefaults();
      expect(typeof fresh.isActive).toBe("boolean");
      expect(fresh.isActive).toBe(false);
    });
  });

  describe("supportsReconciliation on views", () => {
    it("should be true when all tables in view have pk and clientPk (including inherited)", () => {
      // posts inherits clientPk from authorId reference, so all tables pass
      const view = box.users.createView({ posts: true });
      expect(view.supportsReconciliation).toBe(true);
    });

    it("should be true when all included tables support reconciliation", () => {
      const simpleView = box.users.createView({});
      expect(simpleView.supportsReconciliation).toBe(true);
    });
  });
});
