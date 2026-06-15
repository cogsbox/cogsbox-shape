# cogsbox-shape/state

`cogsbox-shape/state` is the `cogsbox-state` plugin for Shape schema boxes.

It wires Shape defaults and client validation into state, and adds a small persistence surface for state that needs to load or save data:

```ts
rules.$save();
rules.$load();
rules.$revert();
rules.$status();
```

The plugin does not know your routes, users, database keys, or server functions. The app supplies those through state adapters.

## Setup

```ts
import { createCogsState } from "cogsbox-state";
import { createShapePlugin } from "cogsbox-shape/state";
import { schemaBox } from "./schema";

const shapePlugin = createShapePlugin(schemaBox);

export const { useCogsState } = createCogsState({}, { plugins: [shapePlugin] });
```

Every key in the schema box becomes a typed state key with defaults from the Shape entry.

```ts
const rules = useCogsState("tradingRulesForm");

rules.startingSizeMode.$get();
rules.$validateGroup(["startingSizeMode"]);
```

## State Adapters

Add persistence by passing `state` handlers keyed by schema-box key. Known schema keys are typed from the Shape entry, so `shape` and `value` are the client state for that schema.

```ts
const shapePlugin = createShapePlugin(schemaBox, {
  state: {
    tradingRulesForm: {
      key: ({ shape }) => shape.journalId,
      save: async ({ value, data, operation, id, cacheKey }) => {
        await saveTradingRules({
          data,
        });

        return value;
      },
      load: async ({ id }) => {
        return getTradingRules(id);
      },
    },
  },
});
```

`key({ shape })` chooses the cache/persistence lane for that state entry. It is useful when one state key can represent different records, pages, or route contexts. If omitted, the state key itself is used.

`$save()` transforms the current state before calling the adapter:

- new client records use `entry.transforms.parseForDb(value)` when available
- existing records use `entry.transforms.parsePatchForDb(value)` when available, falling back to `parseForDb(value)`
- `operation` is `"insert"` when `entry.isClientRecord(value)` is true, otherwise `"update"`

You can provide one `save` handler, or split it into `insert` and `update`.

```ts
const shapePlugin = createShapePlugin(schemaBox, {
  state: {
    contacts: {
      insert: async ({ data }) => api.createContact(data),
      update: async ({ data, id }) => api.updateContact(id, data),
    },
  },
});
```

Handlers must return the saved or loaded state. The plugin normalises the returned value back into client shape where possible, updates the state, and uses that value as the new clean baseline.

## View State

Custom state keys can be backed by a Shape view. Use `from` to point at a schema-box key and `with` to choose the relation selection. `from` is type-safe; it must be one of the schema box keys.

```ts
const shapePlugin = createShapePlugin(schemaBox, {
  state: {
    journalWithRules: {
      from: "journals",
      with: { tradingRules: true },
      key: ({ shape }) => shape.id,
      save: async ({ value, data }) => {
        await saveJournalView(data);
        return value;
      },
    },
  },
});
```

For view-backed entries, `value` is the view state. The `key` callback receives the base shape from `from`, so route/cache identity can be derived from the parent record.

## Cache Keys

By default, each Shape state key is also its cache key.

```ts
const rules = useCogsState("tradingRulesForm");
rules.$status().cacheKey; // "tradingRulesForm"
```

For per-record or per-page persistence, configure `key` on the state adapter:

```ts
const shapePlugin = createShapePlugin(schemaBox, {
  state: {
    tradingRulesForm: {
      key: ({ shape }) => shape.journalId,
      save: ({ data }) => saveTradingRules({ data }),
    },
  },
});
```

The key is intentionally just a cache/persistence lane. It is not a database identity. Database identity still comes from the Shape entry's `pk` / `clientPk` fields and the current value passed to the adapter as `id`.

## Methods

### `$save()`

Saves the current state through the configured adapter.

```ts
const result = await rules.$save();

if (result.success) {
  result.data;
  result.operation; // "insert" | "update"
}
```

During save, `$status().isSaving` becomes true and `saveStatus` becomes `"saving"`. On success, the returned value becomes the new baseline and dirty paths are cleared. On failure, the result is `{ success: false, error, operation, cacheKey }` and status stores the error.

### `$load()`

Loads state through the configured adapter.

```ts
const result = await rules.$load();
```

On success, loaded data becomes the current state and the new baseline.

### `$revert()`

Restores the current state to the last clean baseline.

```ts
rules.$revert();
```

The baseline is set when state is initialised, loaded, or saved successfully.

### `$status()`

Returns the current plugin status for the state key.

```ts
const status = rules.$status();

status.isDirty;
status.dirtyPaths;
status.isLoading;
status.isSaving;
status.loadStatus;
status.saveStatus;
status.error;
status.lastLoadedAt;
status.lastSavedAt;
```

`$status()` is reactive. Components that call it subscribe to the plugin metadata status channel and re-render when dirty/load/save status changes. Field updates only notify this status channel when the derived status actually changes.

## Validation

The plugin also connects Shape client validation to `cogsbox-state`.

```ts
const result = rules.$validateGroup(["startingSizeMode", "startingSizeMin"]);
```

`$validateGroup(keys)` validates the full client state, filters issues down to the selected keys, and writes those validation errors to state metadata by default.

Cross-field `refine()` rules are watched through their dependency info, so related field errors can clear as the user edits.
