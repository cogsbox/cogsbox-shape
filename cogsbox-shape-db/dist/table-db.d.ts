import { Kysely } from "kysely";
import type { TableMeta, FindManyOpts, WhereInput } from "./types.js";
export declare class TableDB<TClient extends Record<string, unknown>, TCreate> {
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
    insert(data: TCreate): {
        ids: () => Promise<Record<string, unknown>>;
        full: () => Promise<TClient>;
    };
    create(data: TCreate): Promise<Record<string, unknown>>;
    private insertIds;
    update(id: unknown, data: Partial<TCreate>): {
        ids: () => Promise<Record<string, unknown>>;
        full: () => Promise<TClient>;
    };
    private updateIds;
    private affectedDbBackedDerives;
    private missingDeriveDependencies;
    private fetchClientFieldsById;
    private pickDbPatchFields;
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
