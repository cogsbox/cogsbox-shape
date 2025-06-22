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
export type SQLType = (
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

interface IBuilderMethods<
  T extends SQLType | RelationConfig<any>,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> {
  initialState: {
    <TDefaultNext>(
      defaultValue: () => TDefaultNext
    ): Prettify<Builder<"new", T, TSql, TSql, TDefaultNext, TSql, TSql>>;
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

  client: <TClientNext extends z.ZodTypeAny>(
    schema:
      | ((tools: { sql: TSql; initialState: TNew }) => TClientNext)
      | TClientNext
  ) => Prettify<
    Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>
  >;

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

  transform: (transforms: {
    toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
    toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
  }) => {
    config: Prettify<
      BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>
    > & {
      transforms: typeof transforms;
    };
  };
}

type BaseRelationConfig<T extends Schema<any>> = {
  fromKey: string;
  toKey: () => any; // Will be resolved to specific field
  schema: () => T;
  defaultCount?: number;
};

// Extended relation types
type RelationConfig<T extends Schema<any>> =
  | (BaseRelationConfig<T> & { type: "hasMany" })
  | (BaseRelationConfig<T> & { type: "hasOne" })
  | (BaseRelationConfig<T> & { type: "belongsTo" })
  | (BaseRelationConfig<T> & { type: "manyToMany" });

// Unified builder stage - now includes relations
type Stage = "sql" | "relation" | "new" | "client" | "validation" | "done";

// Updated stage methods to include relation
type StageMethods = {
  sql: "initialState" | "client" | "validation" | "transform";
  relation: "initialState" | "client" | "validation" | "transform"; // Relations can be chained like fields
  new: "client" | "validation" | "transform";
  client: "validation" | "transform";
  validation: "transform";
  done: never;
};

type InferSmartClientType<
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
> = z.infer<TNew> extends z.infer<TSql> ? TNew : z.ZodUnion<[TSql, TNew]>;

// === UPDATED: Builder Config to Handle Relations ===
type BuilderConfig<
  T extends SQLType | RelationConfig<any>,
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
  T extends SQLType | RelationConfig<any>,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> = {
  config: {
    sql: T;
    zodSqlSchema: TSql;
    zodNewSchema: TNew;
    initialValue: TInitialValue;
    zodClientSchema: TClient;
    zodValidationSchema: TValidation;
  };
} & Pick<
  IBuilderMethods<T, TSql, TNew, TInitialValue, TClient, TValidation>,
  StageMethods[TStage]
>;
// First, define the interface for the shape object
interface ShapeAPI {
  int: (config?: IntConfig) => ReturnType<typeof createBuilder>;
  varchar: (
    config?: Omit<StringConfig, "type">
  ) => ReturnType<typeof createBuilder>;
  char: (
    config?: Omit<StringConfig, "type">
  ) => ReturnType<typeof createBuilder>;
  text: (
    config?: Omit<StringConfig, "type" | "length">
  ) => ReturnType<typeof createBuilder>;
  longtext: (
    config?: Omit<StringConfig, "type" | "length">
  ) => ReturnType<typeof createBuilder>;
  boolean: (config?: BooleanConfig) => ReturnType<typeof createBuilder>;
  date: (config?: Omit<DateConfig, "type">) => ReturnType<typeof createBuilder>;
  datetime: (
    config?: Omit<DateConfig, "type">
  ) => ReturnType<typeof createBuilder>;
  sql: <T extends SQLType>(
    sqlConfig: T
  ) => Builder<
    "sql",
    T,
    SQLToZodType<T, false>,
    SQLToZodType<T, false>,
    z.infer<SQLToZodType<T, false>>,
    SQLToZodType<T, false>,
    SQLToZodType<T, false>
  >;
  hasMany: <T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => any;
    schema: () => T;
    defaultCount?: number;
  }) => Builder<
    "relation",
    RelationConfig<T>,
    z.ZodArray<z.ZodAny>,
    z.ZodArray<z.ZodAny>,
    any[],
    z.ZodArray<z.ZodAny>,
    z.ZodArray<z.ZodAny>
  >;
  hasOne: <T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => any;
    schema: () => T;
  }) => Builder<
    "relation",
    RelationConfig<T>,
    z.ZodAny,
    z.ZodAny,
    any,
    z.ZodAny,
    z.ZodAny
  >;

  manyToMany: <T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => any;
    schema: () => T;
    defaultCount?: number;
  }) => Builder<
    "relation",
    RelationConfig<T>,
    z.ZodOptional<z.ZodArray<z.ZodAny>>,
    z.ZodOptional<z.ZodArray<z.ZodAny>>,
    any[],
    z.ZodOptional<z.ZodArray<z.ZodAny>>,
    z.ZodOptional<z.ZodArray<z.ZodAny>>
  >;
}

// Now define the shape object with the explicit type annotation
export const shape: ShapeAPI = {
  int: (config: IntConfig = {}) =>
    shape.sql({
      type: "int",
      ...config,
    }),

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

  boolean: (config: BooleanConfig = {}) =>
    shape.sql({
      type: "boolean",
      ...config,
    }),

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
  hasMany: <T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => any;
    schema: () => T;
    defaultCount?: number;
  }) => {
    const relationConfig: RelationConfig<T> = {
      type: "hasMany",
      ...config,
    };

    // Just pass the config object like reference does
    return createBuilder<
      "relation",
      RelationConfig<T>,
      any, // Use any for now to avoid circular deps
      any,
      any[],
      any,
      any
    >({
      stage: "relation",
      sqlConfig: relationConfig, // Pass the whole config object
      sqlZod: z.array(z.any()), // Remove .optional()
      newZod: z.array(z.any()),
      initialValue: Array.from(
        { length: config.defaultCount || 0 },
        () => ({})
      ),
      clientZod: z.array(z.any()),
      validationZod: z.array(z.any()),
    });
  },

  hasOne: <T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => any;
    schema: () => T;
  }) => {
    const relationConfig: RelationConfig<T> = {
      type: "hasOne",
      ...config,
    };

    const relationZodType = z.any();

    return createBuilder<
      "relation",
      RelationConfig<T>,
      typeof relationZodType,
      typeof relationZodType,
      any,
      typeof relationZodType,
      typeof relationZodType
    >({
      stage: "relation",
      sqlConfig: relationConfig,
      sqlZod: relationZodType,
      newZod: relationZodType,
      initialValue: {},
      clientZod: relationZodType,
      validationZod: relationZodType,
    });
  },

  manyToMany: <T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => any;
    schema: () => T;
    defaultCount?: number;
  }) => {
    const relationConfig: RelationConfig<T> = {
      type: "manyToMany",
      ...config,
    };

    const relationZodType = z.array(z.any()).optional();

    return createBuilder<
      "relation",
      RelationConfig<T>,
      typeof relationZodType,
      typeof relationZodType,
      any[],
      typeof relationZodType,
      typeof relationZodType
    >({
      stage: "relation",
      sqlConfig: relationConfig,
      sqlZod: relationZodType,
      newZod: relationZodType,
      initialValue: Array.from(
        { length: config.defaultCount || 0 },
        () => ({})
      ),
      clientZod: relationZodType,
      validationZod: relationZodType,
    });
  },
};

// === UPDATED: createBuilder to Handle Relations ===
function createBuilder<
  TStage extends "sql" | "relation" | "new" | "client" | "validation",
  T extends SQLType | RelationConfig<any>,
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
  completedStages?: Set<string>;
}): Builder<TStage, T, TSql, TNew, TInitialValue, TClient, TValidation> {
  const completedStages =
    config.completedStages || new Set<string>([config.stage]);

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
          ? (schemaOrDefault as any)({ sql: config.sqlZod })
          : schemaOrDefault
        : config.sqlZod;

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

export type RelationType = "hasMany" | "hasOne" | "manyToMany";
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
  sqlConfig?: SQLType | RelationConfig<any>
): any {
  // Handle relation configs
  if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
    // Check if it's a relation config by looking for relation types
    if (
      typeof sqlConfig.type === "string" &&
      ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)
    ) {
      const relationConfig = sqlConfig as RelationConfig<any>;

      if (
        relationConfig.type === "hasMany" ||
        relationConfig.type === "manyToMany"
      ) {
        return Array.from(
          { length: relationConfig.defaultCount || 0 },
          () => ({})
        );
      }
      // For hasOne and belongsTo
      return {};
    }

    // Handle SQL configs (existing logic)
    const sqlTypeConfig = sqlConfig as SQLType;
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
// In your cogsbox-shape file...
// Replace the entire existing createSchema function with this SINGLE, CORRECT version.
// In your cogsbox-shape file...
// Replace the entire existing createSchema function with this SINGLE, CORRECT version.

export function createSchema<T extends { _tableName: string }>(
  schema: T
): {
  sqlSchema: z.ZodObject<Prettify<InferSqlSchema<T>>>;
  clientSchema: z.ZodObject<Prettify<InferClientSchema<T>>>;
  validationSchema: z.ZodObject<Prettify<InferValidationSchema<T>>>;
  defaultValues: Prettify<InferDefaultValues2<T>>;
} {
  const sqlFields: any = {};
  const clientFields: any = {};
  const validationFields: any = {};
  const defaultValues: any = {};

  // Store the functions to be executed in a second pass
  const deferredFields: Array<{ key: string; definition: any }> = [];

  // --- PASS 1: Process all non-function fields ---
  for (const key in schema) {
    if (key === "_tableName" || key.startsWith("__")) continue;

    const definition = (schema as any)[key];

    if (typeof definition === "function") {
      // It's a hasMany, belongsTo, etc. Defer it.
      deferredFields.push({ key, definition });
    } else if (definition && definition.type === "reference") {
      // It's a reference. Defer it.
      deferredFields.push({ key, definition });
    } else if (definition && typeof definition.config === "object") {
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
    } else if (
      resolvedDefinition &&
      ["hasMany", "manyToMany", "hasOne", "belongsTo"].includes(
        resolvedDefinition.type
      )
    ) {
      const relation = resolvedDefinition;
      const childSchemaResult = createSchema(relation.schema);

      if (relation.type === "hasMany" || relation.type === "manyToMany") {
        sqlFields[key] = z.array(childSchemaResult.sqlSchema).optional();
        clientFields[key] = z.array(childSchemaResult.clientSchema).optional();
        validationFields[key] = z
          .array(childSchemaResult.validationSchema)
          .optional();
        defaultValues[key] = Array.from(
          { length: relation.defaultCount || 0 },
          () => childSchemaResult.defaultValues
        );
      } else {
        // hasOne or belongsTo
        sqlFields[key] = childSchemaResult.sqlSchema.optional();
        clientFields[key] = childSchemaResult.clientSchema.optional();
        validationFields[key] = childSchemaResult.validationSchema.optional();
        defaultValues[key] = childSchemaResult.defaultValues;
      }
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
