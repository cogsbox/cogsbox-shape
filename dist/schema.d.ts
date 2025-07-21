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
        <const TValue>(value: TValue extends (...args: any[]) => void | undefined ? never : TValue): TValue extends (...args: any[]) => infer R ? R extends void | undefined ? never : TValue extends z.ZodTypeAny ? Prettify<Builder<"new", T, TSql, TValue, z.infer<TValue>, CollapsedUnion<TSql, TValue>, // <-- FIX
        CollapsedUnion<TSql, TValue>>> : R extends string | number | boolean ? Prettify<Builder<"new", T, TSql, z.ZodLiteral<R>, R, CollapsedUnion<TSql, z.ZodLiteral<R>>, // <-- FIX
        CollapsedUnion<TSql, z.ZodLiteral<R>>>> : Prettify<Builder<"new", T, TSql, ZodTypeFromPrimitive<R>, R, CollapsedUnion<TSql, ZodTypeFromPrimitive<R>>, // <-- FIX
        CollapsedUnion<TSql, ZodTypeFromPrimitive<R>>>> : TValue extends z.ZodTypeAny ? Prettify<Builder<"new", T, TSql, TValue, z.infer<TValue>, CollapsedUnion<TSql, TValue>, // <-- FIX
        CollapsedUnion<TSql, TValue>>> : TValue extends string | number | boolean ? Prettify<Builder<"new", T, TSql, z.ZodLiteral<TValue>, TValue, CollapsedUnion<TSql, z.ZodLiteral<TValue>>, // <-- FIX
        CollapsedUnion<TSql, z.ZodLiteral<TValue>>>> : Prettify<Builder<"new", T, TSql, ZodTypeFromPrimitive<TValue>, TValue, CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue>>, // <-- FIX
        CollapsedUnion<TSql, ZodTypeFromPrimitive<TValue>>>>;
        <const TValue, TSchema extends z.ZodTypeAny>(value: TValue extends (...args: any[]) => void | undefined ? never : TValue, schemaModifier: (baseSchema: TValue extends () => infer R ? R extends string | number | boolean ? z.ZodLiteral<R> : ZodTypeFromPrimitive<R> : TValue extends string | number | boolean ? z.ZodLiteral<TValue> : ZodTypeFromPrimitive<TValue>) => TSchema): Prettify<Builder<"new", T, TSql, TSchema, TValue extends () => infer R ? R : TValue, CollapsedUnion<TSql, TSchema>, // <-- FIX
        CollapsedUnion<TSql, TSchema>>>;
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
interface ShapeAPI {
    sql: <T extends SQLType>(sqlConfig: T) => Builder<"sql", T, SQLToZodType<T, false>, SQLToZodType<T, false>, z.infer<SQLToZodType<T, false>>, SQLToZodType<T, false>, SQLToZodType<T, false>>;
    hasMany: <T extends Schema<any>, CreateSchema extends ReturnType<typeof createSchema<T>>>(config: {
        fromKey: string;
        toKey: () => T[keyof T];
        schema: () => T;
        defaultCount?: number;
    }) => Builder<"relation", RelationConfig<T>, z.ZodArray<CreateSchema["sqlSchema"]>, z.ZodArray<CreateSchema["clientSchema"]>, any[], z.ZodArray<CreateSchema["clientSchema"]>, z.ZodArray<CreateSchema["validationSchema"]>>;
    hasOne: <T extends Schema<any>, CreateSchema extends ReturnType<typeof createSchema<T>>>(config: {
        fromKey: string;
        toKey: () => T[keyof T];
        schema: () => T;
    }) => Builder<"relation", RelationConfig<T>, z.ZodArray<CreateSchema["sqlSchema"]>, z.ZodArray<CreateSchema["clientSchema"]>, any[], z.ZodArray<CreateSchema["clientSchema"]>, z.ZodArray<CreateSchema["validationSchema"]>>;
    manyToMany: <T extends Schema<any>>(config: {
        fromKey: string;
        toKey: () => any;
        schema: () => T;
        defaultCount?: number;
    }) => Builder<"relation", RelationConfig<T>, z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>, any[], z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>>;
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
    [K in keyof T]: K extends string ? EnrichedField<K, T[K], T> : T[K];
};
export declare const SchemaWrapperBrand: unique symbol;
export declare function schema<T extends ShapeSchema>(schema: T): Prettify<EnrichFields<T> & {
    _tableName: T["_tableName"];
}>;
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
export type ShapeSchema = {
    _tableName: string;
    [SchemaWrapperBrand]?: true;
    [key: string]: string | ((id: number) => string) | ValidShapeField | true | undefined;
};
type Relation<U extends Schema<any>> = {
    type: RelationType;
    fromKey: string;
    toKey: () => SchemaField;
    schema: U;
    defaultCount?: number;
};
export declare function createMixedValidationSchema<T extends Schema<any>>(schema: T, clientSchema?: z.ZodObject<any>, dbSchema?: z.ZodObject<any>): z.ZodObject<any>;
type InferSchemaByKey<T, Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K]: T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany";
                schema: () => infer S;
            };
        };
    } ? z.ZodArray<S extends {
        _tableName: string;
    } ? z.ZodObject<Omit<InferSchemaByKey<S, Key, [...Depth, 1]>, typeof SchemaWrapperBrand>> : z.ZodObject<any>> : T[K] extends {
        config: {
            sql: {
                type: "hasOne" | "belongsTo";
                schema: () => infer S;
            };
        };
    } ? S extends {
        _tableName: string;
    } ? z.ZodObject<Omit<InferSchemaByKey<S, Key, [...Depth, 1]>, typeof SchemaWrapperBrand>> : z.ZodObject<any> : T[K] extends {
        type: "reference";
        to: () => infer RefField;
    } ? RefField extends {
        config: {
            [P in Key]: infer ZodSchema;
        };
    } ? ZodSchema : never : T[K] extends {
        config: infer Config;
    } ? Key extends "zodSqlSchema" ? Config extends {
        sql: infer SqlConfig;
        zodSqlSchema: infer ZodSchema extends z.ZodTypeAny;
    } ? ZodSchema : never : Config extends {
        [P in Key]: infer ZodSchema extends z.ZodTypeAny;
    } ? ZodSchema : never : never;
};
type InferSqlSchema<T> = InferSchemaByKey<T, "zodSqlSchema">;
type InferClientSchema<T> = InferSchemaByKey<T, "zodClientSchema">;
type InferValidationSchema<T> = InferSchemaByKey<T, "zodValidationSchema">;
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
type RelationBuilders<TSchema> = {
    reference: <TField extends object>(fieldGetter: () => TField) => {
        type: "reference";
        to: () => TField;
    };
    hasMany: <T extends Schema<any>, K extends keyof T & string, TField extends EnrichedField<K, T[K], T>>(config: {
        fromKey: keyof TSchema & string;
        toKey: () => TField;
        defaultCount?: number;
    }) => Builder<"relation", BaseRelationConfig<TField["__parentTableType"]> & {
        type: "hasMany";
    }, z.ZodArray<z.ZodObject<InferSqlSchema<TField["__parentTableType"]>>>, z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>, any[], z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>, z.ZodArray<z.ZodObject<InferValidationSchema<TField["__parentTableType"]>>>>;
    hasOne: <T extends Schema<any>, K extends keyof T & string, TField extends EnrichedField<K, T[K], T>>(config: {
        fromKey: keyof TSchema & string;
        toKey: () => TField;
    }) => Builder<"relation", BaseRelationConfig<TField["__parentTableType"]> & {
        type: "hasOne";
    }, z.ZodArray<z.ZodObject<InferSqlSchema<TField["__parentTableType"]>>>, z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>, any, z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>, z.ZodArray<z.ZodObject<InferValidationSchema<TField["__parentTableType"]>>>>;
    manyToMany: <T extends Schema<any>>(config: {
        fromKey: keyof TSchema & string;
        toKey: () => T[keyof T];
        schema: () => T;
        defaultCount?: number;
    }) => Builder<"relation", BaseRelationConfig<T> & {
        type: "manyToMany";
    }, z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>, any[], z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>>;
};
export declare function schemaRelations<TSchema extends Schema<any>, RefObject extends Record<string, any>>(baseSchema: TSchema, referencesBuilder: (rel: RelationBuilders<TSchema>) => RefObject): {
    [K in keyof RefObject]: RefObject[K] & {
        __meta: {
            _key: K;
            _fieldType: RefObject[K];
        };
        __parentTableType: TSchema & RefObject;
    };
};
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type DeriveSchemaByKey<T, Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K extends keyof T ? T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany" | "hasOne" | "belongsTo";
            };
        };
    } ? Key extends "zodSqlSchema" ? never : K : K : never]: T[K] extends {
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
            [P in Key]: infer ZodSchema;
        };
    } ? ZodSchema : never : T[K] extends {
        config: {
            [P in Key]: infer ZodSchema extends z.ZodTypeAny;
        };
    } ? ZodSchema : never;
};
type DeriveDefaults<T, Depth extends any[] = []> = Prettify<Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K]: T[K] extends {
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
