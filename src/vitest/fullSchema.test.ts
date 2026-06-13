import { expect, describe, it } from "vitest";
import { expectTypeOf } from "expect-type";

// Import the new primary method for schema creation
import { s, schema, createSchemaBox } from "../schema.js";
import z from "zod";

/*
================================================================
SECTION A: TYPE-LEVEL TESTS (Using the new pattern)
================================================================
*/
describe("Schema Builder Type Tests (with expect-type)", () => {
  describe("Basic Field Definitions", () => {
    it("should correctly type a simple varchar field", () => {
      const nameField = s.sqlite({ type: "varchar" });
      expectTypeOf(nameField.config.zodSqlSchema).toEqualTypeOf<z.ZodString>();
    });

    it("should correctly type a nullable integer field", () => {
      const ageField = s.sqlite({ type: "int", nullable: true });
      expectTypeOf(ageField.config.zodClientCheckedSchema).toEqualTypeOf<
        z.ZodNullable<z.ZodNumber>
      >();
    });

    it("should correctly type a primary key field", () => {
      const idField = s.sqlite({ type: "int", pk: true });
      expectTypeOf(idField.config.zodSqlSchema).toEqualTypeOf<z.ZodNumber>();
    });

    it("should correctly type an enum field", () => {
      const statusField = s.sqlite({
        type: "enum",
        values: ["draft", "published", "archived"],
      });

      type Status = z.infer<typeof statusField.config.zodSqlSchema>;
      expectTypeOf<Status>().toEqualTypeOf<
        "draft" | "published" | "archived"
      >();
      expect(statusField.config.zodSqlSchema.parse("draft")).toBe("draft");
      expect(() => statusField.config.zodSqlSchema.parse("deleted")).toThrow();
    });
  });

  describe("Chainable Methods", () => {
    it("should create a union type when .client provides a different type", () => {
      const idField = s.sqlite({ type: "int", pk: true }).client({
        value: () => "temp-uuid-123",
        schema: z.literal("temp-uuid-123"),
      });
      type InferredClient = z.infer<typeof idField.config.zodClientCheckedSchema>;
      expectTypeOf<InferredClient>().toEqualTypeOf<number | "temp-uuid-123">();
    });

    it("should NOT create a union type when .client provides the same type", () => {
      const countField = s
        .sqlite({ type: "int" })
        .client({ value: () => 0, schema: z.number() });
      type InferredClient = z.infer<typeof countField.config.zodClientCheckedSchema>;
      expectTypeOf<InferredClient>().toEqualTypeOf<number>();
    });

    it("should correctly override the client schema with .client()", () => {
      const statusField = s
        .sqlite({ type: "int" })
        .client(() => z.boolean());
      type InferredSql = z.infer<typeof statusField.config.zodSqlSchema>;
      type InferredClient = z.infer<typeof statusField.config.zodClientSchema>;
      type InferredClientChecked = z.infer<typeof statusField.config.zodClientCheckedSchema>;
      expectTypeOf<InferredSql>().toEqualTypeOf<number>();
      expectTypeOf<InferredClient>().toEqualTypeOf<boolean>();
      expectTypeOf<InferredClientChecked>().toEqualTypeOf<number | boolean>();
    });

    it("should add validation to client schema with .client()", () => {
      const nameField = s
        .sqlite({ type: "varchar" })
        .client({ value: "John" })
        .clientCheck((tools) => tools.client.min(3));
      type InferredClient = z.infer<typeof nameField.config.zodClientCheckedSchema>;
      expectTypeOf<InferredClient>().toEqualTypeOf<string>();
    });

    it("should chain .client().clientCheck().server() correctly", () => {
      const nameField = s
        .sqlite({ type: "varchar" })
        .client({ value: "" })
        .clientCheck((tools) => tools.client.min(3))
        .server((tools) => tools.client.min(5));
      type InferredClient = z.infer<typeof nameField.config.zodClientCheckedSchema>;
      type InferredServer = z.infer<
        typeof nameField.config.zodValidationSchema
      >;
      expectTypeOf<InferredClient>().toEqualTypeOf<string>();
      expectTypeOf<InferredServer>().toEqualTypeOf<string>();
    });
  });

  describe("`createSchemaBoxRegistry` Integration with Relations", () => {
    // 1. Define schemas with placeholders
    const users = schema({
      _tableName: "users",
      id: s.sqlite({ type: "int", pk: true }).client({
        value: () => "new-user" as const,
        schema: z.literal("new-user"),
      }),
      posts: s.hasMany(),
    });

    const posts = schema({
      _tableName: "posts",
      id: s.sqlite({ type: "int", pk: true }),
      isPublished: s.sqlite({ type: "int" }).client(() => z.boolean()),
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
      type PostClient = z.infer<typeof finalPostResult.clientChecked>;
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
      fromInitialState: s.sqlite({ type: "varchar" }).client({
        value: () => "from-initial-state",
        schema: z.string(),
      }),
      fromSqlDefault: s.sqlite({ type: "int", default: 99 }),
      isNullable: s.sqlite({ type: "boolean", nullable: true }),
      hasNoDefault: s.sqlite({ type: "int" }),
    });

    // Process it with the registry
    const box = createSchemaBox(
      { defaults: defaultsSchema },
      {
        defaults: {},
      },
    );
    const defaults = box.defaults.defaults;

    it("should get default from .client()", () => {
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
      id: s.sqlite({ type: "int", pk: true }),
      status: s
        .sqlite({ type: "int" }) // DB: 0=Inactive, 1=Active
        .client(() => z.enum(["inactive", "active"])) // Client: "inactive" | "active"
        .transform({
          toClient: (dbValue) => (dbValue === 1 ? "active" : "inactive"),
          toDb: (clientValue) => (clientValue === "active" ? 1 : 0),
        }),
      name: s
        .sqlite({ type: "varchar" })
        .server(({ sql }) => sql.min(3, "Name is too short")),
    });

    // Use the new registry to process the schema
    const box = createSchemaBox(
      { complex: complexSchemaDef },
      {
        complex: {},
      },
    );
    const { client: clientChecked, sql, server } = box.complex.schemas;
    const { toClient, toDb } = box.complex.transforms;
    it("should correctly transform a DB object to a Client object", () => {
      const dbData = { id: 1, status: 1, name: "Test" };
      const clientResult = toClient(dbData);
      expect(clientResult.status).toBe("active");
      expect(() => clientChecked.parse(clientResult)).not.toThrow();
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
        expect(result.error!.issues[0]!.message).toBe("Name is too short");
      }
    });
  });
});

describe("Tools params are actual Zod schemas at runtime", () => {
  it("should provide actual Zod schemas as tools in .client()", () => {
    let capturedTools: Record<string, unknown> | undefined;

    s.sqlite({ type: "varchar" })
      .client({ value: "test" })
      .clientCheck((tools) => {
        capturedTools = {
          sql: tools.sql,
          client: tools.client,
          clientCheck: tools.clientCheck,
        };
        return tools.clientCheck;
      });

    expect(capturedTools).toBeDefined();
    expect(capturedTools!.sql).toBeInstanceOf(z.ZodType);
    expect(typeof (capturedTools!.sql as z.ZodType).parse).toBe("function");
    expect(typeof (capturedTools!.sql as z.ZodType).safeParse).toBe("function");

    expect(capturedTools!.client).toBeInstanceOf(z.ZodType);
    expect(typeof (capturedTools!.client as z.ZodType).parse).toBe(
      "function",
    );

    expect(capturedTools!.clientCheck).toBeInstanceOf(z.ZodType);
    expect(typeof (capturedTools!.clientCheck as z.ZodType).parse).toBe("function");
  });

  it("should provide actual Zod schemas as tools in .server()", () => {
    let capturedTools: Record<string, unknown> | undefined;

    s.sqlite({ type: "varchar" })
      .client({ value: "test" })
      .clientCheck((tools) => tools.client)
      .server((tools) => {
        capturedTools = {
          sql: tools.sql,
          client: tools.client,
          clientCheck: tools.clientCheck,
        };
        return tools.clientCheck;
      });

    expect(capturedTools).toBeDefined();
    expect(capturedTools!.sql).toBeInstanceOf(z.ZodType);
    expect(capturedTools!.client).toBeInstanceOf(z.ZodType);
    expect(capturedTools!.clientCheck).toBeInstanceOf(z.ZodType);
  });

  it("should allow calling Zod methods on tools params in .client()", () => {
    let clientSchema: z.ZodString | undefined;

    s.sqlite({ type: "varchar" })
      .client({ value: "" })
      .clientCheck((tools) => {
        clientSchema = tools.client;
        const validated = tools.client.min(3);
        expect(validated.safeParse("ab").success).toBe(false);
        expect(validated.safeParse("abc").success).toBe(true);
        return validated;
      });

    expect(clientSchema).toBeInstanceOf(z.ZodString);
  });

  it("should allow calling Zod methods on tools params in .server()", () => {
    let serverClientSchema: z.ZodString | undefined;

    s.sqlite({ type: "varchar" })
      .client({ value: "" })
      .clientCheck((tools) => tools.client.min(3))
      .server((tools) => {
        serverClientSchema = tools.client;
        const validated = tools.client.min(5);
        expect(validated.safeParse("abcd").success).toBe(false);
        expect(validated.safeParse("abcde").success).toBe(true);
        return validated;
      });

    expect(serverClientSchema).toBeInstanceOf(z.ZodString);
  });

  it("should provide correct Zod types for numeric fields in tools", () => {
    let capturedSql: unknown;
    let capturedInput: unknown;

    s.sqlite({ type: "int" })
      .client({ value: 0 })
      .clientCheck((tools) => {
        capturedSql = tools.sql;
        capturedInput = tools.client;
        return tools.client;
      });

    expect(capturedSql).toBeInstanceOf(z.ZodNumber);
    expect((capturedSql as z.ZodNumber).parse(42)).toBe(42);

    expect(capturedInput).toBeInstanceOf(z.ZodNumber);
    expect((capturedInput as z.ZodNumber).parse(0)).toBe(0);
  });

  it("should provide correct Zod types for boolean fields in tools", () => {
    let capturedInput: unknown;

    s.sqlite({ type: "int" })
      .client(() => z.boolean())
      .clientCheck((tools) => {
        capturedInput = tools.client;
        return tools.client;
      });

    expect(capturedInput).toBeInstanceOf(z.ZodBoolean);
    expect((capturedInput as z.ZodBoolean).parse(true)).toBe(true);
    expect((capturedInput as z.ZodBoolean).safeParse("not bool").success).toBe(
      false,
    );
  });

  it("should allow nullable() and other modifiers on tools params", () => {
    let capturedInput: unknown;

    s.sqlite({ type: "varchar", nullable: true })
      .client({ value: null, schema: z.string().nullable() })
      .clientCheck((tools) => {
        capturedInput = tools.client;
        expect(tools.client.safeParse(null).success).toBe(true);
        expect(tools.client.safeParse("hello").success).toBe(true);
        return tools.client;
      });

    expect(capturedInput).toBeInstanceOf(z.ZodNullable);
  });
});

describe("client vs clientChecked schema divergence after .clientCheck()", () => {
  it("should retain unmodified client schema after .clientCheck() adds .min()", () => {
    const nameField = s.sqlite({ type: "varchar" })
      .client({ value: "John" })
      .clientCheck((tools) => tools.client.min(3));

    const clientSchema = nameField.config.zodClientSchema;
    const clientCheckedSchema = nameField.config.zodClientCheckedSchema;

    expect(clientSchema.safeParse("ab").success).toBe(true);
    expect(clientCheckedSchema.safeParse("ab").success).toBe(false);
    expect(clientCheckedSchema.safeParse("abc").success).toBe(true);
  });

  it("should diverge at box schema level after .clientCheck()", () => {
    const users = schema({
      _tableName: "users",
      id: s.sqlite({ type: "int", pk: true }),
      name: s.sqlite({ type: "varchar" })
        .client({ value: "" })
        .clientCheck((tools) => tools.client.min(3)),
    });

    const box = createSchemaBox({ users }, { users: {} });

    expect(box.users.schemas.client.shape.name.safeParse("ab").success).toBe(true);
    expect(box.users.schemas.clientChecked.shape.name.safeParse("ab").success).toBe(false);
    expect(box.users.schemas.clientChecked.shape.name.safeParse("abc").success).toBe(true);
  });

  it("should apply .email() only to clientChecked schema, not client", () => {
    const nameField = s.sqlite({ type: "varchar" })
      .client({ value: "" })
      .clientCheck((tools) => tools.client.email());

    expect(nameField.config.zodClientSchema.safeParse("not-an-email").success).toBe(true);
    expect(nameField.config.zodClientCheckedSchema.safeParse("not-an-email").success).toBe(false);
    expect(nameField.config.zodClientCheckedSchema.safeParse("a@b.com").success).toBe(true);
  });

  it("should apply .max() only to clientChecked schema, not client", () => {
    const countField = s.sqlite({ type: "int" })
      .client({ value: () => 0, schema: z.number() })
      .clientCheck((tools) => tools.client.max(100));

    expect(countField.config.zodClientSchema.safeParse(200).success).toBe(true);
    expect(countField.config.zodClientCheckedSchema.safeParse(200).success).toBe(false);
    expect(countField.config.zodClientCheckedSchema.safeParse(50).success).toBe(true);
  });

  it("should produce different schemas across all three layers: client, clientChecked, server", () => {
    const nameField = s.sqlite({ type: "varchar" })
      .client({ value: "" })
      .clientCheck((tools) => tools.client.min(3))
      .server((tools) => tools.client.min(5));

    expect(nameField.config.zodClientSchema.safeParse("a").success).toBe(true);
    expect(nameField.config.zodClientCheckedSchema.safeParse("a").success).toBe(false);
    expect(nameField.config.zodClientCheckedSchema.safeParse("abc").success).toBe(true);
    expect(nameField.config.zodValidationSchema.safeParse("abc").success).toBe(false);
    expect(nameField.config.zodValidationSchema.safeParse("abcde").success).toBe(true);
  });

  it("should preserve clientInputZod on the internal builder config after .clientCheck()", () => {
    let capturedConfig: any;
    const field = s.sqlite({ type: "varchar" })
      .client({ value: "x" })
      .clientCheck((tools) => {
        capturedConfig = { clientInputZod: (tools as any).clientInputZod };
        return tools.client.min(3);
      });

    expect(field.config.zodClientSchema).toBeDefined();
    expect(field.config.zodClientCheckedSchema).toBeDefined();
    expect(field.config.zodClientSchema).not.toBe(field.config.zodClientCheckedSchema);
  });

  it("should diverge when refine targets only 'clientCheck' layer, not 'client'", () => {
    const forms = schema({
      _tableName: "forms",
      id: s.sqlite({ type: "int", pk: true }),
      password: s.sqlite({ type: "varchar" }).client({ value: "" }),
      confirmPassword: s.sqlite({ type: "varchar" }).client({ value: "" }),
    }).refine((r) => [
      r("clientCheck", (row) => {
        if (row.password !== row.confirmPassword) {
          return { path: ["confirmPassword"], message: "Passwords must match" };
        }
        return undefined;
      }),
    ]);

    const box = createSchemaBox({ forms }, { forms: {} });

    const clientResult = box.forms.schemas.client.safeParse({
      id: 1, password: "abc", confirmPassword: "def",
    });
    expect(clientResult.success).toBe(true);

    const clientCheckedResult = box.forms.schemas.clientChecked.safeParse({
      id: 1, password: "abc", confirmPassword: "def",
    });
    expect(clientCheckedResult.success).toBe(false);
  });
});

describe("New Session Features - Base Schema Without Relations", () => {
  const users = schema({
    _tableName: "users",
    id: s
      .sqlite({ type: "int", pk: true })
      .client({ value: () => "user-123", schema: z.string() }),

    petId: s.reference(() => pets.id),
    pets: s.hasMany(),
  });

  const pets = schema({
    _tableName: "pets",
    id: s.sqlite({ type: "int", pk: true }),
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
      type UserClient = z.infer<typeof box.users.schemas.clientChecked>;
      type ExpectedUser = {
        id: string | number;
        petId: number;
      };
      expectTypeOf<UserClient>().toEqualTypeOf<ExpectedUser>();

      // Runtime check - the schema shape should not include 'pets'
      const clientShape = box.users.schemas.clientChecked.shape;
      expect(clientShape).not.toHaveProperty("pets");
      expect(clientShape).toHaveProperty("id");
      expect(clientShape).toHaveProperty("petId");
    });

    it("should exclude relations from default values", () => {
      const defaults = box.pets.defaults;

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

      type ViewClient = z.infer<typeof userView.schemas.clientChecked>;
      expectTypeOf<ViewClient>().toEqualTypeOf<{
        id: string | number;
        petId: number;
        pets: {
          id: number;
          userId: string | number;
        }[];
      }>();

      // Runtime check
      const viewShape = userView.schemas.clientChecked.shape;
      expect(viewShape).toHaveProperty("pets");
      expect(viewShape.pets).toBeInstanceOf(z.ZodArray);
    });

    it("should handle nested relations correctly", () => {
      const userViewNested = box.users.createView({
        pets: { owner: true },
      });

      type ViewClientNested = z.infer<typeof userViewNested.schemas.clientChecked>;
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
      const shape = userViewNested.schemas.clientChecked.shape;
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
      type UserClient = z.infer<typeof box.users.schemas.clientChecked>;
      type PetClient = z.infer<typeof box.pets.schemas.clientChecked>;

      expectTypeOf<UserClient["petId"]>().toEqualTypeOf<number>();
      expectTypeOf<PetClient["userId"]>().toEqualTypeOf<string | number>();
    });
  });
});

describe("Relation Defaults in Views", () => {
  const users = schema({
    _tableName: "users",
    id: s
      .sqlite({ type: "int", pk: true })
      .client({ value: () => "user-123", schema: z.string() }),
    name: s.sqlite({ type: "varchar" }).client({ value: "John" }),
    posts: s.hasMany({ count: 2 }), // Should generate 2 posts
    comments: s.hasMany([]), // Should be empty array
    profile: s.hasOne(true), // Changed from {} to true
    settings: s.hasOne(null), // Should be null
    followers: s.hasMany(undefined), // Should not be included
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sqlite({ type: "int", pk: true }),
    title: s.sqlite({ type: "varchar" }).client({ value: "Default Post" }),
    authorId: s.reference(() => users.id),
    user: s.hasOne(true),
  });

  const comments = schema({
    _tableName: "comments",
    id: s.sqlite({ type: "int", pk: true }),
    text: s
      .sqlite({ type: "varchar" })
      .client({ value: "Default Comment" }),
    userId: s.reference(() => users.id),
    user: s.hasOne(true),
  });

  const profiles = schema({
    _tableName: "profiles",
    id: s.sqlite({ type: "int", pk: true }),
    bio: s.sqlite({ type: "varchar" }).client({ value: "Default Bio" }),
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

    const defaults = view.defaults();

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

    const defaults = nestedView.defaults();

    expect(defaults.posts).toHaveLength(2);
    expect(defaults.posts?.[0]).not.toHaveProperty("author"); // Relation not selected
  });
});

describe("Transform affects defaults", () => {
  const userSchema = schema({
    _tableName: "users",

    id: s.sqlite({ type: "int", pk: true }).client({
      value: () => `temp_${Math.random().toString(36).substr(2, 9)}`,
      schema: z.string(),
    }),

    email: s
      .sqlite({ type: "varchar", length: 255 })
      .server(() => z.email("Invalid email address")),

    isActive: s
      .sqlite({ type: "int" })
      .client(() => z.boolean())
      .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
      }),

    role: s.sqlite({ type: "varchar" }).client({
      value: "user",
      schema: z.enum(["user", "admin"]),
    }),
  });

  const box = createSchemaBox({ users: userSchema }, { users: {} });
  const { transforms } = box.users;
  const defaults = box.users.generateDefaults();

  it("should have defaults with correct runtime values", () => {
    expect(defaults.isActive).toBe(false);
    expect(typeof defaults.isActive).toBe("boolean");
  });
  it("should correctly transform defaults to db format", () => {
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
    const field = s.sqlite({ type: "int", pk: true }).client({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true,
    });

    expect(typeof field.config.initialValue).toBe("function");
    const result = (field.config.initialValue as any)({
      uuid: () => "test-uuid",
    });
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("Missing properties - parseForDb, parseFromDb, pk, clientPk, isClientRecord", () => {
  const users = schema({
    _tableName: "users",
    id: s.sqlite({ type: "int", pk: true }).client({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true,
    }),
    name: s.sqlite({ type: "varchar" }).client({ value: "John" }),
    isActive: s
      .sqlite({ type: "int" })
      .client(() => z.boolean())
      .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
      }),
    email: s.sqlite({ type: "varchar", field: "email_address" }),
    posts: s.hasMany({ count: 1 }),
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sqlite({ type: "int", pk: true }),
    title: s.sqlite({ type: "varchar" }).client({ value: "Untitled" }),
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

      type ClientShape = z.infer<typeof box.users.schemas.clientChecked>;
      expectTypeOf<ClientShape>().toHaveProperty("email");
      expectTypeOf<ClientShape>().not.toHaveProperty("email_address");

      const sqlKeys = Object.keys(box.users.schemas.sql.shape);
      expect(sqlKeys).toContain("email_address");
      expect(sqlKeys).not.toContain("email");

      const clientKeys = Object.keys(box.users.schemas.clientChecked.shape);
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
    id: s.sqlite({ type: "int", pk: true }).client({
      value: ({ uuid }) => uuid(),
      schema: z.string(),
      clientPk: true, // Should auto-detect by dummy-executing the uuid factory
    }),
    // 2. Custom function + mapped db key
    mappedId: s.sqlite({ type: "int", field: "db_mapped_id" }).client({
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

describe("Nested relations with transforms", () => {
  const users = schema({
    _tableName: "users",
    id: s
      .sqlite({ type: "int", pk: true })
      .client({ value: () => "user-123", schema: z.string() }),
    name: s.sqlite({ type: "varchar" }).client({ value: "John" }),
    posts: s.hasMany({ count: 1 }),
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sqlite({ type: "int", pk: true }),
    title: s.sqlite({ type: "varchar" }).client({ value: "Default Post" }),
    isPublished: s
      .sqlite({ type: "int" })
      .client(() => z.boolean())
      .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
      }),
    authorId: s.reference(() => users.id),
    comments: s.hasMany({ count: 1 }),
  });

  const comments = schema({
    _tableName: "comments",
    id: s.sqlite({ type: "int", pk: true }),
    text: s.sqlite({ type: "varchar" }).client({ value: "Comment" }),
    isDeleted: s
      .sqlite({ type: "int" })
      .client(() => z.boolean())
      .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
      }),
    postId: s.reference(() => posts.id),
  });

  const box = createSchemaBox(
    { users, posts, comments },
    {
      users: {
        posts: { fromKey: "id", toKey: posts.authorId },
      },
      posts: {
        comments: { fromKey: "id", toKey: comments.postId },
      },
    },
  );

  it("should transform nested relation fields in defaults", () => {
    const view = box.users.createView({
      posts: { comments: true },
    } as const);

    const defaults = view.defaults();

    expect(defaults.posts).toHaveLength(1);
    const post = defaults.posts?.[0];
    expect(post).toBeDefined();

    expect(post!.isPublished).toBe(false);
    expect(typeof post!.isPublished).toBe("boolean");

    expect(post!.comments).toHaveLength(1);
    const comment = post!.comments?.[0];
    expect(comment!.isDeleted).toBe(false);
    expect(typeof comment!.isDeleted).toBe("boolean");
  });

  it("should transform nested relation fields in toClient", () => {
    const view = box.users.createView({
      posts: { comments: true },
    } as const);

    const { toClient } = view.transforms;

    const dbData = {
      id: 1,
      name: "John",
      posts: [
        {
          id: 10,
          title: "My Post",
          isPublished: 1,
          authorId: 1,
          comments: [
            {
              id: 100,
              text: "Comment text",
              isDeleted: 0,
              postId: 10,
            },
          ],
        },
      ],
    };

    const clientData = toClient(dbData);

    expect(clientData.posts![0].isPublished).toBe(true);
    expect(typeof clientData.posts![0].isPublished).toBe("boolean");

    expect(clientData.posts![0].comments![0].isDeleted).toBe(false);
    expect(typeof clientData.posts![0].comments![0].isDeleted).toBe("boolean");
  });

  it("should transform nested relation fields in toDb", () => {
    const view = box.users.createView({
      posts: { comments: true },
    } as const);

    const { toDb } = view.transforms;

    const clientData = {
      id: "user-123",
      name: "John",
      posts: [
        {
          id: 10,
          title: "My Post",
          isPublished: true,
          authorId: "user-123",
          comments: [
            {
              id: 100,
              text: "Comment text",
              isDeleted: true,
              postId: 10,
            },
          ],
        },
      ],
    };

    const dbData = toDb(clientData);

    expect(dbData.posts![0].isPublished).toBe(1);
    expect(typeof dbData.posts![0].isPublished).toBe("number");

    expect(dbData.posts![0].comments![0].isDeleted).toBe(1);
    expect(typeof dbData.posts![0].comments![0].isDeleted).toBe("number");
  });

  it("should work with parseFromDb and parseForDb", () => {
    const view = box.users.createView({
      posts: { comments: true },
    } as const);

    const { parseFromDb, parseForDb } = view.transforms;

    const dbRow = {
      id: 1,
      name: "John",
      posts: [
        {
          id: 10,
          title: "My Post",
          isPublished: 1,
          authorId: 1,
          comments: [
            {
              id: 100,
              text: "Comment text",
              isDeleted: 0,
              postId: 10,
            },
          ],
        },
      ],
    };

    const clientResult = parseFromDb(dbRow);
    expect(clientResult.id).toBe(1);
    expect(clientResult.posts![0]!.isPublished).toBe(true);
    expect(clientResult.posts![0]!.comments![0]!.isDeleted).toBe(false);
  });
});

describe("sqlOnly fields", () => {
  const users = schema({
    _tableName: "users",
    id: s.sqlite({ type: "int", pk: true }).client({
      value: () => "user-123",
      schema: z.string(),
    }),
    name: s.sqlite({ type: "varchar" }).client({ value: "John" }),
    internalToken: s.sqlite({ type: "varchar", sqlOnly: true }),
  });

  const box = createSchemaBox({ users }, { users: {} });

  it("should exclude sqlOnly fields from client schema", () => {
    type ClientShape = z.infer<typeof box.users.schemas.clientChecked>;
    expectTypeOf<ClientShape>().not.toHaveProperty("internalToken");

    const clientKeys = Object.keys(box.users.schemas.clientChecked.shape);
    expect(clientKeys).not.toContain("internalToken");
  });

  it("should include sqlOnly fields in sql schema", () => {
    type SqlShape = z.infer<typeof box.users.schemas.sql>;
    expectTypeOf<SqlShape>().toHaveProperty("internalToken");

    const sqlKeys = Object.keys(box.users.schemas.sql.shape);
    expect(sqlKeys).toContain("internalToken");
  });

  it("should exclude sqlOnly fields from defaults", () => {
    const defaults = box.users.defaults;
    expect(defaults).not.toHaveProperty("internalToken");
  });

  it("should exclude sqlOnly fields from toClient output", () => {
    const { toClient } = box.users.transforms;
    const dbData = { id: 1, name: "John", internalToken: "secret" };
    const result = toClient(dbData);
    expect(result).not.toHaveProperty("internalToken");
  });

  it("should NOT include sqlOnly fields in toDb output", () => {
    const { toDb } = box.users.transforms;
    const clientData = { id: "1", name: "John" };
    const result = toDb(clientData);
    expect(result).not.toHaveProperty("internalToken");
  });
});

describe("SQL enum fields", () => {
  const posts = schema({
    _tableName: "posts",
    id: s.sqlite({ type: "int", pk: true }),
    status: s.sqlite({
      type: "enum",
      values: ["draft", "published", "archived"],
      default: "draft",
    }),
    nullableStatus: s.sqlite({
      type: "enum",
      values: ["draft", "published"],
      nullable: true,
    }),
  });

  const box = createSchemaBox({ posts }, { posts: {} });

  it("should validate enum values in sql, client, and server schemas", () => {
    expect(box.posts.schemas.sql.shape.status.parse("published")).toBe(
      "published",
    );
    expect(box.posts.schemas.clientChecked.shape.status.parse("archived")).toBe(
      "archived",
    );
    expect(box.posts.schemas.server.shape.status.parse("draft")).toBe("draft");
    expect(() =>
      box.posts.schemas.server.shape.status.parse("deleted"),
    ).toThrow();
  });

  it("should use enum defaults and nullable enum defaults", () => {
    expect(box.posts.defaults.status).toBe("draft");
    expect(box.posts.defaults.nullableStatus).toBeNull();
  });

  it("should parse enum data for db writes", () => {
    expect(
      box.posts.transforms.parseForDb({
        id: 1,
        status: "published",
        nullableStatus: null,
      }),
    ).toEqual({ id: 1, status: "published", nullableStatus: null });
  });
});

describe("derive - computed fields", () => {
  const users = schema({
    _tableName: "users",
    id: s.sqlite({ type: "int", pk: true }),
    fullName: s.client(""),
    firstName: s.sqlite({ type: "varchar" }).client({ value: "John" }),
    lastName: s.sqlite({ type: "varchar" }).client({ value: "Doe" }),
  }).derive({
    forClient: {
      fullName: (row) => `${row.firstName} ${row.lastName}`,
    },
  });

  const box = createSchemaBox({ users }, { users: {} });

  it("should add derived fields to defaults", () => {
    const defaults = box.users.defaults;
    expect(defaults.fullName).toBe("John Doe");
  });

  it("should compute derived fields in toClient", () => {
    const { toClient } = box.users.transforms;
    const dbData = { id: 1, firstName: "Jane", lastName: "Smith" };
    const result = toClient(dbData as any);
    expect(result.fullName).toBe("Jane Smith");
  });

  it("should NOT include derived fields in sql schema", () => {
    const sqlKeys = Object.keys(box.users.schemas.sql.shape);
    expect(sqlKeys).not.toContain("fullName");
  });

  it("should include derived fields in client schema", () => {
    type ClientShape = z.infer<typeof box.users.schemas.clientChecked>;
    expectTypeOf<ClientShape>().toHaveProperty("fullName");
  });

  it("should work with multiple derived fields", () => {
    const products = schema({
      _tableName: "products",
      id: s.sqlite({ type: "int", pk: true }),
      price: s.sqlite({ type: "int" }).client({ value: 100 }),
      quantity: s.sqlite({ type: "int" }).client({ value: 5 }),
      total: s.client(0),
      formattedPrice: s.client(""),
    }).derive({
      forClient: {
        total: (row) => row.price * row.quantity,
        formattedPrice: (row) => `$${row.price}`,
      },
    });

    const box = createSchemaBox({ products }, { products: {} });
    const defaults = box.products.defaults;

    expect(defaults.total).toBe(500);
    expect(defaults.formattedPrice).toBe("$100");
  });

  it("should track dependencies for forDb derived fields", () => {
    const contacts = schema({
      _tableName: "contacts",
      id: s.sqlite({ type: "int", pk: true }),
      firstName: s.sqlite({ type: "varchar" }).client({ value: "John" }),
      lastName: s.sqlite({ type: "varchar" }).client({ value: "Doe" }),
      searchName: s.sqlite({ type: "varchar", sqlOnly: true }),
    }).derive({
      forDb: {
        searchName: (row) =>
          `${row.firstName} ${row.lastName}`.trim().toLowerCase(),
      },
    });

    const contactBox = createSchemaBox({ contacts }, { contacts: {} });

    expect(contactBox.contacts.deriveDependencies.searchName).toEqual([
      "firstName",
      "lastName",
    ]);
    expect(
      contactBox.contacts.transforms.parseForDb({
        id: 1,
        firstName: "Ada",
        lastName: "Lovelace",
      }),
    ).toMatchObject({ searchName: "ada lovelace" });
  });

  it("should allow forDb derived fields on visible DB columns", () => {
    const contacts = schema({
      _tableName: "contacts",
      id: s.sqlite({ type: "int", pk: true }),
      firstName: s.sqlite({ type: "varchar" }).client({ value: "John" }),
      lastName: s.sqlite({ type: "varchar" }).client({ value: "Doe" }),
      fullName: s.sqlite({ type: "varchar" }).client({ value: "" }),
    }).derive({
      forDb: {
        fullName: (row) => `${row.firstName} ${row.lastName}`.trim(),
      },
    });

    const contactBox = createSchemaBox({ contacts }, { contacts: {} });

    expect(
      contactBox.contacts.transforms.parseForDb({
        id: 1,
        firstName: "Ada",
        lastName: "Lovelace",
        fullName: "stale",
      }),
    ).toMatchObject({ fullName: "Ada Lovelace" });
  });
});

describe("refine", () => {
  it("should run server refinement on parseForDb", () => {
    const events = schema({
      _tableName: "events",
      id: s.sqlite({ type: "int", pk: true }),
      startDate: s.sqlite({ type: "varchar" }).client({ value: "" }),
      endDate: s.sqlite({ type: "varchar" }).client({ value: "" }),
      content: s.sqlite({ type: "varchar", nullable: true }).client({
        value: null,
        schema: z.string().nullable(),
      }),
      isPublished: s.sqlite({ type: "boolean" }).client({ value: false }),
    }).refine((r) => [
      r("server", (row) => {
        const errors: { path: string[]; message: string }[] = [];
        if (row.startDate && row.endDate && row.startDate > row.endDate) {
          errors.push({
            path: ["endDate"],
            message: "End date must be after start date",
          });
        }
        if (row.isPublished && !row.content) {
          errors.push({
            path: ["content"],
            message: "Published events must have content",
          });
        }
        return errors.length > 0 ? errors : undefined;
      }),
    ]);

    const box = createSchemaBox({ events }, { events: {} });

    expect(() =>
      box.events.transforms.parseForDb({
        id: 1,
        startDate: "2024-12-31",
        endDate: "2024-01-01",
        content: null,
        isPublished: false,
      }),
    ).toThrow("End date must be after start date");

    expect(() =>
      box.events.transforms.parseForDb({
        id: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        content: null,
        isPublished: true,
      }),
    ).toThrow("Published events must have content");

    const valid = box.events.transforms.parseForDb({
      id: 1,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      content: "Event details",
      isPublished: true,
    });
    expect(valid).toMatchObject({
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      content: "Event details",
      isPublished: true,
    });
  });

  it("should run client refinement on client input", () => {
    const forms = schema({
      _tableName: "forms",
      id: s.sqlite({ type: "int", pk: true }),
      password: s.sqlite({ type: "varchar" }).client({ value: "" }),
      confirmPassword: s.sqlite({ type: "varchar" }).client({ value: "" }),
    }).refine((r) => [
      r(["client", "clientCheck"], (row) => {
        if (row.password !== row.confirmPassword) {
          return {
            path: ["confirmPassword"],
            message: "Passwords must match",
          };
        }
        return undefined;
      }),
    ]);

    const box = createSchemaBox({ forms }, { forms: {} });

    const result = box.forms.schemas.client.safeParse({
      id: 1,
      password: "secret",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.message).toBe("Passwords must match");
    }

    const validResult = box.forms.schemas.client.safeParse({
      id: 1,
      password: "secret",
      confirmPassword: "secret",
    });
    expect(validResult.success).toBe(true);
  });

  it("should track refinement dependencies via fieldToGroup", () => {
    const items = schema({
      _tableName: "items",
      id: s.sqlite({ type: "int", pk: true }),
      min: s.sqlite({ type: "int" }).client({ value: 0 }),
      max: s.sqlite({ type: "int" }).client({ value: 100 }),
    }).refine((r) => [
      r("server", (row) => {
        if (row.min > row.max) {
          return { path: ["max"], message: "Max must be >= min" };
        }
        return undefined;
      }),
    ]);

    const box = createSchemaBox({ items }, { items: {} });
    expect(box.items.refineInfo.fieldToGroup).toHaveProperty("min");
    expect(box.items.refineInfo.fieldToGroup).toHaveProperty("max");
    expect(box.items.refineInfo.groups[0]!.deps).toContain("min");
    expect(box.items.refineInfo.groups[0]!.deps).toContain("max");
  });

  it("should support chaining derive and refine", () => {
    const records = schema({
      _tableName: "records",
      id: s.sqlite({ type: "int", pk: true }),
      firstName: s.sqlite({ type: "varchar" }).client({ value: "" }),
      lastName: s.sqlite({ type: "varchar" }).client({ value: "" }),
      fullName: s.sqlite({ type: "varchar", sqlOnly: true }),
    })
      .derive({
        forDb: {
          fullName: (row) => `${row.firstName} ${row.lastName}`.trim(),
        },
      })
      .refine((r) => [
        r("server", (row) => {
          if (!row.firstName && !row.lastName) {
            return { path: ["firstName"], message: "Name is required" };
          }
          return undefined;
        }),
      ]);

    const box = createSchemaBox({ records }, { records: {} });

    expect(box.records.deriveDependencies.fullName).toEqual([
      "firstName",
      "lastName",
    ]);
    expect(box.records.refineInfo.fieldToGroup).toHaveProperty("firstName");
    expect(box.records.refineInfo.fieldToGroup).toHaveProperty("lastName");

    const result = box.records.transforms.parseForDb({
      id: 1,
      firstName: "John",
      lastName: "Doe",
    });
    expect(result).toMatchObject({ fullName: "John Doe" });
  });
});

describe("client-only fields", () => {
  it("should exclude client-only fields from database transforms", () => {
    const tasks = schema({
      _tableName: "tasks",
      id: s.sqlite({ type: "int", pk: true }),
      title: s.sqlite({ type: "varchar" }).client({ value: "" }),
      statusLabel: s.client(""),
    });

    const taskBox = createSchemaBox({ tasks }, { tasks: {} });

    expect(
      taskBox.tasks.transforms.parseForDb({
        id: 1,
        title: "Ship it",
        statusLabel: "Local only",
      }),
    ).toEqual({ id: 1, title: "Ship it" });
    expect(
      taskBox.tasks.transforms.parsePatchForDb({
        statusLabel: "Still local only",
      }),
    ).toEqual({});
  });
});

describe("sqlOnly with derive in relations", () => {
  const users = schema({
    _tableName: "users",
    id: s.sqlite({ type: "int", pk: true }).client({
      value: () => "user-123",
      schema: z.string(),
    }),
    internalScore: s.sqlite({ type: "int", sqlOnly: true }),
    posts: s.hasMany({ count: 1 }),
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sqlite({ type: "int", pk: true }),
    title: s.sqlite({ type: "varchar" }).client({ value: "Post" }),
    authorId: s.reference(() => users.id),
    preview: s.client(""),
  }).derive({
    forClient: {
      preview: (row) => row.title.substring(0, 5),
    },
  });

  const box = createSchemaBox(
    { users, posts },
    {
      users: { posts: { fromKey: "id", toKey: posts.authorId } },
    },
  );

  it("should exclude sqlOnly fields from view but include derived", () => {
    const view = box.users.createView({ posts: true });

    const viewClientKeys = Object.keys(view.schemas.clientChecked.shape);
    expect(viewClientKeys).not.toContain("internalScore");
    expect(viewClientKeys).toContain("id");
    expect(viewClientKeys).toContain("posts");
  });

  it("should include derived fields in view", () => {
    const view = box.posts.createView({});
    const defaults = view.defaults();

    expect(defaults.preview).toBe("Post");
  });

  it("should apply toClient transforms correctly with derived", () => {
    const view = box.users.createView({ posts: true });
    const { toClient } = view.transforms;

    const dbData = {
      id: 1,
      internalScore: 99,
      posts: [{ id: 10, title: "Hello World", authorId: 1 }],
    };

    const result = toClient(dbData);
    expect(result.internalScore).toBeUndefined();
    expect(result.posts[0].preview).toBe("Hello");
  });
});

describe("defaultsDefinition", () => {
  const users = schema({
    _tableName: "users",
    id: s
      .sqlite({ type: "int", pk: true })
      .client({ value: "user-123", schema: z.string() }),
    name: s.sqlite({ type: "varchar" }).client({ value: "John" }),
    posts: s.hasMany({ count: 2 }),
    profile: s.hasOne(true),
  });

  const posts = schema({
    _tableName: "posts",
    id: s.sqlite({ type: "int", pk: true }),
    title: s.sqlite({ type: "varchar" }).client({ value: "Default Post" }),
    authorId: s.reference(() => users.id),
    user: s.hasOne(true),
  });

  const box = createSchemaBox(
    { users, posts },
    {
      users: { posts: { fromKey: "id", toKey: posts.authorId } },
      posts: { user: { fromKey: "id", toKey: users.id } },
    },
  );

  it("should have defaultsDefinition on schema box", () => {
    const def = box.users.defaultsDefinition;

    expect(def).toBeDefined();
    expect(def.id).toBe("user-123");
    expect(def.name).toBe("John");

    // Check array relation logic
    expect(def.posts).toBeInstanceOf(Array);
    expect(def.posts).toHaveLength(2);
    expect(def.posts[0]!.title).toBe("Default Post");

    // Check __def__ single-element logic
    expect(def.__def__posts).toBeDefined();
    expect(Array.isArray(def.__def__posts)).toBe(false);
    expect(def.__def__posts.title).toBe("Default Post");
  });

  it("should have defaultsDefinition on views", () => {
    const view = box.users.createView({
      posts: { user: true },
    });

    const def = view.defaultsDefinition();
    expect(def).toBeDefined();
    expect(def!.posts).toBeInstanceOf(Array);
    expect(def!.posts).toHaveLength(2);

    // Nested relation array test
    expect(def.posts[0]!.user).toBeDefined();
    expect(def.posts[0]!.user?.name).toBe("John");

    // Nested __def__ single-element logic
    expect(def!.__def__posts).toBeDefined();
    expect(Array.isArray(def!.__def__posts)).toBe(false);
    expect(def!.__def__posts.title).toBe("Default Post");
    expect(def!.__def__posts.user).toBeDefined();
    expect(def!.__def__posts.user?.name).toBe("John");
  });
});

describe("dynamic value functions re-run on each view.defaults() call", () => {
  const factory = schema({
    _tableName: "factories",
    id: s.sqlite({ type: "int", pk: true }).client({
      value: () => `temp_${Math.random().toString(36).substr(2, 8)}`,
      schema: z.string(),
      clientPk: true,
    }),
    name: s
      .sqlite({ type: "varchar", length: 100 })
      .client({ value: "MyFactory" }),
    boxes: s.hasMany({ count: 2 }),
  });

  const box = schema({
    _tableName: "boxes",
    id: s.sqlite({ type: "int", pk: true }).client({
      value: () => `box_${Math.random().toString(36).substr(2, 8)}`,
      schema: z.string(),
      clientPk: true,
    }),
    factoryId: s.reference(() => factory.id),
    variant: s.hasOne(true),
  });

  const boxVariant = schema({
    _tableName: "box_variants",
    id: s.sqlite({ type: "int", pk: true }).client({
      value: () => `var_${Math.random().toString(36).substr(2, 8)}`,
      schema: z.string(),
      clientPk: true,
    }),
    boxId: s.reference(() => box.id),
    label: s
      .sqlite({ type: "varchar", length: 50 })
      .client({ value: "Standard" }),
  });

  const box_ = createSchemaBox(
    { factory, box, boxVariant },
    {
      factory: {
        boxes: { fromKey: "id", toKey: box.factoryId },
      },
      box: {
        variant: { fromKey: "id", toKey: boxVariant.boxId },
      },
      boxVariant: {},
    },
  );

  it("should generate unique top-level defaults on each call", () => {
    const view = box_.factory.createView({ boxes: { variant: true } });
    const first = view.defaults();
    const second = view.defaults();

    expect(first.id).not.toBe(second.id);
    expect(first.name).toBe("MyFactory");
  });

  it("should generate unique nested relation defaults on each call", () => {
    const view = box_.factory.createView({ boxes: { variant: true } });

    const first = view.defaults();
    const second = view.defaults();

    expect(first.boxes).toHaveLength(2);
    expect(second.boxes).toHaveLength(2);

    first.boxes!.forEach((b: any, i: number) => {
      expect(b.id).not.toBe(second.boxes![i]!.id);
    });
  });

  it("should generate unique deeply nested defaults on each call", () => {
    const view = box_.factory.createView({ boxes: { variant: true } });

    const first = view.defaults();
    const second = view.defaults();

    first.boxes!.forEach((b: any, i: number) => {
      const firstVariant = b.variant;
      const secondVariant = second.boxes![i]!.variant;
      expect(firstVariant!.id).not.toBe(secondVariant!.id);
    });
  });

  it("should generate unique values within the same defaults call", () => {
    const view = box_.factory.createView({ boxes: { variant: true } });

    const defaults = view.defaults();

    const ids = new Set<string | number>([
      defaults.id,
      ...(defaults.boxes?.map((b: any) => b.id) ?? []),
      ...(defaults.boxes?.flatMap((b: any) =>
        b.variant ? [b.variant.id] : [],
      ) ?? []),
    ]);

    expect(ids.size).toBe(5);
  });

  it("should generate unique values across defaultsDefinition calls", () => {
    const view = box_.factory.createView({ boxes: { variant: true } });

    const first = view.defaultsDefinition();
    const second = view.defaultsDefinition();

    expect(first.id).not.toBe(second.id);
    expect((first as any).boxes![0].variant!.id).not.toBe(
      (second as any).boxes![0].variant!.id,
    );
  });
});
