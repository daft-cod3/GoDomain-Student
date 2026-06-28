import { getLessonSubLesson } from "../../../../../lib/learn-content-db.js";

export async function GET(_request, { params }) {
  const lessonId = String(params.lessonId ?? "");
  const stepId = String(params.stepId ?? "");

  const data = await getLessonSubLesson(lessonId, stepId);
  if (!data) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

