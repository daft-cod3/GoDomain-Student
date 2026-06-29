import { getUserFromRequest } from "../../../lib/auth.js";
import { createClient } from "../../../lib/server.js";

export async function GET() {
  const user = await getUserFromRequest();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("id, type, title, detail, metadata, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data ?? []);
}

export async function POST(request) {
  const user = await getUserFromRequest();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const body = await request.json();
  const type = (body.type || "Update").trim();
  const title = (body.title || "Activity update").trim();
  const detail = body.detail || "";
  const metadata = body.metadata || {};

  const { error } = await supabase.from("activities").insert({
    user_id: user.id,
    type,
    title,
    detail,
    metadata,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true }, { status: 201 });
}