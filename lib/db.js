import { Pool } from "pg";

const globalWithPg = global;

function requiresSsl(connectionString = "") {
  return (
    connectionString.includes("supabase.co") ||
    connectionString.includes("pooler.supabase.com") ||
    connectionString.includes("sslmode=require")
  );
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL. Set it to your Supabase Postgres connection string.",
    );
  }

  return new Pool({
    connectionString,
    ssl: requiresSsl(connectionString)
      ? { rejectUnauthorized: false }
      : undefined,
  });
}

const pool = globalWithPg.__pgPool || createPool();

if (!globalWithPg.__pgPool) {
  globalWithPg.__pgPool = pool;
}

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

export { pool };
