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
// In your cogsbox-shape file...
// Replace the entire existing createSchema function with this SINGLE, CORRECT version.
// In your cogsbox-shape file...
// Replace the entire existing createSchema function with this SINGLE, CORRECT version.
export function createSchema(schema) {
    const sqlFields = {};
    const clientFields = {};
    const validationFields = {};
    const defaultValues = {};
    // Store the functions to be executed in a second pass
    const deferredFields = [];
    // --- PASS 1: Process all non-function fields ---
    for (const key in schema) {
        if (key === "_tableName" || key.startsWith("__"))
            continue;
        const definition = schema[key];
        if (typeof definition === "function") {
            // It's a hasMany, belongsTo, etc. Defer it.
            deferredFields.push({ key, definition });
        }
        else if (definition && definition.type === "reference") {
            // It's a reference. Defer it.
            deferredFields.push({ key, definition });
        }
        else if (definition && typeof definition.config === "object") {
            // It's a standard field builder. Process it now.
            sqlFields[key] = definition.config.zodSqlSchema;
            clientFields[key] = definition.config.zodClientSchema;
            validationFields[key] = definition.config.zodValidationSchema;
            defaultValues[key] = definition.config.initialValue;
        }
    }
    // --- PASS 2: Process all deferred references and relations ---
    // Now we can safely call the functions because the schemas they refer to exist.
    for (const { key, definition } of deferredFields) {
        let resolvedDefinition = definition;
        // If it's a relation like hasMany, call the outer function to get the config object
        if (typeof resolvedDefinition === "function") {
            resolvedDefinition = resolvedDefinition();
        }
        if (resolvedDefinition && resolvedDefinition.type === "reference") {
            const referencedField = resolvedDefinition.to(); // This is now safe to call
            if (!referencedField || !referencedField.config) {
                throw new Error(`Could not resolve reference for key "${key}"`);
            }
            sqlFields[key] = referencedField.config.zodSqlSchema;
            clientFields[key] = referencedField.config.zodClientSchema;
            validationFields[key] = referencedField.config.zodValidationSchema;
            defaultValues[key] = referencedField.config.initialValue;
        }
        else if (resolvedDefinition &&
            ["hasMany", "manyToMany", "hasOne", "belongsTo"].includes(resolvedDefinition.type)) {
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
                // hasOne or belongsTo
                sqlFields[key] = childSchemaResult.sqlSchema.optional();
                clientFields[key] = childSchemaResult.clientSchema.optional();
                validationFields[key] = childSchemaResult.validationSchema.optional();
                defaultValues[key] = childSchemaResult.defaultValues;
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
// --- 2. The Smart Introspection Logic (Also good, keep it) ---
/**
 * (This is the smart function from the last answer that resolves `toKey` functions)
 */
// In your cogsbox-shape file, replace the entire `serializeSchemaMetadata` function.
function serializeSchemaMetadata(schema) {
    const fields = {};
    const relations = {};
    let primaryKey = null;
    for (const key in schema) {
        if (key === "_tableName" || key.startsWith("__"))
            continue;
        const definition = schema[key];
        // Case 1: Is it a relation object? Check the `type` property.
        if (definition &&
            (definition.type === "hasMany" ||
                definition.type === "hasOne" ||
                definition.type === "belongsTo" ||
                definition.type === "manyToMany")) {
            const relation = definition;
            let toKeyName = null;
            try {
                let targetFieldDefinition = relation.toKey;
                if (targetFieldDefinition &&
                    targetFieldDefinition.type === "reference") {
                    targetFieldDefinition = targetFieldDefinition.to;
                }
                const targetSchemaObject = relation.schema;
                for (const targetKey in targetSchemaObject) {
                    if (targetSchemaObject[targetKey] === targetFieldDefinition) {
                        toKeyName = targetKey;
                        break;
                    }
                }
                if (!toKeyName)
                    throw new Error(`Could not find field name for relation target.`);
                relations[key] = {
                    type: "relation",
                    relationType: relation.type,
                    fromKey: relation.fromKey,
                    toKey: toKeyName,
                    schema: serializeSchemaMetadata(targetSchemaObject),
                };
            }
            catch (e) {
                console.error(`[cogsbox-shape] Error resolving 'toKey' for relation '${key}' in schema '${schema._tableName}'.`);
                throw e;
            }
            // This is the critical part: ADD the processed relation to the relations object.
            relations[key] = {
                type: "relation",
                relationType: relation.type,
                fromKey: relation.fromKey,
                toKey: toKeyName,
                schema: serializeSchemaMetadata(relation.schema),
            };
        }
        else if (definition && definition.config && definition.config.sql) {
            fields[key] = { type: "field", sql: definition.config.sql };
            if (definition.config.sql.pk === true) {
                if (primaryKey)
                    console.warn(`[cogsbox-shape] Multiple primary keys found. Using last one: '${key}'.`);
                primaryKey = key;
            }
        }
        else if (definition && definition.type === "reference") {
            const targetFieldBuilder = definition.to();
            if (targetFieldBuilder &&
                targetFieldBuilder.config &&
                targetFieldBuilder.config.sql) {
                fields[key] = { type: "field", sql: targetFieldBuilder.config.sql };
                if (targetFieldBuilder.config.sql.pk) {
                    if (primaryKey)
                        console.warn(`[cogsbox-shape] Multiple primary keys found. Using last one: '${key}'.`);
                    primaryKey = key;
                }
            }
        }
    }
    return { _tableName: schema._tableName, primaryKey, fields, relations };
}
// --- 4. The Final, Corrected `createSyncSchema` Function ---
export function createSyncSchema(config) {
    const processedOutput = {};
    for (const key in config) {
        const entry = config[key];
        // Part 1: Generate Zod Schemas and Live Validators (same as before)
        const { sqlSchema, clientSchema, validationSchema, defaultValues } = createSchema(entry.schema);
        const finalValidationSchema = entry.validation
            ? entry.validation(validationSchema)
            : validationSchema;
        const finalClientSchema = entry.client
            ? entry.client(clientSchema)
            : clientSchema;
        // Part 2: Generate the Serializable Payload (NEW, integrated logic)
        const validationJsonSchema = zodToJsonSchema(finalValidationSchema, {
            target: "jsonSchema7",
            $refStrategy: "none",
        });
        const clientJsonSchema = zodToJsonSchema(finalClientSchema, {
            target: "jsonSchema7",
            $refStrategy: "none",
        });
        const metadata = serializeSchemaMetadata(entry.schema);
        // Part 3: Combine EVERYTHING into the final output object for this key
        processedOutput[key] = {
            // For runtime server use
            rawSchema: entry.schema,
            schemas: {
                sql: sqlSchema,
                client: clientSchema,
                validation: validationSchema,
                defaults: defaultValues,
            },
            validate: (data) => finalValidationSchema.safeParse(data),
            validateClient: (data) => finalClientSchema.safeParse(data),
            // For deployment to DO
            serializable: {
                key,
                validationJsonSchema,
                clientJsonSchema,
                metadata,
            },
        };
    }
    return processedOutput;
}
