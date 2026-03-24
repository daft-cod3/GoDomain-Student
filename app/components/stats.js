"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  heroMetrics,
  profileBalances,
  profileDetails,
  profilePerformanceCards,
  studentProfile,
} from "../data/student-profile";
import { learningUnits } from "../learn";
import { hydrateLearningProgress } from "../learn/progress-store";

function getUnitProgressRows(units) {
  return units.map((unit) => {
    const completedSubLessons = unit.lessons.reduce(
      (sum, lesson) =>
        sum + lesson.lessons.filter((entry) => entry.completed).length,
      0,
    );
    const totalSubLessons = unit.lessons.reduce(
      (sum, lesson) => sum + lesson.lessons.length,
      0,
    );

    return {
      id: unit.id,
      label: unit.label,
      title: unit.title,
      progress: totalSubLessons
        ? Math.round((completedSubLessons / totalSubLessons) * 100)
        : 0,
      completedLessons: unit.lessons.filter((lesson) =>
        lesson.lessons.every((entry) => entry.completed),
      ).length,
      totalLessons: unit.lessons.length,
      unlocked: unit.unlocked,
    };
  });
}

const profileHighlights = [
  {
    label: "Track",
    value: studentProfile.track,
    meta: "Current learning lane",
  },
  {
    label: "Mentor",
    value: studentProfile.mentor,
    meta: "Assigned instructor",
  },
  {
    label: "Road hours",
    value: studentProfile.roadHours,
    meta: "Practical time logged",
  },
  {
    label: "Next practical",
    value: studentProfile.nextSession,
    meta: "Upcoming session focus",
  },
];

export default function Stats() {
  const [unitProgress, setUnitProgress] = useState(() =>
    getUnitProgressRows(learningUnits),
  );

  useEffect(() => {
    setUnitProgress(
      getUnitProgressRows(hydrateLearningProgress(learningUnits)),
    );
  }, []);

  return (
    <div className="stats-shell profile-shell">
      <header className="stats-hero-block profile-hero-block">
        <div>
          <div className="stats-eyebrow">User profile</div>
          <h1 className="stats-title">{studentProfile.name}</h1>
          <p className="stats-subtitle">
            Personal details, progress, energy, and coins now live inside the
            profile hub on this page.
          </p>

          <div className="profile-hero-tags">
            {heroMetrics.map((metric) => (
              <span key={metric.label} className="profile-hero-tag">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="profile-hero-summary">
          <div className="profile-hero-avatar">
            <Image
              src="/student-profile-avatar.svg"
              alt={`${studentProfile.name} profile illustration`}
              width={160}
              height={160}
              priority
            />
          </div>
          <div className="profile-hero-meta">
            <strong>{studentProfile.level}</strong>
            <span>{studentProfile.indexNumber}</span>
            <span>{studentProfile.drivingSchool}</span>
          </div>
        </div>
      </header>

      <div className="stats-brutal-grid profile-page-grid">
        <section className="stats-panel profile-balance-panel">
          <div className="stats-section-head">
            <div className="stats-section-title">HP, energy, and coins</div>
            <div className="stats-section-subtitle">
              Vertical progress bars give a quick view of the learner balance
              state.
            </div>
          </div>

          <div className="profile-balance-grid">
            {profileBalances.map((balance) => {
              const fillHeight = Math.round(
                (balance.value / balance.capacity) * 100,
              );

              return (
                <article
                  key={balance.id}
                  className={`profile-balance-card ${balance.tone}`}
                >
                  <div className="profile-balance-bar">
                    <span style={{ height: `${fillHeight}%` }} />
                  </div>
                  <strong>
                    {balance.value}/{balance.capacity}
                  </strong>
                  <div className="profile-balance-label">{balance.label}</div>
                  <p>{balance.note}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="stats-panel profile-details-panel">
          <div className="stats-section-head">
            <div className="stats-section-title">Personal details</div>
            <div className="stats-section-subtitle">
              The user profile details previously shown in settings now live
              here.
            </div>
          </div>

          <div className="profile-detail-grid">
            {profileDetails.map((detail) => (
              <article key={detail.label} className="profile-detail-card">
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
                <p>{detail.hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-panel progress-panel">
          <div className="stats-section-head">
            <div className="stats-section-title">Learning progress</div>
            <div className="stats-section-subtitle">
              Unit completion is still visible here so the profile stays tied to
              actual course movement.
            </div>
          </div>

          <div className="stats-progress-stack">
            {unitProgress.map((unit) => (
              <article key={unit.id} className="stats-progress-row-card">
                <div className="stats-progress-row-head">
                  <div>
                    <strong>{unit.label}</strong>
                    <span>{unit.title}</span>
                  </div>
                  <div
                    className={`stats-progress-lock ${
                      unit.unlocked ? "open" : "locked"
                    }`}
                  >
                    {unit.unlocked ? "Open" : "Locked"}
                  </div>
                </div>
                <div className="stats-progress-row-meta">
                  <span>
                    {unit.completedLessons}/{unit.totalLessons} lessons complete
                  </span>
                  <strong>{unit.progress}%</strong>
                </div>
                <div className="stats-progress-row-bar" aria-hidden="true">
                  <span style={{ width: `${unit.progress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-panel performance-panel">
          <div className="stats-section-head">
            <div className="stats-section-title">Profile snapshot</div>
            <div className="stats-section-subtitle">
              Course momentum, key learner markers, and next action in one
              block.
            </div>
          </div>

          <div className="profile-highlight-grid">
            {profileHighlights.map((item) => (
              <article key={item.label} className="profile-highlight-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.meta}</p>
              </article>
            ))}
          </div>

          <div className="stats-performance-grid">
            {profilePerformanceCards.map((card) => (
              <article key={card.label} className="stats-performance-card">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <p>{card.meta}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
