"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLearningDayHref, learningUnits } from "..";
import { JourneyIcon } from "../icons";
import {
  getCompletedLessons,
  hydrateLearningProgress,
} from "../progress-store";

const reviewResources = [
  {
    id: "notes",
    label: "Notes",
    action: "Open notes",
    tone: "blue",
    href: (lesson) => getLearningDayHref(lesson.id),
    summary: (lesson) => `Condensed notes and checkpoints for ${lesson.title}.`,
  },
  {
    id: "video",
    label: "Video",
    action: "Watch recap",
    tone: "green",
    href: () => "/live",
    summary: (lesson) => `Replay the short walkthrough for ${lesson.label}.`,
  },
  {
    id: "images",
    label: "Images",
    action: "View pack",
    tone: "mix",
    href: (lesson) => getLearningDayHref(lesson.id),
    summary: () => "Open the visual pack for signs, markings, and boards.",
  },
  {
    id: "resources",
    label: "Resources",
    action: "More resources",
    tone: "gold",
    href: () => "/content",
    summary: () =>
      "Jump back into the path and browse related revision material.",
  },
];

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
      nextLesson:
        unit.lessons.find((lesson) => lesson.progress < 100) ?? null,
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

  return {
    averageScore,
    completedLessons,
    activeLessons,
    totalTopicsCovered,
    unitSummaries,
  };
}

export default function ContentReview() {
  const [reviewData, setReviewData] = useState({
    averageScore: 0,
    completedLessons: [],
    activeLessons: [],
    totalTopicsCovered: 0,
    unitSummaries: [],
  });

  useEffect(() => {
    setReviewData(loadReviewData());
  }, []);

  const {
    averageScore,
    completedLessons,
    activeLessons,
    totalTopicsCovered,
    unitSummaries,
  } = reviewData;

  return (
    <section className="dash-section review-section">
      <div className="dash-section-head">
        <div>
          <div className="dash-section-title">
            Content review and lesson progress
          </div>
          <div className="dash-section-subtitle">
            Completed lessons stay review-ready, while active topics keep their
            progress, scores, and covered unit content visible in one place.
          </div>
        </div>
        <Link className="dash-link" href="/content">
          Open path
        </Link>
      </div>

      <div className="review-overview-bar">
        <article className="review-overview-stat">
          <span>Completed review cards</span>
          <strong>{completedLessons.length}</strong>
        </article>
        <article className="review-overview-stat">
          <span>Live topic score</span>
          <strong>{averageScore}%</strong>
        </article>
        <article className="review-overview-stat">
          <span>Topics covered</span>
          <strong>{totalTopicsCovered}</strong>
        </article>
      </div>

      <div className="review-layout">
        <div className="review-stack">
          {completedLessons.length
            ? <div className="review-grid">
                {completedLessons.map((lesson) => (
                  <article key={lesson.id} className="review-card">
                    <div className="review-card-head">
                      <div>
                        <div className="review-card-kicker">
                          {lesson.unitLabel} / {lesson.label}
                        </div>
                        <div className="review-card-title">{lesson.title}</div>
                      </div>
                      <span className="review-card-state">Complete</span>
                    </div>

                    <p className="review-card-summary">{lesson.subtitle}</p>

                    <div className="review-card-metrics">
                      <span>{lesson.lessons.length} checkpoints</span>
                      <span>
                        {lesson.overviewTopics?.length ?? lesson.lessons.length}{" "}
                        topics
                      </span>
                      <span>Score 100%</span>
                    </div>

                    <div className="review-resource-grid">
                      {reviewResources.map((resource) => (
                        <Link
                          key={`${lesson.id}-${resource.id}`}
                          className={`review-resource-card ${resource.tone}`}
                          href={resource.href(lesson)}
                        >
                          <span className="review-resource-label">
                            {resource.label}
                          </span>
                          <strong>{resource.action}</strong>
                          <small>{resource.summary(lesson)}</small>
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            : <div className="review-empty-card">
                <strong>No review cards yet.</strong>
                <p>
                  Finish all 4 sub-lessons inside any lesson and the dashboard
                  will add a review card here automatically.
                </p>
              </div>}
        </div>

        <aside className="review-progress-panel">
          <div className="review-progress-head">
            <div>
              <div className="review-progress-title">Lesson progress</div>
              <div className="review-progress-subtitle">
                Continue the strongest active lessons without leaving this
                review section.
              </div>
            </div>
            <span className="review-progress-chip">
              {activeLessons.length} active
            </span>
          </div>

          {activeLessons.length
            ? <div className="review-progress-list">
                {activeLessons.map((lesson) => {
                  const nextStep =
                    lesson.lessons.find((entry) => !entry.completed) ?? null;

                  return (
                    <Link
                      key={lesson.id}
                      className="review-progress-item"
                      href={getLearningDayHref(lesson.id)}
                    >
                      <span className="review-progress-icon" aria-hidden="true">
                        <JourneyIcon name={lesson.icon} />
                      </span>

                      <div className="review-progress-copy">
                        <div className="review-progress-row">
                          <strong>{lesson.title}</strong>
                          <span>{lesson.progress}%</span>
                        </div>
                        <span className="review-progress-meta">
                          {lesson.unitLabel} / {lesson.label}
                        </span>
                        <div className="review-progress-bar" aria-hidden="true">
                          <span style={{ width: `${lesson.progress}%` }} />
                        </div>
                        <small>
                          Next focus: {nextStep?.title ?? "Review this topic"}
                        </small>
                      </div>
                    </Link>
                  );
                })}
              </div>
            : <div className="review-progress-empty">
                <strong>No active lessons yet.</strong>
                <p>
                  Start a lesson from the learning path and its live progress
                  will appear here automatically.
                </p>
              </div>}
        </aside>
      </div>

      <div className="review-unit-block">
        <div className="review-unit-head">
          <div>
            <div className="review-progress-title">Student unit progress</div>
            <div className="review-progress-subtitle">
              Progress, scores, and topics covered within each unit.
            </div>
          </div>
        </div>

        <div className="review-unit-grid">
          {unitSummaries.map((unit) => (
            <article key={unit.id} className="review-unit-card">
              <div className="review-unit-top">
                <div>
                  <div className="review-card-kicker">{unit.label}</div>
                  <div className="review-unit-title">{unit.title}</div>
                </div>
                <span className="review-unit-score">{unit.score}% score</span>
              </div>

              <div className="review-unit-metrics">
                <article>
                  <span>Progress</span>
                  <strong>{unit.progress}%</strong>
                </article>
                <article>
                  <span>Topics covered</span>
                  <strong>
                    {unit.coveredLessons.length}/{unit.lessons.length}
                  </strong>
                </article>
                <article>
                  <span>Completed steps</span>
                  <strong>
                    {unit.completedSubLessons}/{unit.totalSubLessons}
                  </strong>
                </article>
              </div>

              <div className="review-progress-bar" aria-hidden="true">
                <span style={{ width: `${unit.progress}%` }} />
              </div>

              <div className="review-topic-list">
                {unit.coveredTopics.length
                  ? unit.coveredTopics.slice(0, 3).map((topic) => (
                      <span key={topic} className="review-topic-pill">
                        {topic}
                      </span>
                    ))
                  : <span className="review-topic-pill muted">
                      No topics covered yet
                    </span>}
              </div>

              <div className="review-unit-footer">
                <span>Next focus</span>
                <strong>{unit.nextLesson?.title ?? "Revision loop ready"}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
