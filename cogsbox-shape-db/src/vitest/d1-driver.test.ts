import { describe, expect, it } from "vitest";
import { createD1Db, type D1Database, type D1Result } from "../cloudflare-d1/index.js";

interface UserTable {
  id: number;
  name: string;
}

interface TestDb {
  users: UserTable;
}

function createFakeD1() {
  const calls: Array<{ method: "all" | "run"; sql: string; params: unknown[] }> =
    [];

  const database: D1Database = {
    prepare(sql) {
      let params: unknown[] = [];
      return {
        bind(...values) {
          params = values;
          return this;
        },
        async all<T>(): Promise<D1Result<T>> {
          calls.push({ method: "all", sql, params });
          return {
            success: true,
            results: [{ id: 1, name: "Ada" }] as T[],
          };
        },
        async run<T>(): Promise<D1Result<T>> {
          calls.push({ method: "run", sql, params });
          return {
            success: true,
            meta: { changes: 1, last_row_id: 12 },
            results: [],
          };
        },
      };
    },
  };

  return { database, calls };
}

describe("Cloudflare D1 driver", () => {
  it("executes select queries through D1 all()", async () => {
    const d1 = createFakeD1();
    const db = createD1Db<TestDb>(d1.database);

    const rows = await db
      .selectFrom("users")
      .selectAll()
      .where("name", "=", "Ada")
      .execute();

    expect(rows).toEqual([{ id: 1, name: "Ada" }]);
    expect(d1.calls[0]).toMatchObject({
      method: "all",
      params: ["Ada"],
    });
  });

  it("maps D1 write metadata to Kysely results", async () => {
    const d1 = createFakeD1();
    const db = createD1Db<TestDb>(d1.database);

    const result = await db
      .insertInto("users")
      .values({ name: "Ada", id: 12 })
      .executeTakeFirst();

    expect(result.insertId).toBe(12n);
    expect(result.numInsertedOrUpdatedRows).toBe(1n);
    expect(d1.calls[0]).toMatchObject({
      method: "run",
      params: ["Ada", 12],
    });
  });
});
