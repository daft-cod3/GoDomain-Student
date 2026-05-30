import {
  createSession,
  createSessionCookie,
  hashPassword,
} from "../../../../lib/auth.js";
import { query } from "../../../../lib/db.js";

const PROVIDERS = {
  google: {
    displayName: "Google Learner",
    email: "google@godomain.local",
  },
  facebook: {
    displayName: "Facebook Learner",
    email: "facebook@godomain.local",
  },
};

export async function POST(request) {
  const body = await request.json();
  const provider = (body.provider || "").toLowerCase();
  const config = PROVIDERS[provider];

  if (!config) {
    return new Response(JSON.stringify({ error: "Unsupported provider." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existing = await query("SELECT * FROM users WHERE email = $1", [
    config.email,
  ]);
  let user = existing.rows[0];

  if (!user) {
    const { hash, salt } = hashPassword(`${provider}-${Date.now()}`);
    const result = await query(
      `INSERT INTO users (email, password_hash, password_salt, display_name, next_session, progress, lessons_complete, road_hours, attendance, coins, coin_capacity, hp, hp_capacity, energy, energy_capacity, level, mentor, quiz_accuracy, live_hours, focus_rate, badges_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
       RETURNING id`,
      [
        config.email,
        hash,
        salt,
        config.displayName,
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
    user = result.rows[0];
  }

  const token = await createSession(user.id);
  const cookie = createSessionCookie(token);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
