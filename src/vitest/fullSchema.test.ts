// Imports at the top - added 'expect' for runtime tests
import { expect, describe, it } from "vitest";
import { expectTypeOf } from "expect-type";
import { z } from "zod";

// Import the new primary method for schema creation
import { s, schema, createSchemaBox } from "../schema";

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
      const idField = s
        .sql({ type: "int", pk: true })
        .initialState(() => "temp-uuid-123" as const);
      type InferredClient = z.infer<typeof idField.config.zodClientSchema>;
      expectTypeOf<InferredClient>().toEqualTypeOf<number | "temp-uuid-123">();
    });

    it("should NOT create a union type when .initialState provides the same type", () => {
      const countField = s.sql({ type: "int" }).initialState(() => 0);
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
      id: s
        .sql({ type: "int", pk: true })
        .initialState(() => "new-user" as const),
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
      fromInitialState: s
        .sql({ type: "varchar" })
        .initialState(() => "from-initial-state"),
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
        .validation(({ sql }) => sql.min(3, "Name is too short")),
    });

    // Use the new registry to process the schema
    const box = createSchemaBox({ complex: complexSchemaDef }, () => ({
      complex: {}, // No relations to resolve
    }));
    const { client, sql, validation } = box.complex.schemas;
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
      const result = validation.safeParse(invalidClientData);
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
      .initialState(() => "user-123", z.string()),
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

      type ViewClient = z.infer<typeof userView.client>;
      expectTypeOf<ViewClient>().toEqualTypeOf<{
        id: string | number;
        petId: number;
        pets: {
          id: number;
          userId: string | number;
        }[];
      }>();

      // Runtime check
      const viewShape = userView.client.shape;
      expect(viewShape).toHaveProperty("pets");
      expect(viewShape.pets).toBeInstanceOf(z.ZodArray);
    });

    it("should handle nested relations correctly", () => {
      const userViewNested = box.users.createView({
        pets: { owner: true },
      });

      type ViewClientNested = z.infer<typeof userViewNested.client>;
      expectTypeOf<ViewClientNested>().toEqualTypeOf<{
        id: string | number;
        petId: number;
        pets: {
          id: number;
          userId: string | number;
          owner?:
            | {
                id: string | number;
                petId: number;
              }
            | undefined;
        }[];
      }>();

      // Runtime check - owner should not have pets
      const shape = userViewNested.client.shape;
      if (shape.pets instanceof z.ZodArray) {
        const petSchema = shape.pets.element;
        if (petSchema instanceof z.ZodObject) {
          const petShape = petSchema.shape;
          expect(petShape).toHaveProperty("owner");

          // Check that owner is optional
          expect(petShape.owner).toBeInstanceOf(z.ZodOptional);

          // Check that owner doesn't include pets
          if (petShape.owner instanceof z.ZodOptional) {
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

  describe("New Session Features - Base Schema Without Relations", () => {
    const users = schema({
      _tableName: "users",
      id: s
        .sql({ type: "int", pk: true })
        .initialState(() => "user-123", z.string()),
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
        // First check if defaultValues exists at the expected location
        const defaults = box.pets.defaults;

        // Type check
        expectTypeOf(defaults).toEqualTypeOf<{
          id: number;
          userId: string;
        }>();

        // Runtime check - only if defaults is defined
        if (defaults) {
          expect(defaults).not.toHaveProperty("owner");
          expect(defaults).toHaveProperty("id");
          expect(defaults).toHaveProperty("userId");
        } else {
          // If not at schemas.defaultValues, check if it's at top level
          const topLevelDefaults = (box.pets as any).defaultValues;
          expect(topLevelDefaults).toBeDefined();
        }
      });
    });

    describe("View Creation", () => {
      it("should include only selected relations in view", () => {
        const userView = box.users.createView({
          pets: true,
        });

        type ViewClient = z.infer<typeof userView.client>;
        expectTypeOf<ViewClient>().toEqualTypeOf<{
          id: string | number;
          petId: number;
          pets: {
            id: number;
            userId: string | number;
          }[];
        }>();

        // Runtime check
        const viewShape = userView.client.shape;
        expect(viewShape).toHaveProperty("pets");
        expect(viewShape.pets).toBeInstanceOf(z.ZodArray);
      });

      it("should handle nested relations correctly", () => {
        const userViewNested = box.users.createView({
          pets: { owner: true },
        });

        type ViewClientNested = z.infer<typeof userViewNested.client>;
        expectTypeOf<ViewClientNested>().toEqualTypeOf<{
          id: string | number;
          petId: number;
          pets: {
            id: number;
            userId: string | number;
            owner?:
              | {
                  id: string | number;
                  petId: number;
                }
              | undefined;
          }[];
        }>();

        // Runtime check - owner should not have pets
        const shape = userViewNested.client.shape;
        if (shape.pets instanceof z.ZodArray) {
          const petSchema = shape.pets.element;
          if (petSchema instanceof z.ZodObject) {
            const petShape = petSchema.shape;
            expect(petShape).toHaveProperty("owner");

            // Check that owner is optional
            expect(petShape.owner).toBeInstanceOf(z.ZodOptional);

            // Check that owner doesn't include pets
            if (petShape.owner instanceof z.ZodOptional) {
              const ownerSchema = petShape.owner._def.innerType;
              if (ownerSchema instanceof z.ZodObject) {
                expect(ownerSchema.shape).not.toHaveProperty("pets");
              }
            }
          }
        }
      });
    });

    describe("Navigation Proxy", () => {
      it("should provide type-safe navigation", () => {
        // Type test only - remove the invalid .toBeDefined()
        type NavType = typeof box.users.nav.pets.owner.pets;
        expectTypeOf<NavType>().not.toBeNever();

        // Runtime test - nav proxy should return nested proxies
        expect(box.users.nav).toBeDefined();
        expect(box.users.nav.pets).toBeDefined();
        expect(box.users.nav.pets.owner).toBeDefined();
      });
    });

    describe("Default Values Accessibility", () => {
      it("should check where default values are exposed", () => {
        // Check both possible locations
        const atschemas = box.users.defaults;
        const atTopLevel = (box.users as any).defaultValues;

        // At least one should be defined
        const defaults = atTopLevel || atschemas;
        expect(defaults).toBeDefined();

        if (atTopLevel) {
          expect(atTopLevel.id).toBe("user-123");
          expect((box.pets as any).defaultValues.id).toBe(0);
          expect((box.pets as any).defaultValues.userId).toBe("user-123");
        } else {
          expect(atschemas.id).toBe("user-123");
          expect(box.pets.defaults.id).toBe(0);
          expect(box.pets.defaults.userId).toBe("user-123");
        }
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
      id: s.sql({ type: "int", pk: true }).initialState(() => "user-123"),
      name: s.sql({ type: "varchar" }).initialState("John"),
      posts: s.hasMany({ count: 2 }), // Should generate 2 posts
      comments: s.hasMany([]), // Should be empty array
      profile: s.hasOne(true), // Changed from {} to true
      settings: s.hasOne(null), // Should be null
      followers: s.hasMany(undefined), // Should not be included
    });

    const posts = schema({
      _tableName: "posts",
      id: s.sql({ type: "int", pk: true }),
      title: s.sql({ type: "varchar" }).initialState("Default Post"),
      authorId: s.reference(() => users.id),
    });

    const comments = schema({
      _tableName: "comments",
      id: s.sql({ type: "int", pk: true }),
      text: s.sql({ type: "varchar" }).initialState("Default Comment"),
      userId: s.reference(() => users.id),
    });

    const profiles = schema({
      _tableName: "profiles",
      id: s.sql({ type: "int", pk: true }),
      bio: s.sql({ type: "varchar" }).initialState("Default Bio"),
      userId: s.reference(() => users.id),
    });

    const box = createSchemaBox({ users, posts, comments, profiles }, (s) => ({
      users: {
        posts: { fromKey: "id", toKey: s.posts.authorId },
        comments: { fromKey: "id", toKey: s.comments.userId },
        profile: { fromKey: "id", toKey: s.profiles.userId },
        settings: { fromKey: "id", toKey: s.profiles.userId },
        followers: { fromKey: "id", toKey: s.users.id },
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
      expect(defaults.posts[0]).toEqual({
        id: 0,
        title: "Default Post",
        authorId: "user-123",
      });
      expect(defaults.posts[1]).toEqual({
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
      expect(defaults.posts[0]).not.toHaveProperty("author"); // Relation not selected
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
        name: s.sql({ type: "varchar" }).initialState("Item"),
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
      expect(defaults.items[0]).toEqual({ id: 0, name: "Item" });
    });
  });
});
