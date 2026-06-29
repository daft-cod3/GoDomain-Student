import { createClient } from "../../../../lib/server.js";

export async function POST(request) {
  const supabase = await createClient();
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return Response.json(
      { error: error.message || "Invalid email or password." },
      { status: 401 },
    );
  }

  return Response.json({ success: true });
}