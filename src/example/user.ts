import { z } from "zod";

import {
  schema,
  s,
  schemaRelations,
  InferFromSchema,
  createSchemaBox,
  createSchemaBoxRegistry,
} from "../schema.js";

import { v4 as uuidv4 } from "uuid";

export const petSchema = schema({
  _tableName: "pets",
  id: s.sql({ type: "int", pk: true }).initialState(
    () => uuidv4(),
    () => z.string()
  ),
  name: s
    .sql({ type: "varchar", length: 255 })
    .initialState("() => {}", (V) => z.string()),
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
export const petReferences2 = schemaRelations(petSchema, (s) => ({
  owner: s.hasOne({
    fromKey: "id",
    toKey: () => userReferences.petId, //any
  }),
}));

export const userSchema = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4(), z.string()),
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
  petId: s.reference(() => petSchema.id),
  pets: s
    .hasMany({
      fromKey: "id",
      toKey: () => petReferences.userId,
    })
    .validation(({ client }) => client.min(1)),
  posts: s.hasOne({
    fromKey: "id",
    toKey: () => postReferences.author_id,
  }),
}));

export const postSchema = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4(), z.string()),
  title: s
    .sql({ type: "varchar", length: 255 })
    .initialState(() => "test")
    .validation(({ sql }) => sql.min(1)),
  content: s
    .sql({ type: "varchar", length: 255 })
    .validation(({ sql }) => sql.min(1)),
});

export const postReferences = schemaRelations(postSchema, (s) => ({
  author_id: s.reference(() => userSchema.id),
  aboutPet: s.hasOne({
    fromKey: "id",
    toKey: () => petReferences.userId,
  }),
}));

const registry = {
  users: { ...userSchema, ...userReferences },
  pets: { ...petSchema, ...petReferences },
  posts: { ...postSchema, ...postReferences },
};

const box = createSchemaBox(registry);
box.users.posts.aboutPet;

type PostsType = typeof registry.posts;
type AboutPetType = PostsType["aboutPet"];

/*Property 'aboutPet' does not exist on type 'ExtractRelations<{ _tableName: string & { __meta: { _key: "_tableName"; _fieldType: string; }; __parentTableType: { _tableName: string; id: { config: { sql: { type: "int"; pk: true; }; zodSqlSchema: ZodNumber; zodNewSchema: ZodString; initialValue: string; zodClientSchema: ZodUnion<...>; zodValidationSchema: ZodUnio...'.ts(2339)*/

const users = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4(), z.string()),
  petId: s.reference(() => pets.id),
  pets: s.placeholderHasMany(),
});
const pets = schema({
  _tableName: "pets",
  id: s.sql({ type: "int", pk: true }),
  userId: s.reference(() => users.id),
});
const posts = schema({
  _tableName: "posts",
  userId: s.reference(() => users.id),
  id: s.sql({ type: "int", pk: true }),
  aboutPet: s.placeholderHasOne(),
});

const schemas = { users, pets };

const box2 = createSchemaBoxRegistry(schemas, (s) => ({
  users: {
    petId: s.pets.id,
    pets: { fromKey: "id", toKey: s.pets.userId },
  },
  pets: { owner: { fromKey: "userId", toKey: s.users.id }, userId: s.users.id },
}));
const testUser = box2.users;
const subTEstUser = testUser.zodSchemas;
const clientSChema = subTEstUser.clientSchema;
type ClientUser = z.infer<typeof clientSChema>;
/*type ClientUser = {
    id: string | number;
    pets: never;
    petId: number;
}*/
