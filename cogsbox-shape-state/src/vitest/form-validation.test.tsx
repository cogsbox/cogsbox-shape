// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { createCogsState, PluginRunner, getGlobalStore } from "cogsbox-state";
import { createSchemaBox, s, schema } from "cogsbox-shape";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { z } from "zod";

import { createShapePlugin } from "../index.js";

afterEach(() => {
  cleanup();
});

describe("shape plugin $validateGroup", () => {
  it("returns per-key success when all fields pass", async () => {
    const formSchema = schema({
      _tableName: "form",
      min: s.client({ value: 0, schema: z.number() }),
      max: s.client({ value: 0, schema: z.number() }),
    }).refine((r) => [
      r(
        "client",
        (row) => {
          if (row.min >= row.max) {
            return { path: ["max"], message: "Max must be > min" };
          }
        },
        ["min", "max"],
      ),
    ]);

    const box = createSchemaBox({ form: formSchema }, {});
    const plugin = createShapePlugin(box);
    const { useCogsState } = createCogsState({}, { plugins: [plugin] });

    let lastResult: unknown = null;

    function TestComp() {
      const form = useCogsState("form");
      return (
        <div>
          <button
            onClick={() => {
              form.min(1);
              form.max(5);
              lastResult = form.$validateGroup(["min", "max"]);
            }}
            data-testid="btn"
          >
            Validate
          </button>
        </div>
      );
    }

    const user = userEvent.setup();
    render(<TestComp />);
    await user.click(screen.getByTestId("btn"));

    expect(lastResult).toBeDefined();
    const result = lastResult as {
      success: boolean;
      results: Array<{ key: string; success: boolean }>;
    };
    expect(result.success).toBe(true);
    expect(result.results).toHaveLength(2);
    expect(result.results.every((r) => r.success)).toBe(true);
  });

  it("reports refine errors on failing keys", async () => {
    const formSchema = schema({
      _tableName: "form",
      min: s.client({ value: 0, schema: z.number() }),
      max: s.client({ value: 0, schema: z.number() }),
    }).refine((r) => [
      r(
        "client",
        (row) => {
          if (row.min >= row.max) {
            return { path: ["max"], message: "Max must be > min" };
          }
        },
        ["min", "max"],
      ),
    ]);

    const box = createSchemaBox({ form: formSchema }, {});
    const plugin = createShapePlugin(box);
    const { useCogsState } = createCogsState({}, { plugins: [plugin] });

    let lastResult: unknown = null;

    function TestComp() {
      const form = useCogsState("form");
      return (
        <div>
          <button
            onClick={() => {
              lastResult = form.$validateGroup(["min", "max"]);
            }}
            data-testid="btn"
          >
            Validate
          </button>
        </div>
      );
    }

    const user = userEvent.setup();
    render(<TestComp />);
    await user.click(screen.getByTestId("btn"));

    const result = lastResult as {
      success: boolean;
      results: Array<{
        key: string;
        success: boolean;
        error?: { issues: Array<{ message: string }> };
      }>;
    };
    expect(result.success).toBe(false);
    const maxResult = result.results.find((r) => r.key === "max")!;
    expect(maxResult.success).toBe(false);
    expect(maxResult.error!.issues[0]!.message).toBe("Max must be > min");
  });

  it("persists refine errors to shadow store for form elements", async () => {
    const formSchema = schema({
      _tableName: "form",
      min: s.client({ value: 0, schema: z.number() }),
      max: s.client({ value: 0, schema: z.number() }),
    }).refine((r) => [
      r(
        "client",
        (row) => {
          if (row.min >= row.max) {
            return { path: ["max"], message: "Max must be > min" };
          }
        },
        ["min", "max"],
      ),
    ]);

    const box = createSchemaBox({ form: formSchema }, {});
    const plugin = createShapePlugin(box);
    const { useCogsState } = createCogsState({}, { plugins: [plugin] });

    function TestComp() {
      const form = useCogsState("form");
      return (
        <div>
          <button
            onClick={() => {
              form.$validateGroup(["min", "max"]);
            }}
            data-testid="btn"
          >
            Validate
          </button>
          {form.max.$formElement(
            ({
              message,
              hasErrors,
            }: {
              message?: string;
              hasErrors: boolean;
            }) => <p data-testid="max-error">{hasErrors ? message : ""}</p>,
          )}
        </div>
      );
    }

    const user = userEvent.setup();
    render(
      <>
        {" "}
        <PluginRunner>
          <TestComp />
        </PluginRunner>
      </>,
    );
    await user.click(screen.getByTestId("btn"));

    await waitFor(() => {
      expect(screen.getByTestId("max-error")).toHaveTextContent(
        "Max must be > min",
      );
    });

    expect(
      getGlobalStore.getState().getShadowMetadata("form", ["max"])?.validation
        ?.errors?.[0]?.message,
    ).toBe("Max must be > min");
  });
});
