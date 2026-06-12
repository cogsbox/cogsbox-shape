import { describe, expect, it } from "vitest";

import { createShapePlugin } from "../index.js";

describe("shapePlugin", () => {
  it("builds initial state from every schema box entry", () => {
    const box = {
      shapeState: {
        generateDefaults: () => ({
          name: "",
        }),
      },
      users: {
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
        generateDefaults: () => ({ name: "Untitled" }),
      },
    });

    expect(plugin.name).toBe("shape");
  });
});
