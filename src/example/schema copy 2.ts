import { schema, s, createSchemaBox } from "../schema.js";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

//======== 1. User Schema ========
// A simple schema for a user in the system.
export const userSchema = schema({
  _tableName: "app_users",
  user_id: s
    .sql({ type: "int", pk: true })
    .initialState(() => uuidv4(), z.string()),
  username: s.sql({ type: "varchar", length: 100 }).initialState(""),
  age: s.sql({ type: "int" }).initialState(18, z.number().min(18)),
  email: s.sql({ type: "varchar", length: 255 }).initialState(z.email()),
  created_at: s.sql({ type: "timestamp", default: "CURRENT_TIMESTAMP" }),
  settings: s.hasOne(true),
  messages: s.hasMany([]),
});

export const settingsSchema = schema({
  _tableName: "app_user_settings",
  settings_id: s
    .sql({ type: "int", pk: true })
    .initialState(() => uuidv4(), z.string()),
  user_id: s.reference(() => userSchema.user_id), // ADD THIS - foreign key to users
  theme: s
    .sql({ type: "varchar", length: 10 })
    .initialState("light", z.enum(["light", "dark"])),
  notifications_enabled: s.sql({ type: "boolean", default: true }),
  user: s.hasOne(),
});

export const chatMessageSchema = schema({
  _tableName: "app_chat_messages",
  message_id: s
    .sql({ type: "int", pk: true })
    .initialState(() => uuidv4(), z.string()),
  content: s.sql({ type: "text" }).initialState(z.string().min(1)),
  timestamp: s
    .sql({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
    .client(z.string())
    .transform({
      toClient: (dbValue: Date) => dbValue.toISOString(),
      toDb: (clientValue: string) => new Date(clientValue),
    }),
  sender_id: s.reference(() => userSchema.user_id),
  recipient_id: s.reference(() => userSchema.user_id),
  sender: s.hasOne(true),
  recipient: s.hasOne(true),
});

export const schemaBox = createSchemaBox(
  {
    users: userSchema,
    settings: settingsSchema,
    messages: chatMessageSchema,
  },
  (s) => ({
    users: {
      settings: { toKey: s.settings.user_id, fromKey: "user_id" },
      messages: { toKey: s.messages.sender_id, fromKey: "user_id" },
    },
    messages: {
      sender: { toKey: s.users.user_id, fromKey: "sender_id" },
      recipient: { toKey: s.users.user_id, fromKey: "recipient_id" },
    },
    settings: {
      user: { toKey: s.users.user_id, fromKey: "user_id" },
    },
  })
);
const testChatMEssages = schemaBox.messages.createView({
  sender: true,
  recipient: true,
});
const clientChat = testChatMEssages.client;
type clientInfer = z.infer<typeof clientChat>;
/*type clientInfer = {
    message_id: string | number;
    content: string;
    timestamp: string;
    sender_id: number;
    recipient_id: number;
    sender?: undefined;
    recipient?: undefined;
}*/
const users = schemaBox.users.createView({
  settings: true,
  messages: true,
});
const clientUsers = users.client;
type clientInfer2 = z.infer<typeof clientUsers>;
/*type clientInfer2 = {
    user_id: string | number;
    username: string;
    age: number;
    email: string;
    created_at: string;
    settings?: undefined;
    messages?: undefined;
}*/
const defaultClinet = schemaBox.users.defaults;
