import { getUserFromRequest } from "../../../lib/auth.js";
import { query } from "../../../lib/db.js";

async function insertOrUpdateProgress(userId, lessonId, completedStepIds, progressPercent) {
  const existing = await query(
    `SELECT progress_percent FROM learning_progress
     WHERE user_id = $1 AND lesson_id = $2`,
    [userId, lessonId],
  );

  const rows = existing.rows;
  if (rows.length > 0) {
    const previous = rows[0].progress_percent ?? 0;
    await query(
      `UPDATE learning_progress
       SET completed_step_ids = $1,
           progress_percent = $2,
           updated_at = NOW()
       WHERE user_id = $3 AND lesson_id = $4`,
      [JSON.stringify(completedStepIds), progressPercent, userId, lessonId],
    );
    return previous;
  }

  await query(
    `INSERT INTO learning_progress (user_id, lesson_id, completed_step_ids, progress_percent)
     VALUES ($1, $2, $3, $4)`,
    [userId, lessonId, JSON.stringify(completedStepIds), progressPercent],
  );
  return 0;
}

export async function GET(request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await query(
    `SELECT lesson_id, completed_step_ids, progress_percent, updated_at
     FROM learning_progress
     WHERE user_id = $1
     ORDER BY updated_at DESC`,
    [user.id],
  );

  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
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
  const lessonId = (body.lessonId || "").trim();
  const completedStepIds = Array.isArray(body.completedStepIds) ? body.completedStepIds : [];
  const progressPercent = Number.isFinite(body.progressPercent)
    ? Math.max(0, Math.min(100, Number(body.progressPercent)))
    : Math.round(completedStepIds.length * 100);

  if (!lessonId) {
    return new Response(JSON.stringify({ error: "lessonId is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const previousPercent = await insertOrUpdateProgress(
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

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
