import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

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

// Internal type creation helper

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
    const sqlZodType = (() => {
      let baseType: z.ZodTypeAny;
      if (sqlConfig.pk) {
        baseType = z.number();
      } else {
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
    })() as SQLToZodType<T, false>;

    type TSql =
      SQLToZodType<T, false> extends z.ZodTypeAny
        ? SQLToZodType<T, false>
        : never;
    type DT = z.infer<TSql>;
    // Initialize with sql type for all schemas
    return createBuilder<"sql", T, TSql, TSql, DT, TSql, TSql>({
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

interface IBuilderMethods<
  T extends SQLType,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> {
  /**
   * Defines the schema and default value for creating a new item.
   * Moves the builder to the 'new' stage.
   */
  initialState: {
    // Overload 1: Just default value (keeps SQL schema)
    <TDefaultNext>(defaultValue: () => TDefaultNext): Prettify<
      Builder<
        "new",
        T,
        TSql,
        TSql, // Keep SQL schema
        TDefaultNext,
        TSql, // Client stays as SQL
        TSql // Validation stays as SQL
      >
    >;

    // Overload 2: Schema and default value
    <TNewNext extends z.ZodTypeAny, TDefaultNext>(
      schema: ((tools: { sql: TSql }) => TNewNext) | TNewNext,
      defaultValue: () => TDefaultNext
    ): Prettify<
      Builder<
        "new",
        T,
        TSql,
        TNewNext,
        z.infer<TNewNext>,
        InferSmartClientType<TSql, TNewNext>,
        InferSmartClientType<TSql, TNewNext>
      >
    >;
  };

  /**
   * Defines the schema for data sent to the client.
   * Moves the builder to the 'client' stage.
   */
  client: <TClientNext extends z.ZodTypeAny>(
    schema:
      | ((tools: { sql: TSql; initialState: TNew }) => TClientNext)
      | TClientNext
  ) => Prettify<
    Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>
  >;

  /**
   * Defines a validation schema for updates or inputs.
   * Moves the builder to the 'validation' stage.
   */
  validation: <TValidationNext extends z.ZodTypeAny>(
    schema:
      | ((tools: {
          sql: TSql;
          initialState: TNew;
          client: TClient;
        }) => TValidationNext)
      | TValidationNext
  ) => Prettify<
    Builder<
      "validation",
      T,
      TSql,
      TNew,
      TInitialValue,
      TClient,
      TValidationNext
    >
  >;

  /**
   * Finalizes the builder by providing data transformation functions.
   * This is the terminal step.
   */
  transform: (transforms: {
    toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
    toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
  }) => {
    // The final, completed configuration object
    config: Prettify<
      BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>
    > & {
      transforms: typeof transforms;
    };
  };
}

// 3. Types to manage the state machine
type Stage = "sql" | "new" | "client" | "validation" | "done";

// This mapping defines which methods are available at each stage.
// This is the key to removing the repetition!
type StageMethods = {
  sql: "initialState" | "client" | "validation" | "transform";
  new: "client" | "validation" | "transform";
  client: "validation" | "transform";
  validation: "transform";
  done: never;
};
type InferSmartClientType<
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
> = z.infer<TNew> extends z.infer<TSql> ? TNew : z.ZodUnion<[TSql, TNew]>;

// --- The Final, Refactored Builder Type ---
type BuilderConfig<
  T extends SQLType,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> = {
  sql: T;
  zodSqlSchema: TSql;
  zodNewSchema: TNew;
  initialValue: TInitialValue;
  zodClientSchema: TClient;
  zodValidationSchema: TValidation;
};

export type Builder<
  TStage extends Stage,
  T extends SQLType,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> = Prettify<
  {
    /** The configuration object, available at every stage. */
    config: Prettify<
      BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>
    >;
  } & Pick<
    // We `Pick` the available methods from the full interface
    IBuilderMethods<T, TSql, TNew, TInitialValue, TClient, TValidation>,
    StageMethods[TStage] // Based on the current stage
  >
>;

function createBuilder<
  TStage extends "sql" | "new" | "client" | "validation",
  T extends SQLType,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
>(config: {
  stage: TStage;
  sqlConfig: T;
  sqlZod: TSql;
  newZod: TNew;
  initialValue: TInitialValue;
  clientZod: TClient;
  validationZod: TValidation;
  completedStages?: Set<string>; // Track what's been done
}): Builder<TStage, T, TSql, TNew, TInitialValue, TClient, TValidation> {
  // Initialize completed stages tracker
  const completedStages = config.completedStages || new Set<string>(["sql"]);

  const builderObject = {
    config: {
      sql: config.sqlConfig,
      zodSqlSchema: config.sqlZod,
      zodNewSchema: config.newZod,
      initialValue:
        config.initialValue ||
        inferDefaultFromZod(config.clientZod as z.ZodTypeAny, config.sqlConfig),
      zodClientSchema: config.clientZod,
      zodValidationSchema: config.validationZod,
    },

    initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(
      schemaOrDefault:
        | ((tools: { sql: TSql }) => TNewNext)
        | TNewNext
        | (() => TDefaultNext),
      defaultValue?: () => TDefaultNext
    ) => {
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
          ? (schemaOrDefault as any)({ sql: config.sqlZod })
          : schemaOrDefault
        : config.sqlZod; // Keep SQL type if just setting default

      const finalDefaultValue = hasTypeParam
        ? defaultValue!
        : (schemaOrDefault as () => TDefaultNext);

      const newCompletedStages = new Set(completedStages);
      newCompletedStages.add("new");
      const newClientZod = hasTypeParam
        ? z.union([config.sqlZod as any, newSchema as any])
        : config.sqlZod;

      return createBuilder({
        ...config,
        stage: "new",
        newZod: newSchema,
        initialValue: finalDefaultValue,
        clientZod: newClientZod,
        validationZod: hasTypeParam
          ? z.union([config.sqlZod as any, newSchema as any])
          : config.sqlZod,
        completedStages: newCompletedStages,
      });
    },
    client: <TClientNext extends z.ZodTypeAny>(
      assert:
        | ((tools: { sql: TSql; initialState: TNew }) => TClientNext)
        | TClientNext
    ) => {
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

    validation: <TValidationNext extends z.ZodTypeAny>(
      assert:
        | ((tools: {
            sql: TSql;
            initialState: TNew;
            client: TClient;
          }) => TValidationNext)
        | TValidationNext
    ) => {
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

    transform: (transforms: {
      toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
      toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
      // Runtime validation
      if (
        !completedStages.has("validation") &&
        !completedStages.has("client")
      ) {
        throw new Error(
          "transform() requires at least client() or validation() to be called first"
        );
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

  return builderObject as any;
}
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

type ReferenceField<TField extends AnyFieldDefinition> = {
  type: "reference";
  to: () => TField;
};
type SchemaField<T extends SQLType = SQLType> =
  | BaseSchemaField<T>
  | ReferenceField<AnyFieldDefinition>; // Use the generic ReferenceField in the union

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
  toKey: () => SchemaField;
  schema: U;
  defaultCount?: number;
};

// First, let's create better utility types to handle the literal type preservation
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

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

function inferDefaultFromZod(
  zodType: z.ZodType<any>,
  sqlConfig?: SQLType
): any {
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

export function reference<TField extends object>(config: TField) {
  return {
    type: "reference" as const,
    to: config,
  };
}
export function createMixedValidationSchema<T extends Schema<any>>(
  schema: T,
  clientSchema?: z.ZodObject<any>,
  dbSchema?: z.ZodObject<any>
): z.ZodObject<any> {
  // If schemas are provided, use them (to avoid circular calls)
  if (clientSchema && dbSchema) {
    const mixedFields: Record<string, z.ZodTypeAny> = {};

    const allKeys = new Set([
      ...Object.keys(clientSchema.shape),
      ...Object.keys(dbSchema.shape),
    ]);

    for (const key of allKeys) {
      const clientField = clientSchema.shape[key];
      const dbField = dbSchema.shape[key];

      if (clientField && dbField) {
        mixedFields[key] = z.union([clientField, dbField]);
      } else {
        mixedFields[key] = clientField || dbField;
      }
    }

    return z.object(mixedFields);
  }

  // Build schemas manually without calling createSchema
  const clientFields: Record<string, z.ZodTypeAny> = {};
  const dbFields: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(schema)) {
    if (key === "_tableName") continue;

    if (typeof value === "function") {
      const relation = value();
      if (!isRelation(relation)) continue;

      // For relations, create mixed schemas recursively
      const childMixedSchema = createMixedValidationSchema(relation.schema);

      if (relation.type === "hasMany") {
        clientFields[key] = z.array(childMixedSchema);
        dbFields[key] = z.array(childMixedSchema);
      } else {
        clientFields[key] = childMixedSchema;
        dbFields[key] = childMixedSchema;
      }
      continue;
    }

    clientFields[key] = value.zodClientSchema;
    dbFields[key] = value.zodDbSchema;
  }

  // Now create mixed fields
  const mixedFields: Record<string, z.ZodTypeAny> = {};
  const allKeys = new Set([
    ...Object.keys(clientFields),
    ...Object.keys(dbFields),
  ]);

  for (const key of allKeys) {
    const clientField = clientFields[key];
    const dbField = dbFields[key];

    if (clientField && dbField) {
      mixedFields[key] = z.union([clientField, dbField]);
    } else {
      mixedFields[key] = (clientField || dbField) as any;
    }
  }

  return z.object(mixedFields);
}
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
type SchemaDefinition = { _tableName: string; [key: string]: any };
type InferSchemaByKey<
  T,
  Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema",
> = {
  [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
    config: { [P in Key]: infer S extends z.ZodTypeAny };
  }
    ? S
    : T[K] extends {
          type: "reference";
          to: () => { config: { [P in Key]: infer S extends z.ZodTypeAny } };
        }
      ? S // Extract the zod schema from the referenced field's config
      : T[K] extends () => {
            type: "hasMany" | "manyToMany";
            schema: infer S extends SchemaDefinition;
          }
        ? z.ZodArray<z.ZodObject<Prettify<InferSchemaByKey<S, Key>>>>
        : T[K] extends () => {
              type: "hasOne" | "belongsTo";
              schema: infer S extends SchemaDefinition;
            }
          ? z.ZodObject<Prettify<InferSchemaByKey<S, Key>>>
          : never;
};

type InferSqlSchema<T> = InferSchemaByKey<T, "zodSqlSchema">;
type InferClientSchema<T> = InferSchemaByKey<T, "zodClientSchema">;
type InferValidationSchema<T> = InferSchemaByKey<T, "zodValidationSchema">;

type InferDefaultValues2<T> = {
  [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
    config: { initialValue: infer D };
  }
    ? D
    : T[K] extends () => {
          type: "hasMany" | "manyToMany";
          schema: infer S extends SchemaDefinition;
          defaultCount?: number;
        }
      ? Array<Prettify<InferDefaultValues2<S>>>
      : T[K] extends () => {
            type: "hasOne" | "belongsTo";
            schema: infer S extends SchemaDefinition;
          }
        ? Prettify<InferDefaultValues2<S>>
        : never;
};

export function createSchema<T extends { _tableName: string }>(
  schema: T extends { _tableName: string } ? T : never
) {
  const sqlFields = {} as any;
  const clientFields = {} as any;
  const validationFields = {} as any;
  const defaultValues = {} as any;

  for (const key in schema) {
    if (key === "_tableName") continue;

    const field = schema[key] as any;

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
        defaultValues[key] = Array.from(
          { length: count },
          () => childSchemaResult.defaultValues
        );
      } else {
        // For to-one relations, use schemas directly
        sqlFields[key] = childSchemaResult.sqlSchema;
        clientFields[key] = childSchemaResult.clientSchema;
        validationFields[key] = childSchemaResult.validationSchema;
        defaultValues[key] = childSchemaResult.defaultValues;
      }
    } else if (
      field &&
      typeof field === "object" &&
      field.type === "reference"
    ) {
      const referencedField = field.to();
      sqlFields[key] = referencedField.config.zodSqlSchema;
      clientFields[key] = referencedField.config.zodClientSchema;
      validationFields[key] = referencedField.config.zodValidationSchema;
      defaultValues[key] = referencedField.config.initialValue;
    } else if (field && typeof field === "object" && "config" in field) {
      sqlFields[key] = field.config.zodSqlSchema;
      clientFields[key] = field.config.zodClientSchema;
      validationFields[key] = field.config.zodValidationSchema;
      defaultValues[key] = field.config.initialValue;
    }
  }

  return {
    sqlSchema: z.object(sqlFields) as z.ZodObject<Prettify<InferSqlSchema<T>>>,
    clientSchema: z.object(clientFields) as z.ZodObject<
      Prettify<InferClientSchema<T>>
    >,
    validationSchema: z.object(validationFields) as z.ZodObject<
      Prettify<InferValidationSchema<T>>
    >,
    defaultValues: defaultValues as Prettify<InferDefaultValues2<T>>,
  };
}

export type InferSchemaTypes<
  T extends { _tableName: string } & { [key: string]: any },
> = Prettify<{
  /** The TypeScript type for data as it exists in the database. */
  sql: z.infer<ReturnType<typeof createSchema<T>>["sqlSchema"]>;

  /** The TypeScript type for data as it is represented on the client. */
  client: z.infer<ReturnType<typeof createSchema<T>>["clientSchema"]>;

  /** The TypeScript type for data during validation, often the most flexible shape. */
  validation: z.infer<ReturnType<typeof createSchema<T>>["validationSchema"]>;

  /** The TypeScript type for the default values object. */
  defaults: ReturnType<typeof createSchema<T>>["defaultValues"];
}>;
type SerializableFieldMetadata = {
  type: "field";
  sql: SQLType;
};

type SerializableRelationMetadata = {
  type: "relation";
  relationType: RelationType;
  fromKey: string;
  toKey: string; // The final output will be a string
  schema: SerializableSchemaMetadata;
};

type SerializableSchemaMetadata = {
  _tableName: string;
  primaryKey: string | null;
  fields: Record<string, SerializableFieldMetadata>;
  relations: Record<string, SerializableRelationMetadata>;
};

// --- 2. The Smart Introspection Logic (Also good, keep it) ---

/**
 * (This is the smart function from the last answer that resolves `toKey` functions)
 */

function serializeSchemaMetadata(
  schema: Schema<any>
): SerializableSchemaMetadata {
  const fields: Record<string, SerializableFieldMetadata> = {};
  const relations: Record<string, SerializableRelationMetadata> = {};
  let primaryKey: string | null = null;

  for (const key in schema) {
    if (key === "_tableName" || key.startsWith("__")) continue;
    const definition = (schema as any)[key];
    if (isFunction(definition)) {
      const relation = definition();
      if (!isRelation(relation)) continue;
      let toKeyName: string | null = null;
      try {
        const targetFieldBuilder = relation.toKey();
        for (const targetKey in relation.schema) {
          if ((relation.schema as any)[targetKey] === targetFieldBuilder) {
            toKeyName = targetKey;
            break;
          }
        }
        if (!toKeyName)
          throw new Error(
            `Could not find field name for relation target in schema '${relation.schema._tableName}'.`
          );
      } catch (e) {
        console.error(
          `[cogsbox-shape] Error resolving 'toKey' for relation '${key}' in schema '${schema._tableName}'.`
        );
        throw e;
      }
      relations[key] = {
        type: "relation",
        relationType: relation.type,
        fromKey: relation.fromKey,
        toKey: toKeyName,
        schema: serializeSchemaMetadata(relation.schema),
      };
    } else if (definition && definition.config && definition.config.sql) {
      fields[key] = { type: "field", sql: definition.config.sql };
      if (definition.config.sql.pk === true) {
        if (primaryKey)
          console.warn(
            `[cogsbox-shape] Multiple primary keys in schema '${schema._tableName}'. Using last one found: '${key}'.`
          );
        primaryKey = key;
      }
    }
  }
  return { _tableName: schema._tableName, primaryKey, fields, relations };
}

// --- 3. The New, ENHANCED `ProcessedSyncSchemaEntry` Type ---

// This is the shape of what createSyncSchema will return FOR EACH key.
export type ProcessedSyncSchemaEntry<T extends { _tableName: string }> = {
  // --- For runtime use on the server ---
  rawSchema: T;
  schemas: ReturnType<typeof createSchema<T>>;
  validate: (data: unknown) => z.SafeParseReturnType<any, any>;
  validateClient: (data: unknown) => z.SafeParseReturnType<any, any>;

  // --- For deployment to the Durable Object ---
  serializable: {
    key: string;
    validationJsonSchema: object;
    clientJsonSchema: object;
    metadata: SerializableSchemaMetadata;
  };
};

// Update the map type to use the new entry type
export type ProcessedSyncSchemaMap<
  T extends Record<string, { _tableName: string }>,
> = {
  [K in keyof T]: ProcessedSyncSchemaEntry<T[K]>;
};

// --- 4. The Final, Corrected `createSyncSchema` Function ---

export function createSyncSchema<
  T extends Record<string, { _tableName: string }>,
>(config: {
  [K in keyof T]: {
    schema: T[K];
    validation?: (
      schema: ReturnType<typeof createSchema<T[K]>>["validationSchema"]
    ) => z.ZodSchema;
    client?: (
      schema: ReturnType<typeof createSchema<T[K]>>["clientSchema"]
    ) => z.ZodSchema;
  };
}): ProcessedSyncSchemaMap<T> {
  const processedOutput = {} as ProcessedSyncSchemaMap<T>;

  for (const key in config) {
    const entry = (config as any)[key];

    // Part 1: Generate Zod Schemas and Live Validators (same as before)
    const { sqlSchema, clientSchema, validationSchema, defaultValues } =
      createSchema(entry.schema);
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
    (processedOutput as any)[key] = {
      // For runtime server use
      rawSchema: entry.schema,
      schemas: {
        sql: sqlSchema,
        client: clientSchema,
        validation: validationSchema,
        defaults: defaultValues,
      },
      validate: (data: unknown) => finalValidationSchema.safeParse(data),
      validateClient: (data: unknown) => finalClientSchema.safeParse(data),

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
