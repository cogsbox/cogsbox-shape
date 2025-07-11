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
    type: "date" | "datetime";
    nullable?: boolean;
    default?: "CURRENT_TIMESTAMP";
    defaultValue?: Date;
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
type BaseConfig = {
    nullable?: boolean;
    pk?: true;
    field?: string;
};
type IntConfig = BaseConfig & {
    default?: number;
};
type BooleanConfig = BaseConfig & {
    default?: boolean;
};
type DateConfig = BaseConfig & {
    type?: "date" | "datetime";
    default?: Date;
};
type StringConfig = BaseConfig & {
    length?: number;
    default?: string;
};
type SQLToZodType<T extends SQLType, TDefault extends boolean> = T["pk"] extends true ? TDefault extends true ? z.ZodString : z.ZodNumber : T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodNullable<z.ZodString> : T["type"] extends "int" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "boolean" ? z.ZodNullable<z.ZodBoolean> : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodNullable<z.ZodDate> : z.ZodNullable<z.ZodDate> : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodString : T["type"] extends "int" ? z.ZodNumber : T["type"] extends "boolean" ? z.ZodBoolean : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodDate : z.ZodDate : never;
type ZodTypeFromPrimitive<T> = T extends string ? z.ZodString : T extends number ? z.ZodNumber : T extends boolean ? z.ZodBoolean : T extends Date ? z.ZodDate : z.ZodAny;
type IsLiteralType<T> = T extends string ? string extends T ? false : true : T extends number ? number extends T ? false : true : T extends boolean ? boolean extends T ? false : true : false;
interface IBuilderMethods<T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> {
    initialState: {
        <const TResult>(defaultValue: TResult): TResult extends () => infer R ? R extends z.ZodTypeAny ? Prettify<Builder<"new", T, TSql, R, z.infer<R>, InferSmartClientType<TSql, R>, InferSmartClientType<TSql, R>>> : Prettify<Builder<"new", T, TSql, z.ZodLiteral<R>, R, z.ZodUnion<[TSql, z.ZodLiteral<R>]>, z.ZodUnion<[TSql, z.ZodLiteral<R>]>>> : TResult extends z.ZodTypeAny ? Prettify<Builder<"new", T, TSql, TResult, z.infer<TResult>, InferSmartClientType<TSql, TResult>, InferSmartClientType<TSql, TResult>>> : TResult extends string | number | boolean ? Prettify<Builder<"new", T, TSql, z.ZodLiteral<TResult>, TResult, z.ZodUnion<[TSql, z.ZodLiteral<TResult>]>, z.ZodUnion<[TSql, z.ZodLiteral<TResult>]>>> : Prettify<Builder<"new", T, TSql, ZodTypeFromPrimitive<TResult>, TResult, InferSmartClientType<TSql, ZodTypeFromPrimitive<TResult>>, InferSmartClientType<TSql, ZodTypeFromPrimitive<TResult>>>>;
        <TNewNext extends z.ZodTypeAny, const TDefaultNext>(schema: ((tools: {
            sql: TSql;
        }) => TNewNext) | TNewNext, defaultValue: TDefaultNext): Prettify<Builder<"new", T, TSql, z.ZodUnion<[
            TNewNext,
            z.ZodLiteral<TDefaultNext extends () => infer R ? R : TDefaultNext>
        ]>, IsLiteralType<z.infer<TNewNext>> extends true ? TDefaultNext extends () => infer R ? R : TDefaultNext : z.infer<TNewNext>, z.ZodUnion<[
            TSql,
            TNewNext,
            z.ZodLiteral<TDefaultNext extends () => infer R ? R : TDefaultNext>
        ]>, z.ZodUnion<[
            TSql,
            TNewNext,
            z.ZodLiteral<TDefaultNext extends () => infer R ? R : TDefaultNext>
        ]>>>;
    };
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
    sql: "initialState" | "client" | "validation" | "transform";
    relation: "validation" | "transform";
    new: "client" | "validation" | "transform";
    client: "validation" | "transform";
    validation: "transform";
    done: never;
};
type InferSmartClientType<TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny> = z.infer<TNew> extends z.infer<TSql> ? TNew : z.ZodUnion<[TSql, TNew]>;
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
    int: (config?: IntConfig) => ReturnType<typeof createBuilder>;
    varchar: (config?: Omit<StringConfig, "type">) => ReturnType<typeof createBuilder>;
    char: (config?: Omit<StringConfig, "type">) => ReturnType<typeof createBuilder>;
    text: (config?: Omit<StringConfig, "type" | "length">) => ReturnType<typeof createBuilder>;
    longtext: (config?: Omit<StringConfig, "type" | "length">) => ReturnType<typeof createBuilder>;
    boolean: (config?: BooleanConfig) => ReturnType<typeof createBuilder>;
    date: (config?: Omit<DateConfig, "type">) => ReturnType<typeof createBuilder>;
    datetime: (config?: Omit<DateConfig, "type">) => ReturnType<typeof createBuilder>;
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
declare function createBuilder<TStage extends "sql" | "relation" | "new" | "client" | "validation", T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny>(config: {
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
}): Builder<TStage, T, TSql, TNew, TInitialValue, TClient, TValidation>;
type EnrichedField<K extends string, V, TSchema extends ShapeSchema> = V & {
    __meta: {
        _key: K;
        _fieldType: V;
    };
    __parentTableType: TSchema;
};
type EnrichFields<T extends ShapeSchema> = {
    [K in keyof T]: K extends string ? EnrichedField<K, T[K], T> : T[K];
};
declare const SchemaWrapperBrand: unique symbol;
export declare function schema<T extends ShapeSchema>(schema: T): EnrichFields<T> & {
    _tableName: T["_tableName"];
    [SchemaWrapperBrand]: true;
};
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
type SchemaDefinition = {
    _tableName: string;
    [key: string]: any;
};
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
        config: {
            [P in Key]: infer ZodSchema extends z.ZodTypeAny;
        };
    } ? ZodSchema : never;
};
type InferSqlSchema<T> = InferSchemaByKey<T, "zodSqlSchema">;
type InferClientSchema<T> = InferSchemaByKey<T, "zodClientSchema">;
type InferValidationSchema<T> = InferSchemaByKey<T, "zodValidationSchema">;
type InferDefaultValues2<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            initialValue: infer D;
        };
    } ? D : T[K] extends () => {
        type: "hasMany" | "manyToMany";
        schema: infer S extends SchemaDefinition;
        defaultCount?: number;
    } ? Array<Prettify<InferDefaultValues2<S>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S extends SchemaDefinition;
    } ? Prettify<InferDefaultValues2<S>> : never;
};
export declare function createSchema<T extends {
    _tableName: string;
    [SchemaWrapperBrand]?: true;
}, R extends Record<string, any> = {}, TActualSchema extends Omit<T & R, typeof SchemaWrapperBrand> = Omit<T & R, typeof SchemaWrapperBrand>>(schema: T, relations?: R): {
    sqlSchema: z.ZodObject<Prettify<InferSqlSchema<TActualSchema>>>;
    clientSchema: z.ZodObject<Prettify<InferClientSchema<TActualSchema>>>;
    validationSchema: z.ZodObject<Prettify<InferValidationSchema<TActualSchema>>>;
    defaultValues: Prettify<InferDefaultValues2<TActualSchema>>;
    toClient: (dbObject: z.infer<z.ZodObject<Prettify<InferSqlSchema<TActualSchema>>>>) => z.infer<z.ZodObject<Prettify<InferClientSchema<TActualSchema>>>>;
    toDb: (clientObject: z.infer<z.ZodObject<Prettify<InferClientSchema<TActualSchema>>>>) => z.infer<z.ZodObject<Prettify<InferSqlSchema<TActualSchema>>>>;
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
    }) => Builder<"relation", RelationConfig<TField["__parentTableType"]>, z.ZodArray<z.ZodObject<InferSqlSchema<TField["__parentTableType"]>>>, z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>, any[], z.ZodArray<z.ZodObject<InferClientSchema<TField["__parentTableType"]>>>, z.ZodArray<z.ZodObject<InferValidationSchema<TField["__parentTableType"]>>>>;
    hasOne: <T extends Schema<any>>(config: {
        fromKey: keyof TSchema & string;
        toKey: () => T[keyof T];
        schema: () => T;
    }) => Builder<"relation", RelationConfig<T>, z.ZodArray<any>, z.ZodArray<any>, any[], z.ZodArray<any>, z.ZodArray<any>>;
    manyToMany: <T extends Schema<any>>(config: {
        fromKey: keyof TSchema & string;
        toKey: () => T[keyof T];
        schema: () => T;
        defaultCount?: number;
    }) => Builder<"relation", RelationConfig<T>, z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>, any[], z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>>;
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
/**
 * [INTERNAL] Core recursive utility to inspect the schema definition.
 * It iterates through the schema, finds the `config` object in each
 * builder, and extracts the specified Zod schema.
 */
type InferByKey<T, Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema", Depth extends any[] = []> = Depth["length"] extends 10 ? any : {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K]: T[K] extends {
        config: {
            sql: {
                type: "hasMany" | "manyToMany";
                schema: () => infer S;
            };
        };
    } ? z.ZodArray<S extends {
        _tableName: string;
    } ? z.ZodObject<Prettify<InferByKey<S, Key, [...Depth, 1]>>> : z.ZodObject<any>> : T[K] extends {
        config: {
            sql: {
                type: "hasOne" | "belongsTo";
                schema: () => infer S;
            };
        };
    } ? S extends {
        _tableName: string;
    } ? z.ZodObject<Prettify<InferByKey<S, Key, [...Depth, 1]>>> : z.ZodObject<any> : T[K] extends {
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
/**
 * [INTERNAL] Core utility to infer default values directly from the schema definition.
 */
type InferDefaults<T> = {
    [K in keyof T as K extends "_tableName" | typeof SchemaWrapperBrand ? never : K]: T[K] extends {
        config: {
            initialValue: infer D;
        };
    } ? D extends () => infer R ? R : D : never;
};
/**
 * A new, non-conflicting namespace for directly inferring types from your schema definitions.
 * This is more performant than using `ReturnType<typeof createSchema>`.
 */
export declare namespace Infer {
    /**
     * Directly infers the Zod schema for the **SQL (database)** layer.
     */
    type SqlSchema<T extends {
        _tableName: string;
    }> = z.ZodObject<Prettify<InferByKey<T, "zodSqlSchema">>>;
    /**
     * Directly infers the Zod schema for the **Client** layer.
     */
    type ClientSchema<T extends {
        _tableName: string;
    }> = z.ZodObject<Prettify<InferByKey<T, "zodClientSchema">>>;
    /**
     * Directly infers the Zod schema for the **Validation** layer.
     */
    type ValidationSchema<T extends {
        _tableName: string;
    }> = z.ZodObject<Prettify<InferByKey<T, "zodValidationSchema">>>;
    /** The TypeScript type for data as it exists in the database. */
    type Sql<T extends {
        _tableName: string;
    }> = z.infer<SqlSchema<T>>;
    /** The TypeScript type for data as it is represented on the client. */
    type Client<T extends {
        _tableName: string;
    }> = z.infer<ClientSchema<T>>;
    /** The TypeScript type for validation data, often the most flexible shape. */
    type Validation<T extends {
        _tableName: string;
    }> = z.infer<ValidationSchema<T>>;
    /** The TypeScript type for the default values object. */
    type Defaults<T extends {
        _tableName: string;
    }> = Prettify<InferDefaults<T>>;
}
export {};
