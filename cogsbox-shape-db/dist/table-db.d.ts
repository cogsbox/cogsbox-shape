import { Kysely } from "kysely";
import type { TableMeta, FindManyOpts, WhereInput } from "./types.js";
type DbOnlyArg<T extends Record<string, unknown>> = keyof T extends never ? never : Partial<T>;
type RequiredKeys<T> = {
    [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];
type InsertDbOnlyArgs<T extends Record<string, unknown>> = keyof T extends never ? [] : RequiredKeys<T> extends never ? [dbOnlyData?: Partial<T>] : [dbOnlyData: T];
export declare class TableDB<TClient extends Record<string, unknown>, TCreate, TDbOnly extends Record<string, unknown> = Record<string, never>> {
    private db;
    private meta;
    private transforms;
    private reconcile?;
    constructor(db: Kysely<unknown>, meta: TableMeta, transforms: {
        toClient: (row: Record<string, unknown>) => TClient;
        toDb: (row: Record<string, unknown>) => Record<string, unknown>;
        parseForDb: (data: Record<string, unknown>) => Record<string, unknown>;
        parsePatchForDb: (data: Record<string, unknown>) => Record<string, unknown>;
        parseFromDb: (data: Record<string, unknown>) => TClient;
    }, reconcile?: ((clientData: unknown) => {
        withServer: (serverData: unknown) => unknown;
    }) | undefined);
    findMany(opts?: FindManyOpts<TClient>): Promise<TClient[]>;
    findById(id: unknown): Promise<TClient | null>;
    insert(data: TCreate, ...args: InsertDbOnlyArgs<TDbOnly>): {
        ids: () => Promise<Record<string, unknown>>;
        full: () => Promise<TClient>;
    };
    create(data: TCreate, ...args: InsertDbOnlyArgs<TDbOnly>): Promise<Record<string, unknown>>;
    private insertIds;
    update(id: unknown, data: Partial<TCreate>, dbOnlyData?: DbOnlyArg<TDbOnly>): {
        ids: () => Promise<Record<string, unknown>>;
        full: () => Promise<TClient>;
    };
    private updateIds;
    private affectedDbBackedDerives;
    private missingDeriveDependencies;
    private fetchClientFieldsById;
    private pickDbPatchFields;
    private isWritableDbColumn;
    private parseDbOnlyData;
    reconcileIds(clientData: unknown, ids: unknown): unknown;
    private reconcileFlatIds;
    private mapIdsToClientFields;
    private clientKeyForDbField;
    private firstPkValue;
    delete(id: unknown): Promise<{
        deleted: boolean;
    }>;
    count(where?: WhereInput<Partial<TClient>>): Promise<number>;
}
export {};
