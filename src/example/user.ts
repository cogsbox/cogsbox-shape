import { z } from "zod";

import { schema, s, createSchemaBox, OmitRelations } from "../schema.js";

import { v4 as uuidv4 } from "uuid";

const users = schema({
  _tableName: "users",
  id: s
    .sql({ type: "int", pk: true })
    .initialState({ value: ({ uuid }) => uuid() }),
  petId: s.reference(() => pets.id),
  pets: s.hasMany([]),
});
const pets = schema({
  _tableName: "pets",
  id: s.sql({ type: "int", pk: true }),
  userId: s.reference(() => users.id),
  owner: s.hasOne(true),
});
const posts = schema({
  _tableName: "posts",
  id: s.sql({ type: "int", pk: true }),
  userId: s.reference(() => users.id),

  aboutPet: s.hasOne(true),
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
const test = petsEndSchema.defaults;
const test2 = petsEndSchema.schemas.client;

const testShape: typeof petsEndSchema.RelationSelection = {
  owner: { pets: true }, //is now broken
};

petsEndSchema.nav.owner.pets.owner.pets.owner;

const testPets = petsEndSchema.schemas;

const clientSChema = usersEndSchema.createView({ pets: true });

const defaults = clientSChema.defaults;
type ClientUser = z.infer<typeof clientSChema.schemas.client>;
/*type ClientUser = {
    id: string | number;
    petId: number;
    pets: {
        id: number;
        userId: string | number;
    }[];
}*/

const clientSChema2 = usersEndSchema.schemas.client;
type ClientUser3 = z.infer<typeof clientSChema2>;

const clientSChemView = usersEndSchema.createView({
  pets: { owner: { pets: true } },
}).schemas.client;

type ClientUserview = z.infer<typeof clientSChemView>;
// Test the pets relation in working example
