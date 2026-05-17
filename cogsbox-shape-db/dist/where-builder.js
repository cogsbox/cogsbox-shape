import { sql } from "kysely";
export function buildWhereConditions(filter, meta) {
    const conditions = [];
    for (const [clientKey, value] of Object.entries(filter)) {
        if (value === undefined)
            continue;
        const field = meta.dbFields.get(clientKey);
        const dbName = field?.dbName ?? clientKey;
        const dbRef = sql.ref(dbName);
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            const op = value;
            if ("contains" in op) {
                const tv = field?.toDb ? field.toDb(op.contains) : op.contains;
                conditions.push(sql `${dbRef} LIKE ${sql.val(`%${String(tv ?? "")}%`)}`);
            }
            else if ("startsWith" in op) {
                const tv = field?.toDb ? field.toDb(op.startsWith) : op.startsWith;
                conditions.push(sql `${dbRef} LIKE ${sql.val(`${String(tv ?? "")}%`)}`);
            }
            else if ("endsWith" in op) {
                const tv = field?.toDb ? field.toDb(op.endsWith) : op.endsWith;
                conditions.push(sql `${dbRef} LIKE ${sql.val(`%${String(tv ?? "")}`)}`);
            }
            else if ("gt" in op) {
                const tv = field?.toDb ? field.toDb(op.gt) : op.gt;
                conditions.push(sql `${dbRef} > ${sql.val(tv)}`);
            }
            else if ("gte" in op) {
                const tv = field?.toDb ? field.toDb(op.gte) : op.gte;
                conditions.push(sql `${dbRef} >= ${sql.val(tv)}`);
            }
            else if ("lt" in op) {
                const tv = field?.toDb ? field.toDb(op.lt) : op.lt;
                conditions.push(sql `${dbRef} < ${sql.val(tv)}`);
            }
            else if ("lte" in op) {
                const tv = field?.toDb ? field.toDb(op.lte) : op.lte;
                conditions.push(sql `${dbRef} <= ${sql.val(tv)}`);
            }
            else if ("in" in op && Array.isArray(op.in)) {
                const items = op.in.map((v) => {
                    const tv = field?.toDb ? field.toDb(v) : v;
                    return sql.val(tv);
                });
                conditions.push(sql `${dbRef} IN (${sql.join(items, sql `, `)})`);
            }
            else if ("not" in op) {
                const nv = op.not;
                if (nv !== null && typeof nv === "object" && !Array.isArray(nv)) {
                    const no = nv;
                    if ("contains" in no) {
                        const tv = field?.toDb ? field.toDb(no.contains) : no.contains;
                        conditions.push(sql `${dbRef} NOT LIKE ${sql.val(`%${String(tv ?? "")}%`)}`);
                    }
                }
                else {
                    const tv = field?.toDb ? field.toDb(nv) : nv;
                    conditions.push(sql `${dbRef} != ${sql.val(tv)}`);
                }
            }
        }
        else {
            const transformed = field?.toDb ? field.toDb(value) : value;
            conditions.push(sql `${dbRef} = ${sql.val(transformed)}`);
        }
    }
    return conditions;
}
export function buildPkConditions(pkValues, pkFields) {
    return pkFields.map((f, i) => sql `${sql.ref(f)} = ${sql.val(pkValues[i])}`);
}
