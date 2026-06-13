/**
 * Minimal end-to-end example — open and hover inside Example.
 * Run from cogsbox-shape repo after: pnpm build
 */
import { createCogsState } from "cogsbox-state";
import { createSchemaBox, s, schema } from "cogsbox-shape";
import { z } from "zod";

import { createShapePlugin } from "../plugin.js";

const taskItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
});

const taskManagerSchema = schema({
  _tableName: "client",
  tasks: s.client({
    value: [] as Array<z.infer<typeof taskItemSchema>>,
    schema: z.array(taskItemSchema),
  }),
  filter: s.client({
    value: "all",
    schema: z.string(),
  }),
});

const demoBox = createSchemaBox(
  {
    taskManager: taskManagerSchema,
  },
  {},
);

const shapePlugin = createShapePlugin(demoBox);

const { useCogsState } = createCogsState({}, { plugins: [shapePlugin] });

export function Example() {
  const taskManager = useCogsState("taskManager");

  // hover ↓
  const tasks = taskManager.tasks;
  const filter = taskManager.filter;

  void tasks;
  void filter;

  return null;
}
