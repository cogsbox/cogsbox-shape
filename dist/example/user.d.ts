import { z } from "zod";
export declare const petSchema: {
    _tableName: string;
    id: {
        config: {
            sql: {
                type: "int";
                pk: true;
            };
            zodSqlSchema: z.ZodNumber;
            zodNewSchema: z.ZodNumber;
            initialValue: string;
            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
            zodValidationSchema: z.ZodString;
        } & {
            transforms: {
                toClient: (dbValue: number) => number;
                toDb: (clientValue: number) => number;
            };
        };
    };
    name: import("../schema.js").Builder<"sql", {
        type: "varchar";
        length: number;
    }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
    userId: {
        type: "reference";
        to: () => import("../schema.js").Builder<"sql", {
            type: "int";
            pk: true;
        }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
export declare const userSchema: {
    _tableName: string;
    id: import("../schema.js").Builder<"sql", {
        type: "int";
        pk: true;
    }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                            zodValidationSchema: z.ZodString;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                    name: import("../schema.js").Builder<"sql", {
                        type: "varchar";
                        length: number;
                    }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                    userId: {
                        type: "reference";
                        to: () => import("../schema.js").Builder<"sql", {
                            type: "int";
                            pk: true;
                        }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                            zodValidationSchema: z.ZodString;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                    name: import("../schema.js").Builder<"sql", {
                        type: "varchar";
                        length: number;
                    }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                    userId: {
                        type: "reference";
                        to: () => import("../schema.js").Builder<"sql", {
                            type: "int";
                            pk: true;
                        }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                            zodValidationSchema: z.ZodString;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                    name: import("../schema.js").Builder<"sql", {
                        type: "varchar";
                        length: number;
                    }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                    userId: {
                        type: "reference";
                        to: () => import("../schema.js").Builder<"sql", {
                            type: "int";
                            pk: true;
                        }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                            zodSqlSchema: z.ZodNumber;
                            zodNewSchema: z.ZodNumber;
                            initialValue: string;
                            zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                            zodValidationSchema: z.ZodString;
                        } & {
                            transforms: {
                                toClient: (dbValue: number) => number;
                                toDb: (clientValue: number) => number;
                            };
                        };
                    };
                    name: import("../schema.js").Builder<"sql", {
                        type: "varchar";
                        length: number;
                    }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                    userId: {
                        type: "reference";
                        to: () => import("../schema.js").Builder<"sql", {
                            type: "int";
                            pk: true;
                        }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                defaultCount?: number;
            } & {
                type: "manyToMany";
            });
            zodSqlSchema: z.ZodArray<z.ZodAny, "many">;
            zodNewSchema: z.ZodArray<z.ZodAny, "many">;
            initialValue: any[];
            zodClientSchema: z.ZodArray<z.ZodAny, "many">;
            zodValidationSchema: z.ZodArray<z.ZodAny, "many">;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodNumber;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                                zodValidationSchema: z.ZodString;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("../schema.js").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("../schema.js").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodNumber;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                                zodValidationSchema: z.ZodString;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("../schema.js").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("../schema.js").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodNumber;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                                zodValidationSchema: z.ZodString;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("../schema.js").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("../schema.js").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                                zodSqlSchema: z.ZodNumber;
                                zodNewSchema: z.ZodNumber;
                                initialValue: string;
                                zodClientSchema: z.ZodUnion<[z.ZodNumber, z.ZodNumber]>;
                                zodValidationSchema: z.ZodString;
                            } & {
                                transforms: {
                                    toClient: (dbValue: number) => number;
                                    toDb: (clientValue: number) => number;
                                };
                            };
                        };
                        name: import("../schema.js").Builder<"sql", {
                            type: "varchar";
                            length: number;
                        }, z.ZodString, z.ZodString, string, z.ZodString, z.ZodString>;
                        userId: {
                            type: "reference";
                            to: () => import("../schema.js").Builder<"sql", {
                                type: "int";
                                pk: true;
                            }, z.ZodNumber, z.ZodNumber, number, z.ZodNumber, z.ZodNumber>;
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
                    defaultCount?: number;
                } & {
                    type: "manyToMany";
                });
                zodSqlSchema: z.ZodArray<z.ZodAny, "many">;
                zodNewSchema: z.ZodArray<z.ZodAny, "many">;
                initialValue: any[];
                zodClientSchema: z.ZodArray<z.ZodAny, "many">;
                zodValidationSchema: z.ZodArray<z.ZodAny, "many">;
            } & {
                transforms: {
                    toClient: (dbValue: any[]) => any[];
                    toDb: (clientValue: any[]) => any[];
                };
            };
        };
    };
};
