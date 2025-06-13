declare const schemas: {
    user: {
        _tableName: string;
        id: {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: import("zod").ZodNumber;
                zodNewSchema: import("zod").ZodNumber;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodNumber;
                zodValidationSchema: import("zod").ZodNumber;
            };
            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: import("zod").ZodNumber;
                initialState: import("zod").ZodNumber;
                client: import("zod").ZodNumber;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodNumber;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodNumber;
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
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodNumber;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => number;
                            toDb: (clientValue: number) => number;
                        };
                    };
                };
            };
            client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: import("zod").ZodNumber;
                initialState: import("zod").ZodNumber;
            }) => TClientNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodNumber;
                    initialValue: undefined;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: import("zod").ZodNumber;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                }) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
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
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodNumber;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodNumber;
                    zodValidationSchema: import("zod").ZodNumber;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => number;
                        toDb: (clientValue: number) => number;
                    };
                };
            };
            initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: import("zod").ZodNumber;
            }) => TNewNext), defaultValue: () => TDefaultNext) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: TNewNext;
                    initialValue: import("zod").TypeOf<TNewNext>;
                    zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                    zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: TNewNext;
                    client: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                }) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                        zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
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
                zodSqlSchema: import("zod").ZodString;
                zodNewSchema: import("zod").ZodString;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodString;
                zodValidationSchema: import("zod").ZodString;
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
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
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
                zodSqlSchema: import("zod").ZodString;
                zodNewSchema: import("zod").ZodString;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodString;
                zodValidationSchema: import("zod").ZodString;
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
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
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
                zodSqlSchema: import("zod").ZodString;
                zodNewSchema: import("zod").ZodString;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodString;
                zodValidationSchema: import("zod").ZodString;
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
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
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
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    zodValidationSchema: import("zod").ZodString;
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
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodString;
                    initialState: import("zod").ZodString;
                    client: import("zod").ZodString;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodString;
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
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: import("zod").ZodString;
                    initialState: import("zod").ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodString;
                        initialState: import("zod").ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
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
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodString;
                        zodValidationSchema: import("zod").ZodString;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
                initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                    sql: import("zod").ZodString;
                }) => TNewNext), defaultValue: () => TDefaultNext) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                        zodValidationSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodString;
                        initialState: TNewNext;
                        client: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodString;
                        initialState: TNewNext;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodString;
                            initialState: TNewNext;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                            }) => {
                                config: {
                                    sql: {
                                        type: "varchar";
                                        length: number;
                                    };
                                    zodSqlSchema: import("zod").ZodString;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                    };
                                };
                            };
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                            zodValidationSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                            };
                        };
                    };
                };
            } | {
                field: import("zod").ZodNumber;
                type: "reference";
                to: () => () => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodNumber;
                        zodValidationSchema: import("zod").ZodNumber;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodNumber;
                        client: import("zod").ZodNumber;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodNumber;
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
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: import("zod").ZodNumber;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodNumber;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodNumber;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: undefined;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                    };
                                };
                            };
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
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
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodNumber;
                            zodValidationSchema: import("zod").ZodNumber;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                    initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                        sql: import("zod").ZodNumber;
                    }) => TNewNext), defaultValue: () => TDefaultNext) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: TNewNext;
                            client: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: TNewNext;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: import("zod").ZodNumber;
                                initialState: TNewNext;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                };
                                transform: (transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                }) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: import("zod").ZodNumber;
                                        zodNewSchema: TNewNext;
                                        initialValue: import("zod").TypeOf<TNewNext>;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                        };
                                    };
                                };
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                    };
                                };
                            };
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
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
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
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
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodNumber;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodBoolean;
                    zodValidationSchema: import("zod").ZodBoolean;
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
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                        zodValidationSchema: import("zod").ZodString;
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
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodString;
                        zodValidationSchema: import("zod").ZodString;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodString;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodString;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodString;
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
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: undefined;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => string;
                                    toDb: (clientValue: string) => string;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodString;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodString;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                            }) => {
                                config: {
                                    sql: {
                                        type: "varchar";
                                        length: number;
                                    };
                                    zodSqlSchema: import("zod").ZodString;
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: undefined;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                    };
                                };
                            };
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
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
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                    initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                        sql: import("zod").ZodString;
                    }) => TNewNext), defaultValue: () => TDefaultNext) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                            zodValidationSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodString;
                            initialState: TNewNext;
                            client: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                            }) => {
                                config: {
                                    sql: {
                                        type: "varchar";
                                        length: number;
                                    };
                                    zodSqlSchema: import("zod").ZodString;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: import("zod").ZodString;
                            initialState: TNewNext;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: import("zod").ZodString;
                                initialState: TNewNext;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "varchar";
                                        length: number;
                                    };
                                    zodSqlSchema: import("zod").ZodString;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                };
                                transform: (transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                }) => {
                                    config: {
                                        sql: {
                                            type: "varchar";
                                            length: number;
                                        };
                                        zodSqlSchema: import("zod").ZodString;
                                        zodNewSchema: TNewNext;
                                        initialValue: import("zod").TypeOf<TNewNext>;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                        };
                                    };
                                };
                            };
                            transform: (transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                            }) => {
                                config: {
                                    sql: {
                                        type: "varchar";
                                        length: number;
                                    };
                                    zodSqlSchema: import("zod").ZodString;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                    };
                                };
                            };
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                                zodValidationSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                                };
                            };
                        };
                    };
                };
                userId: {
                    field: import("zod").ZodNumber;
                    type: "reference";
                    to: () => () => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodNumber;
                            zodValidationSchema: import("zod").ZodNumber;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodNumber;
                            client: import("zod").ZodNumber;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: import("zod").ZodNumber;
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
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: undefined;
                                    zodClientSchema: import("zod").ZodNumber;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => number;
                                        toDb: (clientValue: number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodNumber;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: import("zod").ZodNumber;
                                initialState: import("zod").ZodNumber;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: undefined;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                };
                                transform: (transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                }) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: import("zod").ZodNumber;
                                        zodNewSchema: import("zod").ZodNumber;
                                        initialValue: undefined;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                        };
                                    };
                                };
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: undefined;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: import("zod").ZodNumber;
                                zodValidationSchema: import("zod").ZodNumber;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                            sql: import("zod").ZodNumber;
                        }) => TNewNext), defaultValue: () => TDefaultNext) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            };
                            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: import("zod").ZodNumber;
                                initialState: TNewNext;
                                client: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                    zodValidationSchema: TValidationNext;
                                };
                                transform: (transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                                }) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: import("zod").ZodNumber;
                                        zodNewSchema: TNewNext;
                                        initialValue: import("zod").TypeOf<TNewNext>;
                                        zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                        zodValidationSchema: TValidationNext;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                                        };
                                    };
                                };
                            };
                            client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                                sql: import("zod").ZodNumber;
                                initialState: TNewNext;
                            }) => TClientNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                };
                                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                                    sql: import("zod").ZodNumber;
                                    initialState: TNewNext;
                                    client: TClientNext;
                                }) => TValidationNext)) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: import("zod").ZodNumber;
                                        zodNewSchema: TNewNext;
                                        initialValue: import("zod").TypeOf<TNewNext>;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                    };
                                    transform: (transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                    }) => {
                                        config: {
                                            sql: {
                                                type: "int";
                                                pk: true;
                                            };
                                            zodSqlSchema: import("zod").ZodNumber;
                                            zodNewSchema: TNewNext;
                                            initialValue: import("zod").TypeOf<TNewNext>;
                                            zodClientSchema: TClientNext;
                                            zodValidationSchema: TValidationNext;
                                        } & {
                                            transforms: {
                                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                            };
                                        };
                                    };
                                };
                                transform: (transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                }) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: import("zod").ZodNumber;
                                        zodNewSchema: TNewNext;
                                        initialValue: import("zod").TypeOf<TNewNext>;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TClientNext;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                        };
                                    };
                                };
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                    zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
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
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
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
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
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
    pet: {
        _tableName: string;
        id: {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: import("zod").ZodNumber;
                zodNewSchema: import("zod").ZodString;
                initialValue: string;
                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                zodValidationSchema: import("zod").ZodString;
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
                zodSqlSchema: import("zod").ZodString;
                zodNewSchema: import("zod").ZodString;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodString;
                zodValidationSchema: import("zod").ZodString;
            };
            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: import("zod").ZodString;
                initialState: import("zod").ZodString;
                client: import("zod").ZodString;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodString;
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
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodString;
                        zodValidationSchema: TValidationNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => string;
                            toDb: (clientValue: string) => string;
                        };
                    };
                };
            };
            client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: import("zod").ZodString;
                initialState: import("zod").ZodString;
            }) => TClientNext)) => {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodString;
                    initialState: import("zod").ZodString;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                }) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: undefined;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
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
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
            initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                sql: import("zod").ZodString;
            }) => TNewNext), defaultValue: () => TDefaultNext) => {
                config: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodSqlSchema: import("zod").ZodString;
                    zodNewSchema: TNewNext;
                    initialValue: import("zod").TypeOf<TNewNext>;
                    zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                    zodValidationSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodString;
                    initialState: TNewNext;
                    client: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                        zodValidationSchema: TValidationNext;
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                            };
                        };
                    };
                };
                client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: import("zod").ZodString;
                    initialState: TNewNext;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodString;
                        initialState: TNewNext;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                        }) => {
                            config: {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodSqlSchema: import("zod").ZodString;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                    }) => {
                        config: {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodSqlSchema: import("zod").ZodString;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => string;
                            };
                        };
                    };
                };
                transform: (transforms: {
                    toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                }) => {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                        zodValidationSchema: import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>;
                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends string ? TNewNext : import("zod").ZodUnion<[import("zod").ZodString, TNewNext]>>) => string;
                        };
                    };
                };
            };
        };
        userId: {
            field: import("zod").ZodNumber;
            type: "reference";
            to: () => () => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodNumber;
                    initialValue: undefined;
                    zodClientSchema: import("zod").ZodNumber;
                    zodValidationSchema: import("zod").ZodNumber;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: import("zod").ZodNumber;
                    client: import("zod").ZodNumber;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodNumber;
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
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: import("zod").ZodNumber;
                            zodValidationSchema: TValidationNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: import("zod").ZodNumber;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodNumber;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: undefined;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodNumber;
                            initialValue: undefined;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: undefined;
                        zodClientSchema: import("zod").ZodNumber;
                        zodValidationSchema: import("zod").ZodNumber;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => number;
                            toDb: (clientValue: number) => number;
                        };
                    };
                };
                initialState: <TNewNext extends import("zod").ZodTypeAny, TDefaultNext>(schema: TNewNext | ((tools: {
                    sql: import("zod").ZodNumber;
                }) => TNewNext), defaultValue: () => TDefaultNext) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: TNewNext;
                        initialValue: import("zod").TypeOf<TNewNext>;
                        zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                        zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: TNewNext;
                        client: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                            toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                                zodValidationSchema: TValidationNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                    toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: TNewNext;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: TNewNext;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                            };
                            transform: (transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                            }) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: TNewNext;
                                    initialValue: import("zod").TypeOf<TNewNext>;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                        toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                    };
                                };
                            };
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: TNewNext;
                                initialValue: import("zod").TypeOf<TNewNext>;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                        toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: TNewNext;
                            initialValue: import("zod").TypeOf<TNewNext>;
                            zodClientSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                            zodValidationSchema: import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>;
                                toDb: (clientValue: import("zod").TypeOf<import("zod").TypeOf<TNewNext> extends number ? TNewNext : import("zod").ZodUnion<[import("zod").ZodNumber, TNewNext]>>) => number;
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
                zodSqlSchema: import("zod").ZodString;
                zodNewSchema: import("zod").ZodString;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
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
                zodSqlSchema: import("zod").ZodNumber;
                zodNewSchema: import("zod").ZodNumber;
                initialValue: undefined;
                zodClientSchema: import("zod").ZodBoolean;
                zodValidationSchema: import("zod").ZodBoolean;
            } & {
                transforms: {
                    toClient: (dbValue: number) => boolean;
                    toDb: (clientValue: boolean) => number;
                };
            };
        };
    };
};
export { schemas };
