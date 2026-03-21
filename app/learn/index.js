const unitBlueprints = [
  {
    id: "unit-1",
    number: 1,
    label: "Unit 1",
    title: "Road Foundations",
    summary: "Five unlocked lessons to build the core driving routine.",
    unlocked: true,
  },
  {
    id: "unit-2",
    number: 2,
    label: "Unit 2",
    title: "Live Road Reading",
    summary: "Unlock this unit after clearing every lesson in Unit 1.",
    unlocked: false,
  },
  {
    id: "unit-3",
    number: 3,
    label: "Unit 3",
    title: "Safe Maneuvers",
    summary: "Advanced control and emergency response drills.",
    unlocked: false,
  },
  {
    id: "unit-4",
    number: 4,
    label: "Unit 4",
    title: "Exam Readiness",
    summary: "Mock tests, revision loops, and final prep.",
    unlocked: false,
  },
];

const lessonBlueprints = [
  [
    {
      title: "Vehicle Controls",
      subtitle: "Build a calm cockpit routine before the engine starts.",
      icon: "book",
      focus: "Control setup",
    },
    {
      title: "Traffic Signs",
      subtitle: "Read the signs that shape pace, direction, and safety.",
      icon: "star",
      focus: "Sign reading",
    },
    {
      title: "Road Markings",
      subtitle: "Use lane paint and road edges to read the road early.",
      icon: "video",
      focus: "Lane reading",
    },
    {
      title: "Junction Rules",
      subtitle: "Learn who moves first and where risk builds up fastest.",
      icon: "mic",
      focus: "Junction flow",
    },
    {
      title: "Hazard Awareness",
      subtitle: "Spot pedestrians, blind corners, and sudden stops sooner.",
      icon: "dumbbell",
      focus: "Hazard scan",
    },
  ],
  [
    {
      title: "Speed Management",
      subtitle: "Match the road, not just the speed sign.",
      icon: "dumbbell",
      focus: "Speed control",
    },
    {
      title: "Lane Discipline",
      subtitle: "Stay stable through merges, turns, and lane changes.",
      icon: "book",
      focus: "Lane discipline",
    },
    {
      title: "Overtaking Basics",
      subtitle: "Plan safe passes with time, space, and visibility.",
      icon: "star",
      focus: "Safe overtaking",
    },
    {
      title: "Pedestrian Zones",
      subtitle: "Handle school areas, crossings, and shared streets.",
      icon: "video",
      focus: "Pedestrian safety",
    },
    {
      title: "Night Driving",
      subtitle: "See further, react slower, and control glare correctly.",
      icon: "mic",
      focus: "Night routine",
    },
  ],
  [
    {
      title: "Parking Routine",
      subtitle: "Break parking down into clean, repeatable steps.",
      icon: "book",
      focus: "Parking setup",
    },
    {
      title: "Hill Starts",
      subtitle: "Hold control on an incline without panic or rollback.",
      icon: "dumbbell",
      focus: "Hill start",
    },
    {
      title: "Roundabouts",
      subtitle: "Read gaps, exits, and lane choice before entry.",
      icon: "star",
      focus: "Roundabout reading",
    },
    {
      title: "Emergency Response",
      subtitle: "React fast and keep the vehicle stable under pressure.",
      icon: "mic",
      focus: "Emergency response",
    },
    {
      title: "Highway Etiquette",
      subtitle: "Blend speed, spacing, and smooth lane changes.",
      icon: "video",
      focus: "Highway flow",
    },
  ],
  [
    {
      title: "Mock Theory",
      subtitle: "Test your recall under exam-like timing.",
      icon: "star",
      focus: "Theory practice",
    },
    {
      title: "Case Drills",
      subtitle: "Solve scenario-based decisions with confidence.",
      icon: "video",
      focus: "Case analysis",
    },
    {
      title: "Sign Memory",
      subtitle: "Speed up recognition with short repetition cycles.",
      icon: "book",
      focus: "Sign memory",
    },
    {
      title: "Final Revision",
      subtitle: "Tighten the weak points before assessment day.",
      icon: "mic",
      focus: "Revision loop",
    },
    {
      title: "Assessment Warmup",
      subtitle: "Run a final confidence check before the exam.",
      icon: "dumbbell",
      focus: "Exam warmup",
    },
  ],
];

const completionBlueprint = {
  "unit-1": [4, 3, 2, 1, 0],
};

const subLessonBlueprints = [
  {
    kind: "theory",
    suffix: "notes",
    duration: "8 min",
    detail: "Read the concept summary and lock the key rules in memory.",
  },
  {
    kind: "board",
    suffix: "board drill",
    duration: "10 min",
    detail: "Use a guided board example to map the correct driving response.",
  },
  {
    kind: "signs",
    suffix: "sign lab",
    duration: "6 min",
    detail: "Match visual cues to the right action before moving on.",
  },
  {
    kind: "quiz",
    suffix: "quick check",
    duration: "5 min",
    detail: "Finish a short quiz to confirm the lesson is sticking.",
  },
];

function createSubLessons(unit, lessonNumber, focus) {
  const completedCount = completionBlueprint[unit.id]?.[lessonNumber - 1] ?? 0;

  return subLessonBlueprints.map((template, index) => ({
    id: `${unit.id}-lesson-${lessonNumber}-step-${index + 1}`,
    title: `${focus} ${template.suffix}`,
    kind: template.kind,
    duration: template.duration,
    detail: template.detail,
    completed: unit.unlocked ? index < completedCount : false,
  }));
}

function createLesson(unit, lessonBlueprint, lessonNumber, globalIndex) {
  const lessons = createSubLessons(unit, lessonNumber, lessonBlueprint.focus);

  return {
    id: `${unit.id}-lesson-${lessonNumber}`,
    index: globalIndex,
    label: `Lesson ${String(lessonNumber).padStart(2, "0")}`,
    title: lessonBlueprint.title,
    subtitle: lessonBlueprint.subtitle,
    icon: lessonBlueprint.icon,
    unitId: unit.id,
    unitNumber: unit.number,
    unitLabel: unit.label,
    lessonNumber,
    isLocked: !unit.unlocked,
    lessons,
  };
}

let globalLessonIndex = 1;

export const learningUnits = unitBlueprints.map((unit, unitIndex) => {
  const lessons = lessonBlueprints[unitIndex].map(
    (lessonBlueprint, lessonIndex) =>
      createLesson(unit, lessonBlueprint, lessonIndex + 1, globalLessonIndex++),
  );
  const completedSubLessons = lessons.reduce(
    (sum, lesson) =>
      sum + lesson.lessons.filter((entry) => entry.completed).length,
    0,
  );
  const totalSubLessons = lessons.reduce(
    (sum, lesson) => sum + lesson.lessons.length,
    0,
  );
  const completedLessons = lessons.filter((lesson) =>
    lesson.lessons.every((entry) => entry.completed),
  ).length;

  return {
    ...unit,
    lessons,
    completedSubLessons,
    totalSubLessons,
    completedLessons,
    progress: totalSubLessons
      ? Math.round((completedSubLessons / totalSubLessons) * 100)
      : 0,
  };
});

export const learningDays = learningUnits.flatMap((unit) => unit.lessons);

export const learningDayIds = learningDays.map((lesson) => lesson.id);

export const learningOverview = {
  totalUnits: learningUnits.length,
  totalLessons: learningDays.length,
  totalSubLessons: learningDays.reduce(
    (sum, lesson) => sum + lesson.lessons.length,
    0,
  ),
  unlockedLessons: learningDays.filter((lesson) => !lesson.isLocked).length,
};

export function getLearningDay(dayId) {
  return learningDays.find((lesson) => lesson.id === dayId);
}

export function getLearningUnit(unitId) {
  return learningUnits.find((unit) => unit.id === unitId);
}

export function getLearningDayHref(dayId) {
  return `/content/${dayId}`;
}
