import { getUserFromRequest } from "../../../lib/auth.js";
import { createClient } from "../../../lib/server.js";
import { getLearningDay } from "../../learn/index.js";

async function upsertProgress(
  supabase,
  userId,
  lessonId,
  completedStepIds,
  progressPercent,
) {
  const { data: existing, error: existingError } = await supabase
    .from("learning_progress")
    .select("progress_percent")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existingError) throw existingError;

  const previousPercent = existing?.progress_percent ?? 0;

  const { error } = await supabase.from("learning_progress").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      completed_step_ids: completedStepIds,
      progress_percent: progressPercent,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" },
  );

  if (error) throw error;

  return previousPercent;
}

export async function GET() {
  const user = await getUserFromRequest();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("learning_progress")
    .select("lesson_id, completed_step_ids, progress_percent, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

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

  const body = await request.json();
  const lessonId = (body.lessonId || "").trim();
  const completedStepIds = Array.isArray(body.completedStepIds)
    ? body.completedStepIds
    : [];

  if (!lessonId) {
    return Response.json({ error: "lessonId is required." }, { status: 400 });
  }

  let progressPercent;
  if (Number.isFinite(body.progressPercent)) {
    progressPercent = Math.max(0, Math.min(100, Number(body.progressPercent)));
  } else {
    const lesson = getLearningDay(lessonId);
    const totalSteps = lesson?.lessons?.length ?? completedStepIds.length;
    progressPercent =
      totalSteps > 0
        ? Math.round((completedStepIds.length / totalSteps) * 100)
        : 0;
  }

  try {
    const supabase = await createClient();
    const previousPercent = await upsertProgress(
      supabase,
      user.id,
      lessonId,
      completedStepIds,
      progressPercent,
    );

    if (progressPercent === 100 && previousPercent < 100) {
      const { error } = await supabase.from("activities").insert({
        user_id: user.id,
        type: "Achievement",
        title: `Completed lesson ${lessonId}`,
        detail: `Finished all steps in ${lessonId}`,
      });

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
