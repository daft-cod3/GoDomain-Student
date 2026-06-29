#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;

  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

function getEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var ${name}`);
  return v;
}

function requiresSsl(connectionString = "") {
  return (
    connectionString.includes("supabase.co") ||
    connectionString.includes("pooler.supabase.com") ||
    connectionString.includes("sslmode=require")
  );
}

async function main() {
  const databaseUrl = getEnv("DATABASE_URL");

  const schemaPath = path.join(__dirname, "schema.sql");
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  const schema = fs.readFileSync(schemaPath, "utf8").trim();
  if (!schema) throw new Error(`Schema file is empty: ${schemaPath}`);

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: requiresSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 20_000,
  });

  try {
    await pool.query(schema);
    console.log("Schema applied successfully.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Failed to apply schema:", err && (err.message || err));
  process.exitCode = 1;
});

