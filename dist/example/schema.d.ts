declare const schemas: {
    user: {
        _tableName: string;
        id: {
            sql: {
                type: "int";
                pk: true;
            };
            dbType: import("zod").ZodNumber;
            zodDbSchema: import("zod").ZodNumber;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: number;
            client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: import("zod").ZodString;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: number) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => number;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: number) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => number;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            db: <ServerType extends import("zod").ZodTypeAny>(assert: (tools: {
                zod: import("zod").ZodNumber;
            }) => ServerType) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                dbType: ServerType;
                zodDbSchema: ServerType;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: import("zod").TypeOf<ServerType>;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodString;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodNumber | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: number) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => number;
                    }) => {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodDbSchema: import("zod").ZodNumber | ServerType;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: number) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => number;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
            };
        };
        firstname: {
            sql: {
                type: "varchar";
                length: number;
            };
            dbType: import("zod").ZodString;
            zodDbSchema: import("zod").ZodString;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: string;
            client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: import("zod").ZodString;
                serverType?: import("zod").ZodString;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
        surname: {
            sql: {
                type: "varchar";
                length: number;
            };
            dbType: import("zod").ZodString;
            zodDbSchema: import("zod").ZodString;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: string;
            client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: import("zod").ZodString;
                serverType?: import("zod").ZodString;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
        email: {
            sql: {
                type: "varchar";
                length: number;
            };
            dbType: import("zod").ZodString;
            zodDbSchema: import("zod").ZodString;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: string;
            client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: import("zod").ZodString;
                serverType?: import("zod").ZodString;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
        };
        pets: () => {
            type: "hasMany";
            fromKey: string;
            toKey: string | {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: any;
                defaultValue: string;
                transform: (transforms: {
                    toClient: (dbValue: number) => string;
                    toDb: (clientValue: string) => number;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: import("zod").ZodString;
                    jsonSchema: any;
                    defaultValue: string;
                    toClient: (dbValue: number) => string;
                    toDb: (clientValue: string) => number;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            } | {
                sql: {
                    type: "varchar";
                    length: number;
                };
                dbType: import("zod").ZodString;
                zodDbSchema: import("zod").ZodString;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: string;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodString;
                    serverType?: never;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodString;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
                db: <ServerType extends import("zod").ZodTypeAny>(assert: (tools: {
                    zod: import("zod").ZodString;
                }) => ServerType) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    dbType: ServerType;
                    zodDbSchema: ServerType;
                    zodClientSchema: import("zod").ZodString;
                    jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                        $schema?: string | undefined;
                        definitions?: {
                            [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                        } | undefined;
                    };
                    defaultValue: import("zod").TypeOf<ServerType>;
                    client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: import("zod").ZodString;
                        serverType?: ServerType;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodString | ServerType;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                        }) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: import("zod").ZodString | ServerType;
                            zodClientSchema: ClientType;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                            transforms: {
                                toClient: string;
                                toDb: string;
                            };
                        };
                    };
                };
            } | {
                sql: {
                    type: "int";
                };
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: any;
                defaultValue: string;
                transform: (transforms: {
                    toClient: (dbValue: number) => string;
                    toDb: (clientValue: string) => number;
                }) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: import("zod").ZodString;
                    jsonSchema: any;
                    defaultValue: string;
                    toClient: (dbValue: number) => string;
                    toDb: (clientValue: string) => number;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            } | {
                sql: {
                    type: "text";
                };
                zodDbSchema: import("zod").ZodString;
                zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                jsonSchema: any;
                defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            } | {
                sql: {
                    type: "int";
                };
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: import("zod").ZodBoolean;
                jsonSchema: any;
                defaultValue: boolean;
                toClient: (dbValue: number) => boolean;
                toDb: (clientValue: boolean) => number;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
            schema: {
                _tableName: string;
                id: {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: import("zod").ZodString;
                    jsonSchema: any;
                    defaultValue: string;
                    transform: (transforms: {
                        toClient: (dbValue: number) => string;
                        toDb: (clientValue: string) => number;
                    }) => {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodDbSchema: import("zod").ZodNumber;
                        zodClientSchema: import("zod").ZodString;
                        jsonSchema: any;
                        defaultValue: string;
                        toClient: (dbValue: number) => string;
                        toDb: (clientValue: string) => number;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
                name: {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    dbType: import("zod").ZodString;
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: import("zod").ZodString;
                    jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                        $schema?: string | undefined;
                        definitions?: {
                            [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                        } | undefined;
                    };
                    defaultValue: string;
                    client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: import("zod").ZodString;
                        serverType?: never;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodString;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                        }) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: import("zod").ZodString;
                            zodClientSchema: ClientType;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                            transforms: {
                                toClient: string;
                                toDb: string;
                            };
                        };
                    };
                    db: <ServerType extends import("zod").ZodTypeAny>(assert: (tools: {
                        zod: import("zod").ZodString;
                    }) => ServerType) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        dbType: ServerType;
                        zodDbSchema: ServerType;
                        zodClientSchema: import("zod").ZodString;
                        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                            $schema?: string | undefined;
                            definitions?: {
                                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                            } | undefined;
                        };
                        defaultValue: import("zod").TypeOf<ServerType>;
                        client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                            zod: import("zod").ZodString;
                            serverType?: ServerType;
                        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never) | undefined) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: import("zod").ZodString | ServerType;
                            zodClientSchema: ClientType;
                            jsonSchema: any;
                            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                                default: "CURRENT_TIMESTAMP";
                                defaultValue: Date;
                            } : never);
                            transform: (transforms: {
                                toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                                toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                            }) => {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodDbSchema: import("zod").ZodString | ServerType;
                                zodClientSchema: ClientType;
                                jsonSchema: any;
                                defaultValue: DefaultValue;
                                toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                                toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                                transforms: {
                                    toClient: string;
                                    toDb: string;
                                };
                            };
                        };
                    };
                };
                userId: {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: import("zod").ZodString;
                    jsonSchema: any;
                    defaultValue: string;
                    transform: (transforms: {
                        toClient: (dbValue: number) => string;
                        toDb: (clientValue: string) => number;
                    }) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: import("zod").ZodNumber;
                        zodClientSchema: import("zod").ZodString;
                        jsonSchema: any;
                        defaultValue: string;
                        toClient: (dbValue: number) => string;
                        toDb: (clientValue: string) => number;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
                fluffynessScale: {
                    sql: {
                        type: "text";
                    };
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
                    jsonSchema: any;
                    defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
                favourite: {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: import("zod").ZodBoolean;
                    jsonSchema: any;
                    defaultValue: boolean;
                    toClient: (dbValue: number) => boolean;
                    toDb: (clientValue: boolean) => number;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            defaultCount: number | undefined;
        };
    };
    pet: {
        _tableName: string;
        id: {
            sql: {
                type: "int";
                pk: true;
            };
            zodDbSchema: import("zod").ZodNumber;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: any;
            defaultValue: string;
            transform: (transforms: {
                toClient: (dbValue: number) => string;
                toDb: (clientValue: string) => number;
            }) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: any;
                defaultValue: string;
                toClient: (dbValue: number) => string;
                toDb: (clientValue: string) => number;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        name: {
            sql: {
                type: "varchar";
                length: number;
            };
            dbType: import("zod").ZodString;
            zodDbSchema: import("zod").ZodString;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: string;
            client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: import("zod").ZodString;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            db: <ServerType extends import("zod").ZodTypeAny>(assert: (tools: {
                zod: import("zod").ZodString;
            }) => ServerType) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                dbType: ServerType;
                zodDbSchema: ServerType;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: import("zod").TypeOf<ServerType>;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodString;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodString | ServerType;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: string) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => string;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
            };
        };
        userId: {
            sql: {
                type: "int";
            };
            zodDbSchema: import("zod").ZodNumber;
            zodClientSchema: import("zod").ZodString;
            jsonSchema: any;
            defaultValue: string;
            transform: (transforms: {
                toClient: (dbValue: number) => string;
                toDb: (clientValue: string) => number;
            }) => {
                sql: {
                    type: "int";
                };
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: import("zod").ZodString;
                jsonSchema: any;
                defaultValue: string;
                toClient: (dbValue: number) => string;
                toDb: (clientValue: string) => number;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        fluffynessScale: {
            sql: {
                type: "text";
            };
            zodDbSchema: import("zod").ZodString;
            zodClientSchema: import("zod").ZodArray<import("zod").ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
            jsonSchema: any;
            defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
            toClient: (dbValue: string) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
            toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => string;
            transforms: {
                toClient: string;
                toDb: string;
            };
        };
        favourite: {
            sql: {
                type: "int";
            };
            zodDbSchema: import("zod").ZodNumber;
            zodClientSchema: import("zod").ZodBoolean;
            jsonSchema: any;
            defaultValue: boolean;
            toClient: (dbValue: number) => boolean;
            toDb: (clientValue: boolean) => number;
            transforms: {
                toClient: string;
                toDb: string;
            };
        };
    };
};
export { schemas };
