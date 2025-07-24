import { z } from "zod";

import { schema, s, createSchemaBox } from "../schema.js";

import { v4 as uuidv4 } from "uuid";

// export const petSchema = schema({
//   _tableName: "pets",
//   id: s.sql({ type: "int", pk: true }).initialState(
//     () => uuidv4(),
//     () => z.string()
//   ),
//   name: s
//     .sql({ type: "varchar", length: 255 })
//     .initialState("() => {}", (V) => z.string()),
//   fluffynessScale: s
//     .sql({ type: "text" })
//     .client(({ sql }) => z.array(z.enum(["bald", "fuzzy", "fluffy", "poof"])))
//     .transform({
//       toClient: (value) => value.split(",").filter(Boolean) as any,
//       toDb: (value) => value.join(","),
//     }),
//   favourite: s
//     .sql({ type: "int" })
//     .client(({ sql }) => z.boolean())
//     .transform({
//       toClient: (dbValue) => dbValue === 1,
//       toDb: (clientValue) => (clientValue ? 1 : 0),
//     }),
// });

// export const petReferences = schemaRelations(petSchema, (s) => ({
//   userId: s.reference(() => userSchema.id),
// }));
// export const petReferences2 = schemaRelations(petSchema, (s) => ({
//   owner: s.hasOne({
//     fromKey: "id",
//     toKey: () => userReferences.petId, //any
//   }),
// }));

// export const userSchema = schema({
//   _tableName: "users",
//   id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4(), z.string()),
//   firstname: s
//     .sql({ type: "varchar", length: 255 })
//     .initialState(() => "test")
//     .validation(({ sql }) => sql.min(1)),
//   surname: s
//     .sql({ type: "varchar", length: 255 })
//     .validation(({ sql }) => sql.min(1)),
//   email: s
//     .sql({ type: "varchar", length: 255 })
//     .validation(({ sql }) => sql.email()),
// });

// export const userReferences = schemaRelations(userSchema, (s) => ({
//   testId: s.reference(() => petSchema.id),
//   petId: s.reference(() => petSchema.id),
//   pets: s
//     .hasMany({
//       fromKey: "id",
//       toKey: () => petReferences.userId,
//     })
//     .validation(({ client }) => client.min(1)),
//   posts: s.hasOne({
//     fromKey: "id",
//     toKey: () => postReferences.author_id,
//   }),
// }));

// export const postSchema = schema({
//   _tableName: "posts",
//   id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4(), z.string()),
//   title: s
//     .sql({ type: "varchar", length: 255 })
//     .initialState(() => "test")
//     .validation(({ sql }) => sql.min(1)),
//   content: s
//     .sql({ type: "varchar", length: 255 })
//     .validation(({ sql }) => sql.min(1)),
// });

// export const postReferences = schemaRelations(postSchema, (s) => ({
//   author_id: s.reference(() => userSchema.id),
//   aboutPet: s.hasOne({
//     fromKey: "id",
//     toKey: () => petReferences.userId,
//   }),
// }));

// const registry = {
//   users: { ...userSchema, ...userReferences },
//   pets: { ...petSchema, ...petReferences },
//   posts: { ...postSchema, ...postReferences },
// };

// const box = createSchemaBox(registry);
// box.users.posts.aboutPet;

// type PostsType = typeof registry.posts;
// type AboutPetType = PostsType["aboutPet"];

/*Property 'aboutPet' does not exist on type 'ExtractRelations<{ _tableName: string & { __meta: { _key: "_tableName"; _fieldType: string; }; __parentTableType: { _tableName: string; id: { config: { sql: { type: "int"; pk: true; }; zodSqlSchema: ZodNumber; zodNewSchema: ZodString; initialValue: string; zodClientSchema: ZodUnion<...>; zodValidationSchema: ZodUnio...'.ts(2339)*/

const users = schema({
  _tableName: "users",
  id: s.sql({ type: "int", pk: true }).initialState(() => uuidv4(), z.string()),
  petId: s.reference(() => pets.id),
  pets: s.hasMany(),
});
const pets = schema({
  _tableName: "pets",
  id: s.sql({ type: "int", pk: true }),
  userId: s.reference(() => users.id),
  owner: s.hasOne(),
});
const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  userId: s.reference(() => users.id),

  aboutPet: s.hasOne(),
});

const schemas = { users, pets, posts };

const box2 = createSchemaBox(schemas, (s) => ({
  users: {
    pets: { fromKey: "id", toKey: s.pets.userId },
  },
  pets: { owner: { toKey: s.users.id, fromKey: "userId" } },
  posts: {
    aboutPet: {
      fromKey: "id",
      toKey: s.pets.userId,
    },
  },
}));

const usersEndSchema = box2.users;
const petsEndSchema = box2.pets;
const test = petsEndSchema.defaultValues;
const test2 = petsEndSchema.zodSchemas.clientSchema;

const testShape: typeof petsEndSchema.RelationSelection = {
  owner: { pets: true }, //is now broken
};
petsEndSchema.nav.owner.pets.owner.pets.owner;

const testPets = petsEndSchema.zodSchemas;
const clientSChemaP = testPets.clientSchema;
const subTEstUser = usersEndSchema.zodSchemas;
const clientSChema = subTEstUser.clientSchema;

type ClientUser = z.infer<typeof clientSChema>;
/*type ClientUser = {
    id: string | number;
    petId: number;
    pets: {
        id: number;
        userId: string | number;
        owner: never;
    }[];
}*/
const clientSChemView = usersEndSchema.createView({
  pets: { owner: { pets: true } },
}).clientSchema;

type ClientUserview = z.infer<typeof clientSChemView>;
/*'type ClientUserview = {
    id: string | number;
    petId: number;
    pets: {
        id: number;
        userId: string | number;
        owner?: {
            id: string | number;
            petId: number;
            pets: {
                id: number;
                userId: string | number;
                owner: never;
            }[];
        } | undefined;
    }[];
}*/
