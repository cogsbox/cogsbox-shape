import { z } from "zod";
export declare const userSchema: {
    _tableName: string;
    id: {
        config: {
            sql: {
                type: "int";
                pk: true;
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
                    type: "int";
                    pk: true;
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
                        type: "int";
                        pk: true;
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
                    type: "int";
                    pk: true;
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
                        type: "int";
                        pk: true;
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
                            type: "int";
                            pk: true;
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
                        type: "int";
                        pk: true;
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
                    type: "int";
                    pk: true;
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
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodNumber;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: TNewNext;
                initialValue: z.TypeOf<TNewNext>;
                zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: TNewNext;
                client: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                }) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
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
                        type: "int";
                        pk: true;
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
                            type: "int";
                            pk: true;
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
                                type: "int";
                                pk: true;
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
                            type: "int";
                            pk: true;
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
                toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
            }) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                    zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                    };
                };
            };
        };
    };
    firstname: {
        config: {
            sql: {
                type: "varchar";
                length: number;
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    type: "varchar";
                    length: number;
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
    };
    surname: {
        config: {
            sql: {
                type: "varchar";
                length: number;
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    type: "varchar";
                    length: number;
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
    };
    email: {
        config: {
            sql: {
                type: "varchar";
                length: number;
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodString;
            zodValidationSchema: z.ZodString;
        };
        transform: (transforms: {
            toClient: (dbValue: string) => string;
            toDb: (clientValue: string) => string;
        }) => {
            config: {
                sql: {
                    type: "varchar";
                    length: number;
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
    };
    pets: () => {
        type: "hasMany";
        fromKey: string;
        toKey: string | {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                zodValidationSchema: z.ZodString;
            } & {
                transforms: {
                    toClient: (dbValue: number) => string | number;
                    toDb: (clientValue: string | number) => number;
                };
            };
        } | {
            config: {
                sql: {
                    type: "varchar";
                    length: number;
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
                        type: "varchar";
                        length: number;
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
                            type: "varchar";
                            length: number;
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
                        type: "varchar";
                        length: number;
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
                            type: "varchar";
                            length: number;
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
                                type: "varchar";
                                length: number;
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
                            type: "varchar";
                            length: number;
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
                        type: "varchar";
                        length: number;
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
            initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodString;
            }) => TNewNext), defaultValue: () => TDefaultNext) => {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                    zodValidationSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodString;
                    initialState: TNewNext;
                    client: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
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
                            type: "varchar";
                            length: number;
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
                                type: "varchar";
                                length: number;
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
                                    type: "varchar";
                                    length: number;
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
                                type: "varchar";
                                length: number;
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
                    toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                }) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                        zodValidationSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                        };
                    };
                };
            };
        } | {
            field: z.ZodNumber;
            type: "reference";
            to: () => () => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
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
                            type: "int";
                            pk: true;
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
                                type: "int";
                                pk: true;
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
                            type: "int";
                            pk: true;
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
                                type: "int";
                                pk: true;
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
                                    type: "int";
                                    pk: true;
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
                                type: "int";
                                pk: true;
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
                            type: "int";
                            pk: true;
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
                initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                    sql: z.ZodNumber;
                }) => TNewNext), defaultValue: () => TDefaultNext) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: TNewNext;
                        client: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
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
                                type: "int";
                                pk: true;
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
                                    type: "int";
                                    pk: true;
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
                                        type: "int";
                                        pk: true;
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
                                    type: "int";
                                    pk: true;
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
                        toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                            zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                            };
                        };
                    };
                };
            };
        } | {
            config: {
                sql: {
                    type: "text";
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
            } & {
                transforms: {
                    toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
                };
            };
        } | {
            config: {
                sql: {
                    type: "int";
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodNumber;
                initialValue: number;
                zodClientSchema: z.ZodBoolean;
                zodValidationSchema: z.ZodBoolean;
            } & {
                transforms: {
                    toClient: (dbValue: number) => boolean;
                    toDb: (clientValue: boolean) => number;
                };
            };
        };
        schema: {
            _tableName: string;
            id: {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodString;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    };
                };
            };
            name: {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
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
                            type: "varchar";
                            length: number;
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
                                type: "varchar";
                                length: number;
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
                            type: "varchar";
                            length: number;
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
                                type: "varchar";
                                length: number;
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
                                    type: "varchar";
                                    length: number;
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
                                type: "varchar";
                                length: number;
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
                            type: "varchar";
                            length: number;
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
                initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                    sql: z.ZodString;
                }) => TNewNext), defaultValue: () => TDefaultNext) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                        zodValidationSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodString;
                        initialState: TNewNext;
                        client: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
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
                                type: "varchar";
                                length: number;
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
                                    type: "varchar";
                                    length: number;
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
                                        type: "varchar";
                                        length: number;
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
                                    type: "varchar";
                                    length: number;
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
                        toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                            zodValidationSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                            };
                        };
                    };
                };
            };
            userId: {
                field: z.ZodNumber;
                type: "reference";
                to: () => () => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
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
                                type: "int";
                                pk: true;
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
                                    type: "int";
                                    pk: true;
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
                                type: "int";
                                pk: true;
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
                                    type: "int";
                                    pk: true;
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
                                        type: "int";
                                        pk: true;
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
                                    type: "int";
                                    pk: true;
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
                                type: "int";
                                pk: true;
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
                    initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                        sql: z.ZodNumber;
                    }) => TNewNext), defaultValue: () => TDefaultNext) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                            zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: TNewNext;
                            client: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: z.TypeOf<TNewNext>;
                                    zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
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
                                    type: "int";
                                    pk: true;
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
                                        type: "int";
                                        pk: true;
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
                                            type: "int";
                                            pk: true;
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
                                        type: "int";
                                        pk: true;
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
                            toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: z.TypeOf<TNewNext>;
                                zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                                zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                                };
                            };
                        };
                    };
                };
            };
            fluffynessScale: {
                config: {
                    sql: {
                        type: "text";
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
                    };
                };
            };
            favourite: {
                config: {
                    sql: {
                        type: "int";
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodNumber;
                    initialValue: number;
                    zodClientSchema: z.ZodBoolean;
                    zodValidationSchema: z.ZodBoolean;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => boolean;
                        toDb: (clientValue: boolean) => number;
                    };
                };
            };
        };
        defaultCount: number | undefined;
    };
};
export declare const petSchema: {
    _tableName: string;
    id: {
        config: {
            sql: {
                type: "int";
                pk: true;
            };
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            zodValidationSchema: z.ZodString;
        } & {
            transforms: {
                toClient: (dbValue: number) => string | number;
                toDb: (clientValue: string | number) => number;
            };
        };
    };
    name: {
        config: {
            sql: {
                type: "varchar";
                length: number;
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
                    type: "varchar";
                    length: number;
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
                        type: "varchar";
                        length: number;
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
                    type: "varchar";
                    length: number;
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
                        type: "varchar";
                        length: number;
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
                            type: "varchar";
                            length: number;
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
                        type: "varchar";
                        length: number;
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
                    type: "varchar";
                    length: number;
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
        initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
            sql: z.ZodString;
        }) => TNewNext), defaultValue: () => TDefaultNext) => {
            config: {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodSqlSchema: z.ZodString;
                zodNewSchema: TNewNext;
                initialValue: z.TypeOf<TNewNext>;
                zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                zodValidationSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodString;
                initialState: TNewNext;
                client: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                }) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
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
                        type: "varchar";
                        length: number;
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
                            type: "varchar";
                            length: number;
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
                                type: "varchar";
                                length: number;
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
                            type: "varchar";
                            length: number;
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
                toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
            }) => {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                    zodValidationSchema: z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>;
                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends string ? TNewNext : z.ZodUnion<[z.ZodString, TNewNext]>>) => string;
                    };
                };
            };
        };
    };
    userId: {
        field: z.ZodNumber;
        type: "reference";
        to: () => () => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
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
                        type: "int";
                        pk: true;
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
                            type: "int";
                            pk: true;
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
                        type: "int";
                        pk: true;
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
                            type: "int";
                            pk: true;
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
                                type: "int";
                                pk: true;
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
                            type: "int";
                            pk: true;
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
                        type: "int";
                        pk: true;
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
            initialState: <TNewNext extends z.ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: z.ZodNumber;
            }) => TNewNext), defaultValue: () => TDefaultNext) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: TNewNext;
                    initialValue: z.TypeOf<TNewNext>;
                    zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                    zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: TNewNext;
                    client: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                        toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: z.TypeOf<TNewNext>;
                            zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                                toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
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
                            type: "int";
                            pk: true;
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
                                type: "int";
                                pk: true;
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
                                    type: "int";
                                    pk: true;
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
                                type: "int";
                                pk: true;
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
                    toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                    toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                }) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: z.TypeOf<TNewNext>;
                        zodClientSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                        zodValidationSchema: z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>;
                            toDb: (clientValue: z.TypeOf<z.TypeOf<TNewNext> extends number ? TNewNext : z.ZodUnion<[z.ZodNumber, TNewNext]>>) => number;
                        };
                    };
                };
            };
        };
    };
    fluffynessScale: {
        config: {
            sql: {
                type: "text";
            };
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
            zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
        } & {
            transforms: {
                toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
            };
        };
    };
    favourite: {
        config: {
            sql: {
                type: "int";
            };
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodNumber;
            initialValue: number;
            zodClientSchema: z.ZodBoolean;
            zodValidationSchema: z.ZodBoolean;
        } & {
            transforms: {
                toClient: (dbValue: number) => boolean;
                toDb: (clientValue: boolean) => number;
            };
        };
    };
};
