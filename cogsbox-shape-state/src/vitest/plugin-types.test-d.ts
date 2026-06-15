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

const tradingRulesFormSchema = schema({
  _tableName: "trading_rules",
  id: s.sqlite({ type: "int", pk: true }).client({
    value: 0,
    schema: z.number(),
    clientPk: true,
  }),
  journalId: s.sqlite({ type: "int", field: "journal_id" }).client({
    value: 0,
    schema: z.number(),
  }),
  name: s.sqlite({ type: "text" }).client({ value: "" }),
});

const journalSchemaBox = createSchemaBox(
  { tradingRulesForm: tradingRulesFormSchema },
  {},
);

const tradingRulesPlugin = createShapePlugin(journalSchemaBox, {
  state: {
    tradingRulesForm: {
      key: ({ shape }) => shape.journalId,
      save: ({ value }) => {
        const journalId: number = value.journalId;
        return { ...value, journalId };
      },
    },
  },
});

type TradingRulesPluginInitialState = ReturnType<
  NonNullable<(typeof tradingRulesPlugin)["initialState"]>
>;
type _tradingRulesHasJournalId =
  TradingRulesPluginInitialState["tradingRulesForm"]["journalId"] extends number
    ? true
    : false;
type _tradingRulesNotAny = 0 extends 1 &
  TradingRulesPluginInitialState["tradingRulesForm"]
  ? false
  : true;
type _assertTradingRulesHasJournalId = Assert<_tradingRulesHasJournalId>;
type _assertTradingRulesNotAny = Assert<_tradingRulesNotAny>;

const tradingRulesViewPlugin = createShapePlugin(journalSchemaBox, {
  state: {
    tradingRulesView: {
      from: "tradingRulesForm",
      with: {},
      key: ({ shape }) => shape.journalId,
      save: ({ value }) => {
        const journalId: number = value.journalId;
        return { ...value, journalId };
      },
    },
  },
});

type TradingRulesViewPluginInitialState = ReturnType<
  NonNullable<(typeof tradingRulesViewPlugin)["initialState"]>
>;
type _tradingRulesViewHasJournalId =
  TradingRulesViewPluginInitialState["tradingRulesView"]["journalId"] extends number
    ? true
    : false;
type _assertTradingRulesViewHasJournalId =
  Assert<_tradingRulesViewHasJournalId>;

createShapePlugin(journalSchemaBox, {
  state: {
    // @ts-expect-error from must be a key of journalSchemaBox
    badView: {
      from: "missingForm",
      with: {},
    },
  },
});
