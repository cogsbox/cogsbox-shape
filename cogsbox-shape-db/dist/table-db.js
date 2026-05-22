import { Kysely, sql } from "kysely";
import { buildWhereConditions, buildPkConditions } from "./where-builder.js";
import { RecordNotFoundError } from "./errors.js";
export class TableDB {
    db;
    meta;
    transforms;
    reconcile;
    constructor(db, meta, transforms, reconcile) {
        this.db = db;
        this.meta = meta;
        this.transforms = transforms;
        this.reconcile = reconcile;
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
    insert(data) {
        return {
            ids: () => this.insertIds(data),
            full: async () => {
                const ids = await this.insertIds(data);
                return this.reconcileIds(data, ids);
            },
        };
    }
    async create(data) {
        return this.insert(data).ids();
    }
    async insertIds(data) {
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
            const dbPkField = this.meta.pkFields[0];
            return { [dbPkField]: Number(insertId) };
        }
        return {};
    }
    update(id, data) {
        return {
            ids: () => this.updateIds(id, data),
            full: async () => {
                const ids = await this.updateIds(id, data);
                const idValue = this.firstPkValue(ids);
                const row = await this.findById(idValue);
                if (!row) {
                    throw new RecordNotFoundError(this.meta.tableName, idValue);
                }
                return row;
            },
        };
    }
    async updateIds(id, data) {
        const pkValues = Array.isArray(id) ? id : [id];
        const pkFields = this.meta.pkFields.length > 0
            ? this.meta.pkFields
            : Array.from(this.meta.dbFields.values()).map((f) => f.dbName);
        const patchData = data;
        const deriveKeys = this.affectedDbBackedDerives(patchData);
        const missingDeps = this.missingDeriveDependencies(patchData, deriveKeys);
        const fetchedDeps = missingDeps.length > 0
            ? await this.fetchClientFieldsById(pkValues, pkFields, missingDeps)
            : {};
        const parseInput = { ...fetchedDeps, ...patchData };
        const parsedDbData = this.transforms.parsePatchForDb(parseInput);
        const dbData = this.pickDbPatchFields(parsedDbData, [
            ...Object.keys(patchData),
            ...deriveKeys,
        ]);
        const conditions = buildPkConditions(pkValues, pkFields);
        const qb = this.db;
        const result = await qb
            .updateTable(this.meta.tableName)
            .set(dbData)
            .where(sql.join(conditions, sql ` AND `))
            .execute();
        const numUpdated = result[0]?.numUpdatedRows ?? 0n;
        if (Number(numUpdated) === 0) {
            throw new RecordNotFoundError(this.meta.tableName, id);
        }
        const pkResult = {};
        for (let i = 0; i < pkFields.length; i++) {
            pkResult[pkFields[i]] = pkValues[i];
        }
        return pkResult;
    }
    affectedDbBackedDerives(patchData) {
        const patchKeys = new Set(Object.keys(patchData));
        const affected = [];
        for (const [deriveKey, deps] of this.meta.deriveDependencies.entries()) {
            if (!this.meta.dbFields.has(deriveKey))
                continue;
            if (deps.some((dep) => patchKeys.has(dep))) {
                affected.push(deriveKey);
            }
        }
        return affected;
    }
    missingDeriveDependencies(patchData, deriveKeys) {
        const patchKeys = new Set(Object.keys(patchData));
        const missing = new Set();
        for (const deriveKey of deriveKeys) {
            const deps = this.meta.deriveDependencies.get(deriveKey) ?? [];
            for (const dep of deps) {
                if (!patchKeys.has(dep))
                    missing.add(dep);
            }
        }
        return Array.from(missing).filter((dep) => this.meta.dbFields.has(dep));
    }
    async fetchClientFieldsById(pkValues, pkFields, clientFields) {
        const dbColumns = clientFields.map((clientKey) => {
            const field = this.meta.dbFields.get(clientKey);
            return field?.dbName ?? clientKey;
        });
        const conditions = buildPkConditions(pkValues, pkFields);
        const qb = this.db;
        const row = (await qb
            .selectFrom(this.meta.tableName)
            .select(dbColumns)
            .where(sql.join(conditions, sql ` AND `))
            .limit(1)
            .executeTakeFirst());
        if (!row) {
            throw new RecordNotFoundError(this.meta.tableName, pkValues);
        }
        const result = {};
        for (const clientKey of clientFields) {
            const field = this.meta.dbFields.get(clientKey);
            const dbName = field?.dbName ?? clientKey;
            const value = row[dbName];
            result[clientKey] = field?.toClient ? field.toClient(value) : value;
        }
        return result;
    }
    pickDbPatchFields(dbData, clientKeys) {
        const picked = {};
        for (const clientKey of clientKeys) {
            const dbName = this.meta.clientToDbName.get(clientKey) ?? clientKey;
            if (dbData[dbName] !== undefined) {
                picked[dbName] = dbData[dbName];
            }
        }
        return picked;
    }
    reconcileIds(clientData, ids) {
        if (this.reconcile) {
            return this.reconcile(clientData).withServer(ids);
        }
        return this.reconcileFlatIds(clientData, ids);
    }
    reconcileFlatIds(clientData, ids) {
        if (Array.isArray(clientData)) {
            if (!Array.isArray(ids))
                return clientData;
            return clientData.map((item, index) => this.reconcileFlatIds(item, ids[index]));
        }
        if (typeof clientData !== "object" ||
            clientData === null ||
            typeof ids !== "object" ||
            ids === null) {
            return clientData;
        }
        return {
            ...clientData,
            ...this.mapIdsToClientFields(ids),
        };
    }
    mapIdsToClientFields(ids) {
        const mapped = {};
        for (const [idKey, value] of Object.entries(ids)) {
            const clientKey = this.clientKeyForDbField(idKey);
            const field = this.meta.dbFields.get(clientKey);
            mapped[clientKey] = field?.toClient ? field.toClient(value) : value;
        }
        return mapped;
    }
    clientKeyForDbField(dbField) {
        for (const [clientKey, field] of this.meta.dbFields.entries()) {
            if (field.dbName === dbField)
                return clientKey;
        }
        return dbField;
    }
    firstPkValue(ids) {
        const pkField = this.meta.pkFields[0];
        if (pkField && ids[pkField] !== undefined) {
            return ids[pkField];
        }
        return Object.values(ids)[0];
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
