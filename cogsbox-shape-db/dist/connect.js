import { Kysely } from "kysely";
import { TableDB } from "./table-db.js";
function extractTableMeta(entry) {
    const definition = entry.definition;
    const tableName = definition?._tableName ?? "unknown";
    const dbFields = new Map();
    const clientToDbName = new Map();
    const pkFields = [];
    const clientPkFields = [];
    const sqlOnlyFields = new Set();
    if (!definition)
        return { tableName, dbFields, clientToDbName, pkFields, clientPkFields, sqlOnlyFields };
    for (const [key, field] of Object.entries(definition)) {
        if (key === "_tableName" || key.startsWith("__"))
            continue;
        if (typeof field !== "object" || field === null)
            continue;
        const config = field.config;
        if (!config)
            continue;
        const sqlConfig = config.sql;
        if (!sqlConfig)
            continue;
        const type = sqlConfig.type;
        if (type && ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(type))
            continue;
        const dbName = sqlConfig.field ?? key;
        const transforms = config.transforms;
        dbFields.set(key, {
            dbName,
            toDb: transforms?.toDb,
            toClient: transforms?.toClient,
        });
        clientToDbName.set(key, dbName);
        if (sqlConfig.pk)
            pkFields.push(dbName);
        if (sqlConfig.isClientPk)
            clientPkFields.push(key);
        if (sqlConfig.sqlOnly)
            sqlOnlyFields.add(dbName);
    }
    return { tableName, dbFields, clientToDbName, pkFields, clientPkFields, sqlOnlyFields };
}
function enhanceTable(entry, meta, db) {
    const transforms = entry.transforms ?? {};
    const tableDb = new TableDB(db, meta, {
        toClient: transforms.toClient ?? ((r) => r),
        toDb: transforms.toDb ?? ((r) => r),
        parseForDb: transforms.parseForDb ?? ((r) => r),
        parsePatchForDb: transforms.parsePatchForDb ?? transforms.toDb ?? ((r) => r),
        parseFromDb: transforms.parseFromDb ?? ((r) => r),
    });
    return new Proxy(entry, {
        get(target, prop, receiver) {
            if (prop === "db")
                return tableDb;
            return Reflect.get(target, prop, receiver);
        },
    });
}
export function connect(box, db) {
    const result = {};
    for (const key of Object.keys(box)) {
        const entry = box[key];
        if (typeof entry !== "object" || entry === null) {
            result[key] = entry;
            continue;
        }
        if ("definition" in entry && "schemas" in entry && "transforms" in entry) {
            const meta = extractTableMeta(entry);
            result[key] = enhanceTable(entry, meta, db);
            const originalCreateView = entry.createView;
            if (originalCreateView) {
                result[key].createView = (selection) => {
                    const view = originalCreateView(selection);
                    const viewMeta = { ...meta };
                    const viewTransforms = view.transforms ?? {};
                    const reconcile = view.reconcile;
                    const viewDb = new TableDB(db, viewMeta, {
                        toClient: viewTransforms.toClient ?? ((r) => r),
                        toDb: viewTransforms.toDb ?? ((r) => r),
                        parseForDb: viewTransforms.parseForDb ?? ((r) => r),
                        parsePatchForDb: viewTransforms.parsePatchForDb ?? viewTransforms.toDb ?? ((r) => r),
                        parseFromDb: viewTransforms.parseFromDb ?? ((r) => r),
                    }, reconcile);
                    return new Proxy(view, {
                        get(target, prop, receiver) {
                            if (prop === "db")
                                return viewDb;
                            return Reflect.get(target, prop, receiver);
                        },
                    });
                };
            }
        }
        else {
            result[key] = entry;
        }
    }
    const transaction = async (fn) => {
        return db.transaction().execute(async (trx) => {
            const txBox = connect(box, trx);
            return fn(txBox);
        });
    };
    result.db = { transaction };
    return result;
}
