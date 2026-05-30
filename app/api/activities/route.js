import { getUserFromRequest } from "../../../lib/auth.js";
import { query } from "../../../lib/db.js";

export async function GET(request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await query(
    `SELECT id, type, title, detail, metadata, created_at
     FROM activities
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 20`,
    [user.id],
  );

  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const type = (body.type || "Update").trim();
  const title = (body.title || "Activity update").trim();
  const detail = body.detail || "";
  const metadata = body.metadata || {};

  await query(
    `INSERT INTO activities (user_id, type, title, detail, metadata)
     VALUES ($1, $2, $3, $4, $5)`,
    [user.id, type, title, detail, metadata],
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
