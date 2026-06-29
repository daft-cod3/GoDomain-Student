import { createClient } from "../../../../lib/server.js";

const PROVIDERS = new Set(["google", "facebook"]);

export async function POST(request) {
  const supabase = await createClient();
  const body = await request.json();
  const provider = (body.provider || "").toLowerCase();
  const next = body.redirectTo || "/";

  if (!PROVIDERS.has(provider)) {
    return Response.json({ error: "Unsupported provider." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || new URL(request.url).origin;
  const redirectTo = new URL("/auth/callback", origin);
  redirectTo.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo.toString(),
    },
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true, url: data.url });
}