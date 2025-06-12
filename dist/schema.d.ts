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
type SQLToZodType<T extends SQLType, TDefault extends boolean> = T["pk"] extends true ? TDefault extends true ? z.ZodString : z.ZodNumber : T["nullable"] extends true ? T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodNullable<z.ZodString> : T["type"] extends "int" ? z.ZodNullable<z.ZodNumber> : T["type"] extends "boolean" ? z.ZodNullable<z.ZodBoolean> : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodNullable<z.ZodDate> : z.ZodNullable<z.ZodDate> : never : T["type"] extends "varchar" | "char" | "text" | "longtext" ? z.ZodString : T["type"] extends "int" ? z.ZodNumber : T["type"] extends "boolean" ? z.ZodBoolean : T["type"] extends "date" | "datetime" ? T extends {
    default: "CURRENT_TIMESTAMP";
} ? TDefault extends true ? never : z.ZodDate : z.ZodDate : never;
export declare const shape: {
    int: (config?: IntConfig) => {
        config: BuilderConfig<{
            nullable?: boolean;
            pk?: true;
            field?: string;
            default?: number;
            type: "int";
        }, z.ZodNumber, z.ZodNumber, undefined, z.ZodNumber, z.ZodNumber>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodNumber;
            client: z.ZodNumber;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            }, z.ZodNumber, z.ZodNumber, undefined, z.ZodNumber, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: number) => number;
                toDb: (clientValue: number) => number;
            }) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                }, z.ZodNumber, z.ZodNumber, undefined, z.ZodNumber, TValidationNext> & {
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
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            }, z.ZodNumber, z.ZodNumber, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodNumber;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                }, z.ZodNumber, z.ZodNumber, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                }) => {
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    }, z.ZodNumber, z.ZodNumber, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                }, z.ZodNumber, z.ZodNumber, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            }, z.ZodNumber, z.ZodNumber, undefined, z.ZodNumber, z.ZodNumber> & {
                transforms: {
                    toClient: (dbValue: number) => number;
                    toDb: (clientValue: number) => number;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodNumber;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: number;
                type: "int";
            }, z.ZodNumber, TNewNext, TDefaultNext, z.ZodNumber, z.ZodNumber>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: TNewNext;
                client: z.ZodNumber;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                }, z.ZodNumber, TNewNext, TDefaultNext, z.ZodNumber, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: number) => number;
                    toDb: (clientValue: number) => number;
                }) => {
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    }, z.ZodNumber, TNewNext, TDefaultNext, z.ZodNumber, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: number) => number;
                            toDb: (clientValue: number) => number;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodNumber;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                }, z.ZodNumber, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    }, z.ZodNumber, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
                    }) => {
                        config: BuilderConfig<{
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: number;
                            type: "int";
                        }, z.ZodNumber, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: number;
                        type: "int";
                    }, z.ZodNumber, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: number;
                    type: "int";
                }, z.ZodNumber, TNewNext, TDefaultNext, z.ZodNumber, z.ZodNumber> & {
                    transforms: {
                        toClient: (dbValue: number) => number;
                        toDb: (clientValue: number) => number;
                    };
                };
            };
        };
    };
    varchar: (config?: Omit<StringConfig, "type">) => {
        config: BuilderConfig<{
            pk?: true;
            nullable?: boolean;
            default?: string;
            length?: number;
            field?: string;
            type: "varchar";
        }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString> & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodString;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "varchar";
            }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
                client: z.ZodString;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: BuilderConfig<{
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "varchar";
                        }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "varchar";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "varchar";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString> & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
    };
    char: (config?: Omit<StringConfig, "type">) => {
        config: BuilderConfig<{
            pk?: true;
            nullable?: boolean;
            default?: string;
            length?: number;
            field?: string;
            type: "char";
        }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString> & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodString;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                length?: number;
                field?: string;
                type: "char";
            }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
                client: z.ZodString;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: BuilderConfig<{
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            length?: number;
                            field?: string;
                            type: "char";
                        }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        length?: number;
                        field?: string;
                        type: "char";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    length?: number;
                    field?: string;
                    type: "char";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString> & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
    };
    text: (config?: Omit<StringConfig, "type" | "length">) => {
        config: BuilderConfig<{
            pk?: true;
            nullable?: boolean;
            default?: string;
            field?: string;
            type: "text";
        }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString> & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodString;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "text";
            }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
                client: z.ZodString;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: BuilderConfig<{
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "text";
                        }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "text";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "text";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString> & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
    };
    longtext: (config?: Omit<StringConfig, "type" | "length">) => {
        config: BuilderConfig<{
            pk?: true;
            nullable?: boolean;
            default?: string;
            field?: string;
            type: "longtext";
        }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodString;
            initialState: z.ZodString;
            client: z.ZodString;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: string) => string;
                toDb: (clientValue: string) => string;
            }) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                }, z.ZodString, z.ZodString, undefined, z.ZodString, TValidationNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    }, z.ZodString, z.ZodString, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                }, z.ZodString, z.ZodString, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            }, z.ZodString, z.ZodString, undefined, z.ZodString, z.ZodString> & {
                transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodString;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: string;
                field?: string;
                type: "longtext";
            }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
                client: z.ZodString;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: string) => string;
                    toDb: (clientValue: string) => string;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => string;
                    }) => {
                        config: BuilderConfig<{
                            pk?: true;
                            nullable?: boolean;
                            default?: string;
                            field?: string;
                            type: "longtext";
                        }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: string;
                        field?: string;
                        type: "longtext";
                    }, z.ZodString, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: string;
                    field?: string;
                    type: "longtext";
                }, z.ZodString, TNewNext, TDefaultNext, z.ZodString, z.ZodString> & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        };
    };
    boolean: (config?: BooleanConfig) => {
        config: BuilderConfig<{
            nullable?: boolean;
            pk?: true;
            field?: string;
            default?: boolean;
            type: "boolean";
        }, z.ZodBoolean, z.ZodBoolean, undefined, z.ZodBoolean, z.ZodBoolean>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodBoolean;
            initialState: z.ZodBoolean;
            client: z.ZodBoolean;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            }, z.ZodBoolean, z.ZodBoolean, undefined, z.ZodBoolean, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: boolean) => boolean;
                toDb: (clientValue: boolean) => boolean;
            }) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                }, z.ZodBoolean, z.ZodBoolean, undefined, z.ZodBoolean, TValidationNext> & {
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
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            }, z.ZodBoolean, z.ZodBoolean, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodBoolean;
                initialState: z.ZodBoolean;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                }, z.ZodBoolean, z.ZodBoolean, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                }) => {
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    }, z.ZodBoolean, z.ZodBoolean, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                }, z.ZodBoolean, z.ZodBoolean, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            }, z.ZodBoolean, z.ZodBoolean, undefined, z.ZodBoolean, z.ZodBoolean> & {
                transforms: {
                    toClient: (dbValue: boolean) => boolean;
                    toDb: (clientValue: boolean) => boolean;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodBoolean;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                nullable?: boolean;
                pk?: true;
                field?: string;
                default?: boolean;
                type: "boolean";
            }, z.ZodBoolean, TNewNext, TDefaultNext, z.ZodBoolean, z.ZodBoolean>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodBoolean;
                initialState: TNewNext;
                client: z.ZodBoolean;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                }, z.ZodBoolean, TNewNext, TDefaultNext, z.ZodBoolean, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: boolean) => boolean;
                    toDb: (clientValue: boolean) => boolean;
                }) => {
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    }, z.ZodBoolean, TNewNext, TDefaultNext, z.ZodBoolean, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: boolean) => boolean;
                            toDb: (clientValue: boolean) => boolean;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodBoolean;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                }, z.ZodBoolean, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodBoolean;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    }, z.ZodBoolean, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: boolean) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => boolean;
                    }) => {
                        config: BuilderConfig<{
                            nullable?: boolean;
                            pk?: true;
                            field?: string;
                            default?: boolean;
                            type: "boolean";
                        }, z.ZodBoolean, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        nullable?: boolean;
                        pk?: true;
                        field?: string;
                        default?: boolean;
                        type: "boolean";
                    }, z.ZodBoolean, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    nullable?: boolean;
                    pk?: true;
                    field?: string;
                    default?: boolean;
                    type: "boolean";
                }, z.ZodBoolean, TNewNext, TDefaultNext, z.ZodBoolean, z.ZodBoolean> & {
                    transforms: {
                        toClient: (dbValue: boolean) => boolean;
                        toDb: (clientValue: boolean) => boolean;
                    };
                };
            };
        };
    };
    date: (config?: Omit<DateConfig, "type">) => {
        config: BuilderConfig<{
            pk?: true;
            nullable?: boolean;
            default?: Date;
            field?: string;
            type: "date";
        }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, z.ZodDate>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodDate;
            initialState: z.ZodDate;
            client: z.ZodDate;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: Date) => Date;
                toDb: (clientValue: Date) => Date;
            }) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, TValidationNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            }, z.ZodDate, z.ZodDate, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodDate;
                initialState: z.ZodDate;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                }, z.ZodDate, z.ZodDate, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    }, z.ZodDate, z.ZodDate, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                }, z.ZodDate, z.ZodDate, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, z.ZodDate> & {
                transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodDate;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "date";
            }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, z.ZodDate>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodDate;
                initialState: TNewNext;
                client: z.ZodDate;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: Date) => Date;
                            toDb: (clientValue: Date) => Date;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodDate;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    }) => {
                        config: BuilderConfig<{
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "date";
                        }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "date";
                    }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "date";
                }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, z.ZodDate> & {
                    transforms: {
                        toClient: (dbValue: Date) => Date;
                        toDb: (clientValue: Date) => Date;
                    };
                };
            };
        };
    };
    datetime: (config?: Omit<DateConfig, "type">) => {
        config: BuilderConfig<{
            pk?: true;
            nullable?: boolean;
            default?: Date;
            field?: string;
            type: "datetime";
        }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, z.ZodDate>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodDate;
            initialState: z.ZodDate;
            client: z.ZodDate;
        }) => TValidationNext)) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: Date) => Date;
                toDb: (clientValue: Date) => Date;
            }) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, TValidationNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            }, z.ZodDate, z.ZodDate, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodDate;
                initialState: z.ZodDate;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                }, z.ZodDate, z.ZodDate, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    }, z.ZodDate, z.ZodDate, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                }, z.ZodDate, z.ZodDate, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            }, z.ZodDate, z.ZodDate, undefined, z.ZodDate, z.ZodDate> & {
                transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodDate;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<{
                pk?: true;
                nullable?: boolean;
                default?: Date;
                field?: string;
                type: "datetime";
            }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, z.ZodDate>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodDate;
                initialState: TNewNext;
                client: z.ZodDate;
            }) => TValidationNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: Date) => Date;
                    toDb: (clientValue: Date) => Date;
                }) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: Date) => Date;
                            toDb: (clientValue: Date) => Date;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodDate;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodDate;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: Date) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => Date;
                    }) => {
                        config: BuilderConfig<{
                            pk?: true;
                            nullable?: boolean;
                            default?: Date;
                            field?: string;
                            type: "datetime";
                        }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<{
                        pk?: true;
                        nullable?: boolean;
                        default?: Date;
                        field?: string;
                        type: "datetime";
                    }, z.ZodDate, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<{
                    pk?: true;
                    nullable?: boolean;
                    default?: Date;
                    field?: string;
                    type: "datetime";
                }, z.ZodDate, TNewNext, TDefaultNext, z.ZodDate, z.ZodDate> & {
                    transforms: {
                        toClient: (dbValue: Date) => Date;
                        toDb: (clientValue: Date) => Date;
                    };
                };
            };
        };
    };
    sql: <T extends SQLType>(sqlConfig: T) => {
        config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            client: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
        }) => TValidationNext)) => {
            config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TValidationNext>;
            transform: (transforms: {
                toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
            }) => {
                config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TValidationNext> & {
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
            config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, TClientNext, TClientNext>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialState: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, TClientNext, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                    toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                }) => {
                    config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, TClientNext, TValidationNext> & {
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
                config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, TClientNext, TClientNext> & {
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
            config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, undefined, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never> & {
                transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                };
            };
        };
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialState: TNewNext;
                client: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
            }) => TValidationNext)) => {
                config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TValidationNext>;
                transform: (transforms: {
                    toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                }) => {
                    config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TValidationNext> & {
                        transforms: {
                            toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                            toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                initialState: TNewNext;
            }) => TClientNext)) => {
                config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, TClientNext, TClientNext>;
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never;
                    initialState: TNewNext;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, TClientNext, TValidationNext>;
                    transform: (transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                    }) => {
                        config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, TClientNext, TValidationNext> & {
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
                    config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, TClientNext, TClientNext> & {
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
                config: BuilderConfig<T, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, TNewNext, TDefaultNext, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never, SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never> & {
                    transforms: {
                        toClient: (dbValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
                        toDb: (clientValue: z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>) => z.TypeOf<SQLToZodType<T, false> extends z.ZodTypeAny ? SQLToZodType<T, false> : never>;
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
    initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: ((tools: {
        sql: TSql;
    }) => TNewNext) | TNewNext, defaultValue: () => TDefaultNext) => Builder<"new", T, TSql, TNewNext, TDefaultNext, TSql, TSql>;
    /**
     * Defines the schema for data sent to the client.
     * Moves the builder to the 'client' stage.
     */
    client: <TClientNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
    }) => TClientNext) | TClientNext) => Builder<"client", T, TSql, TNew, TInitialValue, TClientNext, TClientNext>;
    /**
     * Defines a validation schema for updates or inputs.
     * Moves the builder to the 'validation' stage.
     */
    validation: <TValidationNext extends z.ZodTypeAny>(schema: ((tools: {
        sql: TSql;
        initialState: TNew;
        client: TClient;
    }) => TValidationNext) | TValidationNext) => Builder<"validation", T, TSql, TNew, TInitialValue, TClient, TValidationNext>;
    /**
     * Finalizes the builder by providing data transformation functions.
     * This is the terminal step.
     */
    transform: (transforms: {
        toClient: (dbValue: z.infer<TSql>) => z.infer<TClient>;
        toDb: (clientValue: z.infer<TClient>) => z.infer<TSql>;
    }) => {
        config: BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation> & {
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
    config: BuilderConfig<T, TSql, TNew, TInitialValue, TClient, TValidation>;
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
export declare function reference<TTargetField extends SchemaField, TField extends object>(config: {
    to: () => TTargetField;
    field: TField;
}): TField & {
    type: "reference";
    to: () => TTargetField;
};
export declare function createMixedValidationSchema<T extends Schema<any>>(schema: T, clientSchema?: z.ZodObject<any>, dbSchema?: z.ZodObject<any>): z.ZodObject<any>;
type SchemaDefinition = {
    _tableName: string;
    [key: string]: any;
};
type InferSqlSchema<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            zodSqlSchema: infer S extends z.ZodTypeAny;
        };
    } ? S : T[K] extends () => {
        type: "hasMany" | "manyToMany";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodArray<z.ZodObject<Prettify<InferSqlSchema<S>>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodObject<Prettify<InferSqlSchema<S>>> : never;
};
type InferClientSchema<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            zodClientSchema: infer C extends z.ZodTypeAny;
        };
    } ? C : T[K] extends () => {
        type: "hasMany" | "manyToMany";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodArray<z.ZodObject<Prettify<InferClientSchema<S>>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodObject<Prettify<InferClientSchema<S>>> : never;
};
type InferValidationSchema<T> = {
    [K in keyof T as K extends "_tableName" ? never : K]: T[K] extends {
        config: {
            zodValidationSchema: infer V extends z.ZodTypeAny;
        };
    } ? V : T[K] extends () => {
        type: "hasMany" | "manyToMany";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodArray<z.ZodObject<Prettify<InferValidationSchema<S>>>> : T[K] extends () => {
        type: "hasOne" | "belongsTo";
        schema: infer S extends SchemaDefinition;
    } ? z.ZodObject<Prettify<InferValidationSchema<S>>> : never;
};
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
export {};
