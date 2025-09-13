import { schema, s, createSchemaBox } from "../schema.js";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

//======== 1. User Schema ========
// A simple schema for a user in the system.
export const userSchema2 = schema({
  _tableName: "app_users",
  user_id: s
    .sql({ type: "int", pk: true })
    .initialState({ value: "sdsd", schema: z.string() }),
  username: s.sql({ type: "varchar", length: 100 }).initialState({ value: "" }),
  age: s
    .sql({ type: "int" })
    .initialState({ value: 18, schema: z.number().min(18) }),
  email: s
    .sql({ type: "varchar", length: 255 })
    .initialState({ schema: z.email() }),

  settings: s.hasOne(true),
  messages: s.hasMany([]),
});

export const settingsSchema = schema({
  _tableName: "app_user_settings",
  settings_id: s
    .sql({ type: "int", pk: true })
    .initialState({ value: "sds", schema: z.string() }),
  user_id: s.reference(() => userSchema2.user_id),
  theme: s
    .sql({ type: "varchar", length: 10 })
    .initialState({ value: "light", schema: z.enum(["light", "dark"]) }),
  notifications_enabled: s.sql({ type: "boolean", default: true }),
  user: s.hasOne(),
})
  .primaryKeySQL((s) => {
    return `settings_id`;
  })
  .isClient((s) => {
    return typeof s.settings_id === "string";
  });

export const chatMessageSchema = schema({
  _tableName: "app_chat_messages",
  message_id: s
    .sql({ type: "int", pk: true })
    .initialState({ value: "sdsd", schema: z.string() }),

  content: s.sql({ type: "text" }).initialState({ value: z.string().min(1) }),
  timestamp: s
    .sql({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
    .client(z.string())
    .transform({
      toClient: (dbValue) => dbValue.toISOString(),
      toDb: (clientValue) => new Date(clientValue),
    }),
  sender_id: s.reference(() => userSchema2.user_id),
  recipient_id: s.reference(() => userSchema2.user_id),
  sender: s.hasOne(true),
  recipient: s.hasOne(true),
});

export const schemaBox2 = createSchemaBox(
  {
    users: userSchema2,
    settings: settingsSchema,
    messages: chatMessageSchema,
  },
  (s) => ({
    users: {
      settings: { toKey: s.settings.settings_id, fromKey: "user_id" },
      messages: { toKey: s.messages.message_id, fromKey: "user_id" },
    },
    messages: {
      sender: { toKey: s.users.user_id, fromKey: "sender_id" },
      recipient: { toKey: s.users.user_id, fromKey: "recipient_id" },
    },
    settings: {
      user: { toKey: s.users.user_id, fromKey: "settings_id" },
    },
  })
);

console.log("schemaBox", schemaBox2); //no createview
export const testChatMEssages = schemaBox2.messages.createView({
  sender: true,
  recipient: true,
});
