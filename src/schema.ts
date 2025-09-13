import { z } from "zod";

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

type DbConfig = SQLType | RelationConfig<any> | null;

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

type NonLiteral<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T;
type CollapsedUnion<
  A extends z.ZodTypeAny,
  B extends z.ZodTypeAny,
> = A extends B ? (B extends A ? A : z.ZodUnion<[A, B]>) : z.ZodUnion<[A, B]>;
export interface IBuilderMethods<
  T extends DbConfig,
  TSql extends z.ZodTypeAny,
  TNew extends z.ZodTypeAny,
  TInitialValue,
  TClient extends z.ZodTypeAny,
  TValidation extends z.ZodTypeAny,
> {
  initialState<const TValue>(options: {
    value: TValue | (() => TValue);
    schema?: never;
    clientPk?: boolean;
  }): Prettify<
    Builder<
      "new",
      T,
      TSql,
      ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
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

  // Overload 2: Only schema provided
  initialState<const TSchema extends z.ZodTypeAny>(options: {
    value?: never;
    schema: TSchema;
    clientPk?: boolean;
  }): Prettify<
    Builder<
      "new",
      T,
      TSql,
      TSchema,
      z.infer<TSchema>,
      CollapsedUnion<TSql, TSchema>,
      CollapsedUnion<TSql, TSchema>
    >
  >;

  // Overload 3: Both value and schema provided
  // THE FIX: Changed TInitialValue from literal value to z.infer<TSchema>
  initialState<const TValue, const TSchema extends z.ZodTypeAny>(options: {
    value: TValue | (() => TValue);
    schema:
      | TSchema
      | ((
          base: ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
        ) => TSchema);
    clientPk?: boolean;
  }): Prettify<
    Builder<
      "new",
      T,
      TSql,
      TSchema,
      z.infer<TSchema>, // <-- THIS IS THE FIX: Use schema's type, not literal value
      CollapsedUnion<TSql, TSchema>,
      CollapsedUnion<TSql, TSchema>
    >
  >;
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

  server: <TValidationNext extends z.ZodTypeAny>(
    schema:
      | ((tools: {
          sql: TSql;
          initialState: TNew;
          client: TClient;
        }) => TValidationNext)
      | TValidationNext
  ) => Prettify<
    Builder<"server", T, TSql, TNew, TInitialValue, TClient, TValidationNext>
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
type Stage = "sql" | "relation" | "new" | "client" | "server" | "done";

// Updated stage methods to include relation
type StageMethods = {
  sql: "initialState" | "client" | "server" | "transform" | "reference";
  relation: "server" | "transform";
  new: "client" | "server" | "transform";
  client: "server" | "transform";
  server: "transform";
  done: never;
};

// === UPDATED: Builder Config to Handle Relations ===
type BuilderConfig<
  T extends DbConfig,
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
  T extends DbConfig,
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

interface ShapeAPI {
  initialState: <const TValue>(value: TValue | (() => TValue)) => Builder<
    "new",
    null,
    z.ZodUndefined, // No SQL schema
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
    TValue extends () => infer R ? R : TValue,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>,
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>
  >;
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

export const s: ShapeAPI = {
  initialState: <const TValue>(value: TValue | (() => TValue)) => {
    const actualValue = isFunction(value) ? value() : value;

    // Infer the Zod type from the primitive value
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
      stage: "new",
      // THE MAGIC: There is no SQL config and the SQL schema is z.undefined()
      // This guarantees the field will be stripped from the final SQL schema object.
      sqlConfig: null,
      sqlZod: z.undefined(),

      // The rest of the schemas are based on the inferred type
      newZod: inferredZodType,
      initialValue: actualValue,
      clientZod: inferredZodType,
      validationZod: inferredZodType, // This is our internal name
    }) as any; // Using `as any` to simplify the complex return type
  },
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
  TStage extends "sql" | "relation" | "new" | "client" | "server",
  T extends DbConfig,
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
        inferDefaultFromZod(
          config.clientZod as z.ZodTypeAny,
          config.sqlConfig!
        ),
      zodClientSchema: config.clientZod,
      zodValidationSchema: config.validationZod,
      clientTransform: config.clientTransform, // <-- FIX: Make sure transform is passed through
      validationTransform: config.validationTransform, // <-- FIX: Make sure transform is passed through
    },
    initialState: (options: {
      value?: any;
      schema?: z.ZodTypeAny | ((base: z.ZodTypeAny) => z.ZodTypeAny);
      clientPk?: boolean;
    }) => {
      if (completedStages.has("new")) {
        throw new Error("initialState() can only be called once in the chain");
      }

      const { value, schema: schemaOrModifier, clientPk } = options;

      let actualValue: any;
      let finalSchema: z.ZodTypeAny;

      // 1. Determine the actual value
      if (value !== undefined) {
        actualValue = isFunction(value) ? value() : value;
      } else if (
        schemaOrModifier &&
        typeof schemaOrModifier === "object" &&
        "_def" in schemaOrModifier
      ) {
        // If only a schema is provided, infer the default from it
        actualValue = inferDefaultFromZod(schemaOrModifier, config.sqlConfig!);
      }

      // 2. Determine the final schema
      let baseSchema: z.ZodTypeAny;
      if (
        schemaOrModifier &&
        typeof schemaOrModifier === "object" &&
        "_def" in schemaOrModifier
      ) {
        // A raw Zod schema was passed
        finalSchema = schemaOrModifier;
      } else {
        // Base schema must be inferred from the value type
        if (typeof actualValue === "string") baseSchema = z.string();
        else if (typeof actualValue === "number") baseSchema = z.number();
        else if (typeof actualValue === "boolean") baseSchema = z.boolean();
        else if (actualValue instanceof Date) baseSchema = z.date();
        else if (actualValue === null) baseSchema = z.null();
        else baseSchema = z.any();

        if (isFunction(schemaOrModifier)) {
          // A modifier function was passed
          finalSchema = schemaOrModifier(baseSchema);
        } else {
          // No schema/modifier, use the inferred base schema
          finalSchema = baseSchema;
        }
      }

      const newCompletedStages = new Set(completedStages);
      newCompletedStages.add("new");

      // Create union of the SQL type and the new client type
      const clientAndServerSchema = z.union([config.sqlZod, finalSchema]);

      const newConfig = { ...config.sqlConfig };
      if (clientPk) {
        // Add our metadata flag to the config
        (newConfig as any).isClientPk = true;
      }

      return createBuilder({
        ...config,
        stage: "new",
        sqlConfig: newConfig as T,
        newZod: finalSchema,
        initialValue: actualValue,
        clientZod: clientAndServerSchema,
        validationZod: clientAndServerSchema, // Our internal name
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
      if (completedStages.has("server")) {
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

    server: <TValidationNext extends z.ZodTypeAny>(
      // ... this validation function remains unchanged ...
      assert:
        | ((tools: {
            sql: TSql;
            initialState: TNew;
            client: TClient;
          }) => TValidationNext)
        | TValidationNext
    ) => {
      if (completedStages.has("server")) {
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
      newCompletedStages.add("server");

      return createBuilder({
        ...config,
        stage: "server",
        validationZod: validationSchema,
        completedStages: newCompletedStages,
      });
    },

    transform: (transforms: {
      // ... this transform function remains unchanged ...
      toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
      toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
      if (!completedStages.has("server") && !completedStages.has("client")) {
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

// Helper type to filter the schema for PK fields
type PickPrimaryKeys<T extends ShapeSchema> = {
  [K in keyof T as T[K] extends { config: { sql: { pk: true } } }
    ? K
    : never]: T[K];
};
type SchemaBuilder<T extends ShapeSchema> = Prettify<EnrichFields<T>> & {
  __primaryKeySQL?: string;
  __isClientChecker?: (record: any) => boolean;

  primaryKeySQL: (
    definer: (pkFields: PickPrimaryKeys<T>) => string
  ) => SchemaBuilder<T>;
  isClient: (
    checker: (
      record: Prettify<
        | z.infer<z.ZodObject<DeriveSchemaByKey<T, "zodSqlSchema">>>
        | z.infer<z.ZodObject<DeriveSchemaByKey<T, "zodClientSchema">>>
      >
    ) => boolean
  ) => SchemaBuilder<T>;
};

export function schema<T extends string, U extends ShapeSchema<T>>(
  schema: U
): SchemaBuilder<U> {
  // Create the enriched schema with all fields
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

  // Add private properties
  enrichedSchema.__primaryKeySQL = undefined;
  enrichedSchema.__isClientChecker = undefined;

  // Add methods directly
  enrichedSchema.primaryKeySQL = function (
    definer: (pkFields: PickPrimaryKeys<U>) => string
  ): SchemaBuilder<U> {
    const pkFieldsOnly: any = {};

    // Find all PK fields
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
      pkFieldsOnly as PickPrimaryKeys<U>
    );
    return enrichedSchema;
  };

  enrichedSchema.isClient = function (
    checker: (record: any) => boolean
  ): SchemaBuilder<U> {
    enrichedSchema.__isClientChecker = checker;
    return enrichedSchema;
  };

  return enrichedSchema as SchemaBuilder<U>;
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
  zodType: z.ZodTypeAny,
  sqlConfig?: SQLType | RelationConfig<any>
): any {
  // --- START OF FIX ---
  // If the database is responsible for the default, the client shouldn't generate a value.
  if (
    sqlConfig &&
    "default" in sqlConfig &&
    sqlConfig.default === "CURRENT_TIMESTAMP"
  ) {
    return undefined;
  }
  // --- END OF FIX ---

  if (sqlConfig && typeof sqlConfig === "object" && "type" in sqlConfig) {
    if ("default" in sqlConfig && sqlConfig.default !== undefined) {
      // This part now runs only if default is not CURRENT_TIMESTAMP
      return sqlConfig.default;
    }

    if (
      typeof sqlConfig.type === "string" &&
      ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)
    ) {
      // ... (rest of the function is unchanged)
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
        case "timestamp": // Added timestamp here for completeness
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
  pk: string[] | null;
  clientPk: string[] | null;

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

  generateDefaults: () => Prettify<DeriveDefaults<TActualSchema>>;
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
  const serverFields: any = {};
  const defaultValues: any = {};
  const defaultGenerators: any = {};
  const fieldTransforms: Record<
    string,
    { toClient: (val: any) => any; toDb: (val: any) => any }
  > = {};

  const fullSchema = { ...schema, ...(relations || {}) };
  let pkKeys: string[] | null = [];
  let clientPkKeys: string[] | null = [];

  for (const key in fullSchema) {
    const value = (fullSchema as any)[key];
    if (
      key === "_tableName" ||
      key.startsWith("__") ||
      key === String(SchemaWrapperBrand) ||
      key === "isClient" ||
      key === "primaryKeySQL" ||
      typeof value === "function"
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
        serverFields[key] = config.zodValidationSchema;
        const initialValueOrFn = config.initialValue;
        defaultGenerators[key] = initialValueOrFn;
        defaultValues[key] = inferDefaultFromZod(config.zodClientSchema, {
          ...config.sql,
          default: undefined,
        });
        if (config.transforms) {
          fieldTransforms[key] = config.transforms;
        }
      }
      continue; // Skip the rest of the logic for references
    }

    // THEN, handle all other fields that have a config (builders, relations, etc.)
    if (definition && definition.config) {
      const config = definition.config;

      if (config.sql?.pk && !config.sql?.isForeignKey) {
        pkKeys.push(key);
      }
      if ((config.sql as any)?.isClientPk) {
        clientPkKeys.push(key);
      }

      // The rest of the logic for builders
      const sqlConfig = config.sql;
      if (
        sqlConfig &&
        typeof sqlConfig === "object" &&
        ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(
          sqlConfig.type
        )
      ) {
        // This is for relations, which also aren't PKs, so we just continue.
        continue;
      } else {
        // This is for regular s.sql() fields
        sqlFields[key] = config.zodSqlSchema;
        clientFields[key] = config.zodClientSchema;
        serverFields[key] = config.zodValidationSchema;
        if (config.transforms) {
          fieldTransforms[key] = config.transforms;
        }
        const initialValueOrFn = config.initialValue;
        defaultGenerators[key] = initialValueOrFn;
        defaultValues[key] = isFunction(initialValueOrFn)
          ? initialValueOrFn()
          : initialValueOrFn;
      }
    }
  }
  const generateDefaults = () => {
    const freshDefaults: any = {};
    for (const key in defaultGenerators) {
      const generatorOrValue = defaultGenerators[key];
      freshDefaults[key] = isFunction(generatorOrValue)
        ? generatorOrValue() // Call the function to get a fresh value
        : generatorOrValue; // Use the static value
    }
    return freshDefaults;
  };
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
    pk: pkKeys?.length ? pkKeys : null,
    clientPk: clientPkKeys ? clientPkKeys : null,

    sqlSchema: z.object(sqlFields) as z.ZodObject<
      Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>
    >,
    clientSchema: z.object(clientFields) as z.ZodObject<
      Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>
    >,
    validationSchema: z.object(serverFields) as z.ZodObject<
      Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>
    >,
    defaultValues: defaultValues as Prettify<DeriveDefaults<TActualSchema>>,

    generateDefaults,
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
type ResolveField<Field, Resolution> = Field extends PlaceholderReference
  ? Resolution // The resolved reference (like s.pets.id)
  : Field extends Reference<any> // ADD THIS
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
> = {
  [K in keyof Schema]: K extends keyof Resolutions
    ? ResolveField<Schema[K], Resolutions[K]>
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
      validationSchema: z.ZodObject<
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
      toClient: (dbObject: any) => any;
      toDb: (clientObject: any) => any;
    };
  };
};
function createViewObject(
  initialRegistryKey: string, // The key for the starting schema, e.g., "users"
  selection: Record<string, any>,
  registry: any,
  tableNameToRegistryKeyMap: Record<string, string> // The lookup map
) {
  /**
   * A recursive helper function that builds a Zod schema for a given schema and its selected relations.
   * It is defined inside createViewObject to have access to the `registry` and `tableNameToRegistryKeyMap` via a closure.
   *
   * @param currentRegistryKey - The user-defined key for the current schema being processed (e.g., "users", then "posts").
   * @param subSelection - The part of the selection object for the current schema (e.g., { comments: true } or just `true`).
   * @param schemaType - Whether to build the 'client' or 'validation' schema.
   * @returns A ZodObject representing the composed schema.
   */
  function buildView(
    currentRegistryKey: string,
    subSelection: Record<string, any> | boolean,
    schemaType: "client" | "server"
  ): z.ZodObject<any> {
    // 1. Find the current schema's definition in the registry using its KEY.
    const registryEntry = registry[currentRegistryKey];
    if (!registryEntry) {
      throw new Error(
        `Schema with key "${currentRegistryKey}" not found in the registry.`
      );
    }

    // 2. Get the base Zod schema (primitives and references only) for the current level.
    const baseSchema =
      schemaType === "server"
        ? registryEntry.zodSchemas.validationSchema
        : registryEntry.zodSchemas.clientSchema;
    const primitiveShape = baseSchema.shape;

    // 3. If the selection is just `true`, we are done at this level. Return the base primitive schema.
    if (subSelection === true) {
      return z.object(primitiveShape);
    }

    // 4. If the selection is an object, we need to process its relations.
    const selectedRelationShapes: Record<string, z.ZodTypeAny> = {};
    if (typeof subSelection === "object") {
      // Iterate over the keys in the selection object (e.g., "posts", "profile").
      for (const relationKey in subSelection) {
        // Check if this key corresponds to a valid relation in the raw schema definition.
        const relationBuilder = registryEntry.rawSchema[relationKey];
        const isRelation = relationBuilder?.config?.sql?.schema;

        if (subSelection[relationKey] && isRelation) {
          const relationConfig = relationBuilder.config.sql;

          // 5. KEY STEP: Get the internal `_tableName` of the TARGET schema (e.g., "post_table").
          const targetTableName = relationConfig.schema()._tableName;

          // 6. KEY STEP: Use the map to find the REGISTRY KEY for that target schema (e.g., "posts").
          const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
          if (!nextRegistryKey) {
            throw new Error(
              `Could not resolve registry key for table "${targetTableName}"`
            );
          }

          // 7. RECURSIVE CALL: Call `buildView` for the related schema, passing the
          //    CORRECT registry key and the sub-selection for that relation.
          const relationSchema = buildView(
            nextRegistryKey,
            subSelection[relationKey],
            schemaType
          );

          // 8. Wrap the resulting schema in an array or optional based on the relation type.
          if (["hasMany", "manyToMany"].includes(relationConfig.type)) {
            selectedRelationShapes[relationKey] = z.array(relationSchema);
          } else {
            selectedRelationShapes[relationKey] = relationSchema.optional();
          }
        }
      }
    }

    // 9. Combine the base primitive fields with the newly built relational schemas.
    const finalShape = { ...primitiveShape, ...selectedRelationShapes };
    return z.object(finalShape);
  }

  // The main function's return value. It kicks off the recursive process for both client and validation schemas.
  return {
    sql: registry[initialRegistryKey].zodSchemas.sqlSchema,
    client: buildView(initialRegistryKey, selection, "client"),
    server: buildView(initialRegistryKey, selection, "server"),
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

// Helper to omit relation fields. This was already correct but is included for completeness.
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
  TKey extends "clientSchema" | "validationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10
  ? any
  : TRegistry[TTableName]["zodSchemas"][TKey] extends z.ZodObject<
        infer BaseShape
      >
    ? TSelection extends Record<string, any>
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
                    : z.ZodOptional<
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
      : OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]>
    : never;

type DeriveViewDefaults<
  TTableName extends keyof TRegistry,
  TSelection,
  TRegistry extends RegistryShape,
  Depth extends any[] = [],
> = Prettify<
  TRegistry[TTableName]["zodSchemas"]["defaultValues"] &
    (TSelection extends Record<string, any>
      ? {
          -readonly [K in keyof TSelection &
            keyof TRegistry[TTableName]["rawSchema"]]?: TRegistry[TTableName]["rawSchema"][K] extends {
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
      _DeriveViewShape<TTableName, TSelection, TRegistry, "validationSchema">
    >;
  };
  transforms: {
    toClient: TRegistry[TTableName]["zodSchemas"]["toClient"];
    toDb: TRegistry[TTableName]["zodSchemas"]["toDb"];
  };
  defaults: DeriveViewDefaults<TTableName, TSelection, TRegistry>;
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
// Helper type to omit relation fields from a shape
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
    schemaKey: K;
    schemas: {
      sql: Resolved[K]["zodSchemas"]["sqlSchema"];
      client: Resolved[K]["zodSchemas"]["clientSchema"];
      server: Resolved[K]["zodSchemas"]["validationSchema"];
    };

    transforms: {
      toClient: Resolved[K]["zodSchemas"]["toClient"];
      toDb: Resolved[K]["zodSchemas"]["toDb"];
    };

    defaults: Resolved[K]["zodSchemas"]["defaultValues"];

    nav: NavigationProxy<K & string, Resolved>;
    RelationSelection: NavigationToSelection<
      NavigationProxy<K & string, Resolved>
    >;
    createView: <
      const TSelection extends NavigationToSelection<
        NavigationProxy<K & string, Resolved>
      >,
    >(
      selection: TSelection
    ) => DeriveViewResult<K & string, TSelection, Resolved>;
    __registry: Resolved;
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
  const resolvedSchemas = schemas;

  // STAGE 1: Resolve references
  for (const tableName in schemas) {
    for (const fieldName in schemas[tableName]) {
      const field = schemas[tableName][fieldName];
      if (isReference(field)) {
        const targetField = field.getter();
        if (targetField && targetField.config) {
          const newConfig = JSON.parse(JSON.stringify(targetField.config));
          newConfig.sql.isForeignKey = true; // Add the tag

          resolvedSchemas[tableName]![fieldName] = {
            ...targetField,
            config: newConfig,
          };
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
  const tableNameToRegistryKeyMap: Record<string, string> = {};
  for (const key in finalRegistry) {
    const tableName = finalRegistry[key].rawSchema._tableName;
    tableNameToRegistryKeyMap[tableName] = key;
  }

  for (const tableName in finalRegistry) {
    const entry = finalRegistry[tableName];

    cleanerRegistry[tableName] = {
      definition: entry.rawSchema,

      schemas: {
        sql: entry.zodSchemas.sqlSchema,
        client: entry.zodSchemas.clientSchema,
        server: entry.zodSchemas.validationSchema,
      },

      transforms: {
        toClient: entry.zodSchemas.toClient,
        toDb: entry.zodSchemas.toDb,
      },
      defaults: entry.zodSchemas.defaultValues,
      generateDefaults: entry.zodSchemas.generateDefaults,

      // ADD: Expose PK info and resolver
      pk: entry.zodSchemas.pk,
      clientPk: entry.zodSchemas.clientPk,

      nav: createNavProxy(tableName, finalRegistry),

      // Add this

      createView: (selection: any) => {
        const view = createViewObject(
          tableName,
          selection,
          finalRegistry,
          tableNameToRegistryKeyMap
        );
        const defaults = computeViewDefaults(
          tableName,
          selection,
          finalRegistry,
          tableNameToRegistryKeyMap
        );

        // Return the same shape as regular entries, but with isView marker
        return {
          definition: entry.rawSchema, // Could be enhanced with selection info
          schemaKey: tableName,
          schemas: {
            sql: view.sql,
            client: view.client,
            server: view.server,
          },
          transforms: {
            toClient: entry.zodSchemas.toClient, // May need composition for nested
            toDb: entry.zodSchemas.toDb,
          },
          pk: entry.zodSchemas.pk,
          clientPk: entry.zodSchemas.clientPk,
          defaults: defaults,
          isView: true as const, // Discriminator
          viewSelection: selection, // Store what was selected
          baseTable: tableName,
          // Optionally exclude these for views:
          // nav: undefined,
          // createView: undefined,
          // RelationSelection: undefined,
          __registry: finalRegistry,
        };
      },
      RelationSelection: {} as NavigationToSelection<any>,
    };
  }

  return cleanerRegistry as CreateSchemaBoxReturn<S, R>;
}
function computeViewDefaults(
  currentRegistryKey: string, // Renamed for clarity, e.g., "users"
  selection: Record<string, any> | boolean,
  registry: any,
  tableNameToRegistryKeyMap: Record<string, string>, // Accept the map
  visited = new Set<string>()
): any {
  if (visited.has(currentRegistryKey)) {
    return undefined; // Prevent circular references
  }
  visited.add(currentRegistryKey);

  // This lookup now uses the correct key every time.
  const entry = registry[currentRegistryKey];
  // This check prevents the crash.
  if (!entry) {
    // This case should ideally not be hit if the map is correct, but it's safe to have.
    console.warn(
      `Could not find entry for key "${currentRegistryKey}" in registry while computing defaults.`
    );
    return {};
  }

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

    // --- THE CORE FIX ---
    // 1. Get the internal _tableName of the related schema (e.g., "post_table")
    const targetTableName = relationConfig.schema()._tableName;

    // 2. Use the map to find the correct registry key for it (e.g., "posts")
    const nextRegistryKey = tableNameToRegistryKeyMap[targetTableName];
    if (!nextRegistryKey) continue; // Could not resolve, skip this relation

    // Handle different default configurations
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
        // 3. Make the recursive call with the CORRECT key
        computeViewDefaults(
          nextRegistryKey,
          selection[key],
          registry,
          tableNameToRegistryKeyMap, // Pass the map along
          new Set(visited)
        )
      );
    } else {
      // hasOne or belongsTo
      baseDefaults[key] =
        // 3. Make the recursive call with the CORRECT key
        computeViewDefaults(
          nextRegistryKey,
          selection[key],
          registry,
          tableNameToRegistryKeyMap, // Pass the map along
          new Set(visited)
        );
    }
  }

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
type DeriveSchemaByKey<
  T,
  Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema",
  Depth extends any[] = [],
> = Depth["length"] extends 10 // Recursion guard
  ? any
  : {
      [K in keyof T as K extends  // === START: ADDED KEYS TO EXCLUDE ===
        | "_tableName"
        | typeof SchemaWrapperBrand
        | "__primaryKeySQL"
        | "__isClientChecker"
        | "primaryKeySQL"
        | "isClient"
        ? // === END: ADDED KEYS TO EXCLUDE ===
          never
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
        [K in keyof T as K extends  // === START: ADDED KEYS TO EXCLUDE ===
          | "_tableName"
          | typeof SchemaWrapperBrand
          | "__primaryKeySQL"
          | "__isClientChecker"
          | "primaryKeySQL"
          | "isClient"
          ? // === END: ADDED KEYS TO EXCLUDE ===
            never
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
