import { z } from "zod";
type CurrentTimestampConfig = {
    default: "CURRENT_TIMESTAMP";
    defaultValue: Date;
};
export declare const isFunction: (fn: unknown) => fn is Function;
export declare function currentTimeStamp(): CurrentTimestampConfig;
type DbConfig = SQLType | RelationConfig<any> | null;
export type SQLType = ({
    type: "int";
    nullable?: boolean;
    default?: number;
} | {
    type: "boolean";
    nullable?: boolean;
    default?: boolean;
} | {
    type: "date" | "datetime" | "timestamp";
    nullable?: boolean;
    default?: "CURRENT_TIMESTAMP";
    defaultValue?: string;
} | {
    type: "date" | "datetime";
    nullable?: boolean;
    default?: Date;
} | {
    type: "varchar" | "char" | "text" | "longtext";
    nullable?: boolean;
    length?: number;
    default?: string;
}) & BaseConfig;
type BaseConfig = {
    nullable?: boolean;
    pk?: true;
    field?: string;
    sqlOnly?: true;
};
type SQLToZodType<T extends SQLType, TDefault extends boolean> = T["pk"] extends true ? TDefault extends true ? z.ZodString : z.ZodNumber : T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodNullable<z.ZodString> : T["type"] extends "int" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "boolean" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "date" | "datetime" | "timestamp" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodNullable<z.ZodDate> : z.ZodNullable<z.ZodDate> : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodString : T["type"] extends "int" ? z.ZodNumber : T["type"] extends "boolean" ? z.ZodNumber : T["type"] extends "date" | "datetime" | "timestamp" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodDate : z.ZodDate : never;
type ZodTypeFromPrimitive<T> = T extends string ? z.ZodString : T extends number ? z.ZodNumber : T extends boolean ? z.ZodBoolean : T extends Date ? z.ZodDate : z.ZodAny;
type CollapsedUnion<A extends z.ZodTypeAny, B extends z.ZodTypeAny> = A extends B ? (B extends A ? A : z.ZodUnion<[A, B]>) : z.ZodUnion<[A, B]>;
export interface IBuilderMethods<T extends DbConfig, TSql extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> {
    clientInput<const TValue>(options: {
        value: TValue | ((tools: {
            uuid: () => string;
        }) => TValue);
        schema?: never;
        clientPk?: boolean | ((val: any) => boolean);
    }): Prettify<Builder<"clientInput", T, TSql, TValue extends () => infer R ? R : TValue, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>>>>;
    clientInput<const TSchema extends z.ZodTypeAny>(options: {
        value?: never;
        schema: TSchema;
        clientPk?: boolean | ((val: any) => boolean);
    }): Prettify<Builder<"clientInput", T, TSql, z.infer<TSchema>, TSchema, CollapsedUnion<TSql, TSchema>>>;
    clientInput<const TSchema extends z.ZodTypeAny>(options: {
        value?: never;
        schema: TSchema | ((tools: any) => TSchema);
        clientPk?: boolean | ((val: any) => boolean);
    }): Prettify<Builder<"clientInput", T, TSql, z.infer<TSchema>, TSchema, CollapsedUnion<TSql, TSchema>>>;
    clientInput<const TValue>(options: {
        value: TValue | ((tools: {
            uuid: () => string;
        }) => TValue);
        schema?: never;
        clientPk?: boolean | ((val: any) => boolean);
    }): Prettify<Builder<"clientInput", T, TSql, TValue extends () => infer R ? R : TValue, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>>>>;
    clientInput(options: {
        value?: never;
        schema: (tools: any) => z.ZodTypeAny;
    }): Prettify<Builder<"clientInput", T, TSql, unknown, z.ZodTypeAny, z.ZodTypeAny>>;
    clientInput<const TValue, const TSchema extends z.ZodTypeAny>(options: {
        value: TValue | ((tools: {
            uuid: () => string;
        }) => TValue);
        schema: TSchema | ((base: ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>) => TSchema);
        clientPk?: boolean | ((val: any) => boolean);
    }): Prettify<Builder<"clientInput", T, TSql, TValue extends () => infer R ? R : TValue, TSchema, CollapsedUnion<TSql, TSchema>>>;
    clientInput<TClientNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
    }) => TClientNext) | TClientNext): Prettify<Builder<"clientInput", T, TSql, z.infer<TClientNext>, TClientNext, CollapsedUnion<TSql, TClientNext>>>;
    client: <TClientNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        clientInput: TClient;
        client: z.ZodUnion<[TSql, TClient]>;
    }) => TClientNext) | TClientNext) => Prettify<Builder<"client", T, TSql, TInitialValue, TClient, z.ZodUnion<[TSql, TClientNext]>>>;
    reference: <TRefSchema extends {
        _tableName: string;
    }>(fieldGetter: () => any) => Builder<"sql", T & {
        references: typeof fieldGetter;
    }, TSql, TInitialValue, TClient, TValidation>;
    server: <TValidationNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        clientInput: TClient;
        client: z.ZodUnion<[TSql, TClient]>;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"server", T, TSql, TInitialValue, TClient, TValidationNext>>;
    transform: (transforms: {
        toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
        toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
        config: Prettify<BuilderConfig<T, TSql, TInitialValue, TClient, TValidation>> & {
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
export type RelationConfig<T extends Schema<any>> = (BaseRelationConfig<T> & {
    type: "hasMany";
}) | (BaseRelationConfig<T> & {
    type: "hasOne";
}) | (BaseRelationConfig<T> & {
    type: "belongsTo";
}) | (BaseRelationConfig<T> & {
    type: "manyToMany";
});
type Stage = "sql" | "relation" | "clientInput" | "client" | "server" | "done";
type StageMethods = {
    sql: "clientInput" | "client" | "server" | "transform" | "reference";
    relation: "clientInput" | "client" | "server" | "transform";
    clientInput: "client" | "server" | "transform";
    client: "server" | "transform";
    server: "transform";
    done: never;
};
type BuilderConfig<T extends DbConfig, TSql extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    sql: T;
    zodSqlSchema: TSql;
    initialValue: TInitialValue;
    zodClientInputSchema: TClient;
    zodClientSchema: TClient;
    zodValidationSchema: TValidation;
    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
};
export type Builder<TStage extends Stage, T extends DbConfig, TSql extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    config: {
        sql: T;
        zodSqlSchema: TSql;
        initialValue: TInitialValue;
        zodClientInputSchema: TClient;
        zodClientSchema: TValidation;
        zodValidationSchema: TValidation;
    };
} & Pick<IBuilderMethods<T, TSql, TInitialValue, TClient, TValidation>, StageMethods[TStage]>;
type HasManyDefault = true | undefined | [] | {
    count: number;
};
type HasOneDefault = true | undefined | null;
export type Reference<TGetter extends () => any> = {
    __type: "reference";
    getter: TGetter;
};
interface ShapeAPI {
    clientInput: <const TValue>(value: TValue | ((tools: {
        uuid: () => string;
    }) => TValue)) => Builder<"clientInput", null, z.ZodUndefined, TValue extends () => infer R ? R : TValue, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>>;
    sql: <const T extends SQLType>(sqlConfig: T) => Builder<"sql", T, SQLToZodType<T, false>, z.infer<SQLToZodType<T, false>>, SQLToZodType<T, false>, SQLToZodType<T, false>>;
    reference: <TGetter extends () => any>(getter: TGetter) => Reference<TGetter>;
    hasMany: <T extends HasManyDefault>(config?: T) => PlaceholderRelation<"hasMany">;
    hasOne: (config?: HasOneDefault) => PlaceholderRelation<"hasOne">;
    manyToMany: (config?: {
        defaultCount?: number;
        defaultConfig?: HasManyDefault;
    }) => PlaceholderRelation<"manyToMany">;
}
export declare const s: ShapeAPI;
export type EnrichedField<K extends string, V, TSchema extends ShapeSchema> = V & {
    __meta: {
        _key: K;
        _fieldType: V;
    };
    __parentTableType: TSchema;
};
export type EnrichFields<T extends ShapeSchema> = {
    [K in keyof T]: K extends "_tableName" ? T[K] : K extends string ? EnrichedField<K, T[K], T> : T[K];
};
export declare const SchemaWrapperBrand: unique symbol;
type PickPrimaryKeys<T extends ShapeSchema> = {
    [K in keyof T as T[K] extends {
        config: {
            sql: {
                pk: true;
            };
        };
    } ? K : never]: T[K];
};
type SchemaBuilder<T extends ShapeSchema> = Prettify<EnrichFields<T>> & {
    __primaryKeySQL?: string;
    __derives?: Record<string, (row: any) => any>;
    primaryKeySQL: (definer: (pkFields: PickPrimaryKeys<T>) => string) => SchemaBuilder<T>;
    derive: <D extends Partial<Record<keyof T, (row: Prettify<z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientSchema">>>>>) => any>>>(derivers: D) => SchemaBuilder<T>;
};
export declare function schema<T extends string, U extends ShapeSchema<T>>(schema: U): SchemaBuilder<U>;
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
export type Schema<T extends Record<string, SchemaField | (() => Relation<any>)>> = {
    _tableName: string;
    __schemaId?: string;
    [key: string]: T[keyof T] | string | ((id: number) => string) | true | undefined;
};
type ValidShapeField = ReturnType<typeof s.sql>;
export type ShapeSchema<T extends string = string> = {
    _tableName: T;
    [SchemaWrapperBrand]?: true;
    [key: string]: string | ((id: number) => string) | ValidShapeField | true | undefined;
};
type Relation<U extends Schema<any>> = {
    type: RelationType;
    fromKey: keyof U;
    toKey: () => SchemaField;
    schema: U;
    defaultCount?: number;
};
export declare function createSchema<T extends {
    _tableName: string;
    [SchemaWrapperBrand]?: true;
}, R extends Record<string, any> = {}, TActualSchema extends Omit<T & R, typeof SchemaWrapperBrand> = Omit<T & R, typeof SchemaWrapperBrand>>(schema: T, relations?: R): {
    pk: string[] | null;
    clientPk: string[] | null;
    isClientRecord: (record: any) => boolean;
    sqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>;
    clientInputSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientInputSchema">>>;
    clientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>;
    serverSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>>;
    defaultValues: Prettify<DeriveDefaults<TActualSchema>>;
    stateType: Prettify<DeriveStateType<TActualSchema>>;
    generateDefaults: () => Prettify<DeriveDefaults<TActualSchema>>;
    toClient: (dbObject: Partial<z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>>>) => z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>>;
    toDb: (clientObject: Partial<z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>>>) => z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>>;
    parseForDb: (appData: z.input<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>>>) => z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>>;
    parseFromDb: (dbData: Partial<z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>>>) => z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>>;
};
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
        [FieldName in keyof S[TableName] as S[TableName][FieldName] extends PlaceholderReference | PlaceholderRelation<any> ? FieldName : never]?: S[TableName][FieldName] extends PlaceholderRelation<any> ? {
            fromKey: KnownKeys<S[TableName]>;
            toKey: {
                __meta: any;
                __parentTableType: any;
            };
            defaultCount?: number;
        } : S[TableName][FieldName] extends PlaceholderReference ? {
            __meta: any;
            __parentTableType: any;
        } : never;
    };
};
type ResolveField<Field, Resolution> = Field extends PlaceholderReference ? Resolution : Field extends Reference<any> ? Resolution : Field extends PlaceholderRelation<infer RelType> ? Resolution extends {
    toKey: infer ToKey;
} ? ToKey extends {
    __parentTableType: infer TargetSchema extends Schema<any>;
} ? Builder<"relation", RelType extends "hasMany" ? BaseRelationConfig<TargetSchema> & {
    type: "hasMany";
} : RelType extends "hasOne" ? BaseRelationConfig<TargetSchema> & {
    type: "hasOne";
} : RelType extends "belongsTo" ? BaseRelationConfig<TargetSchema> & {
    type: "belongsTo";
} : RelType extends "manyToMany" ? BaseRelationConfig<TargetSchema> & {
    type: "manyToMany";
} : never, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>, RelType extends "hasMany" | "manyToMany" ? any[] : any, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>> : never : never : Field;
type ResolveSchema<Schema extends SchemaWithPlaceholders, Resolutions extends Record<string, any>> = {
    [K in keyof Schema]: K extends keyof Resolutions ? ResolveField<Schema[K], Resolutions[K]> : Schema[K];
};
type ResolvedRegistryWithSchemas<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>> = {
    [K in keyof S]: {
        rawSchema: ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>;
        zodSchemas: {
            sqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodSqlSchema">>>;
            clientInputSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodClientInputSchema">>>;
            clientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodClientSchema">>>;
            serverSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodValidationSchema">>>;
            defaultValues: Prettify<DeriveDefaults<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>>>;
            stateType: Prettify<DeriveStateType<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>>>;
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
        generateDefaults: () => Prettify<DeriveDefaults<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>>>;
    };
};
type IsRelationField<Field> = Field extends {
    config: {
        sql: {
            type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
            schema: () => any;
        };
    };
} ? true : false;
type GetRelationRegistryKey<Field, TRegistry extends RegistryShape> = Field extends {
    config: {
        sql: {
            schema: () => infer S;
        };
    };
} ? S extends {
    _tableName: infer T;
} ? {
    [K in keyof TRegistry]: TRegistry[K]["rawSchema"]["_tableName"] extends T ? K : never;
}[keyof TRegistry] : never : never;
type OmitRelationFields<Shape, RawSchema> = Omit<Shape, {
    [K in keyof Shape]: K extends keyof RawSchema ? IsRelationField<RawSchema[K]> extends true ? K : never : never;
}[keyof Shape]>;
type _DeriveViewShape<TTableName extends keyof TRegistry, TSelection, TRegistry extends RegistryShape, TKey extends "clientSchema" | "serverSchema" | "sqlSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : TKey extends "sqlSchema" ? TRegistry[TTableName]["zodSchemas"]["sqlSchema"] extends z.ZodObject<infer BaseShape> ? _DeriveViewShapeInner<BaseShape, TTableName, TSelection, TRegistry, TKey, Depth> : never : TRegistry[TTableName]["zodSchemas"][TKey] extends z.ZodObject<infer BaseShape> ? _DeriveViewShapeInner<BaseShape, TTableName, TSelection, TRegistry, TKey, Depth> : never;
type _DeriveViewShapeInner<BaseShape, TTableName extends keyof TRegistry, TSelection, TRegistry extends RegistryShape, TKey extends "clientSchema" | "serverSchema" | "sqlSchema", Depth extends any[] = []> = TSelection extends Record<string, any> ? Prettify<OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]> & {
    [K in keyof TSelection & keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<TRegistry[TTableName]["rawSchema"][K]> extends true ? K : never]: GetRelationRegistryKey<TRegistry[TTableName]["rawSchema"][K], TRegistry> extends infer TargetKey ? TargetKey extends keyof TRegistry ? TRegistry[TTableName]["rawSchema"][K] extends {
        config: {
            sql: {
                type: infer RelType;
            };
        };
    } ? RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<_DeriveViewShape<TargetKey, TSelection[K], TRegistry, TKey, [
        ...Depth,
        1
    ]>>> : z.ZodNullable<z.ZodObject<_DeriveViewShape<TargetKey, TSelection[K], TRegistry, TKey, [
        ...Depth,
        1
    ]>>> : never : never : never;
}> : OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]>;
type DeriveViewDefaults<TTableName extends keyof TRegistry, TSelection, TRegistry extends RegistryShape, Depth extends any[] = []> = Prettify<TRegistry[TTableName]["zodSchemas"]["defaultValues"] & (TSelection extends Record<string, any> ? {
    [K in keyof TSelection & keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<TRegistry[TTableName]["rawSchema"][K]> extends true ? K : never]: TRegistry[TTableName]["rawSchema"][K] extends {
        config: {
            sql: {
                type: infer RelType;
                schema: any;
            };
        };
    } ? GetRelationRegistryKey<TRegistry[TTableName]["rawSchema"][K], TRegistry> extends infer TargetKey ? TargetKey extends keyof TRegistry ? RelType extends "hasMany" | "manyToMany" ? DeriveViewDefaults<TargetKey, TSelection[K], TRegistry, [
        ...Depth,
        1
    ]>[] : DeriveViewDefaults<TargetKey, TSelection[K], TRegistry, [
        ...Depth,
        1
    ]> | null : never : never : never;
} : {})>;
export type DeriveViewResult<TTableName extends keyof TRegistry, TSelection, TRegistry extends RegistryShape> = {
    definition: TRegistry[TTableName]["rawSchema"];
    schemaKey: TTableName;
    schemas: {
        sql: TRegistry[TTableName]["zodSchemas"]["sqlSchema"];
        client: z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">>;
        server: z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "serverSchema">>;
    };
    transforms: {
        toClient: TRegistry[TTableName]["transforms"]["toClient"];
        toDb: TRegistry[TTableName]["transforms"]["toDb"];
        parseForDb: (appData: z.input<z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "serverSchema">>>) => z.infer<z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">>>;
        parseFromDb: (dbData: Partial<z.infer<z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "sqlSchema">>>>) => z.infer<z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "clientSchema">>>;
    };
    defaults: DeriveViewDefaults<TTableName, TSelection, TRegistry>;
    defaultsDefinition: Prettify<DeriveViewDefaults<TTableName, TSelection, TRegistry> & {
        [K2 in keyof TRegistry[TTableName]["rawSchema"] as K2 extends string ? TRegistry[TTableName]["rawSchema"][K2] extends {
            config: {
                sql: {
                    type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                    schema: any;
                };
            };
        } ? `__def__${K2}` : never : never]: any;
    }>;
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
type RelationKeysOf<Cur extends string, Reg extends RegistryShape> = Cur extends keyof Reg ? {
    [K in keyof Reg[Cur]["rawSchema"]]: IsRelationField<Reg[Cur]["rawSchema"][K]> extends true ? K : never;
}[keyof Reg[Cur]["rawSchema"]] : never;
type NavigationProxy<CurrentTable extends string, Registry extends RegistryShape> = CurrentTable extends keyof Registry ? RelationKeysOf<CurrentTable, Registry> extends never ? never : {
    [K in RelationKeysOf<CurrentTable, Registry>]: GetRelationRegistryKey<Registry[CurrentTable]["rawSchema"][K], Registry> extends infer TargetKey ? TargetKey extends keyof Registry ? NavigationProxy<TargetKey & string, Registry> : never : never;
} : never;
type IsEffectivelyEmpty<T> = [T] extends [never] ? true : [keyof T] extends [never] ? true : string extends keyof T ? true : number extends keyof T ? true : symbol extends keyof T ? true : false;
type NavigationToSelection<T> = IsEffectivelyEmpty<T> extends true ? never : {
    [K in keyof T]?: boolean | NavigationToSelection<T[K]>;
};
export type OmitRelations<Shape, RawSchema> = Omit<Shape, {
    [K in keyof Shape]: K extends keyof RawSchema ? RawSchema[K] extends {
        config: {
            sql: {
                schema: any;
            };
        };
    } ? K : never : never;
}[keyof Shape]>;
type RegistryShape = Record<string, {
    rawSchema: any;
    zodSchemas: {
        sqlSchema: z.ZodObject<any>;
        clientInputSchema: z.ZodObject<any>;
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
}>;
type CreateSchemaBoxReturn<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>, Resolved extends RegistryShape = ResolvedRegistryWithSchemas<S, R> extends RegistryShape ? ResolvedRegistryWithSchemas<S, R> : RegistryShape> = {
    [K in keyof Resolved]: {
        definition: Resolved[K]["rawSchema"];
        schemaKey: K;
        schemas: {
            sql: Resolved[K]["zodSchemas"]["sqlSchema"];
            clientInput: Resolved[K]["zodSchemas"]["clientInputSchema"];
            client: Resolved[K]["zodSchemas"]["clientSchema"];
            server: Resolved[K]["zodSchemas"]["serverSchema"];
        };
        transforms: {
            toClient: (dbData: z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>) => z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>;
            toDb: (clientData: z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>) => z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>;
            parseForDb: (appData: z.input<Resolved[K]["zodSchemas"]["serverSchema"]>) => z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>;
            parseFromDb: (dbData: Partial<z.infer<Resolved[K]["zodSchemas"]["sqlSchema"]>>) => z.infer<Resolved[K]["zodSchemas"]["clientSchema"]>;
        };
        defaults: Resolved[K]["zodSchemas"]["defaultValues"];
        defaultsDefinition: Prettify<Resolved[K]["zodSchemas"]["defaultValues"] & {
            [K2 in keyof Resolved[K]["rawSchema"] as K2 extends string ? Resolved[K]["rawSchema"][K2] extends {
                config: {
                    sql: {
                        type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
                        schema: any;
                    };
                };
            } ? `__def__${K2}` : never : never]: any;
        }>;
        stateType: Resolved[K]["zodSchemas"]["stateType"];
        generateDefaults: () => Resolved[K]["zodSchemas"]["defaultValues"];
        pk: string[] | null;
        clientPk: string[] | null;
        isClientRecord: (record: any) => boolean;
        nav: NavigationProxy<K & string, Resolved>;
        RelationSelection: NavigationToSelection<NavigationProxy<K & string, Resolved>>;
        createView: <const TSelection extends NavigationToSelection<NavigationProxy<K & string, Resolved>>>(selection: TSelection) => DeriveViewResult<K & string, TSelection, Resolved>;
        __registry: Resolved;
    };
};
export declare function createSchemaBox<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>>(schemas: S, resolutions: R): CreateSchemaBoxReturn<S, R>;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type GetDbKey<K, Field> = Field extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
    config: {
        sql: {
            field: infer F extends string;
        };
    };
} ? string extends F ? K : F : K : Field extends {
    config: {
        sql: {
            field: infer F extends string;
        };
    };
} ? string extends F ? K : F : K;
type DeriveSchemaByKey<T, Key extends "zodSqlSchema" | "zodClientInputSchema" | "zodClientSchema" | "zodValidationSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand | "__primaryKeySQL" | "primaryKeySQL" | "derive" | "__derives" ? never : K extends keyof T ? T[K] extends {
        config: {
            sql: {
                sqlOnly: true;
            };
        };
    } ? Key extends "zodSqlSchema" ? GetDbKey<K, T[K]> : never : T[K] extends Reference<any> ? Key extends "zodSqlSchema" ? GetDbKey<K, T[K]> : K : T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
            };
        };
    } ? never : Key extends "zodSqlSchema" ? GetDbKey<K, T[K]> : K : never]: T[K] extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
        config: {
            [P in Key]: infer ZodSchema extends z.ZodTypeAny;
        };
    } ? ZodSchema : never : T[K] extends {
        config: {
            [P in Key]: infer ZodSchema extends z.ZodTypeAny;
        };
    } ? ZodSchema : never;
};
type DeriveDefaults<T, Depth extends any[] = []> = Prettify<Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand | "__primaryKeySQL" | "primaryKeySQL" | "derive" | "__derives" ? never : K extends keyof T ? T[K] extends {
        config: {
            sql: {
                sqlOnly: true;
            };
        };
    } ? never : T[K] extends Reference<any> ? K : T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
            };
        };
    } ? never : K : never]: T[K] extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
        config: {
            initialValue: infer D;
        };
    } ? D extends () => infer R ? R : D : never : T[K] extends {
        config: {
            zodClientSchema: infer TClient extends z.ZodTypeAny;
        };
    } ? z.infer<TClient> : never;
}>;
type DeriveStateType<T, Depth extends any[] = []> = Prettify<Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand | "__primaryKeySQL" | "primaryKeySQL" | "derive" | "__derives" ? never : K extends keyof T ? T[K] extends {
        config: {
            sql: {
                sqlOnly: true;
            };
        };
    } ? never : T[K] extends Reference<any> ? K : T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
            };
        };
    } ? never : K : never]: T[K] extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
        config: {
            zodClientSchema: infer TClient extends z.ZodTypeAny;
        };
    } ? z.infer<TClient> : never : T[K] extends {
        config: {
            zodClientSchema: infer TClient extends z.ZodTypeAny;
        };
    } ? z.infer<TClient> : never;
}>;
export {};
