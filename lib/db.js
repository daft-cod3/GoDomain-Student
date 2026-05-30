import { Pool } from "pg";

const globalWithPg = global;

const pool = globalWithPg.__pgPool || new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (!globalWithPg.__pgPool) {
  globalWithPg.__pgPool = pool;
}

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

export { pool };
