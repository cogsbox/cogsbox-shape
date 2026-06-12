import { describe, expect, it } from "vitest";

import {
  createShapeInitialState,
  createShapePlugin,
  useCogsState,
} from "../index.js";

describe("shapePlugin", () => {
  it("uses shape defaults as plugin initial state", () => {
    const shape = {
      generateDefaults: () => ({
        id: "temp-id",
        name: "Untitled",
        enabled: true,
      }),
    };

    expect(createShapeInitialState(shape)).toEqual({
      id: "temp-id",
      name: "Untitled",
      enabled: true,
    });
  });

  it("creates a plugin that can be registered with cogsbox-state", () => {
    const plugin = createShapePlugin({
      generateDefaults: () => ({ name: "Untitled" }),
    });

    expect(plugin.name).toBe("shape");
  });

  it("exports cogs state from the shape plugin", () => {
    expect(useCogsState).toBeDefined();
  });
});
