#!/usr/bin/env node
import { Command } from "commander";
import { pathToFileURL } from "url";
import path from "path";
import { generateSQL } from "./generateSQL.js";
import { unlink, writeFile } from "fs/promises";
import { spawnSync } from "child_process";

const program = new Command();

program.command("generate-sql <file>").action(async (file) => {
  try {
    const fullPath = path.resolve(process.cwd(), file);

    if (file.endsWith(".ts")) {
      // Create a virtual module that imports and outputs the schema
      const virtualModule = `
        import { schemas } from '${pathToFileURL(fullPath).href}';
        console.log(JSON.stringify(schemas));
      `;

      // Write this to a temporary file
      const tmpFile = path.join(
        path.dirname(fullPath),
        ".tmp-schema-loader.ts"
      );
      await writeFile(tmpFile, virtualModule, "utf8");

      const result = spawnSync("npx", ["tsx", tmpFile], {
        encoding: "utf8",
        stdio: ["inherit", "pipe", "pipe"],
      });

      // Clean up temp file
      await unlink(tmpFile).catch(() => {});

      if (result.error) {
        throw result.error;
      }

      if (result.stderr) {
        console.error("stderr:", result.stderr);
      }

      const schema = JSON.parse(result.stdout);
      await generateSQL(schema);
    } else {
      const schema = await import(pathToFileURL(fullPath).href);
      await generateSQL(schema.schemas);
    }
    console.log("Generated SQL successfully");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
});

program.parse();
