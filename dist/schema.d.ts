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
}) & {
    pk?: true;
};
type SQLToZodType<T extends SQLType, TDefault extends boolean> = T["pk"] extends true ? TDefault extends true ? z.ZodString : z.ZodNumber : T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodNullable<z.ZodString> : T["type"] extends "int" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "boolean" ? z.ZodNullable<z.ZodBoolean> : T["type"] extends "date" | "datetime" | "timestamp" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodNullable<z.ZodDate> : z.ZodNullable<z.ZodDate> : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodString : T["type"] extends "int" ? z.ZodNumber : T["type"] extends "boolean" ? z.ZodBoolean : T["type"] extends "date" | "datetime" | "timestamp" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodDate : z.ZodDate : never;
type ZodTypeFromPrimitive<T> = T extends string ? z.ZodString : T extends number ? z.ZodNumber : T extends boolean ? z.ZodBoolean : T extends Date ? z.ZodDate : z.ZodAny;
type CollapsedUnion<A extends z.ZodTypeAny, B extends z.ZodTypeAny> = A extends B ? (B extends A ? A : z.ZodUnion<[A, B]>) : z.ZodUnion<[A, B]>;
export interface IBuilderMethods<T extends DbConfig, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> {
    initialState<const TValue>(options: {
        value: TValue | ((tools: {
            uuid: () => string;
        }) => TValue);
        schema?: never;
        clientPk?: boolean;
    }): Prettify<Builder<"new", T, TSql, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>, TValue extends () => infer R ? R : TValue, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>>, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>>>>;
    initialState<const TSchema extends z.ZodTypeAny>(options: {
        value?: never;
        schema: TSchema;
        clientPk?: boolean;
    }): Prettify<Builder<"new", T, TSql, TSchema, z.infer<TSchema>, CollapsedUnion<TSql, TSchema>, CollapsedUnion<TSql, TSchema>>>;
    initialState<const TValue, const TSchema extends z.ZodTypeAny>(options: {
        value: TValue | ((tools: {
            uuid: () => string;
        }) => TValue);
        schema: TSchema | ((base: ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>) => TSchema);
        clientPk?: boolean;
    }): Prettify<Builder<"new", T, TSql, TSchema, z.infer<TSchema>, // <-- THIS IS THE FIX: Use schema's type, not literal value
    CollapsedUnion<TSql, TSchema>, CollapsedUnion<TSql, TSchema>>>;
    reference: <TRefSchema extends {
        _tableName: string;
    }>(fieldGetter: () => any) => Builder<"sql", T & {
        references: typeof fieldGetter;
    }, TSql, TNew, TInitialValue, TClient, TValidation>;
    client: <TClientNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
    }) => TClientNext) | TClientNext) => Prettify<Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>>;
    server: <TValidationNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"server", T, TSql, TNew, TInitialValue, TClient, TValidationNext>>;
    transform: (transforms: {
        toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
        toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
        config: Prettify<BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>> & {
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
type Stage = "sql" | "relation" | "new" | "client" | "server" | "done";
type StageMethods = {
    sql: "initialState" | "client" | "server" | "transform" | "reference";
    relation: "server" | "transform";
    new: "client" | "server" | "transform";
    client: "server" | "transform";
    server: "transform";
    done: never;
};
type BuilderConfig<T extends DbConfig, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    sql: T;
    zodSqlSchema: TSql;
    zodNewSchema: TNew;
    initialValue: TInitialValue;
    zodClientSchema: TClient;
    zodValidationSchema: TValidation;
    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
};
export type Builder<TStage extends Stage, T extends DbConfig, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    config: {
        sql: T;
        zodSqlSchema: TSql;
        zodNewSchema: TNew;
        initialValue: TInitialValue;
        zodClientSchema: TClient;
        zodValidationSchema: TValidation;
    };
} & Pick<IBuilderMethods<T, TSql, TNew, TInitialValue, TClient, TValidation>, StageMethods[TStage]>;
type HasManyDefault = true | undefined | [] | {
    count: number;
};
type HasOneDefault = true | undefined | null;
export type Reference<TGetter extends () => any> = {
    __type: "reference";
    getter: TGetter;
};
interface ShapeAPI {
    initialState: <const TValue>(value: TValue | ((tools: {
        uuid: () => string;
    }) => TValue)) => Builder<"new", null, z.ZodUndefined, // No SQL schema
    ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>, TValue extends () => infer R ? R : TValue, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>, ZodTypeFromPrimitive<TValue extends () => infer R ? R : TValue>>;
    sql: <T extends SQLType>(sqlConfig: T) => Builder<"sql", T, SQLToZodType<T, false>, SQLToZodType<T, false>, z.infer<SQLToZodType<T, false>>, SQLToZodType<T, false>, SQLToZodType<T, false>>;
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
    __isClientChecker?: (record: any) => boolean;
    primaryKeySQL: (definer: (pkFields: PickPrimaryKeys<T>) => string) => SchemaBuilder<T>;
    isClient: (checker: (record: Prettify<z.infer<z.ZodObject<DeriveSchemaByKey<T, "zodSqlSchema">>> | z.infer<z.ZodObject<DeriveSchemaByKey<T, "zodClientSchema">>>>) => boolean) => SchemaBuilder<T>;
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
export declare function createMixedValidationSchema<T extends Schema<any>>(schema: T, clientSchema?: z.ZodObject<any>, dbSchema?: z.ZodObject<any>): z.ZodObject<any>;
export declare function createSchema<T extends {
    _tableName: string;
    [SchemaWrapperBrand]?: true;
}, R extends Record<string, any> = {}, TActualSchema extends Omit<T & R, typeof SchemaWrapperBrand> = Omit<T & R, typeof SchemaWrapperBrand>>(schema: T, relations?: R): {
    pk: string[] | null;
    clientPk: string[] | null;
    isClientRecord: ((record: any) => boolean) | undefined;
    sqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>;
    clientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>;
    validationSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>>;
    defaultValues: Prettify<DeriveDefaults<TActualSchema>>;
    stateType: Prettify<DeriveStateType<TActualSchema>>;
    generateDefaults: () => Prettify<DeriveDefaults<TActualSchema>>;
    toClient: (dbObject: z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>>) => z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>>;
    toDb: (clientObject: z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>>) => z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>>;
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
            /**
             * The key on the current table (`users`) to join from.
             * Autocompletes with: 'id', 'name', etc.
             */
            fromKey: KnownKeys<S[TableName]>;
            /**
             * The target key on the related table.
             * Must be a field reference from the proxy, e.g., `s.pets.userId`
             */
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
} : never, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>, RelType extends "hasMany" | "manyToMany" ? any[] : any, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>, RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<any>> : z.ZodObject<any>> : never : never : Field;
type ResolveSchema<Schema extends SchemaWithPlaceholders, Resolutions extends Record<string, any>> = {
    [K in keyof Schema]: K extends keyof Resolutions ? ResolveField<Schema[K], Resolutions[K]> : Schema[K];
};
type ResolvedRegistryWithSchemas<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>> = {
    [K in keyof S]: {
        rawSchema: ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>;
        zodSchemas: {
            sqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodSqlSchema">>>;
            clientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodClientSchema">>>;
            validationSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>, "zodValidationSchema">>>;
            defaultValues: Prettify<DeriveDefaults<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>>>;
            stateType: Prettify<DeriveStateType<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}>>>;
            toClient: (dbObject: any) => any;
            toDb: (clientObject: any) => any;
        };
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
type _DeriveViewShape<TTableName extends keyof TRegistry, TSelection, TRegistry extends RegistryShape, TKey extends "clientSchema" | "validationSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : TRegistry[TTableName]["zodSchemas"][TKey] extends z.ZodObject<infer BaseShape> ? TSelection extends Record<string, any> ? Prettify<OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]> & {
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
}> : OmitRelationFields<BaseShape, TRegistry[TTableName]["rawSchema"]> : never;
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
        server: z.ZodObject<_DeriveViewShape<TTableName, TSelection, TRegistry, "validationSchema">>;
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
        clientSchema: z.ZodObject<any>;
        validationSchema: z.ZodObject<any>;
        defaultValues: any;
        stateType: any;
        toClient: (dbObject: any) => any;
        toDb: (clientObject: any) => any;
    };
}>;
type CreateSchemaBoxReturn<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>, Resolved extends RegistryShape = ResolvedRegistryWithSchemas<S, R> extends RegistryShape ? ResolvedRegistryWithSchemas<S, R> : RegistryShape> = {
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
        stateType: Resolved[K]["zodSchemas"]["stateType"];
        nav: NavigationProxy<K & string, Resolved>;
        RelationSelection: NavigationToSelection<NavigationProxy<K & string, Resolved>>;
        createView: <const TSelection extends NavigationToSelection<NavigationProxy<K & string, Resolved>>>(selection: TSelection) => DeriveViewResult<K & string, TSelection, Resolved>;
        __registry: Resolved;
    };
};
export declare function createSchemaBox<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>>(schemas: S, resolver: (proxy: SchemaProxy<S>) => R): CreateSchemaBoxReturn<S, R>;
type SchemaProxy<S extends Record<string, SchemaWithPlaceholders>> = {
    [K in keyof S]: {
        [F in keyof S[K] as F extends "_tableName" ? never : F]: S[K][F] extends {
            config: infer Config;
        } ? S[K][F] & {
            __meta: {
                _key: F;
                _fieldType: S[K][F];
            };
            __parentTableType: S[K];
        } : S[K][F];
    };
};
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type DeriveSchemaByKey<T, Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand | "__primaryKeySQL" | "__isClientChecker" | "primaryKeySQL" | "isClient" ? never : K extends keyof T ? T[K] extends Reference<any> ? K : T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
            };
        };
    } ? never : K : never]: T[K] extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
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
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand | "__primaryKeySQL" | "__isClientChecker" | "primaryKeySQL" | "isClient" ? never : K extends keyof T ? T[K] extends Reference<any> ? K : T[K] extends {
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
            zodNewSchema: infer TNew;
            zodSqlSchema: infer TSql;
            zodClientSchema: infer TClient extends z.ZodTypeAny;
            initialValue: infer D;
        };
    } ? TNew extends TSql ? z.infer<TClient> : D extends () => infer R ? R : D : never;
}>;
type DeriveStateType<T, Depth extends any[] = []> = Prettify<Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand | "__primaryKeySQL" | "__isClientChecker" | "primaryKeySQL" | "isClient" ? never : K extends keyof T ? T[K] extends Reference<any> ? K : T[K] extends {
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
