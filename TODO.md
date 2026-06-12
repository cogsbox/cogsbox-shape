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

### `onFormUpdate`
- On `blur`: validate the changed field using the schema's server schema
- Use `refineInfo.fieldToGroup` to find related fields in the same refinement groups
- Run `schema.safeParse(fullState)`, filter issues to affected fields, call `addZodErrors()`
- On `input`: validate single field only (no cross-field refinement)

### `onUpdate`
- On every state mutation, check `deriveDependencies` for `forClient` entries
- If a changed field is a dependency of a client derive, recompute the derived value
- Write derived value into state

## Changes needed in `cogsbox-state`

- `initialState` in `createCogsState()` becomes optional (plugins provide it)
- Generic walks plugin array to infer per-key state types
- Plugin options are namespaced under `plugin.name` in `useCogsState` / `setCogsOptionsByKey`
- The `PluginRunner` already creates per-(stateKey, plugin) instances — just needs to call `initialState` if present

## What the plugin doesn't do

- No schema evolution / migration
- No DB transforms (`parseForDb` / `parseFromDb`) — those stay at the write boundary (ORM)
- No relation writes — views are read-only for now
- No async validation — all schema rules are sync

## Future options (not planning yet)

- Write-side integration: form submission → `parseForDb` → ORM insert/update
- Cross-form validation (fields in one form affecting errors in another)
