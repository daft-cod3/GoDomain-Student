"use client";

import Link from "next/link";
import { getLearningDayHref } from "..";
import { LessonIcon } from "../icons";

function getCompletedSteps(lesson) {
  return lesson.lessons.filter((entry) => entry.completed).length;
}

export default function LessonDetail({ lesson, onToggleSubLesson }) {
  const completedSteps = getCompletedSteps(lesson);
  const progress = Math.round((completedSteps / lesson.lessons.length) * 100);

  return (
    <aside className="lp-detail-card">
      <div className="lp-detail-top">
        <div>
          <div className="lp-detail-eyebrow">
            {lesson.unitLabel} / {lesson.label}
          </div>
          <h2 className="lp-detail-title">{lesson.title}</h2>
        </div>
        <div
          className={`lp-detail-lock ${lesson.isLocked ? "locked" : "open"}`}
        >
          {lesson.isLocked ? "Locked" : "Unlocked"}
        </div>
      </div>

      <p className="lp-detail-summary">{lesson.subtitle}</p>

      <div className="lp-detail-progress">
        <div className="lp-detail-progress-row">
          <span>Progress</span>
          <strong>{completedSteps}/4</strong>
        </div>
        <div className="lp-detail-progress-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="lp-step-list">
        {lesson.lessons.map((entry, index) => (
          <button
            key={entry.id}
            className={`lp-step-card ${entry.completed ? "done" : ""}`}
            type="button"
            onClick={() => onToggleSubLesson(lesson.id, entry.id)}
            disabled={lesson.isLocked}
            aria-pressed={entry.completed}
          >
            <span className="lp-step-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="lp-step-icon">
              <LessonIcon kind={entry.kind} />
            </span>
            <span className="lp-step-copy">
              <strong>{entry.title}</strong>
              <span>
                {entry.duration} / {entry.detail}
              </span>
            </span>
            <span className="lp-step-state">
              {entry.completed ? "Done" : "Start"}
            </span>
          </button>
        ))}
      </div>

      <div className="lp-detail-actions">
        {lesson.isLocked
          ? <button
              className="lp-primary-action disabled"
              type="button"
              disabled
            >
              Finish Unit 1 first
            </button>
          : <Link
              className="lp-primary-action"
              href={getLearningDayHref(lesson.id)}
            >
              Open topic page
            </Link>}
        <div className="lp-detail-note">
          4 sub-lessons per lesson. Open the topic page for the learning flow,
          result view, and reward breakdown.
        </div>
      </div>
    </aside>
  );
}
