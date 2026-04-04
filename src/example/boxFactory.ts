import { schema, s, createSchemaBox } from "../schema.js";

const factory = schema({
  _tableName: "factories",
  id: s.sql({ type: "int", pk: true }),
  name: s.sql({ type: "varchar", length: 100 }),
  isActive: s.sql({ type: "boolean", default: true }),
  createdAt: s.sql({ type: "timestamp", default: "CURRENT_TIMESTAMP" }),
  boxes: s.hasMany([]),
});

const box = schema({
  _tableName: "boxes",
  id: s.sql({ type: "int", pk: true }),
  factoryId: s.reference(() => factory.id),
  variant: s.hasOne(true),
});

const boxVariant = schema({
  _tableName: "box_variants",
  id: s.sql({ type: "int", pk: true }),
  boxId: s.reference(() => box.id),
  name: s
    .sql({ type: "varchar", length: 50 })
    .initialState({ value: "Standard" }),
  color: s
    .sql({ type: "varchar", length: 20 })
    .initialState({ value: "brown" }),
  size: s
    .sql({ type: "varchar", length: 10 })
    .initialState({ value: "medium" }),
  weight: s.sql({ type: "int" }).initialState({ value: 0 }),
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
