import { z } from "zod";

import { createSchema, schema, s, schemaRelations } from "../schema.js";

export const petSchema = schema({
  _tableName: "pets",
  id: s.sql({ type: "int", pk: true }).initialState(() => "sdasds"),
  name: s.sql({ type: "varchar", length: 255 }).initialState(() => z.string()),
  fluffynessScale: s
    .sql({ type: "text" })
    .client(({ sql }) => z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"])))
    .transform({
      toClient: (value) => value.split(",").filter(Boolean) as any,
      toDb: (value) => value.join(","),
    }),
  favourite: s
    .sql({ type: "int" })
    .client(({ sql }) => z.boolean())
    .transform({
      toClient: (dbValue) => dbValue === 1,
      toDb: (clientValue) => (clientValue ? 1 : 0),
    }),
});

export const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState(() => z.string()),
  firstname: s
    .sql({ type: "varchar", length: 255 })
    .initialState(() => "test")
    .validation(({ sql }) => sql.min(1)),
  surname: s
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.min(1)),
  email: s
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.email()),
});

export const userReferences = schemaRelations(userSchema, (s) => ({
  pets: s
    .hasMany({
      fromKey: "id",
      toKey: () => petSchema.id,
      defaultCount: 1,
    })
    .validation(({ sql }) => sql.min(1)),
  petId: s.reference(() => petSchema.id),
}));

const {
  sqlSchema,
  clientSchema: clSchema,
  defaultValues,
  validationSchema,
} = createSchema(userSchema, { ...userReferences });

type User = z.infer<typeof sqlSchema>;
type UserDb = z.infer<typeof clSchema>;
type UserValidation = z.infer<typeof validationSchema>;

/*type clientTestType = z.ZodObject<{
    id: z.ZodNumber;
    firstname: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
    pets: z.ZodArray<z.ZodObject<{*/
