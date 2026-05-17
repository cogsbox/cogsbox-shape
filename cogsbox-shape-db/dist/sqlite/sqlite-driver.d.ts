import { Kysely } from "kysely";
export declare function createSqliteDb(path: string): Promise<Kysely<unknown>>;
