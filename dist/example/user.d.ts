import { z } from "zod";
export declare const petSchema: {
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodString;
            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: TValidationNext;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodString;
        }) => TClientNext)) => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
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
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
            zodSqlSchema: z.ZodString;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
            zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodNumber;
            initialValue: number;
            zodClientSchema: z.ZodBoolean;
            zodValidationSchema: z.ZodBoolean;
            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodNumber;
                    initialValue: number;
                    zodClientSchema: z.ZodBoolean;
                    zodValidationSchema: z.ZodBoolean;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodString;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
    _schemaWrapper: true;
};
export declare const userSchema: {
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodString;
            initialValue: string;
            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        };
        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodString;
            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }) => TValidationNext)) => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: TValidationNext;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => string | number;
                        toDb: (clientValue: string | number) => number;
                    };
                };
            };
        };
        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
            sql: z.ZodNumber;
            initialState: z.ZodString;
        }) => TClientNext)) => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: TClientNext;
                zodValidationSchema: TClientNext;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodString;
                client: TClientNext;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
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
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TValidationNext;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
    _schemaWrapper: true;
};
export declare const userReferences: {
    pets: {
        config: {
            sql: import("../schema.js").RelationConfig<{
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
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => boolean;
                            toDb: (clientValue: boolean) => number;
                        };
                    };
                };
            }>;
            zodSqlSchema: z.ZodArray<z.ZodObject<{
                id: z.ZodNumber;
                name: z.ZodString;
                fluffynessScale: z.ZodString;
                favourite: z.ZodNumber;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                name: string;
                id: number;
                fluffynessScale: string;
                favourite: number;
            }, {
                name: string;
                id: number;
                fluffynessScale: string;
                favourite: number;
            }>, "many">;
            zodNewSchema: z.ZodArray<z.ZodObject<{
                id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                name: z.ZodString;
                fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                favourite: z.ZodBoolean;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                name: string;
                id: string | number;
                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                favourite: boolean;
            }, {
                name: string;
                id: string | number;
                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                favourite: boolean;
            }>, "many">;
            initialValue: any[];
            zodClientSchema: z.ZodArray<z.ZodObject<{
                id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                name: z.ZodString;
                fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                favourite: z.ZodBoolean;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                name: string;
                id: string | number;
                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                favourite: boolean;
            }, {
                name: string;
                id: string | number;
                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                favourite: boolean;
            }>, "many">;
            zodValidationSchema: z.ZodArray<z.ZodObject<{
                id: z.ZodNumber;
                name: z.ZodString;
                fluffynessScale: z.ZodString;
                favourite: z.ZodNumber;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                name: string;
                id: number;
                fluffynessScale: string;
                favourite: number;
            }, {
                name: string;
                id: number;
                fluffynessScale: string;
                favourite: number;
            }>, "many">;
        };
        transform: (transforms: {
            toClient: (dbValue: {
                name: string;
                id: number;
                fluffynessScale: string;
                favourite: number;
            }[]) => {
                name: string;
                id: string | number;
                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                favourite: boolean;
            }[];
            toDb: (clientValue: {
                name: string;
                id: string | number;
                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                favourite: boolean;
            }[]) => {
                name: string;
                id: number;
                fluffynessScale: string;
                favourite: number;
            }[];
        }) => {
            config: {
                sql: import("../schema.js").RelationConfig<{
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
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodString;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                            zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => boolean;
                                toDb: (clientValue: boolean) => number;
                            };
                        };
                    };
                }>;
                zodSqlSchema: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    name: z.ZodString;
                    fluffynessScale: z.ZodString;
                    favourite: z.ZodNumber;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                }, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                }>, "many">;
                zodNewSchema: z.ZodArray<z.ZodObject<{
                    id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    name: z.ZodString;
                    fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    favourite: z.ZodBoolean;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    name: string;
                    id: string | number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                }, {
                    name: string;
                    id: string | number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                }>, "many">;
                initialValue: any[];
                zodClientSchema: z.ZodArray<z.ZodObject<{
                    id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    name: z.ZodString;
                    fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    favourite: z.ZodBoolean;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    name: string;
                    id: string | number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                }, {
                    name: string;
                    id: string | number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                }>, "many">;
                zodValidationSchema: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    name: z.ZodString;
                    fluffynessScale: z.ZodString;
                    favourite: z.ZodNumber;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                }, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                }>, "many">;
                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
            } & {
                transforms: {
                    toClient: (dbValue: {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }[]) => {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }[];
                    toDb: (clientValue: {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }[]) => {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }[];
                };
            };
        };
    } & {
        __meta: {
            _key: "pets";
            _fieldType: {
                config: {
                    sql: import("../schema.js").RelationConfig<{
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
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => string | number;
                                            toDb: (clientValue: string | number) => number;
                                        };
                                    };
                                };
                            };
                            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                            }) => TClientNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                };
                                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                    sql: z.ZodNumber;
                                    initialState: z.ZodString;
                                    client: TClientNext;
                                }) => TValidationNext)) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
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
                                            zodNewSchema: z.ZodString;
                                            initialValue: string;
                                            zodClientSchema: TClientNext;
                                            zodValidationSchema: TValidationNext;
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TClientNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                                zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => boolean;
                                    toDb: (clientValue: boolean) => number;
                                };
                            };
                        };
                    }>;
                    zodSqlSchema: z.ZodArray<z.ZodObject<{
                        id: z.ZodNumber;
                        name: z.ZodString;
                        fluffynessScale: z.ZodString;
                        favourite: z.ZodNumber;
                    }, z.UnknownKeysParam, z.ZodTypeAny, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }>, "many">;
                    zodNewSchema: z.ZodArray<z.ZodObject<{
                        id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        name: z.ZodString;
                        fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        favourite: z.ZodBoolean;
                    }, z.UnknownKeysParam, z.ZodTypeAny, {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }, {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }>, "many">;
                    initialValue: any[];
                    zodClientSchema: z.ZodArray<z.ZodObject<{
                        id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        name: z.ZodString;
                        fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        favourite: z.ZodBoolean;
                    }, z.UnknownKeysParam, z.ZodTypeAny, {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }, {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }>, "many">;
                    zodValidationSchema: z.ZodArray<z.ZodObject<{
                        id: z.ZodNumber;
                        name: z.ZodString;
                        fluffynessScale: z.ZodString;
                        favourite: z.ZodNumber;
                    }, z.UnknownKeysParam, z.ZodTypeAny, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }>, "many">;
                };
                transform: (transforms: {
                    toClient: (dbValue: {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }[]) => {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }[];
                    toDb: (clientValue: {
                        name: string;
                        id: string | number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                    }[]) => {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                    }[];
                }) => {
                    config: {
                        sql: import("../schema.js").RelationConfig<{
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
                                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                };
                                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                    sql: z.ZodNumber;
                                    initialState: z.ZodString;
                                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                }) => TValidationNext)) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                            zodSqlSchema: z.ZodNumber;
                                            zodNewSchema: z.ZodString;
                                            initialValue: string;
                                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                            zodValidationSchema: TValidationNext;
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        } & {
                                            transforms: {
                                                toClient: (dbValue: number) => string | number;
                                                toDb: (clientValue: string | number) => number;
                                            };
                                        };
                                    };
                                };
                                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                                    sql: z.ZodNumber;
                                    initialState: z.ZodString;
                                }) => TClientNext)) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TClientNext;
                                    };
                                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                        sql: z.ZodNumber;
                                        initialState: z.ZodString;
                                        client: TClientNext;
                                    }) => TValidationNext)) => {
                                        config: {
                                            sql: {
                                                type: "int";
                                                pk: true;
                                            };
                                            zodSqlSchema: z.ZodNumber;
                                            zodNewSchema: z.ZodString;
                                            initialValue: string;
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
                                                zodNewSchema: z.ZodString;
                                                initialValue: string;
                                                zodClientSchema: TClientNext;
                                                zodValidationSchema: TValidationNext;
                                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                            zodNewSchema: z.ZodString;
                                            initialValue: string;
                                            zodClientSchema: TClientNext;
                                            zodValidationSchema: TClientNext;
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        } & {
                                            transforms: {
                                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodSqlSchema: z.ZodString;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                                    zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => boolean;
                                        toDb: (clientValue: boolean) => number;
                                    };
                                };
                            };
                        }>;
                        zodSqlSchema: z.ZodArray<z.ZodObject<{
                            id: z.ZodNumber;
                            name: z.ZodString;
                            fluffynessScale: z.ZodString;
                            favourite: z.ZodNumber;
                        }, z.UnknownKeysParam, z.ZodTypeAny, {
                            name: string;
                            id: number;
                            fluffynessScale: string;
                            favourite: number;
                        }, {
                            name: string;
                            id: number;
                            fluffynessScale: string;
                            favourite: number;
                        }>, "many">;
                        zodNewSchema: z.ZodArray<z.ZodObject<{
                            id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            name: z.ZodString;
                            fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                            favourite: z.ZodBoolean;
                        }, z.UnknownKeysParam, z.ZodTypeAny, {
                            name: string;
                            id: string | number;
                            fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            favourite: boolean;
                        }, {
                            name: string;
                            id: string | number;
                            fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            favourite: boolean;
                        }>, "many">;
                        initialValue: any[];
                        zodClientSchema: z.ZodArray<z.ZodObject<{
                            id: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            name: z.ZodString;
                            fluffynessScale: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                            favourite: z.ZodBoolean;
                        }, z.UnknownKeysParam, z.ZodTypeAny, {
                            name: string;
                            id: string | number;
                            fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            favourite: boolean;
                        }, {
                            name: string;
                            id: string | number;
                            fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            favourite: boolean;
                        }>, "many">;
                        zodValidationSchema: z.ZodArray<z.ZodObject<{
                            id: z.ZodNumber;
                            name: z.ZodString;
                            fluffynessScale: z.ZodString;
                            favourite: z.ZodNumber;
                        }, z.UnknownKeysParam, z.ZodTypeAny, {
                            name: string;
                            id: number;
                            fluffynessScale: string;
                            favourite: number;
                        }, {
                            name: string;
                            id: number;
                            fluffynessScale: string;
                            favourite: number;
                        }>, "many">;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: {
                                name: string;
                                id: number;
                                fluffynessScale: string;
                                favourite: number;
                            }[]) => {
                                name: string;
                                id: string | number;
                                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                                favourite: boolean;
                            }[];
                            toDb: (clientValue: {
                                name: string;
                                id: string | number;
                                fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                                favourite: boolean;
                            }[]) => {
                                name: string;
                                id: number;
                                fluffynessScale: string;
                                favourite: number;
                            }[];
                        };
                    };
                };
            };
        };
        __parentTableType: {
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
            _schemaWrapper: true;
        };
    };
    petId: {
        type: "reference";
        to: () => {
            config: {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodSqlSchema: z.ZodNumber;
                zodNewSchema: z.ZodString;
                initialValue: string;
                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            };
            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodString;
                client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            }) => TValidationNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: TValidationNext;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => string | number;
                            toDb: (clientValue: string | number) => number;
                        };
                    };
                };
            };
            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                sql: z.ZodNumber;
                initialState: z.ZodString;
            }) => TClientNext)) => {
                config: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: TClientNext;
                    zodValidationSchema: TClientNext;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: TClientNext;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    } & {
                        transforms: {
                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        zodSqlSchema: z.ZodString;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
        __meta: {
            _key: "petId";
            _fieldType: {
                type: "reference";
                to: () => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => string | number;
                                    toDb: (clientValue: string | number) => number;
                                };
                            };
                        };
                    };
                    client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                    }) => TClientNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: TClientNext;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                    toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => string | number;
                                            toDb: (clientValue: string | number) => number;
                                        };
                                    };
                                };
                            };
                            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                            }) => TClientNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                };
                                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                    sql: z.ZodNumber;
                                    initialState: z.ZodString;
                                    client: TClientNext;
                                }) => TValidationNext)) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
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
                                            zodNewSchema: z.ZodString;
                                            initialValue: string;
                                            zodClientSchema: TClientNext;
                                            zodValidationSchema: TValidationNext;
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TClientNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => string | number;
                                            toDb: (clientValue: string | number) => number;
                                        };
                                    };
                                };
                            };
                            client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                            }) => TClientNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                };
                                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                    sql: z.ZodNumber;
                                    initialState: z.ZodString;
                                    client: TClientNext;
                                }) => TValidationNext)) => {
                                    config: {
                                        sql: {
                                            type: "int";
                                            pk: true;
                                        };
                                        zodSqlSchema: z.ZodNumber;
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
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
                                            zodNewSchema: z.ZodString;
                                            initialValue: string;
                                            zodClientSchema: TClientNext;
                                            zodValidationSchema: TValidationNext;
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TClientNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    } & {
                                        transforms: {
                                            toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                            toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                zodSqlSchema: z.ZodString;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                                zodValidationSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => boolean;
                                    toDb: (clientValue: boolean) => number;
                                };
                            };
                        };
                    };
                };
            };
        };
        __parentTableType: {
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                    zodSqlSchema: z.ZodNumber;
                    zodNewSchema: z.ZodString;
                    initialValue: string;
                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                    zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                };
                validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                    client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                }) => TValidationNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: TValidationNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => string | number;
                                toDb: (clientValue: string | number) => number;
                            };
                        };
                    };
                };
                client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                    sql: z.ZodNumber;
                    initialState: z.ZodString;
                }) => TClientNext)) => {
                    config: {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: TClientNext;
                        zodValidationSchema: TClientNext;
                    };
                    validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                        sql: z.ZodNumber;
                        initialState: z.ZodString;
                        client: TClientNext;
                    }) => TValidationNext)) => {
                        config: {
                            sql: {
                                type: "int";
                                pk: true;
                            };
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
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
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TValidationNext;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: TClientNext;
                            zodValidationSchema: TClientNext;
                            clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                            validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                        zodSqlSchema: z.ZodNumber;
                        zodNewSchema: z.ZodString;
                        initialValue: string;
                        zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodString;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                            zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        };
                        validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                            client: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                        }) => TValidationNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
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
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                    zodValidationSchema: TValidationNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => string | number;
                                        toDb: (clientValue: string | number) => number;
                                    };
                                };
                            };
                        };
                        client: <TClientNext extends z.ZodTypeAny>(schema: TClientNext | ((tools: {
                            sql: z.ZodNumber;
                            initialState: z.ZodString;
                        }) => TClientNext)) => {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: TClientNext;
                                zodValidationSchema: TClientNext;
                            };
                            validation: <TValidationNext extends z.ZodTypeAny>(schema: TValidationNext | ((tools: {
                                sql: z.ZodNumber;
                                initialState: z.ZodString;
                                client: TClientNext;
                            }) => TValidationNext)) => {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: z.ZodNumber;
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
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
                                        zodNewSchema: z.ZodString;
                                        initialValue: string;
                                        zodClientSchema: TClientNext;
                                        zodValidationSchema: TValidationNext;
                                        clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                        validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                    zodNewSchema: z.ZodString;
                                    initialValue: string;
                                    zodClientSchema: TClientNext;
                                    zodValidationSchema: TClientNext;
                                    clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                    validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => z.TypeOf<TClientNext>;
                                        toDb: (clientValue: z.TypeOf<TClientNext>) => number;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodString;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                zodValidationSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
                                clientTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
                                validationTransform?: (schema: z.ZodTypeAny) => z.ZodTypeAny;
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
            _schemaWrapper: true;
        };
    };
};
