import { createSchemaBox, s, schema } from "cogsbox-shape";
import { getGlobalStore } from "cogsbox-state";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import {
  validateShapeKeys,
  validateShapeRefines,
  validateShapeRefinesOnUpdate,
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
    r(
      "client",
      (row) => {
        if (row.min >= row.max) {
          return {
            path: ["max"],
            message: "Max must be > min",
          };
        }
      },
      ["min", "max"],
    ),
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

  it("clears related refine errors after a whole-object state update", () => {
    const errors: Array<{ path: string[]; message: string }> = [];
    const cleared: string[][] = [];

    validateShapeRefinesOnUpdate(box, {
      stateKey: "form",
      update: {
        path: [],
        updateType: "update",
        oldValue: { min: 10, max: 5 },
        newValue: { min: 1, max: 5 },
      },
      getState: () => ({ min: 1, max: 5 }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: (paths) => cleared.push(...paths),
    });

    expect(errors).toEqual([]);
    expect(cleared).toEqual([["min"], ["max"]]);
  });

  it("clears range sizing refine errors when mode changes through state update", () => {
    const sizingSchema = schema({
      _tableName: "sizing",
      startingSizeMode: s.client({ value: "" }),
      startingSizeMin: s.client({
        value: null as number | null,
        schema: z.number().nullable(),
      }),
      startingSizeMax: s.client({
        value: null as number | null,
        schema: z.number().nullable(),
      }),
    }).refine((r) => [
      r(
        "client",
        (row) => {
          const errors: { path: string[]; message: string }[] = [];
          if (row.startingSizeMode === "range") {
            if (row.startingSizeMin === null) {
              errors.push({
                path: ["startingSizeMin"],
                message: "Minimum starting size is required for range sizing",
              });
            }
            if (row.startingSizeMax === null) {
              errors.push({
                path: ["startingSizeMax"],
                message: "Maximum starting size is required for range sizing",
              });
            }
          }
          if (
            row.startingSizeMode === "fixed" &&
            row.startingSizeMin === null
          ) {
            errors.push({
              path: ["startingSizeMin"],
              message: "Number of contracts is required for fixed sizing",
            });
          }
          return errors.length > 0 ? errors : undefined;
        },
        ["startingSizeMode", "startingSizeMin", "startingSizeMax"],
      ),
    ]);
    const sizingBox = createSchemaBox({ sizing: sizingSchema }, {});
    const errors: Array<{ path: string[]; message: string }> = [];
    const cleared: string[][] = [];

    validateShapeRefinesOnUpdate(sizingBox, {
      stateKey: "sizing",
      update: {
        path: [],
        updateType: "update",
        oldValue: {
          startingSizeMode: "range",
          startingSizeMin: 1,
          startingSizeMax: null,
        },
        newValue: {
          startingSizeMode: "fixed",
          startingSizeMin: 1,
          startingSizeMax: null,
        },
      },
      getState: () => ({
        startingSizeMode: "fixed",
        startingSizeMin: 1,
        startingSizeMax: null,
      }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: (paths) => cleared.push(...paths),
    });

    expect(errors).toEqual([]);
    expect(cleared).toEqual([
      ["startingSizeMode"],
      ["startingSizeMin"],
      ["startingSizeMax"],
    ]);
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

describe("validateShapeKeys", () => {
  const sizingSchema = schema({
    _tableName: "sizing",
    startingSizeMode: s.client({ value: "" }),
    startingSizeMin: s.client({
      value: null as number | null,
      schema: z.number().nullable(),
    }),
    startingSizeMax: s.client({
      value: null as number | null,
      schema: z.number().nullable(),
    }),
  }).refine((r) => [
    r(
      "client",
      (row) => {
        const errors: { path: string[]; message: string }[] = [];
        if (row.startingSizeMode === "") {
          errors.push({
            path: ["startingSizeMode"],
            message: "Choose how starting size is set",
          });
        }
        if (row.startingSizeMode === "range") {
          if (row.startingSizeMin === null) {
            errors.push({
              path: ["startingSizeMin"],
              message: "Minimum starting size is required for range sizing",
            });
          }
          if (row.startingSizeMax === null) {
            errors.push({
              path: ["startingSizeMax"],
              message: "Maximum starting size is required for range sizing",
            });
          }
        }
        if (row.startingSizeMode === "fixed" && row.startingSizeMin === null) {
          errors.push({
            path: ["startingSizeMin"],
            message: "Number of contracts is required for fixed sizing",
          });
        }
        return errors.length > 0 ? errors : undefined;
      },
      ["startingSizeMode", "startingSizeMin", "startingSizeMax"],
    ),
  ]);
  const sizingBox = createSchemaBox({ sizing: sizingSchema }, {});

  it("validates the parent shape once and filters refine issues to selected keys", () => {
    const result = validateShapeKeys(sizingBox, {
      stateKey: "sizing",
      path: [],
      keys: ["startingSizeMode", "startingSizeMin", "startingSizeMax"],
      getState: () => ({
        startingSizeMode: "",
        startingSizeMin: null,
        startingSizeMax: null,
      }),
    });

    expect(result.success).toBe(false);
    expect(result.results).toEqual([
      {
        key: "startingSizeMode",
        path: ["startingSizeMode"],
        success: false,
        data: undefined,
        error: {
          issues: [
            {
              path: ["startingSizeMode"],
              message: "Choose how starting size is set",
              code: "custom",
            },
          ],
        },
      },
      {
        key: "startingSizeMin",
        path: ["startingSizeMin"],
        success: true,
        data: null,
        error: undefined,
      },
      {
        key: "startingSizeMax",
        path: ["startingSizeMax"],
        success: true,
        data: null,
        error: undefined,
      },
    ]);
  });

  it("returns selected-key failure for cross-field requiredness", () => {
    const result = validateShapeKeys(sizingBox, {
      stateKey: "sizing",
      path: [],
      keys: ["startingSizeMode", "startingSizeMin", "startingSizeMax"],
      getState: () => ({
        startingSizeMode: "fixed",
        startingSizeMin: null,
        startingSizeMax: null,
      }),
    });

    expect(result.success).toBe(false);
    expect(
      result.results.find((entry) => entry.key === "startingSizeMin"),
    ).toEqual({
      key: "startingSizeMin",
      path: ["startingSizeMin"],
      success: false,
      data: undefined,
      error: {
        issues: [
          {
            path: ["startingSizeMin"],
            message: "Number of contracts is required for fixed sizing",
            code: "custom",
          },
        ],
      },
    });
  });

  it("persists filtered issues to shadow validation metadata", () => {
    const store = getGlobalStore.getState();

    validateShapeKeys(sizingBox, {
      stateKey: "sizing",
      path: [],
      keys: ["startingSizeMode", "startingSizeMin"],
      getState: () => ({
        startingSizeMode: "",
        startingSizeMin: null,
        startingSizeMax: null,
      }),
    });

    expect(
      store.getShadowMetadata("sizing", ["startingSizeMode"])?.validation,
    ).toEqual(
      expect.objectContaining({
        status: "INVALID",
        errors: [
          expect.objectContaining({
            message: "Choose how starting size is set",
            severity: "error",
          }),
        ],
      }),
    );
    expect(
      store.getShadowMetadata("sizing", ["startingSizeMin"])?.validation
        ?.status,
    ).toBe("NOT_VALIDATED");
  });

  it("clears stale shadow errors when the validated group passes", () => {
    const store = getGlobalStore.getState();
    store.setShadowMetadata("sizing", ["startingSizeMin"], {
      validation: {
        status: "INVALID",
        errors: [
          {
            source: "client",
            message: "Old error",
            severity: "error",
          },
        ],
        lastValidated: 0,
      },
    });

    validateShapeKeys(sizingBox, {
      stateKey: "sizing",
      path: [],
      keys: ["startingSizeMode", "startingSizeMin", "startingSizeMax"],
      getState: () => ({
        startingSizeMode: "fixed",
        startingSizeMin: 2,
        startingSizeMax: null,
      }),
    });

    expect(
      store.getShadowMetadata("sizing", ["startingSizeMin"])?.validation
        ?.status,
    ).toBe("NOT_VALIDATED");
  });

  it("clears validation errors on fields outside the validated key group", () => {
    const store = getGlobalStore.getState();
    store.setShadowMetadata("sizing", ["startingSizeMax"], {
      validation: {
        status: "INVALID",
        errors: [
          {
            source: "client",
            message: "Unrelated step error",
            severity: "error",
          },
        ],
        lastValidated: 0,
      },
    });

    validateShapeKeys(sizingBox, {
      stateKey: "sizing",
      path: [],
      keys: ["startingSizeMode", "startingSizeMin"],
      clearOutsideKeys: true,
      getState: () => ({
        startingSizeMode: "",
        startingSizeMin: null,
        startingSizeMax: null,
      }),
    });

    expect(
      store.getShadowMetadata("sizing", ["startingSizeMax"])?.validation?.status,
    ).toBe("NOT_VALIDATED");
    expect(
      store.getShadowMetadata("sizing", ["startingSizeMode"])?.validation
        ?.status,
    ).toBe("INVALID");
  });
});

describe("validateShapeRefinesOnUpdate", () => {
  const wizardSchema = schema({
    _tableName: "wizard",
    startingSizeMode: s.client({ value: "" }),
    entryBuildMode: s.client({ value: "" }),
  }).refine((r) => [
    r(
      "client",
      (row) => {
        if (row.startingSizeMode === "") {
          return {
            path: ["startingSizeMode"],
            message: "Choose how starting size is set",
          };
        }
      },
      ["startingSizeMode"],
    ),
    r(
      "client",
      (row) => {
        if (row.entryBuildMode === "") {
          return {
            path: ["entryBuildMode"],
            message: "Choose how entries are built",
          };
        }
      },
      ["entryBuildMode"],
    ),
  ]);
  const wizardBox = createSchemaBox({ wizard: wizardSchema }, {});

  it("never adds refine errors on state update — only clears stale ones", () => {
    const errors: Array<{ path: string[]; message: string }> = [];

    validateShapeRefinesOnUpdate(wizardBox, {
      stateKey: "wizard",
      update: {
        path: [],
        updateType: "update",
        oldValue: {},
        newValue: {
          startingSizeMode: "",
          entryBuildMode: "",
        },
      },
      getState: () => ({
        startingSizeMode: "",
        entryBuildMode: "",
      }),
      addZodErrors: (next) => errors.push(...next),
      clearZodErrors: () => {},
    });

    expect(errors).toEqual([]);
  });
});
