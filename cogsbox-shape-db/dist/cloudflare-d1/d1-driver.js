import { CompiledQuery, Kysely, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler, } from "kysely";
export class D1Dialect {
    #database;
    constructor(database) {
        this.#database = database;
    }
    createDriver() {
        return new D1Driver(this.#database);
    }
    createQueryCompiler() {
        return new SqliteQueryCompiler();
    }
    createAdapter() {
        return new SqliteAdapter();
    }
    createIntrospector(db) {
        return new SqliteIntrospector(db);
    }
}
export function createD1Db(database) {
    return new Kysely({
        dialect: new D1Dialect(database),
    });
}
class D1Driver {
    #connection;
    constructor(database) {
        this.#connection = new D1Connection(database);
    }
    async init(_options) {
        // Cloudflare D1 bindings are already initialized by the Worker runtime.
    }
    async acquireConnection(_options) {
        return this.#connection;
    }
    async beginTransaction(connection, _settings) {
        await connection.executeQuery(CompiledQuery.raw("begin"));
    }
    async commitTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw("commit"));
    }
    async rollbackTransaction(connection) {
        await connection.executeQuery(CompiledQuery.raw("rollback"));
    }
    async releaseConnection(_connection, _options) {
        // D1 exposes a stateless binding instead of pooled connections.
    }
    async destroy(_options) {
        // Nothing to close for a Worker binding.
    }
}
class D1Connection {
    #database;
    constructor(database) {
        this.#database = database;
    }
    async executeQuery(compiledQuery) {
        const statement = this.#prepare(compiledQuery);
        const result = shouldReturnRows(compiledQuery.sql)
            ? await statement.all()
            : await statement.run();
        assertD1Success(result, compiledQuery.sql);
        return {
            insertId: result.meta?.last_row_id != null
                ? BigInt(result.meta.last_row_id)
                : undefined,
            numAffectedRows: affectedRows(result),
            rows: (result.results ?? []),
        };
    }
    async *streamQuery(compiledQuery, _chunkSize) {
        const result = await this.executeQuery(compiledQuery);
        for (const row of result.rows) {
            yield { rows: [row] };
        }
    }
    #prepare(compiledQuery) {
        const statement = this.#database.prepare(compiledQuery.sql);
        return compiledQuery.parameters.length > 0
            ? statement.bind(...compiledQuery.parameters)
            : statement;
    }
}
function shouldReturnRows(sql) {
    const trimmed = sql.trim().toLowerCase();
    return (trimmed.startsWith("select") ||
        trimmed.startsWith("with") ||
        trimmed.startsWith("pragma") ||
        trimmed.startsWith("explain") ||
        /\breturning\b/i.test(sql));
}
function affectedRows(result) {
    const count = result.meta?.changes ?? result.meta?.rows_written;
    return count != null ? BigInt(count) : undefined;
}
function assertD1Success(result, sql) {
    if (!result.success) {
        throw new Error(result.error ?? `D1 query failed: ${sql}`);
    }
}
