import { Kysely } from "kysely";
import type { TableMeta, FindManyOpts, WhereInput } from "./types.js";
export declare class TableDB<TClient extends Record<string, unknown>, TCreate> {
    private db;
    private meta;
    private transforms;
    constructor(db: Kysely<unknown>, meta: TableMeta, transforms: {
        toClient: (row: Record<string, unknown>) => TClient;
        toDb: (row: Record<string, unknown>) => Record<string, unknown>;
        parseForDb: (data: Record<string, unknown>) => Record<string, unknown>;
        parseFromDb: (data: Record<string, unknown>) => TClient;
    });
    findMany(opts?: FindManyOpts<TClient>): Promise<TClient[]>;
    findById(id: unknown): Promise<TClient | null>;
    create(data: TCreate): Promise<TClient>;
    update(id: unknown, data: Partial<TCreate>): Promise<TClient>;
    delete(id: unknown): Promise<{
        deleted: boolean;
    }>;
    count(where?: WhereInput<Partial<TClient>>): Promise<number>;
}
