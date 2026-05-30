import { hashPassword, createSession, createSessionCookie } from "../../../../lib/auth.js";
import { query } from "../../../../lib/db.js";

export async function POST(request) {
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  const displayName = (body.displayName || email.split("@")[0] || "Learner").trim();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    return new Response(JSON.stringify({ error: "A user with this email already exists." }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { hash, salt } = hashPassword(password);
  const result = await query(
    `INSERT INTO users (email, password_hash, password_salt, display_name, next_session, progress, lessons_complete, road_hours, attendance, coins, coin_capacity, hp, hp_capacity, energy, energy_capacity, level, mentor, quiz_accuracy, live_hours, focus_rate, badges_count)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
     RETURNING id`,
    [
      email,
      hash,
      salt,
      displayName,
      "Reverse parking drill",
      0,
      "0 / 0",
      "0 hours",
      "0%",
      0,
      100,
      100,
      100,
      100,
      100,
      "Level 01",
      "Instructor",
      "0%",
      "0h",
      "0%",
      0,
    ],
  );

  const userId = result.rows[0].id;
  const token = await createSession(userId);
  const cookie = createSessionCookie(token);

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
