#!/usr/bin/env node

import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const [url, output] = process.argv.slice(2);

if (!url || !output) {
  console.error("Usage: node generate-zod.js <schema-url> <output-file>");
  process.exit(1);
}

const tempDir = await mkdtemp(join(tmpdir(), "json-schema-"));
const tempFile = join(tempDir, "schema.json");

try {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
  }

  await writeFile(tempFile, await response.text());

  await new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      [
        "json-schema-to-zod",
        "--input",
        tempFile,
        "--output",
        output,
      ],
      {
        stdio: "inherit",
        shell: process.platform === "win32",
      },
    );

    child.on("error", reject);

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`json-schema-to-zod exited with code ${code}`));
      }
    });
  });
} finally {
  await rm(tempDir, { recursive: true, force: true });
}