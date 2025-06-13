import { z } from "zod";
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
type SQLToZodType<T extends SQLType, TDefault extends boolean> = T["pk"] extends true ? TDefault extends true ? z.ZodString : z.ZodNumber : T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodNullable<z.ZodString> : T["type"] extends "int" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "boolean" ? z.ZodNullable<z.ZodBoolean> : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodNullable<z.ZodDate> : z.ZodNullable<z.ZodDate> : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodString : T["type"] extends "int" ? z.ZodNumber : T["type"] extends "boolean" ? z.ZodBoolean : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodDate : z.ZodDate : never;
export declare const shape: {
    int: (config?: IntConfig) => {
        config: {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            };
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodNumber;
            initialValue: number;
            zodClientSchema: z.ZodNumber;
            zodValidationSchema: z.ZodNumber;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodNumber;
            client: z.ZodNumber;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodNumber;
                initialValue: number;
                zodClientSchema: z.ZodNumber;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: number) => number;
                toDb: (clientValue: number) => number;
            }) => {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodNumber;
                    initialValue: number;
                    zodClientSchema: z.ZodNumber;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => number;
                        toDb: (clientValue: number) => number;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodNumber;
        }) => TClientNext)) => {
            config: {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodNumber;
                initialValue: number;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodNumber;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodNumber;
                    initialValue: number;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                }) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodNumber;
                        initialValue: number;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
            }) => {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodNumber;
                    initialValue: number;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: number) => number;
            toDb: (clientValue: number) => number;
        }) => {
            config: {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodNumber;
                initialValue: number;
                zodClientSchema: z.ZodNumber;
                zodValidationSchema: z.ZodNumber;
            } & {
                transforms: {
                    toClient: (dbValue: number) => number;
                    toDb: (clientValue: number) => number;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodNumber;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodNumber;
                    zodValidationSchema: z.ZodNumber;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodNumber;
                    client: z.ZodNumber;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodNumber;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodNumber;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => number;
                        toDb: (clientValue: number) => number;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: number;
                                type: "int";
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodNumber;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodNumber;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodNumber;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodNumber;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: number;
                                type: "int";
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                        }) => {
                            config: {
                                sql: {
                                    nullable?: boolean;
                                    pk?: true;
                                    field?: string;
                                    default?: number;
                                    type: "int";
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodNumber;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: number;
                                type: "int";
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => number;
                    toDb: (clientValue: number) => number;
                }) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodNumber;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodNumber;
                        zodValidationSchema: z.ZodNumber;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => number;
                            toDb: (clientValue: number) => number;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodNumber;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodNumber, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodNumber, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodNumber, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodNumber, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>) => number;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: number;
                                type: "int";
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodNumber, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: number;
                                type: "int";
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                        }) => {
                            config: {
                                sql: {
                                    nullable?: boolean;
                                    pk?: true;
                                    field?: string;
                                    default?: number;
                                    type: "int";
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: number;
                                type: "int";
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>) => number;
                }) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodNumber, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodNumber, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodNumber, TNewNext>>) => number;
                        };
                    };
                };
            };
        };
    };
    varchar: (config?: Omit<StringConfig, "type">) => {
        config: {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
        }) => TClientNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: z.ZodString;
            } & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: z.ZodString;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                    client: z.ZodString;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "varchar";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodString;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "varchar";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    length?: number;
                                    field?: string;
                                    type: "varchar";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: z.ZodString;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "varchar";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: z.ZodString;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodString;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodString, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "varchar";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "varchar";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    length?: number;
                                    field?: string;
                                    type: "varchar";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "varchar";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                        };
                    };
                };
            };
        };
    };
    char: (config?: Omit<StringConfig, "type">) => {
        config: {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
        }) => TClientNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: z.ZodString;
            } & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: z.ZodString;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                    client: z.ZodString;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "char";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodString;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "char";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    length?: number;
                                    field?: string;
                                    type: "char";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: z.ZodString;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "char";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: z.ZodString;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodString;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodString, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "char";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "char";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    length?: number;
                                    field?: string;
                                    type: "char";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                length?: number;
                                field?: string;
                                type: "char";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                        };
                    };
                };
            };
        };
    };
    text: (config?: Omit<StringConfig, "type" | "length">) => {
        config: {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
        }) => TClientNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: z.ZodString;
            } & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: z.ZodString;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                    client: z.ZodString;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "text";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodString;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "text";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    field?: string;
                                    type: "text";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: z.ZodString;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "text";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: z.ZodString;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodString;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodString, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "text";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "text";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    field?: string;
                                    type: "text";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "text";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                        };
                    };
                };
            };
        };
    };
    longtext: (config?: Omit<StringConfig, "type" | "length">) => {
        config: {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
        }) => TClientNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodString;
                zodValidationSchema: z.ZodString;
            } & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodString;
                    zodValidationSchema: z.ZodString;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                    client: z.ZodString;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "longtext";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodString;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "longtext";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    field?: string;
                                    type: "longtext";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: z.ZodString;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "longtext";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodString;
                        zodValidationSchema: z.ZodString;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodString;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodString, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "longtext";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "longtext";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: string;
                                    field?: string;
                                    type: "longtext";
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: string;
                                field?: string;
                                type: "longtext";
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodString, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodString, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodString, TNewNext>>) => string;
                        };
                    };
                };
            };
        };
    };
    boolean: (config?: BooleanConfig) => {
        config: {
            sql: {
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            };
            zodSqlSchema: z.ZodBoolean;
            zodNewSchema: z.ZodBoolean;
            initialValue: boolean;
            zodClientSchema: z.ZodBoolean;
            zodValidationSchema: z.ZodBoolean;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodBoolean;
            initialState: z.ZodBoolean;
            client: z.ZodBoolean;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodSqlSchema: z.ZodBoolean;
                zodNewSchema: z.ZodBoolean;
                initialValue: boolean;
                zodClientSchema: z.ZodBoolean;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: boolean) => boolean;
                toDb: (clientValue: boolean) => boolean;
            }) => {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodSqlSchema: z.ZodBoolean;
                    zodNewSchema: z.ZodBoolean;
                    initialValue: boolean;
                    zodClientSchema: z.ZodBoolean;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: boolean) => boolean;
                        toDb: (clientValue: boolean) => boolean;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodBoolean;
            initialState: z.ZodBoolean;
        }) => TClientNext)) => {
            config: {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodSqlSchema: z.ZodBoolean;
                zodNewSchema: z.ZodBoolean;
                initialValue: boolean;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodBoolean;
                initialState: z.ZodBoolean;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodSqlSchema: z.ZodBoolean;
                    zodNewSchema: z.ZodBoolean;
                    initialValue: boolean;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                }) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: z.ZodBoolean;
                        initialValue: boolean;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
            }) => {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodSqlSchema: z.ZodBoolean;
                    zodNewSchema: z.ZodBoolean;
                    initialValue: boolean;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: boolean) => boolean;
            toDb: (clientValue: boolean) => boolean;
        }) => {
            config: {
                sql: {
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                };
                zodSqlSchema: z.ZodBoolean;
                zodNewSchema: z.ZodBoolean;
                initialValue: boolean;
                zodClientSchema: z.ZodBoolean;
                zodValidationSchema: z.ZodBoolean;
            } & {
                transforms: {
                    toClient: (dbValue: boolean) => boolean;
                    toDb: (clientValue: boolean) => boolean;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodSqlSchema: z.ZodBoolean;
                    zodNewSchema: z.ZodBoolean;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodBoolean;
                    zodValidationSchema: z.ZodBoolean;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodBoolean;
                    initialState: z.ZodBoolean;
                    client: z.ZodBoolean;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: z.ZodBoolean;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodBoolean;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: boolean) => boolean;
                        toDb: (clientValue: boolean) => boolean;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: boolean;
                                type: "boolean";
                            };
                            zodSqlSchema: z.ZodBoolean;
                            zodNewSchema: z.ZodBoolean;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodBoolean;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: boolean) => boolean;
                                toDb: (clientValue: boolean) => boolean;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodBoolean;
                    initialState: z.ZodBoolean;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: z.ZodBoolean;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodBoolean;
                        initialState: z.ZodBoolean;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: boolean;
                                type: "boolean";
                            };
                            zodSqlSchema: z.ZodBoolean;
                            zodNewSchema: z.ZodBoolean;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                        }) => {
                            config: {
                                sql: {
                                    nullable?: boolean;
                                    pk?: true;
                                    field?: string;
                                    default?: boolean;
                                    type: "boolean";
                                };
                                zodSqlSchema: z.ZodBoolean;
                                zodNewSchema: z.ZodBoolean;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: boolean;
                                type: "boolean";
                            };
                            zodSqlSchema: z.ZodBoolean;
                            zodNewSchema: z.ZodBoolean;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: boolean) => boolean;
                    toDb: (clientValue: boolean) => boolean;
                }) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: z.ZodBoolean;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodBoolean;
                        zodValidationSchema: z.ZodBoolean;
                    } & {
                        transforms: {
                            toClient: (dbValue: boolean) => boolean;
                            toDb: (clientValue: boolean) => boolean;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodBoolean;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    };
                    zodSqlSchema: z.ZodBoolean;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodBoolean, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodBoolean, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodBoolean;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodBoolean, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodBoolean, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: boolean) => z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>) => boolean;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: boolean;
                                type: "boolean";
                            };
                            zodSqlSchema: z.ZodBoolean;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodBoolean, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: boolean) => z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>) => boolean;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodBoolean;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodBoolean;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: boolean;
                                type: "boolean";
                            };
                            zodSqlSchema: z.ZodBoolean;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                        }) => {
                            config: {
                                sql: {
                                    nullable?: boolean;
                                    pk?: true;
                                    field?: string;
                                    default?: boolean;
                                    type: "boolean";
                                };
                                zodSqlSchema: z.ZodBoolean;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                    }) => {
                        config: {
                            sql: {
                                nullable?: boolean;
                                pk?: true;
                                field?: string;
                                default?: boolean;
                                type: "boolean";
                            };
                            zodSqlSchema: z.ZodBoolean;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: boolean) => z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>) => boolean;
                }) => {
                    config: {
                        sql: {
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        };
                        zodSqlSchema: z.ZodBoolean;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodBoolean, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodBoolean, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: boolean) => z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodBoolean, TNewNext>>) => boolean;
                        };
                    };
                };
            };
        };
    };
    date: (config?: Omit<DateConfig, "type">) => {
        config: {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            };
            zodSqlSchema: z.ZodDate;
            zodNewSchema: z.ZodDate;
            initialValue: Date;
            zodClientSchema: z.ZodDate;
            zodValidationSchema: z.ZodDate;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodDate;
            initialState: z.ZodDate;
            client: z.ZodDate;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                };
                zodSqlSchema: z.ZodDate;
                zodNewSchema: z.ZodDate;
                initialValue: Date;
                zodClientSchema: z.ZodDate;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: Date) => Date;
                toDb: (clientValue: Date) => Date;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: Date;
                    zodClientSchema: z.ZodDate;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: Date) => Date;
                        toDb: (clientValue: Date) => Date;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodDate;
            initialState: z.ZodDate;
        }) => TClientNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                };
                zodSqlSchema: z.ZodDate;
                zodNewSchema: z.ZodDate;
                initialValue: Date;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodDate;
                initialState: z.ZodDate;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: Date;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: Date;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: Date;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: Date) => Date;
            toDb: (clientValue: Date) => Date;
        }) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                };
                zodSqlSchema: z.ZodDate;
                zodNewSchema: z.ZodDate;
                initialValue: Date;
                zodClientSchema: z.ZodDate;
                zodValidationSchema: z.ZodDate;
            } & {
                transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodDate;
                    zodValidationSchema: z.ZodDate;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: z.ZodDate;
                    client: z.ZodDate;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodDate;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => Date;
                        toDb: (clientValue: Date) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "date";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: z.ZodDate;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodDate;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => Date;
                                toDb: (clientValue: Date) => Date;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: z.ZodDate;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodDate;
                        initialState: z.ZodDate;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "date";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: z.ZodDate;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: Date;
                                    field?: string;
                                    type: "date";
                                };
                                zodSqlSchema: z.ZodDate;
                                zodNewSchema: z.ZodDate;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "date";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: z.ZodDate;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodDate;
                        zodValidationSchema: z.ZodDate;
                    } & {
                        transforms: {
                            toClient: (dbValue: Date) => Date;
                            toDb: (clientValue: Date) => Date;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodDate;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodDate, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "date";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodDate;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "date";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: Date;
                                    field?: string;
                                    type: "date";
                                };
                                zodSqlSchema: z.ZodDate;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "date";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                        };
                    };
                };
            };
        };
    };
    datetime: (config?: Omit<DateConfig, "type">) => {
        config: {
            sql: {
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            };
            zodSqlSchema: z.ZodDate;
            zodNewSchema: z.ZodDate;
            initialValue: Date;
            zodClientSchema: z.ZodDate;
            zodValidationSchema: z.ZodDate;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodDate;
            initialState: z.ZodDate;
            client: z.ZodDate;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                };
                zodSqlSchema: z.ZodDate;
                zodNewSchema: z.ZodDate;
                initialValue: Date;
                zodClientSchema: z.ZodDate;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: Date) => Date;
                toDb: (clientValue: Date) => Date;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: Date;
                    zodClientSchema: z.ZodDate;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: Date) => Date;
                        toDb: (clientValue: Date) => Date;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodDate;
            initialState: z.ZodDate;
        }) => TClientNext)) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                };
                zodSqlSchema: z.ZodDate;
                zodNewSchema: z.ZodDate;
                initialValue: Date;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodDate;
                initialState: z.ZodDate;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: Date;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: Date;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
            }) => {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: Date;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: Date) => Date;
            toDb: (clientValue: Date) => Date;
        }) => {
            config: {
                sql: {
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                };
                zodSqlSchema: z.ZodDate;
                zodNewSchema: z.ZodDate;
                initialValue: Date;
                zodClientSchema: z.ZodDate;
                zodValidationSchema: z.ZodDate;
            } & {
                transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: z.ZodDate;
                    initialValue: TDefaultNext;
                    zodClientSchema: z.ZodDate;
                    zodValidationSchema: z.ZodDate;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: z.ZodDate;
                    client: z.ZodDate;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodDate;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => Date;
                        toDb: (clientValue: Date) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "datetime";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: z.ZodDate;
                            initialValue: TDefaultNext;
                            zodClientSchema: z.ZodDate;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => Date;
                                toDb: (clientValue: Date) => Date;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: z.ZodDate;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodDate;
                        initialState: z.ZodDate;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "datetime";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: z.ZodDate;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: Date;
                                    field?: string;
                                    type: "datetime";
                                };
                                zodSqlSchema: z.ZodDate;
                                zodNewSchema: z.ZodDate;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "datetime";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: z.ZodDate;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: z.ZodDate;
                        initialValue: TDefaultNext;
                        zodClientSchema: z.ZodDate;
                        zodValidationSchema: z.ZodDate;
                    } & {
                        transforms: {
                            toClient: (dbValue: Date) => Date;
                            toDb: (clientValue: Date) => Date;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodDate;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: {
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    };
                    zodSqlSchema: z.ZodDate;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                    zodValidationSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: TNewNext;
                    client: InferSmartClientType<z.ZodDate, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "datetime";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodDate;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "datetime";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                        }) => {
                            config: {
                                sql: {
                                    pk?: true;
                                    nullable?: boolean;
                                    default?: Date;
                                    field?: string;
                                    type: "datetime";
                                };
                                zodSqlSchema: z.ZodDate;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    }) => {
                        config: {
                            sql: {
                                pk?: true;
                                nullable?: boolean;
                                default?: Date;
                                field?: string;
                                type: "datetime";
                            };
                            zodSqlSchema: z.ZodDate;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                }) => {
                    config: {
                        sql: {
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        };
                        zodSqlSchema: z.ZodDate;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                        zodValidationSchema: InferSmartClientType<z.ZodDate, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: Date) => z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<z.ZodDate, TNewNext>>) => Date;
                        };
                    };
                };
            };
        };
    };
    sql: <T extends SQLType>(sqlConfig: T) => {
        config: {
            sql: T;
            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
            zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            zodValidationSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            client: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
        }) => TValidationNext)) => {
            config: {
                sql: T;
                zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                zodValidationSchema: TValidationNext;
            };
            transform: (transforms: {
                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
            }) => {
                config: {
                    sql: T;
                    zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodValidationSchema: TValidationNext;
                } & {
                    transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
        }) => TClientNext)) => {
            config: {
                sql: T;
                zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: T;
                    zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                }) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
            }) => {
                config: {
                    sql: T;
                    zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                } & {
                    transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    };
                };
            };
        };
        transform: (transforms: {
            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
            toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
        }) => {
            config: {
                sql: T;
                zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                zodValidationSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            } & {
                transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                };
            };
        };
        initialState: {
            <TDefaultNext>(defaultValue: () => TDefaultNext): {
                config: {
                    sql: T;
                    zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialValue: TDefaultNext;
                    zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodValidationSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    client: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                }) => TValidationNext)) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        initialValue: TDefaultNext;
                        zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    }) => {
                        config: {
                            sql: T;
                            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            initialValue: TDefaultNext;
                            zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                                toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                }) => TClientNext)) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        initialValue: TDefaultNext;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: T;
                            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        }) => {
                            config: {
                                sql: T;
                                zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                                zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                                initialValue: TDefaultNext;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    }) => {
                        config: {
                            sql: T;
                            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            initialValue: TDefaultNext;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                }) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        initialValue: TDefaultNext;
                        zodClientSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodValidationSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    } & {
                        transforms: {
                            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                            toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        };
                    };
                };
            };
            <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            }) => TNewNext), defaultValue: () => TDefaultNext): {
                config: {
                    sql: T;
                    zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                    zodValidationSchema: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialState: TNewNext;
                    client: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                }) => TValidationNext)) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>;
                        toDb: (clientValue: z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    }) => {
                        config: {
                            sql: T;
                            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>;
                                toDb: (clientValue: z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: T;
                            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        }) => {
                            config: {
                                sql: T;
                                zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    }) => {
                        config: {
                            sql: T;
                            zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>;
                    toDb: (clientValue: z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                }) => {
                    config: {
                        sql: T;
                        zodSqlSchema: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                        zodValidationSchema: InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>;
                    } & {
                        transforms: {
                            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>;
                            toDb: (clientValue: z.TypeOf<InferSmartClientType<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext>>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        };
                    };
                };
            };
        };
    };
};
interface IBuilderMethods<T extends SQLType, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> {
    /**
     * Defines the schema and default value for creating a new item.
     * Moves the builder to the 'new' stage.
     */
    initialState: {
        <TDefaultNext>(defaultValue: () => TDefaultNext): Prettify<Builder<"new", T, TSql, TSql, // Keep SQL schema
        TDefaultNext, TSql, // Client stays as SQL
        TSql>>;
        <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: ((tools: {
            sql: TSql;
        }) => TNewNext) | TNewNext, defaultValue: () => TDefaultNext): Prettify<Builder<"new", T, TSql, TNewNext, z.infer<TNewNext>, InferSmartClientType<TSql, TNewNext>, InferSmartClientType<TSql, TNewNext>>>;
    };
    /**
     * Defines the schema for data sent to the client.
     * Moves the builder to the 'client' stage.
     */
    client: <TClientNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
    }) => TClientNext) | TClientNext) => Prettify<Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>>;
    /**
     * Defines a validation schema for updates or inputs.
     * Moves the builder to the 'validation' stage.
     */
    validation: <TValidationNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Prettify<Builder<"validation", T, TSql, TNew, TInitialValue, TClient, TValidationNext>>;
    /**
     * Finalizes the builder by providing data transformation functions.
     * This is the terminal step.
     */
    transform: (transforms: {
        toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
        toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
        config: Prettify<BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>> & {
            transforms: typeof transforms;
        };
    };
}
type Stage = "sql" | "new" | "client" | "validation" | "done";
type StageMethods = {
    sql: "initialState" | "client" | "validation" | "transform";
    new: "client" | "validation" | "transform";
    client: "validation" | "transform";
    validation: "transform";
    done: never;
};
type InferSmartClientType<TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny> = z.infer<TNew> extends z.infer<TSql> ? TNew : z.ZodUnion<[TSql, TNew]>;
type BuilderConfig<T extends SQLType, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = {
    sql: T;
    zodSqlSchema: TSql;
    zodNewSchema: TNew;
    initialValue: TInitialValue;
    zodClientSchema: TClient;
    zodValidationSchema: TValidation;
};
export type Builder<TStage extends Stage, T extends SQLType, TSql extends z.ZodTypeAny, TNew extends z.ZodTypeAny, TInitialValue, TClient extends z.ZodTypeAny, TValidation extends z.ZodTypeAny> = Prettify<{
    /** The configuration object, available at every stage. */
    config: Prettify<BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>>;
} & Pick<IBuilderMethods<T, TSql, TNew, TInitialValue, TClient, TValidation>, StageMethods[TStage]>>;
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
type ReferenceField<TField extends AnyFieldDefinition> = {
    field: TField;
    type: "reference";
    to: () => any;
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
    toKey: SchemaField;
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
export declare function reference<TField extends object, Zod extends z.ZodTypeAny>(config: {
    to: TField;
    field: Zod;
}): {
    field: Zod;
    type: "reference";
    to: () => TField;
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
        field: infer F extends z.ZodTypeAny;
    } ? F : T[K] extends () => {
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
}>(schema: T extends {
    _tableName: string;
} ? T : never): {
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
type SyncSchemaEntry<T extends {
    _tableName: string;
}> = {
    schema: T;
    validation?: (schema: ReturnType<typeof createSchema<T>>["validationSchema"]) => z.ZodSchema;
    client?: (schema: ReturnType<typeof createSchema<T>>["clientSchema"]) => z.ZodSchema;
};
type SyncSchemaMap<T extends Record<string, {
    _tableName: string;
}>> = {
    [K in keyof T]: SyncSchemaEntry<T[K]>;
};
export declare function createSyncSchema<T extends Record<string, {
    _tableName: string;
}>>(config: {
    [K in keyof T]: {
        schema: T[K];
        validation?: (schema: ReturnType<typeof createSchema<T[K]>>["validationSchema"]) => z.ZodSchema;
        client?: (schema: ReturnType<typeof createSchema<T[K]>>["clientSchema"]) => z.ZodSchema;
    };
}): SyncSchemaMap<T>;
export {};
