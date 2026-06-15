import { notFound } from "next/navigation";
import {
  getLearningDay,
  getLearningUnit,
  learningDayIds,
  learningDays,
} from "../../learn";
import LessonPageClient from "../lesson-page-client";

function getLessonParagraphs(lesson) {
  const topicParagraphs =
    lesson.overviewTopics?.slice(0, 2).map((topic) => {
      const summary = topic.points.slice(0, 2).join(" ");
      return `${topic.title}: ${summary}`;
    }) ?? [];

  return [
    lesson.overviewSummary ??
      `${lesson.title} gives the learner a focused route through the key rules, the practical read of the road, and the actions that matter most under pressure.`,
    ...topicParagraphs,
  ].slice(0, 3);
}

function getLessonVideoChapters(lesson) {
  const topicTitles = lesson.overviewTopics?.map((topic) => topic.title) ?? [];

  return [
    `Introduction to ${lesson.title.toLowerCase()}`,
    topicTitles[0] ?? `${lesson.title} core routine`,
    topicTitles[1] ?? "Worked examples and mistake correction",
  ];
}

function getLessonGifNotes(lesson) {
  return [
    `Animated walkthrough showing the main movement and observation pattern for ${lesson.title.toLowerCase()}.`,
    "Use the loop before practice so the sequence feels familiar before the lesson begins.",
  ];
}

export function generateStaticParams() {
  return learningDayIds.map((dayId) => ({ dayId }));
}

export default async function LearningDayPage({ params }) {
  const { dayId } = await params;
  const lesson = getLearningDay(dayId);

  if (!lesson) {
    notFound();
  }

  const dayIndex = learningDays.findIndex((entry) => entry.id === lesson.id);
  const previousDay = dayIndex > 0 ? learningDays[dayIndex - 1] : null;
  const nextDay =
    dayIndex < learningDays.length - 1 ? learningDays[dayIndex + 1] : null;

  const unit = getLearningUnit(lesson.unitId);

  const completedLessons = lesson.lessons.filter((entry) => entry.completed)
    .length;
  const totalLessons = lesson.lessons.length;
  const progress = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  const nextIncompleteStep = lesson.lessons.find((entry) => !entry.completed);

  const lessonParagraphs = getLessonParagraphs(lesson);
  const lessonVideoChapters = getLessonVideoChapters(lesson);
  const lessonGifNotes = getLessonGifNotes(lesson);
  const lessonPoints =
    lesson.overviewTopics?.flatMap((topic) => topic.points)?.slice(0, 6) ??
    lesson.lessons.map((entry) => entry.detail).slice(0, 4);

  const rewardCards = [
    {
      label: "Coins",
      value: `+${40 + lesson.lessonNumber * 8}`,
      note: "Granted after the full lesson is completed.",
    },
    {
      label: "Energy use",
      value: `-${8 + lesson.lessonNumber}`,
      note: "Plan shorter sessions if your energy bar is already low.",
    },
    {
      label: "HP protection",
      value: `${Math.max(62, 88 - (100 - progress) / 2)}%`,
      note: "Cleaner lesson results help protect your driving HP.",
    },
    {
      label: "Bonus",
      value: progress === 100 ? "Unlocked" : "Pending",
      note: "Finish all four steps to unlock the final completion bonus.",
    },
  ];

  const resultCards = [
    {
      label: "Current result",
      value:
        progress === 100
          ? "Mastered"
          : progress >= 50
            ? "In progress"
            : "Starting",
      note: "Your lesson result updates as theory, board, signs, and quiz steps are completed.",
    },
    {
      label: "Step score",
      value: `${completedLessons}/${totalLessons}`,
      note: "All four steps count equally toward the lesson outcome.",
    },
    {
      label: "Dashboard reward",
      value: progress === 100 ? "Review card ready" : "Needs all steps",
      note: "A full clear unlocks the lesson inside dashboard content review.",
    },
    {
      label: "Recommended focus",
      value: nextIncompleteStep?.title ?? "Revise and move forward",
      note: "This is the next best step if you want to finish the topic efficiently.",
    },
  ];

  return (
    <LessonPageClient
      lesson={lesson}
      previousDay={previousDay}
      nextDay={nextDay}
      unit={unit}
      progress={progress}
      completedLessons={completedLessons}
      totalLessons={totalLessons}
      nextIncompleteStep={nextIncompleteStep}
      lessonParagraphs={lessonParagraphs}
      lessonVideoChapters={lessonVideoChapters}
      lessonGifNotes={lessonGifNotes}
      lessonPoints={lessonPoints}
      rewardCards={rewardCards}
      resultCards={resultCards}
    />
  );
}

