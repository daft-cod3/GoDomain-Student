import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const globalWithPg = global;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CA_CERT_PATH = path.join(__dirname, "..", "cert", "prod-ca-2021.crt");

function buildSsl(connectionString = "") {
  const needsSsl =
    connectionString.includes("supabase.co") ||
    connectionString.includes("pooler.supabase.com") ||
    connectionString.includes("sslmode=");
  if (!needsSsl) return undefined;
  return {
    rejectUnauthorized: true,
    ca: fs.readFileSync(CA_CERT_PATH).toString(),
  };
}

function stripSslMode(connectionString) {
  return connectionString.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "");
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL. Set it to your Supabase Postgres connection string.",
    );
  }

  return new Pool({
    connectionString: stripSslMode(connectionString),
    ssl: buildSsl(connectionString),
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
