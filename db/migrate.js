#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");

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

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }
  return value;
}

function requiresSsl(connectionString = "") {
  return (
    connectionString.includes("supabase.co") ||
    connectionString.includes("pooler.supabase.com") ||
    connectionString.includes("sslmode=require")
  );
}

function collectMigrations(migrationsDir) {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }

  const entries = fs.readdirSync(migrationsDir, { withFileTypes: true });
  const migrationFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => ({
      name: entry.name,
      relativePath: entry.name,
      absolutePath: path.join(migrationsDir, entry.name),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const nestedDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(migrationsDir, entry.name))
    .sort((a, b) => a.localeCompare(b));

  const nestedMigrations = nestedDirs.flatMap((dir) => collectMigrations(dir));

  return [...migrationFiles, ...nestedMigrations].map((migration) => ({
    ...migration,
    relativePath: path.relative(migrationsDir, migration.absolutePath).replace(/\\/g, "/"),
  }));
}

async function ensureMigrationTable(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.schema_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function applyMigrations() {
  const databaseUrl = getEnv("DATABASE_URL");
  const migrationsDir = path.join(__dirname, "migrations");
  const migrationFiles = collectMigrations(migrationsDir);

  if (migrationFiles.length === 0) {
    console.log("No migrations found in db/migrations.");
    return;
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: requiresSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 20_000,
  });

  try {
    await ensureMigrationTable(pool);

    for (const migration of migrationFiles) {
      const { rows } = await pool.query(
        "SELECT 1 FROM public.schema_migrations WHERE version = $1",
        [migration.name],
      );

      if (rows.length > 0) {
        continue;
      }

      const sql = fs.readFileSync(migration.absolutePath, "utf8");
      console.log(`Applying migration ${migration.relativePath}`);
      await pool.query(sql);
      await pool.query(
        "INSERT INTO public.schema_migrations (version, name) VALUES ($1, $2)",
        [migration.name, migration.relativePath],
      );
    }

    console.log("Database migrations applied successfully.");
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  applyMigrations().catch((error) => {
    console.error("Failed to apply database migrations:", error.message || error);
    process.exitCode = 1;
  });
}

module.exports = {
  collectMigrations,
  ensureMigrationTable,
};
