import { z, ZodType } from "zod";
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
            return sqlConfig.default;
        }
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
            const targetField = definition.getter();
            if (targetField && targetField.config) {
                const config = targetField.config;
                sqlFields[key] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
                validationFields[key] = config.zodValidationSchema;
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
            if (sqlConfig &&
                typeof sqlConfig === "object" &&
                ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                console.log(`Skipping relation: ${key}`);
                continue;
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
function createViewObject(tableName, selection, registry) {
    // A recursive helper that builds ONE schema (client or validation) for a view.
    function buildView(currentTable, schemaType, subSelection) {
        const registryEntry = registry[currentTable];
        const rawSchema = registryEntry.rawSchema;
        const baseSchema = registryEntry.zodSchemas[`${schemaType}Schema`];
        // --- START OF THE FIX ---
        // 1. Get the shape of the base schema (e.g., { id: z.ZodNumber, name: z.ZodString })
        // The base schema correctly contains only primitive/referenced fields.
        const primitiveShape = baseSchema.shape;
        // 2. If the selection is just `true`, we don't need to add any relations.
        if (subSelection === true) {
            return z.object(primitiveShape);
        }
        // 3. Build a new shape object for the selected relations.
        const selectedRelationShapes = {};
        if (typeof subSelection === "object") {
            for (const key in subSelection) {
                // We only care about keys that are actual relations in the raw schema.
                if (subSelection[key] && rawSchema[key]?.config?.sql?.schema) {
                    const relationConfig = rawSchema[key].config.sql;
                    const targetTable = relationConfig.schema()._tableName;
                    // Recursively build the sub-schema for the relation.
                    const subSchema = buildView(targetTable, schemaType, subSelection[key]);
                    // Wrap it in an array or optional as needed.
                    if (["hasMany", "manyToMany"].includes(relationConfig.type)) {
                        selectedRelationShapes[key] = z.array(subSchema);
                    }
                    else {
                        selectedRelationShapes[key] = subSchema.optional();
                    }
                }
            }
        }
        // 4. Combine the primitive shape and the new relation shapes into one final shape.
        const finalShape = { ...primitiveShape, ...selectedRelationShapes };
        // 5. Return a brand new, clean Zod object from the final shape.
        return z.object(finalShape);
        // --- END OF THE FIX ---
    }
    // The main function builds the final object with both schemas.
    const sourceRegistryEntry = registry[tableName];
    return {
        sql: sourceRegistryEntry.zodSchemas.sqlSchema,
        client: buildView(tableName, "client", selection),
        validation: buildView(tableName, "validation", selection),
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
    const resolvedSchemas = { ...schemas };
    // STAGE 1: Resolve references
    for (const tableName in schemas) {
        for (const fieldName in schemas[tableName]) {
            const field = schemas[tableName][fieldName];
            if (isReference(field)) {
                const targetField = field.getter();
                if (targetField && targetField.config) {
                    resolvedSchemas[tableName][fieldName] = targetField;
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
    for (const tableName in finalRegistry) {
        const entry = finalRegistry[tableName];
        cleanerRegistry[tableName] = {
            definition: entry.rawSchema,
            schemas: {
                sql: entry.zodSchemas.sqlSchema,
                client: entry.zodSchemas.clientSchema,
                validation: entry.zodSchemas.validationSchema,
            },
            transforms: {
                toClient: entry.zodSchemas.toClient,
                toDb: entry.zodSchemas.toDb,
            },
            defaults: entry.zodSchemas.defaultValues,
            nav: createNavProxy(tableName, finalRegistry),
            // Add this
            RelationSelection: {},
            createView: function (selection) {
                const view = createViewObject(tableName, selection, finalRegistry);
                const defaults = computeViewDefaults(tableName, selection, finalRegistry);
                console.log("View defaults:", defaults); // ADD THIS
                return {
                    ...view,
                    defaults: defaults,
                };
            },
        };
    }
    return cleanerRegistry;
}
function computeViewDefaults(tableName, selection, registry, visited = new Set()) {
    if (visited.has(tableName)) {
        return undefined; // Prevent circular references
    }
    visited.add(tableName);
    const entry = registry[tableName];
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
        const targetTable = relationConfig.schema()._tableName;
        // ----- FIX IS HERE -----
        // Look for the defaultConfig on the nested relationConfig object.
        const defaultConfig = relationConfig.defaultConfig;
        // Handle different default configurations
        if (defaultConfig === undefined) {
            // Don't include in defaults
            delete baseDefaults[key];
        }
        else if (defaultConfig === null) {
            baseDefaults[key] = null;
        }
        else if (Array.isArray(defaultConfig)) {
            baseDefaults[key] = [];
        }
        else if (defaultConfig === true) {
            // Generate based on nested selection
            if (relationConfig.type === "hasMany" ||
                relationConfig.type === "manyToMany") {
                const count = relationConfig.defaultCount || 1;
                baseDefaults[key] = Array.from({ length: count }, () => computeViewDefaults(targetTable, selection[key], registry, new Set(visited)));
            }
            else {
                baseDefaults[key] = computeViewDefaults(targetTable, selection[key], registry, new Set(visited));
            }
        }
        else if (typeof defaultConfig === "object" && "count" in defaultConfig) {
            baseDefaults[key] = Array.from({ length: defaultConfig.count }, () => computeViewDefaults(targetTable, selection[key], registry, new Set(visited)));
        }
    }
    // NOTE: This was in the original code but is not needed for the recursive logic.
    // It's safe to remove, but also safe to keep.
    // visited.delete(tableName);
    return baseDefaults;
}
