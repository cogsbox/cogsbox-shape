import { z } from "zod";

import { createSchema, hasMany, shape } from "../schemaNew";

export const userSchema = {
  _tableName: "users",
  id: shape.sql({ type: "int", pk: true }).new(() => z.string().uuid()),

  firstname: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ sql }) => sql.min(1)),
  surname: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ sql }) => sql.min(1)),
  email: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ sql }) => sql.email()),
  pets: hasMany({
    fromKey: "id",
    toKey: () => petSchema.userId,
    schema: () => petSchema,
    defaultCount: 1,
  }),
};

export const petSchema = {
  _tableName: "pets",
  id: shape.sql({ type: "int", pk: true }).new(({ zod }) => z.string()),
  name: shape.sql({ type: "varchar", length: 255 }),
  userId: shape.sql({ type: "int" }).client(z.string()),
  fluffynessScale: shape
    .sql({ type: "text" })
    .db((s) => z.number())
    .new(({ db }) =>
      //db: z.ZodString | z.ZodNumber
      z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"]))
    )
    .client(({ sql, db }) =>
      z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"]))
    )
    .transform({
      toClient: (value) => value.split(",").filter(Boolean) as any,
      toDb: (value) => value.join(","),
    }),
  favourite: shape
    .sql({ type: "int" })
    .client(({ zod }) => z.boolean())
    .transform({
      toClient: (dbValue) => dbValue === 1,
      toDb: (clientValue) => (clientValue ? 1 : 0),
    }),
};

export const { dbSchema, clientSchema, initialValues, serialized } =
  createSchema(userSchema);
