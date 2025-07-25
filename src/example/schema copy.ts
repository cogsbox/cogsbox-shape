import { createSchema, createSchemaBox, s, schema } from "cogsbox-shape";
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
  email: s.sql({ type: "varchar", length: 255 }),
  created_at: s
    .sql({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
    .client(z.string()) // Client receives ISO string
    .transform({
      toClient: (dbValue: Date) => dbValue.toISOString(),
      toDb: (clientValue: string) => new Date(clientValue),
    }),
  settings: s.hasOne(),
  messages: s.hasMany(),
});

export const settingsSchema = schema({
  _tableName: "app_user_settings",
  settings_id: s
    .sql({ type: "int", pk: true })
    .initialState(() => uuidv4(), z.string()),
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
  sender_id: s.sql({ type: "int" }).reference(() => userSchema.user_id),
  recipient_id: s.sql({ type: "int" }).reference(() => userSchema.user_id),
  sender: s.hasOne(),
  recipient: s.hasOne(),
});

const schemaBox = createSchemaBox(
  {
    users: userSchema,
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
export const userSchemaFinal = schemaBox.users;
const UserZod = schemaBox.users.schemas;
type test = z.infer<typeof UserZod.client>;
export const chatMessageFinal = schemaBox.messages.definition;
export const chatMessageZod = schemaBox.messages.schemas;
type test2 = z.infer<typeof chatMessageZod.client>;
/*type test2 = {
    message_id: string | number;
    content: string;
    timestamp: string;
    sender_id: number;
    recipient_id: number;
    sender: {
        user_id: string | number;
        username: string;
        age: number;
        email: string;
        created_at: string;
        settings?: undefined;
        messages?: undefined;
    };
    recipient: {
        user_id: string | number;
        username: string;
        age: number;
        email: string;
        created_at: string;
        settings?: undefined;
        messages?: undefined;
    };
}*/
