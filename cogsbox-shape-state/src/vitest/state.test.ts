import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createShapePlugin } from "../index.js";

describe("shapePlugin", () => {
  it("builds initial state from every schema box entry", () => {
    const box = {
      shapeState: {
        schemas: {
          client: z.object({ name: z.string() }),
        },
        generateDefaults: () => ({
          name: "",
        }),
      },
      users: {
        schemas: {
          client: z.object({ id: z.string(), name: z.string() }),
        },
        generateDefaults: () => ({
          id: "temp-id",
          name: "Untitled",
        }),
      },
    };

    const plugin = createShapePlugin(box);

    expect(plugin.initialState?.()).toEqual({
      shapeState: { name: "" },
      users: { id: "temp-id", name: "Untitled" },
    });
  });

  it("creates a plugin that can be registered with cogsbox-state", () => {
    const plugin = createShapePlugin({
      shapeState: {
        schemas: {
          client: z.object({ name: z.string() }),
        },
        generateDefaults: () => ({ name: "Untitled" }),
      },
    });

    expect(plugin.name).toBe("shape");
  });
});
