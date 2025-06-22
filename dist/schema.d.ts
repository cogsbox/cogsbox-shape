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
interface IBuilderMethods<T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> {
    initialState: {
        <TDefaultNext>(defaultValue: () => TDefaultNext): Prettify<Builder<"new", T, TSql, TSql, TDefaultNext, TSql, TSql>>;
        <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: ((tools: {
            sql: TSql;
        }) => TNewNext) | TNewNext, defaultValue: () => TDefaultNext): Prettify<Builder<"new", T, TSql, TNewNext, z.infer<TNewNext>, InferSmartClientType<TSql, TNewNext>, InferSmartClientType<TSql, TNewNext>>>;
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
type RelationConfig<T extends Schema<any>> = (BaseRelationConfig<T> & {
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
    relation: "initialState" | "client" | "validation" | "transform";
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
    hasMany: <T extends Schema<any>>(config: {
        fromKey: string;
        toKey: () => any;
        schema: () => T;
        defaultCount?: number;
    }) => Builder<"relation", RelationConfig<T>, z.ZodArray<z.ZodAny>, z.ZodArray<z.ZodAny>, any[], z.ZodArray<z.ZodAny>, z.ZodArray<z.ZodAny>>;
    hasOne: <T extends Schema<any>>(config: {
        fromKey: string;
        toKey: () => any;
        schema: () => T;
    }) => Builder<"relation", RelationConfig<T>, z.ZodAny, z.ZodAny, any, z.ZodAny, z.ZodAny>;
    manyToMany: <T extends Schema<any>>(config: {
        fromKey: string;
        toKey: () => any;
        schema: () => T;
        defaultCount?: number;
    }) => Builder<"relation", RelationConfig<T>, z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>, any[], z.ZodOptional<z.ZodArray<z.ZodAny>>, z.ZodOptional<z.ZodArray<z.ZodAny>>>;
}
export declare const shape: ShapeAPI;
declare function createBuilder<TStage extends "sql" | "relation" | "new" | "client" | "validation", T extends SQLType | RelationConfig<any>, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny>(config: {
    stage: TStage;
    sqlConfig: T;
    sqlZod: TSql;
    newZod: TNew;
    initialValue: TInitialValue;
    clientZod: TClient;
    validationZod: TValidation;
    completedStages?: Set<string>;
}): Builder<TStage, T, TSql, TNew, TInitialValue, TClient, TValidation>;
export declare function hasMany<T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => T[keyof T];
    schema: () => T;
    defaultCount?: number;
}): () => {
    type: "hasMany";
    fromKey: string;
    toKey: T[keyof T];
    schema: T;
    defaultCount: number | undefined;
};
export declare function hasOne<T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => T[keyof T];
    schema: () => T;
}): () => {
    type: "hasOne";
    fromKey: string;
    toKey: T[keyof T];
    schema: T;
};
export declare function belongsTo<T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => T[keyof T];
    schema: () => T;
}): () => {
    type: "belongsTo";
    fromKey: string;
    toKey: T[keyof T];
    schema: T;
};
export declare function manyToMany<T extends Schema<any>>(config: {
    fromKey: string;
    toKey: () => T[keyof T];
    schema: () => T;
    defaultCount?: number;
}): () => {
    type: "manyToMany";
    fromKey: string;
    toKey: T[keyof T];
    schema: T;
    defaultCount: number | undefined;
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
type AnyFieldDefinition = ReturnType<typeof shape.sql>;
type ReferenceField<TField extends AnyFieldDefinition> = {
    type: "reference";
    to: () => TField;
};
type SchemaField<T extends SQLType = SQLType> = BaseSchemaField<T> | ReferenceField<AnyFieldDefinition>;
export type Schema<T extends Record<string, SchemaField | (() => Relation<any>)>> = {
    _tableName: string;
    __schemaId?: string;
    [key: string]: T[keyof T] | string | ((id: number) => string) | undefined;
};
type ValidShapeField = ReturnType<typeof shape.sql>;
export type ShapeSchema = {
    _tableName: string;
    [key: string]: string | ((id: number) => string) | ValidShapeField;
};
type Relation<U extends Schema<any>> = {
    type: RelationType;
    fromKey: string;
    toKey: () => SchemaField;
    schema: U;
    defaultCount?: number;
};
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type InferDBSchema<T> = {
    [K in keyof T as K extends "_tableName" | "__schemaId" ? never : K]: T[K] extends {
        zodDbSchema: infer DbType extends z.ZodTypeAny;
    } ? DbType : T[K] extends {
        dbType: infer DbType extends z.ZodTypeAny;
    } ? DbType : T[K] extends () => {
        type: "hasMany";
        schema: infer S;
    } ? z.ZodArray<z.ZodObject<{
        [P in keyof S as P extends "_tableName" | "__schemaId" ? never : P]: S[P] extends {
            zodDbSchema: infer DbType extends z.ZodTypeAny;
        } ? DbType : never;
    }>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S;
    } ? z.ZodObject<{
        [P in keyof S as P extends "_tableName" | "__schemaId" ? never : P]: S[P] extends {
            zodDbSchema: infer DbType extends z.ZodTypeAny;
        } ? DbType : never;
    }> : never;
};
export declare function reference<TField extends object>(config: TField): {
    type: "reference";
    to: TField;
};
export declare function createMixedValidationSchema<T extends Schema<any>>(schema: T, clientSchema?: z.ZodObject<any>, dbSchema?: z.ZodObject<any>): z.ZodObject<any>;
type SchemaDefinition = {
    _tableName: string;
    [key: string]: any;
};
type InferSchemaByKey<T, Key extends "zodSqlSchema" | "zodClientSchema" | "zodValidationSchema"> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            [P in Key]: infer S extends z.ZodTypeAny;
        };
    } ? S : T[K] extends {
        type: "reference";
        to: () => {
            config: {
                [P in Key]: infer S extends z.ZodTypeAny;
            };
        };
    } ? S : T[K] extends () => {
        type: "hasMany" | "manyToMany";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodArray<z.ZodObject<Prettify<InferSchemaByKey<S, Key>>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodObject<Prettify<InferSchemaByKey<S, Key>>> : never;
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
}>(schema: T): {
    sqlSchema: z.ZodObject<Prettify<InferSqlSchema<T>>>;
    clientSchema: z.ZodObject<Prettify<InferClientSchema<T>>>;
    validationSchema: z.ZodObject<Prettify<InferValidationSchema<T>>>;
    defaultValues: Prettify<InferDefaultValues2<T>>;
};
export type InferSchemaTypes<T extends {
    _tableName: string;
} & {
    [key: string]: any;
}> = Prettify<{
    /** The TypeScript type for data as it exists in the database. */
    sql: z.infer<ReturnType<typeof createSchema<T>>["sqlSchema"]>;
    /** The TypeScript type for data as it is represented on the client. */
    client: z.infer<ReturnType<typeof createSchema<T>>["clientSchema"]>;
    /** The TypeScript type for data during validation, often the most flexible shape. */
    validation: z.infer<ReturnType<typeof createSchema<T>>["validationSchema"]>;
    /** The TypeScript type for the default values object. */
    defaults: ReturnType<typeof createSchema<T>>["defaultValues"];
}>;
export {};
