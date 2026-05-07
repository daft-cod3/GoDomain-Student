"use client";

import Link from "next/link";
import { getSubLessonHref } from "../../learn";
import { LessonIcon } from "../../learn/icons";

const KIND_META = {
  theory: { label: "Theory", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  board: { label: "Board drill", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  signs: { label: "Sign lab", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  quiz: { label: "Quick check", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
};

function KindPill({ kind }) {
  const meta = KIND_META[kind] ?? {
    label: kind,
    color: "#6b7280",
    bg: "rgba(107,114,128,0.1)",
  };
  return (
    <span
      className="lc-kind-pill"
      style={{ "--kc": meta.color, "--kb": meta.bg }}
    >
      {meta.label}
    </span>
  );
}

function StepDots({ total, completed }) {
  const dotIds = Array.from(
    { length: total },
    (_, index) => `step-dot-${index}`,
  );

  return (
    <div
      className="lc-dots"
      role="img"
      aria-label={`${completed} of ${total} steps done`}
    >
      {dotIds.map((dotId, i) => (
        <span
          key={dotId}
          className={`lc-dot${i < completed ? " lc-dot--done" : ""}`}
        />
      ))}
    </div>
  );
}

/* Single subtopic card inside a lesson */
export function SubtopicCard({
  step,
  index,
  total,
  isActive,
  isDone,
  onClick,
}) {
  const meta = KIND_META[step.kind] ?? KIND_META.theory;

  return (
    <button
      type="button"
      className={`lc-subtopic-card${isActive ? " lc-subtopic-card--active" : ""}${isDone ? " lc-subtopic-card--done" : ""}`}
      onClick={onClick}
      style={{ "--kc": meta.color, "--delay": `${index * 60}ms` }}
      aria-pressed={isActive}
    >
      <div className="lc-subtopic-top">
        <span className="lc-subtopic-num">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="lc-subtopic-icon">
          <LessonIcon kind={step.kind} />
        </span>
        <KindPill kind={step.kind} />
        {isDone && (
          <span className="lc-subtopic-check" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8.5l3.5 3.5L13 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
      <div className="lc-subtopic-title">{step.title}</div>
      <div className="lc-subtopic-meta">
        <span>⏱ {step.duration}</span>
        <span>
          {index + 1} / {total}
        </span>
      </div>
    </button>
  );
}

/* Full lesson card shown on the subLearn index page */
export default function LearnCard({ lesson, currentStepId }) {
  const completedCount = lesson.lessons.filter((s) => s.completed).length;
  const total = lesson.lessons.length;
  const progress = total ? Math.round((completedCount / total) * 100) : 0;
  const nextStep =
    lesson.lessons.find((s) => !s.completed) ?? lesson.lessons[0];
  const activeStepId = currentStepId ?? nextStep?.id;

  return (
    <article className="lc-card">
      {/* Card header */}
      <div className="lc-card-head">
        <div className="lc-card-meta">
          <span className="lc-card-unit">{lesson.unitLabel}</span>
          <span className="lc-card-label">{lesson.label}</span>
        </div>
        <div className="lc-card-progress-ring">
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="18" className="lc-ring-track" />
            <circle
              cx="22"
              cy="22"
              r="18"
              className="lc-ring-fill"
              strokeDasharray={`${(progress / 100) * 113} 113`}
              strokeDashoffset="28"
            />
            <text x="22" y="26" textAnchor="middle" className="lc-ring-text">
              {progress}%
            </text>
          </svg>
        </div>
      </div>

      <h3 className="lc-card-title">{lesson.title}</h3>
      <p className="lc-card-subtitle">{lesson.subtitle}</p>

      {/* Step dots */}
      <StepDots total={total} completed={completedCount} />

      {/* Subtopic list */}
      <div className="lc-steps">
        {lesson.lessons.map((step, i) => (
          <Link
            key={step.id}
            href={getSubLessonHref(lesson.id, step.id)}
            className={`lc-step-row${step.id === activeStepId ? " lc-step-row--active" : ""}${step.completed ? " lc-step-row--done" : ""}`}
            style={{ "--delay": `${i * 50}ms` }}
          >
            <span className="lc-step-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="lc-step-icon">
              <LessonIcon kind={step.kind} />
            </span>
            <span className="lc-step-title">{step.title}</span>
            <KindPill kind={step.kind} />
            {step.completed
              ? <span className="lc-step-done">Done</span>
              : step.id === activeStepId
                ? <span className="lc-step-next">Start</span>
                : null}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={getSubLessonHref(lesson.id, nextStep?.id ?? lesson.lessons[0].id)}
        className="lc-card-cta"
      >
        {progress === 100
          ? "Review lesson"
          : progress > 0
            ? "Continue"
            : "Start lesson"}
      </Link>
    </article>
  );
}
