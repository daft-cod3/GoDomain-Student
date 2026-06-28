#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    return;
  }
  const text = fs.readFileSync(envPath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
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
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required env var ${name}`);
  }
  return v;
}

function parseDatabaseUrl(url) {
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      username: parsed.username,
    };
  } catch (err) {
    return { raw: '<unparseable DATABASE_URL>', error: err.message };
  }
}

function maskDatabaseUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.password) {
      parsed.password = '***';
    }
    return parsed.toString();
  } catch {
    return '<unparseable DATABASE_URL>';
  }
}

function requiresSsl(connectionString = '') {
  return (
    connectionString.includes('supabase.co') ||
    connectionString.includes('pooler.supabase.com') ||
    connectionString.includes('sslmode=require')
  );
}

async function main() {
  const databaseUrl = getEnv('DATABASE_URL');

  console.log('Loaded DATABASE_URL:', maskDatabaseUrl(databaseUrl));
  const parsed = parseDatabaseUrl(databaseUrl);
  console.log('Parsed database URL:', JSON.stringify(parsed, null, 2));

  const schemaPath = path.join(__dirname, 'schema.sql');

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  const schema = fs.readFileSync(schemaPath, 'utf8').trim();
  if (!schema) {
    throw new Error(`Schema file is empty: ${schemaPath}`);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: requiresSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 20_000,
  });

  try {
    const client = await pool.connect();
    try {
      const statements = schema
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (statements.length === 0) {
        throw new Error('No SQL statements found in schema file');
      }

      for (const raw of statements) {
        const sql = `${raw};`;
        console.log(`Applying: ${raw.slice(0, 100)}${raw.length > 100 ? '...' : ''}`);
        try {
          await client.query(sql);
        } catch (err) {
          console.error(`Failed to apply statement: ${raw.slice(0, 200)}${raw.length > 200 ? '...' : ''}`);
          throw err;
        }
      }

      console.log('Schema applied successfully.');
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Failed to apply schema:', err.message || err);
  process.exitCode = 1;
});