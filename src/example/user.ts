import { z } from "zod";

import { belongsTo, createSchema, hasMany, shape } from "../schema";

export const userSchema = {
  _tableName: "users",
  id: shape.sql({ type: "int", pk: true }),
  firstname: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.min(1)),
  surname: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.min(1)),
  email: shape
    .sql({ type: "varchar", length: 255 })
    .db(({ zod }) => zod.email()),
  pets: hasMany({
    fromKey: "id",
    toKey: () => petSchema.userId,
    schema: () => petSchema,
    defaultCount: 1,
  }),
};

export const petSchema = {
  _tableName: "pets",
  id: shape
    .sql2({ type: "int", pk: true })
    .newState(z.string(), () => "uuidexample")
    .client(({ sql, newState }) => z.union([sql, newState]))
    .validation(z.string()),

  name: shape.sql({ type: "varchar", length: 255 }),
  userId: shape.sql({ type: "int" }).client(z.string()),
  fluffynessScale: shape
    .sql({ type: "text" })
    .client(({ zod }) => z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"])))
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
