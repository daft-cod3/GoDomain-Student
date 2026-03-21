"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLearningDayHref, learningUnits } from "..";
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
    tone: "ink",
    href: (lesson) => getLearningDayHref(lesson.id),
    summary: () => "Open the visual pack for signs, markings, and boards.",
  },
  {
    id: "resources",
    label: "Resources",
    action: "More resources",
    tone: "mix",
    href: () => "/content",
    summary: () =>
      "Jump back into the path and browse related revision material.",
  },
];

function loadCompletedLessons() {
  const hydratedUnits = hydrateLearningProgress(learningUnits);

  return getCompletedLessons(hydratedUnits).sort(
    (left, right) => right.index - left.index,
  );
}

export default function ContentReview() {
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    setCompletedLessons(loadCompletedLessons());
  }, []);

  return (
    <section className="dash-section">
      <div className="dash-section-head">
        <div>
          <div className="dash-section-title">Content review</div>
          <div className="dash-section-subtitle">
            Fully completed lessons unlock notes, videos, image packs, and
            resource links here.
          </div>
        </div>
        <Link className="dash-link" href="/content">
          Open path
        </Link>
      </div>

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
              Finish all 4 sub-lessons inside any lesson and the dashboard will
              add a review card here automatically.
            </p>
          </div>}
    </section>
  );
}
