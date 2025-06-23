import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
export const isFunction = (fn) => typeof fn === "function";
// Function to create a properly typed current timestamp config
export function currentTimeStamp() {
    return {
        default: "CURRENT_TIMESTAMP",
        defaultValue: new Date(),
    };
}
// Now define the shape object with the explicit type annotation
export const shape = {
    int: (config = {}) => shape.sql({
        type: "int",
        ...config,
    }),
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
    boolean: (config = {}) => shape.sql({
        type: "boolean",
        ...config,
    }),
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
    hasMany: (config) => {
        const relationConfig = {
            type: "hasMany",
            ...config,
        };
        const placeholderSchema = z.array(z.any());
        return createBuilder({
            stage: "relation",
            sqlConfig: relationConfig,
            sqlZod: placeholderSchema,
            newZod: placeholderSchema,
            initialValue: Array.from({ length: config.defaultCount || 0 }, () => ({})),
            clientZod: placeholderSchema,
            validationZod: placeholderSchema,
        }); // Just cast to any here to satisfy the interface
    },
    hasOne: (config) => {
        const relationConfig = {
            type: "hasOne",
            ...config,
        };
        const relationZodType = z.any();
        return createBuilder({
            stage: "relation",
            sqlConfig: relationConfig,
            sqlZod: relationZodType,
            newZod: relationZodType,
            initialValue: {},
            clientZod: relationZodType,
            validationZod: relationZodType,
        });
    },
    manyToMany: (config) => {
        const relationConfig = {
            type: "manyToMany",
            ...config,
        };
        const relationZodType = z.array(z.any()).optional();
        return createBuilder({
            stage: "relation",
            sqlConfig: relationConfig,
            sqlZod: relationZodType,
            newZod: relationZodType,
            initialValue: Array.from({ length: config.defaultCount || 0 }, () => ({})),
            clientZod: relationZodType,
            validationZod: relationZodType,
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
        initialState: (
        // ... this initialState function remains unchanged ...
        schemaOrDefault, defaultValue) => {
            if (completedStages.has("new")) {
                throw new Error("initialState() can only be called once in the chain");
            }
            if (completedStages.has("client")) {
                throw new Error("initialState() must be called before client()");
            }
            if (completedStages.has("validation")) {
                throw new Error("initialState() must be called before validation()");
            }
            const hasTypeParam = defaultValue !== undefined;
            const newSchema = hasTypeParam
                ? isFunction(schemaOrDefault)
                    ? schemaOrDefault({ sql: config.sqlZod })
                    : schemaOrDefault
                : config.sqlZod;
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
            if (completedStages.has("client")) {
                throw new Error("client() can only be called once in the chain");
            }
            if (completedStages.has("validation")) {
                throw new Error("client() must be called before validation()");
            }
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("client");
            // ---- THIS IS THE MAIN FIX ----
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
    // Handle relation configs
    if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
        // Check if it's a relation config by looking for relation types
        if (typeof sqlConfig.type === "string" &&
            ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
            const relationConfig = sqlConfig;
            if (relationConfig.type === "hasMany" ||
                relationConfig.type === "manyToMany") {
                return Array.from({ length: relationConfig.defaultCount || 0 }, () => ({}));
            }
            // For hasOne and belongsTo
            return {};
        }
        // Handle SQL configs (existing logic)
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
    const deferredFields = [];
    // --- PASS 1: Separate immediate fields from deferred relations/references ---
    for (const key in schema) {
        if (key === "_tableName" || key.startsWith("__"))
            continue;
        const definition = schema[key];
        if ((definition && typeof definition.config === "object") || // It's a builder
            typeof definition === "function" || // It's a legacy relation
            (definition && definition.type === "reference") // It's a reference
        ) {
            // Defer all builders, functions, and references to Pass 2
            deferredFields.push({ key, definition });
        }
        else {
            // This case should ideally not be hit with the builder pattern, but is safe to have.
            // Process any non-builder, non-deferred fields if they exist.
        }
    }
    // --- PASS 2: Process all deferred references and relations ---
    for (const { key, definition } of deferredFields) {
        let resolvedDefinition = definition;
        if (typeof resolvedDefinition === "function") {
            // Handle legacy function style: hasMany(...)
            resolvedDefinition = resolvedDefinition();
            const relation = resolvedDefinition;
            const childSchemaResult = createSchema(relation.schema);
            if (relation.type === "hasMany" || relation.type === "manyToMany") {
                sqlFields[key] = z.array(childSchemaResult.sqlSchema).optional();
                clientFields[key] = z.array(childSchemaResult.clientSchema).optional();
                validationFields[key] = z
                    .array(childSchemaResult.validationSchema)
                    .optional();
                defaultValues[key] = Array.from({ length: relation.defaultCount || 0 }, () => childSchemaResult.defaultValues);
            }
            else {
                sqlFields[key] = childSchemaResult.sqlSchema.optional();
                clientFields[key] = childSchemaResult.clientSchema.optional();
                validationFields[key] = childSchemaResult.validationSchema.optional();
                defaultValues[key] = childSchemaResult.defaultValues;
            }
        }
        else if (resolvedDefinition && resolvedDefinition.type === "reference") {
            // Handle reference fields
            const referencedField = resolvedDefinition.to();
            sqlFields[key] = referencedField.config.zodSqlSchema;
            clientFields[key] = referencedField.config.zodClientSchema;
            validationFields[key] = referencedField.config.zodValidationSchema;
            defaultValues[key] = referencedField.config.initialValue;
        }
        else if (resolvedDefinition && resolvedDefinition.config) {
            // It's a builder object (`shape.sql(...)` or `shape.hasMany(...)`)
            const config = resolvedDefinition.config;
            const sqlConfig = config.sql;
            if (sqlConfig &&
                typeof sqlConfig === "object" &&
                ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                // --- THIS IS THE KEY PART FOR RELATION BUILDERS ---
                const relationConfig = sqlConfig;
                const childSchemaResult = createSchema(relationConfig.schema);
                // 1. Create the BASE schema WITHOUT .optional()
                let rawClientSchema;
                let rawValidationSchema;
                if (relationConfig.type === "hasMany" ||
                    relationConfig.type === "manyToMany") {
                    rawClientSchema = z.array(childSchemaResult.clientSchema);
                    rawValidationSchema = z.array(childSchemaResult.validationSchema);
                    defaultValues[key] = Array.from({ length: relationConfig.defaultCount || 0 }, () => childSchemaResult.defaultValues);
                }
                else {
                    rawClientSchema = childSchemaResult.clientSchema;
                    rawValidationSchema = childSchemaResult.validationSchema;
                    defaultValues[key] = childSchemaResult.defaultValues;
                }
                // 2. Apply the transform to the RAW schema
                const transformedClientSchema = config.clientTransform
                    ? config.clientTransform(rawClientSchema)
                    : rawClientSchema;
                const transformedValidationSchema = config.validationTransform
                    ? config.validationTransform(rawValidationSchema)
                    : transformedClientSchema;
                // 3. Assign the final schemas. NO .optional() is added.
                sqlFields[key] = z.array(childSchemaResult.sqlSchema).optional(); // SQL is still optional, as it might not be loaded.
                clientFields[key] = transformedClientSchema; // <-- NO .optional()
                validationFields[key] = transformedValidationSchema; // <-- NO .optional()
            }
            else {
                // It's a standard field builder (`shape.sql(...)`)
                sqlFields[key] = config.zodSqlSchema;
                clientFields[key] = config.zodClientSchema;
                validationFields[key] = config.zodValidationSchema;
                defaultValues[key] = config.initialValue;
            }
        }
    }
    return {
        sqlSchema: z.object(sqlFields),
        clientSchema: z.object(clientFields),
        validationSchema: z.object(validationFields),
        defaultValues: defaultValues,
    };
}
