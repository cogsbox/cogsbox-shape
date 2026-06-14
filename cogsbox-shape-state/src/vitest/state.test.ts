import { createSchemaBox, s, schema } from "cogsbox-shape";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createShapePlugin } from "../index.js";

describe("shapePlugin", () => {
  it("builds initial state from every schema box entry", () => {
    const userSchema = schema({
      _tableName: "users",
      id: s.client({ value: () => "temp-id", clientPk: true }),
      name: s.client({ value: "Untitled" }),
    });

    const settingsSchema = schema({
      _tableName: "settings",
      name: s.client({ value: "" }),
    });

    const box = createSchemaBox(
      { users: userSchema, settings: settingsSchema },
      {},
    );

    const plugin = createShapePlugin(box);

    expect(plugin.initialState?.()).toEqual({
      users: { id: "temp-id", name: "Untitled" },
      settings: { name: "" },
    });
  });

  it("creates a plugin that can be registered with cogsbox-state", () => {
    const demoSchema = schema({
      _tableName: "demo",
      name: s.client({ value: "Untitled" }),
    });

    const box = createSchemaBox({ demo: demoSchema }, {});

    const plugin = createShapePlugin(box);

    expect(plugin.name).toBe("shape");
  });
});