import { describe, expect, it } from "vitest";

describe("package exports", () => {
  it("exposes the root cogsbox-shape entry at runtime", async () => {
    const pkg = await import("cogsbox-shape");

    expect(pkg.s).toBeDefined();
    expect(pkg.schema).toBeDefined();
    expect(pkg.createSchemaBox).toBeDefined();
  });

  it("exposes db subpath entries at runtime", async () => {
    const dbPkg = await import("cogsbox-shape/db");
    const sqlitePkg = await import("cogsbox-shape/db/sqlite");

    expect(dbPkg.connect).toBeDefined();
    expect(sqlitePkg.createSqliteDb).toBeDefined();
  });
});
