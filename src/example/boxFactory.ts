import { z } from "zod";
import { createSchemaBox, s, schema } from "../schema";

const factory = schema({
  _tableName: "factories",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `temp_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  name: s.sqlite({ type: "varchar", length: 100 }),
  isActive: s
    .sqlite({ type: "boolean", default: true })
    .client(z.boolean())
    .transform({ toClient: (v) => Boolean(v), toDb: (v) => (v ? 1 : 0) }),
  createdAt: s.sqlite({ type: "timestamp", default: "CURRENT_TIMESTAMP" }),
  boxes: s.hasMany([]),
  statusLabel: s.client(""),
}).derive({
  forClient: {
    statusLabel: (row) =>
      `${row.name} - ${row.isActive ? "Active" : "Inactive"}`,
  },
});

const box = schema({
  _tableName: "boxes",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `temp_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  factoryId: s.reference(() => factory.id),
  variant: s.hasOne(true),
});

const boxVariant = schema({
  _tableName: "box_variants",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: () => `temp_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  boxId: s.reference(() => box.id),
  boxName: s
    .sqlite({ type: "varchar", length: 50 })
    .client({ value: "Standard" })

    .server(({ client }) => client.min(3, "Name too short"))
    .transform({ toClient: (v) => v, toDb: (v) => v }),
  color: s.sqlite({ type: "varchar", length: 20 }).client({ value: "brown" }),
  size: s.sqlite({ type: "varchar", length: 10 }).client({ value: "medium" }),
  weight: s.sqlite({ type: "int" }).client({ value: 0 }),
});

export const boxFactory = createSchemaBox(
  { factory, box, boxVariant },
  {
    factory: {
      boxes: { fromKey: "id", toKey: box.factoryId },
    },
    box: { variant: { fromKey: "id", toKey: boxVariant.boxId } },
  },
);

// You can now access the full lifecycle:
boxFactory.boxVariant.schemas.sql;
boxFactory.boxVariant.schemas.client; //the client initialstate
boxFactory.boxVariant.schemas.clientChecked; // The usable app state
boxFactory.boxVariant.schemas.server; // The validation state
