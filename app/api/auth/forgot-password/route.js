import { createClient } from "../../../../lib/server.js";

export async function POST(request) {
  const supabase = await createClient();
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();

  if (!email) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || new URL(request.url).origin;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/login`,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({
    success: true,
    message:
      "If this address is registered, a password reset message has been sent. Check your inbox or spam folder.",
  });
}