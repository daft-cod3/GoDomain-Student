export const LEARNING_PROGRESS_KEY = "godomain-learning-progress";

function cloneUnits(units) {
  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => ({
      ...lesson,
      lessons: lesson.lessons.map((entry) => ({ ...entry })),
    })),
  }));
}

function buildProgressPayload(units) {
  return {
    lessons: units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        id: lesson.id,
        completedStepIds: lesson.lessons
          .filter((entry) => entry.completed)
          .map((entry) => entry.id),
      })),
    ),
  };
}

export function hydrateLearningProgress(units) {
  const clonedUnits = cloneUnits(units);

  if (typeof window === "undefined") {
    return clonedUnits;
  }

  try {
    const stored = window.localStorage.getItem(LEARNING_PROGRESS_KEY);

    if (!stored) {
      return clonedUnits;
    }

    const payload = JSON.parse(stored);
    const progressMap = new Map(
      Array.isArray(payload?.lessons)
        ? payload.lessons.map((lesson) => [
            lesson.id,
            new Set(lesson.completedStepIds ?? []),
          ])
        : [],
    );

    return clonedUnits.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson) => {
        const completedStepIds = progressMap.get(lesson.id);

        if (!completedStepIds) {
          return lesson;
        }

        return {
          ...lesson,
          lessons: lesson.lessons.map((entry) => ({
            ...entry,
            completed: completedStepIds.has(entry.id),
          })),
        };
      }),
    }));
  } catch {
    return clonedUnits;
  }
}

export function persistLearningProgress(units) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    LEARNING_PROGRESS_KEY,
    JSON.stringify(buildProgressPayload(units)),
  );
}

export function getCompletedLessons(units) {
  return units
    .flatMap((unit) => unit.lessons)
    .filter(
      (lesson) =>
        lesson.lessons.length > 0 &&
        lesson.lessons.every((entry) => entry.completed),
    );
}
