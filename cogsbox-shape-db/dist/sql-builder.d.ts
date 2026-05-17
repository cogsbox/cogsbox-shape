import type { WhereClause, OrderByEntry, JoinDef } from "./types.js";
export interface SelectOpts {
    table: string;
    columns: string[];
    where?: WhereClause;
    orderBy?: OrderByEntry[];
    limit?: number;
    offset?: number;
}
export declare function buildSelect(opts: SelectOpts): {
    sql: string;
    bindings: unknown[];
};
export interface SelectWithJoinsOpts {
    baseTable: string;
    baseAlias: string;
    baseColumns: string[];
    joins: JoinDef[];
    where?: WhereClause;
    orderBy?: OrderByEntry[];
    limit?: number;
    offset?: number;
}
export declare function buildSelectWithJoins(opts: SelectWithJoinsOpts): {
    sql: string;
    bindings: unknown[];
};
export interface InsertOpts {
    table: string;
    values: Record<string, unknown>;
}
export declare function buildInsert(opts: InsertOpts): {
    sql: string;
    bindings: unknown[];
};
export interface UpdateOpts {
    table: string;
    values: Record<string, unknown>;
    where: WhereClause;
}
export declare function buildUpdate(opts: UpdateOpts): {
    sql: string;
    bindings: unknown[];
};
export interface DeleteOpts {
    table: string;
    where: WhereClause;
}
export declare function buildDelete(opts: DeleteOpts): {
    sql: string;
    bindings: unknown[];
};
export declare function buildCount(opts: {
    table: string;
    where?: WhereClause;
}): {
    sql: string;
    bindings: unknown[];
};
export declare function buildSelectById(opts: {
    table: string;
    columns: string[];
    pkFields: string[];
    pkValues: unknown[];
}): {
    sql: string;
    bindings: unknown[];
};
