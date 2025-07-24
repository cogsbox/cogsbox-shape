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
      posts: {}, // No relations originating from `posts` to define here
    }));

    const finalUserResult = box.users.zodSchemas;
    const finalPostResult = box.posts.zodSchemas;

    it("should infer correct types for the final client schema", () => {
      type UserClient = z.infer<typeof finalUserResult.clientSchema>;
      expectTypeOf<UserClient["id"]>().toEqualTypeOf<"new-user" | number>();
      expectTypeOf<UserClient["posts"]>().toBeArray();

      // Check the type of the related post within the user schema
      // First, get the posts field from the shape
      const postsField = finalUserResult.clientSchema.shape.posts;

      // Check if it's a ZodArray (it should be)
      if (postsField instanceof z.ZodArray) {
        const postSchema = postsField.element;

        // Check if the element is a ZodObject
        if (postSchema instanceof z.ZodObject) {
          const postShape = postSchema.shape;

          // Now we can safely access isPublished
          if (postShape.isPublished) {
            type PostPublished = z.infer<typeof postShape.isPublished>;
            expectTypeOf<PostPublished>().toEqualTypeOf<boolean>();
          }
        }
      }
    });

    it("should correctly handle reference types", () => {
      type PostClient = z.infer<typeof finalPostResult.clientSchema>;
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
    const { defaultValues } = box.defaults.zodSchemas;

    it("should get default from .initialState()", () => {
      expect(defaultValues.fromInitialState).toBe("from-initial-state");
    });

    it("should get default from SQL config", () => {
      expect(defaultValues.fromSqlDefault).toBe(99);
    });

    it("should default a nullable field to null", () => {
      expect(defaultValues.isNullable).toBeNull();
    });

    it("should use the generated default (e.g., 0 for int) when none is provided", () => {
      expect(defaultValues.hasNoDefault).toBe(0);
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
    const { clientSchema, sqlSchema, validationSchema, toClient, toDb } =
      box.complex.zodSchemas;

    it("should correctly transform a DB object to a Client object", () => {
      const dbData = { id: 1, status: 1, name: "Test" };
      const clientResult = toClient(dbData);
      expect(clientResult.status).toBe("active");
      expect(() => clientSchema.parse(clientResult)).not.toThrow();
    });

    it("should correctly transform a Client object to a DB object", () => {
      const clientData = { id: 1, status: "inactive", name: "Test" } as const;
      const dbResult = toDb(clientData);
      expect(dbResult.status).toBe(0);
      expect(() => sqlSchema.parse(dbResult)).not.toThrow();
    });

    it("should still use the validationSchema for pure validation", () => {
      const invalidClientData = { id: 1, status: "inactive", name: "ab" };
      const result = validationSchema.safeParse(invalidClientData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Name is too short");
      }
    });
  });
});
