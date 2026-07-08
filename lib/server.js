import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export async function createClient() {
  return supabaseCreateClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
  );
}
