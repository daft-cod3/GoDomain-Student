import { createClient } from "./server.js";

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

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  if (profile) {
    return {
      ...profile,
      id: user.id,
      email: profile.email || user.email,
    };
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
    .select("*")
    .single();

  if (createError) {
    throw createError;
  }

  return {
    ...createdProfile,
    id: user.id,
    email: createdProfile.email || user.email,
  };
}

export async function getUserFromRequest() {
  return getSessionUser();
}