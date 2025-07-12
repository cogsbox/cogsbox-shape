// Imports at the top - added 'expect' for runtime tests
import { expect, describe, it } from "vitest";
import { expectTypeOf } from "expect-type";
import { z } from "zod";

import { s, createSchema, schemaRelations, schema } from "../schema";
import { table } from "console";

/*
================================================================
SECTION A: TYPE-LEVEL TESTS (ALL Original Tests Restored)
================================================================
*/
describe("Schema Builder Type Tests (with expect-type)", () => {
  // Your original tests are all here.
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
        .initialState(() => "temp-uuid-123");
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

  // THIS SECTION WAS MISTAKENLY REMOVED AND IS NOW RESTORED
  describe("`createSchema` Integration with Relations", () => {
    const userSchema = schema({
      _tableName: "users",
      id: s.sql({ type: "int", pk: true }).initialState(() => "new-user"),
    });
    const userSchemaRels = schemaRelations(userSchema, (s) => ({
      posts: s.hasMany({
        fromKey: "id",
        toKey: () => postSchemaRels.authorId,
      }),
    }));

    const postSchema = schema({
      _tableName: "posts",
      id: s.sql({ type: "int", pk: true }),

      isPublished: s.sql({ type: "int" }).client(() => z.boolean()),
    });

    const postSchemaRels = schemaRelations(postSchema, (s) => ({
      authorId: s.reference(() => userSchema.id),
    }));

    const finalUserResult = createSchema(userSchema, userSchemaRels);
    const finalPostResult = createSchema(postSchema, postSchemaRels);

    it("should infer correct types for the final client schema", () => {
      type UserClient = z.infer<typeof finalUserResult.clientSchema>;
      expectTypeOf<UserClient["id"]>().toEqualTypeOf<"new-user" | number>();
      expectTypeOf<UserClient["posts"]>().toBeArray();
      const postInRelation =
        finalUserResult.clientSchema.shape.posts.element.shape;
      type PostPublished = z.infer<typeof postInRelation.isPublished>;
      expectTypeOf<PostPublished>().toEqualTypeOf<boolean>();
    });

    it("should correctly handle reference types", () => {
      type PostClient = z.infer<typeof finalPostResult.clientSchema>;

      expectTypeOf<PostClient["authorId"]>().toEqualTypeOf<
        "new-user" | number
      >();
    });
  });
});

/*
================================================================
SECTION B: RUNTIME BEHAVIOR TESTS (The New Additions)
================================================================
*/
describe("Schema Builder Runtime Behavior", () => {
  // describe("Default Value Generation", () => {
  //   // Dummy schema for the relation
  //   const itemSchema = { _tableName: "items", id: s.int() };
  //   const defaultValuesSchema = schema({
  //     _tableName: "defaults",
  //     fromInitialState: s.varchar().initialState(() => "from-initial-state"),
  //     fromSqlDefault: s.int({ default: 99 }),
  //     isNullable: s.boolean({ nullable: true }),
  //     hasNoDefault: s.int(),
  //   });
  //   const { defaultValues } = createSchema(defaultValuesSchema);

  //   it("should get default from .initialState()", () => {
  //     expect(defaultValues.fromInitialState).toBe("from-initial-state");
  //   });

  //   it("should get default from SQL config", () => {
  //     expect(defaultValues.fromSqlDefault).toBe(99);
  //   });

  //   it("should default a nullable field to null", () => {
  //     expect(defaultValues.isNullable).toBe(null);
  //   });

  //   it("should use the generated default (e.g., 0 for int) when none is provided", () => {
  //     expect(defaultValues.hasNoDefault).toBe(0);
  //   });
  // });

  describe("Schema Parsing, Validation, and Transformation", () => {
    // This schema definition is correct and has the .transform() method.
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

    // ---- THE FIX IS HERE ----
    // We now destructure the new toClient and toDb functions from the result.
    const { clientSchema, sqlSchema, validationSchema, toClient, toDb } =
      createSchema(complexSchemaDef);

    it("should correctly transform a DB object to a Client object", () => {
      const dbData = { id: 1, status: 1, name: "Test" };

      // 1. Explicitly call the conversion function.
      const clientResult = toClient(dbData);

      // 2. Assert the transformed value is correct.
      expect(clientResult.status).toBe("active");

      // 3. (Optional but good) Use the pure clientSchema to validate the result.
      expect(() => clientSchema.parse(clientResult)).not.toThrow();
    });

    it("should correctly transform a Client object to a DB object", () => {
      const clientData = { id: 1, status: "inactive", name: "Test" } as const;

      // 1. Explicitly call the conversion function.
      const dbResult = toDb(clientData);

      // 2. Assert the transformed value is correct.
      expect(dbResult.status).toBe(0);

      // 3. (Optional but good) Use the pure sqlSchema to validate the result.
      expect(() => sqlSchema.parse(dbResult)).not.toThrow();
    });

    it("should still use the validationSchema for pure validation", () => {
      // This test proves that the validation schemas were not affected by the transform logic.
      const invalidClientData = { id: 1, status: "inactive", name: "ab" };
      const result = validationSchema.safeParse(invalidClientData);

      expect(result.success).toBe(false);
      // @ts-ignore
      expect(result.error.issues[0].message).toBe("Name is too short");
    });
  });
});
