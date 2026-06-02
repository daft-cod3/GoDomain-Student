import { getUserFromRequest } from "../../../../lib/auth.js";
import { query } from "../../../../lib/db.js";
import { getLearningDay } from "../../../learn/index.js";

async function upsertProgress(userId, lessonId, completedStepIds, progressPercent) {
  const existing = await query(
    `SELECT progress_percent FROM learning_progress
     WHERE user_id = $1 AND lesson_id = $2`,
    [userId, lessonId],
  );

  if (existing.rows.length > 0) {
    await query(
      `UPDATE learning_progress
       SET completed_step_ids = $1,
           progress_percent = $2,
           updated_at = NOW()
       WHERE user_id = $3 AND lesson_id = $4`,
      [JSON.stringify(completedStepIds), progressPercent, userId, lessonId],
    );
    return existing.rows[0].progress_percent;
  }

  await query(
    `INSERT INTO learning_progress (user_id, lesson_id, completed_step_ids, progress_percent)
     VALUES ($1, $2, $3, $4)`,
    [userId, lessonId, JSON.stringify(completedStepIds), progressPercent],
  );
  return 0;
}

export async function POST(request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const lessons = Array.isArray(body.lessons) ? body.lessons : [];

  for (const lesson of lessons) {
    const lessonId = (lesson.id || "").trim();
    if (!lessonId) continue;
    const completedStepIds = Array.isArray(lesson.completedStepIds) ? lesson.completedStepIds : [];
    let progressPercent;
    if (Number.isFinite(lesson.progressPercent)) {
      progressPercent = Math.max(0, Math.min(100, Number(lesson.progressPercent)));
    } else {
      const learningDay = getLearningDay(lessonId);
      const totalSteps = learningDay?.lessons?.length ?? completedStepIds.length;
      progressPercent = totalSteps > 0 ? Math.round((completedStepIds.length / totalSteps) * 100) : 0;
    }

    const previousPercent = await upsertProgress(
      user.id,
      lessonId,
      completedStepIds,
      progressPercent,
    );

    if (progressPercent === 100 && previousPercent < 100) {
      await query(
        `INSERT INTO activities (user_id, type, title, detail)
         VALUES ($1, $2, $3, $4)`,
        [
          user.id,
          "Achievement",
          `Completed lesson ${lessonId}`,
          `Finished all steps in ${lessonId}`,
        ],
      );
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
