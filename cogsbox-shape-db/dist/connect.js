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
    const sqlOnlyClientFields = new Set();
    const sqlOnlyRequiredClientFields = new Set();
    const sqlOnlyValidators = new Map();
    const deriveDependencies = new Map(Object.entries((entry.deriveDependencies ?? {})));
    if (!definition) {
        return {
            tableName,
            dbFields,
            clientToDbName,
            pkFields,
            clientPkFields,
            sqlOnlyFields,
            sqlOnlyClientFields,
            sqlOnlyRequiredClientFields,
            sqlOnlyValidators,
            deriveDependencies,
        };
    }
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
        if (sqlConfig.isClientPk && !sqlConfig.isForeignKey) {
            clientPkFields.push(key);
        }
        if (sqlConfig.sqlOnly) {
            sqlOnlyFields.add(dbName);
            sqlOnlyClientFields.add(key);
            if (!sqlConfig.nullable &&
                !Object.prototype.hasOwnProperty.call(sqlConfig, "default") &&
                !Object.prototype.hasOwnProperty.call(sqlConfig, "defaultValue")) {
                sqlOnlyRequiredClientFields.add(key);
            }
            const zodSqlSchema = config.zodSqlSchema;
            if (zodSqlSchema?.parse) {
                sqlOnlyValidators.set(key, (val) => zodSqlSchema.parse(val));
            }
        }
    }
    return {
        tableName,
        dbFields,
        clientToDbName,
        pkFields,
        clientPkFields,
        sqlOnlyFields,
        sqlOnlyClientFields,
        sqlOnlyRequiredClientFields,
        sqlOnlyValidators,
        deriveDependencies,
    };
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
            if (prop in tableDb) {
                const value = Reflect.get(tableDb, prop, tableDb);
                return typeof value === "function" ? value.bind(tableDb) : value;
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
function registryKeyForTableName(registry, tableName) {
    return Object.keys(registry).find((key) => registry[key]?.rawSchema?._tableName === tableName);
}
function dbNameForClientKey(meta, clientKey) {
    return meta.clientToDbName.get(clientKey) ?? clientKey;
}
function clientKeyForRelationTarget(targetField, targetDefinition) {
    const metaKey = targetField?.__meta?._key;
    if (typeof metaKey === "string")
        return metaKey;
    for (const [key, field] of Object.entries(targetDefinition)) {
        if (field === targetField)
            return key;
    }
    return undefined;
}
function createViewHydrator(db, registry, baseRegistryKey, selection) {
    const metas = new Map();
    const getMeta = (registryKey) => {
        let meta = metas.get(registryKey);
        if (!meta) {
            const entry = registry[registryKey];
            meta = extractTableMeta({
                definition: entry?.rawSchema,
                deriveDependencies: entry?.deriveDependencies,
            });
            metas.set(registryKey, meta);
        }
        return meta;
    };
    const hydrate = async (row, currentRegistryKey, currentSelection) => {
        if (!row || typeof currentSelection !== "object")
            return row;
        const currentEntry = registry[currentRegistryKey];
        if (!currentEntry)
            return row;
        const currentMeta = getMeta(currentRegistryKey);
        const hydrated = { ...row };
        for (const [relationKey, relationSelection] of Object.entries(currentSelection)) {
            if (!relationSelection)
                continue;
            const relationField = currentEntry.rawSchema?.[relationKey];
            const relationConfig = relationField?.config?.sql;
            if (!relationConfig?.schema)
                continue;
            const targetTableName = relationConfig.schema()._tableName;
            const targetRegistryKey = registryKeyForTableName(registry, targetTableName);
            if (!targetRegistryKey)
                continue;
            const targetEntry = registry[targetRegistryKey];
            const targetMeta = getMeta(targetRegistryKey);
            const fromDbName = dbNameForClientKey(currentMeta, relationConfig.fromKey);
            const targetClientKey = clientKeyForRelationTarget(relationConfig.toKey?.(), targetEntry.rawSchema);
            if (!targetClientKey)
                continue;
            const targetDbName = dbNameForClientKey(targetMeta, targetClientKey);
            const fromValue = row[fromDbName];
            if (fromValue === undefined || fromValue === null) {
                hydrated[relationKey] = ["hasMany", "manyToMany"].includes(relationConfig.type)
                    ? []
                    : null;
                continue;
            }
            const qb = db;
            const relatedRows = (await qb
                .selectFrom(targetMeta.tableName)
                .selectAll()
                .where(targetDbName, "=", fromValue)
                .execute());
            const hydratedRelated = await Promise.all(relatedRows.map((relatedRow) => hydrate(relatedRow, targetRegistryKey, relationSelection)));
            hydrated[relationKey] = ["hasMany", "manyToMany"].includes(relationConfig.type)
                ? hydratedRelated
                : hydratedRelated[0] ?? null;
        }
        return hydrated;
    };
    return (row) => hydrate(row, baseRegistryKey, selection);
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
                    const registry = view.__registry;
                    const baseTable = view.baseTable;
                    const viewSelection = view.viewSelection;
                    const hydrateRow = registry && baseTable && viewSelection
                        ? createViewHydrator(db, registry, baseTable, viewSelection)
                        : undefined;
                    const viewDb = new TableDB(db, viewMeta, {
                        toClient: viewTransforms.toClient ?? ((r) => r),
                        toDb: viewTransforms.toDb ?? ((r) => r),
                        parseForDb: viewTransforms.parseForDb ?? ((r) => r),
                        parsePatchForDb: viewTransforms.parsePatchForDb ?? viewTransforms.toDb ?? ((r) => r),
                        parseFromDb: viewTransforms.parseFromDb ?? ((r) => r),
                    }, reconcile, hydrateRow);
                    return new Proxy(view, {
                        get(target, prop, receiver) {
                            if (prop in viewDb) {
                                const value = Reflect.get(viewDb, prop, viewDb);
                                return typeof value === "function" ? value.bind(viewDb) : value;
                            }
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
    result.transaction = transaction;
    return result;
}
