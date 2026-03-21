"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLearningDayHref, learningOverview, learningUnits } from "..";
import {
  hydrateLearningProgress,
  persistLearningProgress,
} from "../progress-store";
import LessonCard from "./lesson-card";
import LessonDetail from "./lesson-detail";
import UnitStrip from "./unit-strip";

function buildUnits(units) {
  return units.map((unit) => {
    const lessons = unit.lessons.map((lesson) => {
      const completedSteps = lesson.lessons.filter(
        (entry) => entry.completed,
      ).length;

      return {
        ...lesson,
        completedSteps,
        progress: Math.round((completedSteps / lesson.lessons.length) * 100),
      };
    });
    const completedSubLessons = lessons.reduce(
      (sum, lesson) => sum + lesson.completedSteps,
      0,
    );
    const totalSubLessons = lessons.reduce(
      (sum, lesson) => sum + lesson.lessons.length,
      0,
    );

    return {
      ...unit,
      lessons,
      completedLessons: lessons.filter((lesson) => lesson.progress === 100)
        .length,
      completedSubLessons,
      totalSubLessons,
      progress: totalSubLessons
        ? Math.round((completedSubLessons / totalSubLessons) * 100)
        : 0,
    };
  });
}

function getFirstLesson(unit) {
  return unit?.lessons[0] ?? null;
}

function getCurrentLesson(units) {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!lesson.isLocked && lesson.progress < 100) {
        return lesson;
      }
    }
  }

  return units[0]?.lessons[0] ?? null;
}

export default function LearningPathShell() {
  const [units, setUnits] = useState(() => buildUnits(learningUnits));
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState(units[0]?.id ?? "unit-1");
  const [activeLessonId, setActiveLessonId] = useState(
    units[0]?.lessons[0]?.id ?? "unit-1-lesson-1",
  );

  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const activeLesson =
    activeUnit?.lessons.find((lesson) => lesson.id === activeLessonId) ??
    getFirstLesson(activeUnit);
  const currentLesson = getCurrentLesson(units);
  const totalCompletedSubLessons = units.reduce(
    (sum, unit) => sum + unit.completedSubLessons,
    0,
  );
  const unlockedLessons = units.reduce(
    (sum, unit) =>
      sum + unit.lessons.filter((lesson) => !lesson.isLocked).length,
    0,
  );

  useEffect(() => {
    setUnits(buildUnits(hydrateLearningProgress(learningUnits)));
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    persistLearningProgress(units);
  }, [hasHydratedProgress, units]);

  function handleSelectUnit(unitId) {
    const nextUnit = units.find((unit) => unit.id === unitId);

    if (!nextUnit) {
      return;
    }

    setActiveUnitId(unitId);
    setActiveLessonId(nextUnit.lessons[0]?.id ?? activeLessonId);
  }

  function handleSelectLesson(lessonId) {
    for (const unit of units) {
      if (unit.lessons.some((lesson) => lesson.id === lessonId)) {
        setActiveUnitId(unit.id);
        setActiveLessonId(lessonId);
        return;
      }
    }
  }

  function handleToggleSubLesson(lessonId, subLessonId) {
    setUnits((currentUnits) =>
      buildUnits(
        currentUnits.map((unit) => ({
          ...unit,
          lessons: unit.lessons.map((lesson) => {
            if (lesson.id !== lessonId || lesson.isLocked) {
              return lesson;
            }

            return {
              ...lesson,
              lessons: lesson.lessons.map((entry) => {
                if (entry.id !== subLessonId) {
                  return entry;
                }

                return {
                  ...entry,
                  completed: !entry.completed,
                };
              }),
            };
          }),
        })),
      ),
    );
  }

  return (
    <section className="lp-shell">
      <header className="lp-hero">
        <div className="lp-hero-copy">
          <span className="lp-kicker">Learning path / brutal minimal</span>
          <h1 className="lp-hero-title">Unit-based lesson control.</h1>
          <p className="lp-hero-text">
            Four units, twenty lessons, and eighty sub-lessons. Unit 1 is live
            with five unlocked lessons. Every fully completed lesson unlocks a
            dashboard review card automatically.
          </p>
        </div>

        <div className="lp-hero-meta">
          <div className="lp-hero-metric">
            <span>Unlocked now</span>
            <strong>{unlockedLessons} lessons</strong>
          </div>
          <div className="lp-hero-metric">
            <span>Sub-lessons done</span>
            <strong>
              {totalCompletedSubLessons}/{learningOverview.totalSubLessons}
            </strong>
          </div>
          {currentLesson
            ? <Link
                className="lp-hero-action"
                href={getLearningDayHref(currentLesson.id)}
              >
                Resume {currentLesson.label}
              </Link>
            : null}
        </div>
      </header>

      <UnitStrip
        activeUnitId={activeUnit.id}
        onSelectUnit={handleSelectUnit}
        units={units}
      />

      <div className="lp-main-grid">
        <section className="lp-board">
          <div className="lp-board-head">
            <div>
              <div className="lp-board-kicker">
                {activeUnit.label} / {activeUnit.title}
              </div>
              <h2 className="lp-board-title">{activeUnit.summary}</h2>
            </div>
            <div className="lp-board-progress">
              <strong>{activeUnit.progress}%</strong>
              <span>{activeUnit.completedLessons}/5 lessons done</span>
            </div>
          </div>

          <div className="lp-lesson-grid">
            {activeUnit.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                isActive={lesson.id === activeLesson?.id}
                lesson={lesson}
                onSelect={handleSelectLesson}
              />
            ))}
          </div>
        </section>

        {activeLesson
          ? <LessonDetail
              lesson={activeLesson}
              onToggleSubLesson={handleToggleSubLesson}
            />
          : null}
      </div>
    </section>
  );
}
