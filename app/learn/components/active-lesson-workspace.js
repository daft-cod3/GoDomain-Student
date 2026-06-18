"use client";

import { useEffect, useMemo, useState } from "react";
import { LessonIcon } from "../icons";
import { LEARNING_PROGRESS_KEY } from "../progress-store";

function readCompletedStepIds(lessonId) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const storedLesson = payload.lessons?.find((l) => l.id === lessonId);
    return new Set(storedLesson?.completedStepIds ?? []);
  } catch {
    return new Set();
  }
}

function writeCompletedStepIds(lessonId, completedStepIds) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const lessons = Array.isArray(payload.lessons) ? payload.lessons : [];
    const nextLesson = {
      id: lessonId,
      completedStepIds: Array.from(completedStepIds),
    };
    const exists = lessons.some((l) => l.id === lessonId);
    const nextLessons = exists
      ? lessons.map((l) => (l.id === lessonId ? nextLesson : l))
      : [...lessons, nextLesson];
    window.localStorage.setItem(
      LEARNING_PROGRESS_KEY,
      JSON.stringify({ ...payload, lessons: nextLessons }),
    );
  } catch {}
}

function KindBadge({ kind }) {
  const map = {
    theory: { label: "Theory", color: "#3b82f6" },
    board: { label: "Board drill", color: "#10b981" },
    signs: { label: "Sign lab", color: "#f59e0b" },
    quiz: { label: "Quick check", color: "#8b5cf6" },
  };
  const meta = map[kind] ?? { label: kind, color: "#6b7280" };
  return (
    <span className="alw-kind-badge" style={{ "--badge-color": meta.color }}>
      {meta.label}
    </span>
  );
}

function ProgressRing({ pct }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg className="alw-ring" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r={r} className="alw-ring-track" />
      <circle
        cx="36"
        cy="36"
        r={r}
        className="alw-ring-fill"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ * 0.25}
      />
      <text x="36" y="40" textAnchor="middle" className="alw-ring-text">
        {pct}%
      </text>
    </svg>
  );
}

function RoadOptionShowcase({ options }) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!options.length) return null;

  return (
    <div className="alw-ros" aria-label="Model town board road options">
      <div className="alw-ros-head">
        <span className="alw-ros-kicker">Animated route set</span>
        <h4 className="alw-ros-title">Model town board road options</h4>
        <span className="alw-ros-count">{options.length} illustrations</span>
      </div>

      <div className="alw-ros-grid">
        {options.map((option, index) => (
          <section
            key={option.id}
            className={`alw-ros-card${hoveredId === option.id ? " alw-ros-card--hovered" : ""}`}
            onMouseEnter={() => setHoveredId(option.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(option.id)}
            onBlur={() => setHoveredId(null)}
            tabIndex={0}
          >
            <div className="alw-ros-card-label-row">
              <span className="alw-ros-card-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="alw-ros-card-label">{option.label}</span>
            </div>

            <div className="alw-ros-card-media">
              <img
                src={option.image}
                alt={`${option.label} model town board route animation`}
                loading={index < 4 ? "eager" : "lazy"}
                className="alw-ros-card-gif"
              />
              <div className="alw-ros-card-media-shine" aria-hidden="true" />
            </div>

            <p className="alw-ros-card-text">{option.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function ActiveLessonWorkspace({ lesson }) {
  const initialCompletedIds = useMemo(
    () => new Set(lesson.lessons.filter((e) => e.completed).map((e) => e.id)),
    [lesson.lessons],
  );
  const [selectedStepId, setSelectedStepId] = useState(lesson.lessons[0]?.id);
  const [completedIds, setCompletedIds] = useState(initialCompletedIds);
  const [justCompleted, setJustCompleted] = useState(null);
  const [optimisticStepId, setOptimisticStepId] = useState(null);

  useEffect(() => {
    const stored = readCompletedStepIds(lesson.id);
    setCompletedIds(stored.size ? stored : initialCompletedIds);
  }, [initialCompletedIds, lesson.id]);

  const selectedIndex = Math.max(
    0,
    lesson.lessons.findIndex((e) => e.id === selectedStepId),
  );
  const selectedStep = lesson.lessons[selectedIndex] ?? lesson.lessons[0];
  const optimisticStep = lesson.lessons.find(
    (entry) => entry.id === justCompleted,
  );
  const completedCount = completedIds.size;
  const total = lesson.lessons.length;
  const progress = total ? Math.round((completedCount / total) * 100) : 0;
  const isSelectedComplete = selectedStep
    ? completedIds.has(selectedStep.id)
    : false;

  // Find the matching topic content from overviewTopics
  const topicContent = lesson.overviewTopics?.[selectedIndex] ?? null;

  function completeSelectedStep() {
    if (!selectedStep || completedIds.has(selectedStep.id)) return;
    setOptimisticStepId(selectedStep.id);
    setJustCompleted(selectedStep.id);
    setTimeout(() => {
      setJustCompleted(null);
      setOptimisticStepId(null);
    }, 1200);
    setCompletedIds((current) => {
      const next = new Set(current);
      next.add(selectedStep.id);
      writeCompletedStepIds(lesson.id, next);
      const nextStep =
        lesson.lessons.find((e) => !next.has(e.id)) ?? selectedStep;
      setSelectedStepId(nextStep.id);
      return next;
    });
  }

  function goToStep(id) {
    setSelectedStepId(id);
  }

  function goPrev() {
    if (selectedIndex > 0)
      setSelectedStepId(lesson.lessons[selectedIndex - 1].id);
  }

  function goNext() {
    if (selectedIndex < total - 1)
      setSelectedStepId(lesson.lessons[selectedIndex + 1].id);
  }

  return (
    <section className="alw-shell">
      {/* Header */}
      <div className="alw-header">
        <div className="alw-header-left">
          <span className="alw-eyebrow">Active lesson workspace</span>
          <h2 className="alw-title">{lesson.title}</h2>
          <p className="alw-subtitle">{lesson.subtitle}</p>
        </div>
        <div className="alw-header-right">
          <ProgressRing pct={progress} />
          <div className="alw-score-meta">
            <strong>
              {completedCount}/{total}
            </strong>
            <span>subtopics done</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="alw-progress-bar" aria-hidden="true">
        <div className="alw-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Subtopic tab strip */}
      <div
        className="alw-tab-strip"
        role="tablist"
        aria-label="Lesson subtopics"
      >
        {lesson.lessons.map((entry, index) => {
          const isActive = entry.id === selectedStep?.id;
          const isDone = completedIds.has(entry.id);
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`alw-tab${isActive ? " alw-tab--active" : ""}${isDone ? " alw-tab--done" : ""}${optimisticStepId === entry.id ? " alw-tab--optimistic" : ""}`}
              onClick={() => goToStep(entry.id)}
              title={entry.title}
            >
              <span className="alw-tab-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="alw-tab-icon">
                <LessonIcon kind={entry.kind} />
              </span>
              <span className="alw-tab-label">{entry.title}</span>
              {isDone && (
                <span className="alw-tab-check" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8.5l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main panel */}
      {selectedStep && (
        <div className="alw-panel">
          {/* Panel header */}
          <div className="alw-panel-head">
            <div className="alw-panel-icon">
              <LessonIcon kind={selectedStep.kind} />
            </div>
            <div className="alw-panel-meta">
              <KindBadge kind={selectedStep.kind} />
              <span className="alw-panel-counter">
                Subtopic {selectedIndex + 1} of {total}
              </span>
              <span className="alw-panel-duration">
                ⏱ {selectedStep.duration}
              </span>
            </div>
          </div>

          <h3 className="alw-panel-title">{selectedStep.title}</h3>
          <p className="alw-panel-detail">{selectedStep.detail}</p>

          {/* Topic content from overviewTopics */}
          {topicContent && (
            <div className="alw-topic-content">
              <div className="alw-topic-title">{topicContent.title}</div>
              <ul className="alw-topic-points">
                {topicContent.points.map((point) => (
                  <li key={point} className="alw-topic-point">
                    <span className="alw-topic-bullet" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.roadOptionIllustrations?.length
            ? <RoadOptionShowcase options={lesson.roadOptionIllustrations} />
            : null}

          {/* Actions */}
          <div className="alw-actions">
            <div className="alw-nav-btns">
              <button
                type="button"
                className="alw-nav-btn"
                onClick={goPrev}
                disabled={selectedIndex === 0}
                aria-label="Previous subtopic"
              >
                ← Prev
              </button>
              <button
                type="button"
                className="alw-nav-btn"
                onClick={goNext}
                disabled={selectedIndex === total - 1}
                aria-label="Next subtopic"
              >
                Next →
              </button>
            </div>
            <button
              type="button"
              className={`alw-complete-btn${isSelectedComplete ? " alw-complete-btn--done" : ""}${justCompleted === selectedStep.id ? " alw-complete-btn--flash" : ""}`}
              onClick={completeSelectedStep}
              disabled={isSelectedComplete}
            >
              {isSelectedComplete
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
                : "Mark complete"}
            </button>
          </div>
          {optimisticStep && (
            <output className="alw-optimistic-status" aria-live="polite">
              {optimisticStep.title} saved
            </output>
          )}
        </div>
      )}
    </section>
  );
}
