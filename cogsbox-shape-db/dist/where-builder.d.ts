import type { TableMeta } from "./types.js";
import { sql } from "kysely";
export declare function buildWhereConditions(filter: Record<string, unknown>, meta: TableMeta): ReturnType<typeof sql>[];
export declare function buildPkConditions(pkValues: unknown[], pkFields: string[]): ReturnType<typeof sql>[];
