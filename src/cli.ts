#!/usr/bin/env node
import { Command } from "commander";
import { pathToFileURL } from "url";
import path from "path";
import { generateSQL } from "./generateSQL.js";
import { unlink, writeFile } from "fs/promises";
import { spawnSync } from "child_process";

const program = new Command();

program
  .name("cogsbox-shape")
  .description("CLI for cogsbox-shape schema tools")
  .version("0.5.70");

program
  .command("generate-sql <file>")
  .description("Generate SQL from your schema definitions")
  .option(
    "-o, --output <path>",
    "Output SQL file path",
    "./cogsbox-shape-sql.sql"
  )
  .option("--no-foreign-keys", "Generate SQL without foreign key constraints")
  .action(async (file, options) => {
    try {
      const fullPath = path.resolve(process.cwd(), file);

      if (file.endsWith(".ts")) {
        // Create a virtual module that imports and USES the schema directly
        const virtualModule = `
    import { schemas } from '${pathToFileURL(fullPath).href}';
    import { generateSQL } from '${pathToFileURL(path.join(process.cwd(), "dist/generateSQL.js")).href}';
    
    generateSQL(schemas, '${options.output}', { includeForeignKeys: ${options.foreignKeys !== false} })
      .then(() => console.log('Done'))
      .catch(err => console.error(err));
  `;

        // Write this to a temporary file
        const tmpFile = path.join(
          path.dirname(fullPath),
          ".tmp-schema-loader.ts"
        );
        await writeFile(tmpFile, virtualModule, "utf8");

        const result = spawnSync("npx", ["tsx", tmpFile], {
          encoding: "utf8",
          stdio: "inherit",
        });

        // Clean up temp file
        await unlink(tmpFile).catch(() => {});

        if (result.error) {
          throw result.error;
        }
      } else {
        const schema = await import(pathToFileURL(fullPath).href);
        await generateSQL(schema.schemas, options.output, {
          includeForeignKeys: options.foreignKeys,
        });
      }
      console.log(`Generated SQL successfully at ${options.output}`);
    } catch (error) {
      console.error("Error:", error);
      process.exit(1);
    }
  });

program.parse();
