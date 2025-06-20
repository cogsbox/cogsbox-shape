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
                zodSqlSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                zodNewSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                initialValue: any[];
                zodClientSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                zodValidationSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
            };
            transform: (transforms: {
                toClient: (dbValue: any[]) => any[];
                toDb: (clientValue: any[]) => any[];
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
                    zodSqlSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                    zodNewSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                    initialValue: any[];
                    zodClientSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                    zodValidationSchema: import("zod").ZodArray<import("zod").ZodAny, "many">;
                } & {
                    transforms: {
                        toClient: (dbValue: any[]) => any[];
                        toDb: (clientValue: any[]) => any[];
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
