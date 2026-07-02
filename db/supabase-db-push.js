#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile();

function ensureDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local first.");
  }

  if (databaseUrl.includes("[YOUR-PASSWORD]")) {
    throw new Error(
      "DATABASE_URL still contains the placeholder password. Replace [YOUR-PASSWORD] in .env.local before pushing migrations.",
    );
  }

  return databaseUrl;
}

function main() {
  const databaseUrl = ensureDatabaseUrl();
  const encodedUrl = encodeURIComponent(databaseUrl);

  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["supabase", "db", "push", "--db-url", encodedUrl, "--yes"],
    {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
      env: process.env,
    },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

main();
