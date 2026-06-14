import fs from "fs/promises";
function isWrappedSchema(input) {
    return (input !== null &&
        typeof input === "object" &&
        "schemas" in input &&
        input.schemas !== null &&
        typeof input.schemas === "object");
}
function escapeSqlString(value) {
    return value.replace(/'/g, "''");
}
function quoteEnumValues(values) {
    return values.map((value) => `'${escapeSqlString(value)}'`).join(", ");
}
function columnName(fieldName, sqlConfig) {
    return sqlConfig.field ?? fieldName;
}
function assertDialect(current, next, tableName) {
    if (current && current !== next) {
        throw new Error(`Mixed SQL dialects in table "${tableName}": "${current}" and "${next}".`);
    }
    return next;
}
function sqlType(dialect, fieldName, tableName, config) {
    switch (dialect) {
        case "sqlite":
            switch (config.type) {
                case "int":
                    return "INTEGER";
                case "real":
                    return "REAL";
                case "boolean":
                    return "INTEGER";
                case "varchar":
                case "char":
                case "text":
                case "longtext":
                case "enum":
                    return "TEXT";
                case "date":
                case "datetime":
                case "timestamp":
                    return "TEXT";
            }
            break;
        case "postgres":
            switch (config.type) {
                case "int":
                    return "INTEGER";
                case "real":
                    return "REAL";
                case "boolean":
                    return "BOOLEAN";
                case "varchar":
                    return `VARCHAR(${config.length ?? 255})`;
                case "char":
                    return `CHAR(${config.length ?? 1})`;
                case "text":
                case "longtext":
                    return "TEXT";
                case "enum":
                    if (!config.name) {
                        throw new Error(`Postgres enum field "${tableName}.${fieldName}" requires a name.`);
                    }
                    return config.name;
                case "date":
                    return "DATE";
                case "datetime":
                case "timestamp":
                    return "TIMESTAMP";
            }
            break;
        case "mysql":
            switch (config.type) {
                case "int":
                    return "INTEGER";
                case "real":
                    return "DOUBLE";
                case "boolean":
                    return "TINYINT(1)";
                case "varchar":
                    return `VARCHAR(${config.length ?? 255})`;
                case "char":
                    return `CHAR(${config.length ?? 1})`;
                case "text":
                    return "TEXT";
                case "longtext":
                    return "LONGTEXT";
                case "enum":
                    return `ENUM(${quoteEnumValues(config.values ?? [])})`;
                case "date":
                    return "DATE";
                case "datetime":
                    return "DATETIME";
                case "timestamp":
                    return "TIMESTAMP";
            }
            break;
    }
    throw new Error(`Unknown ${dialect} SQL type "${config.type}" for field "${tableName}.${fieldName}".`);
}
function defaultSql(value) {
    if (value === "CURRENT_TIMESTAMP")
        return "CURRENT_TIMESTAMP";
    if (typeof value === "string")
        return `'${escapeSqlString(value)}'`;
    if (value instanceof Date)
        return `'${value.toISOString()}'`;
    return String(value);
}
function enumCheck(dialect, fieldName, config) {
    if (dialect !== "sqlite" || config.type !== "enum")
        return undefined;
    return `CHECK (${fieldName} IN (${quoteEnumValues(config.values ?? [])}))`;
}
export async function generateSQL(input, outputPath = "cogsbox-shape-sql.sql", options = { includeForeignKeys: true }) {
    if (!input) {
        throw new Error("No schema input provided");
    }
    const schemas = isWrappedSchema(input) ? input.schemas : input;
    if (!schemas || typeof schemas !== "object") {
        throw new Error("Invalid schemas input");
    }
    const statements = [];
    const postgresEnums = new Map();
    for (const [name, schema] of Object.entries(schemas)) {
        const tableName = schema._tableName;
        if (!tableName) {
            console.warn(`Skipping schema '${name}' - no _tableName found`);
            continue;
        }
        const fields = [];
        const foreignKeys = [];
        let tableDialect;
        for (const [fieldName, field] of Object.entries(schema)) {
            const f = field;
            if (fieldName === "_tableName" ||
                fieldName === "SchemaWrapperBrand" ||
                fieldName.startsWith("__") ||
                typeof f !== "object" ||
                !f) {
                continue;
            }
            if (f.type === "reference" && f.to) {
                const referencedField = f.to();
                const targetTableName = referencedField.__parentTableType._tableName;
                const targetFieldName = referencedField.__meta._key;
                fields.push(`  ${fieldName} INTEGER NOT NULL`);
                if (options.includeForeignKeys) {
                    foreignKeys.push(`  FOREIGN KEY (${fieldName}) REFERENCES ${targetTableName}(${targetFieldName})`);
                }
                continue;
            }
            const fieldDef = f.__meta?._fieldType ?? f;
            const sqlConfig = fieldDef?.config?.sql;
            if (!sqlConfig)
                continue;
            if (["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(sqlConfig.type)) {
                if (sqlConfig.type === "belongsTo" &&
                    sqlConfig.fromKey &&
                    sqlConfig.schema) {
                    fields.push(`  ${sqlConfig.fromKey} INTEGER`);
                    if (options.includeForeignKeys) {
                        const targetSchema = sqlConfig.schema();
                        foreignKeys.push(`  FOREIGN KEY (${sqlConfig.fromKey}) REFERENCES ${targetSchema._tableName}(id)`);
                    }
                }
                continue;
            }
            const dialect = sqlConfig.dialect;
            if (!dialect) {
                throw new Error(`Field "${tableName}.${fieldName}" is missing a SQL dialect.`);
            }
            tableDialect = assertDialect(tableDialect, dialect, tableName);
            if (dialect === "postgres" && sqlConfig.type === "enum") {
                postgresEnums.set(sqlConfig.name, sqlConfig.values);
            }
            const dbFieldName = columnName(fieldName, sqlConfig);
            const parts = [
                dbFieldName,
                sqlType(dialect, fieldName, tableName, sqlConfig),
            ];
            if (sqlConfig.pk) {
                parts.push(dialect === "mysql" ? "PRIMARY KEY AUTO_INCREMENT" : "PRIMARY KEY");
            }
            if (!sqlConfig.nullable && !sqlConfig.pk)
                parts.push("NOT NULL");
            if (sqlConfig.default !== undefined) {
                parts.push(`DEFAULT ${defaultSql(sqlConfig.default)}`);
            }
            const check = enumCheck(dialect, dbFieldName, sqlConfig);
            if (check)
                parts.push(check);
            fields.push(`  ${parts.join(" ")}`);
        }
        const allFields = options.includeForeignKeys
            ? [...fields, ...foreignKeys]
            : fields;
        if (allFields.length > 0) {
            statements.push(`CREATE TABLE ${tableName} (\n${allFields.join(",\n")}\n);`);
        }
        else {
            console.warn(`Warning: Table ${tableName} has no fields`);
        }
    }
    const enumStatements = Array.from(postgresEnums.entries()).map(([name, values]) => `CREATE TYPE ${name} AS ENUM (${quoteEnumValues(values)});`);
    const sqlContent = [...enumStatements, ...statements].join("\n\n");
    await fs.writeFile(outputPath, sqlContent, "utf-8");
    return sqlContent;
}
