import { z, type ZodTypeAny } from "zod";
import { ca } from "zod/v4/locales";

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
      type: "date" | "datetime" | "timestamp";
      nullable?: boolean;
      default?: "CURRENT_TIMESTAMP";
      defaultValue?: string;
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
  type?: "date" | "datetime" | "timestamp";
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
          : T["type"] extends "date" | "datetime" | "timestamp"
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
          : T["type"] extends "date" | "datetime" | "timestamp"
            ? T extends { default: "CURRENT_TIMESTAMP" }
              ? TDefault extends true
                ? never
                : z.ZodDate
              : z.ZodDate
            : never;
type ZodTypeFromPrimitive<T> = T extends string
  ? z.ZodString
  : T extends number
    ? z.ZodNumber
    : T extends boolean
      ? z.ZodBoolean
      : T extends Date
        ? z.ZodDate
        : z.ZodAny;
type IsLiteralType<T> = T extends string
  ? string extends T
    ? false
    : true
  : T extends number
    ? number extends T
      ? false
      : true
    : T extends boolean
      ? boolean extends T
        ? false
        : true
      : false;

type CollapsedUnion<
  A extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
> = A extends B ? (B extends A ? A : z.ZodUnion<[A, B]>) : z.ZodUnion<[A, B]>;
export interface IBuilderMethods<
  T extends SQLType | RelationConfig<any>,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> {
  // PASTE THIS ENTIRE BLOCK. THIS IS THE ONE.
  initialState: {
    // Overload 1: For a single argument (value or schema)
    <const TValue>(
      value: TValue extends (...args: any[]) => void | undefined
        ? never
        : TValue
    ): TValue extends (...args: any[]) => infer R
      ? R extends void | undefined
        ? never
        : TValue extends z.ZodTypeAny
          ? Prettify<
              Builder<
                "new",
                T,
                TSql,
                TValue,
                z.infer<TValue>,
                CollapsedUnion<TSql, TValue>,
                CollapsedUnion<TSql, TValue>
              >
            >
          : R extends string | number | boolean
            ? Prettify<
                Builder<
                  "new",
                  T,
                  TSql,
                  z.ZodLiteral<R>,
                  R,
                  CollapsedUnion<TSql, z.ZodLiteral<R>>,
                  CollapsedUnion<TSql, z.ZodLiteral<R>>
                >
              >
            : Prettify<
                Builder<
                  "new",
                  T,
                  TSql,
                  ZodTypeFromPrimitive<R>,
                  R,
                  CollapsedUnion<TSql, ZodTypeFromPrimitive<R>>,
                  CollapsedUnion<TSql, ZodTypeFromPrimitive<R>>
                >
              >
      : TValue extends z.ZodTypeAny
        ? Prettify<
            Builder<
              "new",
              T,
              TSql,
              TValue,
              z.infer<TValue>,
              CollapsedUnion<TSql, TValue>,
              CollapsedUnion<TSql, TValue>
            >
          >
        : TValue extends string | number | boolean
          ? Prettify<
              Builder<
                "new",
                T,
                TSql,
                z.ZodLiteral<TValue>,
                TValue,
                CollapsedUnion<TSql, z.ZodLiteral<TValue>>,
                CollapsedUnion<TSql, z.ZodLiteral<TValue>>
              >
            >
          : Prettify<
              Builder<
                "new",
                T,
                TSql,
                ZodTypeFromPrimitive<TValue>,
                TValue,
                CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue>>,
                CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue>>
              >
            >;

    // Overload 2: For a value AND an explicit Zod schema.
    <const TValue, TSchema extends z.ZodTypeAny>(
      value: TValue extends (...args: any[]) => void | undefined
        ? never
        : TValue,
      schema: TSchema
    ): Prettify<
      Builder<
        "new",
        T,
        TSql,
        TSchema,
        TValue extends () => infer R ? R : TValue,
        CollapsedUnion<TSql, TSchema>,
        CollapsedUnion<TSql, TSchema>
      >
    >;

    // Overload 3: For a value AND a schema modifier function.
    <const TValue, TSchema extends z.ZodTypeAny>(
      value: TValue extends (...args: any[]) => void | undefined
        ? never
        : TValue,
      schemaModifier: (
        baseSchema: TValue extends () => infer R
          ? R extends string | number | boolean
            ? z.ZodLiteral<R>
            : ZodTypeFromPrimitive<R>
          : TValue extends string | number | boolean
            ? z.ZodLiteral<TValue>
            : ZodTypeFromPrimitive<TValue>
      ) => TSchema
    ): Prettify<
      Builder<
        "new",
        T,
        TSql,
        TSchema,
        TValue extends () => infer R ? R : TValue,
        CollapsedUnion<TSql, TSchema>,
        CollapsedUnion<TSql, TSchema>
      >
    >;
  };

  reference: <TRefSchema extends { _tableName: string }>(
    fieldGetter: () => any
  ) => Builder<
    "sql",
    T & { references: typeof fieldGetter },
    TSql,
    TNew,
    TInitialValue,
    TClient,
    TValidation
  >;
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
export type RelationConfig<T extends Schema<any>> =
  | (BaseRelationConfig<T> & { type: "hasMany" })
  | (BaseRelationConfig<T> & { type: "hasOne" })
  | (BaseRelationConfig<T> & { type: "belongsTo" })
  | (BaseRelationConfig<T> & { type: "manyToMany" });

// Unified builder stage - now includes relations
type Stage = "sql" | "relation" | "new" | "client" | "validation" | "done";

// Updated stage methods to include relation
type StageMethods = {
  sql: "initialState" | "client" | "validation" | "transform" | "reference";
  relation: "validation" | "transform";
  new: "client" | "validation" | "transform";
  client: "validation" | "transform";
  validation: "transform";
  done: never;
};

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
  clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
  validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
type HasManyDefault =
  | true
  | undefined // Don't include in defaults at all
  | [] // Include as empty array
  | { count: number }; // Generate N items

// For hasOne/belongsTo
type HasOneDefault =
  | true
  | undefined // Don't include in defaults at all
  | null; // Include as null

export type Reference<TGetter extends () => any> = {
  __type: "reference";
  getter: TGetter;
};

// First, define the interface for the shape object
interface ShapeAPI {
  // int: (config?: IntConfig) => ReturnType<typeof createBuilder>;
  // varchar: (
  //   config?: Omit<StringConfig, "type">
  // ) => ReturnType<typeof createBuilder>;
  // char: (
  //   config?: Omit<StringConfig, "type">
  // ) => ReturnType<typeof createBuilder>;
  // text: (
  //   config?: Omit<StringConfig, "type" | "length">
  // ) => ReturnType<typeof createBuilder>;
  // longtext: (
  //   config?: Omit<StringConfig, "type" | "length">
  // ) => ReturnType<typeof createBuilder>;
  // boolean: (config?: BooleanConfig) => ReturnType<typeof createBuilder>;
  // date: (config?: Omit<DateConfig, "type">) => ReturnType<typeof createBuilder>;
  // datetime: (
  //   config?: Omit<DateConfig, "type">
  // ) => ReturnType<typeof createBuilder>;
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
  reference: <TGetter extends () => any>(getter: TGetter) => Reference<TGetter>;

  hasMany: <T extends HasManyDefault>(
    config?: T
  ) => PlaceholderRelation<"hasMany">;
  hasOne: (config?: HasOneDefault) => PlaceholderRelation<"hasOne">;

  manyToMany: (config?: {
    defaultCount?: number;
    defaultConfig?: HasManyDefault;
  }) => PlaceholderRelation<"manyToMany">;
}

// Now define the shape object with the explicit type annotation
export const s: ShapeAPI = {
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

  reference: <TGetter extends () => any>(
    getter: TGetter
  ): Reference<TGetter> => ({
    __type: "reference",
    getter: getter,
  }),

  hasMany: (config?: HasManyDefault) => ({
    __type: "placeholder-relation" as const,
    relationType: "hasMany" as const,
    defaultCount:
      config && typeof config === "object" && "count" in config
        ? config.count
        : 0,
    defaultConfig: config,
  }),

  hasOne: (config?: HasOneDefault) => ({
    __type: "placeholder-relation" as const,
    relationType: "hasOne" as const,
    defaultConfig: config, // This line is the crucial fix
  }),

  manyToMany: (config?: { defaultCount?: number }) => ({
    __type: "placeholder-relation" as const,
    relationType: "manyToMany" as const,
    defaultCount: config?.defaultCount ?? 0,
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
      sqlZod: sqlZodType as SQLToZodType<T, false>,
      newZod: sqlZodType as SQLToZodType<T, false>,
      initialValue: inferDefaultFromZod(sqlZodType, sqlConfig),
      clientZod: sqlZodType as SQLToZodType<T, false>,
      validationZod: sqlZodType as SQLToZodType<T, false>,
    }) as Prettify<
      Builder<
        "sql",
        T,
        SQLToZodType<T, false>,
        SQLToZodType<T, false>,
        z.infer<SQLToZodType<T, false>>,
        SQLToZodType<T, false>,
        SQLToZodType<T, false>
      >
    >;
  },
};
// PASTE THIS ENTIRE FUNCTION OVER YOUR EXISTING createBuilder

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
  clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
  validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
      clientTransform: config.clientTransform, // <-- FIX: Make sure transform is passed through
      validationTransform: config.validationTransform, // <-- FIX: Make sure transform is passed through
    },
    initialState: <const TValue, TSchema extends z.ZodTypeAny>(
      value: TValue | (() => TValue),
      schemaModifier?: (baseSchema: z.ZodTypeAny) => TSchema
    ) => {
      if (completedStages.has("new")) {
        throw new Error("initialState() can only be called once in the chain");
      }

      let actualValue: any;
      let baseSchema: z.ZodTypeAny;

      // Check if value is a Zod schema
      if (value && typeof value === "object" && "_def" in value) {
        // It's a Zod schema - infer the default value
        baseSchema = value as any;
        actualValue = inferDefaultFromZod(baseSchema, config.sqlConfig);
      } else {
        // Get the actual value
        actualValue = isFunction(value) ? (value as any)() : value;

        // Create base Zod schema from the value type
        // Check if it's a literal value (string, number, boolean)
        if (
          typeof actualValue === "string" ||
          typeof actualValue === "number" ||
          typeof actualValue === "boolean"
        ) {
          baseSchema = z.literal(actualValue);
        } else if (actualValue instanceof Date) {
          baseSchema = z.date();
        } else if (actualValue === null) {
          baseSchema = z.null();
        } else if (actualValue === undefined) {
          baseSchema = z.undefined();
        } else {
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
      }) as any;
    },
    reference: <TRefSchema extends { _tableName: string }>(
      fieldGetter: () => any
    ) => {
      return createBuilder({
        ...config,
        sqlConfig: {
          ...config.sqlConfig,
          reference: fieldGetter,
        } as T & { reference: typeof fieldGetter },
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

      const newCompletedStages = new Set(completedStages);
      newCompletedStages.add("client");

      if (config.stage === "relation") {
        return createBuilder({
          ...config,
          stage: "client",
          completedStages: newCompletedStages,
          // Store the transform function to be used later
          clientTransform: (baseSchema: z.ZodTypeAny) => {
            if (isFunction(assert)) {
              // We use `as any` here to resolve the complex generic type error.
              // It's safe because we know the baseSchema will have the necessary Zod methods.
              return assert({
                sql: baseSchema as any,
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

    validation: <TValidationNext extends z.ZodTypeAny>(
      // ... this validation function remains unchanged ...
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
      // ... this transform function remains unchanged ...
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

export type EnrichedField<
  K extends string,
  V,
  TSchema extends ShapeSchema,
> = V & {
  __meta: {
    _key: K;
    _fieldType: V;
  };
  __parentTableType: TSchema;
};
export type EnrichFields<T extends ShapeSchema> = {
  [K in keyof T]: K extends "_tableName"
    ? T[K] // Keep _tableName as is
    : K extends string
      ? EnrichedField<K, T[K], T>
      : T[K];
};
export const SchemaWrapperBrand = Symbol("SchemaWrapper");

// Update the schema function
export function schema<T extends string, U extends ShapeSchema<T>>(
  schema: U
): Prettify<EnrichFields<U>> {
  const enrichedSchema: any = {};

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      if (key === "_tableName") {
        // Don't enrich _tableName, keep it as a simple string
        enrichedSchema[key] = schema[key];
      } else {
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
  return enrichedSchema as any;
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

type SchemaField<T extends SQLType = SQLType> = BaseSchemaField<T>;

// Update Schema type to include references
export type Schema<
  T extends Record<string, SchemaField | (() => Relation<any>)>,
> = {
  _tableName: string;

  __schemaId?: string;

  [key: string]:
    | T[keyof T]
    | string
    | ((id: number) => string)
    | true
    | undefined;
};
type ValidShapeField = ReturnType<typeof s.sql>;

export type ShapeSchema<T extends string = string> = {
  _tableName: T;
  [SchemaWrapperBrand]?: true; // Use symbol as optional property
  [key: string]:
    | string
    | ((id: number) => string)
    | ValidShapeField
    | true
    | undefined;
};

type Relation<U extends Schema<any>> = {
  type: RelationType;
  fromKey: keyof U;
  toKey: () => SchemaField;
  schema: U;
  defaultCount?: number;
};
function inferDefaultFromZod(
  zodType: z.ZodType<any>,
  sqlConfig?: SQLType | RelationConfig<any>
): any {
  if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
    if ("default" in sqlConfig && sqlConfig.default !== undefined) {
      if (sqlConfig.default === "CURRENT_TIMESTAMP") {
        return undefined;
      }
      // Otherwise, use the provided SQL default.
      return sqlConfig.default;
    }

    // --- PRESERVED LOGIC: Handle relation types (NO CHANGES HERE) ---
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
      if (
        relationConfig.type === "hasOne" ||
        relationConfig.type === "belongsTo"
      ) {
        return {};
      }
    }

    // --- PRESERVED LOGIC: Handle basic SQL types as a fallback (NO CHANGES HERE) ---
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

type InferSchemaByKey<
  T,
  Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10 // Prevent infinite recursion
  ? any
  : {
      [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand
        ? never
        : K]: T[K] extends {
        // Case 1: Builder for hasMany/manyToMany
        config: {
          sql: { type: "hasMany" | "manyToMany"; schema: () => infer S };
        };
      }
        ? z.ZodArray<
            S extends { _tableName: string }
              ? z.ZodObject<
                  Omit<
                    InferSchemaByKey<S, Key, [...Depth, 1]>,
                    typeof SchemaWrapperBrand
                  >
                >
              : z.ZodObject<any>
          >
        : // Case 2: Builder for hasOne/belongsTo
          T[K] extends {
              config: {
                sql: { type: "hasOne" | "belongsTo"; schema: () => infer S };
              };
            }
          ? S extends { _tableName: string }
            ? z.ZodObject<
                Omit<
                  InferSchemaByKey<S, Key, [...Depth, 1]>,
                  typeof SchemaWrapperBrand
                >
              >
            : z.ZodObject<any>
          : // Case 3: Reference fields
            T[K] extends { type: "reference"; to: () => infer RefField }
            ? RefField extends { config: { [P in Key]: infer ZodSchema } }
              ? ZodSchema
              : never
            : // Case 4: Standard field builder
              T[K] extends {
                  config: infer Config;
                }
              ? Key extends "zodSqlSchema"
                ? Config extends {
                    sql: infer SqlConfig;
                    zodSqlSchema: infer ZodSchema extends z.ZodTypeAny;
                  }
                  ? ZodSchema
                  : never
                : Config extends {
                      [P in Key]: infer ZodSchema extends z.ZodTypeAny;
                    }
                  ? ZodSchema
                  : never
              : never;
    };

type InferSqlSchema<T> = InferSchemaByKey<T, "zodSqlSchema">;
type InferClientSchema<T> = InferSchemaByKey<T, "zodClientSchema">;
type InferValidationSchema<T> = InferSchemaByKey<T, "zodValidationSchema">;

// Helper to check if something is a reference
function isReference<T extends () => any>(value: any): value is Reference<T> {
  return value && typeof value === "object" && value.__type === "reference";
}

export function createSchema<
  T extends { _tableName: string; [SchemaWrapperBrand]?: true },
  R extends Record<string, any> = {},
  TActualSchema extends Omit<T & R, typeof SchemaWrapperBrand> = Omit<
    T & R,
    typeof SchemaWrapperBrand
  >,
>(
  schema: T,
  relations?: R
): {
  sqlSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>
  >;
  clientSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>
  >;
  validationSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
  >;
  defaultValues: Prettify<DeriveDefaults<TActualSchema>>;
  toClient: (
    dbObject: z.infer<
      z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
    >
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>
  >;
  toDb: (
    clientObject: z.infer<
      z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>
    >
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
  >;
} {
  const sqlFields: any = {};
  const clientFields: any = {};
  const validationFields: any = {};
  const defaultValues: any = {};
  const fieldTransforms: Record<
    string,
    { toClient: (val: any) => any; toDb: (val: any) => any }
  > = {};

  const fullSchema = { ...schema, ...(relations || {}) };

  for (const key in fullSchema) {
    if (
      key === "_tableName" ||
      key.startsWith("__") ||
      key === String(SchemaWrapperBrand)
    )
      continue;

    const definition = (fullSchema as any)[key];

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
      defaultValues[key] = inferDefaultFromZod(
        referencedConfig.zodClientSchema,
        { ...referencedConfig.sql, default: undefined }
      );
      continue;
    }

    // Handle fields with a config property (builders)
    if (definition && definition.config) {
      const config = definition.config;
      const sqlConfig = config.sql;

      if (
        sqlConfig &&
        typeof sqlConfig === "object" &&
        ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(
          sqlConfig.type
        )
      ) {
        console.log(`Skipping relation: ${key}`);
        continue;
      } else {
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

  const toClient = (dbObject: any) => {
    const clientObject: any = { ...dbObject };
    for (const key in fieldTransforms) {
      if (key in clientObject && clientObject[key] !== undefined) {
        clientObject[key] = fieldTransforms[key]!.toClient(clientObject[key]);
      }
    }
    return clientObject;
  };

  const toDb = (clientObject: any) => {
    const dbObject: any = { ...clientObject };
    for (const key in fieldTransforms) {
      if (key in dbObject && dbObject[key] !== undefined) {
        dbObject[key] = fieldTransforms[key]!.toDb(dbObject[key]);
      }
    }
    return dbObject;
  };

  return {
    sqlSchema: z.object(sqlFields) as z.ZodObject<
      Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>
    >,
    clientSchema: z.object(clientFields) as z.ZodObject<
      Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>
    >,
    validationSchema: z.object(validationFields) as z.ZodObject<
      Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
    >,
    defaultValues: defaultValues as Prettify<DeriveDefaults<TActualSchema>>,
    toClient,
    toDb,
  };
}

export type PlaceholderReference = {
  __type: "placeholder-reference";
};

export type PlaceholderRelation<T extends RelationType> = {
  __type: "placeholder-relation";
  relationType: T;
  defaultCount?: number;
  defaultConfig?: HasManyDefault | HasOneDefault;
};

type SchemaWithPlaceholders = {
  _tableName: string;
  [key: string]: any | PlaceholderReference | PlaceholderRelation<any>;
};

type KnownKeys<T> = keyof {
  [K in keyof T as string extends K ? never : K]: T[K];
};

type ResolutionMap<S extends Record<string, SchemaWithPlaceholders>> = {
  // Level 1: Table Names. IntelliSense will suggest `users`, `pets`, etc.
  [TableName in keyof S]?: {
    // Level 2: Field Names. Only suggests fields that are placeholders.
    [FieldName in keyof S[TableName] as S[TableName][FieldName] extends
      | PlaceholderReference
      | PlaceholderRelation<any>
      ? FieldName
      : never]?: S[TableName][FieldName] extends PlaceholderRelation<any>
      ? // If it's a relation (hasMany, etc.)
        {
          /**
           * The key on the current table (`users`) to join from.
           * Autocompletes with: 'id', 'name', etc.
           */
          fromKey: KnownKeys<S[TableName]>;
          /**
           * The target key on the related table.
           * Must be a field reference from the proxy, e.g., `s.pets.userId`
           */
          toKey: { __meta: any; __parentTableType: any }; // Expecting an enriched field from the proxy
          defaultCount?: number;
        }
      : S[TableName][FieldName] extends PlaceholderReference
        ? // If it's a direct reference
          { __meta: any; __parentTableType: any } // Expecting an enriched field from the proxy
        : never;
  };
};

// ============================================
// createSchemaBox function
// ============================================
// Add this to your existing code

// ============================================
// Properly Typed Schema Box Implementation
// ============================================

// Helper type to resolve a placeholder field
type ResolveField<
  Field,
  Resolution,
  AllSchemas extends Record<string, any>,
> = Field extends PlaceholderReference
  ? Resolution // The resolved reference (like s.pets.id)
  : Field extends PlaceholderRelation<infer RelType>
    ? Resolution extends { toKey: infer ToKey }
      ? ToKey extends {
          __parentTableType: infer TargetSchema extends Schema<any>;
        }
        ? Builder<
            "relation",
            RelType extends "hasMany"
              ? BaseRelationConfig<TargetSchema> & { type: "hasMany" }
              : RelType extends "hasOne"
                ? BaseRelationConfig<TargetSchema> & { type: "hasOne" }
                : RelType extends "belongsTo"
                  ? BaseRelationConfig<TargetSchema> & { type: "belongsTo" }
                  : RelType extends "manyToMany"
                    ? BaseRelationConfig<TargetSchema> & { type: "manyToMany" }
                    : never,
            RelType extends "hasMany" | "manyToMany"
              ? z.ZodArray<z.ZodObject<any>>
              : z.ZodObject<any>,
            RelType extends "hasMany" | "manyToMany"
              ? z.ZodArray<z.ZodObject<any>>
              : z.ZodObject<any>,
            RelType extends "hasMany" | "manyToMany" ? any[] : any,
            RelType extends "hasMany" | "manyToMany"
              ? z.ZodArray<z.ZodObject<any>>
              : z.ZodObject<any>,
            RelType extends "hasMany" | "manyToMany"
              ? z.ZodArray<z.ZodObject<any>>
              : z.ZodObject<any>
          >
        : never
      : never
    : Field; // Non-placeholder fields pass through unchanged
// Type to resolve all fields in a schema
type ResolveSchema<
  Schema extends SchemaWithPlaceholders,
  Resolutions extends Record<string, any>,
  AllSchemas extends Record<string, any>,
> = {
  [K in keyof Schema]: K extends keyof Resolutions
    ? ResolveField<Schema[K], Resolutions[K], AllSchemas>
    : Schema[K];
};

// Type for the final resolved registry
type ResolvedRegistryWithSchemas<
  S extends Record<string, SchemaWithPlaceholders>,
  R extends ResolutionMap<S>,
> = {
  [K in keyof S]: {
    rawSchema: ResolveSchema<
      S[K],
      K extends keyof R ? (R[K] extends object ? R[K] : {}) : {},
      S
    >;
    zodSchemas: {
      sqlSchema: z.ZodObject<
        Prettify<
          DeriveSchemaByKey<
            ResolveSchema<
              S[K],
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {},
              S
            >,
            "zodSqlSchema"
          >
        >
      >;
      clientSchema: z.ZodObject<
        Prettify<
          DeriveSchemaByKey<
            ResolveSchema<
              S[K],
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {},
              S
            >,
            "zodClientSchema"
          >
        >
      >;
      validationSchema: z.ZodObject<
        Prettify<
          DeriveSchemaByKey<
            ResolveSchema<
              S[K],
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {},
              S
            >,
            "zodValidationSchema"
          >
        >
      >;
      defaultValues: Prettify<
        DeriveDefaults<
          ResolveSchema<
            S[K],
            K extends keyof R ? (R[K] extends object ? R[K] : {}) : {},
            S
          >
        >
      >;
      toClient: (dbObject: any) => any;
      toDb: (clientObject: any) => any;
    };
  };
};
function createViewObject(
  tableName: string,
  selection: Record<string, any>,
  registry: any
) {
  // A recursive helper that builds ONE schema (client or validation) for a view.
  function buildView(
    currentTable: string,
    schemaType: "client" | "validation",
    subSelection: Record<string, any> | boolean
  ): z.ZodObject<any> {
    const registryEntry = registry[currentTable];
    const rawSchema = registryEntry.rawSchema;
    const baseSchema = registryEntry.zodSchemas[`${schemaType}Schema`];

    // Get all relation keys
    const relationsToOmit: Record<string, true> = {};
    for (const key in rawSchema) {
      if (rawSchema[key]?.config?.sql?.schema) {
        relationsToOmit[key] = true;
      }
    }

    // Start with primitive fields only
    const schemaWithPrimitives = baseSchema.omit(relationsToOmit);

    // If selection is just `true`, return primitives only (no nested relations)
    if (subSelection === true) {
      return schemaWithPrimitives;
    }

    // Otherwise, add selected relations
    const selectedRelationShapes: Record<string, z.ZodTypeAny> = {};
    if (typeof subSelection === "object") {
      for (const key in subSelection) {
        if (subSelection[key] && relationsToOmit[key]) {
          const relationConfig = rawSchema[key].config.sql;
          const targetTable = relationConfig.schema()._tableName;

          // Recursively build the sub-schema
          const subSchema = buildView(
            targetTable,
            schemaType,
            subSelection[key]
          );

          if (
            relationConfig.type === "hasMany" ||
            relationConfig.type === "manyToMany"
          ) {
            selectedRelationShapes[key] = z.array(subSchema);
          } else {
            selectedRelationShapes[key] = subSchema.optional();
          }
        }
      }
    }

    return schemaWithPrimitives.extend(selectedRelationShapes);
  }

  // The main function builds the final object with all three schemas.
  const sourceRegistryEntry = registry[tableName];
  return {
    sql: sourceRegistryEntry.zodSchemas.sqlSchema, // Changed from sqlSchema
    client: buildView(tableName, "client", selection), // Changed from clientSchema
    validation: buildView(tableName, "validation", selection), // Changed from validationSchema
  };
}

// Move all nested types outside the function
type IsRelationField<Field> = Field extends {
  config: {
    sql: {
      type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
      schema: () => any;
    };
  };
}
  ? true
  : false;

type GetRelationTarget<Field> = Field extends {
  config: {
    sql: {
      schema: () => infer TargetSchema;
    };
  };
}
  ? TargetSchema extends { _tableName: infer TableName }
    ? TableName
    : never
  : never;

type NavigationProxy<
  CurrentTable extends string,
  Registry extends RegistryShape,
> = CurrentTable extends keyof Registry
  ? {
      [K in keyof Registry[CurrentTable]["rawSchema"] as IsRelationField<
        Registry[CurrentTable]["rawSchema"][K]
      > extends true
        ? K
        : never]: GetRelationTarget<
        Registry[CurrentTable]["rawSchema"][K]
      > extends infer TargetTable
        ? TargetTable extends keyof Registry
          ? NavigationProxy<TargetTable & string, Registry>
          : never
        : never;
    }
  : {};

type NavigationToSelection<Nav> = Nav extends object
  ? {
      [K in keyof Nav]?: boolean | NavigationToSelection<Nav[K]>;
    }
  : never;

type BuildZodShape<
  TTableName extends keyof TRegistry,
  TSelection,
  TKey extends "clientSchema" | "validationSchema",
  TRegistry extends RegistryShape,
> =
  TRegistry[TTableName]["zodSchemas"][TKey] extends z.ZodObject<infer Base>
    ? TSelection extends Record<string, any>
      ? Omit<Base, keyof TSelection> & {
          [K in keyof TSelection &
            keyof TRegistry[TTableName]["rawSchema"]]: TRegistry[TTableName]["rawSchema"][K] extends {
            config: { sql: { type: infer RelType; schema: () => infer S } };
          }
            ? S extends { _tableName: infer Target }
              ? Target extends keyof TRegistry
                ? RelType extends "hasMany" | "manyToMany"
                  ? TSelection[K] extends true
                    ? TRegistry[Target]["zodSchemas"][TKey] extends z.ZodObject<
                        infer Shape extends Record<string, any>
                      >
                      ? z.ZodArray<
                          z.ZodObject<
                            OmitRelations<Shape, TRegistry[Target]["rawSchema"]>
                          >
                        >
                      : never
                    : z.ZodArray<
                        z.ZodObject<
                          BuildZodShape<Target, TSelection[K], TKey, TRegistry>
                        >
                      >
                  : TSelection[K] extends true
                    ? TRegistry[Target]["zodSchemas"][TKey] extends z.ZodObject<
                        infer Shape extends Record<string, any>
                      >
                      ? z.ZodOptional<
                          z.ZodObject<
                            OmitRelations<Shape, TRegistry[Target]["rawSchema"]>
                          >
                        >
                      : never
                    : z.ZodOptional<
                        z.ZodObject<
                          BuildZodShape<Target, TSelection[K], TKey, TRegistry>
                        >
                      >
                : never
              : never
            : never;
        }
      : Base
    : never;

// Helper type to omit relation fields from a shape
type OmitRelations<Shape, RawSchema> = Omit<
  Shape,
  {
    [K in keyof Shape]: K extends keyof RawSchema
      ? RawSchema[K] extends { config: { sql: { schema: any } } }
        ? K
        : never
      : never;
  }[keyof Shape]
>;

// Helper type to ensure proper shape
type RegistryShape = Record<
  string,
  {
    rawSchema: any;
    zodSchemas: {
      sqlSchema: z.ZodObject<any>;
      clientSchema: z.ZodObject<any>;
      validationSchema: z.ZodObject<any>;
      defaultValues: any;
      toClient: (dbObject: any) => any;
      toDb: (clientObject: any) => any;
    };
  }
>;

// The main return type - moved outside and made generic
type CreateSchemaBoxReturn<
  S extends Record<string, SchemaWithPlaceholders>,
  R extends ResolutionMap<S>,
  Resolved extends RegistryShape = ResolvedRegistryWithSchemas<
    S,
    R
  > extends RegistryShape
    ? ResolvedRegistryWithSchemas<S, R>
    : RegistryShape,
> = {
  [K in keyof Resolved]: {
    definition: Resolved[K]["rawSchema"];

    schemas: {
      sql: Resolved[K]["zodSchemas"]["sqlSchema"];
      client: Resolved[K]["zodSchemas"]["clientSchema"];
      validation: Resolved[K]["zodSchemas"]["validationSchema"];
    };

    transforms: {
      toClient: Resolved[K]["zodSchemas"]["toClient"];
      toDb: Resolved[K]["zodSchemas"]["toDb"];
    };

    defaults: Resolved[K]["zodSchemas"]["defaultValues"];

    nav: NavigationProxy<K & string, Resolved>;
    // ADD THIS BACK
    RelationSelection: NavigationToSelection<
      NavigationProxy<K & string, Resolved>
    >;
    createView: <
      const TSelection extends NavigationToSelection<
        NavigationProxy<K & string, Resolved>
      >,
    >(
      selection: TSelection
    ) => {
      sql: Resolved[K]["zodSchemas"]["sqlSchema"];
      client: z.ZodObject<
        BuildZodShape<K, TSelection, "clientSchema", Resolved>
      >;
      validation: z.ZodObject<
        BuildZodShape<K, TSelection, "validationSchema", Resolved>
      >;
      defaults: any; // Add this for view defaults
    };
  };
};

export function createSchemaBox<
  S extends Record<string, SchemaWithPlaceholders>,
  R extends ResolutionMap<S>,
>(
  schemas: S,
  resolver: (proxy: SchemaProxy<S>) => R
): CreateSchemaBoxReturn<S, R> {
  // Your existing implementation stays exactly the same
  const schemaProxy = new Proxy({} as SchemaProxy<S>, {
    get(target, tableName: string) {
      const schema = schemas[tableName as keyof S];
      if (!schema) return undefined;

      return new Proxy(
        {},
        {
          get(target, fieldName: string) {
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
        }
      );
    },
  }) as any;

  const resolutionConfig = resolver(schemaProxy);
  const resolvedSchemas = { ...schemas };

  // STAGE 1: Resolve references
  for (const tableName in schemas) {
    for (const fieldName in schemas[tableName]) {
      const field = schemas[tableName][fieldName];
      if (isReference(field)) {
        const targetField = field.getter();
        if (targetField && targetField.config) {
          resolvedSchemas[tableName]![fieldName] = targetField;
        } else {
          throw new Error(
            `Could not resolve reference for ${tableName}.${fieldName}`
          );
        }
      }
    }
  }

  // STAGE 2: Resolve relations
  for (const tableName in schemas) {
    const tableConfig = resolutionConfig[tableName];
    if (!tableConfig) continue;

    for (const fieldName in tableConfig) {
      const field = schemas[tableName]![fieldName];
      const resolution = (tableConfig as any)[fieldName];

      if (field && field.__type === "placeholder-relation") {
        const targetKey = resolution.toKey;

        if (!targetKey || !targetKey.__parentTableType) {
          throw new Error(
            `Could not resolve relation for ${tableName}.${fieldName}`
          );
        }

        const targetSchema = targetKey.__parentTableType;
        const relationType = field.relationType;
        const defaultCount = field.defaultCount || resolution.defaultCount;

        const zodSchema =
          relationType === "hasMany" || relationType === "manyToMany"
            ? z.array(z.any())
            : z.any();

        const initialValue =
          relationType === "hasMany" || relationType === "manyToMany"
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
          } as any,
          sqlZod: zodSchema,
          newZod: zodSchema,
          initialValue,
          clientZod: zodSchema,
          validationZod: zodSchema,
        });

        resolvedSchemas[tableName]![fieldName] = resolvedBuilder as any;
      }
    }
  }

  const finalRegistry: any = {};
  for (const tableName in resolvedSchemas) {
    const zodSchemas = createSchema(resolvedSchemas[tableName]!);
    finalRegistry[tableName] = {
      rawSchema: resolvedSchemas[tableName],
      zodSchemas: zodSchemas,
    };
  }

  const createNavProxy = (currentTable: string, registry: any): any => {
    return new Proxy(
      {},
      {
        get(target, relationName: string) {
          const schema = registry[currentTable]?.rawSchema;
          if (!schema) return undefined;

          const field = schema[relationName];
          if (!field?.config?.sql?.schema) return undefined;

          const targetSchema = field.config.sql.schema();
          const targetTable = targetSchema?._tableName;

          if (targetTable && registry[targetTable]) {
            return createNavProxy(targetTable, registry);
          }

          return undefined;
        },
      }
    );
  };

  const cleanerRegistry: any = {};

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
      RelationSelection: {} as NavigationToSelection<any>,

      createView: function (selection: any) {
        const view = createViewObject(tableName, selection, finalRegistry);
        const defaults = computeViewDefaults(
          tableName,
          selection,
          finalRegistry
        );
        console.log("View defaults:", defaults); // ADD THIS
        return {
          ...view,
          defaults: defaults,
        };
      },
    };
  }

  return cleanerRegistry as CreateSchemaBoxReturn<S, R>;
}

function computeViewDefaults(
  tableName: string,
  selection: Record<string, any> | boolean,
  registry: any,
  visited = new Set<string>()
): any {
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
    if (!selection[key]) continue;

    const field = rawSchema[key];
    if (!field?.config?.sql?.schema) continue;

    const relationConfig = field.config.sql;
    const targetTable = relationConfig.schema()._tableName;

    // ----- FIX IS HERE -----
    // Look for the defaultConfig on the nested relationConfig object.
    const defaultConfig = relationConfig.defaultConfig;

    // Handle different default configurations
    if (defaultConfig === undefined) {
      // Don't include in defaults
      delete baseDefaults[key];
    } else if (defaultConfig === null) {
      baseDefaults[key] = null;
    } else if (Array.isArray(defaultConfig)) {
      baseDefaults[key] = [];
    } else if (defaultConfig === true) {
      // Generate based on nested selection
      if (
        relationConfig.type === "hasMany" ||
        relationConfig.type === "manyToMany"
      ) {
        const count = relationConfig.defaultCount || 1;
        baseDefaults[key] = Array.from({ length: count }, () =>
          computeViewDefaults(
            targetTable,
            selection[key],
            registry,
            new Set(visited)
          )
        );
      } else {
        baseDefaults[key] = computeViewDefaults(
          targetTable,
          selection[key],
          registry,
          new Set(visited)
        );
      }
    } else if (typeof defaultConfig === "object" && "count" in defaultConfig) {
      baseDefaults[key] = Array.from({ length: defaultConfig.count }, () =>
        computeViewDefaults(
          targetTable,
          selection[key],
          registry,
          new Set(visited)
        )
      );
    }
  }

  // NOTE: This was in the original code but is not needed for the recursive logic.
  // It's safe to remove, but also safe to keep.
  // visited.delete(tableName);
  return baseDefaults;
}
// Type for the schema proxy used in resolver
type SchemaProxy<S extends Record<string, SchemaWithPlaceholders>> = {
  [K in keyof S]: {
    [F in keyof S[K] as F extends "_tableName" ? never : F]: S[K][F] extends {
      config: infer Config;
    }
      ? S[K][F] & {
          __meta: {
            _key: F;
            _fieldType: S[K][F];
          };
          __parentTableType: S[K];
        }
      : S[K][F];
  };
};

type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Type derivation now uses the existing patterns from your code
// Type derivation that excludes relations from base schema
type DeriveSchemaByKey<
  T,
  Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10 // Recursion guard
  ? any
  : {
      [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand
        ? never
        : K extends keyof T
          ? T[K] extends Reference<any>
            ? K // Keep reference keys
            : T[K] extends {
                  config: {
                    sql: {
                      type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                    };
                  };
                }
              ? never // EXCLUDE relation keys from base schema
              : K // Keep non-relation keys
          : never]: T[K] extends Reference<infer TGetter>
        ? ReturnType<TGetter> extends {
            config: { [P in Key]: infer ZodSchema extends z.ZodTypeAny };
          }
          ? ZodSchema
          : never
        : T[K] extends {
              config: {
                [P in Key]: infer ZodSchema extends z.ZodTypeAny;
              };
            }
          ? ZodSchema
          : never;
    };

// Update DeriveDefaults to handle references
type DeriveDefaults<T, Depth extends any[] = []> = Prettify<
  Depth["length"] extends 10
    ? any
    : {
        [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand
          ? never
          : K extends keyof T
            ? T[K] extends Reference<any>
              ? K // Keep reference keys
              : T[K] extends {
                    config: {
                      sql: {
                        type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                      };
                    };
                  }
                ? never // EXCLUDE relation keys from defaults
                : K // Keep non-relation keys
            : never]: T[K] extends Reference<infer TGetter>
          ? ReturnType<TGetter> extends { config: { initialValue: infer D } }
            ? D extends () => infer R
              ? R
              : D
            : never
          : T[K] extends {
                config: { initialValue: infer D };
              }
            ? D extends () => infer R
              ? R
              : D
            : never;
      }
>;
// Main exportable type. This remains the same but will now work.
export type InferFromSchema<T extends { _tableName: string }> = Prettify<{
  SqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodSqlSchema">>>;
  ClientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientSchema">>>;
  ValidationSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<T, "zodValidationSchema">>
  >;
  Sql: z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodSqlSchema">>>>;
  Client: z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientSchema">>>
  >;
  Validation: z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodValidationSchema">>>
  >;
  Defaults: DeriveDefaults<T>;
}>;

type ExtractRelations<T> = {
  [K in keyof T as T[K] extends {
    config: {
      sql: {
        type: "hasMany" | "hasOne" | "manyToMany";
        schema: () => any;
      };
    };
  }
    ? K
    : never]: T[K] extends {
    config: {
      sql: {
        schema: () => infer S;
      };
    };
  }
    ? SchemaProxyBasic<S>
    : never;
};

type SchemaProxyBasic<T> = T extends { _tableName: string }
  ? ExtractRelations<T>
  : {};
