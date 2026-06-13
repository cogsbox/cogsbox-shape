import { describe, it, expect } from "vitest";
import z from "zod";
import { s, schema, createSchemaBox } from "../schema.js";

describe("refine runtime behavior", () => {
  function makeRefinedBox() {
    const rules = schema({
      _tableName: "rules",
      id: s.sqlite({ type: "int", pk: true }),
      min: s
        .sqlite({ type: "int", nullable: true })
        .client({ value: null, schema: z.number().nullable() }),
      max: s
        .sqlite({ type: "int", nullable: true })
        .client({ value: null, schema: z.number().nullable() }),
      label: s.sqlite({ type: "varchar" }).client({ value: "" }),
    }).refine((r) => [
      r(["client", "clientCheck"], (row) => {
        if (row.min !== null && row.max !== null && row.min >= row.max) {
          return { path: ["max"], message: "Max must be > min" };
        }
        return undefined;
      }),
      r(["server", "sql"], (row) => {
        if (row.min !== null && row.max !== null && row.min >= row.max) {
          return { path: ["max"], message: "Max must be > min" };
        }
        if (!row.label) {
          return { path: ["label"], message: "Label required" };
        }
        return undefined;
      }),
    ]);
    return createSchemaBox({ rules }, { rules: {} });
  }

  it("schemas.client catches client refine", () => {
    const box = makeRefinedBox();
    const good = box.rules.schemas.client.safeParse({
      id: 1,
      min: 1,
      max: 10,
      label: "x",
    });
    expect(good.success).toBe(true);

    const bad = box.rules.schemas.client.safeParse({
      id: 1,
      min: 10,
      max: 1,
      label: "x",
    });
    expect(bad.success).toBe(false);
    if (!bad.success) {
      expect(bad.error.issues[0]!.message).toBe("Max must be > min");
    }
  });

  it("schemas.clientChecked catches client refine", () => {
    const box = makeRefinedBox();
    const bad = box.rules.schemas.clientChecked.safeParse({
      id: 1,
      min: 10,
      max: 1,
      label: "x",
    });
    expect(bad.success).toBe(false);
    if (!bad.success) {
      expect(bad.error.issues[0]!.message).toBe("Max must be > min");
    }
  });

  it("schemas.server catches server refine", () => {
    const box = makeRefinedBox();
    const bad = box.rules.schemas.server.safeParse({
      id: 1,
      min: 1,
      max: 10,
      label: "",
    });
    expect(bad.success).toBe(false);
    if (!bad.success) {
      expect(bad.error.issues[0]!.message).toBe("Label required");
    }
  });

  it("schemas.sql catches server refine", () => {
    const box = makeRefinedBox();
    const bad = box.rules.schemas.sql.safeParse({
      id: 1,
      min: 1,
      max: 10,
      label: "",
    });
    expect(bad.success).toBe(false);
    if (!bad.success) {
      expect(bad.error.issues[0]!.message).toBe("Label required");
    }
  });

  it("parseForDb rejects invalid data via server refine", () => {
    const box = makeRefinedBox();
    expect(() =>
      box.rules.transforms.parseForDb({ id: 1, min: 10, max: 1, label: "" }),
    ).toThrow();
  });

  it("parseFromDb rejects invalid DB data via server refine", () => {
    const box = makeRefinedBox();
    expect(() =>
      box.rules.transforms.parseFromDb({ id: 1, min: 1, max: 10, label: "" }),
    ).toThrow("Label required");
  });

  it("parsePatchForDb does NOT run refine (uses partial base)", () => {
    const box = makeRefinedBox();
    expect(() =>
      box.rules.transforms.parsePatchForDb({ min: 10, max: 1 }),
    ).not.toThrow();
  });

  it("unrefined box has no refine on any schema", () => {
    const rules = schema({
      _tableName: "rules",
      id: s.sqlite({ type: "int", pk: true }),
      min: s
        .sqlite({ type: "int", nullable: true })
        .client({ value: null, schema: z.number().nullable() }),
      max: s
        .sqlite({ type: "int", nullable: true })
        .client({ value: null, schema: z.number().nullable() }),
    });
    const box = createSchemaBox({ rules }, { rules: {} });
    const good = box.rules.schemas.client.safeParse({
      id: 1,
      min: 10,
      max: 1,
    });
    expect(good.success).toBe(true);
  });

  it("view keeps leaf refines and prefixes issue paths", () => {
    const rules = schema({
      _tableName: "rules",
      id: s.sqlite({ type: "int", pk: true }),
      min: s
        .sqlite({ type: "int", field: "minField" })
        .client({ value: 0 }),
      max: s.sqlite({ type: "int" }).client({ value: 0 }),
    }).refine((r) => [
      r(
        "clientCheck",
        (row) =>
          row.min >= row.max
            ? { path: ["max"], message: "Max must be > min" }
            : undefined,
        ["min", "max"],
      ),
    ]);

    const journal = schema({
      _tableName: "journal",
      id: s.sqlite({ type: "int", pk: true }),
      rules: s.hasOne(true),
    });

    const box = createSchemaBox(
      { rules, journal },
      {
        journal: { rules: { fromKey: "id", toKey: rules.id } },
      },
    );

    const view = box.journal.createView({ rules: true });
    const bad = view.schemas.clientChecked.safeParse({
      id: 1,
      rules: { id: 1, min: 10, max: 1 },
    });

    expect(bad.success).toBe(false);
    if (!bad.success) {
      expect(bad.error.issues[0]).toMatchObject({
        path: ["rules", "max"],
        message: "Max must be > min",
      });
    }
  });
});
