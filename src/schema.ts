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
    // ONE-ARGUMENT OVERLOAD (Correct as-is)
    <const TResult>(
      defaultValue: TResult
    ): TResult extends () => infer R
      ? R extends z.ZodTypeAny
        ? Prettify<
            Builder<
              "new",
              T,
              TSql,
              R,
              z.infer<R>,
              InferSmartClientType<TSql, R>,
              InferSmartClientType<TSql, R>
            >
          >
        : Prettify<
            Builder<
              "new",
              T,
              TSql,
              z.ZodLiteral<R>,
              R,
              z.ZodUnion<[TSql, z.ZodLiteral<R>]>,
              z.ZodUnion<[TSql, z.ZodLiteral<R>]>
            >
          >
      : TResult extends z.ZodTypeAny
        ? Prettify<
            Builder<
              "new",
              T,
              TSql,
              TResult,
              z.infer<TResult>,
              InferSmartClientType<TSql, TResult>,
              InferSmartClientType<TSql, TResult>
            >
          >
        : TResult extends string | number | boolean
          ? Prettify<
              Builder<
                "new",
                T,
                TSql,
                z.ZodLiteral<TResult>,
                TResult,
                z.ZodUnion<[TSql, z.ZodLiteral<TResult>]>,
                z.ZodUnion<[TSql, z.ZodLiteral<TResult>]>
              >
            >
          : Prettify<
              Builder<
                "new",
                T,
                TSql,
                ZodTypeFromPrimitive<TResult>,
                TResult,
                InferSmartClientType<TSql, ZodTypeFromPrimitive<TResult>>,
                InferSmartClientType<TSql, ZodTypeFromPrimitive<TResult>>
              >
            >;

    <TNewNext extends z.ZodTypeAny, const TDefaultNext>(
      schema: ((tools: { sql: TSql }) => TNewNext) | TNewNext,
      defaultValue: TDefaultNext
    ): Prettify<
      Builder<
        "new",
        T,
        TSql,
        // TNew: The schema for the "new" state is a union of the provided
        // schema and the literal default, ensuring both are allowed.
        z.ZodUnion<
          [
            TNewNext,
            z.ZodLiteral<TDefaultNext extends () => infer R ? R : TDefaultNext>,
          ]
        >,
        // TInitialValue: The logic for the default value itself.
        IsLiteralType<z.infer<TNewNext>> extends true
          ? TDefaultNext extends () => infer R
            ? R
            : TDefaultNext
          : z.infer<TNewNext>,
        // TClient / TValidation: *** THIS IS THE SMART LOGIC ***
        // It checks if the default value's type is already covered by TNewNext.
        (
          TDefaultNext extends () => infer R ? R : TDefaultNext
        ) extends z.infer<TNewNext>
          ? // If YES, the client schema is a clean union of just the SQL and new types.
            z.ZodUnion<[TSql, TNewNext]>
          : // If NO, we create the three-part union because the default is a distinct type.
            z.ZodUnion<
              [
                TSql,
                TNewNext,
                z.ZodLiteral<
                  TDefaultNext extends () => infer R ? R : TDefaultNext
                >,
              ]
            >,
        // Repeat the same logic for the validation schema.
        (
          TDefaultNext extends () => infer R ? R : TDefaultNext
        ) extends z.infer<TNewNext>
          ? z.ZodUnion<[TSql, TNewNext]>
          : z.ZodUnion<
              [
                TSql,
                TNewNext,
                z.ZodLiteral<
                  TDefaultNext extends () => infer R ? R : TDefaultNext
                >,
              ]
            >
      >
    >;
  };
  reference: <TRefSchema extends { _tableName: string }>(
    fieldGetter: () => any
  ) => Builder<
    "sql",
    T & { reference: typeof fieldGetter },
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
  hasMany: <
    T extends Schema<any>,
    CreateSchema extends ReturnType<typeof createSchema<T>>,
  >(config: {
    fromKey: string;
    toKey: () => T[keyof T];
    schema: () => T;
    defaultCount?: number;
  }) => Builder<
    "relation",
    RelationConfig<T>,
    z.ZodArray<CreateSchema["sqlSchema"]>,
    z.ZodArray<CreateSchema["clientSchema"]>,
    any[],
    z.ZodArray<CreateSchema["clientSchema"]>,
    z.ZodArray<CreateSchema["validationSchema"]>
  >;

  hasOne: <
    T extends Schema<any>,
    CreateSchema extends ReturnType<typeof createSchema<T>>,
  >(config: {
    fromKey: string;
    toKey: () => T[keyof T];
    schema: () => T;
  }) => Builder<
    "relation",
    RelationConfig<T>,
    z.ZodArray<CreateSchema["sqlSchema"]>,
    z.ZodArray<CreateSchema["clientSchema"]>,
    any[],
    z.ZodArray<CreateSchema["clientSchema"]>,
    z.ZodArray<CreateSchema["validationSchema"]>
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

    const placeholderSchema = z.array(z.any());
    return createBuilder({
      stage: "relation",
      sqlConfig: relationConfig,
      sqlZod: placeholderSchema,
      newZod: placeholderSchema,
      initialValue: Array.from(
        { length: config.defaultCount || 0 },
        () => ({})
      ),
      clientZod: placeholderSchema,
      validationZod: placeholderSchema,
    }) as any; // Just cast to any here to satisfy the interface
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
    }) as any;
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
      // ... other error checks ...

      const hasSchemaArg = defaultValue !== undefined;

      // This logic is mostly from your original code.
      const newSchema = hasSchemaArg
        ? isFunction(schemaOrDefault)
          ? (schemaOrDefault as any)({ sql: config.sqlZod })
          : schemaOrDefault
        : config.sqlZod; // If only a primitive is passed, the "new" schema is still the SQL one.
      let finalDefaultValue: any;

      if (hasSchemaArg) {
        // Handles two arguments: .initialState(schema, defaultValue)
        finalDefaultValue = isFunction(defaultValue)
          ? defaultValue()
          : defaultValue;
      } else {
        // Handles one argument: .initialState(z.email()) OR .initialState(() => uuid())
        const singleArg = schemaOrDefault;
        if (
          singleArg &&
          typeof singleArg === "object" &&
          (singleArg as any)._def
        ) {
          // THIS IS THE FIX: If it's a Zod schema, INFER the value.
          finalDefaultValue = inferDefaultFromZod(
            singleArg as z.ZodTypeAny,
            config.sqlConfig
          );
        } else {
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
  [K in keyof T]: K extends string ? EnrichedField<K, T[K], T> : T[K];
};

// The table function that enriches fields with their key information
export const SchemaWrapperBrand = Symbol("SchemaWrapper");

export function schema<T extends ShapeSchema>(
  schema: T
): Prettify<EnrichFields<T> & { _tableName: T["_tableName"] }> {
  const enrichedSchema: any = {
    _tableName: schema._tableName,
  };

  for (const key in schema) {
    if (
      key !== "_tableName" &&
      Object.prototype.hasOwnProperty.call(schema, key)
    ) {
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

// Define the strict shape schema with existing types
export type ShapeSchema = {
  _tableName: string;
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
  fromKey: string;
  toKey: () => SchemaField;
  schema: U;
  defaultCount?: number;
};
function inferDefaultFromZod(
  zodType: z.ZodType<any>,
  sqlConfig?: SQLType | RelationConfig<any>
): any {
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
                  config: {
                    [P in Key]: infer ZodSchema extends z.ZodTypeAny;
                  };
                }
              ? ZodSchema
              : never;
    };

type InferSqlSchema<T> = InferSchemaByKey<T, "zodSqlSchema">;
type InferClientSchema<T> = InferSchemaByKey<T, "zodClientSchema">;
type InferValidationSchema<T> = InferSchemaByKey<T, "zodValidationSchema">;

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

    // --- THIS IS THE FIX ---
    // The condition now correctly checks for EITHER a `reference` type OR a builder with a `.config`.
    if (
      !definition ||
      (definition.type !== "reference" && !definition.config)
    ) {
      continue;
    }

    if (definition.type === "reference") {
      // This block now correctly processes `testId`.
      const referencedFieldBuilder = definition.to();
      const referencedConfig = referencedFieldBuilder.config;

      sqlFields[key] = referencedConfig.zodSqlSchema;
      clientFields[key] = referencedConfig.zodClientSchema;
      validationFields[key] = referencedConfig.zodValidationSchema;
      defaultValues[key] = inferDefaultFromZod(
        referencedConfig.zodClientSchema,
        { ...referencedConfig.sql, default: undefined }
      );
    } else {
      // This block handles fields with a `.config` property, like `pets`.
      const config = definition.config;
      const sqlConfig = config.sql;

      if (
        sqlConfig &&
        typeof sqlConfig === "object" &&
        ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(
          sqlConfig.type
        )
      ) {
        const relatedSchemaFactory = sqlConfig.schema as () => T;
        const childSchemaResult = createSchema(relatedSchemaFactory());

        let baseClientSchema: z.ZodTypeAny;

        if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
          baseClientSchema = z.array(childSchemaResult.clientSchema);
          defaultValues[key] = Array.from(
            { length: (sqlConfig as any).defaultCount || 0 },
            () => childSchemaResult.defaultValues
          );
        } else {
          baseClientSchema = childSchemaResult.clientSchema;
          defaultValues[key] = childSchemaResult.defaultValues;
        }

        clientFields[key] = config.clientTransform
          ? config.clientTransform(baseClientSchema)
          : baseClientSchema;
        validationFields[key] = clientFields[key];
      } else {
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

// export type InferSchemaTypes<T extends Schema<any>> = Prettify<{
//   /** The TypeScript type for data as it exists in the database. */
//   sql: z.infer<ReturnType<typeof createSchema<T>>["sqlSchema"]>;

//   /** The TypeScript type for data as it is represented on the client. */
//   client: z.infer<ReturnType<typeof createSchema<T>>["clientSchema"]>;

//   /** The TypeScript type for data during validation, often the most flexible shape. */
//   validation: z.infer<ReturnType<typeof createSchema<T>>["validationSchema"]>;

//   /** The TypeScript type for the default values object. */
//   defaults: ReturnType<typeof createSchema<T>>["defaultValues"];
// }>;

type RelationBuilders<TSchema> = {
  reference: <TField extends object>(
    fieldGetter: () => TField
  ) => {
    type: "reference";
    to: () => TField;
  };

  hasMany: <
    T extends Schema<any>,
    K extends keyof T & string,
    TField extends EnrichedField<K, T[K], T>,
  >(config: {
    fromKey: keyof TSchema & string;
    toKey: () => TField;
    defaultCount?: number;
  }) => Builder<
    "relation",
    // This is now specific: a BaseRelationConfig intersected with the literal type.
    BaseRelationConfig<TField["__parentTableType"]> & { type: "hasMany" },
    z.ZodArray<z.ZodObject<InferSqlSchema<TField["__parentTableType"]>>>,
    z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>,
    any[],
    z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>,
    z.ZodArray<z.ZodObject<InferValidationSchema<TField["__parentTableType"]>>>
  >;

  hasOne: <
    T extends Schema<any>,
    K extends keyof T & string,
    TField extends EnrichedField<K, T[K], T>,
  >(config: {
    fromKey: keyof TSchema & string;
    toKey: () => TField;
  }) => Builder<
    "relation",
    // Apply the same specific intersection here.
    BaseRelationConfig<TField["__parentTableType"]> & { type: "hasOne" },
    z.ZodArray<z.ZodObject<InferSqlSchema<TField["__parentTableType"]>>>,
    z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>,
    any,
    z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>,
    z.ZodArray<z.ZodObject<InferValidationSchema<TField["__parentTableType"]>>>
  >;

  manyToMany: <T extends Schema<any>>(config: {
    fromKey: keyof TSchema & string;
    toKey: () => T[keyof T];
    schema: () => T;
    defaultCount?: number;
  }) => Builder<
    "relation",
    // And here.
    BaseRelationConfig<T> & { type: "manyToMany" },
    z.ZodOptional<z.ZodArray<z.ZodAny>>,
    z.ZodOptional<z.ZodArray<z.ZodAny>>,
    any[],
    z.ZodOptional<z.ZodArray<z.ZodAny>>,
    z.ZodOptional<z.ZodArray<z.ZodAny>>
  >;
};

export function schemaRelations<
  TSchema extends Schema<any>,
  RefObject extends Record<string, any>,
>(
  baseSchema: TSchema,
  referencesBuilder: (rel: RelationBuilders<TSchema>) => RefObject
): {
  [K in keyof RefObject]: RefObject[K] & {
    __meta: {
      _key: K;
      _fieldType: RefObject[K];
    };
    __parentTableType: TSchema & RefObject;
  };
} {
  const rel = {
    reference: <TField extends object>(fieldGetter: () => TField) => ({
      type: "reference" as const,
      to: fieldGetter,
    }),
    hasMany: <T extends Schema<any>>(config: {
      fromKey: keyof TSchema & string;
      toKey: any;
      defaultCount?: number;
    }) => {
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
        sqlConfig: relationConfig as any,
        sqlZod: placeholderSchema,
        newZod: placeholderSchema,
        initialValue: Array.from(
          { length: config.defaultCount || 0 },
          () => ({})
        ),
        clientZod: placeholderSchema,
        validationZod: placeholderSchema,
      }) as any; // FIX: This is a hack to get around the circular reference
    },

    hasOne: <T extends Schema<any>>(config: {
      fromKey: keyof TSchema & string;
      toKey: any;
    }) => {
      const relationConfig: RelationConfig<T> = {
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
      }) as any;
    },

    manyToMany: <T extends Schema<any>>(config: {
      fromKey: keyof TSchema & string;
      toKey: () => any;
      schema: () => T;
      defaultCount?: number;
    }) => {
      const relationConfig: RelationConfig<T> = {
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
        initialValue: Array.from(
          { length: config.defaultCount || 0 },
          () => ({})
        ),
        clientZod: relationZodType,
        validationZod: relationZodType,
      });
    },
  };
  const refs = referencesBuilder(rel);
  const enrichedRefs: any = {};

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

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type DeriveSchemaByKey<
  T,
  Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10 // Recursion guard
  ? any
  : {
      [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand
        ? never
        : K]: T[K] extends {
        // Case 1: A 'hasMany' or 'manyToMany' relation
        config: {
          sql: { type: "hasMany" | "manyToMany"; schema: () => infer S };
        };
      }
        ? S extends { _tableName: string } // Infer the schema `S` from the config
          ? z.ZodArray<
              z.ZodObject<Prettify<DeriveSchemaByKey<S, Key, [...Depth, 1]>>>
            >
          : never
        : // Case 2: A 'hasOne' or 'belongsTo' relation
          T[K] extends {
              config: { sql: { schema: () => infer S } };
            }
          ? S extends { _tableName: string } // Same logic, infer `S`
            ? z.ZodObject<Prettify<DeriveSchemaByKey<S, Key, [...Depth, 1]>>>
            : z.ZodObject<any> // Fallback
          : // Case 3: A direct reference field
            T[K] extends { type: "reference"; to: () => infer RefField }
            ? RefField extends { config: { [P in Key]: infer ZodSchema } }
              ? ZodSchema
              : never
            : // Case 4: A standard column field
              T[K] extends {
                  config: { [P in Key]: infer ZodSchema extends z.ZodTypeAny };
                }
              ? ZodSchema
              : never;
    };

type DeriveDefaults<T, Depth extends any[] = []> = Prettify<
  Depth["length"] extends 10 // Recursion guard
    ? any
    : {
        [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand
          ? never
          : K]: T[K] extends {
          // --- Branch 1: Handle fields created with a builder ---
          config: { sql: infer SqlConfig; initialValue: infer D };
        }
          ? // It's a builder. Now, check if its SQL config is for a relation.
            SqlConfig extends {
              type: "hasMany" | "manyToMany";
              schema: () => infer S;
            }
            ? // YES, it's a to-many relation. The default is an array of the child's defaults.
              Array<DeriveDefaults<S, [...Depth, 1]>>
            : SqlConfig extends {
                  type: "hasOne" | "belongsTo";
                  schema: () => infer S;
                }
              ? // YES, it's a to-one relation. The default is the child's default object.
                DeriveDefaults<S, [...Depth, 1]>
              : // NO, it's a standard SQL field. Use its own `initialValue`.
                D extends () => infer R
                ? R
                : D
          : // --- Branch 2: Handle `reference` fields separately ---
            T[K] extends { type: "reference"; to: () => infer RefField }
            ? RefField extends { config: { initialValue: infer D } }
              ? D extends () => infer R
                ? R
                : D
              : never
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
