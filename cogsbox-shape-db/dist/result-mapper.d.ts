import type { JoinDef, TableMeta } from "./types.js";
export declare function aliasRelationColumn(relationKey: string, field: string): string;
export declare function isRelationAlias(alias: string): false | {
    relationKey: string;
    field: string;
};
export declare function flattenJoinedRows(rows: Record<string, unknown>[], basePkFields: string[], joins: JoinDef[], baseMeta: TableMeta, childMetas: Map<string, TableMeta>): Record<string, unknown>[];
