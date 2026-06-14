import { z } from "zod";
import { v4 as uuid } from "uuid";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

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

export type SQLDialect = "sqlite" | "postgres" | "mysql";

type SQLTypeConfig = (
  | { type: "int"; nullable?: boolean; default?: number }
  | { type: "real"; nullable?: boolean; default?: number }
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
  | {
      type: "enum";
      values: readonly [string, ...string[]];
      nullable?: boolean;
      default?: string;
      name?: string;
    }
) &
  BaseConfig;

export type SQLType = SQLTypeConfig & { dialect: SQLDialect };

type SQLTypeInput = SQLTypeConfig;

type WithDialect<T extends SQLTypeInput, TDialect extends SQLDialect> =
  SQLType &
    T & {
      dialect: TDialect;
    };

type BaseConfig = {
  nullable?: boolean;
  pk?: true;
  field?: string;
  sqlOnly?: true;
};

type SQLToZodType<
  T extends SQLTypeInput,
  TDefault extends boolean,
> = T["pk"] extends true
  ? TDefault extends true
    ? z.ZodString
    : z.ZodNumber
  : T["nullable"] extends true
    ? T["type"] extends "varchar" | "char" | "text" | "longtext"
      ? z.ZodNullable<z.ZodString>
      : T["type"] extends "enum"
        ? T extends { values: infer TValues extends readonly [string, ...string[]] }
          ? z.ZodNullable<z.ZodType<TValues[number]>>
          : never
      : T["type"] extends "int" | "real"
        ? z.ZodNullable<z.ZodNumber>
        : T["type"] extends "boolean"
          ? z.ZodNullable<z.ZodNumber>
          : T["type"] extends "date" | "datetime" | "timestamp"
            ? T extends { default: "CURRENT_TIMESTAMP" }
              ? TDefault extends true
                ? never
                : z.ZodNullable<z.ZodDate>
              : z.ZodNullable<z.ZodDate>
            : never
    : T["type"] extends "varchar" | "char" | "text" | "longtext"
      ? z.ZodString
      : T["type"] extends "enum"
        ? T extends { values: infer TValues extends readonly [string, ...string[]] }
          ? z.ZodType<TValues[number]>
          : never
      : T["type"] extends "int" | "real"
        ? z.ZodNumber
        : T["type"] extends "boolean"
          ? z.ZodNumber
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
      TSchema,
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
      ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
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
      TSchema,
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
      TSchema,
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
      ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
      CollapsedUnion<
        TSql,
        ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
      >
    >
  >;

  client(options: {
    value?: never;
    schema: (tools: any) => z.ZodTypeAny;
  }): Prettify<
    Builder<"client", T, TSql, unknown, z.ZodTypeAny, z.ZodTypeAny>
  >;

  client<TClientNext extends z.ZodTypeAny>(
    schema: ((tools: { sql: TSql }) => TClientNext) | TClientNext,
  ): Prettify<
    Builder<
      "client",
      T,
      TSql,
      z.infer<TClientNext>,
      TClientNext,
      CollapsedUnion<TSql, TClientNext>
    >
  >;

  clientCheck: <TClientNext extends z.ZodTypeAny>(
    schema:
      | ((tools: {
          sql: TSql;
          client: TClient;
          clientCheck: z.ZodUnion<[TSql, TClient]>;
        }) => TClientNext)
      | TClientNext,
  ) => Prettify<
    Builder<
      "clientCheck",
      T,
      TSql,
      TInitialValue,
      TClient,
      z.ZodUnion<[TSql, TClientNext]>
    >
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
      | ((tools: {
          sql: TSql;
          client: TClient;
          clientCheck: z.ZodUnion<[TSql, TClient]>;
        }) => TValidationNext)
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

type Stage = "sql" | "relation" | "client" | "clientCheck" | "server" | "done";

type StageMethods = {
  sql: "client" | "clientCheck" | "server" | "transform" | "reference";
  relation: "client" | "clientCheck" | "server" | "transform";
  client: "clientCheck" | "server" | "transform";
  clientCheck: "server" | "transform";
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
  zodClientCheckedSchema: TClient;
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
    zodClientCheckedSchema: TValidation;
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
  client<const TValue, const TSchema extends z.ZodTypeAny>(options: {
    value: TValue | ((tools: { uuid: () => string }) => TValue);
    schema:
      | TSchema
      | ((
          base: ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
        ) => TSchema);
    clientPk?: boolean | ((val: any) => boolean);
  }): Builder<
    "client",
    null,
    z.ZodUndefined,
    TValue extends () => infer R ? R : TValue,
    TSchema,
    TSchema
  >;

  client<const TValue>(options: {
    value: TValue | ((tools: { uuid: () => string }) => TValue);
    schema?: never;
    clientPk?: boolean | ((val: any) => boolean);
  }): Builder<
    "client",
    null,
    z.ZodUndefined,
    TValue extends () => infer R ? R : TValue,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
  >;

  client<const TSchema extends z.ZodTypeAny>(options: {
    value?: never;
    schema: TSchema;
    clientPk?: boolean | ((val: any) => boolean);
  }): Builder<
    "client",
    null,
    z.ZodUndefined,
    z.infer<TSchema>,
    TSchema,
    TSchema
  >;

  client<const TValue>(
    value: TValue | ((tools: { uuid: () => string }) => TValue),
  ): Builder<
    "client",
    null,
    z.ZodUndefined,
    TValue extends () => infer R ? R : TValue,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
  >;
  sqlite: <const T extends SQLTypeInput>(
    sqlConfig: T,
  ) => Builder<
    "sql",
    WithDialect<T, "sqlite">,
    SQLToZodType<T, false>,
    z.infer<SQLToZodType<T, false>>,
    SQLToZodType<T, false>,
    SQLToZodType<T, false>
  >;
  postgres: <const T extends SQLTypeInput>(
    sqlConfig: T,
  ) => Builder<
    "sql",
    WithDialect<T, "postgres">,
    SQLToZodType<T, false>,
    z.infer<SQLToZodType<T, false>>,
    SQLToZodType<T, false>,
    SQLToZodType<T, false>
  >;
  mysql: <const T extends SQLTypeInput>(
    sqlConfig: T,
  ) => Builder<
    "sql",
    WithDialect<T, "mysql">,
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

function createSqlBuilder<
  const T extends SQLTypeInput,
  const TDialect extends SQLDialect,
>(dialect: TDialect, sqlConfig: T) {
  const sqlZodType = (() => {
    let baseType: z.ZodTypeAny;
    if (sqlConfig.pk) {
      baseType = z.number();
    } else {
      switch (sqlConfig.type) {
        case "int":
          baseType = z.number();
          break;
        case "real":
          baseType = z.number();
          break;
        case "boolean":
          baseType = z.number();
          break;
        case "date":
        case "datetime":
        case "timestamp":
          baseType = z.date();
          break;
        case "enum":
          baseType = z.enum(sqlConfig.values);
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

  const dialectConfig = { ...sqlConfig, dialect } as WithDialect<T, TDialect>;

  return createBuilder({
    stage: "sql",
    sqlConfig: dialectConfig,
    sqlZod: sqlZodType as SQLToZodType<T, false>,
    initialValue: inferDefaultFromZod(sqlZodType, dialectConfig),
    clientZod: sqlZodType as SQLToZodType<T, false>,
    validationZod: sqlZodType as SQLToZodType<T, false>,
  }) as Builder<
    "sql",
    WithDialect<T, TDialect>,
    SQLToZodType<T, false>,
    z.infer<SQLToZodType<T, false>>,
    SQLToZodType<T, false>,
    SQLToZodType<T, false>
  >;
}

function isClientOptions(
  value: unknown,
): value is {
  value?: unknown;
  schema?: unknown;
  clientPk?: unknown;
} {
  return (
    value !== undefined &&
    typeof value === "object" &&
    value !== null &&
    !isFunction(value) &&
    !("_def" in value) &&
    !("parse" in value) &&
    ("value" in value || "schema" in value || "clientPk" in value)
  );
}

export const s: ShapeAPI = {
  client: (...args: any[]) => {
    const first = args[0];

    if (isClientOptions(first)) {
      return createBuilder({
        stage: "sql",
        sqlConfig: null,
        sqlZod: z.undefined(),
        initialValue: undefined,
        clientZod: z.undefined(),
        validationZod: z.undefined(),
      }).client(first as any) as any;
    }

    const value = first as
      | unknown
      | ((tools: { uuid: () => string }) => unknown);
    const sample = isFunction(value) ? value({ uuid }) : value;

    let inferredZodType: z.ZodTypeAny;
    if (typeof sample === "string") {
      inferredZodType = z.string();
    } else if (typeof sample === "number") {
      inferredZodType = z.number();
    } else if (typeof sample === "boolean") {
      inferredZodType = z.boolean();
    } else if (sample instanceof Date) {
      inferredZodType = z.date();
    } else if (sample === null) {
      inferredZodType = z.null();
    } else {
      inferredZodType = z.any();
    }

    return createBuilder({
      stage: "client",
      sqlConfig: null,
      sqlZod: z.undefined(),
      initialValue: value,
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
  sqlite: <const T extends SQLTypeInput>(sqlConfig: T) =>
    createSqlBuilder("sqlite", sqlConfig),
  postgres: <const T extends SQLTypeInput>(sqlConfig: T) =>
    createSqlBuilder("postgres", sqlConfig),
  mysql: <const T extends SQLTypeInput>(sqlConfig: T) =>
    createSqlBuilder("mysql", sqlConfig),
};

function createBuilder<
  TStage extends "sql" | "relation" | "client" | "clientCheck" | "server",
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
  clientInputZod?: TClient;
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
        config.initialValue ??
        inferDefaultFromZod(
          config.clientZod as z.ZodTypeAny,
          config.sqlConfig!,
        ),
      zodClientSchema: config.clientInputZod || config.clientZod,
      zodClientCheckedSchema: config.clientZod,
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
          clientZod: assert as TClient,
          clientInputZod: assert as TClient,
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

      if (value !== undefined) {
        actualValue = value;
      }

      let baseSchema: z.ZodTypeAny;
      if (
        schemaOrModifier &&
        typeof schemaOrModifier === "object" &&
        "_def" in schemaOrModifier
      ) {
        finalSchema = schemaOrModifier;
      } else {
        if (value !== undefined) {
          const sample = isFunction(value) ? value({ uuid }) : value;
          if (typeof sample === "string") baseSchema = z.string();
          else if (typeof sample === "number") baseSchema = z.number();
          else if (typeof sample === "boolean") baseSchema = z.boolean();
          else if (sample instanceof Date) baseSchema = z.date();
          else if (sample === null) baseSchema = z.null();
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

      if (value === undefined) {
        const inferredClientDefault = inferDefaultFromZod(finalSchema);
        if (inferredClientDefault !== undefined) {
          actualValue = inferredClientDefault;
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
        clientInputZod: finalSchema,
        validationZod: clientAndServerSchema,
        completedStages: newCompletedStages,
      }) as any;
    },

    clientCheck: <TClientNext extends z.ZodTypeAny>(
      assert:
        | ((tools: {
            sql: TSql;
            client: TClient;
            clientCheck: z.ZodUnion<[TSql, TClient]>;
          }) => TClientNext)
        | TClientNext,
    ) => {
      if (completedStages.has("server")) {
        throw new Error("client() must be called before server()");
      }

      const clientSchema = isFunction(assert)
        ? assert({
            sql: config.sqlZod,
            client: config.clientInputZod || config.clientZod,
            clientCheck: config.clientZod as unknown as z.ZodUnion<[TSql, TClient]>,
          })
        : assert;

      const newCompletedStages = new Set(completedStages);
      newCompletedStages.add("client");

      const newConfig: Parameters<typeof createBuilder>[0] = {
        ...config,
        stage: "client" as const,
        clientZod: clientSchema as TClientNext,
        validationZod: clientSchema as TClientNext,
        completedStages: newCompletedStages,
      };
      if (config.clientInputZod !== undefined) {
        newConfig.clientInputZod = config.clientInputZod;
      }

      return createBuilder(newConfig as any) as any;
    },

    server: <TValidationNext extends z.ZodTypeAny>(
      assert:
        | ((tools: {
            sql: TSql;
            client: TClient;
            clientCheck: z.ZodUnion<[TSql, TClient]>;
          }) => TValidationNext)
        | TValidationNext,
    ) => {
      if (completedStages.has("server")) {
        throw new Error("server() can only be called once in the chain");
      }

      const serverSchema = isFunction(assert)
        ? assert({
            sql: config.sqlZod,
            client: config.clientInputZod || config.clientZod,
            clientCheck: config.clientZod as unknown as z.ZodUnion<[TSql, TClient]>,
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
      if (
        !completedStages.has("server") &&
        !completedStages.has("client")
      ) {
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

export type RefinementError = { path: string[]; message: string };
type RefineLayer = "client" | "clientCheck" | "server" | "sql" | "all";
type RefineEntry = {
  layers: RefineLayer[];
  deps: string[] | null;
  check: (row: any) => RefinementError | RefinementError[] | undefined | null;
};
type RefineHelper<T extends ShapeSchema> = {
  (layer: "clientCheck", check: (row: InferClientCheckedRow<T>) => RefinementError | RefinementError[] | undefined | null, deps?: string | string[]): RefineEntry;
  (layer: "client", check: (row: InferClientRow<T>) => RefinementError | RefinementError[] | undefined | null, deps?: string | string[]): RefineEntry;
  (layer: "server", check: (row: InferValidationRow<T>) => RefinementError | RefinementError[] | undefined | null, deps?: string | string[]): RefineEntry;
  (layer: "sql", check: (row: InferSqlRow<T>) => RefinementError | RefinementError[] | undefined | null, deps?: string | string[]): RefineEntry;
  (layer: "all", check: (row: InferClientRow<T>) => RefinementError | RefinementError[] | undefined | null, deps?: string | string[]): RefineEntry;
  (layer: RefineLayer[], check: (row: InferClientRow<T>) => RefinementError | RefinementError[] | undefined | null, deps?: string | string[]): RefineEntry;
};

type PickPrimaryKeys<T extends ShapeSchema> = {
  [K in keyof T as T[K] extends { config: { sql: { pk: true } } }
    ? K
    : never]: T[K];
};

type PickClientOnlyKeys<T extends ShapeSchema> = {
  [K in keyof T]: T[K] extends { config: { sql: null } } ? K : never;
}[keyof T];

type PickDbFieldKeys<T extends ShapeSchema> = {
  [K in keyof T]: T[K] extends { config: { sql: infer TSql } }
    ? TSql extends null
      ? never
      : TSql extends {
            type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
          }
        ? never
        : K
    : never;
}[keyof T];

// Extracting the row type makes the derive signature much cleaner
type InferClientCheckedRow<T extends ShapeSchema> = Prettify<
  z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientCheckedSchema">>>>
>;
type InferClientRow<T extends ShapeSchema> = Prettify<
  z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientSchema">>>>
>;
type InferValidationRow<T extends ShapeSchema> = Prettify<
  z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodValidationSchema">>>>
>;
type InferSqlRow<T extends ShapeSchema> = Prettify<
  z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodSqlSchema">>>>
>;

type SchemaBuilder<T extends ShapeSchema> = Prettify<EnrichFields<T>> & {
  __primaryKeySQL?: string;
  __derives?: {
    forClient?: Record<string, (row: any) => any>;
    forDb?: Record<string, (row: any) => any>;
  };
  __refines?: RefineEntry[];

  primaryKeySQL: (
    definer: (pkFields: PickPrimaryKeys<T>) => string,
  ) => SchemaBuilder<T>;

  // Notice: no <DClient, DDb> generics here. Just direct mapped types!
  derive: (derivers: {
    forClient?: {
      [K in PickClientOnlyKeys<T>]?: (row: InferClientRow<T>) => any;
    };
    forDb?: {
      [K in PickDbFieldKeys<T>]?: (row: InferClientRow<T>) => any;
    };
  }) => SchemaBuilder<T>;

  refine: (fn: (r: RefineHelper<T>) => RefineEntry[]) => SchemaBuilder<T>;
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
  enrichedSchema.__derives = undefined;
  enrichedSchema.__refines = undefined;

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

  enrichedSchema.derive = function (derivers: any): SchemaBuilder<U> {
    enrichedSchema.__derives = derivers;
    return enrichedSchema;
  };

  enrichedSchema.refine = function (fn: any): SchemaBuilder<U> {
    const r = (layers: any, check: any, deps?: any): RefineEntry => {
      const layerArr = Array.isArray(layers) ? layers : [layers];
      return {
        layers: layerArr,
        deps: deps ? (Array.isArray(deps) ? deps : [deps]) : null,
        check,
      };
    };
    enrichedSchema.__refines = fn(r);
    return enrichedSchema;
  };

  return enrichedSchema as SchemaBuilder<U>;
}

export type RelationType = "hasMany" | "hasOne" | "manyToMany";

type BaseSchemaField<T extends SQLType = SQLType> = {
  type: "field";
  sql: T;
  zodDbSchema: z.ZodType<any>;
  zodClientCheckedSchema: z.ZodType<any>;
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
type ValidShapeField =
  | ReturnType<typeof s.sqlite>
  | ReturnType<typeof s.postgres>
  | ReturnType<typeof s.mysql>;

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
    if (sqlTypeConfig.nullable) {
      return null;
    }
  }

  if (zodType instanceof z.ZodDefault) {
    const def = zodType._def as { defaultValue?: (() => unknown) | unknown };
    const val = def.defaultValue;
    if (val !== undefined) {
      return typeof val === "function" ? (val as () => unknown)() : val;
    }
  }

  if (zodType instanceof z.ZodNullable) {
    return null;
  }

  if (zodType instanceof z.ZodOptional) {
    return undefined;
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

  if (zodType instanceof z.ZodDate) {
    return new Date();
  }

  if (zodType instanceof z.ZodEnum) {
    return zodType.options[0];
  }

  if (zodType instanceof z.ZodLiteral) {
    return zodType.value;
  }

  if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
    const sqlTypeConfig = sqlConfig as SQLType;
    if (sqlTypeConfig.type && !sqlTypeConfig.nullable) {
      switch (sqlTypeConfig.type) {
        case "varchar":
        case "text":
        case "char":
        case "longtext":
          return "";
        case "enum":
          return sqlTypeConfig.default ?? sqlTypeConfig.values[0];
case "int":
          return 0;
        case "real":
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
    deriveDependencies: Record<string, string[]>;
    refineInfo: { groups: RefineEntry[]; fieldToGroup: Record<string, number[]> };
    isClientRecord: (record: any) => boolean;
  sqlSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>
  >;
  clientSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>
  >;
  clientCheckedSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodClientCheckedSchema">>
  >;
  serverSchema: z.ZodObject<
    Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
  >;
  validators: {
    sql: z.ZodTypeAny;
    client: z.ZodTypeAny;
    clientChecked: z.ZodTypeAny;
    server: z.ZodTypeAny;
  };
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
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientCheckedSchema">>>
  >;
  toDb: (
    clientObject: Partial<
      z.infer<
        z.ZodObject<
          Prettify<DeriveSchemaByKey<TActualSchema, "zodClientCheckedSchema">>
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
  parsePatchForDb: (
    patchData: Partial<
      z.input<
        z.ZodObject<
          Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
        >
      >
    >,
  ) => Partial<
    z.infer<
      z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
    >
  >;

  parseFromDb: (
    dbData: Partial<
      z.infer<
        z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>
      >
    >,
  ) => z.infer<
    z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientCheckedSchema">>>
  >;
} {
  const sqlFields: any = {};
  const clientFields: any = {};
  const clientCheckedFields: any = {};
  const serverFields: any = {};
  const defaultValues: any = {};
  const defaultGenerators: any = {};
  const fieldTransforms: Record<
    string,
    { toClient: (val: any) => any; toDb: (val: any) => any }
  > = {};

  const clientToDbKeys: Record<string, string> = {};
  const dbToClientKeys: Record<string, string> = {};
  const sqlOnlyDbKeys = new Set<string>();

  const fullSchema = { ...schema, ...(relations || {}) };
  let pkKeys: string[] | null = [];
  let clientPkKeys: string[] | null = [];
  const derives = (schema as any).__derives as
    | {
        forClient?: Record<string, (row: any) => any>;
        forDb?: Record<string, (row: any) => any>;
      }
    | undefined;
  const refineGroups = (schema as any).__refines as RefineEntry[] | undefined;

  for (const key in fullSchema) {
    const value = (fullSchema as any)[key];
    if (
      key === "_tableName" ||
      key.startsWith("__") ||
      key === "derive" ||
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
        sqlFields[dbFieldName] = config.zodSqlSchema;

        if (config.sql?.sqlOnly) {
          sqlOnlyDbKeys.add(dbFieldName);
        } else {
          clientToDbKeys[key] = dbFieldName;
          dbToClientKeys[dbFieldName] = key;
          clientFields[key] = config.zodClientSchema;
          clientCheckedFields[key] = config.zodClientCheckedSchema;
          serverFields[key] = config.zodValidationSchema;

          const initialValueOrFn = config.initialValue;
          defaultGenerators[key] = initialValueOrFn;
          defaultValues[key] = isFunction(initialValueOrFn)
            ? initialValueOrFn({ uuid })
            : initialValueOrFn;

          if (config.transforms) {
            fieldTransforms[key] = config.transforms;
          }
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
      } else if (sqlConfig) {
        const dbFieldName = sqlConfig.field || key;
        sqlFields[dbFieldName] = config.zodSqlSchema;

        if (sqlConfig.sqlOnly) {
          sqlOnlyDbKeys.add(dbFieldName);
        } else {
          clientToDbKeys[key] = dbFieldName;
          dbToClientKeys[dbFieldName] = key;
          clientFields[key] = config.zodClientSchema;
          clientCheckedFields[key] = config.zodClientCheckedSchema;
          serverFields[key] = config.zodValidationSchema;

          if (config.transforms) {
            fieldTransforms[key] = config.transforms;
          }

          const initialValueOrFn = config.initialValue;
          defaultGenerators[key] = initialValueOrFn;
          defaultValues[key] = isFunction(initialValueOrFn)
            ? initialValueOrFn({ uuid })
            : initialValueOrFn;
        }
      } else {
        clientFields[key] = config.zodClientSchema;
        clientCheckedFields[key] = config.zodClientCheckedSchema;
        serverFields[key] = config.zodValidationSchema;

        if (config.transforms) {
          fieldTransforms[key] = config.transforms;
        }

        const initialValueOrFn = config.initialValue;
        defaultGenerators[key] = initialValueOrFn;
        defaultValues[key] = isFunction(initialValueOrFn)
          ? initialValueOrFn({ uuid })
          : initialValueOrFn;
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
      freshDefaults[key] = isFunction(generatorOrValue)
        ? generatorOrValue({ uuid })
        : generatorOrValue;
    }

    // Only apply client derivations
    if (derives?.forClient) {
      for (const key in derives.forClient) {
        freshDefaults[key] = derives.forClient[key]?.(freshDefaults);
      }
    }

    return freshDefaults;
  };

  const toClient = (dbObject: any) => {
    const clientObject: any = {};
    for (const dbKey in dbObject) {
      if (dbObject[dbKey] === undefined) continue;
      if (sqlOnlyDbKeys.has(dbKey)) continue;

      const clientKey = dbToClientKeys[dbKey] || dbKey;
      const transform = fieldTransforms[clientKey]?.toClient;

      clientObject[clientKey] = transform
        ? transform(dbObject[dbKey])
        : dbObject[dbKey];
    }

    // Only apply Client derives AFTER mapping standard fields
    if (derives?.forClient) {
      for (const key in derives.forClient) {
        clientObject[key] = derives.forClient[key]?.(clientObject);
      }
    }

    return clientObject;
  };

  const toDb = (clientObject: any) => {
    const dbObject: any = {};

    // 1. Map standard client fields to DB fields
    for (const clientKey in clientObject) {
      if (clientObject[clientKey] === undefined) continue;

      const dbKey = clientToDbKeys[clientKey];
      if (!dbKey) continue;

      const transform = fieldTransforms[clientKey]?.toDb;

      dbObject[dbKey] = transform
        ? transform(clientObject[clientKey])
        : clientObject[clientKey];
    }

    // 2. Map Database ONLY derives directly to the dbObject
    if (derives?.forDb) {
      for (const schemaKey in derives.forDb) {
        // Resolve custom DB column name if they used s.sqlite({ field: "custom_name" })
        const sqlConfig = (fullSchema as any)[schemaKey]?.config?.sql;
        const dbKey = sqlConfig?.field || schemaKey;

        dbObject[dbKey] = derives.forDb[schemaKey]?.(clientObject);
      }
    }

    return dbObject;
  };
  const finalSqlSchema = z.object(sqlFields) as any;
  const finalClientSchema = z.object(clientFields) as any;
  const finalClientCheckedSchema = z.object(clientCheckedFields) as any;
  const finalValidationSchema = z.object(serverFields) as any;
  const deriveDependencies: Record<string, string[]> = {};
  const trackDeriveDependencies = (
    deriveGroup: Record<string, (row: any) => any> | undefined,
  ) => {
    if (!deriveGroup) return;

    const trackingSeed = { ...defaultValues };
    for (const key in deriveGroup) {
      const accessed = new Set<string>();
      const trackingRow = new Proxy(trackingSeed, {
        get(target, prop, receiver) {
          if (typeof prop === "string" && prop !== key) {
            accessed.add(prop);
          }
          return Reflect.get(target, prop, receiver);
        },
      });

      try {
        deriveGroup[key]?.(trackingRow);
      } catch (e) {}

      deriveDependencies[key] = Array.from(
        new Set([...(deriveDependencies[key] ?? []), ...accessed]),
      );
    }
  };

  trackDeriveDependencies(derives?.forClient);
  trackDeriveDependencies(derives?.forDb);

  let refinedSqlSchema = finalSqlSchema;
  let refinedClientSchema = finalClientSchema;
  let refinedClientCheckedSchema = finalClientCheckedSchema;
  let refinedValidationSchema = finalValidationSchema;
  const fieldToGroup: Record<string, number[]> = {};

  if (refineGroups) {
    for (let i = 0; i < refineGroups.length; i++) {
      const entry = refineGroups[i]!;
      let { layers, deps, check } = entry;

      const applyTo = layers.includes("all")
        ? (["sql", "client", "clientCheck", "server"] as const)
        : layers;

      // Track deps from proxy if not provided explicitly
      if (!deps) {
        const accessed = new Set<string>();
        const trackingRow = new Proxy(defaultValues, {
          get(target, prop, receiver) {
            if (typeof prop === "string") accessed.add(prop);
            return Reflect.get(target, prop, receiver);
          },
        });
        try { check(trackingRow); } catch (e) {}
        deps = Array.from(accessed);
        entry.deps = deps;
      }

      for (const dep of deps) {
        if (!fieldToGroup[dep]) fieldToGroup[dep] = [];
        fieldToGroup[dep].push(i);
      }

      const refineFn = (data: any, ctx: any) => {
        const result = check(data);
        if (!result) return;
        const errors = Array.isArray(result) ? result : [result];
        for (const err of errors) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: err.message,
            path: err.path,
          });
        }
      };

      for (const layer of applyTo) {
        switch (layer) {
          case "sql":
            refinedSqlSchema = refinedSqlSchema.superRefine(refineFn) as any;
            break;
          case "client":
            refinedClientSchema = refinedClientSchema.superRefine(refineFn) as any;
            break;
          case "clientCheck":
            refinedClientCheckedSchema = refinedClientCheckedSchema.superRefine(refineFn) as any;
            break;
          case "server":
            refinedValidationSchema = refinedValidationSchema.superRefine(refineFn) as any;
            break;
        }
      }
    }
  }

  return {
    pk: pkKeys.length ? pkKeys : null,
    clientPk: clientPkKeys.length ? clientPkKeys : null,
    deriveDependencies,
    refineInfo: { groups: refineGroups ?? [], fieldToGroup },
    isClientRecord,
    sqlSchema: finalSqlSchema,
    clientSchema: finalClientSchema,
    clientCheckedSchema: finalClientCheckedSchema,
    serverSchema: finalValidationSchema,
    validators: {
      sql: refinedSqlSchema,
      client: refinedClientSchema,
      clientChecked: refinedClientCheckedSchema,
      server: refinedValidationSchema,
    },
    defaultValues: defaultValues as any,
    stateType: {} as any,
    generateDefaults,
    toClient,
    toDb,
    parseForDb: (appData) => {
      const validData = refinedValidationSchema.parse(appData);
      return toDb(validData);
    },
    parsePatchForDb: (patchData) => {
      const validPatch = finalValidationSchema.partial().parse(patchData);
      return toDb(validPatch) as any;
    },

    parseFromDb: (dbData) => {
      const parsed = refinedSqlSchema.parse(dbData);
      return toClient(parsed);
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
      clientCheckedSchema: z.ZodObject<
        Prettify<
          DeriveSchemaByKey<
            ResolveSchema<
              S[K],
              K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}
            >,
            "zodClientCheckedSchema"
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
      validators: {
        sql: z.ZodTypeAny;
        client: z.ZodTypeAny;
        clientChecked: z.ZodTypeAny;
        server: z.ZodTypeAny;
      };
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
      parsePatchForDb: (patchData: any) => any;
      parseFromDb: (dbData: any) => any;
    };
    pk: string[] | null;
    clientPk: string[] | null;
    refineInfo: { groups: RefineEntry[]; fieldToGroup: Record<string, number[]> };
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
    schemaType: "client" | "clientChecked" | "server" | "sql",
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
        allTablesSupportsReconciliation = false;
      }
    }

    const baseSchema =
      schemaType === "clientChecked"
        ? registryEntry.zodSchemas.clientCheckedSchema
        : schemaType === "server"
          ? registryEntry.zodSchemas.serverSchema
          : schemaType === "sql"
            ? registryEntry.zodSchemas.sqlSchema
            : registryEntry.zodSchemas.clientSchema;
    const primitiveShape = baseSchema.shape;

    if (subSelection === true) {
      return baseSchema as z.ZodObject<any>;
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
    sql: buildView(initialRegistryKey, selection, "sql"),
    client: buildView(initialRegistryKey, selection, "client"),
    clientChecked: buildView(initialRegistryKey, selection, "clientChecked"),
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
  TKey extends "clientSchema" | "clientCheckedSchema" | "serverSchema" | "sqlSchema",
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
  TKey extends "clientSchema" | "clientCheckedSchema" | "serverSchema" | "sqlSchema",
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

export type DeriveViewDefaultsDefinition<
  TTableName extends keyof TRegistry,
  TSelection,
  TRegistry extends RegistryShape,
  Depth extends any[] = [],
> = Depth["length"] extends 10
  ? any
  : Prettify<
      TRegistry[TTableName]["zodSchemas"]["defaultValues"] & {
        [K in keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<
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
              ? K extends keyof TSelection
                ? TSelection[K] extends true
                  ? RelType extends "hasMany" | "manyToMany"
                    ? TRegistry[TargetKey]["zodSchemas"]["defaultValues"][]
                    : TRegistry[TargetKey]["zodSchemas"]["defaultValues"] | null
                  : TSelection[K] extends false | undefined
                    ? RelType extends "hasMany" | "manyToMany"
                      ? TRegistry[TargetKey]["zodSchemas"]["defaultValues"][]
                      :
                          | TRegistry[TargetKey]["zodSchemas"]["defaultValues"]
                          | null
                    : RelType extends "hasMany" | "manyToMany"
                      ? DeriveViewDefaultsDefinition<
                          TargetKey,
                          TSelection[K],
                          TRegistry,
                          [...Depth, 1]
                        >[]
                      : DeriveViewDefaultsDefinition<
                          TargetKey,
                          TSelection[K],
                          TRegistry,
                          [...Depth, 1]
                        > | null
                : RelType extends "hasMany" | "manyToMany"
                  ? TRegistry[TargetKey]["zodSchemas"]["defaultValues"][]
                  : TRegistry[TargetKey]["zodSchemas"]["defaultValues"] | null
              : never
            : never
          : never;
      } & {
        [K in keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<
          TRegistry[TTableName]["rawSchema"][K]
        > extends true
          ? `__def__${K & string}`
          : never]: TRegistry[TTableName]["rawSchema"][K] extends {
          config: { sql: { type: any; schema: any } };
        }
          ? GetRelationRegistryKey<
              TRegistry[TTableName]["rawSchema"][K],
              TRegistry
            > extends infer TargetKey
            ? TargetKey extends keyof TRegistry
              ? K extends keyof TSelection
                ? TSelection[K] extends true
                  ? TRegistry[TargetKey]["zodSchemas"]["defaultValues"]
                  : TSelection[K] extends false | undefined
                    ? TRegistry[TargetKey]["zodSchemas"]["defaultValues"]
                    : DeriveViewDefaultsDefinition<
                        TargetKey,
                        TSelection[K],
                        TRegistry,
                        [...Depth, 1]
                      >
                : TRegistry[TargetKey]["zodSchemas"]["defaultValues"]
              : never
            : never
          : never;
      }
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
    clientChecked: z.ZodObject<
      _DeriveViewShape<TTableName, TSelection, TRegistry, "clientCheckedSchema">
    >;
    server: z.ZodObject<
      _DeriveViewShape<TTableName, TSelection, TRegistry, "serverSchema">
    >;
  };
  validators: {
    sql: TRegistry[TTableName]["zodSchemas"]["validators"]["sql"];
    client: TRegistry[TTableName]["zodSchemas"]["validators"]["client"];
    clientChecked: TRegistry[TTableName]["zodSchemas"]["validators"]["clientChecked"];
    server: TRegistry[TTableName]["zodSchemas"]["validators"]["server"];
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
    parsePatchForDb: (
      patchData: Partial<
        z.input<
          z.ZodObject<
            _DeriveViewShape<TTableName, TSelection, TRegistry, "serverSchema">
          >
        >
      >,
    ) => Partial<
      z.infer<
        z.ZodObject<
          _DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">
        >
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

  reconcile: (
    clientData:
      | z.infer<
          z.ZodObject<
            _DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">
          >
        >
      | z.infer<
          z.ZodObject<
            _DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">
          >
        >[],
  ) => {
    withServer: (
      serverData:
        | DeepPartial<
            z.infer<
              z.ZodObject<
                _DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">
              >
            >
          >
        | DeepPartial<
            z.infer<
              z.ZodObject<
                _DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">
              >
            >
          >[],
    ) =>
      | z.infer<
          z.ZodObject<
            _DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">
          >
        >
      | z.infer<
          z.ZodObject<
            _DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">
          >
        >[];
  };

  defaults: () => DeriveViewDefaults<TTableName, TSelection, TRegistry>;
  defaultsDefinition: () => DeriveViewDefaultsDefinition<
    TTableName,
    TSelection,
    TRegistry
  >;

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
      clientCheckedSchema: z.ZodObject<any>;
      serverSchema: z.ZodObject<any>;
      validators: {
        sql: z.ZodTypeAny;
        client: z.ZodTypeAny;
        clientChecked: z.ZodTypeAny;
        server: z.ZodTypeAny;
      };
      defaultValues: any;
      stateType: any;
      deriveDependencies: Record<string, string[]>;
      refineInfo: { groups: RefineEntry[]; fieldToGroup: Record<string, number[]> };
    };
    transforms: {
      toClient: (dbObject: any) => any;
      toDb: (clientObject: any) => any;
      parseForDb: (appData: any) => any;
      parsePatchForDb: (patchData: any) => any;
      parseFromDb: (dbData: any) => any;
    };
    pk: string[] | null;
    clientPk: string[] | null;
    deriveDependencies: Record<string, string[]>;
    refineInfo: { groups: RefineEntry[]; fieldToGroup: Record<string, number[]> };
    isClientRecord: (record: any) => boolean;
    generateDefaults: () => any;
  }
>;

type CreateSchemaBoxReturn<
  S extends Record<string, SchemaWithPlaceholders>,
  R extends ResolutionMap<S>,
  Resolved extends Record<string, any> = ResolvedRegistryWithSchemas<S, R>,
> = {
  [K in keyof Resolved]: {
    definition: Resolved[K]["rawSchema"];
    schemaKey: K;
    schemas: {
      sql: Resolved[K]["zodSchemas"]["sqlSchema"];
      client: Resolved[K]["zodSchemas"]["clientSchema"];
      clientChecked: Resolved[K]["zodSchemas"]["clientCheckedSchema"];
      server: Resolved[K]["zodSchemas"]["serverSchema"];
    };

    validators: {
      sql: Resolved[K]["zodSchemas"]["validators"]["sql"];
      client: Resolved[K]["zodSchemas"]["validators"]["client"];
      clientChecked: Resolved[K]["zodSchemas"]["validators"]["clientChecked"];
      server: Resolved[K]["zodSchemas"]["validators"]["server"];
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

      parsePatchForDb: (
        patchData: Partial<z.input<Resolved[K]["zodSchemas"]["serverSchema"]>>,
      ) => Partial<z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>>;

      parseFromDb: (
        dbData: Partial<z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>>,
      ) => z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>;
    };

    defaults: Resolved[K]["zodSchemas"]["defaultValues"];
    defaultsDefinition: DeriveViewDefaultsDefinition<K & string, {}, Resolved>;
    stateType: Resolved[K]["zodSchemas"]["stateType"];
    generateDefaults: () => Resolved[K]["zodSchemas"]["defaultValues"];

    pk: string[] | null;
    clientPk: string[] | null;
    deriveDependencies: Record<string, string[]>;
    refineInfo: { groups: RefineEntry[]; fieldToGroup: Record<string, number[]> };
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
            sql: {
              ...targetField.config.sql,
              field: fieldName,
              isForeignKey: true,
            },
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
        parsePatchForDb: zodSchemas.parsePatchForDb,
        parseFromDb: zodSchemas.parseFromDb,
      },
      pk: zodSchemas.pk,
      clientPk: zodSchemas.clientPk,
      deriveDependencies: zodSchemas.deriveDependencies,
      refineInfo: zodSchemas.refineInfo,
      isClientRecord: zodSchemas.isClientRecord,
      generateDefaults: zodSchemas.generateDefaults,
    };
  }

  const cleanerRegistry: any = {};
  const tableNameToRegistryKeyMap: Record<string, string> = {};
  for (const key in finalRegistry) {
    const tableName = finalRegistry[key].rawSchema._tableName;
    tableNameToRegistryKeyMap[tableName] = key;
  }

  for (const tableName in finalRegistry) {
    const entry = finalRegistry[tableName];
    const rawSchema = entry.rawSchema;
    const tableDef: any = { ...entry.generateDefaults() };

    for (const key in rawSchema) {
      if (key === "_tableName" || key.startsWith("__")) continue;

      const field = rawSchema[key];
      if (!field?.config?.sql) continue;

      const sqlConfig = field.config.sql;

      if (sqlConfig.schema) {
        const targetTableName = sqlConfig.schema()._tableName;
        const targetRegKey = tableNameToRegistryKeyMap[targetTableName];

        if (targetRegKey && finalRegistry[targetRegKey]) {
          const targetEntry = finalRegistry[targetRegKey];
          const targetDefaults = targetEntry.generateDefaults();

          if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
            const count = (sqlConfig as any)?.defaultCount || 1;
            tableDef[key] = Array.from({ length: count }, () => targetDefaults);
            tableDef[`__def__${key}`] = targetDefaults;
          } else {
            tableDef[key] =
              sqlConfig.defaultConfig === null ? null : targetDefaults;
            tableDef[`__def__${key}`] = targetDefaults;
          }
        }
      }
    }

    entry.zodSchemas.defaultsDefinition = tableDef;
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

  for (const tableName in finalRegistry) {
    const entry = finalRegistry[tableName];

    cleanerRegistry[tableName] = {
      definition: entry.rawSchema,
      schemaKey: tableName,

      schemas: {
        sql: entry.zodSchemas.sqlSchema,
        client: entry.zodSchemas.clientSchema,
        clientChecked: entry.zodSchemas.clientCheckedSchema,
        server: entry.zodSchemas.serverSchema,
      },

      validators: {
        sql: entry.zodSchemas.validators.sql,
        client: entry.zodSchemas.validators.client,
        clientChecked: entry.zodSchemas.validators.clientChecked,
        server: entry.zodSchemas.validators.server,
      },

      transforms: {
        toClient: entry.transforms.toClient,
        toDb: entry.transforms.toDb,
        parseForDb: entry.transforms.parseForDb,
        parsePatchForDb: entry.transforms.parsePatchForDb,
        parseFromDb: entry.transforms.parseFromDb,
      },

      defaults: entry.generateDefaults(),
      defaultsDefinition: entry.zodSchemas.defaultsDefinition,
      stateType: entry.zodSchemas.stateType,
      generateDefaults: entry.generateDefaults,

      pk: entry.pk,
      clientPk: entry.clientPk,
      deriveDependencies: entry.deriveDependencies,
      refineInfo: entry.refineInfo,
      isClientRecord: entry.isClientRecord,

      nav: createNavProxy(tableName, finalRegistry),

      createView: (selection: any) => {
        const view = createViewObject(
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

          if (regEntry.rawSchema.__derives?.forClient) {
            for (const key in regEntry.rawSchema.__derives.forClient) {
              baseMapped[key] =
                regEntry.rawSchema.__derives.forClient[key](baseMapped);
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

        const reconcile = (clientData: any) => {
          return {
            withServer: (serverData: any) => {
              const parsedServerData = viewToClient(serverData);

              const mergeTrees = (
                cNode: any,
                sNode: any,
                tableKey: string,
                sel: any,
              ): any => {
                if (sNode === undefined || sNode === null) return cNode;
                if (cNode === undefined || cNode === null) return sNode;

                const regEntry = finalRegistry[tableKey];
                const clientPkField =
                  regEntry.clientPk?.[0] || regEntry.pk?.[0];
                const dbPkField = regEntry.pk?.[0] || clientPkField;

                if (Array.isArray(cNode)) {
                  if (!Array.isArray(sNode)) return cNode;

                  return cNode.map((cItem, index) => {
                    let sItem = undefined;

                    if (clientPkField && cItem[clientPkField] !== undefined) {
                      sItem = sNode.find(
                        (s: any) => s[clientPkField] === cItem[clientPkField],
                      );
                    }

                    if (!sItem && dbPkField && cItem[dbPkField] !== undefined) {
                      sItem = sNode.find(
                        (s: any) => s[dbPkField] === cItem[dbPkField],
                      );
                    }

                    if (!sItem && sNode[index]) {
                      sItem = sNode[index];
                    }

                    return mergeTrees(cItem, sItem, tableKey, sel);
                  });
                }

                if (typeof cNode === "object" && typeof sNode === "object") {
                  const merged = { ...cNode };

                  for (const key in sNode) {
                    const selValue =
                      typeof sel === "object" ? sel[key] : undefined;
                    const relField = regEntry.rawSchema[key];
                    const isRelation = !!(
                      selValue && relField?.config?.sql?.schema
                    );

                    if (isRelation) {
                      const nextTableKey =
                        tableNameToRegistryKeyMap[
                          relField.config.sql.schema()._tableName
                        ];
                      merged[key] = mergeTrees(
                        cNode[key],
                        sNode[key],
                        nextTableKey!,
                        selValue,
                      );
                    } else {
                      merged[key] = sNode[key];
                    }
                  }

                  if (
                    clientPkField &&
                    dbPkField &&
                    clientPkField !== dbPkField &&
                    merged[dbPkField] !== undefined &&
                    merged[dbPkField] !== null
                  ) {
                    delete merged[clientPkField];
                  }

                  return merged;
                }

                return sNode !== undefined ? sNode : cNode;
              };

              return mergeTrees(
                clientData,
                parsedServerData,
                tableName,
                selection,
              );
            },
          };
        };

        return {
          definition: entry.rawSchema,
          schemaKey: tableName,
          schemas: {
            sql: view.sql,
            client: view.client,
            clientChecked: view.clientChecked,
            server: view.server,
          },
          validators: {
            sql: view.sql,
            client: view.client,
            clientChecked: view.clientChecked,
            server: view.server,
          },
          transforms: {
            toClient: viewToClient,
            toDb: viewToDb,
            parseForDb: (appData: any) => {
              const validData = view.server.parse(appData);
              return viewToDb(validData);
            },
            parsePatchForDb: (patchData: any) => {
              const validPatch = view.server.partial().parse(patchData);
              return viewToDb(validPatch);
            },
            parseFromDb: (dbData: any) => {
              const mappedData = view.sql.parse(dbData);
              return viewToClient(mappedData);
            },
          },

          reconcile,

          defaults: () =>
            computeViewDefaults(
              tableName,
              selection,
              finalRegistry,
              tableNameToRegistryKeyMap,
            ),
          defaultsDefinition: () =>
            computeViewDefaultsDefinition(
              tableName,
              selection,
              finalRegistry,
              tableNameToRegistryKeyMap,
            ),
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
  const baseDefaults = entry.generateDefaults();

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

function computeViewDefaultsDefinition(
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
    return {};
  }

  const baseDef: any = { ...entry.generateDefaults() };

  for (const key in entry.rawSchema) {
    if (key === "_tableName" || key.startsWith("__")) continue;

    const field = entry.rawSchema[key];
    if (!field?.config?.sql) continue;

    const sqlConfig = field.config.sql;

    if (sqlConfig.schema) {
      const targetTableName = sqlConfig.schema()._tableName;
      const nextRegKey = tableNameToRegistryKeyMap[targetTableName];
      if (!nextRegKey) continue;

      const targetEntry = registry[nextRegKey];
      const targetDefaults = targetEntry.generateDefaults();

      if (sqlConfig.type === "hasMany" || sqlConfig.type === "manyToMany") {
        const count = (sqlConfig as any)?.defaultCount || 1;
        baseDef[key] = Array.from({ length: count }, () => targetDefaults);
        baseDef[`__def__${key}`] = targetDefaults;
      } else {
        baseDef[key] = sqlConfig.defaultConfig === null ? null : targetDefaults;
        baseDef[`__def__${key}`] = targetDefaults;
      }
    }
  }

  if (selection === true || typeof selection !== "object") {
    return baseDef;
  }

  const result: any = { ...baseDef };

  for (const key in selection) {
    if (!selection[key]) continue;

    const field = entry.rawSchema[key];
    if (!field?.config?.sql?.schema) continue;

    const relationConfig = field.config.sql;
    const targetTableName = relationConfig.schema()._tableName;
    const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
    if (!nextRegistryKey) continue;

    const nestedDef = computeViewDefaultsDefinition(
      nextRegistryKey,
      selection[key],
      registry,
      tableNameToRegistryKeyMap,
      new Set(visited),
    );

    if (nestedDef) {
      result[`__def__${key}`] = nestedDef;
      if (
        relationConfig.type === "hasMany" ||
        relationConfig.type === "manyToMany"
      ) {
        const count = (relationConfig as any)?.defaultCount || 1;
        result[key] = Array.from({ length: count }, () => nestedDef);
      } else {
        result[key] = relationConfig.defaultConfig === null ? null : nestedDef;
      }
    }
  }

  return result;
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
  Key extends
    | "zodSqlSchema"
    | "zodClientSchema"
    | "zodClientCheckedSchema"
    | "zodValidationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10
  ? any
  : {
      [K in keyof T as K extends
        | "_tableName"
        | typeof SchemaWrapperBrand
        | "__primaryKeySQL"
        | "primaryKeySQL"
        | "derive"
        | "__derives"
        | "refine"
        | "__refines"
        ? never
        : K extends keyof T
          ? T[K] extends { config: { sql: { sqlOnly: true } } }
            ? Key extends "zodSqlSchema"
              ? GetDbKey<K, T[K]>
              : never
            : T[K] extends Reference<any>
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
                : T[K] extends { config: { sql: null } }
                  ? Key extends "zodSqlSchema"
                    ? never
                    : K
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
          | "derive"
          | "__derives"
          | "refine"
          | "__refines"
          ? never
          : K extends keyof T
            ? T[K] extends { config: { sql: { sqlOnly: true } } }
              ? never
              : T[K] extends Reference<any>
                ? K
                : T[K] extends {
                      config: {
                        sql: {
                          type:
                            | "hasMany"
                            | "manyToMany"
                            | "hasOne"
                            | "belongsTo";
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
          | "derive"
          | "__derives"
          | "refine"
          | "__refines"
          ? never
          : K extends keyof T
            ? T[K] extends { config: { sql: { sqlOnly: true } } }
              ? never
              : T[K] extends Reference<any>
                ? K
                : T[K] extends {
                      config: {
                        sql: {
                          type:
                            | "hasMany"
                            | "manyToMany"
                            | "hasOne"
                            | "belongsTo";
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
