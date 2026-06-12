import { createCogsState, createPluginContext } from "cogsbox-state";
import { createSchemaBox, s, schema } from "cogsbox-shape";
function createShapeInitialState(shape) {
    return shape.generateDefaults();
}
const { createPlugin } = createPluginContext();
export function createShapePlugin(shape) {
    return createPlugin("shape").initialState(() => createShapeInitialState(shape));
}
const shapeStateSchema = schema({
    _tableName: "shape_state",
    name: s.sqlite({ type: "varchar", length: 100 }).clientInput({
        value: "",
    }),
});
export const shapeBox = createSchemaBox({ shapeState: shapeStateSchema }, { shapeState: {} });
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
