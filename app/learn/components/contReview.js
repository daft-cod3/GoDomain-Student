"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLearningDayHref, learningUnits } from "..";
import { useTranslation } from "../../components/translations";
import { JourneyIcon } from "../icons";
import {
  getCompletedLessons,
  hydrateLearningProgress,
} from "../progress-store";

function getFeaturedUnit(unitSummaries) {
  return (
    unitSummaries.find((unit) => unit.progress > 0 && unit.progress < 100) ??
    unitSummaries.find((unit) => unit.progress === 100) ??
    unitSummaries[0] ??
    null
  );
}

function getLessonActivityStreak(lessons) {
  let streak = 0;

  for (const lesson of lessons) {
    if (lesson.progress > 0) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
}

function getUnitState(unit, t) {
  if (!unit) return t("contentReview.stateWaiting");
  if (unit.progress === 100) return t("contentReview.stateCleared");
  if (unit.progress > 0) return t("contentReview.stateLive");
  return t("contentReview.stateQueued");
}

function getShortLessonLabel(label, index) {
  const numberMatch = label?.match(/\d+/);
  return numberMatch ? `L${numberMatch[0]}` : `L${index + 1}`;
}

function getGraphNodes(lessons, width, height, padding) {
  if (!lessons.length) {
    return [];
  }

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  return lessons.map((lesson, index) => {
    const x =
      lessons.length === 1
        ? width / 2
        : padding + (usableWidth / (lessons.length - 1)) * index;
    const y = height - padding - (lesson.progress / 100) * usableHeight;

    return {
      id: lesson.id,
      label: getShortLessonLabel(lesson.label, index),
      progress: lesson.progress,
      x,
      y,
      isComplete: lesson.progress === 100,
      isActive: lesson.progress > 0 && lesson.progress < 100,
    };
  });
}

function buildLinePath(nodes) {
  if (!nodes.length) {
    return "";
  }

  return nodes
    .map(
      (node, index) =>
        `${index === 0 ? "M" : "L"} ${node.x.toFixed(1)} ${node.y.toFixed(1)}`,
    )
    .join(" ");
}

function buildAreaPath(nodes, height, padding) {
  if (!nodes.length) {
    return "";
  }

  const baseY = height - padding;
  const firstNode = nodes[0];
  const lastNode = nodes[nodes.length - 1];

  return `${buildLinePath(nodes)} L ${lastNode.x.toFixed(1)} ${baseY.toFixed(
    1,
  )} L ${firstNode.x.toFixed(1)} ${baseY.toFixed(1)} Z`;
}

function UnitProgressGraph({ unit }) {
  const width = 220;
  const height = 72;
  const padding = 10;
  const nodes = getGraphNodes(unit.lessons, width, height, padding);
  const linePath = buildLinePath(nodes);
  const areaPath = buildAreaPath(nodes, height, padding);
  const gradientBase = `review-unit-graph-${unit.id}`;

  return (
    <div className="review-unit-graph-shell">
      <svg
        className="review-unit-graph"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${unit.label} lesson progress graph`}
      >
        <defs>
          <linearGradient id={`${gradientBase}-line`} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#2f8bff" />
            <stop offset="100%" stopColor="#6fe51f" />
          </linearGradient>
          <linearGradient
            id={`${gradientBase}-fill`}
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2f8bff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#44c06b" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((tick) => {
          const y = height - padding - (tick / 100) * (height - padding * 2);

          return (
            <line
              key={tick}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              className="review-unit-graph-grid"
            />
          );
        })}

        {areaPath
          ? <path
              d={areaPath}
              fill={`url(#${gradientBase}-fill)`}
              className="review-unit-graph-area"
            />
          : null}

        {linePath
          ? <path
              d={linePath}
              fill="none"
              stroke={`url(#${gradientBase}-line)`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="review-unit-graph-line"
            />
          : null}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="7"
              className={`review-unit-graph-dot${
                node.isComplete ? " complete" : node.isActive ? " active" : ""
              }`}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="3.5"
              className="review-unit-graph-core"
            />
          </g>
        ))}
      </svg>

      <div className="review-unit-graph-axis" aria-hidden="true">
        {unit.lessons.map((lesson, index) => (
          <span key={lesson.id}>
            {getShortLessonLabel(lesson.label, index)}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedUnitCard({ unit, t }) {
  const state = getUnitState(unit, t);
  const completedLessons = unit.lessons.filter(
    (lesson) => lesson.progress === 100,
  ).length;
  const strongestLesson =
    [...unit.lessons].sort(
      (left, right) => right.progress - left.progress,
    )[0] ?? null;

  return (
    <article className="review-unit-row">
      <div className="review-unit-row-main">
        <div>
          <div className="review-card-kicker">{t("contentReview.currentUnit")}</div>
          <div className="review-unit-spotlight-title">
            {unit.label}: {unit.title}
          </div>
        </div>
        <div className="review-unit-badge-row">
          <span className="review-unit-chip">{state}</span>
          <span className="review-unit-chip accent">{unit.progress}%</span>
        </div>
      </div>

      <div className="review-unit-row-stats">
        <span>
          <strong>{completedLessons}/{unit.lessons.length}</strong>
          {t("contentReview.lessons")}
        </span>
        <span>
          <strong>{unit.completedSubLessons}/{unit.totalSubLessons}</strong>
          {t("contentReview.steps")}
        </span>
        <span>
          <strong>{strongestLesson?.progress ?? 0}%</strong>
          {t("contentReview.best")}
        </span>
      </div>

      <div className="review-unit-row-graph">
        <UnitProgressGraph unit={unit} />
      </div>

      <div className="review-unit-row-action">
        {unit.nextLesson
          ? <Link
              className="review-unit-action"
              href={getLearningDayHref(unit.nextLesson.id)}
            >
              {t("contentReview.open")} {unit.nextLesson.label}
            </Link>
          : <strong>{t("contentReview.revisionReady")}</strong>}
      </div>
    </article>
  );
}

function loadReviewData() {
  const hydratedUnits = hydrateLearningProgress(learningUnits);
  const completedLessons = getCompletedLessons(hydratedUnits).sort(
    (left, right) => right.index - left.index,
  );
  const activeLessons = hydratedUnits
    .flatMap((unit) => unit.lessons)
    .filter((lesson) => lesson.progress > 0 && lesson.progress < 100)
    .sort(
      (left, right) =>
        right.progress - left.progress || left.index - right.index,
    );
  const unitSummaries = hydratedUnits.map((unit) => {
    const coveredLessons = unit.lessons.filter((lesson) => lesson.progress > 0);
    const score = unit.lessons.length
      ? Math.round(
          unit.lessons.reduce((sum, lesson) => sum + lesson.progress, 0) /
            unit.lessons.length,
        )
      : 0;

    return {
      ...unit,
      score,
      coveredLessons,
      coveredTopics: coveredLessons.map((lesson) => lesson.title),
      nextLesson: unit.lessons.find((lesson) => lesson.progress < 100) ?? null,
    };
  });
  const averageScore = unitSummaries.length
    ? Math.round(
        unitSummaries.reduce((sum, unit) => sum + unit.score, 0) /
          unitSummaries.length,
      )
    : 0;
  const totalTopicsCovered = unitSummaries.reduce(
    (sum, unit) => sum + unit.coveredLessons.length,
    0,
  );
  const featuredUnit = getFeaturedUnit(unitSummaries);
  const featuredUnitStreak = featuredUnit
    ? getLessonActivityStreak(featuredUnit.lessons)
    : 0;

  return {
    averageScore,
    completedLessons,
    activeLessons,
    featuredUnit,
    featuredUnitStreak,
    totalTopicsCovered,
    unitSummaries,
  };
}

export default function ContentReview() {
  const t = useTranslation();
  const [reviewData, setReviewData] = useState({
    averageScore: 0,
    completedLessons: [],
    activeLessons: [],
    featuredUnit: null,
    featuredUnitStreak: 0,
    totalTopicsCovered: 0,
    unitSummaries: [],
  });

  useEffect(() => {
    setReviewData(loadReviewData());
  }, []);

  const { averageScore, completedLessons, featuredUnit, totalTopicsCovered } =
    reviewData;

  const reviewResources = [
    {
      id: "notes",
      label: t("contentReview.resourceNotes"),
      action: t("contentReview.resourceNotesAction"),
      tone: "blue",
      href: (lesson) => getLearningDayHref(lesson.id),
      summary: (lesson) => `${t("contentReview.resourceNotesSummary")} ${lesson.title}.`,
    },
    {
      id: "video",
      label: t("contentReview.resourceVideo"),
      action: t("contentReview.resourceVideoAction"),
      tone: "green",
      href: () => "/live",
      summary: (lesson) => `${t("contentReview.resourceVideoSummary")} ${lesson.label}.`,
    },
    {
      id: "images",
      label: t("contentReview.resourceImages"),
      action: t("contentReview.resourceImagesAction"),
      tone: "mix",
      href: (lesson) => getLearningDayHref(lesson.id),
      summary: () => t("contentReview.resourceImagesSummary"),
    },
    {
      id: "resources",
      label: t("contentReview.resourceResources"),
      action: t("contentReview.resourceResourcesAction"),
      tone: "gold",
      href: () => "/content",
      summary: () => t("contentReview.resourceResourcesSummary"),
    },
  ];

  return (
    <section className="dash-section review-section">
      <div className="dash-section-head">
        <div>
          <div className="dash-section-title">{t("contentReview.title")}</div>
          <div className="dash-section-subtitle">
            {t("contentReview.subtitle")}
          </div>
        </div>
        <Link className="dash-link" href="/content">
          {t("contentReview.openPath")}
        </Link>
      </div>

      <div className="review-overview-bar compact">
        <article className="review-overview-stat">
          <span>{t("contentReview.statCompleted")}</span>
          <strong>{completedLessons.length}</strong>
        </article>
        <article className="review-overview-stat">
          <span>{t("contentReview.statScore")}</span>
          <strong>{averageScore}%</strong>
        </article>
        <article className="review-overview-stat">
          <span>{t("contentReview.statTopics")}</span>
          <strong>{totalTopicsCovered}</strong>
        </article>
        <article className="review-overview-stat">
          <span>{t("contentReview.statUnit")}</span>
          <strong>{featuredUnit?.label ?? "—"}</strong>
        </article>
      </div>

      {featuredUnit
        ? <FeaturedUnitCard unit={featuredUnit} t={t} />
        : <div className="review-progress-empty">
            <strong>{t("contentReview.noUnitActivity")}</strong>
            <p>{t("contentReview.noUnitActivityHint")}</p>
          </div>}

      <div className="review-stack">
        <div className="review-progress-head">
          <div>
            <div className="review-progress-title">{t("contentReview.contentReviewTitle")}</div>
            <div className="review-progress-subtitle">
              {t("contentReview.contentReviewSubtitle")}
            </div>
          </div>
          <span className="review-progress-chip">
            {completedLessons.length} {t("contentReview.ready")}
          </span>
        </div>

        {completedLessons.length
          ? <div className="review-list">
              {completedLessons.map((lesson) => (
                <article key={lesson.id} className="review-row-card">
                  <div className="review-row-title">
                    <span className="review-card-kicker">
                      {lesson.unitLabel} / {lesson.label}
                    </span>
                    <strong>{lesson.title}</strong>
                  </div>
                  <div className="review-row-metrics">
                    <span>
                      <JourneyIcon name={lesson.icon} />
                      {lesson.lessons.length} {t("contentReview.pts")}
                    </span>
                    <span>
                      {lesson.overviewTopics?.length ?? lesson.lessons.length}{" "}
                      {t("contentReview.topics")}
                    </span>
                    <span>100%</span>
                  </div>
                  <div className="review-row-actions">
                    {reviewResources.map((resource) => (
                      <Link
                        key={`${lesson.id}-${resource.id}`}
                        className={`review-row-action ${resource.tone}`}
                        href={resource.href(lesson)}
                        title={resource.action}
                      >
                        {resource.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          : <div className="review-empty-card">
              <strong>{t("contentReview.noReviewCards")}</strong>
              <p>{t("contentReview.noReviewCardsHint")}</p>
            </div>}
      </div>
    </section>
  );
}
