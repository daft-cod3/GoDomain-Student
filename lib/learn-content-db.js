import { createClient } from "./server.js";

function mapLesson(lesson, steps) {
  const lessons = steps.map((row) => ({
    id: row.step_id,
    kind: row.kind,
    title: row.title,
    duration: row.duration,
    detail: row.detail,
  }));

  const overviewTopics = steps.map((row) =>
    row.lesson_overview_topics
      ? {
          title: row.lesson_overview_topics.topic_title,
          points: row.lesson_overview_topics.topic_points ?? [],
        }
      : null,
  );

  return {
    id: lesson.lesson_id,
    unitId: lesson.unit_id,
    unitNumber: lesson.unit_number,
    unitLabel: lesson.unit_label,
    lessonNumber: lesson.lesson_number,
    label: lesson.label,
    title: lesson.title,
    subtitle: lesson.subtitle,
    icon: lesson.icon,
    isLocked: !!lesson.is_locked,
    overviewTitle: lesson.overview_title,
    overviewSummary: lesson.overview_summary,
    lessons,
    overviewTopics,
  };
}

async function getLessonWithSteps(lessonId) {
  const supabase = await createClient();

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(
      "lesson_id, unit_id, unit_number, unit_label, lesson_number, label, title, subtitle, icon, is_locked, overview_title, overview_summary",
    )
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (lessonError) {
    throw lessonError;
  }

  if (!lesson) return null;

  const { data: steps, error: stepsError } = await supabase
    .from("lesson_steps")
    .select(
      "step_id, step_number, kind, title, duration, detail, lesson_overview_topics(topic_title, topic_points)",
    )
    .eq("lesson_id", lessonId)
    .order("step_number", { ascending: true });

  if (stepsError) {
    throw stepsError;
  }

  return mapLesson(lesson, steps ?? []);
}

export async function getLessonSubLesson(lessonId, stepId) {
  const lesson = await getLessonWithSteps(lessonId);
  if (!lesson) return null;

  const activeStepIndex = lesson.lessons.findIndex((step) => step.id === stepId);
  if (activeStepIndex < 0) return null;

  return {
    ...lesson,
    activeStepIndex,
    step: {
      ...lesson.lessons[activeStepIndex],
      topic: lesson.overviewTopics[activeStepIndex] ?? null,
    },
  };
}

export async function getLessonSteps(lessonId) {
  return getLessonWithSteps(lessonId);
}