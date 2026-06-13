import { z } from "zod";
import { v4 as uuid } from "uuid";
export const isFunction = (fn) => typeof fn === "function";
export function currentTimeStamp() {
    return {
        default: "CURRENT_TIMESTAMP",
        defaultValue: new Date(),
    };
}
function createSqlBuilder(dialect, sqlConfig) {
    const sqlZodType = (() => {
        let baseType;
        if (sqlConfig.pk) {
            baseType = z.number();
        }
        else {
            switch (sqlConfig.type) {
                case "int":
                    baseType = z.number();
                    break;
                case "boolean":
                    baseType = z.number();
                    break;
                case "date":
                case "datetime":
                case "timestamp":
                    baseType = z.date();
                    break;
                case "enum":
                    baseType = z.enum(sqlConfig.values);
                    break;
                default:
                    baseType = z.string();
                    break;
            }
        }
        if (sqlConfig.nullable) {
            baseType = baseType.nullable();
        }
        return baseType;
    })();
    const dialectConfig = { ...sqlConfig, dialect };
    return createBuilder({
        stage: "sql",
        sqlConfig: dialectConfig,
        sqlZod: sqlZodType,
        initialValue: inferDefaultFromZod(sqlZodType, dialectConfig),
        clientZod: sqlZodType,
        validationZod: sqlZodType,
    });
}
function isClientOptions(value) {
    return (value !== undefined &&
        typeof value === "object" &&
        value !== null &&
        !isFunction(value) &&
        !("_def" in value) &&
        !("parse" in value) &&
        ("value" in value || "schema" in value || "clientPk" in value));
}
export const s = {
    client: (...args) => {
        const first = args[0];
        if (isClientOptions(first)) {
            return createBuilder({
                stage: "sql",
                sqlConfig: null,
                sqlZod: z.undefined(),
                initialValue: undefined,
                clientZod: z.undefined(),
                validationZod: z.undefined(),
            }).client(first);
        }
        const value = first;
        const sample = isFunction(value) ? value({ uuid }) : value;
        let inferredZodType;
        if (typeof sample === "string") {
            inferredZodType = z.string();
        }
        else if (typeof sample === "number") {
            inferredZodType = z.number();
        }
        else if (typeof sample === "boolean") {
            inferredZodType = z.boolean();
        }
        else if (sample instanceof Date) {
            inferredZodType = z.date();
        }
        else if (sample === null) {
            inferredZodType = z.null();
        }
        else {
            inferredZodType = z.any();
        }
        return createBuilder({
            stage: "client",
            sqlConfig: null,
            sqlZod: z.undefined(),
            initialValue: value,
            clientZod: inferredZodType,
            validationZod: inferredZodType,
        });
    },
    reference: (getter) => ({
        __type: "reference",
        getter: getter,
    }),
    hasMany: (config) => ({
        __type: "placeholder-relation",
        relationType: "hasMany",
        defaultCount: config && typeof config === "object" && "count" in config
            ? config.count
            : 0,
        defaultConfig: config,
    }),
    hasOne: (config) => ({
        __type: "placeholder-relation",
        relationType: "hasOne",
        defaultConfig: config,
    }),
    manyToMany: (config) => ({
        __type: "placeholder-relation",
        relationType: "manyToMany",
        defaultCount: config?.defaultCount ?? 0,
    }),
    sqlite: (sqlConfig) => createSqlBuilder("sqlite", sqlConfig),
    postgres: (sqlConfig) => createSqlBuilder("postgres", sqlConfig),
    mysql: (sqlConfig) => createSqlBuilder("mysql", sqlConfig),
};
function createBuilder(config) {
    const completedStages = config.completedStages || new Set([config.stage]);
    const builderObject = {
        config: {
            sql: config.sqlConfig,
            zodSqlSchema: config.sqlZod,
            initialValue: config.initialValue ||
                inferDefaultFromZod(config.clientZod, config.sqlConfig),
            zodClientSchema: config.clientInputZod || config.clientZod,
            zodClientCheckedSchema: config.clientZod,
            zodValidationSchema: config.validationZod,
            clientTransform: config.clientTransform,
            validationTransform: config.validationTransform,
        },
        reference: (fieldGetter) => {
            return createBuilder({
                ...config,
                sqlConfig: {
                    ...config.sqlConfig,
                    reference: fieldGetter,
                },
            });
        },
        client: (...args) => {
            if (completedStages.has("client")) {
                throw new Error("client() can only be called once in the chain");
            }
            if (completedStages.has("server")) {
                throw new Error("client() must be called before server()");
            }
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("client");
            let optionsOrSchema = args[0];
            if (config.stage === "relation") {
                const assert = typeof optionsOrSchema === "function" ||
                    optionsOrSchema instanceof z.ZodType
                    ? optionsOrSchema
                    : optionsOrSchema?.schema;
                return createBuilder({
                    ...config,
                    stage: "client",
                    completedStages: newCompletedStages,
                    clientZod: assert,
                    clientInputZod: assert,
                    clientTransform: (baseSchema) => {
                        if (isFunction(assert)) {
                            return assert({ sql: baseSchema });
                        }
                        return assert;
                    },
                });
            }
            let isDirectShortcut = false;
            let isValueAndSchemaShortcut = false;
            let options = {};
            if (optionsOrSchema !== undefined &&
                typeof optionsOrSchema === "function") {
                if (args.length === 2 && isFunction(args[1])) {
                    isValueAndSchemaShortcut = true;
                    options = {
                        schema: optionsOrSchema,
                        value: args[1],
                    };
                }
                else {
                    options = { schema: optionsOrSchema };
                    isDirectShortcut = true;
                }
            }
            else if (optionsOrSchema !== undefined &&
                typeof optionsOrSchema === "object" &&
                !("_def" in optionsOrSchema) &&
                !("parse" in optionsOrSchema) &&
                (optionsOrSchema.value !== undefined ||
                    optionsOrSchema.schema !== undefined ||
                    optionsOrSchema.clientPk !== undefined)) {
                options = optionsOrSchema;
            }
            else if (optionsOrSchema !== undefined) {
                options = { schema: optionsOrSchema };
                isDirectShortcut = true;
            }
            const { value, schema: schemaOrModifier, clientPk } = options;
            let actualValue = config.initialValue;
            let finalSchema;
            if (value !== undefined) {
                actualValue = value;
            }
            else if (schemaOrModifier &&
                typeof schemaOrModifier === "object" &&
                "_def" in schemaOrModifier) {
                if (config.sqlZod instanceof z.ZodUndefined ||
                    actualValue === undefined) {
                    actualValue = inferDefaultFromZod(schemaOrModifier, config.sqlConfig);
                }
            }
            let baseSchema;
            if (schemaOrModifier &&
                typeof schemaOrModifier === "object" &&
                "_def" in schemaOrModifier) {
                finalSchema = schemaOrModifier;
            }
            else {
                if (value !== undefined) {
                    const sample = isFunction(value) ? value({ uuid }) : value;
                    if (typeof sample === "string")
                        baseSchema = z.string();
                    else if (typeof sample === "number")
                        baseSchema = z.number();
                    else if (typeof sample === "boolean")
                        baseSchema = z.boolean();
                    else if (sample instanceof Date)
                        baseSchema = z.date();
                    else if (sample === null)
                        baseSchema = z.null();
                    else
                        baseSchema = z.any();
                }
                else {
                    baseSchema = config.clientZod;
                }
                if (isFunction(schemaOrModifier)) {
                    if (isDirectShortcut) {
                        finalSchema = schemaOrModifier({ sql: config.sqlZod });
                    }
                    else {
                        finalSchema = schemaOrModifier(baseSchema);
                    }
                }
                else {
                    finalSchema = baseSchema;
                }
            }
            const newConfig = { ...config.sqlConfig };
            if (clientPk !== undefined) {
                newConfig.isClientPk = clientPk;
            }
            let clientAndServerSchema;
            if (clientPk) {
                clientAndServerSchema = z.union([config.sqlZod, finalSchema]);
            }
            else if (schemaOrModifier !== undefined) {
                if (isDirectShortcut) {
                    clientAndServerSchema = finalSchema;
                }
                else {
                    clientAndServerSchema = finalSchema;
                }
            }
            else {
                if (config.sqlZod instanceof z.ZodUndefined) {
                    clientAndServerSchema = finalSchema;
                }
                else {
                    clientAndServerSchema = z.union([config.sqlZod, finalSchema]);
                }
            }
            return createBuilder({
                ...config,
                stage: "client",
                sqlConfig: newConfig,
                initialValue: actualValue,
                clientZod: clientAndServerSchema,
                clientInputZod: finalSchema,
                validationZod: clientAndServerSchema,
                completedStages: newCompletedStages,
            });
        },
        clientCheck: (assert) => {
            if (completedStages.has("server")) {
                throw new Error("client() must be called before server()");
            }
            const clientSchema = isFunction(assert)
                ? assert({
                    sql: config.sqlZod,
                    client: config.clientInputZod || config.clientZod,
                    clientCheck: config.clientZod,
                })
                : assert;
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("client");
            const newConfig = {
                ...config,
                stage: "client",
                clientZod: clientSchema,
                validationZod: clientSchema,
                completedStages: newCompletedStages,
            };
            if (config.clientInputZod !== undefined) {
                newConfig.clientInputZod = config.clientInputZod;
            }
            return createBuilder(newConfig);
        },
        server: (assert) => {
            if (completedStages.has("server")) {
                throw new Error("server() can only be called once in the chain");
            }
            const serverSchema = isFunction(assert)
                ? assert({
                    sql: config.sqlZod,
                    client: config.clientInputZod || config.clientZod,
                    clientCheck: config.clientZod,
                })
                : assert;
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("server");
            return createBuilder({
                ...config,
                stage: "server",
                validationZod: serverSchema,
                completedStages: newCompletedStages,
            });
        },
        transform: (transforms) => {
            if (!completedStages.has("server") &&
                !completedStages.has("client")) {
                throw new Error("transform() requires at least client() or server() to be called first");
            }
            return {
                config: {
                    ...builderObject.config,
                    transforms: {
                        toClient: transforms.toClient,
                        toDb: transforms.toDb,
                    },
                },
            };
        },
    };
    return builderObject;
}
export const SchemaWrapperBrand = Symbol("SchemaWrapper");
export function schema(schema) {
    const enrichedSchema = {};
    for (const key in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, key)) {
            if (key === "_tableName") {
                enrichedSchema[key] = schema[key];
            }
            else {
                enrichedSchema[key] = {
                    ...schema[key],
                    __meta: { _key: key, _fieldType: schema[key] },
                    __parentTableType: schema,
                };
            }
        }
    }
    enrichedSchema[SchemaWrapperBrand] = true;
    enrichedSchema.__primaryKeySQL = undefined;
    enrichedSchema.__derives = undefined;
    enrichedSchema.__refines = undefined;
    enrichedSchema.primaryKeySQL = function (definer) {
        const pkFieldsOnly = {};
        for (const key in schema) {
            const field = schema[key];
            if (field &&
                typeof field === "object" &&
                field.config?.sql?.pk === true) {
                pkFieldsOnly[key] = schema[key];
            }
        }
        enrichedSchema.__primaryKeySQL = definer(pkFieldsOnly);
        return enrichedSchema;
    };
    enrichedSchema.derive = function (derivers) {
        enrichedSchema.__derives = derivers;
        return enrichedSchema;
    };
    enrichedSchema.refine = function (fn) {
        const r = (layers, check, deps) => {
            const layerArr = Array.isArray(layers) ? layers : [layers];
            return {
                layers: layerArr,
                deps: deps ? (Array.isArray(deps) ? deps : [deps]) : null,
                check,
            };
        };
        enrichedSchema.__refines = fn(r);
        return enrichedSchema;
    };
    return enrichedSchema;
}
function inferDefaultFromZod(zodType, sqlConfig) {
    if (sqlConfig &&
        "default" in sqlConfig &&
        sqlConfig.default === "CURRENT_TIMESTAMP") {
        return undefined;
    }
    if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
        if ("default" in sqlConfig && sqlConfig.default !== undefined) {
            return sqlConfig.default;
        }
        const sqlTypeConfig = sqlConfig;
        if (sqlTypeConfig.type && !sqlTypeConfig.nullable) {
            switch (sqlTypeConfig.type) {
                case "varchar":
                case "text":
                case "char":
                case "longtext":
                    return "";
                case "enum":
                    return sqlTypeConfig.default ?? sqlTypeConfig.values[0];
                case "int":
                    return 0;
                case "boolean":
                    return false;
                case "date":
                case "datetime":
                case "timestamp":
                    return new Date();
            }
        }
        if (sqlTypeConfig.nullable) {
            return null;
        }
    }
    if ("_def" in zodType && "defaultValue" in zodType._def) {
        const def = zodType._def;
        const val = def.defaultValue;
        if (val !== undefined) {
            return typeof val === "function" ? val() : val;
        }
    }
    if (zodType instanceof z.ZodString) {
        return "";
    }
    return undefined;
}
function isReference(value) {
    return value && typeof value === "object" && value.__type === "reference";
}
export function createSchema(schema, relations) {
    const sqlFields = {};
    const clientFields = {};
    const clientCheckedFields = {};
    const serverFields = {};
    const defaultValues = {};
    const defaultGenerators = {};
    const fieldTransforms = {};
    const clientToDbKeys = {};
    const dbToClientKeys = {};
    const sqlOnlyDbKeys = new Set();
    const fullSchema = { ...schema, ...(relations || {}) };
    let pkKeys = [];
    let clientPkKeys = [];
    const derives = schema.__derives;
    const refineGroups = schema.__refines;
    for (const key in fullSchema) {
        const value = fullSchema[key];
        if (key === "_tableName" ||
            key.startsWith("__") ||
            key === "derive" ||
            key === String(SchemaWrapperBrand) ||
            key === "primaryKeySQL" ||
            typeof value === "function")
            continue;
        const definition = fullSchema[key];
        if (isReference(definition)) {
            const targetField = definition.getter();
            if (targetField && targetField.config) {
                const config = targetField.config;
                const dbFieldName = config.sql?.field || key;
                sqlFields[dbFieldName] = config.zodSqlSchema;
                if (config.sql?.sqlOnly) {
                    sqlOnlyDbKeys.add(dbFieldName);
                }
                else {
                    clientToDbKeys[key] = dbFieldName;
                    dbToClientKeys[dbFieldName] = key;
                    clientFields[key] = config.zodClientSchema;
                    clientCheckedFields[key] = config.zodClientCheckedSchema;
                    serverFields[key] = config.zodValidationSchema;
                    const initialValueOrFn = config.initialValue;
                    defaultGenerators[key] = initialValueOrFn;
                    let rawDefault = isFunction(initialValueOrFn)
                        ? initialValueOrFn({ uuid })
                        : initialValueOrFn;
                    if (config.transforms?.toClient && rawDefault !== undefined) {
                        defaultValues[key] = config.transforms.toClient(rawDefault);
                    }
                    else {
                        defaultValues[key] = rawDefault;
                    }
                    if (config.transforms) {
                        fieldTransforms[key] = config.transforms;
                    }
                }
            }
            continue;
        }
        if (definition && definition.config) {
            const config = definition.config;
            if (config.sql?.pk && !config.sql?.isForeignKey)
                pkKeys.push(key);
            if (config.sql?.isClientPk)
                clientPkKeys.push(key);
            const sqlConfig = config.sql;
            if (sqlConfig &&
                typeof sqlConfig === "object" &&
                ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                continue;
            }
            else if (sqlConfig) {
                const dbFieldName = sqlConfig.field || key;
                sqlFields[dbFieldName] = config.zodSqlSchema;
                if (sqlConfig.sqlOnly) {
                    sqlOnlyDbKeys.add(dbFieldName);
                }
                else {
                    clientToDbKeys[key] = dbFieldName;
                    dbToClientKeys[dbFieldName] = key;
                    clientFields[key] = config.zodClientSchema;
                    clientCheckedFields[key] = config.zodClientCheckedSchema;
                    serverFields[key] = config.zodValidationSchema;
                    if (config.transforms) {
                        fieldTransforms[key] = config.transforms;
                    }
                    const initialValueOrFn = config.initialValue;
                    defaultGenerators[key] = initialValueOrFn;
                    let rawDefault = isFunction(initialValueOrFn)
                        ? initialValueOrFn({ uuid })
                        : initialValueOrFn;
                    if (config.transforms?.toClient && rawDefault !== undefined) {
                        defaultValues[key] = config.transforms.toClient(rawDefault);
                    }
                    else {
                        defaultValues[key] = rawDefault;
                    }
                }
            }
            else {
                clientFields[key] = config.zodClientSchema;
                clientCheckedFields[key] = config.zodClientCheckedSchema;
                serverFields[key] = config.zodValidationSchema;
                if (config.transforms) {
                    fieldTransforms[key] = config.transforms;
                }
                const initialValueOrFn = config.initialValue;
                defaultGenerators[key] = initialValueOrFn;
                let rawDefault = isFunction(initialValueOrFn)
                    ? initialValueOrFn({ uuid })
                    : initialValueOrFn;
                if (config.transforms?.toClient && rawDefault !== undefined) {
                    defaultValues[key] = config.transforms.toClient(rawDefault);
                }
                else {
                    defaultValues[key] = rawDefault;
                }
            }
        }
    }
    let isClientRecord = () => false;
    if (clientPkKeys.length > 0) {
        const checkers = [];
        for (const key of clientPkKeys) {
            const field = fullSchema[key];
            const sqlConfig = field?.config?.sql;
            const dbKey = sqlConfig?.field || key;
            const isClientPkVal = sqlConfig?.isClientPk;
            if (typeof isClientPkVal === "function") {
                checkers.push({ clientKey: key, dbKey, check: isClientPkVal });
            }
            else {
                const initialValueOrFn = field?.config?.initialValue;
                let sampleValue = initialValueOrFn;
                if (isFunction(initialValueOrFn)) {
                    try {
                        sampleValue = initialValueOrFn({ uuid });
                    }
                    catch (e) { }
                }
                if (sqlConfig?.type === "int" && typeof sampleValue === "string") {
                    checkers.push({
                        clientKey: key,
                        dbKey,
                        check: (val) => typeof val === "string",
                    });
                }
            }
        }
        if (checkers.length > 0) {
            isClientRecord = (record) => {
                if (!record || typeof record !== "object")
                    return false;
                return checkers.some(({ clientKey, dbKey, check }) => {
                    const val = record[clientKey] !== undefined ? record[clientKey] : record[dbKey];
                    return check(val);
                });
            };
        }
    }
    const generateDefaults = () => {
        const freshDefaults = {};
        for (const key in defaultGenerators) {
            // ... same logic for mapping standard defaults ...
            const generatorOrValue = defaultGenerators[key];
            let rawValue = isFunction(generatorOrValue)
                ? generatorOrValue({ uuid })
                : generatorOrValue;
            freshDefaults[key] = fieldTransforms[key]?.toClient
                ? fieldTransforms[key].toClient(rawValue)
                : rawValue;
        }
        // Only apply client derivations
        if (derives?.forClient) {
            for (const key in derives.forClient) {
                freshDefaults[key] = derives.forClient[key]?.(freshDefaults);
            }
        }
        return freshDefaults;
    };
    const toClient = (dbObject) => {
        const clientObject = {};
        for (const dbKey in dbObject) {
            if (dbObject[dbKey] === undefined)
                continue;
            if (sqlOnlyDbKeys.has(dbKey))
                continue;
            const clientKey = dbToClientKeys[dbKey] || dbKey;
            const transform = fieldTransforms[clientKey]?.toClient;
            clientObject[clientKey] = transform
                ? transform(dbObject[dbKey])
                : dbObject[dbKey];
        }
        // Only apply Client derives AFTER mapping standard fields
        if (derives?.forClient) {
            for (const key in derives.forClient) {
                clientObject[key] = derives.forClient[key]?.(clientObject);
            }
        }
        return clientObject;
    };
    const toDb = (clientObject) => {
        const dbObject = {};
        // 1. Map standard client fields to DB fields
        for (const clientKey in clientObject) {
            if (clientObject[clientKey] === undefined)
                continue;
            const dbKey = clientToDbKeys[clientKey];
            if (!dbKey)
                continue;
            const transform = fieldTransforms[clientKey]?.toDb;
            dbObject[dbKey] = transform
                ? transform(clientObject[clientKey])
                : clientObject[clientKey];
        }
        // 2. Map Database ONLY derives directly to the dbObject
        if (derives?.forDb) {
            for (const schemaKey in derives.forDb) {
                // Resolve custom DB column name if they used s.sqlite({ field: "custom_name" })
                const sqlConfig = fullSchema[schemaKey]?.config?.sql;
                const dbKey = sqlConfig?.field || schemaKey;
                dbObject[dbKey] = derives.forDb[schemaKey]?.(clientObject);
            }
        }
        return dbObject;
    };
    const finalSqlSchema = z.object(sqlFields);
    const finalClientSchema = z.object(clientFields);
    const finalClientCheckedSchema = z.object(clientCheckedFields);
    const finalValidationSchema = z.object(serverFields);
    const deriveDependencies = {};
    const trackDeriveDependencies = (deriveGroup) => {
        if (!deriveGroup)
            return;
        const trackingSeed = { ...defaultValues };
        for (const key in deriveGroup) {
            const accessed = new Set();
            const trackingRow = new Proxy(trackingSeed, {
                get(target, prop, receiver) {
                    if (typeof prop === "string" && prop !== key) {
                        accessed.add(prop);
                    }
                    return Reflect.get(target, prop, receiver);
                },
            });
            try {
                deriveGroup[key]?.(trackingRow);
            }
            catch (e) { }
            deriveDependencies[key] = Array.from(new Set([...(deriveDependencies[key] ?? []), ...accessed]));
        }
    };
    trackDeriveDependencies(derives?.forClient);
    trackDeriveDependencies(derives?.forDb);
    let refinedSqlSchema = finalSqlSchema;
    let refinedClientSchema = finalClientSchema;
    let refinedClientCheckedSchema = finalClientCheckedSchema;
    let refinedValidationSchema = finalValidationSchema;
    const fieldToGroup = {};
    if (refineGroups) {
        for (let i = 0; i < refineGroups.length; i++) {
            const entry = refineGroups[i];
            let { layers, deps, check } = entry;
            const applyTo = layers.includes("all")
                ? ["sql", "client", "clientCheck", "server"]
                : layers;
            // Track deps from proxy if not provided explicitly
            if (!deps) {
                const accessed = new Set();
                const trackingRow = new Proxy(defaultValues, {
                    get(target, prop, receiver) {
                        if (typeof prop === "string")
                            accessed.add(prop);
                        return Reflect.get(target, prop, receiver);
                    },
                });
                try {
                    check(trackingRow);
                }
                catch (e) { }
                deps = Array.from(accessed);
                entry.deps = deps;
            }
            for (const dep of deps) {
                if (!fieldToGroup[dep])
                    fieldToGroup[dep] = [];
                fieldToGroup[dep].push(i);
            }
            const refineFn = (data, ctx) => {
                const result = check(data);
                if (!result)
                    return;
                const errors = Array.isArray(result) ? result : [result];
                for (const err of errors) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: err.message,
                        path: err.path,
                    });
                }
            };
            for (const layer of applyTo) {
                switch (layer) {
                    case "sql":
                        refinedSqlSchema = refinedSqlSchema.superRefine(refineFn);
                        break;
                    case "client":
                        refinedClientSchema = refinedClientSchema.superRefine(refineFn);
                        break;
                    case "clientCheck":
                        refinedClientCheckedSchema = refinedClientCheckedSchema.superRefine(refineFn);
                        break;
                    case "server":
                        refinedValidationSchema = refinedValidationSchema.superRefine(refineFn);
                        break;
                }
            }
        }
    }
    return {
        pk: pkKeys.length ? pkKeys : null,
        clientPk: clientPkKeys.length ? clientPkKeys : null,
        deriveDependencies,
        refineInfo: { groups: refineGroups ?? [], fieldToGroup },
        isClientRecord,
        sqlSchema: refinedSqlSchema,
        clientSchema: refinedClientSchema,
        clientCheckedSchema: refinedClientCheckedSchema,
        serverSchema: refinedValidationSchema,
        defaultValues: defaultValues,
        stateType: {},
        generateDefaults,
        toClient,
        toDb,
        parseForDb: (appData) => {
            const validData = refinedValidationSchema.parse(appData);
            return toDb(validData);
        },
        parsePatchForDb: (patchData) => {
            const validPatch = finalValidationSchema.partial().parse(patchData);
            return toDb(validPatch);
        },
        parseFromDb: (dbData) => {
            const parsed = refinedSqlSchema.parse(dbData);
            return toClient(parsed);
        },
    };
}
function createViewObject(initialRegistryKey, selection, registry, tableNameToRegistryKeyMap) {
    let allTablesSupportsReconciliation = true;
    const checkedTables = {};
    function buildView(currentRegistryKey, subSelection, schemaType) {
        const registryEntry = registry[currentRegistryKey];
        if (!registryEntry) {
            throw new Error(`Schema with key "${currentRegistryKey}" not found in the registry.`);
        }
        if (!(currentRegistryKey in checkedTables)) {
            const hasPks = !!(registryEntry.zodSchemas?.pk &&
                registryEntry.zodSchemas.pk.length > 0 &&
                registryEntry.zodSchemas?.clientPk &&
                registryEntry.zodSchemas.clientPk.length > 0);
            checkedTables[currentRegistryKey] = hasPks;
            if (!hasPks) {
                allTablesSupportsReconciliation = false;
            }
        }
        const baseSchema = schemaType === "clientChecked"
            ? registryEntry.zodSchemas.clientCheckedSchema
            : schemaType === "server"
                ? registryEntry.zodSchemas.serverSchema
                : schemaType === "sql"
                    ? registryEntry.zodSchemas.sqlSchema
                    : registryEntry.zodSchemas.clientSchema;
        const primitiveShape = baseSchema.shape;
        if (subSelection === true) {
            return baseSchema;
        }
        const selectedRelationShapes = {};
        if (typeof subSelection === "object") {
            for (const relationKey in subSelection) {
                const relationBuilder = registryEntry.rawSchema[relationKey];
                const isRelation = relationBuilder?.config?.sql?.schema;
                if (subSelection[relationKey] && isRelation) {
                    const relationConfig = relationBuilder.config.sql;
                    const targetTableName = relationConfig.schema()._tableName;
                    const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
                    if (!nextRegistryKey) {
                        throw new Error(`Could not resolve registry key for table "${targetTableName}"`);
                    }
                    const relationSchema = buildView(nextRegistryKey, subSelection[relationKey], schemaType);
                    if (["hasMany", "manyToMany"].includes(relationConfig.type)) {
                        selectedRelationShapes[relationKey] = z.array(relationSchema);
                    }
                    else {
                        selectedRelationShapes[relationKey] = relationSchema.nullable();
                    }
                }
            }
        }
        const finalShape = { ...primitiveShape, ...selectedRelationShapes };
        return z.object(finalShape);
    }
    return {
        sql: buildView(initialRegistryKey, selection, "sql"),
        client: buildView(initialRegistryKey, selection, "client"),
        clientChecked: buildView(initialRegistryKey, selection, "clientChecked"),
        server: buildView(initialRegistryKey, selection, "server"),
        supportsReconciliation: allTablesSupportsReconciliation,
    };
}
export function createSchemaBox(schemas, resolutions) {
    const resolutionConfig = resolutions;
    const resolvedSchemas = schemas;
    for (const tableName in schemas) {
        for (const fieldName in schemas[tableName]) {
            const field = schemas[tableName][fieldName];
            if (isReference(field)) {
                const targetField = field.getter();
                if (targetField && targetField.config) {
                    const newConfig = {
                        ...targetField.config,
                        sql: {
                            ...targetField.config.sql,
                            field: fieldName,
                            isForeignKey: true,
                        },
                    };
                    resolvedSchemas[tableName][fieldName] = {
                        ...targetField,
                        config: newConfig,
                    };
                }
                else {
                    throw new Error(`Could not resolve reference for ${tableName}.${fieldName}`);
                }
            }
        }
    }
    for (const tableName in schemas) {
        const tableConfig = resolutionConfig[tableName];
        if (!tableConfig)
            continue;
        for (const fieldName in tableConfig) {
            const field = schemas[tableName][fieldName];
            const resolution = tableConfig[fieldName];
            if (field && field.__type === "placeholder-relation") {
                const targetKey = resolution.toKey;
                if (!targetKey || !targetKey.__parentTableType) {
                    throw new Error(`Could not resolve relation for ${tableName}.${fieldName}`);
                }
                const targetSchema = targetKey.__parentTableType;
                const relationType = field.relationType;
                const defaultCount = field.defaultCount || resolution.defaultCount;
                const zodSchema = relationType === "hasMany" || relationType === "manyToMany"
                    ? z.array(z.any())
                    : z.any();
                const initialValue = relationType === "hasMany" || relationType === "manyToMany"
                    ? Array.from({ length: defaultCount || 0 }, () => ({}))
                    : {};
                const resolvedBuilder = createBuilder({
                    stage: "relation",
                    sqlConfig: {
                        type: relationType,
                        fromKey: resolution.fromKey,
                        toKey: () => targetKey,
                        schema: () => targetSchema,
                        defaultCount: defaultCount,
                        defaultConfig: field.defaultConfig,
                    },
                    sqlZod: zodSchema,
                    initialValue,
                    clientZod: zodSchema,
                    validationZod: zodSchema,
                });
                resolvedSchemas[tableName][fieldName] = resolvedBuilder;
            }
        }
    }
    const finalRegistry = {};
    for (const tableName in resolvedSchemas) {
        const zodSchemas = createSchema(resolvedSchemas[tableName]);
        finalRegistry[tableName] = {
            rawSchema: resolvedSchemas[tableName],
            zodSchemas: zodSchemas,
            transforms: {
                toClient: zodSchemas.toClient,
                toDb: zodSchemas.toDb,
                parseForDb: zodSchemas.parseForDb,
                parsePatchForDb: zodSchemas.parsePatchForDb,
                parseFromDb: zodSchemas.parseFromDb,
            },
            pk: zodSchemas.pk,
            clientPk: zodSchemas.clientPk,
            deriveDependencies: zodSchemas.deriveDependencies,
            refineInfo: zodSchemas.refineInfo,
            isClientRecord: zodSchemas.isClientRecord,
            generateDefaults: zodSchemas.generateDefaults,
        };
    }
    const cleanerRegistry = {};
    const tableNameToRegistryKeyMap = {};
    for (const key in finalRegistry) {
        const tableName = finalRegistry[key].rawSchema._tableName;
        tableNameToRegistryKeyMap[tableName] = key;
    }
    for (const tableName in finalRegistry) {
        const entry = finalRegistry[tableName];
        const rawSchema = entry.rawSchema;
        const tableDef = { ...entry.generateDefaults() };
        for (const key in rawSchema) {
            if (key === "_tableName" || key.startsWith("__"))
                continue;
            const field = rawSchema[key];
            if (!field?.config?.sql)
                continue;
            const sqlConfig = field.config.sql;
            if (sqlConfig.schema) {
                const targetTableName = sqlConfig.schema()._tableName;
                const targetRegKey = tableNameToRegistryKeyMap[targetTableName];
                if (targetRegKey && finalRegistry[targetRegKey]) {
                    const targetEntry = finalRegistry[targetRegKey];
                    const targetDefaults = targetEntry.generateDefaults();
                    if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
                        const count = sqlConfig?.defaultCount || 1;
                        tableDef[key] = Array.from({ length: count }, () => targetDefaults);
                        tableDef[`__def__${key}`] = targetDefaults;
                    }
                    else {
                        tableDef[key] =
                            sqlConfig.defaultConfig === null ? null : targetDefaults;
                        tableDef[`__def__${key}`] = targetDefaults;
                    }
                }
            }
        }
        entry.zodSchemas.defaultsDefinition = tableDef;
    }
    const createNavProxy = (currentTable, registry) => {
        return new Proxy({}, {
            get(target, relationName) {
                const schema = registry[currentTable]?.rawSchema;
                if (!schema)
                    return undefined;
                const field = schema[relationName];
                if (!field?.config?.sql?.schema)
                    return undefined;
                const targetSchema = field.config.sql.schema();
                const targetTable = targetSchema?._tableName;
                if (targetTable && registry[targetTable]) {
                    return createNavProxy(targetTable, registry);
                }
                return undefined;
            },
        });
    };
    for (const tableName in finalRegistry) {
        const entry = finalRegistry[tableName];
        cleanerRegistry[tableName] = {
            definition: entry.rawSchema,
            schemaKey: tableName,
            schemas: {
                sql: entry.zodSchemas.sqlSchema,
                client: entry.zodSchemas.clientSchema,
                clientChecked: entry.zodSchemas.clientCheckedSchema,
                server: entry.zodSchemas.serverSchema,
            },
            transforms: {
                toClient: entry.transforms.toClient,
                toDb: entry.transforms.toDb,
                parseForDb: entry.transforms.parseForDb,
                parsePatchForDb: entry.transforms.parsePatchForDb,
                parseFromDb: entry.transforms.parseFromDb,
            },
            defaults: entry.generateDefaults(),
            defaultsDefinition: entry.zodSchemas.defaultsDefinition,
            stateType: entry.zodSchemas.stateType,
            generateDefaults: entry.generateDefaults,
            pk: entry.pk,
            clientPk: entry.clientPk,
            deriveDependencies: entry.deriveDependencies,
            refineInfo: entry.refineInfo,
            isClientRecord: entry.isClientRecord,
            nav: createNavProxy(tableName, finalRegistry),
            createView: (selection) => {
                const view = createViewObject(tableName, selection, finalRegistry, tableNameToRegistryKeyMap);
                const deepToClient = (dbData, currentSelection, currentKey) => {
                    if (!dbData)
                        return dbData;
                    if (Array.isArray(dbData))
                        return dbData.map((item) => deepToClient(item, currentSelection, currentKey));
                    const regEntry = finalRegistry[currentKey];
                    const baseMapped = { ...regEntry.transforms.toClient(dbData) };
                    if (typeof currentSelection === "object") {
                        for (const relKey in currentSelection) {
                            if (currentSelection[relKey] &&
                                dbData[relKey] !== undefined &&
                                dbData[relKey] !== null) {
                                const relField = regEntry.rawSchema[relKey];
                                if (relField?.config?.sql?.schema) {
                                    const targetTableName = relField.config.sql.schema()._tableName;
                                    const nextRegKey = tableNameToRegistryKeyMap[targetTableName];
                                    if (nextRegKey) {
                                        baseMapped[relKey] = deepToClient(dbData[relKey], currentSelection[relKey], nextRegKey);
                                    }
                                }
                            }
                        }
                    }
                    if (regEntry.rawSchema.__derives?.forClient) {
                        for (const key in regEntry.rawSchema.__derives.forClient) {
                            baseMapped[key] =
                                regEntry.rawSchema.__derives.forClient[key](baseMapped);
                        }
                    }
                    return baseMapped;
                };
                const deepToDb = (clientData, currentSelection, currentKey) => {
                    if (!clientData)
                        return clientData;
                    if (Array.isArray(clientData))
                        return clientData.map((item) => deepToDb(item, currentSelection, currentKey));
                    const regEntry = finalRegistry[currentKey];
                    const baseMapped = regEntry.transforms.toDb(clientData);
                    if (typeof currentSelection === "object") {
                        for (const relKey in currentSelection) {
                            if (currentSelection[relKey] &&
                                clientData[relKey] !== undefined &&
                                clientData[relKey] !== null) {
                                const relField = regEntry.rawSchema[relKey];
                                if (relField?.config?.sql?.schema) {
                                    const targetTableName = relField.config.sql.schema()._tableName;
                                    const nextRegKey = tableNameToRegistryKeyMap[targetTableName];
                                    if (nextRegKey) {
                                        baseMapped[relKey] = deepToDb(clientData[relKey], currentSelection[relKey], nextRegKey);
                                    }
                                }
                            }
                        }
                    }
                    return baseMapped;
                };
                const viewToClient = (dbData) => deepToClient(dbData, selection, tableName);
                const viewToDb = (clientData) => deepToDb(clientData, selection, tableName);
                const reconcile = (clientData) => {
                    return {
                        withServer: (serverData) => {
                            const parsedServerData = viewToClient(serverData);
                            const mergeTrees = (cNode, sNode, tableKey, sel) => {
                                if (sNode === undefined || sNode === null)
                                    return cNode;
                                if (cNode === undefined || cNode === null)
                                    return sNode;
                                const regEntry = finalRegistry[tableKey];
                                const clientPkField = regEntry.clientPk?.[0] || regEntry.pk?.[0];
                                const dbPkField = regEntry.pk?.[0] || clientPkField;
                                if (Array.isArray(cNode)) {
                                    if (!Array.isArray(sNode))
                                        return cNode;
                                    return cNode.map((cItem, index) => {
                                        let sItem = undefined;
                                        if (clientPkField && cItem[clientPkField] !== undefined) {
                                            sItem = sNode.find((s) => s[clientPkField] === cItem[clientPkField]);
                                        }
                                        if (!sItem && dbPkField && cItem[dbPkField] !== undefined) {
                                            sItem = sNode.find((s) => s[dbPkField] === cItem[dbPkField]);
                                        }
                                        if (!sItem && sNode[index]) {
                                            sItem = sNode[index];
                                        }
                                        return mergeTrees(cItem, sItem, tableKey, sel);
                                    });
                                }
                                if (typeof cNode === "object" && typeof sNode === "object") {
                                    const merged = { ...cNode };
                                    for (const key in sNode) {
                                        const selValue = typeof sel === "object" ? sel[key] : undefined;
                                        const relField = regEntry.rawSchema[key];
                                        const isRelation = !!(selValue && relField?.config?.sql?.schema);
                                        if (isRelation) {
                                            const nextTableKey = tableNameToRegistryKeyMap[relField.config.sql.schema()._tableName];
                                            merged[key] = mergeTrees(cNode[key], sNode[key], nextTableKey, selValue);
                                        }
                                        else {
                                            merged[key] = sNode[key];
                                        }
                                    }
                                    if (clientPkField &&
                                        dbPkField &&
                                        clientPkField !== dbPkField &&
                                        merged[dbPkField] !== undefined &&
                                        merged[dbPkField] !== null) {
                                        delete merged[clientPkField];
                                    }
                                    return merged;
                                }
                                return sNode !== undefined ? sNode : cNode;
                            };
                            return mergeTrees(clientData, parsedServerData, tableName, selection);
                        },
                    };
                };
                return {
                    definition: entry.rawSchema,
                    schemaKey: tableName,
                    schemas: {
                        sql: view.sql,
                        client: view.client,
                        clientChecked: view.clientChecked,
                        server: view.server,
                    },
                    transforms: {
                        toClient: viewToClient,
                        toDb: viewToDb,
                        parseForDb: (appData) => {
                            const validData = view.server.parse(appData);
                            return viewToDb(validData);
                        },
                        parsePatchForDb: (patchData) => {
                            const validPatch = view.server.partial().parse(patchData);
                            return viewToDb(validPatch);
                        },
                        parseFromDb: (dbData) => {
                            const mappedData = view.sql.parse(dbData);
                            return viewToClient(mappedData);
                        },
                    },
                    reconcile,
                    defaults: () => computeViewDefaults(tableName, selection, finalRegistry, tableNameToRegistryKeyMap),
                    defaultsDefinition: () => computeViewDefaultsDefinition(tableName, selection, finalRegistry, tableNameToRegistryKeyMap),
                    pk: entry.zodSchemas.pk,
                    clientPk: entry.zodSchemas.clientPk,
                    supportsReconciliation: view.supportsReconciliation,
                    isView: true,
                    viewSelection: selection,
                    baseTable: tableName,
                    __registry: finalRegistry,
                };
            },
            RelationSelection: {},
            __registry: finalRegistry,
        };
    }
    return cleanerRegistry;
}
function computeViewDefaults(currentRegistryKey, selection, registry, tableNameToRegistryKeyMap, visited = new Set()) {
    if (visited.has(currentRegistryKey)) {
        return undefined;
    }
    visited.add(currentRegistryKey);
    const entry = registry[currentRegistryKey];
    if (!entry) {
        console.warn(`Could not find entry for key "${currentRegistryKey}" in registry while computing defaults.`);
        return {};
    }
    const rawSchema = entry.rawSchema;
    const baseDefaults = entry.generateDefaults();
    if (selection === true || typeof selection !== "object") {
        return baseDefaults;
    }
    for (const key in selection) {
        if (!selection[key])
            continue;
        const field = rawSchema[key];
        if (!field?.config?.sql?.schema)
            continue;
        const relationConfig = field.config.sql;
        const targetTableName = relationConfig.schema()._tableName;
        const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
        if (!nextRegistryKey)
            continue;
        const defaultConfig = relationConfig.defaultConfig;
        if (defaultConfig === undefined) {
            delete baseDefaults[key];
        }
        else if (defaultConfig === null) {
            baseDefaults[key] = null;
        }
        else if (Array.isArray(defaultConfig)) {
            baseDefaults[key] = [];
        }
        else if (relationConfig.type === "hasMany" ||
            relationConfig.type === "manyToMany") {
            const count = defaultConfig?.count || relationConfig.defaultCount || 1;
            baseDefaults[key] = Array.from({ length: count }, () => computeViewDefaults(nextRegistryKey, selection[key], registry, tableNameToRegistryKeyMap, new Set(visited)));
        }
        else {
            baseDefaults[key] = computeViewDefaults(nextRegistryKey, selection[key], registry, tableNameToRegistryKeyMap, new Set(visited));
        }
    }
    return baseDefaults;
}
function computeViewDefaultsDefinition(currentRegistryKey, selection, registry, tableNameToRegistryKeyMap, visited = new Set()) {
    if (visited.has(currentRegistryKey)) {
        return undefined;
    }
    visited.add(currentRegistryKey);
    const entry = registry[currentRegistryKey];
    if (!entry) {
        return {};
    }
    const baseDef = { ...entry.generateDefaults() };
    for (const key in entry.rawSchema) {
        if (key === "_tableName" || key.startsWith("__"))
            continue;
        const field = entry.rawSchema[key];
        if (!field?.config?.sql)
            continue;
        const sqlConfig = field.config.sql;
        if (sqlConfig.schema) {
            const targetTableName = sqlConfig.schema()._tableName;
            const nextRegKey = tableNameToRegistryKeyMap[targetTableName];
            if (!nextRegKey)
                continue;
            const targetEntry = registry[nextRegKey];
            const targetDefaults = targetEntry.generateDefaults();
            if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
                const count = sqlConfig?.defaultCount || 1;
                baseDef[key] = Array.from({ length: count }, () => targetDefaults);
                baseDef[`__def__${key}`] = targetDefaults;
            }
            else {
                baseDef[key] = sqlConfig.defaultConfig === null ? null : targetDefaults;
                baseDef[`__def__${key}`] = targetDefaults;
            }
        }
    }
    if (selection === true || typeof selection !== "object") {
        return baseDef;
    }
    const result = { ...baseDef };
    for (const key in selection) {
        if (!selection[key])
            continue;
        const field = entry.rawSchema[key];
        if (!field?.config?.sql?.schema)
            continue;
        const relationConfig = field.config.sql;
        const targetTableName = relationConfig.schema()._tableName;
        const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
        if (!nextRegistryKey)
            continue;
        const nestedDef = computeViewDefaultsDefinition(nextRegistryKey, selection[key], registry, tableNameToRegistryKeyMap, new Set(visited));
        if (nestedDef) {
            result[`__def__${key}`] = nestedDef;
            if (relationConfig.type === "hasMany" ||
                relationConfig.type === "manyToMany") {
                const count = relationConfig?.defaultCount || 1;
                result[key] = Array.from({ length: count }, () => nestedDef);
            }
            else {
                result[key] = relationConfig.defaultConfig === null ? null : nestedDef;
            }
        }
    }
    return result;
}
