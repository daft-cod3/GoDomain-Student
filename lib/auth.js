import { createClient } from "./server.js";

const profileCache = new Map(); // { userId -> { profile, expiresAt } }
const CACHE_TTL_MS = 30_000;

function getCached(userId) {
  const entry = profileCache.get(userId);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { profileCache.delete(userId); return null; }
  return entry.profile;
}

export function invalidateProfileCache(userId) {
  profileCache.delete(userId);
}

function defaultDisplayName(email = "") {
  return email.split("@")[0] || "Learner";
}

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const cached = getCached(user.id);
  if (cached) return cached;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, display_name, index_number, phone_number, county, driving_school, driving_class, age, track, next_session, progress, lessons_complete, road_hours, attendance, coins, coin_capacity, hp, hp_capacity, energy, energy_capacity, level, mentor, quiz_accuracy, live_hours, focus_rate, badges_count")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  if (profile) {
    const result = { ...profile, id: user.id, email: profile.email || user.email };
    profileCache.set(user.id, { profile: result, expiresAt: Date.now() + CACHE_TTL_MS });
    return result;
  }

  const displayName =
    user.user_metadata?.display_name || defaultDisplayName(user.email);

  const { data: createdProfile, error: createError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: user.email,
        display_name: displayName,
      },
      { onConflict: "id" },
    )
    .select("id, email, display_name, index_number, phone_number, county, driving_school, driving_class, age, track, next_session, progress, lessons_complete, road_hours, attendance, coins, coin_capacity, hp, hp_capacity, energy, energy_capacity, level, mentor, quiz_accuracy, live_hours, focus_rate, badges_count")
    .single();

  if (createError) {
    throw createError;
  }

  const result = { ...createdProfile, id: user.id, email: createdProfile.email || user.email };
  profileCache.set(user.id, { profile: result, expiresAt: Date.now() + CACHE_TTL_MS });
  return result;
}

export async function getUserFromRequest() {
  return getSessionUser();
}
