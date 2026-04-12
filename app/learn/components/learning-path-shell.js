"use client";

import Link from "next/link";
import { Fragment, useEffect, useId, useMemo, useState } from "react";
import { studentProfile } from "../../data/student-profile";
import { getLearningDayHref, learningOverview, learningUnits } from "..";
import { BottomNavIcon, LearnMascot, RewardChest } from "../icons";
import {
  deriveLearningProgress,
  hydrateLearningProgress,
  persistLearningProgress,
} from "../progress-store";
import LessonCard from "./lesson-card";
import LessonDetail from "./lesson-detail";
import UnitStrip from "./unit-strip";

/* legacy guide retained for reference
const _GUIDE_STEPS = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <rect x="4" y="6" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 12h12M10 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Pick a unit",
    desc: "Choose any unit from the strip above. All units are open — start anywhere.",
    color: "#267cff",
    bg: "rgba(38,124,255,0.1)",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 10v6l4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Open a lesson circle",
    desc: "Tap any circle on the path. Each circle is one lesson with 4 steps inside.",
    color: "#44c06b",
    bg: "rgba(68,192,107,0.1)",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M8 16l5 5 11-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Complete the steps",
    desc: "Work through each step in order. Tick them off to track your progress.",
    color: "#f59f00",
    bg: "rgba(245,159,0,0.1)",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M16 4l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 19l-6 4.7 2.5-7.5L6 11.5h7.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    title: "Earn rewards",
    desc: "Finish all circles in a unit to claim the chest and unlock bonus gems.",
    color: "#e05c7a",
    bg: "rgba(224,92,122,0.1)",
  },
];

function _LearningGuide({
  overallProgress,
  totalLessons,
  totalCompletedLessons,
  units,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const unitsComplete = units.filter((u) => u.isComplete).length;

  return (
    <div className="lg-shell">
      <div data-legacy="top-row" />
      <div className="lg-top">
        <div className="lg-top-copy">
          <span className="lg-eyebrow">How it works</span>
          <h2 className="lg-title">Your learning route, step by step</h2>
          <p className="lg-subtitle">
            Follow the four-step cycle for every lesson. Each completed circle
            builds mastery and unlocks the next reward.
          </p>
        </div>
        <div className="lg-stats">
          <div className="lg-stat">
            <strong>{overallProgress}%</strong>
            <span>Overall progress</span>
            <div className="lg-stat-bar">
              <span style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
          <div className="lg-stat">
            <strong>{totalCompletedLessons}/{totalLessons}</strong>
            <span>Lessons done</span>
            <div className="lg-stat-bar lg-stat-bar--green">
              <span style={{ width: `${Math.round((totalCompletedLessons / Math.max(totalLessons, 1)) * 100)}%` }} />
            </div>
          </div>
          <div className="lg-stat">
            <strong>{unitsComplete}/{units.length}</strong>
            <span>Units cleared</span>
            <div className="lg-stat-bar lg-stat-bar--gold">
              <span style={{ width: `${Math.round((unitsComplete / Math.max(units.length, 1)) * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div data-legacy="step-cards" />
      <div className="lg-steps">
        {_GUIDE_STEPS.map((step, i) => (
          <button
            key={step.num}
            type="button"
            className={`lg-step${activeStep === i ? " active" : ""}`}
            style={{ "--step-color": step.color, "--step-bg": step.bg }}
            onClick={() => setActiveStep(i)}
            aria-pressed={activeStep === i}
          >
            <div className="lg-step-num">{step.num}</div>
            <div className="lg-step-icon">{step.icon}</div>
            <div className="lg-step-body">
              <strong className="lg-step-title">{step.title}</strong>
              <p className="lg-step-desc">{step.desc}</p>
            </div>
            <div className="lg-step-arrow">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div data-legacy="detail-panel" />
      <div
        className="lg-detail"
        style={{ "--step-color": _GUIDE_STEPS[activeStep].color, "--step-bg": _GUIDE_STEPS[activeStep].bg }}
      >
        <div className="lg-detail-icon">{_GUIDE_STEPS[activeStep].icon}</div>
        <div className="lg-detail-copy">
          <span className="lg-detail-num">Step {_GUIDE_STEPS[activeStep].num}</span>
          <strong className="lg-detail-title">{_GUIDE_STEPS[activeStep].title}</strong>
          <p className="lg-detail-desc">{_GUIDE_STEPS[activeStep].desc}</p>
        </div>
        <div className="lg-detail-dots">
          {_GUIDE_STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`lg-dot${activeStep === i ? " active" : ""}`}
              onClick={() => setActiveStep(i)}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

*/
const HERO_GUIDE_STEPS = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <title>Choose a unit</title>
        <rect
          x="4"
          y="6"
          width="24"
          height="20"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10 12h12M10 17h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Choose a unit",
    desc: "Start with the unit card that matches the skill you want to repair or strengthen.",
    chips: ["Read the summary", "Check unit progress", "Keep one live focus"],
    color: "#267cff",
    bg: "rgba(38,124,255,0.1)",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <title>Open a lesson circle</title>
        <circle
          cx="16"
          cy="16"
          r="11"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M16 10v6l4 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Open a lesson circle",
    desc: "Use the path board to enter a lesson. Each circle holds one lesson with four guided steps.",
    chips: ["Follow the live lane", "Use focus mode", "Jump to weak spots"],
    color: "#44c06b",
    bg: "rgba(68,192,107,0.1)",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <title>Complete the steps</title>
        <path
          d="M8 16l5 5 11-10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Complete the steps",
    desc: "Finish the four lesson steps in order so the progress bar and review route keep moving forward.",
    chips: ["Theory first", "Board drill next", "Finish the quick check"],
    color: "#f59f00",
    bg: "rgba(245,159,0,0.1)",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <title>Clear the unit</title>
        <path
          d="M16 4l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 19l-6 4.7 2.5-7.5L6 11.5h7.5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Clear the unit",
    desc: "When all lesson circles in a unit are complete, the reward chest is ready and the unit becomes a clean revision lane.",
    chips: ["Claim the chest", "Use review loops", "Move to the next unit"],
    color: "#e05c7a",
    bg: "rgba(224,92,122,0.1)",
  },
];

function LearningGuideHero({
  overallProgress,
  totalLessons,
  totalCompletedLessons,
  units,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isGuideInteracting, setIsGuideInteracting] = useState(false);
  const guideId = useId();
  const unitsComplete = units.filter(
    (unit) => unit.isComplete || unit.progress === 100,
  ).length;
  const activeGuideStep = HERO_GUIDE_STEPS[activeStep];
  const activeUnit =
    units.find((unit) => !(unit.isComplete || unit.progress === 100)) ??
    units[units.length - 1] ??
    null;
  const activeUnitLeadLesson = activeUnit
    ? getUnitLeadLesson(activeUnit)
    : null;
  const guideUnits = units.slice(0, 4);
  const flowProgress =
    HERO_GUIDE_STEPS.length > 1
      ? (activeStep / (HERO_GUIDE_STEPS.length - 1)) * 100
      : 100;
  const guideStatus = !autoRotate
    ? "Preview pinned"
    : isGuideInteracting
      ? "Autoplay paused while exploring"
      : "Autoplay on";

  useEffect(() => {
    if (!autoRotate || isGuideInteracting) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveStep(
        (currentStep) => (currentStep + 1) % HERO_GUIDE_STEPS.length,
      );
    }, 4600);

    return () => window.clearInterval(intervalId);
  }, [autoRotate, isGuideInteracting]);

  return (
    <section
      className="lg-shell"
      aria-labelledby="learning-guide-title"
      onMouseEnter={() => setIsGuideInteracting(true)}
      onMouseLeave={() => setIsGuideInteracting(false)}
      onFocusCapture={() => setIsGuideInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsGuideInteracting(false);
        }
      }}
    >
      <div className="lg-copy">
        <div className="lg-copy-head">
          <span className="lg-eyebrow">Interactive unit guide</span>
          <h2 className="lg-title" id="learning-guide-title">
            Learn the route once, then clear every unit with less friction.
          </h2>
          <p className="lg-subtitle">
            Hover or tap each stage to preview the full learning cycle. The
            infographic mirrors the page flow so learners can see how a unit
            turns from first click into a completed reward lane.
          </p>
        </div>

        <div className="lg-guide-tools">
          <span className={`lg-guide-status${autoRotate ? "" : " pinned"}`}>
            {guideStatus}
          </span>
          <button
            type="button"
            className="lg-guide-toggle"
            onClick={() => setAutoRotate((currentState) => !currentState)}
            aria-pressed={!autoRotate}
          >
            {autoRotate ? "Pause preview" : "Resume preview"}
          </button>
        </div>

        <div className="lg-stats">
          <div className="lg-stat">
            <strong>{overallProgress}%</strong>
            <span>Overall progress</span>
            <div className="lg-stat-bar">
              <span style={{ width: `${overallProgress}%` }} />
            </div>
          </div>

          <div className="lg-stat">
            <strong>
              {totalCompletedLessons}/{totalLessons}
            </strong>
            <span>Lessons done</span>
            <div className="lg-stat-bar lg-stat-bar--green">
              <span
                style={{
                  width: `${Math.round(
                    (totalCompletedLessons / Math.max(totalLessons, 1)) * 100,
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="lg-stat">
            <strong>
              {unitsComplete}/{units.length}
            </strong>
            <span>Units cleared</span>
            <div className="lg-stat-bar lg-stat-bar--gold">
              <span
                style={{
                  width: `${Math.round(
                    (unitsComplete / Math.max(units.length, 1)) * 100,
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="lg-step-rail" role="tablist" aria-label="Unit stages">
          {HERO_GUIDE_STEPS.map((step, index) => (
            <button
              key={step.num}
              type="button"
              className={`lg-step${activeStep === index ? " active" : ""}`}
              style={{ "--step-color": step.color, "--step-bg": step.bg }}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              role="tab"
              id={`${guideId}-tab-${index}`}
              aria-selected={activeStep === index}
              aria-controls={`${guideId}-panel`}
              tabIndex={activeStep === index ? 0 : -1}
            >
              <span className="lg-step-num">{step.num}</span>
              <span className="lg-step-body">
                <span className="lg-step-title">{step.title}</span>
                <span className="lg-step-desc">{step.desc}</span>
              </span>
              <span className="lg-step-icon">{step.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="lg-stage"
        style={{
          "--step-color": activeGuideStep.color,
          "--step-bg": activeGuideStep.bg,
          "--flow-progress": `${flowProgress}%`,
        }}
        id={`${guideId}-panel`}
        role="tabpanel"
        aria-labelledby={`${guideId}-tab-${activeStep}`}
      >
        <div className="lg-visual-head">
          <span className="lg-visual-kicker">Unit flow</span>
          <span className="lg-visual-progress">
            Stage {activeStep + 1} of {HERO_GUIDE_STEPS.length}
          </span>
        </div>

        <div className="lg-flow-map">
          {HERO_GUIDE_STEPS.map((step, index) => (
            <button
              key={step.num}
              type="button"
              className={`lg-flow-node${activeStep === index ? " active" : ""}${activeStep > index ? " done" : ""}`}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              aria-pressed={activeStep === index}
            >
              <span className="lg-flow-node-ring">{step.icon}</span>
              <span className="lg-flow-node-copy">
                <strong className="lg-flow-node-label">{step.title}</strong>
                <span className="lg-flow-node-num">{step.num}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="lg-detail-card">
          <div className="lg-detail-icon">{activeGuideStep.icon}</div>

          <div className="lg-detail-copy">
            <span className="lg-detail-num">Step {activeGuideStep.num}</span>
            <strong className="lg-detail-title">{activeGuideStep.title}</strong>
            <p className="lg-detail-desc">{activeGuideStep.desc}</p>
          </div>

          <div className="lg-detail-metrics">
            <div className="lg-detail-metric">
              <span>Live unit</span>
              <strong>{activeUnit?.label ?? "All units cleared"}</strong>
            </div>

            <div className="lg-detail-metric">
              <span>Cleared units</span>
              <strong>
                {unitsComplete}/{units.length}
              </strong>
            </div>
          </div>
        </div>

        <div className="lg-detail-tags">
          {activeGuideStep.chips.map((chip) => (
            <span key={chip} className="lg-tag">
              {chip}
            </span>
          ))}
        </div>

        <div className="lg-detail-actions">
          {activeUnitLeadLesson
            ? <Link
                className="lg-detail-action"
                href={getLearningDayHref(activeUnitLeadLesson.id)}
              >
                Open live lesson
              </Link>
            : <span className="lg-guide-status pinned">All units cleared</span>}
          <span className="lg-detail-hint">
            Hover, tap, or let the guide cycle through the unit flow.
          </span>
        </div>

        <div className="lg-unit-grid">
          {guideUnits.map((unit) => {
            const isComplete = unit.isComplete || unit.progress === 100;
            const isCurrent = activeUnit?.id === unit.id;
            const status = isComplete
              ? "Cleared"
              : isCurrent
                ? "Live now"
                : unit.progress > 0
                  ? "In progress"
                  : "Queued";

            return (
              <article
                key={unit.id}
                className={`lg-unit-card${isCurrent ? " current" : ""}${isComplete ? " complete" : ""}`}
              >
                <div className="lg-unit-card-top">
                  <span>{unit.label}</span>
                  <span className="lg-unit-card-status">{status}</span>
                </div>

                <strong className="lg-unit-card-title">{unit.title}</strong>
                <p className="lg-unit-card-meta">{unit.summary}</p>

                <div className="lg-unit-card-track" aria-hidden="true">
                  <span style={{ width: `${unit.progress}%` }} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const boardFilters = [
  { id: "all", label: "All lessons" },
  { id: "focus", label: "Continue" },
  { id: "complete", label: "Completed" },
];

const DUO_FOOTER_ITEMS = [
  { href: "/dashboard", icon: "home", label: "Home", active: true },
  { href: "#unit-reward-chest", icon: "chest", label: "Unit reward" },
  { href: "/content", icon: "dumbbell", label: "Practice" },
  { href: "/stats", icon: "profile", label: "Profile" },
  { href: "/notifications", icon: "bell", label: "Alerts" },
];

function DuoCourseBadge() {
  return (
    <span className="lp-duo-course-badge" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function DuoMenuGlyph() {
  return (
    <span className="lp-duo-menu-glyph" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function DuoHudIcon({ tone }) {
  if (tone === "fire") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10.1 2.2C12 4.4 13.4 6 13.4 8C13.4 9.4 12.8 10.6 11.8 11.4C11.8 9.4 10.8 7.8 9 6C7.1 7.5 6.1 9.2 6.1 10.9C6.1 13.5 8 15.5 10.4 15.5C12.9 15.5 14.9 13.4 14.9 10.5C14.9 7.9 13.2 5.3 10.1 2.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (tone === "shield") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2.3L15.4 4.6V9.5C15.4 13 13.2 15.8 10 17.2C6.8 15.8 4.6 13 4.6 9.5V4.6L10 2.3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.3 4.4C7.5 2.8 10.2 2.7 12.5 4C14.7 5.2 15.9 7.5 15.6 9.8C17.5 10.5 18.5 12.3 18.1 14.1C17.7 15.9 16 17.2 14.1 17.1H8.6C5.5 17.1 3 14.7 3 11.6C3 8.7 4.9 6.2 7.6 5.3L5.3 4.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DuoHudStat({ tone, label, value }) {
  return (
    <div
      className={`lp-duo-hud-stat ${tone}`}
      role="img"
      aria-label={`${label}: ${value}`}
      title={`${label}: ${value}`}
    >
      <span className="lp-duo-hud-icon">
        <DuoHudIcon tone={tone} />
      </span>
      <strong>{value}</strong>
    </div>
  );
}

function DuoFooterNav() {
  return (
    <nav className="lp-duo-footer" aria-label="Unit quick navigation">
      {DUO_FOOTER_ITEMS.map((item) => (
        <Link
          key={item.label}
          className={`lp-duo-footer-item${item.active ? " active" : ""}`}
          href={item.href}
          aria-label={item.label}
          title={item.label}
        >
          <BottomNavIcon name={item.icon} />
        </Link>
      ))}
    </nav>
  );
}

function getFirstLesson(unit) {
  return unit?.lessons[0] ?? null;
}

function getUnitLeadLesson(unit) {
  if (!unit) {
    return null;
  }

  return (
    unit.lessons.find((lesson) => !lesson.isLocked && lesson.progress < 100) ??
    unit.lessons.find((lesson) => !lesson.isLocked) ??
    getFirstLesson(unit)
  );
}

function getCurrentLesson(units) {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!lesson.isLocked && lesson.progress < 100) {
        return lesson;
      }
    }
  }

  return null;
}

function getVisibleLessons(lessons, filterId, currentLessonId) {
  if (filterId === "focus") {
    const currentMatch = lessons.find(
      (lesson) => lesson.id === currentLessonId,
    );

    return lessons.filter((lesson) => {
      if (lesson.isLocked) {
        return false;
      }

      if (lesson.id === currentMatch?.id) {
        return true;
      }

      return lesson.progress > 0 && lesson.progress < 100;
    });
  }

  if (filterId === "complete") {
    return lessons.filter((lesson) => lesson.progress === 100);
  }

  return lessons;
}

function getCompletionRun(units) {
  let completionRun = 0;

  for (const lesson of units.flatMap((unit) => unit.lessons)) {
    if (lesson.progress === 100) {
      completionRun += 1;
      continue;
    }

    break;
  }

  return completionRun;
}

function getNextOpenLesson(units, lessonId) {
  const lessons = units.flatMap((unit) => unit.lessons);
  const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId);

  for (let index = currentIndex + 1; index < lessons.length; index += 1) {
    if (!lessons[index].isLocked) {
      return lessons[index];
    }
  }

  return null;
}

function getBoardFilterNote(filterId, visibleLessons) {
  if (!visibleLessons.length) {
    return "No lessons match this view yet.";
  }

  if (filterId === "focus") {
    return "Only active lessons that can move the learner forward stay on screen.";
  }

  if (filterId === "complete") {
    return "Completed lessons stay visible for quick revision and confidence checks.";
  }

  return "The full unit stays visible so the learner can jump between open lessons without losing the route.";
}

const initialUnits = deriveLearningProgress(learningUnits);
const initialSelectedLesson =
  getCurrentLesson(initialUnits) ?? initialUnits[0]?.lessons[0] ?? null;

export default function LearningPathShell() {
  const [units, setUnits] = useState(() => initialUnits);
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [boardFilter, setBoardFilter] = useState("all");
  const [activeUnitId, setActiveUnitId] = useState(
    initialSelectedLesson?.unitId ?? initialUnits[0]?.id ?? "unit-1",
  );
  const [activeLessonId, setActiveLessonId] = useState(
    initialSelectedLesson?.id ??
      initialUnits[0]?.lessons[0]?.id ??
      "unit-1-lesson-1",
  );

  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const currentLesson = getCurrentLesson(units);
  const visibleLessons = useMemo(
    () =>
      getVisibleLessons(
        activeUnit?.lessons ?? [],
        boardFilter,
        currentLesson?.id,
      ),
    [activeUnit, boardFilter, currentLesson],
  );
  const selectedLesson =
    activeUnit?.lessons.find((lesson) => lesson.id === activeLessonId) ??
    getUnitLeadLesson(activeUnit);
  const activeLesson =
    visibleLessons.find((lesson) => lesson.id === activeLessonId) ??
    selectedLesson ??
    visibleLessons[0] ??
    getFirstLesson(activeUnit);
  const totalCompletedSubLessons = units.reduce(
    (sum, unit) => sum + unit.completedSubLessons,
    0,
  );
  const totalCompletedLessons = units.reduce(
    (sum, unit) => sum + unit.completedLessons,
    0,
  );
  const overallProgress = learningOverview.totalSubLessons
    ? Math.round(
        (totalCompletedSubLessons / learningOverview.totalSubLessons) * 100,
      )
    : 0;
  const completionRun = getCompletionRun(units);
  const nextOpenLesson = activeLesson
    ? getNextOpenLesson(units, activeLesson.id)
    : null;
  const nextStep =
    currentLesson?.lessons.find((entry) => !entry.completed) ?? null;
  const activeUnitLessonsLeft =
    activeUnit?.lessons.filter((lesson) => lesson.progress < 100).length ?? 0;
  const currentLessonStepsLeft = currentLesson
    ? currentLesson.totalSteps - currentLesson.completedSteps
    : 0;
  const boardFilterNote = getBoardFilterNote(boardFilter, visibleLessons);
  const currentVisibleIndex = visibleLessons.findIndex(
    (lesson) => lesson.id === currentLesson?.id,
  );
  const rewardInsertionIndex =
    visibleLessons.length > 2
      ? currentVisibleIndex >= 0
        ? currentVisibleIndex
        : Math.max(1, Math.floor(visibleLessons.length / 2) - 1)
      : -1;
  const mascotInsertionIndex =
    visibleLessons.length > 1
      ? Math.max(
          0,
          Math.min(
            currentVisibleIndex >= 0 ? currentVisibleIndex - 1 : 1,
            visibleLessons.length - 1,
          ),
        )
      : -1;

  useEffect(() => {
    const hydratedUnits = hydrateLearningProgress(learningUnits);
    const nextLesson =
      getCurrentLesson(hydratedUnits) ?? hydratedUnits[0]?.lessons[0] ?? null;

    setUnits(hydratedUnits);
    setActiveUnitId(nextLesson?.unitId ?? hydratedUnits[0]?.id ?? "unit-1");
    setActiveLessonId(
      nextLesson?.id ?? hydratedUnits[0]?.lessons[0]?.id ?? "unit-1-lesson-1",
    );
    setHasHydratedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    persistLearningProgress(units);
  }, [hasHydratedProgress, units]);

  useEffect(() => {
    const lessonPool = visibleLessons.length
      ? visibleLessons
      : (activeUnit?.lessons ?? []);

    if (
      lessonPool.length &&
      !lessonPool.some((lesson) => lesson.id === activeLessonId)
    ) {
      setActiveLessonId(lessonPool[0].id);
    }
  }, [activeLessonId, activeUnit, visibleLessons]);

  function handleSelectUnit(unitId) {
    const nextUnit = units.find((unit) => unit.id === unitId);

    if (!nextUnit) {
      return;
    }

    const leadLesson = getUnitLeadLesson(nextUnit);

    setActiveUnitId(unitId);
    setActiveLessonId(leadLesson?.id ?? activeLessonId);
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
      deriveLearningProgress(
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

  function handleAdvanceStep() {
    if (!activeLesson || activeLesson.isLocked) {
      return;
    }

    const pendingStep = activeLesson.lessons.find((entry) => !entry.completed);

    if (!pendingStep) {
      return;
    }

    handleToggleSubLesson(activeLesson.id, pendingStep.id);
  }

  function handleFocusOnCurrent() {
    if (!currentLesson) {
      return;
    }

    setBoardFilter("focus");
    setActiveUnitId(currentLesson.unitId);
    setActiveLessonId(currentLesson.id);
  }

  return (
    <section className="lp-shell">
      {/* ── HOW-TO INFOGRAPH HERO ── */}
      <LearningGuideHero
        overallProgress={overallProgress}
        totalLessons={learningOverview.totalLessons}
        totalCompletedLessons={totalCompletedLessons}
        units={units}
      />

      <header className="lp-hero">
        <div className="lp-hero-copy">
          <span className="lp-kicker">Learning path / progressive route</span>
          <h1 className="lp-hero-title">
            {currentLesson
              ? `${studentProfile.name.split(" ")[0]}, keep the next lesson moving.`
              : "Every lesson on the route is complete."}
          </h1>
          <p className="lp-hero-text">
            Every unit and lesson is open, while the board still keeps the next
            best action visible and turns every completed lesson into review
            material. The layout is designed to keep progress obvious without
            forcing the learner through hidden locks first.
          </p>

          <div className="lp-hero-actions">
            {currentLesson
              ? <Link
                  className="lp-hero-action"
                  href={getLearningDayHref(currentLesson.id)}
                >
                  Continue {currentLesson.label}
                </Link>
              : <Link className="lp-hero-action" href="/dashboard">
                  Review completed lessons
                </Link>}
            <button
              className={`lp-secondary-action ${boardFilter === "focus" ? "active" : ""}`}
              type="button"
              onClick={handleFocusOnCurrent}
            >
              Focus mode
            </button>
          </div>

          <div className="lp-hero-journey">
            <div className="lp-hero-chip">
              <strong>{totalCompletedLessons}</strong>
              <span>review cards unlocked</span>
            </div>
            <div className="lp-hero-chip">
              <strong>
                {learningOverview.totalLessons - totalCompletedLessons}
              </strong>
              <span>lessons still ahead</span>
            </div>
            <div className="lp-hero-chip">
              <strong>{units.filter((unit) => unit.isComplete).length}</strong>
              <span>units fully cleared</span>
            </div>
          </div>
        </div>

        <div className="lp-hero-panel">
          <div className="lp-hero-spotlight">
            <div className="lp-hero-spotlight-top">
              <span className="lp-hero-spotlight-kicker">Up next</span>
              <span className="lp-hero-spotlight-state">
                {currentLesson
                  ? `${currentLessonStepsLeft} step${currentLessonStepsLeft === 1 ? "" : "s"} left`
                  : "Path cleared"}
              </span>
            </div>

            <strong className="lp-hero-spotlight-title">
              {currentLesson?.title ?? "You have cleared the full route"}
            </strong>
            <p className="lp-hero-spotlight-text">
              {nextStep
                ? `${nextStep.title} is the fastest move right now. Finish it to keep the route flowing and push overall mastery higher.`
                : "Use completed lessons for review loops, weak-point repair, and final exam confidence."}
            </p>

            <div className="lp-hero-spotlight-progress" aria-hidden="true">
              <span style={{ width: `${currentLesson?.progress ?? 100}%` }} />
            </div>

            <div className="lp-hero-spotlight-footer">
              <span>{currentLesson?.unitLabel ?? "Full route"}</span>
              <span>
                {currentLesson
                  ? `${currentLesson.completedSteps}/4 steps complete`
                  : `${totalCompletedLessons}/${learningOverview.totalLessons} lessons mastered`}
              </span>
            </div>
          </div>

          <div className="lp-hero-metrics-grid">
            <article className="lp-hero-metric">
              <span>Overall route</span>
              <strong>{overallProgress}%</strong>
            </article>
            <article className="lp-hero-metric">
              <span>Clean run</span>
              <strong>{completionRun} lessons</strong>
            </article>
            <article className="lp-hero-metric">
              <span>Open now</span>
              <strong>
                {units.reduce(
                  (sum, unit) =>
                    sum +
                    unit.lessons.filter((lesson) => !lesson.isLocked).length,
                  0,
                )}{" "}
                lessons
              </strong>
            </article>
            <article className="lp-hero-metric">
              <span>Units open</span>
              <strong>
                {units.length}/{learningOverview.totalUnits}
              </strong>
            </article>
          </div>
        </div>
      </header>

      <UnitStrip
        activeUnitId={activeUnit?.id ?? ""}
        currentLessonId={currentLesson?.id ?? ""}
        onSelectUnit={handleSelectUnit}
        units={units}
      />

      <div className="lp-main-grid">
        <section className="lp-board">
          <h2 className="sr-only">
            {activeUnit?.title ?? "Current learning unit"}
          </h2>

          <div className="lp-board-toolbar">
            <div
              className="lp-filter-row"
              role="tablist"
              aria-label="Lesson views"
            >
              {boardFilters.map((filter) => (
                <button
                  key={filter.id}
                  className={`lp-filter-chip ${boardFilter === filter.id ? "active" : ""}`}
                  type="button"
                  onClick={() => setBoardFilter(filter.id)}
                  aria-pressed={boardFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="lp-board-caption">{boardFilterNote}</div>
          </div>

          {visibleLessons.length
            ? <div className="lp-duo-stage">
                <div className="lp-duo-header">
                  <div className="lp-duo-hud">
                    <DuoCourseBadge />
                    <DuoHudStat
                      tone="fire"
                      label="HP"
                      value={studentProfile.hp}
                    />
                    <DuoHudStat
                      tone="shield"
                      label="Unit progress"
                      value={`${activeUnit?.progress ?? 0}%`}
                    />
                    <DuoHudStat
                      tone="spark"
                      label="Coins"
                      value={studentProfile.coins}
                    />
                  </div>

                  <div className="lp-duo-unit-bar">
                    <DuoMenuGlyph />
                    <strong className="lp-duo-unit-title">
                      {activeUnit
                        ? `${activeUnit.title} ${activeUnit.number}`
                        : "Learning unit"}
                    </strong>
                  </div>
                </div>

                <div className="lp-route-scene">
                  <div className="lp-lesson-grid">
                    {visibleLessons.map((lesson, index) => (
                      <Fragment key={lesson.id}>
                        <LessonCard
                          currentLessonId={currentLesson?.id}
                          isActive={lesson.id === activeLesson?.id}
                          lesson={lesson}
                          onSelect={handleSelectLesson}
                          pathIndex={index}
                        />

                        {index === mascotInsertionIndex
                          ? <div
                              className="lp-route-guide top"
                              aria-hidden="true"
                            >
                              <LearnMascot variant="reader" />
                              <div className="mascot-stars muted">
                                <span />
                                <span />
                                <span />
                              </div>
                            </div>
                          : null}

                        {index === rewardInsertionIndex
                          ? <div
                              className="lp-route-prize"
                              id="unit-reward-chest"
                            >
                              <RewardChest
                                claimed={(activeUnit?.progress ?? 0) === 100}
                                unlocked={(activeUnit?.progress ?? 0) > 0}
                              />
                              <div className="lp-route-prize-copy">
                                <strong>
                                  {(activeUnit?.progress ?? 0) === 100
                                    ? `${activeUnit?.label} chest claimed`
                                    : "Unit chest ahead"}
                                </strong>
                                <span>
                                  {(activeUnit?.progress ?? 0) === 100
                                    ? "The route is clear. Use the completed circles for revision loops."
                                    : `${activeUnitLessonsLeft} ${activeUnitLessonsLeft === 1 ? "lesson" : "lessons"} left before the unit reward opens.`}
                                </span>
                              </div>
                            </div>
                          : null}
                      </Fragment>
                    ))}

                    <div className="lp-route-guide bottom" aria-hidden="true">
                      <LearnMascot variant="spark" />
                    </div>
                  </div>
                </div>

                <DuoFooterNav />
              </div>
            : <div className="lp-board-empty">
                <strong>No lessons in this view yet.</strong>
                <span>
                  Switch filters or continue the active lesson to bring more of
                  the route into this view.
                </span>
              </div>}
        </section>

        {activeLesson
          ? <LessonDetail
              isRecommended={activeLesson.id === currentLesson?.id}
              lesson={activeLesson}
              nextLesson={nextOpenLesson}
              onAdvanceStep={handleAdvanceStep}
            />
          : null}
      </div>
    </section>
  );
}
