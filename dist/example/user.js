import { z } from "zod";
import { createSchema, hasMany, reference, shape, } from "../schema.js";
export const userSchema = {
    _tableName: "users",
    id: shape.sql({ type: "int", pk: true }),
    firstname: shape
        .sql({ type: "varchar", length: 255 })
        .initialState(() => "test")
        .validation(({ sql }) => sql.min(1)),
    surname: shape
        .sql({ type: "varchar", length: 255 })
        .validation(({ sql }) => sql.min(1)),
    email: shape
        .sql({ type: "varchar", length: 255 })
        .validation(({ sql }) => sql.email()),
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
        .sql({ type: "int", pk: true })
        .initialState(() => "uuidexample")
        .client(({ sql, initialState }) => z.union([sql, initialState]))
        .validation(z.string())
        .transform({
        toClient: (dbValue) => dbValue,
        toDb: (clientValue) => Number(clientValue),
    }),
    name: shape.sql({ type: "varchar", length: 255 }),
    userId: reference({ to: () => userSchema.id, field: z.number() }),
    fluffynessScale: shape
        .sql({ type: "text" })
        .client(({ sql }) => z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"])))
        .transform({
        toClient: (value) => value.split(",").filter(Boolean),
        toDb: (value) => value.join(","),
    }),
    favourite: shape
        .sql({ type: "int" })
        .client(({ sql }) => z.boolean())
        .transform({
        toClient: (dbValue) => dbValue === 1,
        toDb: (clientValue) => (clientValue ? 1 : 0),
    }),
};
// export const { dbSchema, clientSchema, initialValues, serialized } =
//   createSchema(userSchema);
const testPets = {
    _tableName: "users",
    id: shape
        .sql({ type: "int", pk: true })
        .initialState(z.string().uuid(), () => "sdasdsad")
        .client(({ sql, initialState }) => z.union([sql, initialState]))
        .validation(({ sql }) => sql)
        .transform({
        toClient: (dbValue) => dbValue,
        toDb: (clientValue) => Number(clientValue),
    }),
    email: shape
        .sql({ type: "varchar", length: 255 })
        .validation(({ sql }) => sql),
    createdAt: shape
        .sql({ type: "datetime" })
        .client(({ sql }) => z.string())
        .validation(({ sql }) => sql.optional())
        .transform({
        toClient: (date) => date.toISOString(),
        toDb: (str) => new Date(str),
    }),
};
const { sqlSchema, clientSchema: clSchema, defaultValues, validationSchema, } = createSchema(testPets);
