import { createSchemaBox, s, schema } from "cogsbox-shape";

import { z } from "zod";

const factory = schema({
  _tableName: "factories",
  id: s.sql({ type: "int", pk: true }).client({
    value: () => `temp_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  name: s.sql({ type: "varchar", length: 100 }),
  isActive: s.sql({ type: "boolean", default: true }),
  createdAt: s.sql({ type: "timestamp", default: "CURRENT_TIMESTAMP" }),
  boxes: s.hasMany([]),
});

const box = schema({
  _tableName: "boxes",
  id: s.sql({ type: "int", pk: true }).client({
    value: () => `temp_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  factoryId: s.reference(() => factory.id),
  variant: s.hasOne(true),
});

const boxVariant = schema({
  _tableName: "box_variants",
  id: s.sql({ type: "int", pk: true }).client({
    value: () => `temp_${crypto.randomUUID().slice(0, 8)}`,
    schema: z.string(),
    clientPk: true,
  }),
  boxId: s.reference(() => box.id),
  boxName: s
    .sql({ type: "varchar", length: 50 })
    .client({ value: "Standard", schema: z.literal("Standard") })
    // CHANGED: You can now access clientInput and client here, and properly chain Zod methods
    .server(({ sql }) => z.string().min(3, "Name too short"))
    .transform({ toClient: (v) => v, toDb: (v) => v }),
  color: s.sql({ type: "varchar", length: 20 }).client({ value: "brown" }),
  size: s.sql({ type: "varchar", length: 10 }).client({ value: "medium" }),
  weight: s.sql({ type: "int" }).client({ value: 0 }),
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
boxFactory.boxVariant.schemas.clientInput; // The before state
boxFactory.boxVariant.schemas.client; // The usable app state
boxFactory.boxVariant.schemas.server; // The validation state
