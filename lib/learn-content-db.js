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

// Simple in-process memoization to reduce duplicate DB hits during dev.
// TTL keeps it fresh while still improving navigation performance.
const lessonWithStepsCache = new Map();
const LESSON_WITH_STEPS_TTL_MS = 45_000;

function getCachedLesson(lessonId) {
  const entry = lessonWithStepsCache.get(lessonId);
  if (!entry) return undefined;
  if (Date.now() - entry.createdAtMs > LESSON_WITH_STEPS_TTL_MS) {
    lessonWithStepsCache.delete(lessonId);
    return undefined;
  }
  return entry.value;
}

async function getLessonWithSteps(lessonId) {
  const cached = getCachedLesson(lessonId);
  if (cached !== undefined) return cached;

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

  if (!lesson) {
    // Cache null to avoid repeated misses.
    lessonWithStepsCache.set(lessonId, { createdAtMs: Date.now(), value: null });
    return null;
  }

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

  const mapped = mapLesson(lesson, steps ?? []);
  lessonWithStepsCache.set(lessonId, { createdAtMs: Date.now(), value: mapped });
  return mapped;
}


export async function getLessonSubLesson(lessonId, stepId) {
  const lesson = await getLessonWithSteps(lessonId);
  if (!lesson) return null;

  const activeStepIndex = lesson.lessons.findIndex(
    (step) => step.id === stepId,
  );
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
