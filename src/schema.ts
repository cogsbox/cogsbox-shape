import { z } from "zod";
import { v4 as uuid } from "uuid";

type CurrentTimestampConfig = {
  default: "CURRENT_TIMESTAMP";
  defaultValue: Date;
};

export const isFunction = (fn: unknown): fn is Function =>
  typeof fn === "function";

export function currentTimeStamp(): CurrentTimestampConfig {
  return {
    default: "CURRENT_TIMESTAMP",
    defaultValue: new Date(),
  };
}

type DbConfig = SQLType | RelationConfig<any> | null;

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
) &
  BaseConfig;

type BaseConfig = {
  nullable?: boolean;
  pk?: true;
  field?: string;
};

type SQLToZodType<
  T extends SQLType,
  TDefault extends boolean,
> = T["pk"] extends true
  ? TDefault extends true
    ? z.ZodString
    : z.ZodNumber
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

type CollapsedUnion<
  A extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
> = A extends B ? (B extends A ? A : z.ZodUnion<[A, B]>) : z.ZodUnion<[A, B]>;

export interface IBuilderMethods<
  T extends DbConfig,
  TSql extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> {
  client<const TValue>(options: {
    value: TValue | ((tools: { uuid: () => string }) => TValue);
    schema?: never;
    clientPk?: boolean | ((val: any) => boolean);
  }): Prettify<
    Builder<
      "client",
      T,
      TSql,
      TValue extends () => infer R ? R : TValue,
      CollapsedUnion<
        TSql,
        ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
      >,
      CollapsedUnion<
        TSql,
        ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
      >
    >
  >;

  client<const TSchema extends z.ZodTypeAny>(options: {
    value?: never;
    schema: TSchema;
    clientPk?: boolean | ((val: any) => boolean);
  }): Prettify<
    Builder<
      "client",
      T,
      TSql,
      z.infer<TSchema>,
      CollapsedUnion<TSql, TSchema>,
      CollapsedUnion<TSql, TSchema>
    >
  >;

  client<const TSchema extends z.ZodTypeAny>(options: {
    value?: never;
    schema: TSchema | ((tools: any) => TSchema);
    clientPk?: boolean | ((val: any) => boolean);
  }): Prettify<
    Builder<
      "client",
      T,
      TSql,
      z.infer<TSchema>,
      CollapsedUnion<TSql, TSchema>,
      CollapsedUnion<TSql, TSchema>
    >
  >;

  client<const TValue>(options: {
    value: TValue | ((tools: { uuid: () => string }) => TValue);
    schema?: never;
    clientPk?: boolean | ((val: any) => boolean);
  }): Prettify<
    Builder<
      "client",
      T,
      TSql,
      TValue extends () => infer R ? R : TValue,
      CollapsedUnion<
        TSql,
        ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
      >,
      CollapsedUnion<
        TSql,
        ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
      >
    >
  >;

  client(options: {
    value?: never;
    schema: (tools: any) => z.ZodTypeAny;
  }): Prettify<Builder<"client", T, TSql, unknown, z.ZodTypeAny, z.ZodTypeAny>>;

  client<const TValue, const TSchema extends z.ZodTypeAny>(options: {
    value: TValue | ((tools: { uuid: () => string }) => TValue);
    schema:
      | TSchema
      | ((
          base: ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
        ) => TSchema);
    clientPk?: boolean | ((val: any) => boolean);
  }): Prettify<
    Builder<
      "client",
      T,
      TSql,
      TValue extends () => infer R ? R : TValue,
      CollapsedUnion<TSql, TSchema>,
      CollapsedUnion<TSql, TSchema>
    >
  >;

  client<TClientNext extends z.ZodTypeAny>(
    schema: ((tools: { sql: TSql }) => TClientNext) | TClientNext,
  ): Prettify<
    Builder<"client", T, TSql, TInitialValue, TClientNext, TClientNext>
  >;

  reference: <TRefSchema extends { _tableName: string }>(
    fieldGetter: () => any,
  ) => Builder<
    "sql",
    T & { references: typeof fieldGetter },
    TSql,
    TInitialValue,
    TClient,
    TValidation
  >;

  server: <TValidationNext extends z.ZodTypeAny>(
    schema:
      | ((tools: { sql: TSql; client: TClient }) => TValidationNext)
      | TValidationNext,
  ) => Prettify<
    Builder<"server", T, TSql, TInitialValue, TClient, TValidationNext>
  >;

  transform: (transforms: {
    toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
    toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
  }) => {
    config: Prettify<
      BuilderConfig<T, TSql, TInitialValue, TClient, TValidation>
    > & {
      transforms: typeof transforms;
    };
  };
}

type BaseRelationConfig<T extends Schema<any>> = {
  fromKey: string;
  toKey: () => any;
  schema: () => T;
  defaultCount?: number;
};

export type RelationConfig<T extends Schema<any>> =
  | (BaseRelationConfig<T> & { type: "hasMany" })
  | (BaseRelationConfig<T> & { type: "hasOne" })
  | (BaseRelationConfig<T> & { type: "belongsTo" })
  | (BaseRelationConfig<T> & { type: "manyToMany" });

type Stage = "sql" | "relation" | "client" | "server" | "done";

type StageMethods = {
  sql: "client" | "server" | "transform" | "reference";
  relation: "client" | "server" | "transform";
  client: "server" | "transform";
  server: "transform";
  done: never;
};

type BuilderConfig<
  T extends DbConfig,
  TSql extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> = {
  sql: T;
  zodSqlSchema: TSql;
  initialValue: TInitialValue;
  zodClientSchema: TClient;
  zodValidationSchema: TValidation;
  clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
  validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
};

export type Builder<
  TStage extends Stage,
  T extends DbConfig,
  TSql extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> = {
  config: {
    sql: T;
    zodSqlSchema: TSql;
    initialValue: TInitialValue;
    zodClientSchema: TClient;
    zodValidationSchema: TValidation;
  };
} & Pick<
  IBuilderMethods<T, TSql, TInitialValue, TClient, TValidation>,
  StageMethods[TStage]
>;

type HasManyDefault = true | undefined | [] | { count: number };

type HasOneDefault = true | undefined | null;

export type Reference<TGetter extends () => any> = {
  __type: "reference";
  getter: TGetter;
};

interface ShapeAPI {
  client: <const TValue>(
    value: TValue | ((tools: { uuid: () => string }) => TValue),
  ) => Builder<
    "client",
    null,
    z.ZodUndefined, // No SQL schema
    TValue extends () => infer R ? R : TValue,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
  >;
  sql: <const T extends SQLType>(
    sqlConfig: T,
  ) => Builder<
    "sql",
    T,
    SQLToZodType<T, false>,
    z.infer<SQLToZodType<T, false>>,
    SQLToZodType<T, false>,
    SQLToZodType<T, false>
  >;
  reference: <TGetter extends () => any>(getter: TGetter) => Reference<TGetter>;

  hasMany: <T extends HasManyDefault>(
    config?: T,
  ) => PlaceholderRelation<"hasMany">;
  hasOne: (config?: HasOneDefault) => PlaceholderRelation<"hasOne">;

  manyToMany: (config?: {
    defaultCount?: number;
    defaultConfig?: HasManyDefault;
  }) => PlaceholderRelation<"manyToMany">;
}

export const s: ShapeAPI = {
  client: <const TValue>(
    value: TValue | ((tools: { uuid: () => string }) => TValue),
  ) => {
    const actualValue = isFunction(value) ? value({ uuid }) : value;

    let inferredZodType: z.ZodTypeAny;
    if (typeof actualValue === "string") {
      inferredZodType = z.string();
    } else if (typeof actualValue === "number") {
      inferredZodType = z.number();
    } else if (typeof actualValue === "boolean") {
      inferredZodType = z.boolean();
    } else if (actualValue instanceof Date) {
      inferredZodType = z.date();
    } else if (actualValue === null) {
      inferredZodType = z.null();
    } else {
      inferredZodType = z.any();
    }

    return createBuilder({
      stage: "client",
      sqlConfig: null,
      sqlZod: z.undefined(),
      initialValue: actualValue,
      clientZod: inferredZodType,
      validationZod: inferredZodType,
    }) as any;
  },
  reference: <TGetter extends () => any>(
    getter: TGetter,
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
    defaultConfig: config,
  }),

  manyToMany: (config?: { defaultCount?: number }) => ({
    __type: "placeholder-relation" as const,
    relationType: "manyToMany" as const,
    defaultCount: config?.defaultCount ?? 0,
  }),
  sql: <const T extends SQLType>(sqlConfig: T) => {
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
      initialValue: inferDefaultFromZod(sqlZodType, sqlConfig),
      clientZod: sqlZodType as SQLToZodType<T, false>,
      validationZod: sqlZodType as SQLToZodType<T, false>,
    }) as Prettify<
      Builder<
        "sql",
        T,
        SQLToZodType<T, false>,
        z.infer<SQLToZodType<T, false>>,
        SQLToZodType<T, false>,
        SQLToZodType<T, false>
      >
    >;
  },
};

function createBuilder<
  TStage extends "sql" | "relation" | "client" | "server",
  T extends DbConfig,
  TSql extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
>(config: {
  stage: TStage;
  sqlConfig: T;
  sqlZod: TSql;
  initialValue: TInitialValue;
  clientZod: TClient;
  validationZod: TValidation;
  completedStages?: Set<string>;
  clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
  validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
}): Builder<TStage, T, TSql, TInitialValue, TClient, TValidation> {
  const completedStages =
    config.completedStages || new Set<string>([config.stage]);

  const builderObject = {
    config: {
      sql: config.sqlConfig,
      zodSqlSchema: config.sqlZod,
      initialValue:
        config.initialValue ||
        inferDefaultFromZod(
          config.clientZod as z.ZodTypeAny,
          config.sqlConfig!,
        ),
      zodClientSchema: config.clientZod,
      zodValidationSchema: config.validationZod,
      clientTransform: config.clientTransform,
      validationTransform: config.validationTransform,
    },

    reference: <TRefSchema extends { _tableName: string }>(
      fieldGetter: () => any,
    ) => {
      return createBuilder({
        ...config,
        sqlConfig: {
          ...config.sqlConfig,
          reference: fieldGetter,
        } as T & { reference: typeof fieldGetter },
      });
    },

    client: (...args: any[]) => {
      if (completedStages.has("client")) {
        throw new Error("client() can only be called once in the chain");
      }
      if (completedStages.has("server")) {
        throw new Error("client() must be called before server()");
      }

      const newCompletedStages = new Set(completedStages);
      newCompletedStages.add("client");

      let optionsOrSchema = args[0];

      if (config.stage === "relation") {
        const assert =
          typeof optionsOrSchema === "function" ||
          optionsOrSchema instanceof z.ZodType
            ? optionsOrSchema
            : optionsOrSchema?.schema;
        return createBuilder({
          ...config,
          stage: "client",
          completedStages: newCompletedStages,
          clientTransform: (baseSchema: z.ZodTypeAny) => {
            if (isFunction(assert)) {
              return assert({ sql: baseSchema as any });
            }
            return assert;
          },
        });
      }

      let isDirectShortcut = false;
      let isValueAndSchemaShortcut = false;
      let options: any = {};

      if (
        optionsOrSchema !== undefined &&
        typeof optionsOrSchema === "function"
      ) {
        if (args.length === 2 && isFunction(args[1])) {
          isValueAndSchemaShortcut = true;
          options = {
            schema: optionsOrSchema,
            value: args[1],
          };
        } else {
          options = { schema: optionsOrSchema };
          isDirectShortcut = true;
        }
      } else if (
        optionsOrSchema !== undefined &&
        typeof optionsOrSchema === "object" &&
        !("_def" in optionsOrSchema) &&
        !("parse" in optionsOrSchema) &&
        (optionsOrSchema.value !== undefined ||
          optionsOrSchema.schema !== undefined ||
          optionsOrSchema.clientPk !== undefined)
      ) {
        options = optionsOrSchema;
      } else if (optionsOrSchema !== undefined) {
        options = { schema: optionsOrSchema };
        isDirectShortcut = true;
      }

      const { value, schema: schemaOrModifier, clientPk } = options;

      let actualValue = config.initialValue;
      let finalSchema: z.ZodTypeAny;

      // 1. Determine actual value
      if (value !== undefined) {
        actualValue = isFunction(value) ? value({ uuid }) : value;
      } else if (
        schemaOrModifier &&
        typeof schemaOrModifier === "object" &&
        "_def" in schemaOrModifier
      ) {
        if (
          config.sqlZod instanceof z.ZodUndefined ||
          actualValue === undefined
        ) {
          actualValue = inferDefaultFromZod(
            schemaOrModifier,
            config.sqlConfig!,
          );
        }
      }

      // 2. Determine final schema
      let baseSchema: z.ZodTypeAny;
      if (
        schemaOrModifier &&
        typeof schemaOrModifier === "object" &&
        "_def" in schemaOrModifier
      ) {
        finalSchema = schemaOrModifier;
      } else {
        if (value !== undefined) {
          if (typeof actualValue === "string") baseSchema = z.string();
          else if (typeof actualValue === "number") baseSchema = z.number();
          else if (typeof actualValue === "boolean") baseSchema = z.boolean();
          else if (actualValue instanceof Date) baseSchema = z.date();
          else if (actualValue === null) baseSchema = z.null();
          else baseSchema = z.any();
        } else {
          baseSchema = config.clientZod;
        }

        if (isFunction(schemaOrModifier)) {
          if (isDirectShortcut) {
            finalSchema = schemaOrModifier({ sql: config.sqlZod });
          } else {
            finalSchema = schemaOrModifier(baseSchema);
          }
        } else {
          finalSchema = baseSchema;
        }
      }

      const newConfig = { ...config.sqlConfig };
      if (clientPk !== undefined) {
        (newConfig as any).isClientPk = clientPk;
      }

      let clientAndServerSchema: z.ZodTypeAny;

      if (clientPk) {
        clientAndServerSchema = z.union([config.sqlZod, finalSchema]);
      } else if (schemaOrModifier !== undefined) {
        if (isDirectShortcut) {
          clientAndServerSchema = finalSchema;
        } else {
          clientAndServerSchema = finalSchema;
        }
      } else {
        if (config.sqlZod instanceof z.ZodUndefined) {
          clientAndServerSchema = finalSchema;
        } else {
          clientAndServerSchema = z.union([config.sqlZod, finalSchema]);
        }
      }

      return createBuilder({
        ...config,
        stage: "client",
        sqlConfig: newConfig as T,
        initialValue: actualValue,
        clientZod: clientAndServerSchema,
        validationZod: clientAndServerSchema,
        completedStages: newCompletedStages,
      }) as any;
    },

    server: <TValidationNext extends z.ZodTypeAny>(
      assert:
        | ((tools: { sql: TSql; client: TClient }) => TValidationNext)
        | TValidationNext,
    ) => {
      if (completedStages.has("server")) {
        throw new Error("server() can only be called once in the chain");
      }

      const serverSchema = isFunction(assert)
        ? assert({
            sql: config.sqlZod,
            client: config.clientZod,
          })
        : assert;

      const newCompletedStages = new Set(completedStages);
      newCompletedStages.add("server");

      return createBuilder({
        ...config,
        stage: "server",
        validationZod: serverSchema,
        completedStages: newCompletedStages,
      });
    },

    transform: (transforms: {
      toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
      toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
      if (!completedStages.has("server") && !completedStages.has("client")) {
        throw new Error(
          "transform() requires at least client() or server() to be called first",
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
    ? T[K]
    : K extends string
      ? EnrichedField<K, T[K], T>
      : T[K];
};
export const SchemaWrapperBrand = Symbol("SchemaWrapper");

type PickPrimaryKeys<T extends ShapeSchema> = {
  [K in keyof T as T[K] extends { config: { sql: { pk: true } } }
    ? K
    : never]: T[K];
};

type SchemaBuilder<T extends ShapeSchema> = Prettify<EnrichFields<T>> & {
  __primaryKeySQL?: string;

  primaryKeySQL: (
    definer: (pkFields: PickPrimaryKeys<T>) => string,
  ) => SchemaBuilder<T>;
};

export function schema<T extends string, U extends ShapeSchema<T>>(
  schema: U,
): SchemaBuilder<U> {
  const enrichedSchema: any = {};

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      if (key === "_tableName") {
        enrichedSchema[key] = schema[key];
      } else {
        enrichedSchema[key] = {
          ...schema[key],
          __meta: { _key: key, _fieldType: schema[key] },
          __parentTableType: schema,
        };
      }
    }
  }

  enrichedSchema[SchemaWrapperBrand] = true;
  enrichedSchema.__primaryKeySQL = undefined;

  enrichedSchema.primaryKeySQL = function (
    definer: (pkFields: PickPrimaryKeys<U>) => string,
  ): SchemaBuilder<U> {
    const pkFieldsOnly: any = {};

    for (const key in schema) {
      const field = schema[key];
      if (
        field &&
        typeof field === "object" &&
        (field as any).config?.sql?.pk === true
      ) {
        pkFieldsOnly[key] = schema[key];
      }
    }

    enrichedSchema.__primaryKeySQL = definer(
      pkFieldsOnly as PickPrimaryKeys<U>,
    );
    return enrichedSchema;
  };

  return enrichedSchema as SchemaBuilder<U>;
}

export type RelationType = "hasMany" | "hasOne" | "manyToMany";

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
  [SchemaWrapperBrand]?: true;
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
  zodType: z.ZodTypeAny,
  sqlConfig?: SQLType | RelationConfig<any>,
): any {
  if (
    sqlConfig &&
    "default" in sqlConfig &&
    sqlConfig.default === "CURRENT_TIMESTAMP"
  ) {
    return undefined;
  }

  if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
    if ("default" in sqlConfig && sqlConfig.default !== undefined) {
      return sqlConfig.default;
    }

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
        case "timestamp":
          return new Date();
      }
    }
    if (sqlTypeConfig.nullable) {
      return null;
    }
  }

  if ("_def" in zodType && "defaultValue" in zodType._def) {
    const def = zodType._def as { defaultValue?: (() => unknown) | unknown };
    const val = def.defaultValue;
    if (val !== undefined) {
      return typeof val === "function" ? (val as () => unknown)() : val;
    }
  }

  if (zodType instanceof z.ZodString) {
    return "";
  }

  return undefined;
}

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
  relations?: R,
): {
  pk: string[] | null;
  clientPk: string[] | null;
  isClientRecord: (record: any) => boolean;
  sqlSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>
  >;
  clientSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>
  >;
  serverSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
  >;
  defaultValues: Prettify<DeriveDefaults<TActualSchema>>;
  stateType: Prettify<DeriveStateType<TActualSchema>>;
  generateDefaults: () => Prettify<DeriveDefaults<TActualSchema>>;
  toClient: (
    dbObject: Partial<
      z.infer<
        z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
      >
    >,
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>
  >;

  toDb: (
    clientObject: Partial<
      z.infer<
        z.ZodObject<
          Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>
        >
      >
    >,
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
  >;
  parseForDb: (
    appData: z.input<
      z.ZodObject<
        Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
      >
    >,
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
  >;

  parseFromDb: (
    dbData: Partial<
      z.infer<
        z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
      >
    >,
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>
  >;
} {
  const sqlFields: any = {};
  const clientFields: any = {};
  const serverFields: any = {};
  const defaultValues: any = {};
  const defaultGenerators: any = {};
  const fieldTransforms: Record<
    string,
    { toClient: (val: any) => any; toDb: (val: any) => any }
  > = {};

  const clientToDbKeys: Record<string, string> = {};
  const dbToClientKeys: Record<string, string> = {};

  const fullSchema = { ...schema, ...(relations || {}) };
  let pkKeys: string[] | null = [];
  let clientPkKeys: string[] | null = [];

  for (const key in fullSchema) {
    const value = (fullSchema as any)[key];
    if (
      key === "_tableName" ||
      key.startsWith("__") ||
      key === String(SchemaWrapperBrand) ||
      key === "primaryKeySQL" ||
      typeof value === "function"
    )
      continue;

    const definition = (fullSchema as any)[key];

    if (isReference(definition)) {
      const targetField = definition.getter();
      if (targetField && targetField.config) {
        const config = targetField.config;

        const dbFieldName = config.sql?.field || key;
        clientToDbKeys[key] = dbFieldName;
        dbToClientKeys[dbFieldName] = key;

        sqlFields[dbFieldName] = config.zodSqlSchema;
        clientFields[key] = config.zodClientSchema;
        serverFields[key] = config.zodValidationSchema;

        const initialValueOrFn = config.initialValue;
        defaultGenerators[key] = initialValueOrFn;

        let rawDefault = isFunction(initialValueOrFn)
          ? initialValueOrFn({ uuid })
          : initialValueOrFn;

        if (config.transforms?.toClient && rawDefault !== undefined) {
          defaultValues[key] = config.transforms.toClient(rawDefault);
        } else {
          defaultValues[key] = rawDefault;
        }

        if (config.transforms) {
          fieldTransforms[key] = config.transforms;
        }
      }
      continue;
    }

    if (definition && definition.config) {
      const config = definition.config;

      if (config.sql?.pk && !config.sql?.isForeignKey) pkKeys.push(key);
      if ((config.sql as any)?.isClientPk) clientPkKeys.push(key);

      const sqlConfig = config.sql;
      if (
        sqlConfig &&
        typeof sqlConfig === "object" &&
        ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(
          sqlConfig.type,
        )
      ) {
        continue;
      } else {
        const dbFieldName = sqlConfig?.field || key;
        clientToDbKeys[key] = dbFieldName;
        dbToClientKeys[dbFieldName] = key;

        sqlFields[dbFieldName] = config.zodSqlSchema;
        clientFields[key] = config.zodClientSchema;
        serverFields[key] = config.zodValidationSchema;

        if (config.transforms) {
          fieldTransforms[key] = config.transforms;
        }

        const initialValueOrFn = config.initialValue;
        defaultGenerators[key] = initialValueOrFn;

        let rawDefault = isFunction(initialValueOrFn)
          ? initialValueOrFn({ uuid })
          : initialValueOrFn;

        if (config.transforms?.toClient && rawDefault !== undefined) {
          defaultValues[key] = config.transforms.toClient(rawDefault);
        } else {
          defaultValues[key] = rawDefault;
        }
      }
    }
  }

  let isClientRecord: (record: any) => boolean = () => false;

  if (clientPkKeys.length > 0) {
    const checkers: Array<{
      clientKey: string;
      dbKey: string;
      check: (val: any) => boolean;
    }> = [];

    for (const key of clientPkKeys) {
      const field = (fullSchema as any)[key];
      const sqlConfig = field?.config?.sql;
      const dbKey = sqlConfig?.field || key;
      const isClientPkVal = (sqlConfig as any)?.isClientPk;

      if (typeof isClientPkVal === "function") {
        checkers.push({ clientKey: key, dbKey, check: isClientPkVal });
      } else {
        const initialValueOrFn = field?.config?.initialValue;
        let sampleValue = initialValueOrFn;

        if (isFunction(initialValueOrFn)) {
          try {
            sampleValue = initialValueOrFn({ uuid });
          } catch (e) {}
        }

        if (sqlConfig?.type === "int" && typeof sampleValue === "string") {
          checkers.push({
            clientKey: key,
            dbKey,
            check: (val) => typeof val === "string",
          });
        }
      }
    }

    if (checkers.length > 0) {
      isClientRecord = (record: any) => {
        if (!record || typeof record !== "object") return false;
        return checkers.some(({ clientKey, dbKey, check }) => {
          const val =
            record[clientKey] !== undefined ? record[clientKey] : record[dbKey];
          return check(val);
        });
      };
    }
  }

  const generateDefaults = () => {
    const freshDefaults: any = {};
    for (const key in defaultGenerators) {
      const generatorOrValue = defaultGenerators[key];
      let rawValue = isFunction(generatorOrValue)
        ? generatorOrValue({ uuid })
        : generatorOrValue;
      freshDefaults[key] = fieldTransforms[key]?.toClient
        ? fieldTransforms[key].toClient(rawValue)
        : rawValue;
    }
    return freshDefaults;
  };

  const toClient = (dbObject: any) => {
    const clientObject: any = {};
    for (const dbKey in dbObject) {
      if (dbObject[dbKey] === undefined) continue;

      const clientKey = dbToClientKeys[dbKey] || dbKey;
      const transform = fieldTransforms[clientKey]?.toClient;

      clientObject[clientKey] = transform
        ? transform(dbObject[dbKey])
        : dbObject[dbKey];
    }
    return clientObject;
  };

  const toDb = (clientObject: any) => {
    const dbObject: any = {};
    for (const clientKey in clientObject) {
      if (clientObject[clientKey] === undefined) continue;

      const dbKey = clientToDbKeys[clientKey] || clientKey;
      const transform = fieldTransforms[clientKey]?.toDb;

      dbObject[dbKey] = transform
        ? transform(clientObject[clientKey])
        : clientObject[clientKey];
    }
    return dbObject;
  };

  const finalSqlSchema = z.object(sqlFields) as any;
  const finalClientSchema = z.object(clientFields) as any;
  const finalValidationSchema = z.object(serverFields) as any;
  return {
    pk: pkKeys.length ? pkKeys : null,
    clientPk: clientPkKeys.length ? clientPkKeys : null,
    isClientRecord,
    sqlSchema: finalSqlSchema,
    clientSchema: finalClientSchema,
    serverSchema: finalValidationSchema,
    defaultValues: defaultValues as any,
    stateType: {} as any,
    generateDefaults,
    toClient,
    toDb,
    parseForDb: (appData) => {
      const validData = finalValidationSchema.parse(appData);
      return toDb(validData);
    },

    parseFromDb: (dbData) => {
      const mappedData = toClient(dbData);
      return finalClientSchema.parse(mappedData);
    },
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
  [TableName in keyof S]?: {
    [FieldName in keyof S[TableName] as S[TableName][FieldName] extends
      | PlaceholderReference
      | PlaceholderRelation<any>
      ? FieldName
      : never]?: S[TableName][FieldName] extends PlaceholderRelation<any>
      ? {
          fromKey: KnownKeys<S[TableName]>;
          toKey: { __meta: any; __parentTableType: any };
          defaultCount?: number;
        }
      : S[TableName][FieldName] extends PlaceholderReference
        ? { __meta: any; __parentTableType: any }
        : never;
  };
};

type ResolveField<Field, Resolution> = Field extends PlaceholderReference
  ? Resolution
  : Field extends Reference<any>
    ? Resolution
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
                      ? BaseRelationConfig<TargetSchema> & {
                          type: "manyToMany";
                        }
                      : never,
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
      : Field;

type ResolveSchema<
  Schema extends SchemaWithPlaceholders,
  Resolutions extends Record<string, any>,
> = {
  [K in keyof Schema]: K extends keyof Resolutions
    ? ResolveField<Schema[K], Resolutions[K]>
    : Schema[K];
};

type ResolvedRegistryWithSchemas<
  S extends Record<string, SchemaWithPlaceholders>,
  R extends ResolutionMap<S>,
> = {
  [K in keyof S]: {
    rawSchema: ResolveSchema<
      S[K],
      K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
    >;
    zodSchemas: {
      sqlSchema: z.ZodObject<
        Prettify<
          DeriveSchemaByKey<
            ResolveSchema<
              S[K],
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
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
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
            >,
            "zodClientSchema"
          >
        >
      >;
      serverSchema: z.ZodObject<
        Prettify<
          DeriveSchemaByKey<
            ResolveSchema<
              S[K],
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
            >,
            "zodValidationSchema"
          >
        >
      >;
      defaultValues: Prettify<
        DeriveDefaults<
          ResolveSchema<
            S[K],
            K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
          >
        >
      >;
      stateType: Prettify<
        DeriveStateType<
          ResolveSchema<
            S[K],
            K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
          >
        >
      >;
    };
    transforms: {
      toClient: (dbObject: any) => any;
      toDb: (clientObject: any) => any;
      parseForDb: (appData: any) => any;
      parseFromDb: (dbData: any) => any;
    };
    pk: string[] | null;
    clientPk: string[] | null;
    isClientRecord: (record: any) => boolean;
    generateDefaults: () => Prettify<
      DeriveDefaults<
        ResolveSchema<
          S[K],
          K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
        >
      >
    >;
  };
};

function createViewObject(
  initialRegistryKey: string,
  selection: Record<string, any>,
  registry: any,
  tableNameToRegistryKeyMap: Record<string, string>,
) {
  let allTablesSupportsReconciliation = true;
  const checkedTables: Record<string, boolean> = {};

  function buildView(
    currentRegistryKey: string,
    subSelection: Record<string, any> | boolean,
    schemaType: "client" | "server",
  ): z.ZodObject<any> {
    const registryEntry = registry[currentRegistryKey];
    if (!registryEntry) {
      throw new Error(
        `Schema with key "${currentRegistryKey}" not found in the registry.`,
      );
    }

    if (!(currentRegistryKey in checkedTables)) {
      const hasPks = !!(
        registryEntry.zodSchemas?.pk &&
        registryEntry.zodSchemas.pk.length > 0 &&
        registryEntry.zodSchemas?.clientPk &&
        registryEntry.zodSchemas.clientPk.length > 0
      );

      checkedTables[currentRegistryKey] = hasPks;

      if (!hasPks) {
        console.log(`Table ${currentRegistryKey} missing pk/clientPk:`, {
          pk: registryEntry.zodSchemas?.pk,
          clientPk: registryEntry.zodSchemas?.clientPk,
        });
        allTablesSupportsReconciliation = false;
      }
    }

    const baseSchema =
      schemaType === "server"
        ? registryEntry.zodSchemas.serverSchema
        : registryEntry.zodSchemas.clientSchema;
    const primitiveShape = baseSchema.shape;

    if (subSelection === true) {
      return z.object(primitiveShape);
    }

    const selectedRelationShapes: Record<string, z.ZodTypeAny> = {};
    if (typeof subSelection === "object") {
      for (const relationKey in subSelection) {
        const relationBuilder = registryEntry.rawSchema[relationKey];
        const isRelation = relationBuilder?.config?.sql?.schema;

        if (subSelection[relationKey] && isRelation) {
          const relationConfig = relationBuilder.config.sql;
          const targetTableName = relationConfig.schema()._tableName;
          const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];

          if (!nextRegistryKey) {
            throw new Error(
              `Could not resolve registry key for table "${targetTableName}"`,
            );
          }

          const relationSchema = buildView(
            nextRegistryKey,
            subSelection[relationKey],
            schemaType,
          );

          if (["hasMany", "manyToMany"].includes(relationConfig.type)) {
            selectedRelationShapes[relationKey] = z.array(relationSchema);
          } else {
            selectedRelationShapes[relationKey] = relationSchema.nullable();
          }
        }
      }
    }

    const finalShape = { ...primitiveShape, ...selectedRelationShapes };
    return z.object(finalShape);
  }

  return {
    sql: registry[initialRegistryKey].zodSchemas.sqlSchema,
    client: buildView(initialRegistryKey, selection, "client"),
    server: buildView(initialRegistryKey, selection, "server"),
    supportsReconciliation: allTablesSupportsReconciliation,
  };
}

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

type GetRelationRegistryKey<
  Field,
  TRegistry extends RegistryShape,
> = Field extends {
  config: { sql: { schema: () => infer S } };
}
  ? S extends { _tableName: infer T }
    ? {
        [K in keyof TRegistry]: TRegistry[K]["rawSchema"]["_tableName"] extends T
          ? K
          : never;
      }[keyof TRegistry]
    : never
  : never;

type OmitRelationFields<Shape, RawSchema> = Omit<
  Shape,
  {
    [K in keyof Shape]: K extends keyof RawSchema
      ? IsRelationField<RawSchema[K]> extends true
        ? K
        : never
      : never;
  }[keyof Shape]
>;

type _DeriveViewShape<
  TTableName extends keyof TRegistry,
  TSelection,
  TRegistry extends RegistryShape,
  TKey extends "clientSchema" | "serverSchema" | "sqlSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10
  ? any
  : TKey extends "sqlSchema"
    ? TRegistry[TTableName]["zodSchemas"]["sqlSchema"] extends z.ZodObject<
        infer BaseShape
      >
      ? _DeriveViewShapeInner<
          BaseShape,
          TTableName,
          TSelection,
          TRegistry,
          TKey,
          Depth
        >
      : never
    : TRegistry[TTableName]["zodSchemas"][TKey] extends z.ZodObject<
          infer BaseShape
        >
      ? _DeriveViewShapeInner<
          BaseShape,
          TTableName,
          TSelection,
          TRegistry,
          TKey,
          Depth
        >
      : never;

type _DeriveViewShapeInner<
  BaseShape,
  TTableName extends keyof TRegistry,
  TSelection,
  TRegistry extends RegistryShape,
  TKey extends "clientSchema" | "serverSchema" | "sqlSchema",
  Depth extends any[] = [],
> =
  TSelection extends Record<string, any>
    ? Prettify<
        OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]> & {
          [K in keyof TSelection &
            keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<
            TRegistry[TTableName]["rawSchema"][K]
          > extends true
            ? K
            : never]: GetRelationRegistryKey<
            TRegistry[TTableName]["rawSchema"][K],
            TRegistry
          > extends infer TargetKey
            ? TargetKey extends keyof TRegistry
              ? TRegistry[TTableName]["rawSchema"][K] extends {
                  config: { sql: { type: infer RelType } };
                }
                ? RelType extends "hasMany" | "manyToMany"
                  ? z.ZodArray<
                      z.ZodObject<
                        _DeriveViewShape<
                          TargetKey,
                          TSelection[K],
                          TRegistry,
                          TKey,
                          [...Depth, 1]
                        >
                      >
                    >
                  : z.ZodNullable<
                      z.ZodObject<
                        _DeriveViewShape<
                          TargetKey,
                          TSelection[K],
                          TRegistry,
                          TKey,
                          [...Depth, 1]
                        >
                      >
                    >
                : never
              : never
            : never;
        }
      >
    : OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]>;

type DeriveViewDefaults<
  TTableName extends keyof TRegistry,
  TSelection,
  TRegistry extends RegistryShape,
  Depth extends any[] = [],
> = Prettify<
  TRegistry[TTableName]["zodSchemas"]["defaultValues"] &
    (TSelection extends Record<string, any>
      ? {
          [K in keyof TSelection &
            keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<
            TRegistry[TTableName]["rawSchema"][K]
          > extends true
            ? K
            : never]: TRegistry[TTableName]["rawSchema"][K] extends {
            config: { sql: { type: infer RelType; schema: any } };
          }
            ? GetRelationRegistryKey<
                TRegistry[TTableName]["rawSchema"][K],
                TRegistry
              > extends infer TargetKey
              ? TargetKey extends keyof TRegistry
                ? RelType extends "hasMany" | "manyToMany"
                  ? DeriveViewDefaults<
                      TargetKey,
                      TSelection[K],
                      TRegistry,
                      [...Depth, 1]
                    >[]
                  : DeriveViewDefaults<
                      TargetKey,
                      TSelection[K],
                      TRegistry,
                      [...Depth, 1]
                    > | null
                : never
              : never
            : never;
        }
      : {})
>;
export type DeriveViewResult<
  TTableName extends keyof TRegistry,
  TSelection,
  TRegistry extends RegistryShape,
> = {
  definition: TRegistry[TTableName]["rawSchema"];
  schemaKey: TTableName;
  schemas: {
    sql: TRegistry[TTableName]["zodSchemas"]["sqlSchema"];
    client: z.ZodObject<
      _DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">
    >;
    server: z.ZodObject<
      _DeriveViewShape<TTableName, TSelection, TRegistry, "serverSchema">
    >;
  };
  transforms: {
    toClient: TRegistry[TTableName]["transforms"]["toClient"];
    toDb: TRegistry[TTableName]["transforms"]["toDb"];
    parseForDb: (
      appData: z.input<
        z.ZodObject<
          _DeriveViewShape<TTableName, TSelection, TRegistry, "serverSchema">
        >
      >,
    ) => z.infer<
      z.ZodObject<
        _DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">
      >
    >;
    parseFromDb: (
      dbData: Partial<
        z.infer<
          z.ZodObject<
            _DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">
          >
        >
      >,
    ) => z.infer<
      z.ZodObject<
        _DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">
      >
    >;
  };

  defaults: DeriveViewDefaults<TTableName, TSelection, TRegistry>;

  pk: string[] | null;
  clientPk: string[] | null;
  supportsReconciliation: boolean;

  isView: true;
  viewSelection: TSelection;
  baseTable: TTableName;
  nav?: undefined;
  createView?: undefined;
  RelationSelection?: undefined;
  __registry: TRegistry;
};

type RelationKeysOf<
  Cur extends string,
  Reg extends RegistryShape,
> = Cur extends keyof Reg
  ? {
      [K in keyof Reg[Cur]["rawSchema"]]: IsRelationField<
        Reg[Cur]["rawSchema"][K]
      > extends true
        ? K
        : never;
    }[keyof Reg[Cur]["rawSchema"]]
  : never;

type NavigationProxy<
  CurrentTable extends string,
  Registry extends RegistryShape,
> = CurrentTable extends keyof Registry
  ? RelationKeysOf<CurrentTable, Registry> extends never
    ? never
    : {
        [K in RelationKeysOf<CurrentTable, Registry>]: GetRelationRegistryKey<
          Registry[CurrentTable]["rawSchema"][K],
          Registry
        > extends infer TargetKey
          ? TargetKey extends keyof Registry
            ? NavigationProxy<TargetKey & string, Registry>
            : never
          : never;
      }
  : never;

type IsEffectivelyEmpty<T> = [T] extends [never]
  ? true
  : [keyof T] extends [never]
    ? true
    : string extends keyof T
      ? true
      : number extends keyof T
        ? true
        : symbol extends keyof T
          ? true
          : false;

type NavigationToSelection<T> =
  IsEffectivelyEmpty<T> extends true
    ? never
    : { [K in keyof T]?: boolean | NavigationToSelection<T[K]> };

export type OmitRelations<Shape, RawSchema> = Omit<
  Shape,
  {
    [K in keyof Shape]: K extends keyof RawSchema
      ? RawSchema[K] extends { config: { sql: { schema: any } } }
        ? K
        : never
      : never;
  }[keyof Shape]
>;

type RegistryShape = Record<
  string,
  {
    rawSchema: any;
    zodSchemas: {
      sqlSchema: z.ZodObject<any>;
      clientSchema: z.ZodObject<any>;
      serverSchema: z.ZodObject<any>;
      defaultValues: any;
      stateType: any;
    };
    transforms: {
      toClient: (dbObject: any) => any;
      toDb: (clientObject: any) => any;
      parseForDb: (appData: any) => any;
      parseFromDb: (dbData: any) => any;
    };
    pk: string[] | null;
    clientPk: string[] | null;
    isClientRecord: (record: any) => boolean;
    generateDefaults: () => any;
  }
>;

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
    schemaKey: K;
    schemas: {
      sql: Resolved[K]["zodSchemas"]["sqlSchema"];
      client: Resolved[K]["zodSchemas"]["clientSchema"];
      server: Resolved[K]["zodSchemas"]["serverSchema"];
    };

    transforms: {
      toClient: (
        dbData: z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>,
      ) => z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>;

      toDb: (
        clientData: z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>,
      ) => z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>;

      parseForDb: (
        appData: z.input<Resolved[K]["zodSchemas"]["serverSchema"]>,
      ) => z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>;

      parseFromDb: (
        dbData: Partial<z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>>,
      ) => z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>;
    };

    defaults: Resolved[K]["zodSchemas"]["defaultValues"];
    stateType: Resolved[K]["zodSchemas"]["stateType"];
    generateDefaults: () => Resolved[K]["zodSchemas"]["defaultValues"];

    pk: string[] | null;
    clientPk: string[] | null;
    isClientRecord: (record: any) => boolean;

    nav: NavigationProxy<K & string, Resolved>;
    RelationSelection: NavigationToSelection<
      NavigationProxy<K & string, Resolved>
    >;
    createView: <
      const TSelection extends NavigationToSelection<
        NavigationProxy<K & string, Resolved>
      >,
    >(
      selection: TSelection,
    ) => DeriveViewResult<K & string, TSelection, Resolved>;
    __registry: Resolved;
  };
};

export function createSchemaBox<
  S extends Record<string, SchemaWithPlaceholders>,
  R extends ResolutionMap<S>,
>(schemas: S, resolutions: R): CreateSchemaBoxReturn<S, R> {
  const resolutionConfig = resolutions;
  const resolvedSchemas = schemas;

  for (const tableName in schemas) {
    for (const fieldName in schemas[tableName]) {
      const field = schemas[tableName][fieldName];
      if (isReference(field)) {
        const targetField = field.getter();
        if (targetField && targetField.config) {
          const newConfig = {
            ...targetField.config,
            sql: { ...targetField.config.sql, isForeignKey: true },
          };
          resolvedSchemas[tableName]![fieldName] = {
            ...targetField,
            config: newConfig,
          };
        } else {
          throw new Error(
            `Could not resolve reference for ${tableName}.${fieldName}`,
          );
        }
      }
    }
  }

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
            `Could not resolve relation for ${tableName}.${fieldName}`,
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
      transforms: {
        toClient: zodSchemas.toClient,
        toDb: zodSchemas.toDb,
        parseForDb: zodSchemas.parseForDb,
        parseFromDb: zodSchemas.parseFromDb,
      },
      pk: zodSchemas.pk,
      clientPk: zodSchemas.clientPk,
      isClientRecord: zodSchemas.isClientRecord,
      generateDefaults: zodSchemas.generateDefaults,
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
      },
    );
  };

  const cleanerRegistry: any = {};
  const tableNameToRegistryKeyMap: Record<string, string> = {};
  for (const key in finalRegistry) {
    const tableName = finalRegistry[key].rawSchema._tableName;
    tableNameToRegistryKeyMap[tableName] = key;
  }

  for (const tableName in finalRegistry) {
    const entry = finalRegistry[tableName];

    cleanerRegistry[tableName] = {
      definition: entry.rawSchema,
      schemaKey: tableName,

      schemas: {
        sql: entry.zodSchemas.sqlSchema,
        client: entry.zodSchemas.clientSchema,
        server: entry.zodSchemas.serverSchema,
      },

      transforms: {
        toClient: entry.transforms.toClient,
        toDb: entry.transforms.toDb,
        parseForDb: entry.transforms.parseForDb,
        parseFromDb: entry.transforms.parseFromDb,
      },

      defaults: entry.zodSchemas.defaultValues,
      stateType: entry.zodSchemas.stateType,
      generateDefaults: entry.generateDefaults,

      pk: entry.pk,
      clientPk: entry.clientPk,
      isClientRecord: entry.isClientRecord,

      nav: createNavProxy(tableName, finalRegistry),

      createView: (selection: any) => {
        const view = createViewObject(
          tableName,
          selection,
          finalRegistry,
          tableNameToRegistryKeyMap,
        );
        const defaults = computeViewDefaults(
          tableName,
          selection,
          finalRegistry,
          tableNameToRegistryKeyMap,
        );

        const deepToClient = (
          dbData: any,
          currentSelection: any,
          currentKey: string,
        ): any => {
          if (!dbData) return dbData;
          if (Array.isArray(dbData))
            return dbData.map((item) =>
              deepToClient(item, currentSelection, currentKey),
            );

          const regEntry = finalRegistry[currentKey];
          const baseMapped = { ...regEntry.transforms.toClient(dbData) };

          if (typeof currentSelection === "object") {
            for (const relKey in currentSelection) {
              if (
                currentSelection[relKey] &&
                dbData[relKey] !== undefined &&
                dbData[relKey] !== null
              ) {
                const relField = regEntry.rawSchema[relKey];
                if (relField?.config?.sql?.schema) {
                  const targetTableName =
                    relField.config.sql.schema()._tableName;
                  const nextRegKey = tableNameToRegistryKeyMap[targetTableName];
                  if (nextRegKey) {
                    baseMapped[relKey] = deepToClient(
                      dbData[relKey],
                      currentSelection[relKey],
                      nextRegKey,
                    );
                  }
                }
              }
            }
          }
          return baseMapped;
        };

        const deepToDb = (
          clientData: any,
          currentSelection: any,
          currentKey: string,
        ): any => {
          if (!clientData) return clientData;
          if (Array.isArray(clientData))
            return clientData.map((item) =>
              deepToDb(item, currentSelection, currentKey),
            );

          const regEntry = finalRegistry[currentKey];
          const baseMapped = regEntry.transforms.toDb(clientData);

          if (typeof currentSelection === "object") {
            for (const relKey in currentSelection) {
              if (
                currentSelection[relKey] &&
                clientData[relKey] !== undefined &&
                clientData[relKey] !== null
              ) {
                const relField = regEntry.rawSchema[relKey];
                if (relField?.config?.sql?.schema) {
                  const targetTableName =
                    relField.config.sql.schema()._tableName;
                  const nextRegKey = tableNameToRegistryKeyMap[targetTableName];
                  if (nextRegKey) {
                    baseMapped[relKey] = deepToDb(
                      clientData[relKey],
                      currentSelection[relKey],
                      nextRegKey,
                    );
                  }
                }
              }
            }
          }
          return baseMapped;
        };

        const viewToClient = (dbData: any) =>
          deepToClient(dbData, selection, tableName);

        const viewToDb = (clientData: any) =>
          deepToDb(clientData, selection, tableName);

        return {
          definition: entry.rawSchema,
          schemaKey: tableName,
          schemas: {
            sql: view.sql,
            client: view.client,
            server: view.server,
          },
          transforms: {
            toClient: viewToClient,
            toDb: viewToDb,
            parseForDb: (appData: any) => {
              return viewToDb(appData);
            },
            parseFromDb: (dbData: any) => {
              return viewToClient(dbData);
            },
          },

          defaults: defaults,
          pk: entry.zodSchemas.pk,
          clientPk: entry.zodSchemas.clientPk,
          supportsReconciliation: view.supportsReconciliation,
          isView: true as const,
          viewSelection: selection,
          baseTable: tableName,
          __registry: finalRegistry,
        };
      },
      RelationSelection: {} as NavigationToSelection<any>,
      __registry: finalRegistry,
    };
  }

  return cleanerRegistry as CreateSchemaBoxReturn<S, R>;
}
function computeViewDefaults(
  currentRegistryKey: string,
  selection: Record<string, any> | boolean,
  registry: any,
  tableNameToRegistryKeyMap: Record<string, string>,
  visited = new Set<string>(),
): any {
  if (visited.has(currentRegistryKey)) {
    return undefined;
  }
  visited.add(currentRegistryKey);

  const entry = registry[currentRegistryKey];
  if (!entry) {
    console.warn(
      `Could not find entry for key "${currentRegistryKey}" in registry while computing defaults.`,
    );
    return {};
  }

  const rawSchema = entry.rawSchema;
  const baseDefaults = { ...entry.zodSchemas.defaultValues };

  if (selection === true || typeof selection !== "object") {
    return baseDefaults;
  }

  for (const key in selection) {
    if (!selection[key]) continue;

    const field = rawSchema[key];
    if (!field?.config?.sql?.schema) continue;

    const relationConfig = field.config.sql;

    const targetTableName = relationConfig.schema()._tableName;

    const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
    if (!nextRegistryKey) continue;

    const defaultConfig = relationConfig.defaultConfig;

    if (defaultConfig === undefined) {
      delete baseDefaults[key];
    } else if (defaultConfig === null) {
      baseDefaults[key] = null;
    } else if (Array.isArray(defaultConfig)) {
      baseDefaults[key] = [];
    } else if (
      relationConfig.type === "hasMany" ||
      relationConfig.type === "manyToMany"
    ) {
      const count =
        (defaultConfig as any)?.count || relationConfig.defaultCount || 1;
      baseDefaults[key] = Array.from({ length: count }, () =>
        computeViewDefaults(
          nextRegistryKey,
          selection[key],
          registry,
          tableNameToRegistryKeyMap,
          new Set(visited),
        ),
      );
    } else {
      baseDefaults[key] = computeViewDefaults(
        nextRegistryKey,
        selection[key],
        registry,
        tableNameToRegistryKeyMap,
        new Set(visited),
      );
    }
  }

  return baseDefaults;
}

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
type GetDbKey<K, Field> =
  Field extends Reference<infer TGetter>
    ? ReturnType<TGetter> extends {
        config: { sql: { field: infer F extends string } };
      }
      ? string extends F
        ? K
        : F
      : K
    : Field extends { config: { sql: { field: infer F extends string } } }
      ? string extends F
        ? K
        : F
      : K;

type DeriveSchemaByKey<
  T,
  Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10
  ? any
  : {
      [K in keyof T as K extends
        | "_tableName"
        | typeof SchemaWrapperBrand
        | "__primaryKeySQL"
        | "primaryKeySQL"
        ? never
        : K extends keyof T
          ? T[K] extends Reference<any>
            ? Key extends "zodSqlSchema"
              ? GetDbKey<K, T[K]>
              : K
            : T[K] extends {
                  config: {
                    sql: {
                      type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                    };
                  };
                }
              ? never
              : Key extends "zodSqlSchema"
                ? GetDbKey<K, T[K]>
                : K
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

type DeriveDefaults<T, Depth extends any[] = []> = Prettify<
  Depth["length"] extends 10
    ? any
    : {
        [K in keyof T as K extends
          | "_tableName"
          | typeof SchemaWrapperBrand
          | "__primaryKeySQL"
          | "primaryKeySQL"
          ? never
          : K extends keyof T
            ? T[K] extends Reference<any>
              ? K
              : T[K] extends {
                    config: {
                      sql: {
                        type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                      };
                    };
                  }
                ? never
                : K
            : never]: T[K] extends Reference<infer TGetter>
          ? ReturnType<TGetter> extends {
                config: { initialValue: infer D };
              }
              ? D extends () => infer R
                ? R
                : D
              : never
          : T[K] extends {
                config: {
                  zodClientSchema: infer TClient extends z.ZodTypeAny;
                };
              }
            ? z.infer<TClient>
            : never;
      }
>;

type DeriveStateType<T, Depth extends any[] = []> = Prettify<
  Depth["length"] extends 10
    ? any
    : {
        [K in keyof T as K extends
          | "_tableName"
          | typeof SchemaWrapperBrand
          | "__primaryKeySQL"
          | "primaryKeySQL"
          ? never
          : K extends keyof T
            ? T[K] extends Reference<any>
              ? K
              : T[K] extends {
                    config: {
                      sql: {
                        type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                      };
                    };
                  }
                ? never
                : K
            : never]: T[K] extends Reference<infer TGetter>
          ? ReturnType<TGetter> extends {
              config: { zodClientSchema: infer TClient extends z.ZodTypeAny };
            }
            ? z.infer<TClient>
            : never
          : T[K] extends {
                config: {
                  zodClientSchema: infer TClient extends z.ZodTypeAny;
                };
              }
            ? z.infer<TClient>
            : never;
      }
>;
