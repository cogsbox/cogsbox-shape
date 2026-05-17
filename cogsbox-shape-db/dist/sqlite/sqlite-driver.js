import { Kysely, SqliteDialect } from "kysely";
export async function createSqliteDb(path) {
    try {
        const mod = await import("better-sqlite3");
        const Database = mod.default;
        return new Kysely({
            dialect: new SqliteDialect({
                database: new Database(path),
            }),
        });
    }
    catch {
        throw new Error("better-sqlite3 is not installed. Install it:\n" +
            "  npm install better-sqlite3\n");
    }
}
