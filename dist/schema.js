import { z } from "zod";
import { v4 as uuid } from "uuid";
export const isFunction = (fn) => typeof fn === "function";
// Function to create a properly typed current timestamp config
export function currentTimeStamp() {
    return {
        default: "CURRENT_TIMESTAMP",
        defaultValue: new Date(),
    };
}
export const s = {
    initialState: (value) => {
        const actualValue = isFunction(value) ? value({ uuid }) : value;
        // Infer the Zod type from the primitive value
        let inferredZodType;
        if (typeof actualValue === "string") {
            inferredZodType = z.string();
        }
        else if (typeof actualValue === "number") {
            inferredZodType = z.number();
        }
        else if (typeof actualValue === "boolean") {
            inferredZodType = z.boolean();
        }
        else if (actualValue instanceof Date) {
            inferredZodType = z.date();
        }
        else if (actualValue === null) {
            inferredZodType = z.null();
        }
        else {
            inferredZodType = z.any();
        }
        return createBuilder({
            stage: "new",
            sqlConfig: null,
            sqlZod: z.undefined(),
            newZod: inferredZodType,
            initialValue: actualValue,
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
        defaultConfig: config, // This line is the crucial fix
    }),
    manyToMany: (config) => ({
        __type: "placeholder-relation",
        relationType: "manyToMany",
        defaultCount: config?.defaultCount ?? 0,
    }),
    sql: (sqlConfig) => {
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
                        baseType = z.boolean();
                        break;
                    case "date":
                    case "datetime":
                    case "timestamp":
                        baseType = z.date();
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
        return createBuilder({
            stage: "sql",
            sqlConfig: sqlConfig,
            sqlZod: sqlZodType,
            newZod: sqlZodType,
            initialValue: inferDefaultFromZod(sqlZodType, sqlConfig),
            clientZod: sqlZodType,
            validationZod: sqlZodType,
        });
    },
};
function createBuilder(config) {
    const completedStages = config.completedStages || new Set([config.stage]);
    const builderObject = {
        config: {
            sql: config.sqlConfig,
            zodSqlSchema: config.sqlZod,
            zodNewSchema: config.newZod,
            initialValue: config.initialValue ||
                inferDefaultFromZod(config.clientZod, config.sqlConfig),
            zodClientSchema: config.clientZod,
            zodValidationSchema: config.validationZod,
            clientTransform: config.clientTransform,
            validationTransform: config.validationTransform,
        },
        initialState: (options) => {
            if (completedStages.has("new")) {
                throw new Error("initialState() can only be called once in the chain");
            }
            const { value, schema: schemaOrModifier, clientPk } = options;
            let actualValue;
            let finalSchema;
            // 1. Determine the actual value
            if (value !== undefined) {
                actualValue = isFunction(value) ? value({ uuid }) : value;
            }
            else if (schemaOrModifier &&
                typeof schemaOrModifier === "object" &&
                "_def" in schemaOrModifier) {
                // If only a schema is provided, infer the default from it
                actualValue = inferDefaultFromZod(schemaOrModifier, config.sqlConfig);
            }
            // 2. Determine the final schema
            let baseSchema;
            if (schemaOrModifier &&
                typeof schemaOrModifier === "object" &&
                "_def" in schemaOrModifier) {
                // A raw Zod schema was passed
                finalSchema = schemaOrModifier;
            }
            else {
                // Base schema must be inferred from the value type
                if (typeof actualValue === "string")
                    baseSchema = z.string();
                else if (typeof actualValue === "number")
                    baseSchema = z.number();
                else if (typeof actualValue === "boolean")
                    baseSchema = z.boolean();
                else if (actualValue instanceof Date)
                    baseSchema = z.date();
                else if (actualValue === null)
                    baseSchema = z.null();
                else
                    baseSchema = z.any();
                if (isFunction(schemaOrModifier)) {
                    // A modifier function was passed
                    finalSchema = schemaOrModifier(baseSchema);
                }
                else {
                    // No schema/modifier, use the inferred base schema
                    finalSchema = baseSchema;
                }
            }
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("new");
            const newConfig = { ...config.sqlConfig };
            if (clientPk !== undefined) {
                // Store the boolean OR the function directly into the config
                newConfig.isClientPk = clientPk;
            }
            let clientAndServerSchema;
            if (clientPk) {
                // Always union for clientPk fields
                clientAndServerSchema = z.union([config.sqlZod, finalSchema]);
            }
            else if (schemaOrModifier) {
                // Schema provided without clientPk — use as-is
                clientAndServerSchema = finalSchema;
            }
            else {
                // No schema provided — union with SQL type
                clientAndServerSchema = z.union([config.sqlZod, finalSchema]);
            }
            return createBuilder({
                ...config,
                stage: "new",
                sqlConfig: newConfig,
                newZod: finalSchema,
                initialValue: actualValue,
                clientZod: clientAndServerSchema,
                validationZod: clientAndServerSchema,
                completedStages: newCompletedStages,
            });
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
        client: (assert) => {
            if (completedStages.has("client")) {
                throw new Error("client() can only be called once in the chain");
            }
            if (completedStages.has("server")) {
                throw new Error("client() must be called before validation()");
            }
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("client");
            if (config.stage === "relation") {
                return createBuilder({
                    ...config,
                    stage: "client",
                    completedStages: newCompletedStages,
                    clientTransform: (baseSchema) => {
                        if (isFunction(assert)) {
                            return assert({
                                sql: baseSchema,
                                initialState: config.newZod,
                            });
                        }
                        return assert;
                    },
                });
            }
            const clientSchema = isFunction(assert)
                ? assert({ sql: config.sqlZod, initialState: config.newZod })
                : assert;
            return createBuilder({
                ...config,
                stage: "client",
                clientZod: clientSchema,
                validationZod: clientSchema,
                completedStages: newCompletedStages,
            });
        },
        server: (assert) => {
            if (completedStages.has("server")) {
                throw new Error("validation() can only be called once in the chain");
            }
            const serverSchema = isFunction(assert)
                ? assert({
                    sql: config.sqlZod,
                    initialState: config.newZod,
                    client: config.clientZod,
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
            if (!completedStages.has("server") && !completedStages.has("client")) {
                throw new Error("transform() requires at least client() or validation() to be called first");
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
    // Create the enriched schema with all fields
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
        if (typeof sqlConfig.type === "string" &&
            ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
            // ...
        }
        const sqlTypeConfig = sqlConfig;
        if (sqlTypeConfig.type && !sqlTypeConfig.nullable) {
            switch (sqlTypeConfig.type) {
                case "varchar":
                case "text":
                case "char":
                case "longtext":
                    return "";
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
    const serverFields = {};
    const defaultValues = {};
    const defaultGenerators = {};
    const fieldTransforms = {};
    const clientToDbKeys = {};
    const dbToClientKeys = {};
    const fullSchema = { ...schema, ...(relations || {}) };
    let pkKeys = [];
    let clientPkKeys = [];
    for (const key in fullSchema) {
        const value = fullSchema[key];
        if (key === "_tableName" ||
            key.startsWith("__") ||
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
                clientToDbKeys[key] = dbFieldName;
                dbToClientKeys[dbFieldName] = key;
                sqlFields[dbFieldName] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
                serverFields[key] = config.zodValidationSchema;
                const initialValueOrFn = config.initialValue;
                defaultGenerators[key] = initialValueOrFn;
                let rawDefault = isFunction(initialValueOrFn)
                    ? initialValueOrFn({ uuid })
                    : initialValueOrFn;
                defaultValues[key] = rawDefault;
                if (config.transforms) {
                    fieldTransforms[key] = config.transforms;
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
            else {
                const dbFieldName = sqlConfig?.field || key;
                clientToDbKeys[key] = dbFieldName;
                dbToClientKeys[dbFieldName] = key;
                sqlFields[dbFieldName] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
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
    // --- NEW: SMART CHECKER BUILDER ---
    let isClientRecord = () => false;
    if (clientPkKeys.length > 0) {
        const checkers = [];
        for (const key of clientPkKeys) {
            const field = fullSchema[key];
            const sqlConfig = field?.config?.sql;
            const dbKey = sqlConfig?.field || key;
            const isClientPkVal = sqlConfig?.isClientPk;
            if (typeof isClientPkVal === "function") {
                // Explicit checker provided directly in the field!
                checkers.push({ clientKey: key, dbKey, check: isClientPkVal });
            }
            else {
                // Fallback auto-detection: If they just passed `true`
                const initialValueOrFn = field?.config?.initialValue;
                let sampleValue = initialValueOrFn;
                // Safely execute the function once to figure out its return type!
                if (isFunction(initialValueOrFn)) {
                    try {
                        sampleValue = initialValueOrFn({ uuid });
                    }
                    catch (e) {
                        // Ignore if the factory fails with a dummy payload
                    }
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
                    // Look at both the client shape key AND the db shape key safely
                    const val = record[clientKey] !== undefined ? record[clientKey] : record[dbKey];
                    return check(val);
                });
            };
        }
    }
    const generateDefaults = () => {
        const freshDefaults = {};
        for (const key in defaultGenerators) {
            const generatorOrValue = defaultGenerators[key];
            let rawValue = isFunction(generatorOrValue)
                ? generatorOrValue({ uuid })
                : generatorOrValue;
            freshDefaults[key] = fieldTransforms[key]?.toClient
                ? fieldTransforms[key].toClient(rawValue)
                : rawValue;
        }
        return freshDefaults;
    };
    const toClient = (dbObject) => {
        const clientObject = {};
        for (const dbKey in dbObject) {
            if (dbObject[dbKey] === undefined)
                continue;
            const clientKey = dbToClientKeys[dbKey] || dbKey;
            const transform = fieldTransforms[clientKey]?.toClient;
            clientObject[clientKey] = transform
                ? transform(dbObject[dbKey])
                : dbObject[dbKey];
        }
        return clientObject;
    };
    const toDb = (clientObject) => {
        const dbObject = {};
        for (const clientKey in clientObject) {
            if (clientObject[clientKey] === undefined)
                continue;
            const dbKey = clientToDbKeys[clientKey] || clientKey;
            const transform = fieldTransforms[clientKey]?.toDb;
            dbObject[dbKey] = transform
                ? transform(clientObject[clientKey])
                : clientObject[clientKey];
        }
        return dbObject;
    };
    const finalSqlSchema = z.object(sqlFields);
    const finalClientSchema = z.object(clientFields);
    const finalValidationSchema = z.object(serverFields);
    return {
        pk: pkKeys.length ? pkKeys : null,
        clientPk: clientPkKeys.length ? clientPkKeys : null,
        isClientRecord,
        sqlSchema: finalSqlSchema,
        clientSchema: finalClientSchema,
        serverSchema: finalValidationSchema,
        defaultValues: defaultValues,
        stateType: {},
        generateDefaults,
        toClient,
        toDb,
        parseForDb: (appData) => {
            const validData = finalValidationSchema.parse(appData);
            return toDb(validData);
        },
        parseFromDb: (dbData) => {
            const mappedData = toClient(dbData);
            return finalClientSchema.parse(mappedData);
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
                console.log(`Table ${currentRegistryKey} missing pk/clientPk:`, {
                    pk: registryEntry.zodSchemas?.pk,
                    clientPk: registryEntry.zodSchemas?.clientPk,
                });
                allTablesSupportsReconciliation = false;
            }
        }
        const baseSchema = schemaType === "server"
            ? registryEntry.zodSchemas.serverSchema
            : registryEntry.zodSchemas.clientSchema;
        const primitiveShape = baseSchema.shape;
        if (subSelection === true) {
            return z.object(primitiveShape);
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
        sql: registry[initialRegistryKey].zodSchemas.sqlSchema,
        client: buildView(initialRegistryKey, selection, "client"),
        server: buildView(initialRegistryKey, selection, "server"),
        supportsReconciliation: allTablesSupportsReconciliation,
    };
}
export function createSchemaBox(schemas, resolver) {
    const schemaProxy = new Proxy({}, {
        get(target, tableName) {
            const schema = schemas[tableName];
            if (!schema)
                return undefined;
            return new Proxy({}, {
                get(target, fieldName) {
                    const field = schema[fieldName];
                    if (field && typeof field === "object") {
                        return {
                            ...field,
                            __meta: {
                                _key: fieldName,
                                _fieldType: field,
                            },
                            __parentTableType: schema,
                        };
                    }
                    return field;
                },
            });
        },
    });
    const resolutionConfig = resolver(schemaProxy);
    const resolvedSchemas = schemas;
    for (const tableName in schemas) {
        for (const fieldName in schemas[tableName]) {
            const field = schemas[tableName][fieldName];
            if (isReference(field)) {
                const targetField = field.getter();
                if (targetField && targetField.config) {
                    const newConfig = {
                        ...targetField.config,
                        sql: { ...targetField.config.sql, isForeignKey: true },
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
                    newZod: zodSchema,
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
        };
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
    const cleanerRegistry = {};
    const tableNameToRegistryKeyMap = {};
    for (const key in finalRegistry) {
        const tableName = finalRegistry[key].rawSchema._tableName;
        tableNameToRegistryKeyMap[tableName] = key;
    }
    for (const tableName in finalRegistry) {
        const entry = finalRegistry[tableName];
        cleanerRegistry[tableName] = {
            definition: entry.rawSchema,
            schemaKey: tableName,
            schemas: {
                sql: entry.zodSchemas.sqlSchema,
                client: entry.zodSchemas.clientSchema,
                server: entry.zodSchemas.serverSchema,
            },
            transforms: {
                toClient: entry.zodSchemas.toClient,
                toDb: entry.zodSchemas.toDb,
            },
            parseForDb: entry.zodSchemas.parseForDb,
            parseFromDb: entry.zodSchemas.parseFromDb,
            defaults: entry.zodSchemas.defaultValues,
            stateType: entry.zodSchemas.stateType,
            generateDefaults: entry.zodSchemas.generateDefaults,
            pk: entry.zodSchemas.pk,
            clientPk: entry.zodSchemas.clientPk,
            isClientRecord: entry.zodSchemas.isClientRecord,
            nav: createNavProxy(tableName, finalRegistry),
            createView: (selection) => {
                const view = createViewObject(tableName, selection, finalRegistry, tableNameToRegistryKeyMap);
                const defaults = computeViewDefaults(tableName, selection, finalRegistry, tableNameToRegistryKeyMap);
                const deepToClient = (dbData, currentSelection, currentKey) => {
                    if (!dbData)
                        return dbData;
                    if (Array.isArray(dbData))
                        return dbData.map((item) => deepToClient(item, currentSelection, currentKey));
                    const regEntry = finalRegistry[currentKey];
                    const baseMapped = regEntry.zodSchemas.toClient(dbData);
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
                    return baseMapped;
                };
                // --- NEW: Implement recursive toDb ---
                const deepToDb = (clientData, currentSelection, currentKey) => {
                    if (!clientData)
                        return clientData;
                    if (Array.isArray(clientData))
                        return clientData.map((item) => deepToDb(item, currentSelection, currentKey));
                    const regEntry = finalRegistry[currentKey];
                    const baseMapped = regEntry.zodSchemas.toDb(clientData);
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
                // --- NEW: View To Db ---
                const viewToDb = (clientData) => deepToDb(clientData, selection, tableName);
                return {
                    definition: entry.rawSchema,
                    schemaKey: tableName,
                    schemas: {
                        sql: view.sql,
                        client: view.client,
                        server: view.server,
                    },
                    transforms: {
                        toClient: viewToClient,
                        toDb: viewToDb, // <--- UPDATED: now uses the recursive function
                    },
                    // --- UPDATED: uses view.server.parse to retain relation arrays/objects instead of stripping them
                    parseForDb: (appData) => {
                        const validData = view.server.parse(appData);
                        return viewToDb(validData);
                    },
                    parseFromDb: (dbData) => {
                        const mapped = viewToClient(dbData);
                        return view.client.parse(mapped);
                    },
                    defaults: defaults,
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
    const baseDefaults = { ...entry.zodSchemas.defaultValues };
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
