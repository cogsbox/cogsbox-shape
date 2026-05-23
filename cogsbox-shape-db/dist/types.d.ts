export type WhereValue<T> = T | {
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    gt?: T;
    gte?: T;
    lt?: T;
    lte?: T;
    in?: T[];
    not?: T | Exclude<WhereValue<T>, T>;
};
export type WhereInput<T> = {
    [K in keyof T]?: WhereValue<T[K]>;
};
export interface FindManyOpts<T> {
    where?: WhereInput<Partial<T>>;
    orderBy?: {
        [K in keyof T]?: "asc" | "desc";
    };
    limit?: number;
    offset?: number;
}
export interface ClientToDbField {
    dbName: string;
    toDb?: (val: any) => any;
    toClient?: (val: any) => any;
}
export interface TableMeta {
    tableName: string;
    dbFields: Map<string, ClientToDbField>;
    clientToDbName: Map<string, string>;
    pkFields: string[];
    clientPkFields: string[];
    sqlOnlyFields: Set<string>;
    sqlOnlyClientFields: Set<string>;
    sqlOnlyRequiredClientFields: Set<string>;
    sqlOnlyValidators: Map<string, (val: unknown) => unknown>;
    deriveDependencies: Map<string, string[]>;
}
