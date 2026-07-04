import { getUserFromRequest } from "../../../../lib/auth.js";
import { createClient } from "../../../../lib/server.js";
import { getLearningDay } from "../../../learn/index.js";

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

  if (existingError) {
    throw existingError;
  }

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

  if (error) {
    throw error;
  }

  return existing?.progress_percent ?? 0;
}

export async function POST(request) {
  const user = await getUserFromRequest();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const lessons = Array.isArray(body.lessons) ? body.lessons : [];
  const supabase = await createClient();

  try {
    for (const lesson of lessons) {
      const lessonId = (lesson.id || "").trim();
      if (!lessonId) continue;

      const completedStepIds = Array.isArray(lesson.completedStepIds)
        ? lesson.completedStepIds
        : [];
      let progressPercent;

      if (Number.isFinite(lesson.progressPercent)) {
        progressPercent = Math.max(
          0,
          Math.min(100, Number(lesson.progressPercent)),
        );
      } else {
        const learningDay = getLearningDay(lessonId);
        const totalSteps =
          learningDay?.lessons?.length ?? completedStepIds.length;
        progressPercent =
          totalSteps > 0
            ? Math.round((completedStepIds.length / totalSteps) * 100)
            : 0;
      }

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
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
