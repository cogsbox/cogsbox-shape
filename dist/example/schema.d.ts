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
                zod: import("zod").ZodTypeAny;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zodClientSchema: ServerType;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: import("zod").TypeOf<ServerType>;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodTypeAny;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zod: import("zod").ZodTypeAny;
                serverType?: import("zod").ZodString;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zod: import("zod").ZodTypeAny;
                serverType?: import("zod").ZodString;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zod: import("zod").ZodTypeAny;
                serverType?: import("zod").ZodString;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: any;
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => any;
                    toDb: (clientValue: any) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: any;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => any;
                    toDb: (clientValue: any) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                    zod: import("zod").ZodTypeAny;
                    serverType?: never;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                    zodClientSchema: ServerType;
                    jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                        $schema?: string | undefined;
                        definitions?: {
                            [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                        } | undefined;
                    };
                    defaultValue: import("zod").TypeOf<ServerType>;
                    client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: import("zod").ZodTypeAny;
                        serverType?: ServerType;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                        }) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: import("zod").ZodTypeAny;
                            zodClientSchema: import("zod").ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                dbType: import("zod").ZodNumber;
                zodDbSchema: import("zod").ZodNumber;
                zodClientSchema: import("zod").ZodNumber;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: number;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodTypeAny;
                    serverType?: never;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                    };
                    dbType: ServerType;
                    zodDbSchema: ServerType;
                    zodClientSchema: ServerType;
                    jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                        $schema?: string | undefined;
                        definitions?: {
                            [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                        } | undefined;
                    };
                    defaultValue: import("zod").TypeOf<ServerType>;
                    client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: import("zod").ZodTypeAny;
                        serverType?: ServerType;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                        }) => {
                            sql: {
                                type: "int";
                            };
                            zodDbSchema: import("zod").ZodTypeAny;
                            zodClientSchema: import("zod").ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                            transforms: {
                                toClient: string;
                                toDb: string;
                            };
                        };
                    };
                };
            } | {
                sql: {
                    type: "text";
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            } | {
                sql: {
                    type: "int";
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: boolean;
                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => boolean;
                toDb: (clientValue: boolean) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: any;
                    transform: (transforms: {
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => any;
                        toDb: (clientValue: any) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "int";
                            pk: true;
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: any;
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => any;
                        toDb: (clientValue: any) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                        zod: import("zod").ZodTypeAny;
                        serverType?: never;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                        }) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: import("zod").ZodTypeAny;
                            zodClientSchema: import("zod").ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                        zodClientSchema: ServerType;
                        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                            $schema?: string | undefined;
                            definitions?: {
                                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                            } | undefined;
                        };
                        defaultValue: import("zod").TypeOf<ServerType>;
                        client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                            zod: import("zod").ZodTypeAny;
                            serverType?: ServerType;
                        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never) | undefined) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: import("zod").ZodTypeAny;
                            zodClientSchema: import("zod").ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                                default: "CURRENT_TIMESTAMP";
                                defaultValue: Date;
                            } : never);
                            transform: (transforms: {
                                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                                toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                            }) => {
                                sql: {
                                    type: "varchar";
                                    length: number;
                                };
                                zodDbSchema: import("zod").ZodTypeAny;
                                zodClientSchema: import("zod").ZodTypeAny;
                                jsonSchema: any;
                                defaultValue: DefaultValue;
                                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                                toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                    dbType: import("zod").ZodNumber;
                    zodDbSchema: import("zod").ZodNumber;
                    zodClientSchema: import("zod").ZodNumber;
                    jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                        $schema?: string | undefined;
                        definitions?: {
                            [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                        } | undefined;
                    };
                    defaultValue: number;
                    client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: import("zod").ZodTypeAny;
                        serverType?: never;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                        }) => {
                            sql: {
                                type: "int";
                            };
                            zodDbSchema: import("zod").ZodTypeAny;
                            zodClientSchema: import("zod").ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                            toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                        };
                        dbType: ServerType;
                        zodDbSchema: ServerType;
                        zodClientSchema: ServerType;
                        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                            $schema?: string | undefined;
                            definitions?: {
                                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                            } | undefined;
                        };
                        defaultValue: import("zod").TypeOf<ServerType>;
                        client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                            zod: import("zod").ZodTypeAny;
                            serverType?: ServerType;
                        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never) | undefined) => {
                            sql: {
                                type: "int";
                            };
                            zodDbSchema: import("zod").ZodTypeAny;
                            zodClientSchema: import("zod").ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                                default: "CURRENT_TIMESTAMP";
                                defaultValue: Date;
                            } : never);
                            transform: (transforms: {
                                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                                toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                            }) => {
                                sql: {
                                    type: "int";
                                };
                                zodDbSchema: import("zod").ZodTypeAny;
                                zodClientSchema: import("zod").ZodTypeAny;
                                jsonSchema: any;
                                defaultValue: DefaultValue;
                                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                                toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                                transforms: {
                                    toClient: string;
                                    toDb: string;
                                };
                            };
                        };
                    };
                };
                fluffynessScale: {
                    sql: {
                        type: "text";
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                    toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
                favourite: {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: boolean;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => boolean;
                    toDb: (clientValue: boolean) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
            zodDbSchema: import("zod").ZodTypeAny;
            zodClientSchema: import("zod").ZodTypeAny;
            jsonSchema: any;
            defaultValue: any;
            transform: (transforms: {
                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => any;
                toDb: (clientValue: any) => import("zod").TypeOf<import("zod").ZodTypeAny>;
            }) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: any;
                toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => any;
                toDb: (clientValue: any) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zod: import("zod").ZodTypeAny;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                zodClientSchema: ServerType;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: import("zod").TypeOf<ServerType>;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodTypeAny;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
            dbType: import("zod").ZodNumber;
            zodDbSchema: import("zod").ZodNumber;
            zodClientSchema: import("zod").ZodNumber;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: number;
            client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: import("zod").ZodTypeAny;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                };
                zodDbSchema: import("zod").ZodTypeAny;
                zodClientSchema: import("zod").ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                    toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
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
                };
                dbType: ServerType;
                zodDbSchema: ServerType;
                zodClientSchema: ServerType;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: import("zod").TypeOf<ServerType>;
                client: <ClientType extends import("zod").ZodTypeAny, DefaultValue extends import("zod").TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: import("zod").ZodTypeAny;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: import("zod").ZodTypeAny;
                    zodClientSchema: import("zod").ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: import("zod").ZodTypeAny;
                        zodClientSchema: import("zod").ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => import("zod").TypeOf<ClientType>;
                        toDb: (clientValue: import("zod").TypeOf<ClientType>) => import("zod").TypeOf<import("zod").ZodTypeAny>;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
            };
        };
        fluffynessScale: {
            sql: {
                type: "text";
            };
            zodDbSchema: import("zod").ZodTypeAny;
            zodClientSchema: import("zod").ZodTypeAny;
            jsonSchema: any;
            defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
            toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => import("zod").TypeOf<import("zod").ZodTypeAny>;
            transforms: {
                toClient: string;
                toDb: string;
            };
        };
        favourite: {
            sql: {
                type: "int";
            };
            zodDbSchema: import("zod").ZodTypeAny;
            zodClientSchema: import("zod").ZodTypeAny;
            jsonSchema: any;
            defaultValue: boolean;
            toClient: (dbValue: import("zod").TypeOf<import("zod").ZodTypeAny>) => boolean;
            toDb: (clientValue: boolean) => import("zod").TypeOf<import("zod").ZodTypeAny>;
            transforms: {
                toClient: string;
                toDb: string;
            };
        };
    };
};
export { schemas };
