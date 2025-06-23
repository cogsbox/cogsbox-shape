declare const schemas: {
    user: {
        _tableName: string;
        id: import("..").Builder<"sql", {
            type: "int";
            pk: true;
        }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
        pets: {
            config: {
                sql: ({
                    fromKey: string;
                    toKey: () => any;
                    schema: () => {
                        _tableName: string;
                        id: {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                zodValidationSchema: import("zod").ZodString;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("..").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("..").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                    defaultCount?: number;
                } & {
                    type: "hasMany";
                }) | ({
                    fromKey: string;
                    toKey: () => any;
                    schema: () => {
                        _tableName: string;
                        id: {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                zodValidationSchema: import("zod").ZodString;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("..").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("..").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                    defaultCount?: number;
                } & {
                    type: "hasOne";
                }) | ({
                    fromKey: string;
                    toKey: () => any;
                    schema: () => {
                        _tableName: string;
                        id: {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                zodValidationSchema: import("zod").ZodString;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("..").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("..").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                    defaultCount?: number;
                } & {
                    type: "belongsTo";
                }) | ({
                    fromKey: string;
                    toKey: () => any;
                    schema: () => {
                        _tableName: string;
                        id: {
                            config: {
                                sql: {
                                    type: "int";
                                    pk: true;
                                };
                                zodSqlSchema: import("zod").ZodNumber;
                                zodNewSchema: import("zod").ZodNumber;
                                initialValue: string;
                                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                zodValidationSchema: import("zod").ZodString;
                                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("..").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("..").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                    defaultCount?: number;
                } & {
                    type: "manyToMany";
                });
                zodSqlSchema: import("zod").ZodArray<import("zod").ZodObject<{
                    id: import("zod").ZodNumber;
                    name: import("zod").ZodString;
                    userId: import("zod").ZodAny;
                    fluffynessScale: import("zod").ZodString;
                    favourite: import("zod").ZodNumber;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                    userId?: any;
                }, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                    userId?: any;
                }>, "many">;
                zodNewSchema: import("zod").ZodArray<import("zod").ZodObject<{
                    id: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                    name: import("zod").ZodString;
                    userId: import("zod").ZodAny;
                    fluffynessScale: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    favourite: import("zod").ZodBoolean;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    name: string;
                    id: number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                    userId?: any;
                }, {
                    name: string;
                    id: number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                    userId?: any;
                }>, "many">;
                initialValue: any[];
                zodClientSchema: import("zod").ZodArray<import("zod").ZodObject<{
                    id: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                    name: import("zod").ZodString;
                    userId: import("zod").ZodAny;
                    fluffynessScale: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    favourite: import("zod").ZodBoolean;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    name: string;
                    id: number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                    userId?: any;
                }, {
                    name: string;
                    id: number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                    userId?: any;
                }>, "many">;
                zodValidationSchema: import("zod").ZodArray<import("zod").ZodObject<{
                    id: import("zod").ZodNumber;
                    name: import("zod").ZodString;
                    userId: import("zod").ZodAny;
                    fluffynessScale: import("zod").ZodString;
                    favourite: import("zod").ZodNumber;
                }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                    userId?: any;
                }, {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                    userId?: any;
                }>, "many">;
            };
            transform: (transforms: {
                toClient: (dbValue: {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                    userId?: any;
                }[]) => {
                    name: string;
                    id: number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                    userId?: any;
                }[];
                toDb: (clientValue: {
                    name: string;
                    id: number;
                    fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    favourite: boolean;
                    userId?: any;
                }[]) => {
                    name: string;
                    id: number;
                    fluffynessScale: string;
                    favourite: number;
                    userId?: any;
                }[];
            }) => {
                config: {
                    sql: ({
                        fromKey: string;
                        toKey: () => any;
                        schema: () => {
                            _tableName: string;
                            id: {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: string;
                                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                    zodValidationSchema: import("zod").ZodString;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => number;
                                        toDb: (clientValue: number) => number;
                                    };
                                };
                            };
                            name: import("..").Builder<"sql", {
                                type: "varchar";
                                length: number;
                            }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                            userId: {
                                type: "reference";
                                to: () => import("..").Builder<"sql", {
                                    type: "int";
                                    pk: true;
                                }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                        defaultCount?: number;
                    } & {
                        type: "hasMany";
                    }) | ({
                        fromKey: string;
                        toKey: () => any;
                        schema: () => {
                            _tableName: string;
                            id: {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: string;
                                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                    zodValidationSchema: import("zod").ZodString;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => number;
                                        toDb: (clientValue: number) => number;
                                    };
                                };
                            };
                            name: import("..").Builder<"sql", {
                                type: "varchar";
                                length: number;
                            }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                            userId: {
                                type: "reference";
                                to: () => import("..").Builder<"sql", {
                                    type: "int";
                                    pk: true;
                                }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                        defaultCount?: number;
                    } & {
                        type: "hasOne";
                    }) | ({
                        fromKey: string;
                        toKey: () => any;
                        schema: () => {
                            _tableName: string;
                            id: {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: string;
                                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                    zodValidationSchema: import("zod").ZodString;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => number;
                                        toDb: (clientValue: number) => number;
                                    };
                                };
                            };
                            name: import("..").Builder<"sql", {
                                type: "varchar";
                                length: number;
                            }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                            userId: {
                                type: "reference";
                                to: () => import("..").Builder<"sql", {
                                    type: "int";
                                    pk: true;
                                }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                        defaultCount?: number;
                    } & {
                        type: "belongsTo";
                    }) | ({
                        fromKey: string;
                        toKey: () => any;
                        schema: () => {
                            _tableName: string;
                            id: {
                                config: {
                                    sql: {
                                        type: "int";
                                        pk: true;
                                    };
                                    zodSqlSchema: import("zod").ZodNumber;
                                    zodNewSchema: import("zod").ZodNumber;
                                    initialValue: string;
                                    zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                                    zodValidationSchema: import("zod").ZodString;
                                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                                } & {
                                    transforms: {
                                        toClient: (dbValue: number) => number;
                                        toDb: (clientValue: number) => number;
                                    };
                                };
                            };
                            name: import("..").Builder<"sql", {
                                type: "varchar";
                                length: number;
                            }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
                            userId: {
                                type: "reference";
                                to: () => import("..").Builder<"sql", {
                                    type: "int";
                                    pk: true;
                                }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
                        defaultCount?: number;
                    } & {
                        type: "manyToMany";
                    });
                    zodSqlSchema: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodNumber;
                        name: import("zod").ZodString;
                        userId: import("zod").ZodAny;
                        fluffynessScale: import("zod").ZodString;
                        favourite: import("zod").ZodNumber;
                    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                        userId?: any;
                    }, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                        userId?: any;
                    }>, "many">;
                    zodNewSchema: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                        name: import("zod").ZodString;
                        userId: import("zod").ZodAny;
                        fluffynessScale: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        favourite: import("zod").ZodBoolean;
                    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                        name: string;
                        id: number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                        userId?: any;
                    }, {
                        name: string;
                        id: number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                        userId?: any;
                    }>, "many">;
                    initialValue: any[];
                    zodClientSchema: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                        name: import("zod").ZodString;
                        userId: import("zod").ZodAny;
                        fluffynessScale: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                        favourite: import("zod").ZodBoolean;
                    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                        name: string;
                        id: number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                        userId?: any;
                    }, {
                        name: string;
                        id: number;
                        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                        favourite: boolean;
                        userId?: any;
                    }>, "many">;
                    zodValidationSchema: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodNumber;
                        name: import("zod").ZodString;
                        userId: import("zod").ZodAny;
                        fluffynessScale: import("zod").ZodString;
                        favourite: import("zod").ZodNumber;
                    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                        userId?: any;
                    }, {
                        name: string;
                        id: number;
                        fluffynessScale: string;
                        favourite: number;
                        userId?: any;
                    }>, "many">;
                    clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                    validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                } & {
                    transforms: {
                        toClient: (dbValue: {
                            name: string;
                            id: number;
                            fluffynessScale: string;
                            favourite: number;
                            userId?: any;
                        }[]) => {
                            name: string;
                            id: number;
                            fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            favourite: boolean;
                            userId?: any;
                        }[];
                        toDb: (clientValue: {
                            name: string;
                            id: number;
                            fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                            favourite: boolean;
                            userId?: any;
                        }[]) => {
                            name: string;
                            id: number;
                            fluffynessScale: string;
                            favourite: number;
                            userId?: any;
                        }[];
                    };
                };
            };
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
                zodNewSchema: import("zod").ZodNumber;
                initialValue: string;
                zodClientSchema: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodNumber]>;
                zodValidationSchema: import("zod").ZodString;
                clientTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
                validationTransform?: (schema: import("zod").ZodTypeAny) => import("zod").ZodTypeAny;
            } & {
                transforms: {
                    toClient: (dbValue: number) => number;
                    toDb: (clientValue: number) => number;
                };
            };
        };
        name: import("..").Builder<"sql", {
            type: "varchar";
            length: number;
        }, import("zod").ZodString, import("zod").ZodString, string, import("zod").ZodString, import("zod").ZodString>;
        userId: {
            type: "reference";
            to: () => import("..").Builder<"sql", {
                type: "int";
                pk: true;
            }, import("zod").ZodNumber, import("zod").ZodNumber, number, import("zod").ZodNumber, import("zod").ZodNumber>;
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
export { schemas };
