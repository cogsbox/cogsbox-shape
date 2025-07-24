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
export type Reference<TGetter extends () => any> = {
    __type: "reference";
    getter: TGetter;
};
interface ShapeAPI {
    sql: <T extends SQLType>(sqlConfig: T) => Builder<"sql", T, SQLToZodType<T, false>, SQLToZodType<T, false>, z.infer<SQLToZodType<T, false>>, SQLToZodType<T, false>, SQLToZodType<T, false>>;
    reference: <TGetter extends () => any>(getter: TGetter) => Reference<TGetter>;
    hasMany: (config?: {
        defaultCount?: number;
    }) => PlaceholderRelation<"hasMany">;
    hasOne: () => PlaceholderRelation<"hasOne">;
    manyToMany: (config?: {
        defaultCount?: number;
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
};
type SchemaWithPlaceholders = {
    _tableName: string;
    [key: string]: any | PlaceholderReference | PlaceholderRelation<any>;
};
type KnownKeys<T> = keyof {
    [K in keyof T as string extends K ? never : K]: T[K];
};
/**
 * This is the new, core type. It is NOT a validator. It is a strict TEMPLATE
 * that defines the exact shape the resolver's return object must have.
 * It provides the structure for autocompletion and error checking.
 */
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
type ResolveField<Field, Resolution, AllSchemas extends Record<string, any>> = Field extends PlaceholderReference ? Resolution : Field extends PlaceholderRelation<infer RelType> ? Resolution extends {
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
export declare function createSchemaBox<S extends Record<string, SchemaWithPlaceholders>, R extends ResolutionMap<S>>(schemas: S, resolver: (proxy: SchemaProxy<S>) => R): { [key in keyof ResolvedRegistryWithSchemas<S, R>]: {
    rawSchema: ResolvedRegistryWithSchemas<S, R>[key]["rawSchema"];
    zodSchemas: ResolvedRegistryWithSchemas<S, R>[key]["zodSchemas"];
    test: S;
    nav: key & string extends infer T ? T extends key & string ? T extends keyof S ? { [K in keyof ResolvedRegistryWithSchemas<S, R>[T]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T]["rawSchema"][K] extends infer T_1 ? T_1 extends ResolvedRegistryWithSchemas<S, R>[T]["rawSchema"][K] ? T_1 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K : never]: (ResolvedRegistryWithSchemas<S, R>[T]["rawSchema"][K] extends infer T_2 ? T_2 extends ResolvedRegistryWithSchemas<S, R>[T]["rawSchema"][K] ? T_2 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_3 ? T_3 extends TargetTable & string ? T_3 extends keyof S ? { [K_1 in keyof ResolvedRegistryWithSchemas<S, R>[T_3]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_3]["rawSchema"][K_1] extends infer T_4 ? T_4 extends ResolvedRegistryWithSchemas<S, R>[T_3]["rawSchema"][K_1] ? T_4 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_1 : never]: (ResolvedRegistryWithSchemas<S, R>[T_3]["rawSchema"][K_1] extends infer T_5 ? T_5 extends ResolvedRegistryWithSchemas<S, R>[T_3]["rawSchema"][K_1] ? T_5 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_6 ? T_6 extends TargetTable & string ? T_6 extends keyof S ? { [K_2 in keyof ResolvedRegistryWithSchemas<S, R>[T_6]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_6]["rawSchema"][K_2] extends infer T_7 ? T_7 extends ResolvedRegistryWithSchemas<S, R>[T_6]["rawSchema"][K_2] ? T_7 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_2 : never]: (ResolvedRegistryWithSchemas<S, R>[T_6]["rawSchema"][K_2] extends infer T_8 ? T_8 extends ResolvedRegistryWithSchemas<S, R>[T_6]["rawSchema"][K_2] ? T_8 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_9 ? T_9 extends TargetTable & string ? T_9 extends keyof S ? { [K_3 in keyof ResolvedRegistryWithSchemas<S, R>[T_9]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_9]["rawSchema"][K_3] extends infer T_10 ? T_10 extends ResolvedRegistryWithSchemas<S, R>[T_9]["rawSchema"][K_3] ? T_10 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_3 : never]: (ResolvedRegistryWithSchemas<S, R>[T_9]["rawSchema"][K_3] extends infer T_11 ? T_11 extends ResolvedRegistryWithSchemas<S, R>[T_9]["rawSchema"][K_3] ? T_11 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_12 ? T_12 extends TargetTable & string ? T_12 extends keyof S ? { [K_4 in keyof ResolvedRegistryWithSchemas<S, R>[T_12]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_12]["rawSchema"][K_4] extends infer T_13 ? T_13 extends ResolvedRegistryWithSchemas<S, R>[T_12]["rawSchema"][K_4] ? T_13 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_4 : never]: (ResolvedRegistryWithSchemas<S, R>[T_12]["rawSchema"][K_4] extends infer T_14 ? T_14 extends ResolvedRegistryWithSchemas<S, R>[T_12]["rawSchema"][K_4] ? T_14 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_15 ? T_15 extends TargetTable & string ? T_15 extends keyof S ? { [K_5 in keyof ResolvedRegistryWithSchemas<S, R>[T_15]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_15]["rawSchema"][K_5] extends infer T_16 ? T_16 extends ResolvedRegistryWithSchemas<S, R>[T_15]["rawSchema"][K_5] ? T_16 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_5 : never]: (ResolvedRegistryWithSchemas<S, R>[T_15]["rawSchema"][K_5] extends infer T_17 ? T_17 extends ResolvedRegistryWithSchemas<S, R>[T_15]["rawSchema"][K_5] ? T_17 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_18 ? T_18 extends TargetTable & string ? T_18 extends keyof S ? { [K_6 in keyof ResolvedRegistryWithSchemas<S, R>[T_18]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_18]["rawSchema"][K_6] extends infer T_19 ? T_19 extends ResolvedRegistryWithSchemas<S, R>[T_18]["rawSchema"][K_6] ? T_19 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_6 : never]: (ResolvedRegistryWithSchemas<S, R>[T_18]["rawSchema"][K_6] extends infer T_20 ? T_20 extends ResolvedRegistryWithSchemas<S, R>[T_18]["rawSchema"][K_6] ? T_20 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_21 ? T_21 extends TargetTable & string ? T_21 extends keyof S ? { [K_7 in keyof ResolvedRegistryWithSchemas<S, R>[T_21]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_21]["rawSchema"][K_7] extends infer T_22 ? T_22 extends ResolvedRegistryWithSchemas<S, R>[T_21]["rawSchema"][K_7] ? T_22 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_7 : never]: (ResolvedRegistryWithSchemas<S, R>[T_21]["rawSchema"][K_7] extends infer T_23 ? T_23 extends ResolvedRegistryWithSchemas<S, R>[T_21]["rawSchema"][K_7] ? T_23 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_24 ? T_24 extends TargetTable & string ? T_24 extends keyof S ? { [K_8 in keyof ResolvedRegistryWithSchemas<S, R>[T_24]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_24]["rawSchema"][K_8] extends infer T_25 ? T_25 extends ResolvedRegistryWithSchemas<S, R>[T_24]["rawSchema"][K_8] ? T_25 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_8 : never]: (ResolvedRegistryWithSchemas<S, R>[T_24]["rawSchema"][K_8] extends infer T_26 ? T_26 extends ResolvedRegistryWithSchemas<S, R>[T_24]["rawSchema"][K_8] ? T_26 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_27 ? T_27 extends TargetTable & string ? T_27 extends keyof S ? { [K_9 in keyof ResolvedRegistryWithSchemas<S, R>[T_27]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_27]["rawSchema"][K_9] extends infer T_28 ? T_28 extends ResolvedRegistryWithSchemas<S, R>[T_27]["rawSchema"][K_9] ? T_28 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_9 : never]: (ResolvedRegistryWithSchemas<S, R>[T_27]["rawSchema"][K_9] extends infer T_29 ? T_29 extends ResolvedRegistryWithSchemas<S, R>[T_27]["rawSchema"][K_9] ? T_29 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_30 ? T_30 extends TargetTable & string ? T_30 extends keyof S ? { [K_10 in keyof ResolvedRegistryWithSchemas<S, R>[T_30]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_30]["rawSchema"][K_10] extends infer T_31 ? T_31 extends ResolvedRegistryWithSchemas<S, R>[T_30]["rawSchema"][K_10] ? T_31 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_10 : never]: (ResolvedRegistryWithSchemas<S, R>[T_30]["rawSchema"][K_10] extends infer T_32 ? T_32 extends ResolvedRegistryWithSchemas<S, R>[T_30]["rawSchema"][K_10] ? T_32 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? /*elided*/ any : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never;
    RelationSelection: (key & string extends infer T_66 ? T_66 extends key & string ? T_66 extends keyof S ? { [K_22 in keyof ResolvedRegistryWithSchemas<S, R>[T_66]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_66]["rawSchema"][K_22] extends infer T_67 ? T_67 extends ResolvedRegistryWithSchemas<S, R>[T_66]["rawSchema"][K_22] ? T_67 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_22 : never]: (ResolvedRegistryWithSchemas<S, R>[T_66]["rawSchema"][K_22] extends infer T_68 ? T_68 extends ResolvedRegistryWithSchemas<S, R>[T_66]["rawSchema"][K_22] ? T_68 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_69 ? T_69 extends TargetTable & string ? T_69 extends keyof S ? { [K_23 in keyof ResolvedRegistryWithSchemas<S, R>[T_69]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_69]["rawSchema"][K_23] extends infer T_70 ? T_70 extends ResolvedRegistryWithSchemas<S, R>[T_69]["rawSchema"][K_23] ? T_70 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_23 : never]: (ResolvedRegistryWithSchemas<S, R>[T_69]["rawSchema"][K_23] extends infer T_71 ? T_71 extends ResolvedRegistryWithSchemas<S, R>[T_69]["rawSchema"][K_23] ? T_71 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_72 ? T_72 extends TargetTable & string ? T_72 extends keyof S ? { [K_24 in keyof ResolvedRegistryWithSchemas<S, R>[T_72]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_72]["rawSchema"][K_24] extends infer T_73 ? T_73 extends ResolvedRegistryWithSchemas<S, R>[T_72]["rawSchema"][K_24] ? T_73 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_24 : never]: (ResolvedRegistryWithSchemas<S, R>[T_72]["rawSchema"][K_24] extends infer T_74 ? T_74 extends ResolvedRegistryWithSchemas<S, R>[T_72]["rawSchema"][K_24] ? T_74 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_75 ? T_75 extends TargetTable & string ? T_75 extends keyof S ? { [K_25 in keyof ResolvedRegistryWithSchemas<S, R>[T_75]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_75]["rawSchema"][K_25] extends infer T_76 ? T_76 extends ResolvedRegistryWithSchemas<S, R>[T_75]["rawSchema"][K_25] ? T_76 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_25 : never]: (ResolvedRegistryWithSchemas<S, R>[T_75]["rawSchema"][K_25] extends infer T_77 ? T_77 extends ResolvedRegistryWithSchemas<S, R>[T_75]["rawSchema"][K_25] ? T_77 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_78 ? T_78 extends TargetTable & string ? T_78 extends keyof S ? { [K_26 in keyof ResolvedRegistryWithSchemas<S, R>[T_78]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_78]["rawSchema"][K_26] extends infer T_79 ? T_79 extends ResolvedRegistryWithSchemas<S, R>[T_78]["rawSchema"][K_26] ? T_79 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_26 : never]: (ResolvedRegistryWithSchemas<S, R>[T_78]["rawSchema"][K_26] extends infer T_80 ? T_80 extends ResolvedRegistryWithSchemas<S, R>[T_78]["rawSchema"][K_26] ? T_80 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_81 ? T_81 extends TargetTable & string ? T_81 extends keyof S ? { [K_27 in keyof ResolvedRegistryWithSchemas<S, R>[T_81]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_81]["rawSchema"][K_27] extends infer T_82 ? T_82 extends ResolvedRegistryWithSchemas<S, R>[T_81]["rawSchema"][K_27] ? T_82 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_27 : never]: (ResolvedRegistryWithSchemas<S, R>[T_81]["rawSchema"][K_27] extends infer T_83 ? T_83 extends ResolvedRegistryWithSchemas<S, R>[T_81]["rawSchema"][K_27] ? T_83 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_84 ? T_84 extends TargetTable & string ? T_84 extends keyof S ? { [K_28 in keyof ResolvedRegistryWithSchemas<S, R>[T_84]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_84]["rawSchema"][K_28] extends infer T_85 ? T_85 extends ResolvedRegistryWithSchemas<S, R>[T_84]["rawSchema"][K_28] ? T_85 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_28 : never]: (ResolvedRegistryWithSchemas<S, R>[T_84]["rawSchema"][K_28] extends infer T_86 ? T_86 extends ResolvedRegistryWithSchemas<S, R>[T_84]["rawSchema"][K_28] ? T_86 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_87 ? T_87 extends TargetTable & string ? T_87 extends keyof S ? { [K_29 in keyof ResolvedRegistryWithSchemas<S, R>[T_87]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_87]["rawSchema"][K_29] extends infer T_88 ? T_88 extends ResolvedRegistryWithSchemas<S, R>[T_87]["rawSchema"][K_29] ? T_88 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_29 : never]: (ResolvedRegistryWithSchemas<S, R>[T_87]["rawSchema"][K_29] extends infer T_89 ? T_89 extends ResolvedRegistryWithSchemas<S, R>[T_87]["rawSchema"][K_29] ? T_89 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_90 ? T_90 extends TargetTable & string ? T_90 extends keyof S ? { [K_30 in keyof ResolvedRegistryWithSchemas<S, R>[T_90]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_90]["rawSchema"][K_30] extends infer T_91 ? T_91 extends ResolvedRegistryWithSchemas<S, R>[T_90]["rawSchema"][K_30] ? T_91 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_30 : never]: (ResolvedRegistryWithSchemas<S, R>[T_90]["rawSchema"][K_30] extends infer T_92 ? T_92 extends ResolvedRegistryWithSchemas<S, R>[T_90]["rawSchema"][K_30] ? T_92 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_93 ? T_93 extends TargetTable & string ? T_93 extends keyof S ? { [K_31 in keyof ResolvedRegistryWithSchemas<S, R>[T_93]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_93]["rawSchema"][K_31] extends infer T_94 ? T_94 extends ResolvedRegistryWithSchemas<S, R>[T_93]["rawSchema"][K_31] ? T_94 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_31 : never]: (ResolvedRegistryWithSchemas<S, R>[T_93]["rawSchema"][K_31] extends infer T_95 ? T_95 extends ResolvedRegistryWithSchemas<S, R>[T_93]["rawSchema"][K_31] ? T_95 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_96 ? T_96 extends TargetTable & string ? T_96 extends keyof S ? { [K_32 in keyof ResolvedRegistryWithSchemas<S, R>[T_96]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_96]["rawSchema"][K_32] extends infer T_97 ? T_97 extends ResolvedRegistryWithSchemas<S, R>[T_96]["rawSchema"][K_32] ? T_97 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_32 : never]: (ResolvedRegistryWithSchemas<S, R>[T_96]["rawSchema"][K_32] extends infer T_98 ? T_98 extends ResolvedRegistryWithSchemas<S, R>[T_96]["rawSchema"][K_32] ? T_98 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? /*elided*/ any : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never) extends infer T_99 ? T_99 extends (key & string extends infer T_110 ? T_110 extends key & string ? T_110 extends keyof S ? { [K_44 in keyof ResolvedRegistryWithSchemas<S, R>[T_110]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_110]["rawSchema"][K_44] extends infer T_111 ? T_111 extends ResolvedRegistryWithSchemas<S, R>[T_110]["rawSchema"][K_44] ? T_111 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_44 : never]: (ResolvedRegistryWithSchemas<S, R>[T_110]["rawSchema"][K_44] extends infer T_112 ? T_112 extends ResolvedRegistryWithSchemas<S, R>[T_110]["rawSchema"][K_44] ? T_112 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_113 ? T_113 extends TargetTable & string ? T_113 extends keyof S ? { [K_45 in keyof ResolvedRegistryWithSchemas<S, R>[T_113]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_113]["rawSchema"][K_45] extends infer T_114 ? T_114 extends ResolvedRegistryWithSchemas<S, R>[T_113]["rawSchema"][K_45] ? T_114 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_45 : never]: (ResolvedRegistryWithSchemas<S, R>[T_113]["rawSchema"][K_45] extends infer T_115 ? T_115 extends ResolvedRegistryWithSchemas<S, R>[T_113]["rawSchema"][K_45] ? T_115 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_116 ? T_116 extends TargetTable & string ? T_116 extends keyof S ? { [K_46 in keyof ResolvedRegistryWithSchemas<S, R>[T_116]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_116]["rawSchema"][K_46] extends infer T_117 ? T_117 extends ResolvedRegistryWithSchemas<S, R>[T_116]["rawSchema"][K_46] ? T_117 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_46 : never]: (ResolvedRegistryWithSchemas<S, R>[T_116]["rawSchema"][K_46] extends infer T_118 ? T_118 extends ResolvedRegistryWithSchemas<S, R>[T_116]["rawSchema"][K_46] ? T_118 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_119 ? T_119 extends TargetTable & string ? T_119 extends keyof S ? { [K_47 in keyof ResolvedRegistryWithSchemas<S, R>[T_119]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_119]["rawSchema"][K_47] extends infer T_120 ? T_120 extends ResolvedRegistryWithSchemas<S, R>[T_119]["rawSchema"][K_47] ? T_120 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_47 : never]: (ResolvedRegistryWithSchemas<S, R>[T_119]["rawSchema"][K_47] extends infer T_121 ? T_121 extends ResolvedRegistryWithSchemas<S, R>[T_119]["rawSchema"][K_47] ? T_121 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_122 ? T_122 extends TargetTable & string ? T_122 extends keyof S ? { [K_48 in keyof ResolvedRegistryWithSchemas<S, R>[T_122]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_122]["rawSchema"][K_48] extends infer T_123 ? T_123 extends ResolvedRegistryWithSchemas<S, R>[T_122]["rawSchema"][K_48] ? T_123 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_48 : never]: (ResolvedRegistryWithSchemas<S, R>[T_122]["rawSchema"][K_48] extends infer T_124 ? T_124 extends ResolvedRegistryWithSchemas<S, R>[T_122]["rawSchema"][K_48] ? T_124 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_125 ? T_125 extends TargetTable & string ? T_125 extends keyof S ? { [K_49 in keyof ResolvedRegistryWithSchemas<S, R>[T_125]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_125]["rawSchema"][K_49] extends infer T_126 ? T_126 extends ResolvedRegistryWithSchemas<S, R>[T_125]["rawSchema"][K_49] ? T_126 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_49 : never]: (ResolvedRegistryWithSchemas<S, R>[T_125]["rawSchema"][K_49] extends infer T_127 ? T_127 extends ResolvedRegistryWithSchemas<S, R>[T_125]["rawSchema"][K_49] ? T_127 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_128 ? T_128 extends TargetTable & string ? T_128 extends keyof S ? { [K_50 in keyof ResolvedRegistryWithSchemas<S, R>[T_128]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_128]["rawSchema"][K_50] extends infer T_129 ? T_129 extends ResolvedRegistryWithSchemas<S, R>[T_128]["rawSchema"][K_50] ? T_129 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_50 : never]: (ResolvedRegistryWithSchemas<S, R>[T_128]["rawSchema"][K_50] extends infer T_130 ? T_130 extends ResolvedRegistryWithSchemas<S, R>[T_128]["rawSchema"][K_50] ? T_130 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_131 ? T_131 extends TargetTable & string ? T_131 extends keyof S ? { [K_51 in keyof ResolvedRegistryWithSchemas<S, R>[T_131]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_131]["rawSchema"][K_51] extends infer T_132 ? T_132 extends ResolvedRegistryWithSchemas<S, R>[T_131]["rawSchema"][K_51] ? T_132 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_51 : never]: (ResolvedRegistryWithSchemas<S, R>[T_131]["rawSchema"][K_51] extends infer T_133 ? T_133 extends ResolvedRegistryWithSchemas<S, R>[T_131]["rawSchema"][K_51] ? T_133 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_134 ? T_134 extends TargetTable & string ? T_134 extends keyof S ? { [K_52 in keyof ResolvedRegistryWithSchemas<S, R>[T_134]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_134]["rawSchema"][K_52] extends infer T_135 ? T_135 extends ResolvedRegistryWithSchemas<S, R>[T_134]["rawSchema"][K_52] ? T_135 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_52 : never]: (ResolvedRegistryWithSchemas<S, R>[T_134]["rawSchema"][K_52] extends infer T_136 ? T_136 extends ResolvedRegistryWithSchemas<S, R>[T_134]["rawSchema"][K_52] ? T_136 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_137 ? T_137 extends TargetTable & string ? T_137 extends keyof S ? { [K_53 in keyof ResolvedRegistryWithSchemas<S, R>[T_137]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_137]["rawSchema"][K_53] extends infer T_138 ? T_138 extends ResolvedRegistryWithSchemas<S, R>[T_137]["rawSchema"][K_53] ? T_138 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_53 : never]: (ResolvedRegistryWithSchemas<S, R>[T_137]["rawSchema"][K_53] extends infer T_139 ? T_139 extends ResolvedRegistryWithSchemas<S, R>[T_137]["rawSchema"][K_53] ? T_139 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? TargetTable & string extends infer T_140 ? T_140 extends TargetTable & string ? T_140 extends keyof S ? { [K_54 in keyof ResolvedRegistryWithSchemas<S, R>[T_140]["rawSchema"] as (ResolvedRegistryWithSchemas<S, R>[T_140]["rawSchema"][K_54] extends infer T_141 ? T_141 extends ResolvedRegistryWithSchemas<S, R>[T_140]["rawSchema"][K_54] ? T_141 extends {
        config: {
            sql: {
                type: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
                schema: () => any;
            };
        };
    } ? true : false : never : never) extends true ? K_54 : never]: (ResolvedRegistryWithSchemas<S, R>[T_140]["rawSchema"][K_54] extends infer T_142 ? T_142 extends ResolvedRegistryWithSchemas<S, R>[T_140]["rawSchema"][K_54] ? T_142 extends {
        config: {
            sql: {
                schema: () => infer TargetSchema;
            };
        };
    } ? TargetSchema extends {
        _tableName: infer TableName;
    } ? TableName : never : never : never : never) extends infer TargetTable ? TargetTable extends keyof S ? /*elided*/ any : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never : never : never; } : {} : never : never) ? T_99 extends object ? { [K_33 in keyof T_99]?: boolean | (T_99[K_33] extends infer T_100 ? T_100 extends T_99[K_33] ? T_100 extends object ? { [K_34 in keyof T_100]?: boolean | (T_100[K_34] extends infer T_101 ? T_101 extends T_100[K_34] ? T_101 extends object ? { [K_35 in keyof T_101]?: boolean | (T_101[K_35] extends infer T_102 ? T_102 extends T_101[K_35] ? T_102 extends object ? { [K_36 in keyof T_102]?: boolean | (T_102[K_36] extends infer T_103 ? T_103 extends T_102[K_36] ? T_103 extends object ? { [K_37 in keyof T_103]?: boolean | (T_103[K_37] extends infer T_104 ? T_104 extends T_103[K_37] ? T_104 extends object ? { [K_38 in keyof T_104]?: boolean | (T_104[K_38] extends infer T_105 ? T_105 extends T_104[K_38] ? T_105 extends object ? { [K_39 in keyof T_105]?: boolean | (T_105[K_39] extends infer T_106 ? T_106 extends T_105[K_39] ? T_106 extends object ? { [K_40 in keyof T_106]?: boolean | (T_106[K_40] extends infer T_107 ? T_107 extends T_106[K_40] ? T_107 extends object ? { [K_41 in keyof T_107]?: boolean | (T_107[K_41] extends infer T_108 ? T_108 extends T_107[K_41] ? T_108 extends object ? { [K_42 in keyof T_108]?: boolean | (T_108[K_42] extends infer T_109 ? T_109 extends T_108[K_42] ? T_109 extends object ? { [K_43 in keyof T_109]?: boolean | /*elided*/ any; } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never); } : never : never : never;
}; };
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
    } ? Key extends "zodSqlSchema" ? never : K : K : never]: T[K] extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
        config: {
            [P in Key]: infer ZodSchema extends z.ZodTypeAny;
        };
    } ? ZodSchema : never : T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany";
                schema: () => infer S;
            };
        };
    } ? S extends {
        _tableName: string;
    } ? z.ZodArray<z.ZodObject<Prettify<DeriveSchemaByKey<S, Key, [...Depth, 1]>>>> : never : T[K] extends {
        config: {
            sql: {
                schema: () => infer S;
            };
        };
    } ? S extends {
        _tableName: string;
    } ? z.ZodObject<Prettify<DeriveSchemaByKey<S, Key, [...Depth, 1]>>> : z.ZodObject<any> : T[K] extends {
        type: "reference";
        to: () => infer RefField;
    } ? RefField extends {
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
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K]: T[K] extends Reference<infer TGetter> ? ReturnType<TGetter> extends {
        config: {
            initialValue: infer D;
        };
    } ? D extends () => infer R ? R : D : never : T[K] extends {
        config: {
            sql: infer SqlConfig;
            initialValue: infer D;
        };
    } ? SqlConfig extends {
        type: "hasMany" | "manyToMany";
        schema: () => infer S;
    } ? Array<DeriveDefaults<S, [...Depth, 1]>> : SqlConfig extends {
        type: "hasOne" | "belongsTo";
        schema: () => infer S;
    } ? DeriveDefaults<S, [...Depth, 1]> : D extends () => infer R ? R : D : T[K] extends {
        type: "reference";
        to: () => infer RefField;
    } ? RefField extends {
        config: {
            initialValue: infer D;
        };
    } ? D extends () => infer R ? R : D : never : never;
}>;
export type InferFromSchema<T extends {
    _tableName: string;
}> = Prettify<{
    SqlSchema: z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodSqlSchema">>>;
    ClientSchema: z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientSchema">>>;
    ValidationSchema: z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodValidationSchema">>>;
    Sql: z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodSqlSchema">>>>;
    Client: z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodClientSchema">>>>;
    Validation: z.infer<z.ZodObject<Prettify<DeriveSchemaByKey<T, "zodValidationSchema">>>>;
    Defaults: DeriveDefaults<T>;
}>;
export {};
