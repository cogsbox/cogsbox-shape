import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import zodToJsonSchema, {} from "zod-to-json-schema";
export const isFunction = (fn) => typeof fn === "function";
// Function to create a properly typed current timestamp config
export function currentTimeStamp() {
    return {
        default: "CURRENT_TIMESTAMP",
        defaultValue: new Date(),
    };
}
// Internal type creation helper
const createClient = ({ sqlConfig, inferredDbType, inferredClientType, baseJsonSchema, serverType, }) => {
    return (assert, defaultValue) => {
        const clientType = isFunction(assert)
            ? assert({
                zod: inferredClientType,
                ...(serverType && { serverType }),
            })
            : assert || inferredClientType;
        // Handle timestamp default
        let finalSqlConfig = sqlConfig;
        let finalDefaultValue = defaultValue;
        if (defaultValue &&
            typeof defaultValue === "object" &&
            "default" in defaultValue &&
            defaultValue.default === "CURRENT_TIMESTAMP") {
            finalSqlConfig = {
                ...sqlConfig,
                default: "CURRENT_TIMESTAMP",
            };
            finalDefaultValue = defaultValue.defaultValue;
        }
        const effectiveDbType = serverType || inferredDbType;
        const clientJsonSchema = zodToJsonSchema(clientType);
        return {
            sql: finalSqlConfig,
            zodDbSchema: effectiveDbType,
            zodClientSchema: clientType,
            jsonSchema: serverType ? clientJsonSchema : baseJsonSchema,
            defaultValue: finalDefaultValue ??
                (serverType
                    ? inferDefaultFromZod(serverType)
                    : finalDefaultValue),
            transform: (transforms) => ({
                sql: finalSqlConfig,
                zodDbSchema: effectiveDbType,
                zodClientSchema: clientType,
                jsonSchema: serverType ? clientJsonSchema : baseJsonSchema,
                defaultValue: finalDefaultValue,
                toClient: transforms.toClient,
                toDb: transforms.toDb,
                transforms: {
                    toClient: transforms.toClient.toString(),
                    toDb: transforms.toDb.toString(),
                },
            }),
        };
    };
};
export function createTransforms(transforms) {
    return {
        sql: (config) => {
            const base = shape.sql(config);
            return {
                sql: base.sql,
                dbType: base.dbType,
                zodDbSchema: base.zodDbSchema,
                zodClientSchema: base.zodClientSchema,
                client: base.client,
                db: (dbType) => {
                    const baseDb = base.db(dbType);
                    const transformMethods = Object.entries(transforms).reduce((acc, [key, transform]) => ({
                        ...acc,
                        [key]: () => ({
                            sql: config,
                            zodDbSchema: baseDb.zodDbSchema,
                            zodClientSchema: z.unknown(),
                            toClient: transform.toClient,
                            toDb: transform.toDb,
                        }),
                    }), {});
                    return {
                        ...baseDb,
                        client: Object.assign(baseDb.client, transformMethods),
                    };
                },
            };
        },
    };
}
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
        const inferredDbType = (() => {
            let baseType;
            if (sqlConfig.pk) {
                baseType = z.number(); // DB PKs are always numbers
            }
            else {
                switch (sqlConfig.type) {
                    case "int":
                        baseType = z.number();
                        break;
                    case "varchar":
                    case "char":
                    case "text":
                    case "longtext":
                        baseType = z.string();
                        break;
                    case "boolean":
                        baseType = z.boolean();
                        break;
                    case "date":
                    case "datetime":
                        baseType = z.date();
                        break;
                    default:
                        throw new Error(`Unsupported type: ${sqlConfig}`);
                }
            }
            if (sqlConfig.nullable) {
                baseType = baseType.nullable();
            }
            return baseType;
        })();
        const inferredClientType = (() => {
            let baseType;
            if (sqlConfig.pk) {
                baseType = z.string(); // Client PKs are always strings
            }
            else {
                switch (sqlConfig.type) {
                    case "int":
                        baseType = z.number();
                        break;
                    case "varchar":
                    case "char":
                    case "text":
                    case "longtext":
                        baseType = z.string();
                        break;
                    case "boolean":
                        baseType = z.boolean();
                        break;
                    case "date":
                    case "datetime":
                        if (sqlConfig.default === "CURRENT_TIMESTAMP") {
                            baseType = z.date().optional();
                        }
                        baseType = z.date();
                        break;
                    default:
                        throw new Error(`Unsupported type: ${sqlConfig}`);
                }
            }
            if (sqlConfig.nullable) {
                baseType = baseType.nullable();
            }
            return baseType;
        })();
        // Create JSON Schema version immediately
        const jsonSchema = zodToJsonSchema(inferredDbType);
        return {
            sql: sqlConfig,
            dbType: inferredDbType,
            zodDbSchema: inferredDbType,
            zodClientSchema: inferredClientType,
            jsonSchema,
            defaultValue: inferDefaultFromZod(inferredDbType, sqlConfig),
            client: createClient({
                sqlConfig,
                inferredDbType,
                inferredClientType,
                baseJsonSchema: jsonSchema,
            }),
            db: (assert) => {
                const serverType = assert({ zod: inferredDbType });
                return {
                    sql: sqlConfig,
                    dbType: serverType,
                    zodDbSchema: serverType,
                    zodClientSchema: serverType,
                    jsonSchema: zodToJsonSchema(serverType),
                    defaultValue: inferDefaultFromZod(serverType),
                    client: createClient({
                        sqlConfig,
                        inferredDbType,
                        inferredClientType,
                        baseJsonSchema: jsonSchema,
                        serverType,
                    }),
                };
            },
        };
    },
};
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
function isRelation(value) {
    return (value &&
        typeof value === "object" &&
        "type" in value &&
        "fromKey" in value &&
        "toKey" in value &&
        "schema" in value);
}
function inferDefaultFromZod(zodType, sqlConfig) {
    if (sqlConfig?.pk) {
        return uuidv4();
    }
    if (zodType instanceof z.ZodOptional) {
        return undefined;
    }
    if (zodType instanceof z.ZodNullable) {
        return null;
    }
    if (zodType instanceof z.ZodArray) {
        return [];
    }
    if (zodType instanceof z.ZodObject) {
        return {};
    }
    if (zodType instanceof z.ZodString) {
        return "";
    }
    if (zodType instanceof z.ZodNumber) {
        return 0;
    }
    if (zodType instanceof z.ZodBoolean) {
        return false;
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
        to: config.to,
    };
}
function createSerializableSchema(schema) {
    const serializableSchema = {
        _tableName: schema._tableName,
        __schemaId: crypto.randomUUID(),
        _syncKey: schema._syncKey
            ? {
                toString: schema._syncKey.toString(),
            }
            : undefined,
    };
    for (const [key, value] of Object.entries(schema)) {
        if (key === "_tableName" || key === "__schemaId")
            continue;
        if (typeof value === "function") {
            const relation = value();
            if (!isRelation(relation)) {
                throw new Error(`Invalid relation for key ${key}`);
            }
            // Call the schema function to get the actual schema
            const childSchema = createSerializableSchema(relation.schema);
            // Get toKey value by calling the function
            const toKeyField = relation.toKey.type === "reference"
                ? relation.toKey.to()
                : relation.toKey;
            const serializedToKey = {
                sql: toKeyField.sql,
                jsonSchema: zodToJsonSchema(toKeyField.zodClientSchema),
                defaultValue: toKeyField.defaultValue,
            };
            serializableSchema[key] = {
                type: "relation",
                relationType: relation.type,
                fromKey: relation.fromKey,
                toKey: serializedToKey,
                schema: childSchema,
                ...(relation.type === "hasMany" && {
                    defaultCount: relation.defaultCount,
                }),
            };
        }
        else {
            // Handle regular fields or references (unchanged)
            if (value.type === "reference") {
                const referencedField = value.to();
                const serializedField = {
                    sql: referencedField.sql,
                    jsonSchema: zodToJsonSchema(referencedField.zodClientSchema),
                    defaultValue: referencedField.defaultValue,
                    ...(referencedField.toClient &&
                        referencedField.toDb && {
                        transforms: {
                            toClient: referencedField.toClient.toString(),
                            toDb: referencedField.toDb.toString(),
                        },
                    }),
                };
                serializableSchema[key] = serializedField;
            }
            else {
                const serializedField = {
                    sql: value.sql,
                    jsonSchema: zodToJsonSchema(value.zodClientSchema),
                    defaultValue: value.defaultValue,
                    ...(value.toClient &&
                        value.toDb && {
                        transforms: {
                            toClient: value.toClient.toString(),
                            toDb: value.toDb.toString(),
                        },
                    }),
                };
                serializableSchema[key] = serializedField;
            }
        }
    }
    return serializableSchema;
}
// Update the createSchema function to handle references in the main loop
export function createSchema(schema) {
    const serialized = createSerializableSchema(schema);
    const dbFields = {};
    const clientFields = {};
    const defaultValues = {};
    for (const [key, value] of Object.entries(schema)) {
        if (key === "_tableName" || key === "__schemaId")
            continue;
        if (typeof value === "function") {
            const relation = value();
            if (!isRelation(relation)) {
                throw new Error(`Invalid relation for key ${key}`);
            }
            const childSchema = createSchema(relation.schema);
            const serializedChildren = createSerializableSchema(relation.schema);
            // Get toKey value by calling the function
            const toKeyField = relation.toKey.type === "reference"
                ? relation.toKey.to()
                : relation.toKey;
            serialized[key] = {
                type: "relation",
                relationType: relation.type,
                fromKey: relation.fromKey,
                toKey: {
                    sql: toKeyField.sql,
                    jsonSchema: zodToJsonSchema(toKeyField.zodClientSchema),
                    defaultValue: toKeyField.defaultValue,
                },
                schema: serializedChildren,
                ...(relation.type === "hasMany" && {
                    defaultCount: relation.defaultCount,
                }),
            };
            if (relation.type === "hasMany") {
                dbFields[key] = z.array(z.object(childSchema.dbSchema.shape));
                clientFields[key] = z.array(z.object(childSchema.clientSchema.shape));
                const count = relation.defaultCount || 0;
                defaultValues[key] = Array.from({ length: count }, () => ({
                    ...childSchema.defaultValues,
                }));
            }
            else {
                dbFields[key] = z.object(childSchema.dbSchema.shape);
                clientFields[key] = z.object(childSchema.clientSchema.shape);
                defaultValues[key] = childSchema.defaultValues;
            }
            continue;
        }
        // Handle references - this is the key addition
        if (value && typeof value === "object" && value.type === "reference") {
            const referencedField = value.to();
            dbFields[key] = referencedField.zodDbSchema;
            clientFields[key] = referencedField.zodClientSchema;
            defaultValues[key] =
                referencedField.defaultValue ??
                    inferDefaultFromZod(referencedField.zodClientSchema);
        }
        else {
            // Handle regular fields
            dbFields[key] = value.zodDbSchema;
            clientFields[key] = value.zodClientSchema;
            defaultValues[key] =
                value.defaultValue ?? inferDefaultFromZod(value.zodClientSchema);
        }
    }
    return {
        dbSchema: z.object(dbFields),
        clientSchema: z.object(clientFields),
        defaultValues: defaultValues,
        initialValues: () => defaultValues,
        serialized: serialized,
    };
}
