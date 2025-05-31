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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: T;
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: T;
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: T;
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: T;
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            sql: T;
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodNumber;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            nullable?: boolean;
            default?: string;
            pk?: true;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                length?: number;
                field?: string;
                type: "varchar";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodString;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                length?: number;
                field?: string;
                type: "varchar";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        default?: string;
                        pk?: true;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            nullable?: boolean;
            default?: string;
            pk?: true;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                length?: number;
                field?: string;
                type: "char";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodString;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                length?: number;
                field?: string;
                type: "char";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        default?: string;
                        pk?: true;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            nullable?: boolean;
            default?: string;
            pk?: true;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                field?: string;
                type: "text";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    field?: string;
                    type: "text";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodString;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                field?: string;
                type: "text";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    field?: string;
                    type: "text";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        default?: string;
                        pk?: true;
                        field?: string;
                        type: "text";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            nullable?: boolean;
            default?: string;
            pk?: true;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                field?: string;
                type: "longtext";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    field?: string;
                    type: "longtext";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodString;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                default?: string;
                pk?: true;
                field?: string;
                type: "longtext";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    default?: string;
                    pk?: true;
                    field?: string;
                    type: "longtext";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        default?: string;
                        pk?: true;
                        field?: string;
                        type: "longtext";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodBoolean;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            nullable?: boolean;
            default?: Date;
            pk?: true;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                default?: Date;
                pk?: true;
                field?: string;
                type: "date";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    default?: Date;
                    pk?: true;
                    field?: string;
                    type: "date";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodDate;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                default?: Date;
                pk?: true;
                field?: string;
                type: "date";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    default?: Date;
                    pk?: true;
                    field?: string;
                    type: "date";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        default?: Date;
                        pk?: true;
                        field?: string;
                        type: "date";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            nullable?: boolean;
            default?: Date;
            pk?: true;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: {
                nullable?: boolean;
                default?: Date;
                pk?: true;
                field?: string;
                type: "datetime";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    nullable?: boolean;
                    default?: Date;
                    pk?: true;
                    field?: string;
                    type: "datetime";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodDate;
        }) => ServerType) => {
            sql: {
                nullable?: boolean;
                default?: Date;
                pk?: true;
                field?: string;
                type: "datetime";
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: {
                    nullable?: boolean;
                    default?: Date;
                    pk?: true;
                    field?: string;
                    type: "datetime";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        nullable?: boolean;
                        default?: Date;
                        pk?: true;
                        field?: string;
                        type: "datetime";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
            sql: T;
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: T;
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: SQLToZodType<T, false>;
        }) => ServerType) => {
            sql: T;
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: ServerType;
            jsonSchema: JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.infer<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never) | undefined) => {
                sql: T;
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? CurrentTimestampConfig : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: T;
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
    };
};
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
type ReferenceField = {
    type: "reference";
    to: () => BaseSchemaField;
};
type SchemaField<T extends SQLType = SQLType> = BaseSchemaField<T> | ReferenceField;
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
export declare function reference<T extends () => BaseSchemaField>(config: {
    to: T;
}): SchemaField;
export declare function createSchema<T extends Schema<any>>(schema: T): {
    dbSchema: z.ZodObject<Prettify<InferDBSchema<T>>>;
    clientSchema: z.ZodObject<Prettify<OmitNever<InferSchema<T>>>>;
    defaultValues: Prettify<OmitNever<ConfigWithOptionalProps<T>>>;
    initialValues: () => Prettify<OmitNever<ConfigWithOptionalProps<T>>>;
    serialized: Prettify<InferSerializedSchema<T>> & {
        _tableName: string;
        __schemaId: string;
    };
};
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
};
export {};
