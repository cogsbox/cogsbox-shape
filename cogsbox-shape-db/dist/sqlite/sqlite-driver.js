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
    catch (err) {
        throw new Error("Failed to initialize better-sqlite3. It may be missing, blocked by pnpm builds, or built for a different Node version.\n" +
            "Try: pnpm approve-builds && pnpm rebuild better-sqlite3", { cause: err });
    }
}
