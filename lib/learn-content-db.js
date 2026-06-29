import { query } from "./db.js";

export async function getLessonSubLesson(lessonId, stepId) {
  const lessonRes = await query(
    `SELECT
       l.lesson_id,
       l.unit_id,
       l.unit_number,
       l.unit_label,
       l.lesson_number,
       l.label,
       l.title,
       l.subtitle,
       l.icon,
       l.is_locked,
       l.overview_title,
       l.overview_summary
     FROM lessons l
     WHERE l.lesson_id = $1`,
    [lessonId],
  );

  if (lessonRes.rows.length === 0) return null;
  const lesson = lessonRes.rows[0];

  const stepsRes = await query(
    `SELECT
       s.step_id,
       s.step_number,
       s.kind,
       s.title,
       s.duration,
       s.detail,
       ot.topic_title,
       ot.topic_points
     FROM lesson_steps s
     LEFT JOIN lesson_overview_topics ot
       ON ot.step_id = s.step_id
     WHERE s.lesson_id = $1
     ORDER BY s.step_number ASC`,
    [lessonId],
  );

  const steps = stepsRes.rows.map((r) => ({
    id: r.step_id,
    kind: r.kind,
    title: r.title,
    duration: r.duration,
    detail: r.detail,
    topic: r.topic_title
      ? {
          title: r.topic_title,
          points: r.topic_points ?? [],
        }
      : null,
  }));

  const activeStepIndex = steps.findIndex((s) => s.id === stepId);
  if (activeStepIndex < 0) return null;

  const step = steps[activeStepIndex];

  const overviewTopics = steps.map((s) =>
    s.topic ? { title: s.topic.title, points: s.topic.points } : null,
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
    overviewTopics,
    lessons: steps.map((s) => ({
      id: s.id,
      kind: s.kind,
      title: s.title,
      duration: s.duration,
      detail: s.detail,
    })),
    activeStepIndex,
    step: steps[activeStepIndex]
      ? {
          id: steps[activeStepIndex].id,
          kind: steps[activeStepIndex].kind,
          title: steps[activeStepIndex].title,
          duration: steps[activeStepIndex].duration,
          detail: steps[activeStepIndex].detail,
          topic: steps[activeStepIndex].topic,
        }
      : null,
  };
}

export async function getLessonSteps(lessonId) {
  const lessonRes = await query(
    `SELECT
       l.lesson_id,
       l.unit_id,
       l.unit_number,
       l.unit_label,
       l.lesson_number,
       l.label,
       l.title,
       l.subtitle,
       l.icon,
       l.is_locked,
       l.overview_title,
       l.overview_summary
     FROM lessons l
     WHERE l.lesson_id = $1`,
    [lessonId],
  );

  if (lessonRes.rows.length === 0) return null;
  const lesson = lessonRes.rows[0];

  const stepsRes = await query(
    `SELECT
       s.step_id,
       s.step_number,
       s.kind,
       s.title,
       s.duration,
       s.detail,
       ot.topic_title,
       ot.topic_points
     FROM lesson_steps s
     LEFT JOIN lesson_overview_topics ot
       ON ot.step_id = s.step_id
     WHERE s.lesson_id = $1
     ORDER BY s.step_number ASC`,
    [lessonId],
  );

  const lessons = stepsRes.rows.map((r) => ({
    id: r.step_id,
    kind: r.kind,
    title: r.title,
    duration: r.duration,
    detail: r.detail,
  }));

  const overviewTopics = stepsRes.rows.map((r) =>
    r.topic_title
      ? { title: r.topic_title, points: r.topic_points ?? [] }
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

