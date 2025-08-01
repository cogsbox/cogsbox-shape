import { z } from "zod";
type CurrentTimestampConfig = {
    default: "CURRENT_TIMESTAMP";
    defaultValue: Date;
};
export declare const isFunction: (fn: unknown) => fn is Function;
export declare function currentTimeStamp(): CurrentTimestampConfig;
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
export interface IBuilderMethods<T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> {
    initialState: {
        <const TValue>(value: TValue extends (...args: any[]) => void | undefined ? never : TValue): TValue extends (...args: any[]) => infer R ? R extends void | undefined ? never : TValue extends z.ZodTypeAny ? Prettify<Builder<"new", T, TSql, TValue, z.infer<TValue>, CollapsedUnion<TSql, TValue>, CollapsedUnion<TSql, TValue>>> : R extends string | number | boolean ? Prettify<Builder<"new", T, TSql, z.ZodLiteral<R>, R, CollapsedUnion<TSql, z.ZodLiteral<R>>, CollapsedUnion<TSql, z.ZodLiteral<R>>>> : Prettify<Builder<"new", T, TSql, ZodTypeFromPrimitive<R>, R, CollapsedUnion<TSql, ZodTypeFromPrimitive<R>>, CollapsedUnion<TSql, ZodTypeFromPrimitive<R>>>> : TValue extends z.ZodTypeAny ? Prettify<Builder<"new", T, TSql, TValue, z.infer<TValue>, CollapsedUnion<TSql, TValue>, CollapsedUnion<TSql, TValue>>> : TValue extends string | number | boolean ? Prettify<Builder<"new", T, TSql, z.ZodLiteral<TValue>, TValue, CollapsedUnion<TSql, z.ZodLiteral<TValue>>, CollapsedUnion<TSql, z.ZodLiteral<TValue>>>> : Prettify<Builder<"new", T, TSql, ZodTypeFromPrimitive<TValue>, TValue, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue>>, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue>>>>;
        <const TValue, TSchema extends z.ZodTypeAny>(value: TValue extends (...args: any[]) => void | undefined ? never : TValue, schema: TSchema): Prettify<Builder<"new", T, TSql, TSchema, TValue extends () => infer R ? R : TValue, CollapsedUnion<TSql, TSchema>, CollapsedUnion<TSql, TSchema>>>;
        <const TValue, TSchema extends z.ZodTypeAny>(value: TValue extends (...args: any[]) => void | undefined ? never : TValue, schemaModifier: (baseSchema: TValue extends () => infer R ? R extends string | number | boolean ? z.ZodLiteral<R> : ZodTypeFromPrimitive<R> : TValue extends string | number | boolean ? z.ZodLiteral<TValue> : ZodTypeFromPrimitive<TValue>) => TSchema): Prettify<Builder<"new", T, TSql, TSchema, TValue extends () => infer R ? R : TValue, CollapsedUnion<TSql, TSchema>, CollapsedUnion<TSql, TSchema>>>;
    };
    reference: <TRefSchema extends {
        _tableName: string;
    }>(fieldGetter: () => any) => Builder<"sql", T & {
        references: typeof fieldGetter;
    }, TSql, TNew, TInitialValue, TClient, TValidation>;
    client: <TClientNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
    }) => TClientNext) | TClientNext) => Prettify<Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>>;
    validation: <TValidationNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"validation", T, TSql, TNew, TInitialValue, TClient, TValidationNext>>;
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
type Stage = "sql" | "relation" | "new" | "client" | "validation" | "done";
type StageMethods = {
    sql: "initialState" | "client" | "validation" | "transform" | "reference";
    relation: "validation" | "transform";
    new: "client" | "validation" | "transform";
    client: "validation" | "transform";
    validation: "transform";
    done: never;
};
type BuilderConfig<T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    sql: T;
    zodSqlSchema: TSql;
    zodNewSchema: TNew;
    initialValue: TInitialValue;
    zodClientSchema: TClient;
    zodValidationSchema: TValidation;
    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
};
export type Builder<TStage extends Stage, T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
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
export declare function schema<T extends string, U extends ShapeSchema<T>>(schema: U): Prettify<EnrichFields<U>>;
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
    sqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodSqlSchema">>>;
    clientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodClientSchema">>>;
    validationSchema: z.ZodObject<Prettify<DeriveSchemaByKey<TActualSchema, "zodValidationSchema">>>;
    defaultValues: Prettify<DeriveDefaults<TActualSchema>>;
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
type ResolveField<Field, Resolution, AllSchemas extends Record<string, any>> = Field extends PlaceholderReference ? Resolution : Field extends Reference<any> ? Resolution : Field extends PlaceholderRelation<infer RelType> ? Resolution extends {
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
type ResolveSchema<Schema extends SchemaWithPlaceholders, Resolutions extends Record<string, any>, AllSchemas extends Record<string, any>> = {
    [K in keyof Schema]: K extends keyof Resolutions ? ResolveField<Schema[K], Resolutions[K], AllSchemas> : Schema[K];
};
type ResolvedRegistryWithSchemas<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>> = {
    [K in keyof S]: {
        rawSchema: ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}, S>;
        zodSchemas: {
            sqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}, S>, "zodSqlSchema">>>;
            clientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}, S>, "zodClientSchema">>>;
            validationSchema: z.ZodObject<Prettify<DeriveSchemaByKey<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}, S>, "zodValidationSchema">>>;
            defaultValues: Prettify<DeriveDefaults<ResolveSchema<S[K], K extends keyof R ? (R[K] extends object ? R[K] : {}) : {}, S>>>;
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
            schema: () => infer TargetSchema;
        };
    };
} ? TargetSchema extends {
    _tableName: infer TableName;
} ? {
    [K in keyof TRegistry]: TRegistry[K]["rawSchema"]["_tableName"] extends TableName ? K : never;
}[keyof TRegistry] : never : never;
type NavigationProxy<CurrentTable extends string, Registry extends RegistryShape> = CurrentTable extends keyof Registry ? {
    [K in keyof Registry[CurrentTable]["rawSchema"] as IsRelationField<Registry[CurrentTable]["rawSchema"][K]> extends true ? K : never]: GetRelationRegistryKey<Registry[CurrentTable]["rawSchema"][K], Registry> extends infer TargetKey ? TargetKey extends keyof Registry ? NavigationProxy<TargetKey & string, Registry> : never : never;
} : {};
type NavigationToSelection<Nav> = Nav extends object ? {
    [K in keyof Nav]?: boolean | NavigationToSelection<Nav[K]>;
} : never;
type BuildZodShape<TTableName extends keyof TRegistry, TSelection, TKey extends "clientSchema" | "validationSchema", TRegistry extends RegistryShape> = TRegistry[TTableName]["zodSchemas"][TKey] extends z.ZodObject<infer Base> ? TSelection extends Record<string, any> ? // First get the base fields without relations
{
    [K in keyof Base as K extends keyof TRegistry[TTableName]["rawSchema"] ? IsRelationField<TRegistry[TTableName]["rawSchema"][K]> extends true ? never : K : K]: Base[K];
} & {
    [K in keyof TSelection & keyof TRegistry[TTableName]["rawSchema"] as IsRelationField<TRegistry[TTableName]["rawSchema"][K]> extends true ? K : never]: GetRelationRegistryKey<TRegistry[TTableName]["rawSchema"][K], TRegistry> extends infer TargetKey ? TargetKey extends keyof TRegistry ? TRegistry[TTableName]["rawSchema"][K] extends {
        config: {
            sql: {
                type: infer RelType;
            };
        };
    } ? RelType extends "hasMany" | "manyToMany" ? z.ZodArray<z.ZodObject<TSelection[K] extends true ? OmitRelations<TRegistry[TargetKey]["zodSchemas"][TKey] extends z.ZodObject<infer Shape> ? Shape : never, TRegistry[TargetKey]["rawSchema"]> : BuildZodShape<TargetKey, TSelection[K], TKey, TRegistry>>> : z.ZodOptional<z.ZodObject<TSelection[K] extends true ? OmitRelations<TRegistry[TargetKey]["zodSchemas"][TKey] extends z.ZodObject<infer Shape> ? Shape : never, TRegistry[TargetKey]["rawSchema"]> : BuildZodShape<TargetKey, TSelection[K], TKey, TRegistry>>> : never : never : never;
} : Base : never;
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
        toClient: (dbObject: any) => any;
        toDb: (clientObject: any) => any;
    };
}>;
type DeriveViewDefaults<TTableName extends keyof TRegistry, TSelection, TRegistry extends RegistryShape, Depth extends any[] = []> = Depth["length"] extends 10 ? any : Prettify<DeriveDefaults<TRegistry[TTableName]["rawSchema"]> & (TSelection extends Record<string, any> ? {
    -readonly [K in keyof TSelection & keyof TRegistry[TTableName]["rawSchema"]]?: TRegistry[TTableName]["rawSchema"][K] extends {
        config: {
            sql: {
                type: infer RelType;
                schema: any;
            };
        };
    } ? GetRelationRegistryKey<TRegistry[TTableName]["rawSchema"][K], TRegistry> extends infer TargetKey ? TargetKey extends keyof TRegistry ? RelType extends "hasMany" | "manyToMany" ? DeriveViewDefaults<TargetKey, TSelection[K], TRegistry, [
        ...Depth,
        1
    ]>[] : // Recursively call with the CORRECT key (TargetKey)
    DeriveViewDefaults<TargetKey, TSelection[K], TRegistry, [
        ...Depth,
        1
    ]> | null : never : never : never;
} : {})>;
type CreateSchemaBoxReturn<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>, Resolved extends RegistryShape = ResolvedRegistryWithSchemas<S, R> extends RegistryShape ? ResolvedRegistryWithSchemas<S, R> : RegistryShape> = {
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
        RelationSelection: NavigationToSelection<NavigationProxy<K & string, Resolved>>;
        createView: <const TSelection extends NavigationToSelection<NavigationProxy<K & string, Resolved>>>(selection: TSelection) => {
            sql: Resolved[K]["zodSchemas"]["sqlSchema"];
            client: z.ZodObject<BuildZodShape<K, TSelection, "clientSchema", Resolved>>;
            validation: z.ZodObject<BuildZodShape<K, TSelection, "validationSchema", Resolved>>;
            defaults: Prettify<DeriveViewDefaults<K & string, TSelection, Resolved>>;
        };
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
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K extends keyof T ? T[K] extends Reference<any> ? K : T[K] extends {
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
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K extends keyof T ? T[K] extends Reference<any> ? K : T[K] extends {
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
            initialValue: infer D;
        };
    } ? D extends () => infer R ? R : D : never;
}>;
export {};
