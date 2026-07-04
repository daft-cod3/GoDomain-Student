import { createClient } from "../../../lib/server.js";

export async function GET() {
  const supabase = await createClient();
  const { error } = await supabase
    .from("learning_units")
    .select("unit_id", { count: "exact", head: true });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, backend: "supabase" });
}
