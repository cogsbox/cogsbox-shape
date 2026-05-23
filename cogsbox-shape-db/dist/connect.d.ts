import { Kysely } from "kysely";
import { TableDB } from "./table-db.js";
type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;
type Return<T> = T extends (...args: any[]) => infer R ? R : never;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type SchemaMetaKey = "_tableName" | "__primaryKeySQL" | "__derives" | "primaryKeySQL" | "derive";
type SqlConfigOf<TField> = TField extends {
    config: {
        sql: infer TSql;
    };
} ? TSql : TField extends {
    __meta: {
        _fieldType: infer TInner;
    };
} ? SqlConfigOf<TInner> : never;
type SqlConfigBaseValue<TSql> = TSql extends {
    type: "int" | "boolean";
} ? number : TSql extends {
    type: "date" | "datetime" | "timestamp";
} ? Date : TSql extends {
    type: "varchar" | "char" | "text" | "longtext";
} ? string : unknown;
type SqlOnlyValue<TField> = SqlConfigOf<TField> extends infer TSql ? TSql extends {
    nullable: true;
} ? SqlConfigBaseValue<TSql> | null : SqlConfigBaseValue<TSql> : unknown;
type IsSqlOnlyField<TField> = SqlConfigOf<TField> extends infer TSql ? TSql extends {
    sqlOnly?: infer TSqlOnly;
} ? true extends TSqlOnly ? true : false : false : false;
type IsOptionalSqlOnly<TField> = TField extends {
    config: {
        sql: {
            nullable: true;
        };
    };
} ? true : TField extends {
    config: {
        sql: {
            default: any;
        };
    };
} ? true : TField extends {
    config: {
        sql: {
            defaultValue: any;
        };
    };
} ? true : false;
type SqlOnlyInput<T> = T extends {
    definition: infer TDefinition;
} ? Prettify<{
    [K in keyof TDefinition as IsSqlOnlyField<TDefinition[K]> extends true ? K extends SchemaMetaKey ? never : IsOptionalSqlOnly<TDefinition[K]> extends true ? never : K : never]: SqlOnlyValue<TDefinition[K]>;
} & {
    [K in keyof TDefinition as IsSqlOnlyField<TDefinition[K]> extends true ? K extends SchemaMetaKey ? never : IsOptionalSqlOnly<TDefinition[K]> extends true ? K : never : never]?: SqlOnlyValue<TDefinition[K]>;
}> : Record<string, never>;
type ConnectedTable<T> = T extends {
    transforms: {
        parseForDb: (...args: any[]) => any;
        parseFromDb: (...args: any[]) => any;
    };
} ? T & {
    db: TableDB<Return<T["transforms"]["parseFromDb"]>, FirstArg<T["transforms"]["parseForDb"]>, SqlOnlyInput<T>>;
} : T;
type ConnectedBox<T extends Record<string, unknown>> = {
    [K in keyof T]: ConnectedTable<T[K]>;
} & {
    db: {
        transaction: <R>(fn: (txBox: ConnectedBox<T>) => Promise<R>) => Promise<R>;
    };
};
export declare function connect<T extends Record<string, unknown>>(box: T, db: Kysely<unknown>): ConnectedBox<T>;
export {};
