import { z } from "zod";

import {
  belongsTo,
  createSchema,
  createSchema2,
  hasMany,
  shape,
} from "../schema";

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
    .initialState(z.string(), () => "uuidexample")
    .client(({ sql, initialState }) => z.union([sql, initialState]))
    .validation(z.string())
    .transform({
      toClient: (dbValue) => dbValue,
      toDb: (clientValue) => Number(clientValue),
    }),

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

const testPets = {
  _tableName: "users",

  id: shape
    .sql2({ type: "int", pk: true })
    .initialState(z.string().uuid(), () => "sdasdsad")
    .client(({ sql, initialState }) => z.union([sql, initialState])),
  email: shape
    .sql2({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.email()),

  createdAt: shape
    .sql2({ type: "datetime" })
    .client(({ sql }) => z.string())
    .validation(({ sql }) => sql.optional())
    .transform({
      toClient: (date: Date) => date.toISOString(),
      toDb: (str: string) => new Date(str),
    }),
};
/*const testPets: {
    _tableName: string;
    id: Builder<"validation", {
        type: "int";
        pk: true;
    }, z.ZodNumber, z.ZodString, string, z.ZodUnion<[z.ZodNumber, z.ZodString]>, z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    email: Builder<"validation", {
        type: "varchar";
        length: number;
    }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString>;
    createdAt: {
        config: {
            sql: {
                type: "datetime";
            };
            zodSqlSchema: z.ZodDate;
            zodNewSchema: z.ZodDate;
            initialValue: undefined;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodOptional<z.ZodDate>;
            transforms: {
                toClient: (dbValue: Date) => string;
                toDb: (clientValue: string) => Date;
            };
        };
    };
}*/

const {
  sqlSchema,
  clientSchema: clSchema,
  defaultValues,
  validationSchema,
} = createSchema2(testPets);
/*All destructured elements are unused.ts(6198)
const sqlSchema: z.ZodObject<any, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>*/
// Clean type inference
type User = z.infer<typeof sqlSchema>;
type UserDb = z.infer<typeof clSchema>;
type UserValidation = z.infer<typeof validationSchema>;
