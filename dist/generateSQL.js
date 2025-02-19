import fs from "fs/promises";
// SQL Type mapping
const sqlTypeMap = {
    int: "INTEGER",
    varchar: (length = 255) => `VARCHAR(${length})`,
    char: (length = 1) => `CHAR(${length})`,
    text: "TEXT",
    longtext: "LONGTEXT",
    boolean: "BOOLEAN",
    date: "DATE",
    datetime: "DATETIME",
};
function isWrappedSchema(input) {
    return (input !== null &&
        typeof input === "object" &&
        "schemas" in input &&
        input.schemas !== null &&
        typeof input.schemas === "object");
}
export async function generateSQL(input, outputPath = "cogsbox-shape-sql.sql") {
    if (!input) {
        throw new Error("No schema input provided");
    }
    // Extract schemas using type guard
    const schemas = isWrappedSchema(input) ? input.schemas : input;
    if (!schemas || typeof schemas !== "object") {
        throw new Error("Invalid schemas input");
    }
    const sql = [];
    // Generate SQL for each schema
    for (const [name, schema] of Object.entries(schemas)) {
        const tableName = schema._tableName;
        const fields = [];
        const foreignKeys = [];
        // Process each field in the schema
        for (const [fieldName, field] of Object.entries(schema)) {
            if (fieldName === "_tableName")
                continue;
            // Handle regular fields
            if ("sql" in field) {
                const { type, nullable, pk, length } = field.sql;
                const sqlType = typeof sqlTypeMap[type] === "function"
                    ? sqlTypeMap[type](length)
                    : sqlTypeMap[type];
                fields.push(`  ${fieldName} ${sqlType}${pk ? " PRIMARY KEY" : ""}${nullable ? "" : " NOT NULL"}`);
            }
            // Handle relations
            if (typeof field === "function") {
                const relation = field();
                if (relation.type === "belongsTo") {
                    fields.push(`  ${relation.fromKey} INTEGER`);
                    foreignKeys.push(`  FOREIGN KEY (${relation.fromKey}) REFERENCES ${relation.schema._tableName}(id)`);
                }
            }
        }
        // Combine fields and foreign keys
        const allFields = [...fields, ...foreignKeys];
        // Create table SQL
        sql.push(`CREATE TABLE ${tableName} (\n${allFields.join(",\n")}\n);\n`);
    }
    // Write to file
    const sqlContent = sql.join("\n");
    await fs.writeFile(outputPath, sqlContent, "utf-8");
    return sqlContent;
}
