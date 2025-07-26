import { schema, s, createSchemaBox } from "../schema.js";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const userSchema = schema({
  _tableName: "app_users",
  user_id: s.sql({ type: "int", pk: true }),
  username: s.sql({ type: "varchar" }),
  settings: s.hasOne(true),
});

export const settingsSchema = schema({
  _tableName: "app_user_settings",
  settings_id: s.sql({ type: "int", pk: true }),
  user_id: s.reference(() => userSchema.user_id),
  theme: s.sql({ type: "varchar" }),
  user: s.hasOne(),
});

export const schemaBox = createSchemaBox(
  {
    users: userSchema,
    settings: settingsSchema,
  },
  (s) => ({
    users: {
      settings: { toKey: s.settings.user_id, fromKey: "user_id" },
    },
    settings: {
      user: { toKey: s.users.user_id, fromKey: "user_id" },
    },
  })
);

const setttings = schemaBox.settings.createView({
  user: true,
});
const clientSettings = setttings.client;
type clientInfer2 = z.infer<typeof clientSettings>;

const users = schemaBox.users.createView({
  settings: true,
});
const settings = schemaBox.settings.definition;

const users2 = schemaBox.users.definition;

const clientUsers = users.client;
type clientInfer = z.infer<typeof clientUsers>;
/*type clientInfer = {
    user_id: number;
    username: string;
    settings?: undefined;
}*/
