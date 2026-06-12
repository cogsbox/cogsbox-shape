import { createCogsState, createPluginContext } from "cogsbox-state";
import { createSchemaBox, s, schema } from "cogsbox-shape";

export type ShapeStateSource<TState extends Record<string, unknown>> = {
  generateDefaults: () => TState;
};

function createShapeInitialState<const TState extends Record<string, unknown>>(
  shape: ShapeStateSource<TState>,
): TState {
  return shape.generateDefaults();
}

const { createPlugin } = createPluginContext();

export function createShapePlugin<const TState extends Record<string, unknown>>(
  shape: ShapeStateSource<TState>,
) {
  return createPlugin("shape").initialState(() =>
    createShapeInitialState(shape),
  );
}

const shapeStateSchema = schema({
  _tableName: "shape_state",
  name: s.sqlite({ type: "varchar", length: 100 }).clientInput({
    value: "",
  }),
});

export const shapeBox = createSchemaBox(
  { shapeState: shapeStateSchema },
  { shapeState: {} },
);

export const myShape = shapeBox.shapeState;
export const shapePlugin = createShapePlugin(myShape);

// type ShapeCogsState = ReturnType<
//   typeof createCogsState<{}, readonly [typeof shapePlugin]>
// >;

// const shapeState = createCogsState(
//   {},
//   {
//     plugins: [shapePlugin],
//   },
// );

// export const { useCogsState } = shapeState;
