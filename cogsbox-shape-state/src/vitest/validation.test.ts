import { createSchemaBox, s, schema } from "cogsbox-shape";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import {
  validateShapeRefines,
  wireShapeValidationOptions,
} from "../plugin.js";

describe("wireShapeValidationOptions", () => {
  it("sets client schema on state options per box key", () => {
    const formSchema = schema({
      _tableName: "form",
      name: s.client({ value: "" }),
      count: s.client({ value: 0 }),
    });

    const box = createSchemaBox({ form: formSchema }, {});

    let captured: unknown;
    wireShapeValidationOptions(box, {
      stateKey: "form",
      setOptions: (options) => {
        captured = options;
      },
    });

    expect(captured).toEqual({
      validation: {
        zodSchemaV4: box.form.validators.client,
        onBlur: "error",
      },
    });
  });

  it("no-ops when state key is missing from the box", () => {
    const formSchema = schema({
      _tableName: "form",
      name: s.client({ value: "" }),
    });

    const box = createSchemaBox({ form: formSchema }, {});

    let called = false;
    wireShapeValidationOptions(box, {
      stateKey: "missing",
      setOptions: () => {
        called = true;
      },
    });

    expect(called).toBe(false);
  });
});

describe("validateShapeRefines", () => {
  const formSchema = schema({
    _tableName: "form",
    min: s.client({ value: 0 }),
    max: s.client({ value: 0 }),
  }).refine((r) => [
    r("client", (row) => {
      if (row.min >= row.max) {
        return {
          path: ["max"],
          message: "Max must be > min",
        };
      }
    }, ["min", "max"]),
  ]);

  const box = createSchemaBox({ form: formSchema }, {});

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

    expect(cleared).toEqual([["min"], ["max"]]);
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

  it("reports cross-field refine errors on input", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["min"],
      event: { activityType: "input", details: { value: 10 } },
      getState: () => ({ min: 1, max: 1 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([
      { path: ["max"], message: "Max must be > min", code: "custom" },
    ]);
  });

  it("clears refine errors on input when the typed value fixes the group", () => {
    const errors: Array<{ path: string[]; message: string }> = [];
    const cleared: string[][] = [];

    validateShapeRefines(box, {
      stateKey: "form",
      path: ["min"],
      event: { activityType: "input", details: { value: 1 } },
      getState: () => ({ min: 10, max: 5 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: (paths) => cleared.push(...paths),
    });

    expect(errors).toEqual([]);
    expect(cleared).toEqual([["min"], ["max"]]);
  });

  it("does not report simple field errors without refine groups", () => {
    const fieldOnlySchema = schema({
      _tableName: "fieldOnly",
      name: s.client({ value: "" }),
    });

    const fieldOnlyBox = createSchemaBox({ fieldOnly: fieldOnlySchema }, {});

    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefines(fieldOnlyBox, {
      stateKey: "fieldOnly",
      path: ["name"],
      event: { activityType: "blur" },
      getState: () => ({ name: "ab" }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([]);
  });
});
