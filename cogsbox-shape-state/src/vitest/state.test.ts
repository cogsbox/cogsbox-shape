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

  it("saves through a configured adapter and exposes status", async () => {
    const userSchema = schema({
      _tableName: "users",
      id: s.client({ value: () => "temp-id", clientPk: true }),
      name: s.client({ value: "Draft" }),
    });

    const box = createSchemaBox({ users: userSchema }, {});
    const plugin = createShapePlugin(box, {
      server: {
        users: {
          save: async ({ value }) => ({ ...(value as any), name: "Saved" }),
        },
      },
    });

    let value = { id: "temp-id", name: "Draft" };
    let meta: Record<string, any> = {};
    const ctx = {
      stateKey: "users",
      path: [],
      pluginName: "shape",
      options: {},
      $get: () => value,
      $update: (next: typeof value) => {
        value = next;
        return { synced: () => undefined };
      },
      $applyOperation: () => undefined,
      getFieldMetaData: () => meta,
      setFieldMetaData: (next: Record<string, any>) => {
        meta = { ...meta, ...next };
      },
      removeFieldMetaData: () => {
        meta = {};
      },
      watchPluginMeta: () => undefined,
      notifyPluginMeta: () => undefined,
      getFieldRefs: () => [],
      getFieldElements: () => [],
      setFieldDisabled: () => undefined,
    };

    const result = await plugin.chainMethods!.save.handler(ctx as any);
    const status = plugin.chainMethods!.status.handler(ctx as any);

    expect(result).toMatchObject({
      success: true,
      data: { id: "temp-id", name: "Saved" },
      cacheKey: "users",
    });
    expect(value).toEqual({ id: "temp-id", name: "Saved" });
    expect(status).toMatchObject({
      cacheKey: "users",
      isDirty: false,
      isSaving: false,
      saveStatus: "success",
    });
  });
});
