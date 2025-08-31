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

schemaBox.users.RelationSelection;
type TestUserRelations = typeof schemaBox.users.RelationSelection;
type TestPetsType = TestUserRelations["messages"];
//   ^? Hover over this to see what type it actually is

// Or try this to force TypeScript to show the full type:
type ExpandType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
type FullRelations = ExpandType<typeof schemaBox.users.RelationSelection>;
/*(property) RelationSelection: {
    settings?: boolean | {
        user?: boolean | ... | undefined;
    } | undefined;
    messages?: boolean | {
        sender?: boolean | ... | undefined;
        recipient?: boolean | ... | undefined;
    } | undefined;
}*/
/*const schemaBox: CreateSchemaBoxReturn<{
    users: {
        _tableName: "app_users";
        user_id: EnrichedField<"user_id", {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodString;
            }) => TClientNext)) => {
                config: {*/
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
const messageSelection = {
  sender: true,
  recipient: true,
} as const;

// We use the utility type to generate the Zod shape and infer the result.
/*property) schemas: ExtractOriginalSchemas<{
    readonly users: {
        readonly schema: [{
            definition: ResolveSchema<{
                _tableName: "app_users";
                user_id: EnrichedField<"user_id", {*/

type TestView = ReturnType<
  typeof schemaBox.messages.createView<typeof messageSelection>
>;
type TestDefaults = TestView["defaults"];
/*ype TestResult1 = {
    sql: z.ZodObject<{
        message_id: z.ZodNumber;
        content: z.ZodString;
        timestamp: z.ZodDate;
        sender_id: z.ZodNumber;
        recipient_id: z.ZodNumber;
    }, z.core.$strip>;
    client: z.ZodObject<{
        timestamp: z.ZodString;
        message_id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        content: z.ZodString;
        sender_id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        recipient_id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        sender: z.ZodOptional<z.ZodObject<OmitRelationFields<{
            user_id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            username: z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>;
            age: z.ZodNumber;
            email: z.ZodUnion<...>;
            created_at: z.ZodDate;
        }, ResolveSchema<...>>, z.core.$strip>>;
        recipient: z.ZodOptional<...>;
    }, z.core.$strip>;
    validation: z.ZodObject<...>;}*/
