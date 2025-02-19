import { z } from "zod";
export declare const userSchema: {
    _tableName: string;
    id: {
        sql: {
            type: "int";
            pk: true;
        };
        dbType: z.ZodNumber;
        zodDbSchema: z.ZodNumber;
        zodClientSchema: z.ZodString;
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
            } | undefined;
        };
        defaultValue: number;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "int";
                pk: true;
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodNumber;
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
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodTypeAny;
            serverType?: z.ZodString;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodTypeAny;
            serverType?: z.ZodString;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodTypeAny;
            serverType?: z.ZodString;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: any;
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => any;
                toDb: (clientValue: any) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: any;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => any;
                toDb: (clientValue: any) => z.infer<z.ZodTypeAny>;
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
            dbType: z.ZodString;
            zodDbSchema: z.ZodString;
            zodClientSchema: z.ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: string;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
                zod: z.ZodString;
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
                defaultValue: z.TypeOf<ServerType>;
                client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: z.ZodTypeAny;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: z.ZodTypeAny;
                        zodClientSchema: z.ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            dbType: z.ZodNumber;
            zodDbSchema: z.ZodNumber;
            zodClientSchema: z.ZodNumber;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: number;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
                zod: z.ZodNumber;
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
                defaultValue: z.TypeOf<ServerType>;
                client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: z.ZodTypeAny;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: z.ZodTypeAny;
                        zodClientSchema: z.ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
            toClient: (dbValue: z.infer<z.ZodTypeAny>) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
            toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => z.infer<z.ZodTypeAny>;
            transforms: {
                toClient: string;
                toDb: string;
            };
        } | {
            sql: {
                type: "int";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: boolean;
            toClient: (dbValue: z.infer<z.ZodTypeAny>) => boolean;
            toDb: (clientValue: boolean) => z.infer<z.ZodTypeAny>;
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
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: any;
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => any;
                    toDb: (clientValue: any) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: any;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => any;
                    toDb: (clientValue: any) => z.infer<z.ZodTypeAny>;
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
                dbType: z.ZodString;
                zodDbSchema: z.ZodString;
                zodClientSchema: z.ZodString;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: string;
                client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: z.ZodTypeAny;
                    serverType?: never;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: z.ZodTypeAny;
                        zodClientSchema: z.ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
                db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
                    zod: z.ZodString;
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
                    defaultValue: z.TypeOf<ServerType>;
                    client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: z.ZodTypeAny;
                        serverType?: ServerType;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: z.ZodTypeAny;
                        zodClientSchema: z.ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                            toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                        }) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: z.ZodTypeAny;
                            zodClientSchema: z.ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                            toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
                dbType: z.ZodNumber;
                zodDbSchema: z.ZodNumber;
                zodClientSchema: z.ZodNumber;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: number;
                client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: z.ZodTypeAny;
                    serverType?: never;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                    }) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: z.ZodTypeAny;
                        zodClientSchema: z.ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
                db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
                    zod: z.ZodNumber;
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
                    defaultValue: z.TypeOf<ServerType>;
                    client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: z.ZodTypeAny;
                        serverType?: ServerType;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "int";
                        };
                        zodDbSchema: z.ZodTypeAny;
                        zodClientSchema: z.ZodTypeAny;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                            toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                        }) => {
                            sql: {
                                type: "int";
                            };
                            zodDbSchema: z.ZodTypeAny;
                            zodClientSchema: z.ZodTypeAny;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                            toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
                toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
            favourite: {
                sql: {
                    type: "int";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: boolean;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => boolean;
                toDb: (clientValue: boolean) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        defaultCount: number | undefined;
    };
};
export declare const petSchema: {
    _tableName: string;
    id: {
        sql: {
            type: "int";
            pk: true;
        };
        zodDbSchema: z.ZodTypeAny;
        zodClientSchema: z.ZodTypeAny;
        jsonSchema: any;
        defaultValue: any;
        transform: (transforms: {
            toClient: (dbValue: z.infer<z.ZodTypeAny>) => any;
            toDb: (clientValue: any) => z.infer<z.ZodTypeAny>;
        }) => {
            sql: {
                type: "int";
                pk: true;
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: any;
            toClient: (dbValue: z.infer<z.ZodTypeAny>) => any;
            toDb: (clientValue: any) => z.infer<z.ZodTypeAny>;
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
        dbType: z.ZodString;
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodString;
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
            } | undefined;
        };
        defaultValue: string;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodString;
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
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
        dbType: z.ZodNumber;
        zodDbSchema: z.ZodNumber;
        zodClientSchema: z.ZodNumber;
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
            $schema?: string | undefined;
            definitions?: {
                [key: string]: import("zod-to-json-schema").JsonSchema7Type;
            } | undefined;
        };
        defaultValue: number;
        client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
            zod: z.ZodTypeAny;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "int";
            };
            zodDbSchema: z.ZodTypeAny;
            zodClientSchema: z.ZodTypeAny;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
            }) => {
                sql: {
                    type: "int";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: (tools: {
            zod: z.ZodNumber;
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
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodTypeAny;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                };
                zodDbSchema: z.ZodTypeAny;
                zodClientSchema: z.ZodTypeAny;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
                }) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: z.ZodTypeAny;
                    zodClientSchema: z.ZodTypeAny;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: z.infer<z.ZodTypeAny>) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => z.infer<z.ZodTypeAny>;
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
        zodDbSchema: z.ZodTypeAny;
        zodClientSchema: z.ZodTypeAny;
        jsonSchema: any;
        defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        toClient: (dbValue: z.infer<z.ZodTypeAny>) => ("bald" | "fuzzy" | "fluffy" | "poof")[];
        toDb: (clientValue: ("bald" | "fuzzy" | "fluffy" | "poof")[]) => z.infer<z.ZodTypeAny>;
        transforms: {
            toClient: string;
            toDb: string;
        };
    };
    favourite: {
        sql: {
            type: "int";
        };
        zodDbSchema: z.ZodTypeAny;
        zodClientSchema: z.ZodTypeAny;
        jsonSchema: any;
        defaultValue: boolean;
        toClient: (dbValue: z.infer<z.ZodTypeAny>) => boolean;
        toDb: (clientValue: boolean) => z.infer<z.ZodTypeAny>;
        transforms: {
            toClient: string;
            toDb: string;
        };
    };
};
export declare const dbSchema: z.ZodObject<{
    id: z.ZodNumber;
    firstname: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
    pets: z.ZodArray<z.ZodObject<{
        id: z.ZodTypeAny;
        name: z.ZodString;
        userId: z.ZodNumber;
        fluffynessScale: z.ZodTypeAny;
        favourite: z.ZodTypeAny;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        userId: number;
        id?: any;
        fluffynessScale?: any;
        favourite?: any;
    }, {
        name: string;
        userId: number;
        id?: any;
        fluffynessScale?: any;
        favourite?: any;
    }>, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    pets: {
        name: string;
        userId: number;
        id?: any;
        fluffynessScale?: any;
        favourite?: any;
    }[];
    firstname: string;
    surname: string;
    email: string;
}, {
    id: number;
    pets: {
        name: string;
        userId: number;
        id?: any;
        fluffynessScale?: any;
        favourite?: any;
    }[];
    firstname: string;
    surname: string;
    email: string;
}>, clientSchema: z.ZodObject<{
    id: z.ZodString;
    firstname: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
    pets: z.ZodArray<z.ZodObject<{
        id: z.ZodTypeAny;
        name: z.ZodString;
        userId: z.ZodNumber;
        fluffynessScale: z.ZodType<("bald" | "fuzzy" | "fluffy" | "poof")[], z.ZodTypeDef, ("bald" | "fuzzy" | "fluffy" | "poof")[]>;
        favourite: z.ZodType<boolean, z.ZodTypeDef, boolean>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        userId: number;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
        id?: any;
    }, {
        name: string;
        userId: number;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
        id?: any;
    }>, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    pets: {
        name: string;
        userId: number;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
        id?: any;
    }[];
    firstname: string;
    surname: string;
    email: string;
}, {
    id: string;
    pets: {
        name: string;
        userId: number;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
        id?: any;
    }[];
    firstname: string;
    surname: string;
    email: string;
}>, initialValues: () => {
    id: string;
    firstname: string;
    surname: string;
    email: string;
    pets: {
        id: string;
        name: string;
        userId: number;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
    }[];
}, serialized: {
    id: {
        sql: {
            type: "int";
            pk: true;
        };
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
        defaultValue: number;
        transforms?: {
            toClient: string;
            toDb: string;
        };
    };
    firstname: {
        sql: {
            type: "varchar";
            length: number;
        };
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
        defaultValue: string;
        transforms?: {
            toClient: string;
            toDb: string;
        };
    };
    surname: {
        sql: {
            type: "varchar";
            length: number;
        };
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
        defaultValue: string;
        transforms?: {
            toClient: string;
            toDb: string;
        };
    };
    email: {
        sql: {
            type: "varchar";
            length: number;
        };
        jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
        defaultValue: string;
        transforms?: {
            toClient: string;
            toDb: string;
        };
    };
    pets: {
        type: "relation";
        relationType: "hasMany";
        fromKey: string;
        toKey: {
            sql: {
                type: "int";
                pk: true;
            };
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
            defaultValue: any;
            transforms?: {
                toClient: string;
                toDb: string;
            };
        } | {
            sql: {
                type: "varchar";
                length: number;
            };
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
            defaultValue: string;
            transforms?: {
                toClient: string;
                toDb: string;
            };
        } | {
            sql: {
                type: "int";
            };
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
            defaultValue: number;
            transforms?: {
                toClient: string;
                toDb: string;
            };
        } | {
            sql: {
                type: "text";
            };
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
            defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
            transforms?: {
                toClient: string;
                toDb: string;
            };
        } | {
            sql: {
                type: "int";
            };
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
            defaultValue: boolean;
            transforms?: {
                toClient: string;
                toDb: string;
            };
        };
        schema: {
            id: {
                sql: {
                    type: "int";
                    pk: true;
                };
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
                defaultValue: any;
                transforms?: {
                    toClient: string;
                    toDb: string;
                };
            };
            name: {
                sql: {
                    type: "varchar";
                    length: number;
                };
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
                defaultValue: string;
                transforms?: {
                    toClient: string;
                    toDb: string;
                };
            };
            userId: {
                sql: {
                    type: "int";
                };
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
                defaultValue: number;
                transforms?: {
                    toClient: string;
                    toDb: string;
                };
            };
            fluffynessScale: {
                sql: {
                    type: "text";
                };
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
                defaultValue: ("bald" | "fuzzy" | "fluffy" | "poof")[];
                transforms?: {
                    toClient: string;
                    toDb: string;
                };
            };
            favourite: {
                sql: {
                    type: "int";
                };
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type;
                defaultValue: boolean;
                transforms?: {
                    toClient: string;
                    toDb: string;
                };
            };
        } & {
            _tableName: string;
            __schemaId: string;
        };
        defaultCount?: number;
    };
} & {
    _tableName: string;
    __schemaId: string;
};
