import "@testing-library/jest-dom/vitest";

import { createCogsState, PluginRunner } from "cogsbox-state";
import { createSchemaBox, s, schema } from "cogsbox-shape";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createShapePlugin } from "../index.js";

describe("shape plugin form validation", () => {
  it("shows validation errors on blur when field is invalid", async () => {
    const formSchema = schema({
      _tableName: "form",
      name: s.client({
        value: "",
        schema: z.string().min(1, "Name is required"),
      }),
    });

    const box = createSchemaBox({ form: formSchema }, {});
    const shapePlugin = createShapePlugin(box);
    const { useCogsState } = createCogsState(
      {},
      {
        plugins: [shapePlugin],
        formElements: {
          validation: ({ children, hasErrors, hasWarnings, message }) => (
            <div className="grid gap-1">
              {children}
              <p
                className={`min-h-[1rem] text-xs transition-opacity ${
                  hasErrors || hasWarnings
                    ? "text-red-400 opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                {message ?? " "}
              </p>
            </div>
          ),
        },
      },
    );

    function Form() {
      const form = useCogsState("form");

      return (
        <div>
          <PluginRunner>
            {form.name.$formElement(({ $inputProps }) => (
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" {...$inputProps} />
              </div>
            ))}{" "}
          </PluginRunner>
        </div>
      );
    }

    const user = userEvent.setup();
    render(<Form />);

    const input = screen.getByLabelText("Name");
    await user.click(input);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });
});
