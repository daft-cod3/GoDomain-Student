"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  getLearningDay,
  getLearningDayHref,
  getSubLessonHref,
  learningDays,
} from "../../../learn";
import { JourneyIcon, LessonIcon } from "../../../learn/icons";
import { LEARNING_PROGRESS_KEY } from "../../../learn/progress-store";
import TwoDModel from "../../components/2dmodel";
import ThreeDModel from "../../components/3dmodel";
import { SubtopicCard } from "../../components/learnCard";

/* ── localStorage helpers ── */
function readCompletedIds(lessonId) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const found = payload.lessons?.find((l) => l.id === lessonId);
    return new Set(found?.completedStepIds ?? []);
  } catch {
    return new Set();
  }
}

function writeCompletedIds(lessonId, ids) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const lessons = Array.isArray(payload.lessons) ? payload.lessons : [];
    const entry = { id: lessonId, completedStepIds: Array.from(ids) };
    const exists = lessons.some((l) => l.id === lessonId);
    window.localStorage.setItem(
      LEARNING_PROGRESS_KEY,
      JSON.stringify({
        ...payload,
        lessons: exists
          ? lessons.map((l) => (l.id === lessonId ? entry : l))
          : [...lessons, entry],
      }),
    );
  } catch {}
}

/* ── Progress ring ── */
function ProgressRing({ pct, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle cx={size / 2} cy={size / 2} r={r} className="sl-ring-track" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className="sl-ring-fill"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeDashoffset={circ * 0.25}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        className="sl-ring-text"
      >
        {pct}%
      </text>
    </svg>
  );
}

/* ── Star rating ── */
function Stars({ earned }) {
  return (
    <div className="sl-stars" role="img" aria-label={`${earned} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 22 22"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            d="M11 2.5l2.6 5.5 6 .9-4.3 4.2 1 6L11 16.2l-5.3 2.9 1-6L2.4 8.9l6-.9z"
            fill={i < earned ? "#fbbf24" : "none"}
            stroke={i < earned ? "#f59e0b" : "#9ca3af"}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}

/* ── Topic content panel ── */
function TopicPanel({ topic, step }) {
  if (!topic) {
    return (
      <div className="sl-topic-panel">
        <p className="sl-topic-detail">{step.detail}</p>
      </div>
    );
  }
  return (
    <div className="sl-topic-panel">
      <div className="sl-topic-heading">{topic.title}</div>
      <p className="sl-topic-detail">{step.detail}</p>
      <ul className="sl-topic-points">
        {topic.points.map((pt) => (
          <li key={pt} className="sl-topic-point">
            <span className="sl-topic-bullet" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main page ── */
export default function SubLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { lessonId, stepId } = params;

  const lesson = useMemo(() => getLearningDay(lessonId), [lessonId]);
  const stepIndex = useMemo(
    () => lesson?.lessons.findIndex((s) => s.id === stepId) ?? 0,
    [lesson, stepId],
  );
  const step = lesson?.lessons[stepIndex] ?? null;

  const [completedIds, setCompletedIds] = useState(() => new Set());
  const [viewMode, setViewMode] = useState("2d"); // "2d" | "3d" | "notes"
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (!lesson) return;
    setCompletedIds(readCompletedIds(lesson.id));
  }, [lesson]);

  if (!lesson || !step) {
    return (
      <main className="sl-page-root">
        <div className="sl-not-found">
          <h2>Lesson not found</h2>
          <Link href="/subLearn">Back to library</Link>
        </div>
      </main>
    );
  }

  const total = lesson.lessons.length;
  const completedCount = completedIds.size;
  const progress = total ? Math.round((completedCount / total) * 100) : 0;
  const isDone = completedIds.has(step.id);
  const starRating =
    completedCount === 0
      ? 0
      : Math.min(3, Math.ceil((completedCount / total) * 3));

  const prevStep = stepIndex > 0 ? lesson.lessons[stepIndex - 1] : null;
  const nextStep = stepIndex < total - 1 ? lesson.lessons[stepIndex + 1] : null;

  // Find matching topic from overviewTopics
  const topic = lesson.overviewTopics?.[stepIndex] ?? null;

  // Sibling lessons for the breadcrumb strip
  const lessonIndex = learningDays.findIndex((l) => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? learningDays[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < learningDays.length - 1
      ? learningDays[lessonIndex + 1]
      : null;

  function markComplete() {
    if (isDone) return;
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 1400);
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(step.id);
      writeCompletedIds(lesson.id, next);
      return next;
    });
  }

  function goToStep(id) {
    router.push(getSubLessonHref(lesson.id, id));
  }

  return (
    <main className="sl-page-root">
      {/* ── Breadcrumb ── */}
      <nav className="sl-breadcrumb" aria-label="Breadcrumb">
        <Link href="/content" className="sl-breadcrumb-link">
          Learning path
        </Link>
        <span className="sl-breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <Link href="/subLearn" className="sl-breadcrumb-link">
          Sublesson library
        </Link>
        <span className="sl-breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <Link
          href={getLearningDayHref(lesson.id)}
          className="sl-breadcrumb-link"
        >
          {lesson.label}
        </Link>
        <span className="sl-breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <span className="sl-breadcrumb-current">{step.title}</span>
      </nav>

      {/* ── Hero ── */}
      <div className="sl-hero">
        <div className="sl-hero-left">
          <div className="sl-hero-pills">
            <span className="sl-hero-unit-pill">{lesson.unitLabel}</span>
            <span className="sl-hero-lesson-pill">{lesson.label}</span>
            <span
              className={`sl-hero-kind-pill sl-hero-kind-pill--${step.kind}`}
            >
              {step.kind}
            </span>
          </div>
          <h1 className="sl-hero-title">{step.title}</h1>
          <p className="sl-hero-subtitle">{step.detail}</p>

          <div className="sl-hero-meta">
            <span className="sl-hero-duration">⏱ {step.duration}</span>
            <Stars earned={starRating} />
          </div>

          <div className="sl-hero-actions">
            {prevLesson && (
              <Link
                href={getSubLessonHref(prevLesson.id, prevLesson.lessons[0].id)}
                className="sl-hero-btn sl-hero-btn--secondary"
              >
                ← {prevLesson.label}
              </Link>
            )}
            {nextLesson && (
              <Link
                href={getSubLessonHref(nextLesson.id, nextLesson.lessons[0].id)}
                className="sl-hero-btn sl-hero-btn--secondary"
              >
                {nextLesson.label} →
              </Link>
            )}
          </div>
        </div>

        <div className="sl-hero-right">
          <div className="sl-hero-progress">
            <ProgressRing pct={progress} size={72} />
            <div className="sl-hero-progress-meta">
              <strong>
                {completedCount}/{total}
              </strong>
              <span>subtopics</span>
            </div>
          </div>
          <div className="sl-hero-icon">
            <JourneyIcon name={lesson.icon} />
          </div>
        </div>
      </div>

      {/* ── Subtopic strip ── */}
      <div className="sl-subtopic-strip">
        {lesson.lessons.map((s, i) => (
          <SubtopicCard
            key={s.id}
            step={s}
            index={i}
            total={total}
            lessonId={lesson.id}
            isActive={s.id === step.id}
            isDone={completedIds.has(s.id)}
            onClick={() => goToStep(s.id)}
          />
        ))}
      </div>

      {/* ── Main content grid ── */}
      <div className="sl-content-grid">
        {/* Left: models + topic content */}
        <div className="sl-content-main">
          {/* View mode toggle */}
          <div className="sl-view-toggle" role="tablist" aria-label="View mode">
            {["2d", "3d", "notes"].map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={viewMode === mode}
                className={`sl-view-btn${viewMode === mode ? " sl-view-btn--active" : ""}`}
                onClick={() => setViewMode(mode)}
              >
                {mode === "2d"
                  ? "2D Diagram"
                  : mode === "3d"
                    ? "3D Model"
                    : "Notes"}
              </button>
            ))}
          </div>

          {/* 2D model */}
          {viewMode === "2d" && (
            <div className="sl-model-panel sl-model-panel--2d">
              <TwoDModel kind={step.kind} title={step.title} />
            </div>
          )}

          {/* 3D model */}
          {viewMode === "3d" && (
            <div className="sl-model-panel sl-model-panel--3d">
              <ThreeDModel kind={step.kind} title={step.title} />
            </div>
          )}

          {/* Notes / topic content */}
          {viewMode === "notes" && (
            <div className="sl-model-panel sl-model-panel--notes">
              <TopicPanel topic={topic} step={step} />
            </div>
          )}

          {/* Always show topic content below models */}
          {viewMode !== "notes" && (
            <div className="sl-topic-below">
              <TopicPanel topic={topic} step={step} />
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <aside className="sl-content-aside">
          {/* Complete action */}
          <div className="sl-aside-card sl-aside-card--action">
            <div className="sl-aside-card-head">
              <span className="sl-aside-kicker">
                Subtopic {stepIndex + 1} of {total}
              </span>
              <h3 className="sl-aside-title">{step.title}</h3>
            </div>
            <button
              type="button"
              className={`sl-complete-btn${isDone ? " sl-complete-btn--done" : ""}${justCompleted ? " sl-complete-btn--flash" : ""}`}
              onClick={markComplete}
              disabled={isDone}
            >
              {isDone
                ? <>
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M4 10.5l4.5 4.5L16 6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Completed
                  </>
                : "Mark subtopic complete"}
            </button>

            {/* Prev / Next step */}
            <div className="sl-step-nav">
              <button
                type="button"
                className="sl-step-nav-btn"
                disabled={!prevStep}
                onClick={() => prevStep && goToStep(prevStep.id)}
              >
                ← Previous
              </button>
              <button
                type="button"
                className="sl-step-nav-btn sl-step-nav-btn--next"
                disabled={!nextStep}
                onClick={() => nextStep && goToStep(nextStep.id)}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Lesson progress */}
          <div className="sl-aside-card">
            <span className="sl-aside-kicker">Lesson progress</span>
            <div className="sl-aside-progress-bar">
              <div
                className="sl-aside-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="sl-aside-progress-meta">
              <span>{completedCount} done</span>
              <span>{total - completedCount} left</span>
            </div>
            <Stars earned={starRating} />
          </div>

          {/* All subtopics list */}
          <div className="sl-aside-card">
            <span className="sl-aside-kicker">All subtopics</span>
            <div className="sl-aside-steps">
              {lesson.lessons.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`sl-aside-step${s.id === step.id ? " sl-aside-step--active" : ""}${completedIds.has(s.id) ? " sl-aside-step--done" : ""}`}
                  onClick={() => goToStep(s.id)}
                >
                  <span className="sl-aside-step-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="sl-aside-step-icon">
                    <LessonIcon kind={s.kind} />
                  </span>
                  <span className="sl-aside-step-title">{s.title}</span>
                  {completedIds.has(s.id) && (
                    <span className="sl-aside-step-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="sl-aside-card">
            <span className="sl-aside-kicker">Quick links</span>
            <div className="sl-aside-links">
              <Link
                href={getLearningDayHref(lesson.id)}
                className="sl-aside-link"
              >
                Full lesson page
              </Link>
              <Link href="/content" className="sl-aside-link">
                Learning path
              </Link>
              <Link href="/live" className="sl-aside-link">
                Live classroom
              </Link>
              <Link href="/messages" className="sl-aside-link">
                Message teacher
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
