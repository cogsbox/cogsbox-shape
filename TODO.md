# TODO — Shape Plugin (state integration)

## Goal

A `cogsbox-shape` plugin for `cogsbox-state` that wires schema-defined defaults, validation, and derives directly into state without the state library needing to know about shapes.

## The Plugin

A single `createShapePlugin(box)` call. The user passes the full schema box.

```ts
const shapePlugin = createShapePlugin(box);
const { useCogsState } = createCogsState({ plugins: [shapePlugin] });
```

State key = box entry key. No per-hook options needed for basic use.

```ts
const user = useCogsState("users");
// typed as InferClientShape<typeof box.users>
// values come from box.users.generateDefaults()
```

View support via per-hook options, namespaced under the plugin name:

```ts
const userView = useCogsState("users", {
  shape: { view: { posts: true } }
});
```

## What each hook does

### `initialState`
- Look up `box[stateKey]`
- Call `entry.generateDefaults()` (or `entry.createView(opts.view).defaults()` if a view is set)
- Return the default state

### `onFormUpdate` / validation

Cross-field refine failures are **not on a single field**. Zod runs the check (`safeParse`). Cogs owns storage and render.

**Now — parent `.$errors` only:**

- **Field blur** → single-field schema → error on that **field path** (unchanged)
- **Any field blur on an object with refines** → `safeParse` whole object → refine/custom issues go on the **parent object**
  - `useCogsState("tradingRulesForm").$errors` for a flat form
  - `items.$index(3).$errors` for a row in an array
- On re-run: **clear parent `.$errors`**, then set from fresh parse result
- Blur order: **field first, object second** — field pass must not wipe object errors
- Field pass → field issues only. Object pass → parent `.$errors` only. No whole-blob replace.

**Do not** copy Zod `issue.path` onto one field for cross-field failures.

```ts
const rules = useCogsState("tradingRulesForm");

rules.positionSizeRangeMax.$formElement(...)  // field errors

rules.$errors.issues
rules.$errors.hasErrors
rules.$errors.message
```

```ts
items.$index(3).$errors.message
```

### `refineInfo` (shape)

Keep for **when to re-run** on blur (`fieldToGroup`, `groups[].deps`). Not for picking a display field path.

### `onUpdate`
- On every state mutation, check `deriveDependencies` for `forClient` entries
- If a changed field is a dependency of a client derive, recompute the derived value
- Write derived value into state

## Changes needed in `cogsbox-state`

- `initialState` in `createCogsState()` becomes optional (plugins provide it)
- Generic walks plugin array to infer per-key state types
- Plugin options are namespaced under `plugin.name` in `useCogsState` / `setCogsOptionsByKey`
- The `PluginRunner` already creates per-(stateKey, plugin) instances — just needs to call `initialState` if present
- **`.$errors` on object proxy** — parent-level issue bag, notify on change
- **Scoped validation writes** — field vs parent `$errors`; no clobbering

## Changes needed in `cogsbox-shape-state`

- `validateShapeRefines` → parse object, write to parent `.$errors`
- Stop writing cross-field issues to single field paths via `$addZodValidation`

## What the plugin doesn't do

- No schema evolution / migration
- No DB transforms (`parseForDb` / `parseFromDb`) — those stay at the write boundary (ORM)
- No relation writes — views are read-only for now
- No async validation — all schema rules are sync

## Future

### `$errorGroups` — composite group paths (separate feature, not part of initial plugin)

Cross-field errors can belong to a **group** (relationship between fields), not a single field and not the whole object bag. Composite string keys — not real state paths:

```
group:positionSizeRangeMin+positionSizeRangeMax
group:riskRewardMin+riskRewardTarget
```

- Built from refine `deps` (sorted, `+` joined), prefix `group:`
- Stored on parent object, flat lookup
- Typed client surface from schema `refineInfo`

```ts
rules.$errorGroups["group:positionSizeRangeMin+positionSizeRangeMax"]
items.$index(3).$errorGroups["group:fieldA+fieldB"]
```

Internal walk (path-shaped, not state):

```ts
["tradingRulesForm", "$errorGroups", "group:min+max"]
["items", "3", "$errorGroups", "group:fieldA+fieldB"]
```

Requires cogsbox-state `$errorGroups` branch on proxy + shape composite key types. Build after parent `.$errors` works.

### Other future

- Write-side integration: form submission → `parseForDb` → ORM insert/update
- Cross-form validation (fields in one form affecting errors in another)
