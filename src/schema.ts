import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import zodToJsonSchema, { type JsonSchema7Type } from "zod-to-json-schema";
// First the SQL types
// Add default to the base SQLType
type CurrentTimestampConfig = {
  default: "CURRENT_TIMESTAMP";
  defaultValue: Date;
};
export const isFunction = (fn: unknown): fn is Function =>
  typeof fn === "function";

// Function to create a properly typed current timestamp config
export function currentTimeStamp(): CurrentTimestampConfig {
  return {
    default: "CURRENT_TIMESTAMP",
    defaultValue: new Date(),
  };
}

// Add this to your SQLType union
type SQLType = (
  | { type: "int"; nullable?: boolean; default?: number }
  | { type: "boolean"; nullable?: boolean; default?: boolean }
  | {
      type: "date" | "datetime";
      nullable?: boolean;
      default?: "CURRENT_TIMESTAMP";
      defaultValue?: Date;
    }
  | { type: "date" | "datetime"; nullable?: boolean; default?: Date }
  | {
      type: "varchar" | "char" | "text" | "longtext";
      nullable?: boolean;
      length?: number;
      default?: string;
    }
) & { pk?: true };
// Update base config
type BaseConfig = {
  nullable?: boolean;
  pk?: true;
  field?: string; //not implemnted yet
};

// Update specific configs
type IntConfig = BaseConfig & {
  default?: number;
};

type BooleanConfig = BaseConfig & {
  default?: boolean;
};

type DateConfig = BaseConfig & {
  type?: "date" | "datetime";
  default?: Date;
};

type StringConfig = BaseConfig & {
  length?: number;
  default?: string;
};

type SQLToDefaultType<T extends SQLType> = T["nullable"] extends true
  ? T["type"] extends "varchar" | "char" | "text" | "longtext"
    ? string | null
    : T["type"] extends "int"
      ? number | null
      : T["type"] extends "boolean"
        ? boolean | null
        : T["type"] extends "date" | "datetime"
          ? T extends { default: "CURRENT_TIMESTAMP" }
            ? never
            : Date | null
          : never
  : T["type"] extends "varchar" | "char" | "text" | "longtext"
    ? string
    : T["type"] extends "int"
      ? number
      : T["type"] extends "boolean"
        ? boolean
        : T["type"] extends "date" | "datetime"
          ? T extends { default: "CURRENT_TIMESTAMP" }
            ? never
            : Date
          : never;

type SQLToZodType<
  T extends SQLType,
  TDefault extends boolean,
> = T["pk"] extends true
  ? TDefault extends true
    ? z.ZodString // Client-side: PKs are always strings
    : z.ZodNumber // Database-side: PKs are always numbers
  : T["nullable"] extends true
    ? T["type"] extends "varchar" | "char" | "text" | "longtext"
      ? z.ZodNullable<z.ZodString>
      : T["type"] extends "int"
        ? z.ZodNullable<z.ZodNumber>
        : T["type"] extends "boolean"
          ? z.ZodNullable<z.ZodBoolean>
          : T["type"] extends "date" | "datetime"
            ? T extends { default: "CURRENT_TIMESTAMP" }
              ? TDefault extends true
                ? never
                : z.ZodNullable<z.ZodDate>
              : z.ZodNullable<z.ZodDate>
            : never
    : T["type"] extends "varchar" | "char" | "text" | "longtext"
      ? z.ZodString
      : T["type"] extends "int"
        ? z.ZodNumber
        : T["type"] extends "boolean"
          ? z.ZodBoolean
          : T["type"] extends "date" | "datetime"
            ? T extends { default: "CURRENT_TIMESTAMP" }
              ? TDefault extends true
                ? never
                : z.ZodDate
              : z.ZodDate
            : never;

// Basic shape of a transform
type CustomTransform<DbType, ClientType> = {
  toClient: (dbValue: DbType) => ClientType;
  toDb: (clientValue: ClientType) => DbType;
};

// Internal type creation helper

const createClient = <
  T extends SQLType,
  DbType, // Remove the extends constraint
  ClientType, // Remove the extends constraint
  ServerType extends z.ZodTypeAny = never,
>({
  sqlConfig,
  inferredDbType,
  inferredClientType,
  baseJsonSchema,
  serverType,
}: {
  sqlConfig: T;
  inferredDbType: DbType;
  inferredClientType: ClientType;
  baseJsonSchema: any;
  serverType?: ServerType;
}) => {
  return <
    ClientType extends z.ZodTypeAny,
    DefaultValue extends z.infer<ClientType>,
  >(
    assert?:
      | ((tools: {
          zod: typeof inferredClientType;
          serverType?: ServerType;
        }) => ClientType)
      | ClientType,
    defaultValue?:
      | DefaultValue
      | (DefaultValue extends Date ? CurrentTimestampConfig : never)
  ) => {
    const clientType = isFunction(assert)
      ? assert({
          zod: inferredClientType,
          ...(serverType && { serverType }),
        })
      : assert || inferredClientType;

    // Handle timestamp default
    let finalSqlConfig = sqlConfig;
    let finalDefaultValue = defaultValue;

    if (
      defaultValue &&
      typeof defaultValue === "object" &&
      "default" in defaultValue &&
      defaultValue.default === "CURRENT_TIMESTAMP"
    ) {
      finalSqlConfig = {
        ...sqlConfig,
        default: "CURRENT_TIMESTAMP",
      };
      finalDefaultValue = defaultValue.defaultValue as DefaultValue;
    }

    const effectiveDbType = serverType || inferredDbType;
    const clientJsonSchema = zodToJsonSchema(clientType as any);

    return {
      sql: finalSqlConfig,
      zodDbSchema: effectiveDbType,
      zodClientSchema: clientType as ClientType,
      jsonSchema: serverType ? clientJsonSchema : baseJsonSchema,
      defaultValue:
        finalDefaultValue ??
        (serverType
          ? (inferDefaultFromZod(serverType) as DefaultValue)
          : (finalDefaultValue as DefaultValue)),

      transform: (transforms: {
        toClient: (
          dbValue: DbType extends z.ZodTypeAny
            ? z.infer<DbType>
            : ServerType extends z.ZodTypeAny
              ? z.infer<ServerType>
              : any
        ) => z.infer<ClientType>;
        toDb: (
          clientValue: z.infer<ClientType>
        ) => DbType extends z.ZodTypeAny
          ? z.infer<DbType>
          : ServerType extends z.ZodTypeAny
            ? z.infer<ServerType>
            : any;
      }) => ({
        sql: finalSqlConfig,
        zodDbSchema: effectiveDbType,
        zodClientSchema: clientType as ClientType,
        jsonSchema: serverType ? clientJsonSchema : baseJsonSchema,
        defaultValue: finalDefaultValue as DefaultValue,
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
export function createTransforms<
  TTransforms extends Record<string, CustomTransform<any, any>>,
>(transforms: TTransforms) {
  return {
    sql: <T extends SQLType>(config: T) => {
      const base = shape.sql(config);

      return {
        sql: base.sql,
        dbType: base.dbType,
        zodDbSchema: base.zodDbSchema,
        zodClientSchema: base.zodClientSchema,

        client: base.client,
        db: <ServerType extends z.ZodTypeAny>(
          dbType: ({ zod }: { zod: SQLToZodType<T, false> }) => ServerType
        ) => {
          const baseDb = base.db(dbType);
          const transformMethods = Object.entries(transforms).reduce(
            (acc, [key, transform]) => ({
              ...acc,
              [key]: () => ({
                sql: config,
                zodDbSchema: baseDb.zodDbSchema,
                zodClientSchema: z.unknown() as z.ZodType<
                  ReturnType<typeof transform.toClient>
                >,
                toClient: transform.toClient,
                toDb: transform.toDb,
              }),
            }),
            {}
          );

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
  int: (config: IntConfig = {}) =>
    shape.sql({
      type: "int",
      ...config,
    }),

  // String fields with variants
  varchar: (config: Omit<StringConfig, "type"> = {}) =>
    shape.sql({
      type: "varchar",
      ...config,
    }),

  char: (config: Omit<StringConfig, "type"> = {}) =>
    shape.sql({
      type: "char",
      ...config,
    }),

  text: (config: Omit<StringConfig, "type" | "length"> = {}) =>
    shape.sql({
      type: "text",
      ...config,
    }),

  longtext: (config: Omit<StringConfig, "type" | "length"> = {}) =>
    shape.sql({
      type: "longtext",
      ...config,
    }),

  // Boolean fields
  boolean: (config: BooleanConfig = {}) =>
    shape.sql({
      type: "boolean",
      ...config,
    }),

  // Date fields
  date: (config: Omit<DateConfig, "type"> = {}) =>
    shape.sql({
      type: "date",
      ...config,
    }),

  datetime: (config: Omit<DateConfig, "type"> = {}) =>
    shape.sql({
      type: "datetime",
      ...config,
    }),

  sql: <T extends SQLType>(sqlConfig: T) => {
    const inferredDbType = (() => {
      let baseType: z.ZodTypeAny;

      if (sqlConfig.pk) {
        baseType = z.number(); // DB PKs are always numbers
      } else {
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
    })() as SQLToZodType<T, false>;

    const inferredClientType = (() => {
      let baseType: z.ZodTypeAny;

      if (sqlConfig.pk) {
        baseType = z.string(); // Client PKs are always strings
      } else {
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
    })() as SQLToZodType<T, true>;

    // Create JSON Schema version immediately
    const jsonSchema = zodToJsonSchema(inferredDbType);

    return {
      sql: sqlConfig,
      dbType: inferredDbType,
      zodDbSchema: inferredDbType,
      zodClientSchema: inferredClientType,
      jsonSchema,
      defaultValue: inferDefaultFromZod(
        inferredDbType,
        sqlConfig
      ) as SQLToDefaultType<T>,

      client: createClient<T, typeof inferredDbType, typeof inferredClientType>(
        {
          sqlConfig,
          inferredDbType,
          inferredClientType,
          baseJsonSchema: jsonSchema,
        }
      ),

      db: <ServerType extends z.ZodTypeAny>(
        assert:
          | ((tools: { zod: typeof inferredDbType }) => ServerType)
          | ServerType
      ) => {
        const serverType = isFunction(assert)
          ? assert({ zod: inferredDbType })
          : assert;

        return {
          sql: sqlConfig,
          dbType: serverType,
          zodDbSchema: serverType,
          zodClientSchema: inferredClientType,
          jsonSchema: zodToJsonSchema(serverType),
          defaultValue: inferDefaultFromZod(serverType) as z.infer<ServerType>,

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
export function hasMany<T extends Schema<any>>(config: {
  fromKey: string;
  toKey: () => T[keyof T];
  schema: () => T;
  defaultCount?: number;
}) {
  return () => ({
    type: "hasMany" as const,
    fromKey: config.fromKey,
    toKey: config.toKey(),
    schema: config.schema(),
    defaultCount: config.defaultCount,
  });
}

export function hasOne<T extends Schema<any>>(config: {
  fromKey: string;
  toKey: () => T[keyof T];
  schema: () => T;
}) {
  return () => ({
    type: "hasOne" as const,
    fromKey: config.fromKey,
    toKey: config.toKey(),
    schema: config.schema(),
  });
}

export function belongsTo<T extends Schema<any>>(config: {
  fromKey: string;
  toKey: () => T[keyof T];
  schema: () => T;
}) {
  return () => ({
    type: "belongsTo" as const,
    fromKey: config.fromKey,
    toKey: config.toKey(),
    schema: config.schema(),
  });
}

export function manyToMany<T extends Schema<any>>(config: {
  fromKey: string;
  toKey: () => T[keyof T];
  schema: () => T;
  defaultCount?: number;
}) {
  return () => ({
    type: "manyToMany" as const,
    fromKey: config.fromKey,
    toKey: config.toKey(),
    schema: config.schema(),
    defaultCount: config.defaultCount,
  });
}

type RelationType = "hasMany" | "belongsTo" | "hasOne" | "manyToMany";
// Updated SchemaField to use server/client instead of dbType/toClient/toDb
type BaseSchemaField<T extends SQLType = SQLType> = {
  type: "field";
  sql: T;
  zodDbSchema: z.ZodType<any>;
  zodClientSchema: z.ZodType<any>;
  defaultValue?: any;
  __fieldId?: string;
  toClient?: (dbValue: any) => any;
  toDb?: (clientValue: any) => any;
};
type AnyFieldDefinition = ReturnType<typeof shape.sql>;

// 1. Modify ReferenceField to be generic `TField` and intersect it with the `to` and `type` properties.
//    This ensures all properties of TField (including `field?: string`) are carried over.
type ReferenceField<
  TField extends AnyFieldDefinition,
  TTo extends SchemaField,
> = TField & {
  type: "reference"; // Override the 'type' literal to "reference"
  to: () => TTo; // Add the 'to' property
};

type SchemaField<T extends SQLType = SQLType> =
  | BaseSchemaField<T>
  | ReferenceField<AnyFieldDefinition, any>; // Use the generic ReferenceField in the union

// Update Schema type to include references
export type Schema<
  T extends Record<string, SchemaField | (() => Relation<any>)>,
> = {
  _tableName: string;
  __schemaId?: string;

  [key: string]: T[keyof T] | string | ((id: number) => string) | undefined;
};
type ValidShapeField = ReturnType<typeof shape.sql>;

// Define the strict shape schema with existing types
export type ShapeSchema = {
  _tableName: string;

  [key: string]: string | ((id: number) => string) | ValidShapeField;
};

type Relation<U extends Schema<any>> = {
  type: RelationType;
  fromKey: string;
  toKey: SchemaField;
  schema: U;
  defaultCount?: number;
};

// First, let's create better utility types to handle the literal type preservation
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Helper type to extract the exact SQL type
type InferSchema<T> = {
  [K in keyof T as K extends "_tableName" | "__schemaId"
    ? never
    : K]: T[K] extends {
    zodClientSchema: infer ClientType extends z.ZodTypeAny;
    toClient?: (dbValue: any) => infer TransformedType;
  }
    ? T[K]["toClient"] extends Function
      ? z.ZodType<TransformedType>
      : ClientType extends z.ZodNever
        ? z.ZodOptional<z.ZodDate>
        : ClientType
    : T[K] extends () => { type: "hasMany"; schema: infer S }
      ? z.ZodArray<
          z.ZodObject<{
            [P in keyof S as P extends "_tableName" | "__schemaId"
              ? never
              : P]: S[P] extends {
              zodClientSchema: z.ZodTypeAny;
              toClient?: (dbValue: any) => any;
            }
              ? S[P]["toClient"] extends Function
                ? z.ZodType<ReturnType<S[P]["toClient"]>>
                : S[P]["zodClientSchema"] extends z.ZodNever
                  ? z.ZodOptional<z.ZodDate>
                  : S[P]["zodClientSchema"]
              : never;
          }>
        >
      : T[K] extends () => { type: "hasOne" | "belongsTo"; schema: infer S }
        ? z.ZodObject<{
            [P in keyof S as P extends "_tableName" | "__schemaId"
              ? never
              : P]: S[P] extends {
              zodClientSchema: z.ZodTypeAny;
              toClient?: (dbValue: any) => any;
            }
              ? S[P]["toClient"] extends Function
                ? z.ZodType<ReturnType<S[P]["toClient"]>>
                : S[P]["zodClientSchema"] extends z.ZodNever
                  ? z.ZodOptional<z.ZodDate>
                  : S[P]["zodClientSchema"]
              : never;
          }>
        : never;
};
export type InferDBSchema<T> = {
  [K in keyof T as K extends "_tableName" | "__schemaId"
    ? never
    : K]: T[K] extends {
    zodDbSchema: infer DbType extends z.ZodTypeAny;
  }
    ? DbType
    : T[K] extends {
          dbType: infer DbType extends z.ZodTypeAny;
        }
      ? DbType
      : T[K] extends () => { type: "hasMany"; schema: infer S }
        ? z.ZodArray<
            z.ZodObject<{
              [P in keyof S as P extends "_tableName" | "__schemaId"
                ? never
                : P]: S[P] extends {
                zodDbSchema: infer DbType extends z.ZodTypeAny;
              }
                ? DbType
                : never;
            }>
          >
        : T[K] extends () => { type: "hasOne" | "belongsTo"; schema: infer S }
          ? z.ZodObject<{
              [P in keyof S as P extends "_tableName" | "__schemaId"
                ? never
                : P]: S[P] extends {
                zodDbSchema: infer DbType extends z.ZodTypeAny;
              }
                ? DbType
                : never;
            }>
          : never;
};
type UUID = string | `${string}-${string}-${string}-${string}-${string}`;
type InferDefaultValues<T, TDefault extends boolean = true> = {
  [K in keyof T as K extends "_tableName" | "__schemaId"
    ? never
    : K]: T[K] extends {
    sql: { pk: true };
  }
    ? UUID
    : T[K] extends {
          defaultValue: infer U;
        }
      ? U
      : T[K] extends {
            zodClientSchema: z.ZodOptional<any>;
          }
        ? undefined
        : T[K] extends { zodClientSchema: z.ZodNullable<any> }
          ? null
          : T[K] extends { zodClientSchema: z.ZodArray<any> }
            ? z.infer<T[K]["zodClientSchema"]> | []
            : T[K] extends { zodClientSchema: z.ZodObject<any> }
              ? z.infer<T[K]["zodClientSchema"]> | {}
              : T[K] extends () => { type: "hasMany"; schema: infer S }
                ? Array<Prettify<InferDefaultValues<S>>>
                : T[K] extends () => {
                      type: "hasOne" | "belongsTo";
                      schema: infer S;
                    }
                  ? Prettify<InferDefaultValues<S>>
                  : T[K] extends { zodClientSchema: z.ZodType<any> }
                    ? z.infer<T[K]["zodClientSchema"]>
                    : never;
};

function isRelation(value: any): value is Relation<any> {
  return (
    value &&
    typeof value === "object" &&
    "type" in value &&
    "fromKey" in value &&
    "toKey" in value &&
    "schema" in value
  );
}

function inferDefaultFromZod(
  zodType: z.ZodType<any>,
  sqlConfig?: SQLType
): any {
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
type DeepWriteable<T> = T extends Date // Ensure Date remains untouched
  ? T
  : T extends object
    ? { -readonly [K in keyof T]: DeepWriteable<T[K]> }
    : T;

// Type to infer the serialized schema structure
export type SerializableField = {
  sql: SQLType;
  jsonSchema: JsonSchema7Type;
  defaultValue?: any;
  transforms?: {
    toClient: string;
    toDb: string;
  };
};

// Relations for serializable schema
export type SerializableRelation = {
  type: "relation";
  relationType: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
  fromKey: string;
  toKey: SerializableField;
  defaultCount?: number;
};

// Recursive type for serializable schema
export type SerializableSchema = {
  _tableName: string;
  __schemaId: string;
  _syncKey?: {
    toString: string; // Store function body as string
  };
} & {
  [key: string]:
    | SerializableField
    | (SerializableRelation & { schema: SerializableSchema });
};
type InferSerializedSchema<T> = {
  [K in keyof T as K extends "_tableName" | "__schemaId"
    ? never
    : K]: T[K] extends {
    sql: infer S;
    zodClientSchema: any;
    defaultValue?: infer D;
  }
    ? {
        sql: S;
        jsonSchema: JsonSchema7Type;
        defaultValue: D;
        transforms?: {
          toClient: string;
          toDb: string;
        };
      }
    : T[K] extends () => {
          type: "hasMany";
          schema: infer S;
          fromKey: infer FK;
          toKey: infer TK;
        }
      ? {
          type: "relation";
          relationType: "hasMany";
          fromKey: FK;
          toKey: TK extends {
            sql: infer TKSQL;
            zodClientSchema: any;
            defaultValue?: infer TKD;
          }
            ? {
                sql: TKSQL;
                jsonSchema: JsonSchema7Type;
                defaultValue: TKD;
                transforms?: {
                  toClient: string;
                  toDb: string;
                };
              }
            : never;
          schema: Prettify<InferSerializedSchema<S>> & {
            _tableName: string;
            __schemaId: string;
          };
          defaultCount?: number;
        }
      : T[K] extends () => {
            type: infer R;
            schema: infer S;
            fromKey: infer FK;
            toKey: infer TK;
          }
        ? {
            type: "relation";
            relationType: R;
            fromKey: FK;
            toKey: TK extends {
              sql: infer TKSQL;
              zodClientSchema: any;
              defaultValue?: infer TKD;
            }
              ? {
                  sql: TKSQL;
                  jsonSchema: JsonSchema7Type;
                  defaultValue: TKD;
                  transforms?: {
                    toClient: string;
                    toDb: string;
                  };
                }
              : never;
            schema: Prettify<InferSerializedSchema<S>> & {
              _tableName: string;
              __schemaId: string;
            };
          }
        : never;
};

export function reference<
  TTargetField extends SchemaField,
  TField extends object,
>(config: {
  to: () => TTargetField;
  field: TField;
}): TField & { type: "reference"; to: () => TTargetField } {
  return {
    ...config.field,
    type: "reference" as const,
    to: config.to,
  };
}
function createSerializableSchema<T extends Schema<any>>(
  schema: T
): SerializableSchema {
  const serializableSchema = {
    _tableName: schema._tableName,
    __schemaId: crypto.randomUUID(),
    _syncKey: schema._syncKey
      ? {
          toString: schema._syncKey.toString(),
        }
      : undefined,
  } as SerializableSchema;

  for (const [key, value] of Object.entries(schema)) {
    if (key === "_tableName" || key === "__schemaId") continue;

    if (typeof value === "function") {
      const relation = value();
      if (!isRelation(relation)) {
        throw new Error(`Invalid relation for key ${key}`);
      }

      // Call the schema function to get the actual schema
      const childSchema = createSerializableSchema(relation.schema);

      // Get toKey value by calling the function
      const toKeyField =
        relation.toKey.type === "reference"
          ? relation.toKey.to()
          : relation.toKey;

      const serializedToKey: SerializableField = {
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
    } else {
      // Handle regular fields or references (unchanged)
      if (value.type === "reference") {
        const referencedField = value.to();
        const serializedField: SerializableField = {
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
      } else {
        const serializedField: SerializableField = {
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

export function createMixedValidationSchema<T extends Schema<any>>(
  schema: T
): z.ZodObject<any> {
  const { clientSchema, dbSchema } = createSchema(schema);

  // Create a schema that accepts either client or db format for each field
  const mixedFields: Record<string, z.ZodTypeAny> = {};

  // Get all unique keys from both schemas
  const allKeys = new Set([
    ...Object.keys(clientSchema.shape),
    ...Object.keys(dbSchema.shape),
  ]);

  for (const key of allKeys) {
    const clientField =
      clientSchema.shape[key as keyof typeof clientSchema.shape];
    const dbField = dbSchema.shape[key];

    if (clientField && dbField) {
      // If field exists in both, allow either type
      mixedFields[key] = z.union([clientField, dbField]);
    } else {
      // If field only exists in one, use that type
      mixedFields[key] = clientField || dbField;
    }
  }

  return z.object(mixedFields);
}
type InferMixedSchema<T extends Schema<any>> = {
  [K in keyof T as K extends "_tableName" | "__schemaId"
    ? never
    : K]: T[K] extends { zodClientSchema: infer C; zodDbSchema: infer D }
    ? C extends z.ZodTypeAny
      ? D extends z.ZodTypeAny
        ? z.ZodUnion<[C, D]>
        : C
      : D extends z.ZodTypeAny
        ? D
        : never
    : T[K] extends () => {
          type: "hasMany";
          schema: infer S extends Schema<any>;
        }
      ? z.ZodArray<z.ZodObject<InferMixedSchema<S>>>
      : T[K] extends () => {
            type: "hasOne" | "belongsTo";
            schema: infer S extends Schema<any>;
          }
        ? z.ZodObject<InferMixedSchema<S>>
        : never;
};
type ConversionType<T extends Schema<any>> = SchemaTypes<T>["client"] &
  SchemaTypes<T>["db"];
export function createSchema<T extends Schema<any>>(schema: T) {
  const serialized = createSerializableSchema(schema);
  const dbFields: Record<string, z.ZodTypeAny> = {};
  const clientFields: Record<string, z.ZodTypeAny> = {};
  const defaultValues = {} as Record<string, any>;

  for (const [key, value] of Object.entries(schema)) {
    if (key === "_tableName") continue;

    if (typeof value === "function") {
      const relation = value();
      if (!isRelation(relation)) {
        throw new Error(`Invalid relation for key ${key}`);
      }

      const childSchema = createSchema(relation.schema);
      const serializedChildren = createSerializableSchema(relation.schema);

      // Get toKey value by calling the function
      const toKeyField =
        relation.toKey.type === "reference"
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
      } else {
        dbFields[key] = z.object(childSchema.dbSchema.shape);
        clientFields[key] = z.object(childSchema.clientSchema.shape);
        defaultValues[key] = childSchema.defaultValues;
      }
      continue;
    }

    dbFields[key] = value.zodDbSchema;
    clientFields[key] = value.zodClientSchema;
    defaultValues[key] =
      value.defaultValue ?? inferDefaultFromZod(value.zodClientSchema);
  }
  const mixedSchema = createMixedValidationSchema(schema);
  return {
    dbSchema: z.object(dbFields) as z.ZodObject<Prettify<InferDBSchema<T>>>,
    clientSchema: z.object(clientFields) as z.ZodObject<
      Prettify<OmitNever<InferSchema<T>>>
    >,
    mixedSchema: mixedSchema as z.ZodObject<Prettify<InferMixedSchema<T>>>,
    defaultValues: defaultValues as Prettify<
      OmitNever<ConfigWithOptionalProps<T>>
    >,
    initialValues: () =>
      defaultValues as Prettify<OmitNever<ConfigWithOptionalProps<T>>>,
    serialized: serialized as Prettify<InferSerializedSchema<T>> & {
      _tableName: string;
      __schemaId: string;
    },
  };
}

type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
type DefaultValue<T> = Prettify<DeepWriteable<InferDefaultValues<T>>>;
type GetMandatoryKeys<T> = {
  [P in keyof T]: T[P] extends Exclude<T[P], undefined> ? P : never;
}[keyof T];
type MandatoryProps<T> = Pick<
  DefaultValue<T>,
  GetMandatoryKeys<DefaultValue<T>>
>;
type ConfigWithOptionalProps<T> = Partial<DefaultValue<T>> & MandatoryProps<T>;

export type SchemaTypes<T extends Schema<any>> = {
  client: z.infer<
    typeof createSchema<T> extends (...args: any) => { clientSchema: infer R }
      ? R
      : never
  >;
  db: z.infer<
    typeof createSchema<T> extends (...args: any) => { dbSchema: infer R }
      ? R
      : never
  >;
  both: z.infer<
    typeof createSchema<T> extends (...args: any) => {
      clientSchema: infer C;
      dbSchema: infer D;
    }
      ? C | D
      : never
  >;
  join: ConversionType<T>;
};
