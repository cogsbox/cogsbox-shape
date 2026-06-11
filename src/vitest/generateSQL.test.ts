import { mkdtemp, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { generateSQL } from "../generateSQL.js";
import { s, schema } from "../schema.js";

async function withOutputFile<T>(fn: (path: string) => Promise<T>) {
  const dir = await mkdtemp(join(tmpdir(), "cogsbox-shape-sql-"));
  try {
    return await fn(join(dir, "schema.sql"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

describe("generateSQL dialect columns", () => {
  it("generates SQLite enum columns as text with a check constraint", async () => {
    const posts = schema({
      _tableName: "posts",
      id: s.sqlite({ type: "int", pk: true }),
      status: s.sqlite({
        type: "enum",
        values: ["draft", "published", "archived"],
        default: "draft",
      }),
    });

    const sql = await withOutputFile((path) => generateSQL({ posts }, path));

    expect(sql).toContain("id INTEGER PRIMARY KEY");
    expect(sql).toContain(
      "status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'))",
    );
  });

  it("generates MySQL enum columns using native ENUM", async () => {
    const posts = schema({
      _tableName: "posts",
      id: s.mysql({ type: "int", pk: true }),
      status: s.mysql({
        type: "enum",
        values: ["draft", "published", "archived"],
      }),
    });

    const sql = await withOutputFile((path) => generateSQL({ posts }, path));

    expect(sql).toContain("id INTEGER PRIMARY KEY AUTO_INCREMENT");
    expect(sql).toContain(
      "status ENUM('draft', 'published', 'archived') NOT NULL",
    );
  });

  it("generates Postgres enum type DDL before table DDL", async () => {
    const posts = schema({
      _tableName: "posts",
      id: s.postgres({ type: "int", pk: true }),
      status: s.postgres({
        type: "enum",
        name: "post_status",
        values: ["draft", "published", "archived"],
      }),
    });

    const sql = await withOutputFile((path) => generateSQL({ posts }, path));

    expect(sql).toContain(
      "CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');",
    );
    expect(sql).toContain("status post_status NOT NULL");
    expect(sql.indexOf("CREATE TYPE post_status")).toBeLessThan(
      sql.indexOf("CREATE TABLE posts"),
    );
  });

  it("rejects mixed SQL dialects in the same table", async () => {
    const posts = schema({
      _tableName: "posts",
      id: s.sqlite({ type: "int", pk: true }),
      status: s.mysql({
        type: "enum",
        values: ["draft", "published"],
      }),
    });

    await expect(
      withOutputFile((path) => generateSQL({ posts }, path)),
    ).rejects.toThrow(/Mixed SQL dialects/);
  });
});
