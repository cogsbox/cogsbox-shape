import { Kysely } from "kysely";
import type { TableMeta, FindManyOpts, WhereInput } from "./types.js";
type DbOnlyArg<T extends Record<string, unknown>> = keyof T extends never ? never : Partial<T>;
type RequiredKeys<T> = {
    [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];
type InsertDbOnlyArgs<T extends Record<string, unknown>> = keyof T extends never ? [] : RequiredKeys<T> extends never ? [dbOnlyData?: Partial<T>] : [dbOnlyData: T];
export type TableDBApi<TClient extends Record<string, unknown>, TCreate, TDbOnly extends Record<string, unknown> = Record<string, never>> = Pick<TableDB<TClient, TCreate, TDbOnly>, "findMany" | "findById" | "byId" | "insert" | "create" | "update" | "delete" | "count" | "reconcileIds">;
export declare class TableDB<TClient extends Record<string, unknown>, TCreate, TDbOnly extends Record<string, unknown> = Record<string, never>> {
    private db;
    private meta;
    private transforms;
    private reconcile?;
    private hydrateRow?;
    constructor(db: Kysely<any>, meta: TableMeta, transforms: {
        toClient: (row: Record<string, unknown>) => TClient;
        toDb: (row: Record<string, unknown>) => Record<string, unknown>;
        parseForDb: (data: Record<string, unknown>) => Record<string, unknown>;
        parsePatchForDb: (data: Record<string, unknown>) => Record<string, unknown>;
        parseFromDb: (data: Record<string, unknown>) => TClient;
    }, reconcile?: ((clientData: unknown) => {
        withServer: (serverData: unknown) => unknown;
    }) | undefined, hydrateRow?: ((row: Record<string, unknown>) => Promise<Record<string, unknown>>) | undefined);
    findMany(opts?: FindManyOpts<TClient>): Promise<TClient[]>;
    findById(id: unknown): Promise<TClient | null>;
    byId(id: unknown): {
        find: () => Promise<TClient | null>;
        update: (data: Partial<TCreate>, dbOnlyData?: DbOnlyArg<TDbOnly>) => ReturnType<TableDB<TClient, TCreate, TDbOnly>["update"]>;
        delete: () => Promise<{
            deleted: boolean;
        }>;
    };
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
    reconcileIds<TData>(clientData: TData, ids: unknown): TData;
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
