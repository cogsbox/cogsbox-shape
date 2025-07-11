import { z } from "zod";
import { type JsonSchema7Type } from "zod-to-json-schema";
type CurrentTimestampConfig = {
    default: "CURRENT_TIMESTAMP";
    defaultValue: Date;
};
export declare const isFunction: (fn: unknown) => fn is Function;
export declare function currentTimeStamp(): CurrentTimestampConfig;
type SQLType = ({
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
type SQLToDefaultType<T extends SQLType> = T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? string | null : T["type"] extends "int" ? number | null : T["type"] extends "boolean" ? boolean | null : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? never : Date | null : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? string : T["type"] extends "int" ? number : T["type"] extends "boolean" ? boolean : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? never : Date : never;
type SQLToZodType<T extends SQLType, TDefault extends boolean> = T["pk"] extends true ? TDefault extends true ? z.ZodString : z.ZodNumber : T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodNullable<z.ZodString> : T["type"] extends "int" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "boolean" ? z.ZodNullable<z.ZodBoolean> : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodNullable<z.ZodDate> : z.ZodNullable<z.ZodDate> : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodString : T["type"] extends "int" ? z.ZodNumber : T["type"] extends "boolean" ? z.ZodBoolean : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodDate : z.ZodDate : never;
type CustomTransform<DbType, ClientType> = {
    toClient: (dbValue: DbType) => ClientType;
    toDb: (clientValue: ClientType) => DbType;
};
export declare function createTransforms<TTransforms extends Record<string, CustomTransform<any, any>>>(transforms: TTransforms): {
    sql: <T extends SQLType>(config: T) => {
        sql: T;
        dbType: SQLToZodType<T, false>;
        zodDbSchema: SQLToZodType<T, false>;
        zodClientSchema: SQLToZodType<T, true>;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: SQLToZodType<T, true>;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: T;
            zodDbSchema: SQLToZodType<T, false>;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never;
            }) => {
                sql: T;
                zodDbSchema: SQLToZodType<T, false>;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(dbType: ({ zod }: {
            zod: SQLToZodType<T, false>;
        }) => ServerType) => {
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: SQLToZodType<T, true>;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: T;
                zodDbSchema: SQLToZodType<T, false> | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never;
                }) => {
                    sql: T;
                    zodDbSchema: SQLToZodType<T, false> | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            sql: T;
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: SQLToZodType<T, true>;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
        };
    };
};
export declare const shape: {
    int: (config?: IntConfig) => {
        sql: {
            nullable?: boolean;
            pk?: true;
            field?: string;
            default?: number;
            type: "int";
        };
        dbType: z.ZodNumber;
        zodDbSchema: z.ZodNumber;
        zodClientSchema: z.ZodNumber;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: number;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodNumber;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            };
            zodDbSchema: z.ZodNumber;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: number) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => number;
            }) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodDbSchema: z.ZodNumber;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: number) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => number;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodNumber;
        }) => ServerType)) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodNumber;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodNumber;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodDbSchema: z.ZodNumber | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: number) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => number;
                }) => {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodDbSchema: z.ZodNumber | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: number) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => number;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    varchar: (config?: Omit<StringConfig, "type">) => {
        sql: {
            pk?: true;
            nullable?: boolean;
            default?: string;
            length?: number;
            field?: string;
            type: "varchar";
        };
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodString;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodString;
        }) => ServerType)) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodString;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodString;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodDbSchema: z.ZodString | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodDbSchema: z.ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    char: (config?: Omit<StringConfig, "type">) => {
        sql: {
            pk?: true;
            nullable?: boolean;
            default?: string;
            length?: number;
            field?: string;
            type: "char";
        };
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodString;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodString;
        }) => ServerType)) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodString;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodString;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodDbSchema: z.ZodString | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodDbSchema: z.ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    text: (config?: Omit<StringConfig, "type" | "length">) => {
        sql: {
            pk?: true;
            nullable?: boolean;
            default?: string;
            field?: string;
            type: "text";
        };
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodString;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodString;
        }) => ServerType)) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodString;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodString;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                };
                zodDbSchema: z.ZodString | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    };
                    zodDbSchema: z.ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    longtext: (config?: Omit<StringConfig, "type" | "length">) => {
        sql: {
            pk?: true;
            nullable?: boolean;
            default?: string;
            field?: string;
            type: "longtext";
        };
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodString;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodString;
        }) => ServerType)) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodString;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodString;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                };
                zodDbSchema: z.ZodString | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    };
                    zodDbSchema: z.ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    boolean: (config?: BooleanConfig) => {
        sql: {
            nullable?: boolean;
            pk?: true;
            field?: string;
            default?: boolean;
            type: "boolean";
        };
        dbType: z.ZodBoolean;
        zodDbSchema: z.ZodBoolean;
        zodClientSchema: z.ZodBoolean;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: boolean;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodBoolean;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            };
            zodDbSchema: z.ZodBoolean;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: boolean) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => boolean;
            }) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodDbSchema: z.ZodBoolean;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: boolean) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => boolean;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodBoolean;
        }) => ServerType)) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodBoolean;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodBoolean;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodDbSchema: z.ZodBoolean | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: boolean) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => boolean;
                }) => {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodDbSchema: z.ZodBoolean | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: boolean) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => boolean;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    date: (config?: Omit<DateConfig, "type">) => {
        sql: {
            pk?: true;
            nullable?: boolean;
            default?: Date;
            field?: string;
            type: "date";
        };
        dbType: z.ZodDate;
        zodDbSchema: z.ZodDate;
        zodClientSchema: z.ZodDate;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: Date;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodDate;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            };
            zodDbSchema: z.ZodDate;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => Date;
            }) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                };
                zodDbSchema: z.ZodDate;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => Date;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodDate;
        }) => ServerType)) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodDate;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodDate;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                };
                zodDbSchema: z.ZodDate | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => Date;
                }) => {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    };
                    zodDbSchema: z.ZodDate | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => Date;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    datetime: (config?: Omit<DateConfig, "type">) => {
        sql: {
            pk?: true;
            nullable?: boolean;
            default?: Date;
            field?: string;
            type: "datetime";
        };
        dbType: z.ZodDate;
        zodDbSchema: z.ZodDate;
        zodClientSchema: z.ZodDate;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: Date;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodDate;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            };
            zodDbSchema: z.ZodDate;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => Date;
            }) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                };
                zodDbSchema: z.ZodDate;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => Date;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodDate;
        }) => ServerType)) => {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodDate;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodDate;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                };
                zodDbSchema: z.ZodDate | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => Date;
                }) => {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    };
                    zodDbSchema: z.ZodDate | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: Date) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => Date;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    sql: <T extends SQLType>(sqlConfig: T) => {
        sql: T;
        dbType: SQLToZodType<T, false>;
        zodDbSchema: SQLToZodType<T, false>;
        zodClientSchema: SQLToZodType<T, true>;
        jsonSchema: JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: JsonSchema7Type;
            } | undefined;
        };
        defaultValue: SQLToDefaultType<T>;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: SQLToZodType<T, true>;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: T;
            zodDbSchema: SQLToZodType<T, false>;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never;
            }) => {
                sql: T;
                zodDbSchema: SQLToZodType<T, false>;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : never : never : never;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ((tools: {
            zod: SQLToZodType<T, false>;
        }) => ServerType) | ServerType) => {
            sql: T;
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: SQLToZodType<T, true>;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.infer<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: SQLToZodType<T, true>;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: T;
                zodDbSchema: SQLToZodType<T, false> | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never;
                }) => {
                    sql: T;
                    zodDbSchema: SQLToZodType<T, false> | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => SQLToZodType<T, false> extends infer T_1 ? T_1 extends SQLToZodType<T, false> ? T_1 extends z.ZodTypeAny ? z.TypeOf<SQLToZodType<T, false>> : ServerType extends z.ZodTypeAny ? z.TypeOf<ServerType> : any : never : never;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
    sql2: <T extends SQLType>(sqlConfig: T) => Builder<"sql", T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
};
type Builder<TStage extends "sql" | "new" | "client" | "validation", T extends SQLType, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    config: {
        sql: T;
        zodSqlSchema: TSql;
        zodNewSchema: TNew;
        initialValue: TInitialValue;
        zodClientSchema: TClient;
        zodValidationSchema: TValidation;
    };
} & (TStage extends "sql" ? {
    initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: ((tools: {
        sql: TSql;
    }) => TNewNext) | TNewNext, defaultValue: () => TDefaultNext) => Prettify<Builder<"new", T, TSql, TNewNext, TDefaultNext, TSql, TSql>>;
    client: <TClientNext extends z.ZodTypeAny>(assert: ((tools: {
        sql: TSql;
        initialState: TNew;
    }) => TClientNext) | TClientNext) => Prettify<Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>>;
    validation: <TValidationNext extends z.ZodTypeAny>(assert: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"validation", T, TSql, TNew, TInitialValue, TClient, TValidationNext>>;
} : TStage extends "new" ? {
    client: <TClientNext extends z.ZodTypeAny>(assert: ((tools: {
        sql: TSql;
        initialState: TNew;
    }) => TClientNext) | TClientNext) => Prettify<Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>>;
    validation: <TValidationNext extends z.ZodTypeAny>(assert: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"validation", T, TSql, TNew, TInitialValue, TClient, TValidationNext>>;
} : TStage extends "client" ? {
    validation: <TValidationNext extends z.ZodTypeAny>(assert: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"validation", T, TSql, TNew, TInitialValue, TClient, TValidationNext>>;
} : TStage extends "validation" ? {
    transform: (transforms: {
        toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
        toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
        config: {
            sql: T;
            zodSqlSchema: TSql;
            zodNewSchema: TNew;
            initialValue: TInitialValue;
            zodClientSchema: TClient;
            zodValidationSchema: TValidation;
            transforms: {
                toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
                toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
            };
        };
    };
} : {});
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
type RelationType = "hasMany" | "belongsTo" | "hasOne" | "manyToMany";
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
type ReferenceField<TField extends AnyFieldDefinition, TTo extends SchemaField> = TField & {
    type: "reference";
    to: () => TTo;
};
type SchemaField<T extends SQLType = SQLType> = BaseSchemaField<T> | ReferenceField<AnyFieldDefinition, any>;
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
    toKey: SchemaField;
    schema: U;
    defaultCount?: number;
};
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type InferSchema<T> = {
    [K in keyof T as K extends "_tableName" | "__schemaId" ? never : K]: T[K] extends {
        zodClientSchema: infer ClientType extends z.ZodTypeAny;
        toClient?: (dbValue: any) => infer TransformedType;
    } ? T[K]["toClient"] extends Function ? z.ZodType<TransformedType> : ClientType extends z.ZodNever ? z.ZodOptional<z.ZodDate> : ClientType : T[K] extends () => {
        type: "hasMany";
        schema: infer S;
    } ? z.ZodArray<z.ZodObject<{
        [P in keyof S as P extends "_tableName" | "__schemaId" ? never : P]: S[P] extends {
            zodClientSchema: z.ZodTypeAny;
            toClient?: (dbValue: any) => any;
        } ? S[P]["toClient"] extends Function ? z.ZodType<ReturnType<S[P]["toClient"]>> : S[P]["zodClientSchema"] extends z.ZodNever ? z.ZodOptional<z.ZodDate> : S[P]["zodClientSchema"] : never;
    }>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S;
    } ? z.ZodObject<{
        [P in keyof S as P extends "_tableName" | "__schemaId" ? never : P]: S[P] extends {
            zodClientSchema: z.ZodTypeAny;
            toClient?: (dbValue: any) => any;
        } ? S[P]["toClient"] extends Function ? z.ZodType<ReturnType<S[P]["toClient"]>> : S[P]["zodClientSchema"] extends z.ZodNever ? z.ZodOptional<z.ZodDate> : S[P]["zodClientSchema"] : never;
    }> : never;
};
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
type UUID = string | `${string}-${string}-${string}-${string}-${string}`;
type InferDefaultValues<T, TDefault extends boolean = true> = {
    [K in keyof T as K extends "_tableName" | "__schemaId" ? never : K]: T[K] extends {
        sql: {
            pk: true;
        };
    } ? UUID : T[K] extends {
        defaultValue: infer U;
    } ? U : T[K] extends {
        zodClientSchema: z.ZodOptional<any>;
    } ? undefined : T[K] extends {
        zodClientSchema: z.ZodNullable<any>;
    } ? null : T[K] extends {
        zodClientSchema: z.ZodArray<any>;
    } ? z.infer<T[K]["zodClientSchema"]> | [] : T[K] extends {
        zodClientSchema: z.ZodObject<any>;
    } ? z.infer<T[K]["zodClientSchema"]> | {} : T[K] extends () => {
        type: "hasMany";
        schema: infer S;
    } ? Array<Prettify<InferDefaultValues<S>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S;
    } ? Prettify<InferDefaultValues<S>> : T[K] extends {
        zodClientSchema: z.ZodType<any>;
    } ? z.infer<T[K]["zodClientSchema"]> : never;
};
type DeepWriteable<T> = T extends Date ? T : T extends object ? {
    -readonly [K in keyof T]: DeepWriteable<T[K]>;
} : T;
export type SerializableField = {
    sql: SQLType;
    jsonSchema: JsonSchema7Type;
    defaultValue?: any;
    transforms?: {
        toClient: string;
        toDb: string;
    };
};
export type SerializableRelation = {
    type: "relation";
    relationType: "hasMany" | "hasOne" | "belongsTo" | "manyToMany";
    fromKey: string;
    toKey: SerializableField;
    defaultCount?: number;
};
export type SerializableSchema = {
    _tableName: string;
    __schemaId: string;
    _syncKey?: {
        toString: string;
    };
} & {
    [key: string]: SerializableField | (SerializableRelation & {
        schema: SerializableSchema;
    });
};
type InferSerializedSchema<T> = {
    [K in keyof T as K extends "_tableName" | "__schemaId" ? never : K]: T[K] extends {
        sql: infer S;
        zodClientSchema: any;
        defaultValue?: infer D;
    } ? {
        sql: S;
        jsonSchema: JsonSchema7Type;
        defaultValue: D;
        transforms?: {
            toClient: string;
            toDb: string;
        };
    } : T[K] extends () => {
        type: "hasMany";
        schema: infer S;
        fromKey: infer FK;
        toKey: infer TK;
    } ? {
        type: "relation";
        relationType: "hasMany";
        fromKey: FK;
        toKey: TK extends {
            sql: infer TKSQL;
            zodClientSchema: any;
            defaultValue?: infer TKD;
        } ? {
            sql: TKSQL;
            jsonSchema: JsonSchema7Type;
            defaultValue: TKD;
            transforms?: {
                toClient: string;
                toDb: string;
            };
        } : never;
        schema: Prettify<InferSerializedSchema<S>> & {
            _tableName: string;
            __schemaId: string;
        };
        defaultCount?: number;
    } : T[K] extends () => {
        type: infer R;
        schema: infer S;
        fromKey: infer FK;
        toKey: infer TK;
    } ? {
        type: "relation";
        relationType: R;
        fromKey: FK;
        toKey: TK extends {
            sql: infer TKSQL;
            zodClientSchema: any;
            defaultValue?: infer TKD;
        } ? {
            sql: TKSQL;
            jsonSchema: JsonSchema7Type;
            defaultValue: TKD;
            transforms?: {
                toClient: string;
                toDb: string;
            };
        } : never;
        schema: Prettify<InferSerializedSchema<S>> & {
            _tableName: string;
            __schemaId: string;
        };
    } : never;
};
export declare function reference<TTargetField extends SchemaField, TField extends object>(config: {
    to: () => TTargetField;
    field: TField;
}): TField & {
    type: "reference";
    to: () => TTargetField;
};
export declare function createMixedValidationSchema<T extends Schema<any>>(schema: T, clientSchema?: z.ZodObject<any>, dbSchema?: z.ZodObject<any>): z.ZodObject<any>;
type InferMixedSchema<T extends Schema<any>> = {
    [K in keyof T as K extends "_tableName" | "__schemaId" ? never : K]: T[K] extends {
        zodClientSchema: infer C;
        zodDbSchema: infer D;
    } ? C extends z.ZodTypeAny ? D extends z.ZodTypeAny ? z.ZodUnion<[C, D]> : C : D extends z.ZodTypeAny ? D : never : T[K] extends () => {
        type: "hasMany";
        schema: infer S extends Schema<any>;
    } ? z.ZodArray<z.ZodObject<InferMixedSchema<S>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S extends Schema<any>;
    } ? z.ZodObject<InferMixedSchema<S>> : never;
};
export declare function createSchema<T extends Schema<any>>(schema: T): {
    dbSchema: z.ZodObject<Prettify<InferDBSchema<T>>>;
    clientSchema: z.ZodObject<Prettify<OmitNever<InferSchema<T>>>>;
    mixedSchema: z.ZodObject<Prettify<InferMixedSchema<T>>>;
    defaultValues: Prettify<OmitNever<ConfigWithOptionalProps<T>>>;
    initialValues: () => Prettify<OmitNever<ConfigWithOptionalProps<T>>>;
    serialized: Prettify<InferSerializedSchema<T>> & {
        _tableName: string;
        __schemaId: string;
    };
};
type IsOptionalKey<T, K extends keyof T> = {} extends Pick<T, K> ? true : false;
type DeepConversionType<ClientType, DbType> = ClientType extends Date | string | number | boolean | null | undefined ? ClientType | DbType : DbType extends Date | string | number | boolean | null | undefined ? ClientType | DbType : ClientType extends Array<infer ClientItem> ? DbType extends Array<infer DbItem> ? Array<DeepConversionType<ClientItem, DbItem>> : ClientType | DbType : ClientType extends object ? DbType extends object ? {
    [K in keyof ClientType & keyof DbType as IsOptionalKey<ClientType, K> extends true ? never : IsOptionalKey<DbType, K> extends true ? never : K]: DeepConversionType<ClientType[K], DbType[K]>;
} & {
    [K in keyof (ClientType | DbType) as K extends keyof ClientType & keyof DbType ? IsOptionalKey<ClientType, K> extends true ? K : IsOptionalKey<DbType, K> extends true ? K : never : K]?: K extends keyof ClientType ? K extends keyof DbType ? DeepConversionType<ClientType[K], DbType[K]> : ClientType[K] : K extends keyof DbType ? DbType[K] : never;
} : ClientType | DbType : ClientType | DbType;
type ConversionType<T extends Schema<any>> = DeepConversionType<SchemaTypes<T>["client"], SchemaTypes<T>["db"]>;
type OmitNever<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
};
type DefaultValue<T> = Prettify<DeepWriteable<InferDefaultValues<T>>>;
type GetMandatoryKeys<T> = {
    [P in keyof T]: T[P] extends Exclude<T[P], undefined> ? P : never;
}[keyof T];
type MandatoryProps<T> = Pick<DefaultValue<T>, GetMandatoryKeys<DefaultValue<T>>>;
type ConfigWithOptionalProps<T> = Partial<DefaultValue<T>> & MandatoryProps<T>;
export type SchemaTypes<T extends Schema<any>> = {
    client: z.infer<typeof createSchema<T> extends (...args: any) => {
        clientSchema: infer R;
    } ? R : never>;
    db: z.infer<typeof createSchema<T> extends (...args: any) => {
        dbSchema: infer R;
    } ? R : never>;
    both: z.infer<typeof createSchema<T> extends (...args: any) => {
        clientSchema: infer C;
        dbSchema: infer D;
    } ? C | D : never>;
    join: Prettify<ConversionType<T>>;
};
type InferSqlSchema<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            zodSqlSchema: infer S extends z.ZodTypeAny;
        };
    } ? S : never;
};
type InferClientSchema<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            zodClientSchema: infer C extends z.ZodTypeAny;
        };
    } ? C : never;
};
type InferValidationSchema<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            zodValidationSchema: infer V extends z.ZodTypeAny;
        };
    } ? V : never;
};
type InferDefaultValues2<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            initialValue: infer D;
        };
    } ? D : never;
};
export declare function createSchema2<T extends {
    _tableName: string;
}>(schema: T extends {
    _tableName: string;
} ? T : never): {
    sqlSchema: z.ZodObject<Prettify<InferSqlSchema<T>>>;
    clientSchema: z.ZodObject<Prettify<InferClientSchema<T>>>;
    validationSchema: z.ZodObject<Prettify<InferValidationSchema<T>>>;
    defaultValues: Prettify<InferDefaultValues2<T>>;
};
export {};
