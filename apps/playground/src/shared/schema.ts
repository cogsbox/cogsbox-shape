import { createSchemaBox, s, schema } from "cogsbox-shape";

export const userSchema = schema({
  _tableName: "playground_users",
  id: s.sql({ type: "int", pk: true }).clientInput({
    value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
    clientPk: true,
  }),
  firstName: s.sql({ type: "varchar", length: 100 }).clientInput({
    value: "",
  }),
  lastName: s.sql({ type: "varchar", length: 100 }).clientInput({
    value: "",
  }),
  fullName: s.sql({ type: "varchar", length: 220 }).clientInput({
    value: "",
  }),
  email: s.sql({ type: "varchar", length: 255 }).server(({ sql }) =>
    sql.email(),
  ),
  isActive: s
    .sql({ type: "int" })
    .clientInput({ value: true })
    .transform({
      toClient: (value: number) => value === 1,
      toDb: (value: boolean) => (value ? 1 : 0),
    }),
}).derive({
  fullName: (row) => `${row.firstName} ${row.lastName}`.trim(),
});

export const box = createSchemaBox({ users: userSchema }, { users: {} });

export type User = {
  id: string | number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  isActive: boolean;
};

export type UserDraft = User;
