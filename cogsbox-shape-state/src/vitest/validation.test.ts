import { describe, expect, it } from "vitest";
import { z } from "zod";

import {
  validateShapeRefines,
  wireShapeValidationOptions,
} from "../plugin.js";

describe("wireShapeValidationOptions", () => {
  it("sets client schema on state options per box key", () => {
    const client = z.object({
      name: z.string(),
      count: z.coerce.number(),
    });

    const box = {
      form: {
        stateType: {},
        schemas: { client },
        generateDefaults: () => ({ name: "", count: 0 }),
      },
    };

    let captured: unknown;
    wireShapeValidationOptions(box, {
      stateKey: "form",
      setOptions: (options) => {
        captured = options;
      },
    });

    expect(captured).toEqual({
      validation: {
        zodSchemaV4: client,
        onBlur: "error",
      },
    });
  });

  it("no-ops when state key is missing from the box", () => {
    let called = false;
    wireShapeValidationOptions(
      {
        form: {
          stateType: {},
          schemas: { client: z.object({}) },
          generateDefaults: () => ({}),
        },
      },
      {
        stateKey: "missing",
        setOptions: () => {
          called = true;
        },
      },
    );

    expect(called).toBe(false);
  });
});

describe("validateShapeRefines", () => {
  const client = z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .superRefine((row, ctx) => {
      if (row.min >= row.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max must be > min",
          path: ["max"],
        });
      }
    });

  const box = {
    form: {
      stateType: {},
      schemas: { client },
      validators: { client },
      generateDefaults: () => ({ min: 0, max: 0 }),
      refineInfo: {
        fieldToGroup: {
          min: [0],
          max: [0],
        },
        groups: [{ deps: ["min", "max"] }],
      },
    },
  };

  it("clears related paths when refine passes", () => {
    const cleared: string[][] = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["min"],
      event: { activityType: "blur" },
      getState: () => ({ min: 1, max: 10 }),
      addZodErrors: () => {
        throw new Error("should not add errors when refine passes");
      },
      clearZodErrors: (paths) => cleared.push(...paths),
    });

    expect(cleared).toEqual([
      ["min"],
      ["max"],
    ]);
  });

  it("clears stale refine errors on related fields when issue is gone", () => {
    const errors: Array<{ path: string[]; message: string }> = [];
    const cleared: string[][] = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["min"],
      event: { activityType: "blur" },
      getState: () => ({ min: 1, max: 10 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: (paths) => cleared.push(...paths),
    });

    expect(errors).toEqual([]);
    expect(cleared.length).toBeGreaterThan(0);
  });

  it("reports cross-field refine errors on blur", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["min"],
      event: { activityType: "blur" },
      getState: () => ({ min: 10, max: 1 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([
      { path: ["max"], message: "Max must be > min", code: "custom" },
    ]);
  });

  it("ignores blur when the field has no refine groups", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["other"],
      event: { activityType: "blur" },
      getState: () => ({ min: 10, max: 1 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([]);
  });

  it("ignores input events", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["min"],
      event: { activityType: "input" },
      getState: () => ({ min: 10, max: 1 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([]);
  });

  it("does not report simple field errors without refine groups", () => {
    const fieldOnlyClient = z.object({
      name: z.string().min(3, "Too short"),
    });

    const fieldOnlyBox = {
      form: {
        stateType: {},
        schemas: { client: fieldOnlyClient },
        generateDefaults: () => ({ name: "" }),
      },
    };

    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefines(fieldOnlyBox, {
      stateKey: "form",
      path: ["name"],
      event: { activityType: "blur" },
      getState: () => ({ name: "ab" }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([]);
  });
});
