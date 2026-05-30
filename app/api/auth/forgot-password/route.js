import { query } from "../../../../lib/db.js";

export async function POST(request) {
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await query("SELECT id FROM users WHERE email = $1", [email]);

  return new Response(
    JSON.stringify({
      success: true,
      message:
        "If this address is registered, a password reset message has been sent. Check your inbox or spam folder.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
