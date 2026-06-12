import { createSchemaBox, s, schema } from "cogsbox-shape";
import { z } from "zod";
import { createShapePlugin, type InferShapeBoxState } from "../plugin.js";

const demoSchema = schema({
  _tableName: "client",
  activeFilters: s.clientInput({
    value: [] as string[],
    schema: z.array(z.string()),
  }),
  retracementPct: s.clientInput({
    value: 50,
    schema: z.number(),
  }),
});

const demoBox = createSchemaBox({ demo: demoSchema }, {});

const plugin = createShapePlugin(demoBox);

type DemoState = InferShapeBoxState<typeof demoBox>;
type _activeFilters = DemoState["demo"]["activeFilters"];
type _retracementIsNumber = DemoState["demo"]["retracementPct"] extends number
  ? true
  : false;
type _notAny = 0 extends 1 & DemoState["demo"]["activeFilters"] ? false : true;

declare const _assertRetracement: _retracementIsNumber;
declare const _assertNotAny: _notAny;

type PluginInitialState = ReturnType<
  NonNullable<(typeof plugin)["initialState"]>
>;
type _pluginHasFilters =
  PluginInitialState["demo"]["activeFilters"] extends string[] ? true : false;
declare const _assertPlugin: _pluginHasFilters;
