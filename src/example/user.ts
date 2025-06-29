import { z } from "zod";

import { createSchema, schema, s, schemaRelations } from "../schema.js";

import { v4 as uuidv4 } from "uuid";

export const petSchema = schema({
  _tableName: "pets",
  id: s.sql({ type: "int", pk: true }).initialState(
    () => z.string(),
    () => uuidv4()
  ),
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

export const petReferences = schemaRelations(petSchema, (s) => ({
  userId: s.reference(() => userSchema.id),
}));

export const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4()),
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
  testId: s.reference(() => petSchema.id),
  pets: s
    .hasMany({
      fromKey: "id",
      toKey: () => petReferences.userId,
      defaultCount: 1,
    })
    .validation(({ client }) => client.min(1)),
}));

const {
  sqlSchema,
  clientSchema: clSchema,
  defaultValues,
  validationSchema,
} = createSchema(userSchema, userReferences);

type User = z.infer<typeof sqlSchema>;
type UserClient = z.infer<typeof clSchema>;
type UserValidation = z.infer<typeof validationSchema>;

/*type UserClient = {
    pets: {
        id: string | number;
        name: string;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
    }[];
    id: string | number;
    firstname: string;
    surname: string;
    email: string;
}*/
