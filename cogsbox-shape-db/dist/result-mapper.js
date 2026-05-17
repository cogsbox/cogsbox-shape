const REL_PREFIX = "__rel_";
export function aliasRelationColumn(relationKey, field) {
    return `${REL_PREFIX}${relationKey}_${field}`;
}
export function isRelationAlias(alias) {
    if (!alias.startsWith(REL_PREFIX))
        return false;
    const rest = alias.slice(REL_PREFIX.length);
    const underscoreIdx = rest.indexOf("_");
    if (underscoreIdx === -1)
        return false;
    return {
        relationKey: rest.slice(0, underscoreIdx),
        field: rest.slice(underscoreIdx + 1),
    };
}
export function flattenJoinedRows(rows, basePkFields, joins, baseMeta, childMetas) {
    const groups = new Map();
    const children = new Map();
    for (const row of rows) {
        const pkKey = basePkFields.map(f => String(row[f] ?? "")).join("|");
        if (!groups.has(pkKey)) {
            const base = {};
            for (const [clientKey, field] of baseMeta.dbFields) {
                base[clientKey] = row[field.dbName];
            }
            if (baseMeta.clientToDbName.size === 0) {
                for (const key of Object.keys(row)) {
                    if (!isRelationAlias(key)) {
                        base[key] = row[key];
                    }
                }
            }
            groups.set(pkKey, base);
            children.set(pkKey, []);
        }
        for (const join of joins) {
            const childRow = {};
            let allNull = true;
            for (const col of join.columns) {
                const alias = aliasRelationColumn(join.relationKey, col);
                const val = row[alias];
                childRow[col] = val;
                if (val !== null && val !== undefined) {
                    allNull = false;
                }
            }
            if (!allNull) {
                children.get(pkKey).push(childRow);
            }
        }
    }
    const result = [];
    for (const [pkKey, base] of groups) {
        const item = { ...base };
        for (const join of joins) {
            item[join.relationKey] = children.get(pkKey).filter(r => {
                return Object.values(r).some(v => v !== null && v !== undefined);
            });
        }
        result.push(item);
    }
    return result;
}
