import { Kysely, sql } from "kysely";
import { buildWhereConditions, buildPkConditions } from "./where-builder.js";
import { RecordNotFoundError } from "./errors.js";
export class TableDB {
    db;
    meta;
    transforms;
    constructor(db, meta, transforms) {
        this.db = db;
        this.meta = meta;
        this.transforms = transforms;
    }
    async findMany(opts) {
        const qb = this.db;
        let query = qb.selectFrom(this.meta.tableName).selectAll();
        if (opts?.where) {
            const conditions = buildWhereConditions(opts.where, this.meta);
            if (conditions.length > 0) {
                query = query.where(sql.join(conditions, sql ` AND `));
            }
        }
        if (opts?.orderBy) {
            for (const [col, dir] of Object.entries(opts.orderBy)) {
                if (dir) {
                    const field = this.meta.dbFields.get(col);
                    const dbCol = field?.dbName ?? col;
                    query = query.orderBy(dbCol, dir);
                }
            }
        }
        const limit = opts?.limit ?? 100;
        query = query.limit(limit);
        if (opts?.offset !== undefined) {
            query = query.offset(opts.offset);
        }
        const rows = (await query.execute());
        return rows.map((r) => this.transforms.parseFromDb(r));
    }
    async findById(id) {
        const pkValues = Array.isArray(id) ? id : [id];
        const pkFields = this.meta.pkFields.length > 0
            ? this.meta.pkFields
            : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);
        const conditions = buildPkConditions(pkValues, pkFields);
        const qb = this.db;
        const rows = await qb
            .selectFrom(this.meta.tableName)
            .selectAll()
            .where(sql.join(conditions, sql ` AND `))
            .limit(1)
            .execute();
        const row = rows[0] ?? null;
        if (!row)
            return null;
        return this.transforms.parseFromDb(row);
    }
    async create(data) {
        const dbData = this.transforms.parseForDb(data);
        const clientPkClientKeys = this.meta.clientPkFields;
        const pkDbNames = new Set(clientPkClientKeys.map((k) => {
            const field = this.meta.dbFields.get(k);
            return field?.dbName ?? k;
        }));
        const insertData = {};
        for (const key of Object.keys(dbData)) {
            if (!pkDbNames.has(key)) {
                insertData[key] = dbData[key];
            }
        }
        const qb = this.db;
        const result = await qb
            .insertInto(this.meta.tableName)
            .values(insertData)
            .execute();
        const insertId = result[0]?.insertId;
        if (insertId !== undefined && this.meta.pkFields.length > 0) {
            const row = await this.findById(Number(insertId));
            if (row)
                return row;
        }
        return this.transforms.parseFromDb(dbData);
    }
    async update(id, data) {
        const pkValues = Array.isArray(id) ? id : [id];
        const pkFields = this.meta.pkFields.length > 0
            ? this.meta.pkFields
            : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);
        const dbData = this.transforms.toDb(data);
        const conditions = buildPkConditions(pkValues, pkFields);
        const qb = this.db;
        await qb
            .updateTable(this.meta.tableName)
            .set(dbData)
            .where(sql.join(conditions, sql ` AND `))
            .execute();
        const row = await this.findById(pkValues.length === 1 ? pkValues[0] : pkValues);
        if (row)
            return row;
        throw new RecordNotFoundError(this.meta.tableName, id);
    }
    async delete(id) {
        const pkValues = Array.isArray(id) ? id : [id];
        const pkFields = this.meta.pkFields.length > 0
            ? this.meta.pkFields
            : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);
        const conditions = buildPkConditions(pkValues, pkFields);
        const qb = this.db;
        const result = await qb
            .deleteFrom(this.meta.tableName)
            .where(sql.join(conditions, sql ` AND `))
            .execute();
        const numDeleted = result[0]?.numDeletedRows ?? 0n;
        return { deleted: Number(numDeleted) > 0 };
    }
    async count(where) {
        const qb = this.db;
        let query = qb
            .selectFrom(this.meta.tableName)
            .select(sql `count(*)`.as("count"));
        if (where) {
            const conditions = buildWhereConditions(where, this.meta);
            if (conditions.length > 0) {
                query = query.where(sql.join(conditions, sql ` AND `));
            }
        }
        const row = (await query.execute());
        return Number(row[0]?.count ?? 0);
    }
}
