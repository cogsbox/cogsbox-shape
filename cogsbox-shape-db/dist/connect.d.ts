import { Kysely } from "kysely";
export declare function connect<T extends Record<string, unknown>>(box: T, db: Kysely<unknown>): T & {
    db: {
        transaction: <R>(fn: (txBox: T & {
            db: {
                transaction: any;
            };
        }) => Promise<R>) => Promise<R>;
    };
};
