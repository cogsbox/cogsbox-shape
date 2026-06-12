import { describe, expect, it } from "vitest";
import { z } from "zod";

import { validateShapeFormUpdate } from "../plugin.js";

describe("validateShapeFormUpdate", () => {
  const client = z.object({
    name: z.string().min(3, "Too short"),
    max: z.number(),
  });

  const box = {
    form: {
      stateType: {},
      schemas: { client },
      generateDefaults: () => ({ name: "", max: 0 }),
      refineInfo: {
        fieldToGroup: {
          min: [0],
          max: [0],
        },
        groups: [{ deps: ["min", "max"] }],
      },
    },
  };

  it("reports client validation errors on blur", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeFormUpdate(box, {
      stateKey: "form",
      path: ["name"],
      event: { activityType: "blur" },
      getState: () => ({ name: "ab", max: 10 }),
      addZodErrors: (next) => errors.push(...next),
    });

    expect(errors).toEqual([
      { path: ["name"], message: "Too short", code: "too_small" },
    ]);
  });

  it("validates a single field on input", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeFormUpdate(box, {
      stateKey: "form",
      path: ["name"],
      event: { activityType: "input" },
      getState: () => ({ name: "ab", max: 10 }),
      addZodErrors: (next) => errors.push(...next),
    });

    expect(errors[0]?.path).toEqual(["name"]);
    expect(errors[0]?.message).toBe("Too short");
  });
});
