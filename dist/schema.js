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
            // THE MAGIC: There is no SQL config and the SQL schema is z.undefined()
            // This guarantees the field will be stripped from the final SQL schema object.
            sqlConfig: null,
            sqlZod: z.undefined(),
            // The rest of the schemas are based on the inferred type
            newZod: inferredZodType,
            initialValue: actualValue,
            clientZod: inferredZodType,
            validationZod: inferredZodType, // This is our internal name
        }); // Using `as any` to simplify the complex return type
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
// PASTE THIS ENTIRE FUNCTION OVER YOUR EXISTING createBuilder
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
            clientTransform: config.clientTransform, // <-- FIX: Make sure transform is passed through
            validationTransform: config.validationTransform, // <-- FIX: Make sure transform is passed through
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
            if (clientPk) {
                newConfig.isClientPk = true;
            }
            // When clientPk is true, ALWAYS union the SQL type with the client type
            // because records can be either DB-sourced (number) or client-created (string)
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
                    // Store the transform function to be used later
                    clientTransform: (baseSchema) => {
                        if (isFunction(assert)) {
                            // We use `as any` here to resolve the complex generic type error.
                            // It's safe because we know the baseSchema will have the necessary Zod methods.
                            return assert({
                                sql: baseSchema,
                                initialState: config.newZod,
                            });
                        }
                        return assert;
                    },
                });
            }
            // This is the original logic for non-relation fields
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
        server: (
        // ... this validation function remains unchanged ...
        assert) => {
            if (completedStages.has("server")) {
                throw new Error("validation() can only be called once in the chain");
            }
            const validationSchema = isFunction(assert)
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
                validationZod: validationSchema,
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
    // Add private properties
    enrichedSchema.__primaryKeySQL = undefined;
    enrichedSchema.__isClientChecker = undefined;
    // Add methods directly
    enrichedSchema.primaryKeySQL = function (definer) {
        const pkFieldsOnly = {};
        // Find all PK fields
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
    enrichedSchema.isClient = function (checker) {
        enrichedSchema.__isClientChecker = checker;
        return enrichedSchema;
    };
    return enrichedSchema;
}
function inferDefaultFromZod(zodType, sqlConfig) {
    // --- START OF FIX ---
    // If the database is responsible for the default, the client shouldn't generate a value.
    if (sqlConfig &&
        "default" in sqlConfig &&
        sqlConfig.default === "CURRENT_TIMESTAMP") {
        return undefined;
    }
    // --- END OF FIX ---
    if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
        if ("default" in sqlConfig && sqlConfig.default !== undefined) {
            // This part now runs only if default is not CURRENT_TIMESTAMP
            return sqlConfig.default;
        }
        if (typeof sqlConfig.type === "string" &&
            ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
            // ... (rest of the function is unchanged)
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
                case "timestamp": // Added timestamp here for completeness
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
export function createMixedValidationSchema(schema, clientSchema, dbSchema) {
    // If schemas are provided, use them (to avoid circular calls)
    if (clientSchema && dbSchema) {
        const mixedFields = {};
        const allKeys = new Set([
            ...Object.keys(clientSchema.shape),
            ...Object.keys(dbSchema.shape),
        ]);
        for (const key of allKeys) {
            const clientField = clientSchema.shape[key];
            const dbField = dbSchema.shape[key];
            if (clientField && dbField) {
                mixedFields[key] = z.union([clientField, dbField]);
            }
            else {
                mixedFields[key] = clientField || dbField;
            }
        }
        return z.object(mixedFields);
    }
    // Build schemas manually without calling createSchema
    const clientFields = {};
    const dbFields = {};
    for (const [key, value] of Object.entries(schema)) {
        if (key === "_tableName")
            continue;
        if (typeof value === "function") {
            const relation = value();
            if (!isRelation(relation))
                continue;
            // For relations, create mixed schemas recursively
            const childMixedSchema = createMixedValidationSchema(relation.schema);
            if (relation.type === "hasMany") {
                clientFields[key] = z.array(childMixedSchema);
                dbFields[key] = z.array(childMixedSchema);
            }
            else {
                clientFields[key] = childMixedSchema;
                dbFields[key] = childMixedSchema;
            }
            continue;
        }
        clientFields[key] = value.zodClientSchema;
        dbFields[key] = value.zodDbSchema;
    }
    // Now create mixed fields
    const mixedFields = {};
    const allKeys = new Set([
        ...Object.keys(clientFields),
        ...Object.keys(dbFields),
    ]);
    for (const key of allKeys) {
        const clientField = clientFields[key];
        const dbField = dbFields[key];
        if (clientField && dbField) {
            mixedFields[key] = z.union([clientField, dbField]);
        }
        else {
            mixedFields[key] = (clientField || dbField);
        }
    }
    return z.object(mixedFields);
}
function isRelation(value) {
    return (value &&
        typeof value === "object" &&
        "type" in value &&
        "fromKey" in value &&
        "toKey" in value &&
        "schema" in value);
}
// Helper to check if something is a reference
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
    const fullSchema = { ...schema, ...(relations || {}) };
    let pkKeys = [];
    let clientPkKeys = [];
    // FIRST PASS: Collect all fields and PKs
    for (const key in fullSchema) {
        const value = fullSchema[key];
        if (key === "_tableName" ||
            key.startsWith("__") ||
            key === String(SchemaWrapperBrand) ||
            key === "isClient" ||
            key === "primaryKeySQL" ||
            typeof value === "function")
            continue;
        const definition = fullSchema[key];
        if (isReference(definition)) {
            const targetField = definition.getter();
            if (targetField && targetField.config) {
                const config = targetField.config;
                sqlFields[key] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
                serverFields[key] = config.zodValidationSchema;
                const initialValueOrFn = config.initialValue;
                defaultGenerators[key] = initialValueOrFn;
                defaultValues[key] = inferDefaultFromZod(config.zodClientSchema, {
                    ...config.sql,
                    default: undefined,
                });
                if (config.transforms) {
                    fieldTransforms[key] = config.transforms;
                }
            }
            continue;
        }
        if (definition && definition.config) {
            const config = definition.config;
            // ... pk collection logic ...
            const sqlConfig = config.sql;
            if (sqlConfig &&
                typeof sqlConfig === "object" &&
                ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                continue;
            }
            else {
                sqlFields[key] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
                serverFields[key] = config.zodValidationSchema;
                if (config.transforms) {
                    fieldTransforms[key] = config.transforms;
                }
                const initialValueOrFn = config.initialValue;
                defaultGenerators[key] = initialValueOrFn;
                // Get the raw default value
                let rawDefault = isFunction(initialValueOrFn)
                    ? initialValueOrFn()
                    : initialValueOrFn;
                // Apply toClient transform if it exists
                if (config.transforms?.toClient && rawDefault !== undefined) {
                    defaultValues[key] = config.transforms.toClient(rawDefault);
                }
                else {
                    defaultValues[key] = rawDefault;
                }
            }
        }
    }
    // AFTER THE LOOP: Build isClientRecord checker
    let isClientRecord;
    const explicitChecker = fullSchema.__isClientChecker;
    if (explicitChecker) {
        isClientRecord = explicitChecker;
    }
    else if (clientPkKeys.length > 0) {
        const autoChecks = [];
        for (const key of clientPkKeys) {
            const field = fullSchema[key];
            const sqlType = field?.config?.sql?.type;
            const initialValue = field?.config?.initialValue;
            const dbIsNumeric = sqlType === "int";
            const clientIsString = typeof initialValue === "string";
            if (dbIsNumeric && clientIsString) {
                autoChecks.push({ key, check: (val) => typeof val === "string" });
            }
        }
        if (autoChecks.length > 0) {
            isClientRecord = (record) => autoChecks.some(({ key, check }) => check(record[key]));
        }
    }
    const generateDefaults = () => {
        const freshDefaults = {};
        for (const key in defaultGenerators) {
            const generatorOrValue = defaultGenerators[key];
            let rawValue = isFunction(generatorOrValue)
                ? generatorOrValue()
                : generatorOrValue;
            // Apply toClient transform if it exists
            if (fieldTransforms[key]?.toClient && rawValue !== undefined) {
                freshDefaults[key] = fieldTransforms[key].toClient(rawValue);
            }
            else {
                freshDefaults[key] = rawValue;
            }
        }
        return freshDefaults;
    };
    const toClient = (dbObject) => {
        const clientObject = { ...dbObject };
        for (const key in fieldTransforms) {
            if (key in clientObject && clientObject[key] !== undefined) {
                clientObject[key] = fieldTransforms[key].toClient(clientObject[key]);
            }
        }
        return clientObject;
    };
    const toDb = (clientObject) => {
        const dbObject = { ...clientObject };
        for (const key in fieldTransforms) {
            if (key in dbObject && dbObject[key] !== undefined) {
                dbObject[key] = fieldTransforms[key].toDb(dbObject[key]);
            }
        }
        return dbObject;
    };
    return {
        pk: pkKeys.length ? pkKeys : null,
        clientPk: clientPkKeys.length ? clientPkKeys : null,
        isClientRecord, // NOW IT'S IN SCOPE
        sqlSchema: z.object(sqlFields),
        clientSchema: z.object(clientFields),
        validationSchema: z.object(serverFields),
        defaultValues: defaultValues,
        generateDefaults,
        toClient,
        toDb,
    };
}
function createViewObject(initialRegistryKey, selection, registry, tableNameToRegistryKeyMap) {
    // Add a flag to track if all tables support reconciliation
    let allTablesSupportsReconciliation = true;
    // Debug: track which tables are checked
    const checkedTables = {};
    function buildView(currentRegistryKey, subSelection, schemaType) {
        const registryEntry = registry[currentRegistryKey];
        if (!registryEntry) {
            throw new Error(`Schema with key "${currentRegistryKey}" not found in the registry.`);
        }
        // FIX: Check at the correct path - registryEntry.zodSchemas
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
            ? registryEntry.zodSchemas.validationSchema
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
                    // Recursive call will also check that table's pk/clientPk
                    const relationSchema = buildView(nextRegistryKey, subSelection[relationKey], schemaType);
                    if (["hasMany", "manyToMany"].includes(relationConfig.type)) {
                        selectedRelationShapes[relationKey] = z.array(relationSchema);
                    }
                    else {
                        selectedRelationShapes[relationKey] = relationSchema.optional();
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
    // Your existing implementation stays exactly the same
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
    // STAGE 1: Resolve references
    for (const tableName in schemas) {
        for (const fieldName in schemas[tableName]) {
            const field = schemas[tableName][fieldName];
            if (isReference(field)) {
                const targetField = field.getter();
                if (targetField && targetField.config) {
                    const newConfig = JSON.parse(JSON.stringify(targetField.config));
                    newConfig.sql.isForeignKey = true; // Add the tag
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
    // STAGE 2: Resolve relations
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
            schemas: {
                sql: entry.zodSchemas.sqlSchema,
                client: entry.zodSchemas.clientSchema,
                server: entry.zodSchemas.validationSchema,
            },
            transforms: {
                toClient: entry.zodSchemas.toClient,
                toDb: entry.zodSchemas.toDb,
            },
            defaults: entry.zodSchemas.defaultValues,
            generateDefaults: entry.zodSchemas.generateDefaults,
            // ADD: Expose PK info and resolver
            pk: entry.zodSchemas.pk,
            clientPk: entry.zodSchemas.clientPk,
            nav: createNavProxy(tableName, finalRegistry),
            // Add this
            createView: (selection) => {
                const view = createViewObject(tableName, selection, finalRegistry, tableNameToRegistryKeyMap);
                const defaults = computeViewDefaults(tableName, selection, finalRegistry, tableNameToRegistryKeyMap);
                return {
                    definition: entry.rawSchema,
                    schemaKey: tableName,
                    schemas: {
                        sql: view.sql,
                        client: view.client,
                        server: view.server,
                    },
                    transforms: {
                        toClient: entry.zodSchemas.toClient,
                        toDb: entry.zodSchemas.toDb,
                    },
                    defaults: defaults,
                    // Include the pk and clientPk arrays
                    pk: entry.zodSchemas.pk,
                    clientPk: entry.zodSchemas.clientPk,
                    // ADD THIS - the boolean from createViewObject
                    supportsReconciliation: view.supportsReconciliation,
                    isView: true,
                    viewSelection: selection,
                    baseTable: tableName,
                    __registry: finalRegistry,
                };
            },
            RelationSelection: {},
        };
    }
    return cleanerRegistry;
}
function computeViewDefaults(currentRegistryKey, // Renamed for clarity, e.g., "users"
selection, registry, tableNameToRegistryKeyMap, // Accept the map
visited = new Set()) {
    if (visited.has(currentRegistryKey)) {
        return undefined; // Prevent circular references
    }
    visited.add(currentRegistryKey);
    // This lookup now uses the correct key every time.
    const entry = registry[currentRegistryKey];
    // This check prevents the crash.
    if (!entry) {
        // This case should ideally not be hit if the map is correct, but it's safe to have.
        console.warn(`Could not find entry for key "${currentRegistryKey}" in registry while computing defaults.`);
        return {};
    }
    const rawSchema = entry.rawSchema;
    const baseDefaults = { ...entry.zodSchemas.defaultValues };
    if (selection === true || typeof selection !== "object") {
        return baseDefaults;
    }
    // Add relation defaults based on selection
    for (const key in selection) {
        if (!selection[key])
            continue;
        const field = rawSchema[key];
        if (!field?.config?.sql?.schema)
            continue;
        const relationConfig = field.config.sql;
        // --- THE CORE FIX ---
        // 1. Get the internal _tableName of the related schema (e.g., "post_table")
        const targetTableName = relationConfig.schema()._tableName;
        // 2. Use the map to find the correct registry key for it (e.g., "posts")
        const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
        if (!nextRegistryKey)
            continue; // Could not resolve, skip this relation
        // Handle different default configurations
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
            baseDefaults[key] = Array.from({ length: count }, () => 
            // 3. Make the recursive call with the CORRECT key
            computeViewDefaults(nextRegistryKey, selection[key], registry, tableNameToRegistryKeyMap, // Pass the map along
            new Set(visited)));
        }
        else {
            // hasOne or belongsTo
            baseDefaults[key] =
                // 3. Make the recursive call with the CORRECT key
                computeViewDefaults(nextRegistryKey, selection[key], registry, tableNameToRegistryKeyMap, // Pass the map along
                new Set(visited));
        }
    }
    return baseDefaults;
}
