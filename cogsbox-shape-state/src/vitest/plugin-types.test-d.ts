import { createSchemaBox, s, schema } from "cogsbox-shape";
import { z } from "zod";
import { createShapePlugin, type InferShapeBoxState } from "../plugin.js";

type Assert<T extends true> = T;

const demoSchema = schema({
  _tableName: "client",
  activeFilters: s.client({
    value: [] as string[],
    schema: z.array(z.string()),
  }),
  retracementPct: s.client({
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

type _assertRetracement = Assert<_retracementIsNumber>;
type _assertNotAny = Assert<_notAny>;

type PluginInitialState = ReturnType<
  NonNullable<(typeof plugin)["initialState"]>
>;
type _pluginHasFilters =
  PluginInitialState["demo"]["activeFilters"] extends string[] ? true : false;
type _assertPlugin = Assert<_pluginHasFilters>;

const parentSchema = schema({
  _tableName: "parents",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: 0,
    schema: z.number(),
    clientPk: true,
  }),
  name: s.sqlite({ type: "text" }).client({ value: "" }),
});

const relationBox = createSchemaBox({ parents: parentSchema }, {});

const viewPlugin = createShapePlugin(relationBox, {
  state: {
    parentView: {
      from: "parents",
      with: {},
      key: ({ shape }) => shape.id,
    },
  },
});

type ViewPluginInitialState = ReturnType<
  NonNullable<(typeof viewPlugin)["initialState"]>
>;
type _viewHasName = ViewPluginInitialState["parentView"]["name"] extends string
  ? true
  : false;
type _assertViewHasName = Assert<_viewHasName>;
