import { createClient } from "../../../../lib/server.js";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("id")
    .limit(1);

  return Response.json({
    ok: true,
    connected: !error,
    sample: data?.[0] ?? null,
    error: error?.message ?? null,
  });
}
