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
        initialState: (schemaOrDefault, defaultValue) => {
            if (completedStages.has("new")) {
                throw new Error("initialState() can only be called once in the chain");
            }
            // ... other error checks ...
            const hasSchemaArg = defaultValue !== undefined;
            // This logic is mostly from your original code.
            const newSchema = hasSchemaArg
                ? isFunction(schemaOrDefault)
                    ? schemaOrDefault({ sql: config.sqlZod })
                    : schemaOrDefault
                : config.sqlZod; // If only a primitive is passed, the "new" schema is still the SQL one.
            let finalDefaultValue;
            if (hasSchemaArg) {
                // Handles two arguments: .initialState(schema, defaultValue)
                finalDefaultValue = isFunction(defaultValue)
                    ? defaultValue()
                    : defaultValue;
            }
            else {
                // Handles one argument: .initialState(z.email()) OR .initialState(() => uuid())
                const singleArg = schemaOrDefault;
                if (singleArg &&
                    typeof singleArg === "object" &&
                    singleArg._def) {
                    // THIS IS THE FIX: If it's a Zod schema, INFER the value.
                    finalDefaultValue = inferDefaultFromZod(singleArg, config.sqlConfig);
                }
                else {
                    // Otherwise, it's a function or primitive value.
                    finalDefaultValue = isFunction(singleArg)
                        ? singleArg({ sql: config.sqlZod })
                        : singleArg;
                }
            }
            const newCompletedStages = new Set(completedStages);
            newCompletedStages.add("new");
            // ---- THIS IS THE RUNTIME FIX THAT MATCHES YOUR INTERFACE ----
            // If a new schema was passed, create a union.
            // If ONLY a primitive was passed, we MUST also create a union.
            const newClientZod = hasSchemaArg
                ? z.union([config.sqlZod, newSchema])
                : z.union([config.sqlZod, z.any()]); // Create the union for the primitive case
            return createBuilder({
                ...config,
                stage: "new",
                newZod: newSchema,
                initialValue: finalDefaultValue,
                clientZod: newClientZod,
                validationZod: newClientZod, // Keep validation and client in sync for this step
                completedStages: newCompletedStages,
            });
        },
        references: (fieldGetter) => {
            return createBuilder({
                ...config,
                sqlConfig: {
                    ...config.sqlConfig,
                    references: fieldGetter,
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
// The table function that enriches fields with their key information
export const SchemaWrapperBrand = Symbol("SchemaWrapper");
export function schema(schema) {
    const enrichedSchema = {
        _tableName: schema._tableName,
    };
    for (const key in schema) {
        if (key !== "_tableName" &&
            Object.prototype.hasOwnProperty.call(schema, key)) {
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
    enrichedSchema[SchemaWrapperBrand] = true;
    return enrichedSchema;
}
function inferDefaultFromZod(zodType, sqlConfig) {
    if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
        // --- PRIORITY 1: Check for an explicit `default` on the SQL config ---
        if ("default" in sqlConfig && sqlConfig.default !== undefined) {
            // FIX #1: If the default is CURRENT_TIMESTAMP, it's a DB responsibility.
            // Return undefined so no client-side default is generated.
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
    // --- FIX #2: Add intelligent fallback for unrecognized Zod types ---
    // This handles z.email(), z.url(), etc., by checking the base type.
    if (zodType instanceof z.ZodString) {
        return "";
    }
    // Return undefined if no other default can be determined.
    return undefined;
}
// export function reference<TField extends object>(config: TField) {
//   return {
//     type: "reference" as const,
//     to: config,
//   };
// }
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
        // --- THIS IS THE FIX ---
        // The condition now correctly checks for EITHER a `reference` type OR a builder with a `.config`.
        if (!definition ||
            (definition.type !== "reference" && !definition.config)) {
            continue;
        }
        if (definition.type === "reference") {
            // This block now correctly processes `testId`.
            const referencedFieldBuilder = definition.to();
            const referencedConfig = referencedFieldBuilder.config;
            sqlFields[key] = referencedConfig.zodSqlSchema;
            clientFields[key] = referencedConfig.zodClientSchema;
            validationFields[key] = referencedConfig.zodValidationSchema;
            defaultValues[key] = inferDefaultFromZod(referencedConfig.zodClientSchema, { ...referencedConfig.sql, default: undefined });
        }
        else {
            // This block handles fields with a `.config` property, like `pets`.
            const config = definition.config;
            const sqlConfig = config.sql;
            if (sqlConfig &&
                typeof sqlConfig === "object" &&
                ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                const relatedSchemaFactory = sqlConfig.schema;
                const childSchemaResult = createSchema(relatedSchemaFactory());
                let baseClientSchema;
                if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
                    baseClientSchema = z.array(childSchemaResult.clientSchema);
                    defaultValues[key] = Array.from({ length: sqlConfig.defaultCount || 0 }, () => childSchemaResult.defaultValues);
                }
                else {
                    baseClientSchema = childSchemaResult.clientSchema;
                    defaultValues[key] = childSchemaResult.defaultValues;
                }
                clientFields[key] = config.clientTransform
                    ? config.clientTransform(baseClientSchema)
                    : baseClientSchema;
                validationFields[key] = clientFields[key];
            }
            else {
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
export function schemaRelations(baseSchema, referencesBuilder) {
    const rel = {
        reference: (fieldGetter) => ({
            type: "reference",
            to: fieldGetter,
        }),
        hasMany: (config) => {
            const relationConfig = {
                type: "hasMany",
                fromKey: config.fromKey,
                toKey: () => config.toKey.__meta._key,
                schema: () => config.toKey.__parentTableType,
                defaultCount: config.defaultCount,
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
            }); // FIX: This is a hack to get around the circular reference
        },
        hasOne: (config) => {
            const relationConfig = {
                type: "hasOne",
                fromKey: config.fromKey,
                toKey: config.toKey,
                schema: () => config.toKey.__parentTableType,
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
                fromKey: config.fromKey,
                toKey: config.toKey,
                schema: config.schema,
                ...(config.defaultCount !== undefined && {
                    defaultCount: config.defaultCount,
                }),
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
    const refs = referencesBuilder(rel);
    const enrichedRefs = {};
    // Enrich each field in the refs object with __meta and __parentTableType
    for (const key in refs) {
        if (Object.prototype.hasOwnProperty.call(refs, key)) {
            enrichedRefs[key] = {
                ...refs[key],
                __meta: {
                    _key: key,
                    _fieldType: refs[key],
                },
                __parentTableType: baseSchema,
            };
        }
    }
    return enrichedRefs;
}
