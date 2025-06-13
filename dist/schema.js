import { z } from "zod";
export const isFunction = (fn) => typeof fn === "function";
// Function to create a properly typed current timestamp config
export function currentTimeStamp() {
    return {
        default: "CURRENT_TIMESTAMP",
        defaultValue: new Date(),
    };
}
// Internal type creation helper
export const shape = {
    // Integer fields
    int: (config = {}) => shape.sql({
        type: "int",
        ...config,
    }),
    // String fields with variants
    varchar: (config = {}) => shape.sql({
        type: "varchar",
        ...config,
    }),
    char: (config = {}) => shape.sql({
        type: "char",
        ...config,
    }),
    text: (config = {}) => shape.sql({
        type: "text",
        ...config,
    }),
    longtext: (config = {}) => shape.sql({
        type: "longtext",
        ...config,
    }),
    // Boolean fields
    boolean: (config = {}) => shape.sql({
        type: "boolean",
        ...config,
    }),
    // Date fields
    date: (config = {}) => shape.sql({
        type: "date",
        ...config,
    }),
    datetime: (config = {}) => shape.sql({
        type: "datetime",
        ...config,
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
        // Initialize with sql type for all schemas
        return createBuilder({
            stage: "sql",
            sqlConfig: sqlConfig,
            sqlZod: sqlZodType,
            newZod: sqlZodType,
            initialValue: undefined,
            clientZod: sqlZodType,
            validationZod: sqlZodType,
        });
    },
};
function createBuilder(config) {
    // Initialize completed stages tracker
    const completedStages = config.completedStages || new Set(["sql"]);
    const builderObject = {
        config: {
            sql: config.sqlConfig,
            zodSqlSchema: config.sqlZod,
            zodNewSchema: config.newZod,
            initialValue: config.initialValue ||
                inferDefaultFromZod(config.clientZod, config.sqlConfig),
            zodClientSchema: config.clientZod,
            zodValidationSchema: config.validationZod,
        },
        initialState: (schemaOrDefault, defaultValue) => {
            // Runtime validation
            if (completedStages.has("new")) {
                throw new Error("initialState() can only be called once in the chain");
            }
            if (completedStages.has("client")) {
                throw new Error("initialState() must be called before client()");
            }
            if (completedStages.has("validation")) {
                throw new Error("initialState() must be called before validation()");
            }
            // Handle overload - if no second param, first param is the default
            const hasTypeParam = defaultValue !== undefined;
            const newSchema = hasTypeParam
                ? isFunction(schemaOrDefault)
                    ? schemaOrDefault({ sql: config.sqlZod })
                    : schemaOrDefault
                : config.sqlZod; // Keep SQL type if just setting default
            const finalDefaultValue = hasTypeParam
                ? defaultValue
                : schemaOrDefault;
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("new");
            const newClientZod = hasTypeParam
                ? z.union([config.sqlZod, newSchema])
                : config.sqlZod;
            return createBuilder({
                ...config,
                stage: "new",
                newZod: newSchema,
                initialValue: finalDefaultValue,
                clientZod: newClientZod,
                validationZod: hasTypeParam
                    ? z.union([config.sqlZod, newSchema])
                    : config.sqlZod,
                completedStages: newCompletedStages,
            });
        },
        client: (assert) => {
            // Runtime validation
            if (completedStages.has("client")) {
                throw new Error("client() can only be called once in the chain");
            }
            if (completedStages.has("validation")) {
                throw new Error("client() must be called before validation()");
            }
            const clientSchema = isFunction(assert)
                ? assert({ sql: config.sqlZod, initialState: config.newZod })
                : assert;
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("client");
            return createBuilder({
                ...config,
                stage: "client",
                clientZod: clientSchema,
                // Always set validation to match client when client is set
                validationZod: clientSchema,
                completedStages: newCompletedStages,
            });
        },
        validation: (assert) => {
            // Runtime validation
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
            // Runtime validation
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
export function hasMany(config) {
    return () => ({
        type: "hasMany",
        fromKey: config.fromKey,
        toKey: config.toKey(),
        schema: config.schema(),
        defaultCount: config.defaultCount,
    });
}
export function hasOne(config) {
    return () => ({
        type: "hasOne",
        fromKey: config.fromKey,
        toKey: config.toKey(),
        schema: config.schema(),
    });
}
export function belongsTo(config) {
    return () => ({
        type: "belongsTo",
        fromKey: config.fromKey,
        toKey: config.toKey(),
        schema: config.schema(),
    });
}
export function manyToMany(config) {
    return () => ({
        type: "manyToMany",
        fromKey: config.fromKey,
        toKey: config.toKey(),
        schema: config.schema(),
        defaultCount: config.defaultCount,
    });
}
function inferDefaultFromZod(zodType, sqlConfig) {
    // Check SQL type first for better defaults
    if (sqlConfig && !sqlConfig.nullable) {
        switch (sqlConfig.type) {
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
    if (sqlConfig?.nullable) {
        return null;
    }
    // Fall back to existing zod-based inference
    if (zodType instanceof z.ZodOptional) {
        return undefined;
    }
    // Check for explicit default last
    if (zodType instanceof z.ZodDefault && zodType._def?.defaultValue) {
        return typeof zodType._def.defaultValue === "function"
            ? zodType._def.defaultValue()
            : zodType._def.defaultValue;
    }
    return undefined;
}
export function reference(config) {
    return {
        type: "reference",
        to: config,
    };
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
export function createSchema(schema) {
    const sqlFields = {};
    const clientFields = {};
    const validationFields = {};
    const defaultValues = {};
    for (const key in schema) {
        if (key === "_tableName")
            continue;
        const field = schema[key];
        // Case 1: Handle relation functions (hasMany, hasOne, etc.)
        if (typeof field === "function") {
            const relation = field();
            if (!isRelation(relation)) {
                continue;
            }
            // Recursively process the nested schema
            const childSchemaResult = createSchema(relation.schema);
            // For to-many relations, wrap schemas in z.array()
            if (relation.type === "hasMany" || relation.type === "manyToMany") {
                sqlFields[key] = z.array(childSchemaResult.sqlSchema);
                clientFields[key] = z.array(childSchemaResult.clientSchema);
                validationFields[key] = z.array(childSchemaResult.validationSchema);
                // Create an array of default values for the relation
                const count = relation.defaultCount || 0;
                defaultValues[key] = Array.from({ length: count }, () => childSchemaResult.defaultValues);
            }
            else {
                // For to-one relations, use schemas directly
                sqlFields[key] = childSchemaResult.sqlSchema;
                clientFields[key] = childSchemaResult.clientSchema;
                validationFields[key] = childSchemaResult.validationSchema;
                defaultValues[key] = childSchemaResult.defaultValues;
            }
        }
        else if (field &&
            typeof field === "object" &&
            field.type === "reference") {
            const referencedField = field.to();
            sqlFields[key] = referencedField.config.zodSqlSchema;
            clientFields[key] = referencedField.config.zodClientSchema;
            validationFields[key] = referencedField.config.zodValidationSchema;
            defaultValues[key] = referencedField.config.initialValue;
        }
        else if (field && typeof field === "object" && "config" in field) {
            sqlFields[key] = field.config.zodSqlSchema;
            clientFields[key] = field.config.zodClientSchema;
            validationFields[key] = field.config.zodValidationSchema;
            defaultValues[key] = field.config.initialValue;
        }
    }
    return {
        sqlSchema: z.object(sqlFields),
        clientSchema: z.object(clientFields),
        validationSchema: z.object(validationFields),
        defaultValues: defaultValues,
    };
}
export function createSyncSchema(config) {
    return config;
}
