import fs from "fs/promises";

type SQLTypeKey =
  | "int"
  | "varchar"
  | "char"
  | "text"
  | "longtext"
  | "boolean"
  | "date"
  | "datetime";

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

type SchemaInput = Record<string, any> | { schemas: Record<string, any> };

function isWrappedSchema(
  input: SchemaInput
): input is { schemas: Record<string, any> } {
  return (
    input !== null &&
    typeof input === "object" &&
    "schemas" in input &&
    input.schemas !== null &&
    typeof input.schemas === "object"
  );
}

export async function generateSQL(
  input: SchemaInput,
  outputPath = "cogsbox-shape-sql.sql",
  options: { includeForeignKeys?: boolean } = { includeForeignKeys: true }
) {
  if (!input) {
    throw new Error("No schema input provided");
  }

  const schemas = isWrappedSchema(input) ? input.schemas : input;

  if (!schemas || typeof schemas !== "object") {
    throw new Error("Invalid schemas input");
  }

  const sql: string[] = [];

  for (const [name, schema] of Object.entries(schemas)) {
    const tableName = schema._tableName;
    if (!tableName) {
      console.warn(`Skipping schema '${name}' - no _tableName found`);
      continue;
    }

    const fields: any[] = [];
    const foreignKeys: string[] = [];

    for (const [fieldName, field] of Object.entries(schema)) {
      // Skip metadata fields
      const f = field as any; // Just cast once
      console.log(`Processing field: ${fieldName}`, f);
      // Skip metadata fields
      if (
        fieldName === "_tableName" ||
        fieldName === "SchemaWrapperBrand" ||
        fieldName.startsWith("__") ||
        typeof f !== "object" ||
        !f
      )
        continue;

      // Handle reference fields
      if (f.type === "reference" && f.to) {
        const referencedField = f.to();
        const targetTableName = referencedField.__parentTableType._tableName;
        const targetFieldName = referencedField.__meta._key;

        console.log(
          `Found reference field: ${fieldName} -> ${targetTableName}.${targetFieldName}`
        );

        fields.push(`  ${fieldName} INTEGER NOT NULL`);
        if (options.includeForeignKeys) {
          foreignKeys.push(
            `  FOREIGN KEY (${fieldName}) REFERENCES ${targetTableName}(${targetFieldName})`
          );
        }
        continue;
      }

      // Get the actual field definition from enriched structure
      let fieldDef = f as any;

      // If it's an enriched field, extract the original field definition
      if (f.__meta && f.__meta._fieldType) {
        fieldDef = f.__meta._fieldType;
      }

      // Now check if fieldDef has config
      if (fieldDef && fieldDef.config && fieldDef.config.sql) {
        const sqlConfig = fieldDef.config.sql;

        // Handle relation configs (hasMany, hasOne, etc.)
        if (
          ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(
            sqlConfig.type
          )
        ) {
          // Only belongsTo creates a column
          if (
            sqlConfig.type === "belongsTo" &&
            sqlConfig.fromKey &&
            sqlConfig.schema
          ) {
            fields.push(`  ${sqlConfig.fromKey} INTEGER`);
            if (options.includeForeignKeys) {
              const targetSchema = sqlConfig.schema();
              foreignKeys.push(
                `  FOREIGN KEY (${sqlConfig.fromKey}) REFERENCES ${targetSchema._tableName}(id)`
              );
            }
          }
          continue;
        }

        // Handle regular SQL types
        const { type, nullable, pk, length, default: defaultValue } = sqlConfig;
        if (!sqlTypeMap[type as SQLTypeKey]) {
          console.warn(`Unknown SQL type: ${type} for field ${fieldName}`);
          continue;
        }

        const sqlType =
          typeof sqlTypeMap[type as SQLTypeKey] === "function"
            ? (sqlTypeMap[type as SQLTypeKey] as Function)(length)
            : sqlTypeMap[type as SQLTypeKey];

        let fieldDefStr = `  ${fieldName} ${sqlType}`;

        if (pk) fieldDefStr += " PRIMARY KEY AUTO_INCREMENT";
        if (!nullable && !pk) fieldDefStr += " NOT NULL";

        // Handle defaults
        if (
          defaultValue !== undefined &&
          defaultValue !== "CURRENT_TIMESTAMP"
        ) {
          fieldDefStr += ` DEFAULT ${typeof defaultValue === "string" ? `'${defaultValue}'` : defaultValue}`;
        } else if (defaultValue === "CURRENT_TIMESTAMP") {
          fieldDefStr += " DEFAULT CURRENT_TIMESTAMP";
        }

        fields.push(fieldDefStr);
      }
    }

    // Combine fields and foreign keys based on option
    const allFields = options.includeForeignKeys
      ? [...fields, ...foreignKeys]
      : fields;

    // Create table SQL
    if (allFields.length > 0) {
      sql.push(`CREATE TABLE ${tableName} (\n${allFields.join(",\n")}\n);\n`);
    } else {
      console.warn(`Warning: Table ${tableName} has no fields`);
    }
  }

  // Write to file
  const sqlContent = sql.join("\n");
  await fs.writeFile(outputPath, sqlContent, "utf-8");

  return sqlContent;
}
