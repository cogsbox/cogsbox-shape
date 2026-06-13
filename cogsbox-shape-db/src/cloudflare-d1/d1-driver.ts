import {
  CompiledQuery,
  Kysely,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";
import type {
  AbortableOperationOptions,
  DatabaseConnection,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Driver,
  QueryCompiler,
  QueryResult,
  TransactionSettings,
} from "kysely";

export interface D1Result<T = Record<string, unknown>> {
  success: boolean;
  error?: string;
  results?: T[];
  meta?: {
    changes?: number;
    last_row_id?: number;
    rows_written?: number;
  };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export class D1Dialect implements Dialect {
  readonly #database: D1Database;

  constructor(database: D1Database) {
    this.#database = database;
  }

  createDriver(): Driver {
    return new D1Driver(this.#database);
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler();
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter();
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db);
  }
}

export function createD1Db<TDb = unknown>(database: D1Database): Kysely<TDb> {
  return new Kysely<TDb>({
    dialect: new D1Dialect(database),
  });
}

class D1Driver implements Driver {
  readonly #connection: D1Connection;

  constructor(database: D1Database) {
    this.#connection = new D1Connection(database);
  }

  async init(_options?: AbortableOperationOptions): Promise<void> {
    // Cloudflare D1 bindings are already initialized by the Worker runtime.
  }

  async acquireConnection(
    _options?: AbortableOperationOptions,
  ): Promise<DatabaseConnection> {
    return this.#connection;
  }

  async beginTransaction(
    connection: DatabaseConnection,
    _settings: TransactionSettings,
  ): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }

  async releaseConnection(
    _connection: DatabaseConnection,
    _options?: AbortableOperationOptions,
  ): Promise<void> {
    // D1 exposes a stateless binding instead of pooled connections.
  }

  async destroy(_options?: AbortableOperationOptions): Promise<void> {
    // Nothing to close for a Worker binding.
  }
}

class D1Connection implements DatabaseConnection {
  readonly #database: D1Database;

  constructor(database: D1Database) {
    this.#database = database;
  }

  async executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
    const statement = this.#prepare(compiledQuery);
    const result = shouldReturnRows(compiledQuery.sql)
      ? await statement.all<R>()
      : await statement.run<R>();

    assertD1Success(result, compiledQuery.sql);

    return {
      insertId:
        result.meta?.last_row_id != null
          ? BigInt(result.meta.last_row_id)
          : undefined,
      numAffectedRows: affectedRows(result),
      rows: (result.results ?? []) as R[],
    };
  }

  async *streamQuery<R>(
    compiledQuery: CompiledQuery,
    _chunkSize: number,
  ): AsyncIterableIterator<QueryResult<R>> {
    const result = await this.executeQuery<R>(compiledQuery);
    for (const row of result.rows) {
      yield { rows: [row] };
    }
  }

  #prepare(compiledQuery: CompiledQuery): D1PreparedStatement {
    const statement = this.#database.prepare(compiledQuery.sql);
    return compiledQuery.parameters.length > 0
      ? statement.bind(...compiledQuery.parameters)
      : statement;
  }
}

function shouldReturnRows(sql: string): boolean {
  const trimmed = sql.trim().toLowerCase();
  return (
    trimmed.startsWith("select") ||
    trimmed.startsWith("with") ||
    trimmed.startsWith("pragma") ||
    trimmed.startsWith("explain") ||
    /\breturning\b/i.test(sql)
  );
}

function affectedRows(result: D1Result<any>): bigint | undefined {
  const count = result.meta?.changes ?? result.meta?.rows_written;
  return count != null ? BigInt(count) : undefined;
}

function assertD1Success(result: D1Result<any>, sql: string): void {
  if (!result.success) {
    throw new Error(result.error ?? `D1 query failed: ${sql}`);
  }
}
