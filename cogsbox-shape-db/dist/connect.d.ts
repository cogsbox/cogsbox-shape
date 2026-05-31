import { Kysely } from "kysely";
import type { TableDBApi } from "./table-db.js";
type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;
type Return<T> = T extends (...args: any[]) => infer R ? R : never;
type Row<T> = T extends readonly (infer TItem)[] ? TItem : T;
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
    type: "varchar" | "char" | "text" | "longtext" | "enum";
} ? string : unknown;
type SqlOnlyValue<TField> = SqlConfigOf<TField> extends infer TSql ? TSql extends {
    nullable: true;
} ? SqlConfigBaseValue<TSql> | null : SqlConfigBaseValue<TSql> : unknown;
type IsSqlOnlyField<TField> = SqlConfigOf<TField> extends infer TSql ? TSql extends {
    sqlOnly: true;
} ? true : false : false;
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
type IsDerivedDbField<TTable, TKey> = TTable extends {
    rawSchema: {
        __derives?: {
            forDb?: infer TForDb;
        };
    };
} ? TKey extends keyof NonNullable<TForDb> ? true : false : TTable extends {
    deriveDependencies: infer TDerives;
} ? TKey extends keyof TDerives ? true : false : false;
type SqlOnlyInput<T> = T extends {
    definition: infer TDefinition;
} ? Prettify<{
    [K in keyof TDefinition as IsSqlOnlyField<TDefinition[K]> extends true ? K extends SchemaMetaKey ? never : TDefinition[K] extends {
        __type: "reference";
    } ? never : IsDerivedDbField<T, K> extends true ? never : IsOptionalSqlOnly<TDefinition[K]> extends true ? never : K : never]: SqlOnlyValue<TDefinition[K]>;
} & {
    [K in keyof TDefinition as IsSqlOnlyField<TDefinition[K]> extends true ? K extends SchemaMetaKey ? never : TDefinition[K] extends {
        __type: "reference";
    } ? never : IsOptionalSqlOnly<TDefinition[K]> extends true ? K : never : never]?: SqlOnlyValue<TDefinition[K]>;
}> : Record<string, never>;
type DbApiFor<T> = T extends {
    transforms: {
        parseForDb: (...args: any[]) => any;
        parseFromDb: (...args: any[]) => any;
    };
} ? TableDBApi<Row<Return<T["transforms"]["parseFromDb"]>>, Row<FirstArg<T["transforms"]["parseForDb"]>>, SqlOnlyInput<T>> : never;
type ConnectedView<T> = T extends {
    transforms: {
        parseForDb: (...args: any[]) => any;
        parseFromDb: (...args: any[]) => any;
    };
} ? Omit<T, keyof DbApiFor<T>> & DbApiFor<T> : T;
type ConnectedCreateView<T> = T extends {
    createView: (...args: infer TArgs) => infer TView;
} ? {
    createView: (...args: TArgs) => ConnectedView<TView>;
} : {};
type ConnectedTable<T> = T extends {
    transforms: {
        parseForDb: (...args: any[]) => any;
        parseFromDb: (...args: any[]) => any;
    };
} ? Omit<T, "createView" | keyof DbApiFor<T>> & DbApiFor<T> & ConnectedCreateView<T> : T;
type ConnectedBox<T extends Record<string, unknown>> = {
    [K in keyof T]: ConnectedTable<T[K]>;
} & {
    transaction: <R>(fn: (txBox: ConnectedBox<T>) => Promise<R>) => Promise<R>;
};
export declare function connect<T extends Record<string, unknown>>(box: T, db: Kysely<any>): ConnectedBox<T>;
export {};
