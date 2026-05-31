import { Kysely } from "kysely";
export declare function createSqliteDb<TDb = unknown>(path: string): Promise<Kysely<TDb>>;
