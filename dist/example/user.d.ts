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
            zod: z.ZodString;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "int";
                pk: true;
            };
            zodDbSchema: z.ZodNumber;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: number) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => number;
            }) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: z.ZodNumber;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: number) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => number;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodNumber;
        }) => ServerType)) => {
            sql: {
                type: "int";
                pk: true;
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodString;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "int";
                    pk: true;
                };
                zodDbSchema: z.ZodNumber | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: number) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => number;
                }) => {
                    sql: {
                        type: "int";
                        pk: true;
                    };
                    zodDbSchema: z.ZodNumber | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: number) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => number;
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
            zod: z.ZodString;
            serverType?: z.ZodString;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
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
            zod: z.ZodString;
            serverType?: z.ZodString;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
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
            zod: z.ZodString;
            serverType?: z.ZodString;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
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
            zodDbSchema: z.ZodNumber;
            zodClientSchema: z.ZodString;
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
                zodDbSchema: z.ZodNumber;
                zodClientSchema: z.ZodString;
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
                zod: z.ZodString;
                serverType?: never;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    transforms: {
                        toClient: string;
                        toDb: string;
                    };
                };
            };
            db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
                zod: z.ZodString;
            }) => ServerType)) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                dbType: ServerType;
                zodDbSchema: ServerType;
                zodClientSchema: z.ZodString;
                jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                    $schema?: string | undefined;
                    definitions?: {
                        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                    } | undefined;
                };
                defaultValue: z.TypeOf<ServerType>;
                client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                    zod: z.ZodString;
                    serverType?: ServerType;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: z.ZodString | ServerType;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: string) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => string;
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
            zodDbSchema: z.ZodNumber;
            zodClientSchema: z.ZodString;
            jsonSchema: any;
            defaultValue: string;
            transform: (transforms: {
                toClient: (dbValue: number) => string;
                toDb: (clientValue: string) => number;
            }) => {
                sql: {
                    type: "int";
                };
                zodDbSchema: z.ZodNumber;
                zodClientSchema: z.ZodString;
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
            zodDbSchema: z.ZodString;
            zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
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
            zodDbSchema: z.ZodNumber;
            zodClientSchema: z.ZodBoolean;
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
                zodDbSchema: z.ZodNumber;
                zodClientSchema: z.ZodString;
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
                    zodDbSchema: z.ZodNumber;
                    zodClientSchema: z.ZodString;
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
                    zod: z.ZodString;
                    serverType?: never;
                }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never) | undefined) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodString;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never);
                    transform: (transforms: {
                        toClient: (dbValue: string) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => string;
                    }) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: z.ZodString;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue;
                        toClient: (dbValue: string) => z.TypeOf<ClientType>;
                        toDb: (clientValue: z.TypeOf<ClientType>) => string;
                        transforms: {
                            toClient: string;
                            toDb: string;
                        };
                    };
                };
                db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
                    zod: z.ZodString;
                }) => ServerType)) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    dbType: ServerType;
                    zodDbSchema: ServerType;
                    zodClientSchema: z.ZodString;
                    jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                        $schema?: string | undefined;
                        definitions?: {
                            [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                        } | undefined;
                    };
                    defaultValue: z.TypeOf<ServerType>;
                    client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                        zod: z.ZodString;
                        serverType?: ServerType;
                    }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                        default: "CURRENT_TIMESTAMP";
                        defaultValue: Date;
                    } : never) | undefined) => {
                        sql: {
                            type: "varchar";
                            length: number;
                        };
                        zodDbSchema: z.ZodString | ServerType;
                        zodClientSchema: ClientType;
                        jsonSchema: any;
                        defaultValue: DefaultValue | (DefaultValue extends Date ? {
                            default: "CURRENT_TIMESTAMP";
                            defaultValue: Date;
                        } : never);
                        transform: (transforms: {
                            toClient: (dbValue: string) => z.TypeOf<ClientType>;
                            toDb: (clientValue: z.TypeOf<ClientType>) => string;
                        }) => {
                            sql: {
                                type: "varchar";
                                length: number;
                            };
                            zodDbSchema: z.ZodString | ServerType;
                            zodClientSchema: ClientType;
                            jsonSchema: any;
                            defaultValue: DefaultValue;
                            toClient: (dbValue: string) => z.TypeOf<ClientType>;
                            toDb: (clientValue: z.TypeOf<ClientType>) => string;
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
                zodDbSchema: z.ZodNumber;
                zodClientSchema: z.ZodString;
                jsonSchema: any;
                defaultValue: string;
                transform: (transforms: {
                    toClient: (dbValue: number) => string;
                    toDb: (clientValue: string) => number;
                }) => {
                    sql: {
                        type: "int";
                    };
                    zodDbSchema: z.ZodNumber;
                    zodClientSchema: z.ZodString;
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
                zodDbSchema: z.ZodString;
                zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
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
                zodDbSchema: z.ZodNumber;
                zodClientSchema: z.ZodBoolean;
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
export declare const petSchema: {
    _tableName: string;
    id: {
        sql: {
            type: "int";
            pk: true;
        };
        zodDbSchema: z.ZodNumber;
        zodClientSchema: z.ZodString;
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
            zodDbSchema: z.ZodNumber;
            zodClientSchema: z.ZodString;
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
            zod: z.ZodString;
            serverType?: never;
        }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
            default: "CURRENT_TIMESTAMP";
            defaultValue: Date;
        } : never) | undefined) => {
            sql: {
                type: "varchar";
                length: number;
            };
            zodDbSchema: z.ZodString;
            zodClientSchema: ClientType;
            jsonSchema: any;
            defaultValue: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never);
            transform: (transforms: {
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
            }) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodString;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue;
                toClient: (dbValue: string) => z.TypeOf<ClientType>;
                toDb: (clientValue: z.TypeOf<ClientType>) => string;
                transforms: {
                    toClient: string;
                    toDb: string;
                };
            };
        };
        db: <ServerType extends z.ZodTypeAny>(assert: ServerType | ((tools: {
            zod: z.ZodString;
        }) => ServerType)) => {
            sql: {
                type: "varchar";
                length: number;
            };
            dbType: ServerType;
            zodDbSchema: ServerType;
            zodClientSchema: z.ZodString;
            jsonSchema: import("zod-to-json-schema").JsonSchema7Type & {
                $schema?: string | undefined;
                definitions?: {
                    [key: string]: import("zod-to-json-schema").JsonSchema7Type;
                } | undefined;
            };
            defaultValue: z.TypeOf<ServerType>;
            client: <ClientType extends z.ZodTypeAny, DefaultValue extends z.TypeOf<ClientType>>(assert?: ClientType | ((tools: {
                zod: z.ZodString;
                serverType?: ServerType;
            }) => ClientType) | undefined, defaultValue?: DefaultValue | (DefaultValue extends Date ? {
                default: "CURRENT_TIMESTAMP";
                defaultValue: Date;
            } : never) | undefined) => {
                sql: {
                    type: "varchar";
                    length: number;
                };
                zodDbSchema: z.ZodString | ServerType;
                zodClientSchema: ClientType;
                jsonSchema: any;
                defaultValue: DefaultValue | (DefaultValue extends Date ? {
                    default: "CURRENT_TIMESTAMP";
                    defaultValue: Date;
                } : never);
                transform: (transforms: {
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
                }) => {
                    sql: {
                        type: "varchar";
                        length: number;
                    };
                    zodDbSchema: z.ZodString | ServerType;
                    zodClientSchema: ClientType;
                    jsonSchema: any;
                    defaultValue: DefaultValue;
                    toClient: (dbValue: string) => z.TypeOf<ClientType>;
                    toDb: (clientValue: z.TypeOf<ClientType>) => string;
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
        zodDbSchema: z.ZodNumber;
        zodClientSchema: z.ZodString;
        jsonSchema: any;
        defaultValue: string;
        transform: (transforms: {
            toClient: (dbValue: number) => string;
            toDb: (clientValue: string) => number;
        }) => {
            sql: {
                type: "int";
            };
            zodDbSchema: z.ZodNumber;
            zodClientSchema: z.ZodString;
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
        zodDbSchema: z.ZodString;
        zodClientSchema: z.ZodArray<z.ZodEnum<["bald", "fuzzy", "fluffy", "poof"]>, "many">;
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
        zodDbSchema: z.ZodNumber;
        zodClientSchema: z.ZodBoolean;
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
export declare const dbSchema: z.ZodObject<{
    id: z.ZodNumber;
    firstname: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
    pets: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        userId: z.ZodNumber;
        fluffynessScale: z.ZodString;
        favourite: z.ZodNumber;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        id: number;
        userId: number;
        fluffynessScale: string;
        favourite: number;
    }, {
        name: string;
        id: number;
        userId: number;
        fluffynessScale: string;
        favourite: number;
    }>, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    pets: {
        name: string;
        id: number;
        userId: number;
        fluffynessScale: string;
        favourite: number;
    }[];
    firstname: string;
    surname: string;
    email: string;
}, {
    id: number;
    pets: {
        name: string;
        id: number;
        userId: number;
        fluffynessScale: string;
        favourite: number;
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
        id: z.ZodString;
        name: z.ZodString;
        userId: z.ZodString;
        fluffynessScale: z.ZodType<("bald" | "fuzzy" | "fluffy" | "poof")[], z.ZodTypeDef, ("bald" | "fuzzy" | "fluffy" | "poof")[]>;
        favourite: z.ZodType<boolean, z.ZodTypeDef, boolean>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        id: string;
        userId: string;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
    }, {
        name: string;
        id: string;
        userId: string;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
    }>, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    pets: {
        name: string;
        id: string;
        userId: string;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
    }[];
    firstname: string;
    surname: string;
    email: string;
}, {
    id: string;
    pets: {
        name: string;
        id: string;
        userId: string;
        fluffynessScale: ("bald" | "fuzzy" | "fluffy" | "poof")[];
        favourite: boolean;
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
        userId: string;
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
            defaultValue: string;
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
            defaultValue: string;
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
                defaultValue: string;
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
                defaultValue: string;
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
