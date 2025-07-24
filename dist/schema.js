import { z } from "zod";
import { ca } from "zod/v4/locales";
export const isFunction = (fn) => typeof fn === "function";
// Function to create a properly typed current timestamp config
export function currentTimeStamp() {
    return {
        default: "CURRENT_TIMESTAMP",
        defaultValue: new Date(),
    };
}
// Now define the shape object with the explicit type annotation
export const s = {
    // int: (config: IntConfig = {}) =>
    //   s.sql({
    //     type: "int",
    //     ...config,
    //   }),
    // varchar: (config: Omit<StringConfig, "type"> = {}) =>
    //   s.sql({
    //     type: "varchar",
    //     ...config,
    //   }),
    // char: (config: Omit<StringConfig, "type"> = {}) =>
    //   s.sql({
    //     type: "char",
    //     ...config,
    //   }),
    // text: (config: Omit<StringConfig, "type" | "length"> = {}) =>
    //   s.sql({
    //     type: "text",
    //     ...config,
    //   }),
    // longtext: (config: Omit<StringConfig, "type" | "length"> = {}) =>
    //   s.sql({
    //     type: "longtext",
    //     ...config,
    //   }),
    // boolean: (config: BooleanConfig = {}) =>
    //   s.sql({
    //     type: "boolean",
    //     ...config,
    //   }),
    // date: (config: Omit<DateConfig, "type"> = {}) =>
    //   s.sql({
    //     type: "date",
    //     ...config,
    //   }),
    // datetime: (config: Omit<DateConfig, "type"> = {}) =>
    //   s.sql({
    //     type: "datetime",
    //     ...config,
    //   }),
    reference: (getter) => ({
        __type: "reference",
        getter: getter,
    }),
    hasMany: (config) => ({
        __type: "placeholder-relation",
        relationType: "hasMany",
        defaultCount: config?.defaultCount ?? 0,
    }),
    hasOne: () => ({
        __type: "placeholder-relation",
        relationType: "hasOne",
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
        initialState: (value, schemaModifier) => {
            if (completedStages.has("new")) {
                throw new Error("initialState() can only be called once in the chain");
            }
            let actualValue;
            let baseSchema;
            // Check if value is a Zod schema
            if (value && typeof value === "object" && "_def" in value) {
                // It's a Zod schema - infer the default value
                baseSchema = value;
                actualValue = inferDefaultFromZod(baseSchema, config.sqlConfig);
            }
            else {
                // Get the actual value
                actualValue = isFunction(value) ? value() : value;
                // Create base Zod schema from the value type
                // Check if it's a literal value (string, number, boolean)
                if (typeof actualValue === "string" ||
                    typeof actualValue === "number" ||
                    typeof actualValue === "boolean") {
                    baseSchema = z.literal(actualValue);
                }
                else if (actualValue instanceof Date) {
                    baseSchema = z.date();
                }
                else if (actualValue === null) {
                    baseSchema = z.null();
                }
                else if (actualValue === undefined) {
                    baseSchema = z.undefined();
                }
                else {
                    baseSchema = z.any();
                }
            }
            // Apply schema modifier if provided
            const newSchema = isFunction(schemaModifier)
                ? schemaModifier(baseSchema)
                : baseSchema;
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("new");
            // Create union for client/validation
            const clientValidationSchema = z.union([config.sqlZod, newSchema]);
            return createBuilder({
                ...config,
                stage: "new",
                newZod: newSchema,
                initialValue: actualValue,
                clientZod: clientValidationSchema,
                validationZod: clientValidationSchema,
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
            if (completedStages.has("validation")) {
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
        validation: (
        // ... this validation function remains unchanged ...
        assert) => {
            if (completedStages.has("validation")) {
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
            newCompletedStages.add("validation");
            return createBuilder({
                ...config,
                stage: "validation",
                validationZod: validationSchema,
                completedStages: newCompletedStages,
            });
        },
        transform: (transforms) => {
            if (!completedStages.has("validation") &&
                !completedStages.has("client")) {
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
// Update the schema function
export function schema(schema) {
    const enrichedSchema = {};
    for (const key in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, key)) {
            if (key === "_tableName") {
                // Don't enrich _tableName, keep it as a simple string
                enrichedSchema[key] = schema[key];
            }
            else {
                // Enrich other fields
                enrichedSchema[key] = {
                    ...schema[key],
                    __meta: {
                        _key: key,
                        _fieldType: schema[key],
                    },
                    __parentTableType: schema,
                };
            }
        }
    }
    enrichedSchema[SchemaWrapperBrand] = true;
    return enrichedSchema;
}
function inferDefaultFromZod(zodType, sqlConfig) {
    if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
        if ("default" in sqlConfig && sqlConfig.default !== undefined) {
            if (sqlConfig.default === "CURRENT_TIMESTAMP") {
                return undefined;
            }
            // Otherwise, use the provided SQL default.
            return sqlConfig.default;
        }
        // --- PRESERVED LOGIC: Handle relation types (NO CHANGES HERE) ---
        if (typeof sqlConfig.type === "string" &&
            ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
            const relationConfig = sqlConfig;
            if (relationConfig.type === "hasMany" ||
                relationConfig.type === "manyToMany") {
                return Array.from({ length: relationConfig.defaultCount || 0 }, () => ({}));
            }
            if (relationConfig.type === "hasOne" ||
                relationConfig.type === "belongsTo") {
                return {};
            }
        }
        // --- PRESERVED LOGIC: Handle basic SQL types as a fallback (NO CHANGES HERE) ---
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
                    return new Date();
            }
        }
        if (sqlTypeConfig.nullable) {
            return null;
        }
    }
    // --- PRESERVED LOGIC: Fall back to Zod-based inference ---
    if (zodType instanceof z.ZodOptional) {
        return undefined;
    }
    if (zodType instanceof z.ZodDefault && zodType._def?.defaultValue) {
        return typeof zodType._def.defaultValue === "function"
            ? zodType._def.defaultValue()
            : zodType._def.defaultValue;
    }
    if (zodType instanceof z.ZodString) {
        return "";
    }
    // Return undefined if no other default can be determined.
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
    const validationFields = {};
    const defaultValues = {};
    const fieldTransforms = {};
    const fullSchema = { ...schema, ...(relations || {}) };
    for (const key in fullSchema) {
        if (key === "_tableName" ||
            key.startsWith("__") ||
            key === String(SchemaWrapperBrand))
            continue;
        const definition = fullSchema[key];
        // Handle new-style references
        if (isReference(definition)) {
            // Call the getter to get the actual field
            const targetField = definition.getter();
            if (targetField && targetField.config) {
                const config = targetField.config;
                sqlFields[key] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
                validationFields[key] = config.zodValidationSchema;
                // For references, typically use undefined as default
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
        // Handle old-style references (for backward compatibility)
        if (definition && definition.type === "reference") {
            const referencedFieldBuilder = definition.to();
            const referencedConfig = referencedFieldBuilder.config;
            sqlFields[key] = referencedConfig.zodSqlSchema;
            clientFields[key] = referencedConfig.zodClientSchema;
            validationFields[key] = referencedConfig.zodValidationSchema;
            defaultValues[key] = inferDefaultFromZod(referencedConfig.zodClientSchema, { ...referencedConfig.sql, default: undefined });
            continue;
        }
        // Handle fields with a config property (builders)
        if (definition && definition.config) {
            const config = definition.config;
            const sqlConfig = config.sql;
            if (definition && definition.config) {
                const config = definition.config;
                const sqlConfig = config.sql;
                if (sqlConfig &&
                    typeof sqlConfig === "object" &&
                    ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                    // Handle relations
                    const relatedSchemaFactory = sqlConfig.schema;
                    let baseClientSchema;
                    if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
                        baseClientSchema = z.array(z.any()).optional();
                        // Make it a FUNCTION that returns the array
                        defaultValues[key] = () => Array.from({ length: sqlConfig.defaultCount || 0 }, () => {
                            const childSchema = createSchema(relatedSchemaFactory());
                            return childSchema.defaultValues;
                        });
                    }
                    else {
                        baseClientSchema = z.any().optional();
                        // Make it a FUNCTION that returns the object
                        defaultValues[key] = () => {
                            const childSchema = createSchema(relatedSchemaFactory());
                            return childSchema.defaultValues;
                        };
                    }
                    clientFields[key] = config.clientTransform
                        ? config.clientTransform(baseClientSchema)
                        : baseClientSchema;
                    validationFields[key] = clientFields[key];
                }
                else {
                    // Handle regular fields
                    sqlFields[key] = config.zodSqlSchema;
                    clientFields[key] = config.zodClientSchema;
                    validationFields[key] = config.zodValidationSchema;
                    if (config.transforms) {
                        fieldTransforms[key] = config.transforms;
                    }
                    const initialValueOrFn = config.initialValue;
                    defaultValues[key] = isFunction(initialValueOrFn)
                        ? initialValueOrFn()
                        : initialValueOrFn;
                }
            }
        }
    }
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
        sqlSchema: z.object(sqlFields),
        clientSchema: z.object(clientFields),
        validationSchema: z.object(validationFields),
        defaultValues: defaultValues,
        toClient,
        toDb,
    };
}
export function createSchemaBox(schemas, resolver) {
    // Create a proxy to allow for a clean syntax in the resolver function (e.g., s.users.id)
    const schemaProxy = new Proxy({}, {
        get(target, tableName) {
            const schema = schemas[tableName];
            if (!schema)
                return undefined;
            return new Proxy({}, {
                get(target, fieldName) {
                    const field = schema[fieldName];
                    // Enrich the field with metadata when accessed through the proxy.
                    // This metadata is crucial for resolving relationships later.
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
    // Get the user-defined resolution configuration
    const resolutionConfig = resolver(schemaProxy);
    // Start with a deep copy of the initial schemas
    const resolvedSchemas = { ...schemas };
    // ===============================================================
    // FIX: Implement a two-stage resolution process to avoid deadlock
    // ===============================================================
    // STAGE 1: Resolve all `s.reference()` fields first.
    for (const tableName in schemas) {
        for (const fieldName in schemas[tableName]) {
            const field = schemas[tableName][fieldName];
            if (isReference(field)) {
                // A reference is defined in the base schema, so its getter gives the target
                const targetField = field.getter();
                if (targetField && targetField.config) {
                    // Replace the reference placeholder with the actual field it points to
                    resolvedSchemas[tableName][fieldName] = targetField;
                }
                else {
                    throw new Error(`Could not resolve reference for ${tableName}.${fieldName}. Ensure it points to a valid schema field.`);
                }
            }
        }
    }
    // STAGE 2: Now, resolve all relation placeholders (`hasMany`, `hasOne`, etc.).
    for (const tableName in schemas) {
        const tableConfig = resolutionConfig[tableName];
        if (!tableConfig)
            continue;
        for (const fieldName in tableConfig) {
            const field = schemas[tableName][fieldName];
            const resolution = tableConfig[fieldName];
            // Ensure this is a relation placeholder we are trying to resolve
            if (field && field.__type === "placeholder-relation") {
                const targetKey = resolution.toKey;
                // The target key should now be a fully resolved field from STAGE 1
                if (!targetKey || !targetKey.__parentTableType) {
                    throw new Error(`Could not resolve relation for ${tableName}.${fieldName}. The 'toKey' (${targetKey}) is invalid.`);
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
                // Create the full relation builder now that the dependency is available
                const resolvedBuilder = createBuilder({
                    stage: "relation",
                    sqlConfig: {
                        type: relationType,
                        fromKey: resolution.fromKey,
                        toKey: () => targetKey, // The toKey is now a function returning the resolved field
                        schema: () => targetSchema,
                        defaultCount: defaultCount,
                    },
                    sqlZod: zodSchema,
                    newZod: zodSchema,
                    initialValue,
                    clientZod: zodSchema,
                    validationZod: zodSchema,
                });
                // Replace the placeholder in our schemas object with the final builder
                if (!resolvedSchemas[tableName]) {
                    throw new Error(`Could not resolve relation for ${tableName}.${fieldName}. The 'toKey' (${targetKey}) is invalid.`);
                }
                resolvedSchemas[tableName][fieldName] = resolvedBuilder;
            }
        }
    }
    // Update the createSchemaBoxRegistry function's final section:
    const finalRegistry = {};
    for (const tableName in resolvedSchemas) {
        const zodSchemas = createSchema(resolvedSchemas[tableName]);
        finalRegistry[tableName] = {
            rawSchema: resolvedSchemas[tableName],
            zodSchemas: zodSchemas,
        };
    }
    // Simple navigation proxy creator
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
                const targetTable = targetSchema?._tableName; // Now just a simple string!
                if (targetTable && registry[targetTable]) {
                    return createNavProxy(targetTable, registry);
                }
                return undefined;
            },
        });
    };
    // Build the final registry
    for (const tableName in resolvedSchemas) {
        const zodSchemas = createSchema(resolvedSchemas[tableName]);
        finalRegistry[tableName] = {
            rawSchema: resolvedSchemas[tableName],
            zodSchemas: zodSchemas,
            test: schemas,
            nav: null, // Will be set after all entries are created
        };
    }
    // Now add navigation proxies
    for (const tableName in finalRegistry) {
        finalRegistry[tableName].nav = createNavProxy(tableName, finalRegistry);
    }
    return finalRegistry;
}
