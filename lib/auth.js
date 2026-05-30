import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { pool } from "./db";

export function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const derived = scryptSync(password, salt, 64);
  return {
    salt,
    hash: derived.toString("hex"),
  };
}

export function verifyPassword(password, hash, salt) {
  const derived = scryptSync(password, salt, 64);
  return timingSafeEqual(Buffer.from(hash, "hex"), derived);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, pair) => {
    const [name, ...rest] = pair.trim().split("=");
    if (!name) return cookies;
    cookies[name] = rest.join("=");
    return cookies;
  }, {});
}

export async function createSession(userId) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  await pool.query(
    "INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)",
    [userId, token, expiresAt],
  );

  return token;
}

export async function revokeSession(token) {
  if (!token) return;
  await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
}

export async function getUserFromRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies.session;

  if (!token) {
    return null;
  }

  const result = await pool.query(
    `
      SELECT u.*
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token = $1 AND s.expires_at > NOW()
    `,
    [token],
  );

  return result.rows[0] || null;
}

export function createSessionCookie(token) {
  const maxAge = 14 * 24 * 60 * 60;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}
