declare const schemas: {
    user: {
        _tableName: string & {
            __meta: {
                _key: "_tableName";
                _fieldType: string;
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
            };
        };
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
                zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
            };
            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: import("zod").ZodNumber;
                initialState: import("zod").ZodString;
                client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => string | number;
                    toDb: (clientValue: string | number) => number;
                }) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                        zodValidationSchema: TValidationNext;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        };
                    };
                };
            };
            client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: import("zod").ZodNumber;
                initialState: import("zod").ZodString;
            }) => TClientNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: import("zod").ZodString;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
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
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: number) => string | number;
                toDb: (clientValue: string | number) => number;
            }) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    };
                };
            };
        } & {
            __meta: {
                _key: "id";
                _fieldType: {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
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
                initialValue: string;
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
                    initialValue: string;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        } & {
            __meta: {
                _key: "firstname";
                _fieldType: {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
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
                initialValue: string;
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
                    initialValue: string;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        } & {
            __meta: {
                _key: "surname";
                _fieldType: {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
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
                initialValue: string;
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
                    initialValue: string;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        } & {
            __meta: {
                _key: "email";
                _fieldType: {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        _tableName: string;
    };
    pet: {
        _tableName: string & {
            __meta: {
                _key: "_tableName";
                _fieldType: string;
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
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
                        initialValue: string;
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
                            initialValue: string;
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
                                initialValue: string;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
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
                                initialValue: string;
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
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
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
                        initialValue: string;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: number;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
                        };
                    };
                };
            };
        };
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
                zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
            };
            validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: import("zod").ZodNumber;
                initialState: import("zod").ZodString;
                client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    zodValidationSchema: TValidationNext;
                };
                transform: (transforms: {
                    toClient: (dbValue: number) => string | number;
                    toDb: (clientValue: string | number) => number;
                }) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                        zodValidationSchema: TValidationNext;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        };
                    };
                };
            };
            client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: import("zod").ZodNumber;
                initialState: import("zod").ZodString;
            }) => TClientNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                };
                validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: import("zod").ZodNumber;
                    initialState: import("zod").ZodString;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
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
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                            toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                        };
                    };
                };
            };
            transform: (transforms: {
                toClient: (dbValue: number) => string | number;
                toDb: (clientValue: string | number) => number;
            }) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: import("zod").ZodNumber;
                    zodNewSchema: import("zod").ZodString;
                    initialValue: string;
                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    };
                };
            };
        } & {
            __meta: {
                _key: "id";
                _fieldType: {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
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
                        initialValue: string;
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
                            initialValue: string;
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
                                initialValue: string;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
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
                                initialValue: string;
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
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
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
                        initialValue: string;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: number;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
                        };
                    };
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
                initialValue: string;
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
                    initialValue: string;
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
                        initialValue: string;
                        zodClientSchema: import("zod").ZodString;
                        zodValidationSchema: TValidationNext;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                    initialValue: string;
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
                        initialValue: string;
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
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                    initialValue: string;
                    zodClientSchema: import("zod").ZodString;
                    zodValidationSchema: import("zod").ZodString;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: string) => string;
                        toDb: (clientValue: string) => string;
                    };
                };
            };
        } & {
            __meta: {
                _key: "name";
                _fieldType: {
                    config: {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
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
                            initialValue: string;
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
                                initialValue: string;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
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
                                initialValue: string;
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
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
                            };
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
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
                        initialValue: string;
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
                            initialValue: string;
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
                                initialValue: string;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
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
                                initialValue: string;
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
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
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
                        initialValue: string;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: number;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
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
                initialValue: string;
                zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
            } & {
                transforms: {
                    toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
                };
            };
        } & {
            __meta: {
                _key: "fluffynessScale";
                _fieldType: {
                    config: {
                        sql: {
                            type: "text";
                        };
                        zodSqlSchema: import("zod").ZodString;
                        zodNewSchema: import("zod").ZodString;
                        initialValue: string;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
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
                        initialValue: string;
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
                            initialValue: string;
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
                                initialValue: string;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
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
                                initialValue: string;
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
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
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
                        initialValue: string;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: number;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
                        };
                    };
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
                initialValue: number;
                zodClientSchema: import("zod").ZodBoolean;
                zodValidationSchema: import("zod").ZodBoolean;
                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
            } & {
                transforms: {
                    toClient: (dbValue: number) => boolean;
                    toDb: (clientValue: boolean) => number;
                };
            };
        } & {
            __meta: {
                _key: "favourite";
                _fieldType: {
                    config: {
                        sql: {
                            type: "int";
                        };
                        zodSqlSchema: import("zod").ZodNumber;
                        zodNewSchema: import("zod").ZodNumber;
                        initialValue: number;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
                        };
                    };
                };
            };
            __parentTableType: {
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
                        zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    };
                    validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                        client: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: TValidationNext;
                        };
                        transform: (transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        }) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends import("zod").ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: import("zod").ZodNumber;
                        initialState: import("zod").ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends import("zod").ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: import("zod").ZodNumber;
                            initialState: import("zod").ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
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
                                    zodNewSchema: import("zod").ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                zodNewSchema: import("zod").ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => import("zod").TypeOf<TClientNext>;
                                    toDb: (clientValue: import("zod").TypeOf<TClientNext>) => number;
                                };
                            };
                        };
                    };
                    transform: (transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    }) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: import("zod").ZodNumber;
                            zodNewSchema: import("zod").ZodString;
                            initialValue: string;
                            zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            zodValidationSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodString]>;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
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
                        initialValue: string;
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
                            initialValue: string;
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
                                initialValue: string;
                                zodClientSchema: import("zod").ZodString;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
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
                                initialValue: string;
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
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                            initialValue: string;
                            zodClientSchema: import("zod").ZodString;
                            zodValidationSchema: import("zod").ZodString;
                            clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: string) => string;
                                toDb: (clientValue: string) => string;
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
                        initialValue: string;
                        zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
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
                        initialValue: number;
                        zodClientSchema: import("zod").ZodBoolean;
                        zodValidationSchema: import("zod").ZodBoolean;
                        clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                        validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
                        };
                    };
                };
            };
        };
    } & {
        _tableName: string;
    };
};
export { schemas };
