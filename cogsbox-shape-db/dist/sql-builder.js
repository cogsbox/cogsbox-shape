export function buildSelect(opts) {
    const { table, columns, where, orderBy, limit, offset } = opts;
    const sqlParts = [];
    const allBindings = [];
    sqlParts.push(`SELECT ${columns.map(c => `${table}.${c}`).join(", ")} FROM ${table}`);
    if (where && where.sql) {
        sqlParts.push(`WHERE ${where.sql}`);
        allBindings.push(...where.bindings);
    }
    if (orderBy && orderBy.length > 0) {
        const clauses = orderBy.map(([col, dir]) => `${col} ${dir}`);
        sqlParts.push(`ORDER BY ${clauses.join(", ")}`);
    }
    if (limit !== undefined) {
        sqlParts.push(`LIMIT ?`);
        allBindings.push(limit);
    }
    if (offset !== undefined) {
        sqlParts.push(`OFFSET ?`);
        allBindings.push(offset);
    }
    return { sql: sqlParts.join(" "), bindings: allBindings };
}
export function buildSelectWithJoins(opts) {
    const { baseTable, baseAlias, baseColumns, joins, where, orderBy, limit, offset } = opts;
    const sqlParts = [];
    const allBindings = [];
    const allCols = [
        ...baseColumns.map(c => `${baseAlias}.${c}`),
        ...joins.flatMap(j => j.columns.map(c => `${j.alias}.${c} AS ${c}`)),
    ];
    sqlParts.push(`SELECT ${allCols.join(", ")} FROM ${baseTable} ${baseAlias}`);
    for (const join of joins) {
        sqlParts.push(`LEFT JOIN ${join.table} ${join.alias} ON ${join.on}`);
    }
    if (where && where.sql) {
        sqlParts.push(`WHERE ${where.sql}`);
        allBindings.push(...where.bindings);
    }
    if (orderBy && orderBy.length > 0) {
        const clauses = orderBy.map(([col, dir]) => `${col} ${dir}`);
        sqlParts.push(`ORDER BY ${clauses.join(", ")}`);
    }
    if (limit !== undefined) {
        sqlParts.push(`LIMIT ?`);
        allBindings.push(limit);
    }
    if (offset !== undefined) {
        sqlParts.push(`OFFSET ?`);
        allBindings.push(offset);
    }
    return { sql: sqlParts.join(" "), bindings: allBindings };
}
export function buildInsert(opts) {
    const { table, values } = opts;
    const keys = Object.keys(values);
    const placeholders = keys.map(() => "?");
    const bindings = keys.map(k => values[k]);
    return {
        sql: `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders.join(", ")})`,
        bindings,
    };
}
export function buildUpdate(opts) {
    const { table, values, where } = opts;
    const keys = Object.keys(values);
    const setClauses = keys.map(k => `${k} = ?`);
    const setBindings = keys.map(k => values[k]);
    return {
        sql: `UPDATE ${table} SET ${setClauses.join(", ")} WHERE ${where.sql}`,
        bindings: [...setBindings, ...where.bindings],
    };
}
export function buildDelete(opts) {
    return {
        sql: `DELETE FROM ${opts.table} WHERE ${opts.where.sql}`,
        bindings: opts.where.bindings,
    };
}
export function buildCount(opts) {
    const { table, where } = opts;
    const sqlParts = [`SELECT COUNT(*) as count FROM ${table}`];
    const allBindings = [];
    if (where && where.sql) {
        sqlParts.push(`WHERE ${where.sql}`);
        allBindings.push(...where.bindings);
    }
    return { sql: sqlParts.join(" "), bindings: allBindings };
}
export function buildSelectById(opts) {
    const conditions = opts.pkFields.map(f => `${f} = ?`);
    const sql = `SELECT ${opts.columns.map(c => `${opts.table}.${c}`).join(", ")} FROM ${opts.table} WHERE ${conditions.join(" AND ")}`;
    return { sql, bindings: [...opts.pkValues] };
}
