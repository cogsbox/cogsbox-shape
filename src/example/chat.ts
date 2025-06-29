import { createSchema, s, schema, schemaRelations } from "../schema";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const topicSchema = schema({
  _tableName: "goot_chat_topics",
  topic_id: s
    .sql({ type: "int", pk: true })
    .initialState(z.string(), () => uuidv4()),
  topic_name: s
    .sql({ type: "varchar", length: 255 })
    .initialState(z.string(), () => ""),
  type: s
    .sql({ type: "varchar", length: 10 })
    .initialState(z.enum(["private", "group"]), () => "private")

    .validation(({ initialState }) => initialState),
  created_at: s
    .sql({ type: "datetime", default: "CURRENT_TIMESTAMP" })
    .client(({ sql }) => sql.optional()),
});

/*type TopicSchemaClientType = {
    type: string;
    topic_id: number;
    topic_name: string;
    created_at: Date;
}*/

export const recipitentsSchema = schema({
  _tableName: "chat_message_recipients",

  recipient_id: s.sql({ type: "int", pk: true }).initialState(
    () => z.string(),
    () => uuidv4()
  ),
  recipient_type: s
    .sql({ type: "varchar", length: 10 })
    .client(({ sql }) => z.enum(["user", "group"])),
  read_status: s.sql({ type: "boolean", default: false }),
});
const recipitentsRelations = schemaRelations(recipitentsSchema, (s) => ({
  message_id: s.reference(() => messagesSchema.message_id),
}));

export const messagesSchema = schema({
  _tableName: "goot_chat_messages",
  message_id: s.sql({ type: "int", pk: true }).initialState(
    () => z.string(),
    () => uuidv4()
  ),
  topic_id: s.sql({ type: "int", nullable: true }),
  sender_id: s.sql({ type: "int" }),
  content: s.sql({ type: "text" }),
  timestamp: s
    .sql({ type: "datetime", nullable: true })
    .client(({ sql }) => z.coerce.date()),
  conversation_key: s
    .sql({ type: "varchar", length: 255, nullable: true })
    .client(({ sql }) => sql.optional()),
});

const messagesRelations = schemaRelations(messagesSchema, (s) => ({
  recipients: s
    .hasMany({
      fromKey: "message_id",
      toKey: () => recipitentsRelations.message_id,
    })
    .validation(({ sql }) =>
      sql.min(1, { message: "You must have at least one recipient" })
    ),
}));

export const {
  sqlSchema,
  validationSchema,
  defaultValues: topicDefaultValues,
} = createSchema(topicSchema);

export type TopicSchemaClientType = z.infer<typeof validationSchema>;
export type TopicSchemaServerType = z.infer<typeof sqlSchema>;

export const { validationSchema: recipentValidationSchema } = createSchema(
  recipitentsSchema,
  recipitentsRelations
);

export const {
  sqlSchema: messageSqlSchema,
  clientSchema,
  validationSchema: messageValidationSchema,
  defaultValues,
} = createSchema(messagesSchema, messagesRelations);

export type MessagesSchemaclientType = z.infer<typeof clientSchema>;
/*type MessagesSchemaclientType = {
    message_id: string | number;
    topic_id: number | null;
    sender_id: number;
    content: string;
    timestamp: Date;
    recipients: {
        message_id: number;
        recipient_id: number;
        recipient_type: string;
        read_status: boolean;
    }[];*/
export type MessagesSchemaServerType = z.infer<typeof messageSqlSchema>;

export type ChatWindowType = {
  chatMessages: MessagesSchemaclientType[];
  topic: TopicSchemaClientType;
};
