import { Kysely, sql } from "kysely";
import type { TableMeta, FindManyOpts, WhereInput } from "./types.js";
import { buildWhereConditions, buildPkConditions } from "./where-builder.js";
import { RecordNotFoundError } from "./errors.js";

type DbOnlyArg<T extends Record<string, unknown>> =
  keyof T extends never ? never : Partial<T>;
type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];
type InsertDbOnlyArgs<T extends Record<string, unknown>> =
  keyof T extends never
    ? []
    : RequiredKeys<T> extends never
      ? [dbOnlyData?: Partial<T>]
      : [dbOnlyData: T];

export class TableDB<
  TClient extends Record<string, unknown>,
  TCreate,
  TDbOnly extends Record<string, unknown> = Record<string, never>,
> {
  constructor(
    private db: Kysely<unknown>,
    private meta: TableMeta,
    private transforms: {
      toClient: (row: Record<string, unknown>) => TClient;
      toDb: (row: Record<string, unknown>) => Record<string, unknown>;
      parseForDb: (data: Record<string, unknown>) => Record<string, unknown>;
      parsePatchForDb: (
        data: Record<string, unknown>,
      ) => Record<string, unknown>;
      parseFromDb: (data: Record<string, unknown>) => TClient;
    },
    private reconcile?: (
      clientData: unknown,
    ) => { withServer: (serverData: unknown) => unknown },
    private hydrateRow?: (
      row: Record<string, unknown>,
    ) => Promise<Record<string, unknown>>,
  ) {}

  async findMany(opts?: FindManyOpts<TClient>): Promise<TClient[]> {
    const qb = this.db as any;
    let query = qb.selectFrom(this.meta.tableName).selectAll();

    if (opts?.where) {
      const conditions = buildWhereConditions(
        opts.where as Record<string, unknown>,
        this.meta,
      );
      if (conditions.length > 0) {
        query = query.where(sql.join(conditions, sql` AND `));
      }
    }

    if (opts?.orderBy) {
      for (const [col, dir] of Object.entries(opts.orderBy)) {
        if (dir) {
          const field = this.meta.dbFields.get(col);
          const dbCol = field?.dbName ?? col;
          query = query.orderBy(dbCol, dir as any);
        }
      }
    }

    const limit = opts?.limit ?? 100;
    query = query.limit(limit);
    if (opts?.offset !== undefined) {
      query = query.offset(opts.offset);
    }

    const rows = (await query.execute()) as Record<string, unknown>[];
    const hydratedRows = this.hydrateRow
      ? await Promise.all(rows.map((row) => this.hydrateRow!(row)))
      : rows;
    return hydratedRows.map((r) => this.transforms.parseFromDb(r));
  }

  async findById(id: unknown): Promise<TClient | null> {
    const pkValues = Array.isArray(id) ? id : [id];
    const pkFields =
      this.meta.pkFields.length > 0
        ? this.meta.pkFields
        : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);

    const conditions = buildPkConditions(pkValues, pkFields);
    const qb = this.db as any;
    const rows = await qb
      .selectFrom(this.meta.tableName)
      .selectAll()
      .where(sql.join(conditions, sql` AND `))
      .limit(1)
      .execute();

    const row = (rows[0] as Record<string, unknown>) ?? null;
    if (!row) return null;
    const hydratedRow = this.hydrateRow ? await this.hydrateRow(row) : row;
    return this.transforms.parseFromDb(hydratedRow);
  }

  insert(
    data: TCreate,
    ...args: InsertDbOnlyArgs<TDbOnly>
  ): {
    ids: () => Promise<Record<string, unknown>>;
    full: () => Promise<TClient>;
  } {
    const dbOnlyData = args[0] as DbOnlyArg<TDbOnly> | undefined;
    return {
      ids: () => this.insertIds(data, dbOnlyData),
      full: async () => {
        const ids = await this.insertIds(data, dbOnlyData);
        return this.reconcileIds(data, ids) as TClient;
      },
    };
  }

  async create(
    data: TCreate,
    ...args: InsertDbOnlyArgs<TDbOnly>
  ): Promise<Record<string, unknown>> {
    const dbOnlyData = args[0] as DbOnlyArg<TDbOnly> | undefined;
    return this.insertIds(data, dbOnlyData);
  }

  private async insertIds(
    data: TCreate,
    dbOnlyData?: DbOnlyArg<TDbOnly>,
  ): Promise<Record<string, unknown>> {
    const dbData = this.transforms.parseForDb(data as Record<string, unknown>);
    const parsedDbOnlyData = this.parseDbOnlyData(dbOnlyData, {
      requireRequired: true,
    });

    const clientPkClientKeys = this.meta.clientPkFields;
    const pkDbNames = new Set(clientPkClientKeys.map((k) => {
      const field = this.meta.dbFields.get(k);
      return field?.dbName ?? k;
    }));

    const insertData: Record<string, unknown> = {};
    for (const key of Object.keys(dbData)) {
      if (!pkDbNames.has(key) && this.isWritableDbColumn(key)) {
        insertData[key] = dbData[key];
      }
    }
    Object.assign(insertData, parsedDbOnlyData);

    const qb = this.db as any;
    const result = await qb
      .insertInto(this.meta.tableName)
      .values(insertData)
      .execute();

    const insertId = result[0]?.insertId;
    if (insertId !== undefined && this.meta.pkFields.length > 0) {
      const dbPkField = this.meta.pkFields[0]!;
      return { [dbPkField]: Number(insertId) };
    }

    return {};
  }

  update(
    id: unknown,
    data: Partial<TCreate>,
    dbOnlyData?: DbOnlyArg<TDbOnly>,
  ): {
    ids: () => Promise<Record<string, unknown>>;
    full: () => Promise<TClient>;
  } {
    return {
      ids: () => this.updateIds(id, data, dbOnlyData),
      full: async () => {
        const ids = await this.updateIds(id, data, dbOnlyData);
        const idValue = this.firstPkValue(ids);
        const row = await this.findById(idValue);
        if (!row) {
          throw new RecordNotFoundError(this.meta.tableName, idValue);
        }
        return row;
      },
    };
  }

  private async updateIds(
    id: unknown,
    data: Partial<TCreate>,
    dbOnlyData?: DbOnlyArg<TDbOnly>,
  ): Promise<Record<string, unknown>> {
    const pkValues = Array.isArray(id) ? id : [id];
    const pkFields =
      this.meta.pkFields.length > 0
        ? this.meta.pkFields
        : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);

    const patchData = data as Record<string, unknown>;
    const deriveKeys = this.affectedDbBackedDerives(patchData);
    const missingDeps = this.missingDeriveDependencies(patchData, deriveKeys);
    const fetchedDeps =
      missingDeps.length > 0
        ? await this.fetchClientFieldsById(pkValues, pkFields, missingDeps)
        : {};
    const parseInput = { ...fetchedDeps, ...patchData };
    const parsedDbData = this.transforms.parsePatchForDb(parseInput);
    const dbData = this.pickDbPatchFields(parsedDbData, [
      ...Object.keys(patchData),
      ...deriveKeys,
    ]);
    Object.assign(
      dbData,
      this.parseDbOnlyData(dbOnlyData, { requireRequired: false }),
    );
    const conditions = buildPkConditions(pkValues, pkFields);

    const qb = this.db as any;
    const result = await qb
      .updateTable(this.meta.tableName)
      .set(dbData)
      .where(sql.join(conditions, sql` AND `))
      .execute();

    const numUpdated = result[0]?.numUpdatedRows ?? 0n;
    if (Number(numUpdated) === 0) {
      throw new RecordNotFoundError(this.meta.tableName, id);
    }

    const pkResult: Record<string, unknown> = {};
    for (let i = 0; i < pkFields.length; i++) {
      pkResult[pkFields[i]!] = pkValues[i];
    }
    return pkResult;
  }

  private affectedDbBackedDerives(
    patchData: Record<string, unknown>,
  ): string[] {
    const patchKeys = new Set(Object.keys(patchData));
    const affected: string[] = [];

    for (const [deriveKey, deps] of this.meta.deriveDependencies.entries()) {
      if (!this.meta.dbFields.has(deriveKey)) continue;
      if (deps.some((dep) => patchKeys.has(dep))) {
        affected.push(deriveKey);
      }
    }

    return affected;
  }

  private missingDeriveDependencies(
    patchData: Record<string, unknown>,
    deriveKeys: string[],
  ): string[] {
    const patchKeys = new Set(Object.keys(patchData));
    const missing = new Set<string>();

    for (const deriveKey of deriveKeys) {
      const deps = this.meta.deriveDependencies.get(deriveKey) ?? [];
      for (const dep of deps) {
        if (!patchKeys.has(dep)) missing.add(dep);
      }
    }

    return Array.from(missing).filter((dep) => this.meta.dbFields.has(dep));
  }

  private async fetchClientFieldsById(
    pkValues: unknown[],
    pkFields: string[],
    clientFields: string[],
  ): Promise<Record<string, unknown>> {
    const dbColumns = clientFields.map((clientKey) => {
      const field = this.meta.dbFields.get(clientKey);
      return field?.dbName ?? clientKey;
    });
    const conditions = buildPkConditions(pkValues, pkFields);
    const qb = this.db as any;
    const row = (await qb
      .selectFrom(this.meta.tableName)
      .select(dbColumns)
      .where(sql.join(conditions, sql` AND `))
      .limit(1)
      .executeTakeFirst()) as Record<string, unknown> | undefined;

    if (!row) {
      throw new RecordNotFoundError(this.meta.tableName, pkValues);
    }

    const result: Record<string, unknown> = {};
    for (const clientKey of clientFields) {
      const field = this.meta.dbFields.get(clientKey);
      const dbName = field?.dbName ?? clientKey;
      const value = row[dbName];
      result[clientKey] = field?.toClient ? field.toClient(value) : value;
    }

    return result;
  }

  private pickDbPatchFields(
    dbData: Record<string, unknown>,
    clientKeys: string[],
  ): Record<string, unknown> {
    const picked: Record<string, unknown> = {};

    for (const clientKey of clientKeys) {
      const dbName = this.meta.clientToDbName.get(clientKey);
      if (!dbName) continue;

      if (dbData[dbName] !== undefined) {
        picked[dbName] = dbData[dbName];
      }
    }

    return picked;
  }

  private isWritableDbColumn(dbName: string): boolean {
    for (const field of this.meta.dbFields.values()) {
      if (field.dbName === dbName) return true;
    }

    return false;
  }

  private parseDbOnlyData(
    dbOnlyData?: DbOnlyArg<TDbOnly>,
    opts: { requireRequired: boolean } = { requireRequired: false },
  ): Record<string, unknown> {
    if (opts.requireRequired) {
      for (const requiredKey of this.meta.sqlOnlyRequiredClientFields) {
        if (!dbOnlyData || dbOnlyData[requiredKey] === undefined) {
          throw new Error(
            `Missing required sqlOnly field "${requiredKey}" for "${this.meta.tableName}".`,
          );
        }
      }
    }

    if (!dbOnlyData) return {};

    const parsed: Record<string, unknown> = {};

    for (const [clientKey, value] of Object.entries(dbOnlyData)) {
      if (!this.meta.sqlOnlyClientFields.has(clientKey)) {
        throw new Error(
          `Field "${clientKey}" is not a sqlOnly field on "${this.meta.tableName}".`,
        );
      }

      const validator = this.meta.sqlOnlyValidators.get(clientKey);
      const validValue = validator ? validator(value) : value;
      const field = this.meta.dbFields.get(clientKey);
      const dbName = field?.dbName ?? clientKey;

      parsed[dbName] = field?.toDb ? field.toDb(validValue) : validValue;
    }

    return parsed;
  }

  reconcileIds(clientData: unknown, ids: unknown): unknown {
    if (this.reconcile) {
      return this.reconcile(clientData).withServer(ids);
    }

    return this.reconcileFlatIds(clientData, ids);
  }

  private reconcileFlatIds(clientData: unknown, ids: unknown): unknown {
    if (Array.isArray(clientData)) {
      if (!Array.isArray(ids)) return clientData;
      return clientData.map((item, index) =>
        this.reconcileFlatIds(item, ids[index]),
      );
    }

    if (
      typeof clientData !== "object" ||
      clientData === null ||
      typeof ids !== "object" ||
      ids === null
    ) {
      return clientData;
    }

    return {
      ...(clientData as Record<string, unknown>),
      ...this.mapIdsToClientFields(ids as Record<string, unknown>),
    };
  }

  private mapIdsToClientFields(
    ids: Record<string, unknown>,
  ): Record<string, unknown> {
    const mapped: Record<string, unknown> = {};

    for (const [idKey, value] of Object.entries(ids)) {
      const clientKey = this.clientKeyForDbField(idKey);
      const field = this.meta.dbFields.get(clientKey);
      mapped[clientKey] = field?.toClient ? field.toClient(value) : value;
    }

    return mapped;
  }

  private clientKeyForDbField(dbField: string): string {
    for (const [clientKey, field] of this.meta.dbFields.entries()) {
      if (field.dbName === dbField) return clientKey;
    }

    return dbField;
  }

  private firstPkValue(ids: Record<string, unknown>): unknown {
    const pkField = this.meta.pkFields[0];
    if (pkField && ids[pkField] !== undefined) {
      return ids[pkField];
    }

    return Object.values(ids)[0];
  }

  async delete(id: unknown): Promise<{ deleted: boolean }> {
    const pkValues = Array.isArray(id) ? id : [id];
    const pkFields =
      this.meta.pkFields.length > 0
        ? this.meta.pkFields
        : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);

    const conditions = buildPkConditions(pkValues, pkFields);
    const qb = this.db as any;
    const result = await qb
      .deleteFrom(this.meta.tableName)
      .where(sql.join(conditions, sql` AND `))
      .execute();

    const numDeleted = result[0]?.numDeletedRows ?? 0n;
    return { deleted: Number(numDeleted) > 0 };
  }

  async count(where?: WhereInput<Partial<TClient>>): Promise<number> {
    const qb = this.db as any;
    let query = qb
      .selectFrom(this.meta.tableName)
      .select(sql<number>`count(*)`.as("count"));

    if (where) {
      const conditions = buildWhereConditions(
        where as Record<string, unknown>,
        this.meta,
      );
      if (conditions.length > 0) {
        query = query.where(sql.join(conditions, sql` AND `));
      }
    }

    const row = (await query.execute()) as Record<string, unknown>[];
    return Number(row[0]?.count ?? 0);
  }
}
