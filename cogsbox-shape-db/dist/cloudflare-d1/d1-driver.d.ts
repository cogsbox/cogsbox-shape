import { Kysely } from "kysely";
import type { DatabaseIntrospector, Dialect, DialectAdapter, Driver, QueryCompiler } from "kysely";
export interface D1Result<T = Record<string, unknown>> {
    success: boolean;
    error?: string;
    results?: T[];
    meta?: {
        changes?: number;
        last_row_id?: number;
        rows_written?: number;
    };
}
export interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
    run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}
export interface D1Database {
    prepare(query: string): D1PreparedStatement;
}
export declare class D1Dialect implements Dialect {
    #private;
    constructor(database: D1Database);
    createDriver(): Driver;
    createQueryCompiler(): QueryCompiler;
    createAdapter(): DialectAdapter;
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}
export declare function createD1Db<TDb = unknown>(database: D1Database): Kysely<TDb>;
