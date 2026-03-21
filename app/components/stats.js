"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { learningUnits } from "../learn";
import { hydrateLearningProgress } from "../learn/progress-store";

function createAvatar(seed, background, accent) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="28" fill="${background}" />
      <circle cx="60" cy="46" r="22" fill="${accent}" />
      <path d="M26 106C30 78 44 66 60 66C76 66 90 78 94 106" fill="${accent}" />
      <path d="M48 46C50 42 54 40 60 40C66 40 70 42 72 46" stroke="#071018" stroke-width="4" stroke-linecap="round" />
      <circle cx="52" cy="50" r="3.5" fill="#071018" />
      <circle cx="68" cy="50" r="3.5" fill="#071018" />
      <path d="M55 60C57 62 59 63 60 63C61 63 63 62 65 60" stroke="#071018" stroke-width="4" stroke-linecap="round" />
      <text x="14" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#071018">${seed}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const leaderboard = [
  {
    id: "01",
    avatar: createAvatar("01", "#e4f0ff", "#52a2ff"),
    hp: 98,
    energy: 86,
    lessonsDone: 18,
  },
  {
    id: "02",
    avatar: createAvatar("02", "#e8faef", "#44c06b"),
    hp: 94,
    energy: 81,
    lessonsDone: 16,
  },
  {
    id: "03",
    avatar: createAvatar("03", "#eff6ff", "#7dc6ff"),
    hp: 91,
    energy: 77,
    lessonsDone: 15,
  },
  {
    id: "04",
    avatar: createAvatar("04", "#eef8f2", "#58d17a"),
    hp: 87,
    energy: 72,
    lessonsDone: 13,
  },
];

const performanceCards = [
  {
    label: "Accuracy",
    value: "92%",
    meta: "Quiz precision this week",
  },
  {
    label: "Live hours",
    value: "14.5h",
    meta: "Session time logged",
  },
  {
    label: "Focus rate",
    value: "81%",
    meta: "Study blocks completed",
  },
  {
    label: "Badges",
    value: "12",
    meta: "Milestones unlocked",
  },
];

const streakViews = {
  week: {
    label: "This week",
    value: 8,
    note: "You held a clean run across the last 8 study days.",
    days: ["M", "T", "W", "T", "F", "S", "S"].map((day, index) => ({
      day,
      active: index !== 5,
    })),
  },
  month: {
    label: "This month",
    value: 21,
    note: "Three rest days. No breaks in the last two weeks.",
    days: Array.from({ length: 28 }, (_, index) => ({
      day: String(index + 1).padStart(2, "0"),
      active: ![4, 10, 16, 22].includes(index),
    })),
  },
};

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

export default function Stats() {
  const [followedIds, setFollowedIds] = useState(["02"]);
  const [streakView, setStreakView] = useState("week");
  const [unitProgress, setUnitProgress] = useState(() =>
    getUnitProgressRows(learningUnits),
  );
  const activeStreak = streakViews[streakView];

  useEffect(() => {
    setUnitProgress(
      getUnitProgressRows(hydrateLearningProgress(learningUnits)),
    );
  }, []);

  function toggleFollow(studentId) {
    setFollowedIds((current) =>
      current.includes(studentId)
        ? current.filter((entry) => entry !== studentId)
        : [...current, studentId],
    );
  }

  return (
    <div className="stats-shell brutal-stats">
      <header className="stats-hero-block">
        <div>
          <div className="stats-eyebrow">Student analytics</div>
          <h1 className="stats-title">Minimal, direct, live progress.</h1>
          <p className="stats-subtitle">
            Four responsive panels. Hard edges, bold metrics, and faster scan
            paths for rankings, progress, milestones, and streaks.
          </p>
        </div>
        <div className="stats-hero-chip">Live cohort view</div>
      </header>

      <div className="stats-brutal-grid">
        <section className="stats-panel leaderboard-panel">
          <div className="stats-section-head">
            <div className="stats-section-title">Leaderboard</div>
            <div className="stats-section-subtitle">
              Profile pic, index, HP, energy, and lessons done.
            </div>
          </div>

          <ol className="stats-rank-list compact">
            {leaderboard.map((student, index) => {
              const isFollowing = followedIds.includes(student.id);
              const lessonProgress = Math.round(
                (student.lessonsDone / 20) * 100,
              );

              return (
                <li key={student.id} className="stats-rank-card compact">
                  <div className="stats-rank-head compact">
                    <span className="stats-rank-index">#{index + 1}</span>
                    <Image
                      className="stats-rank-avatar"
                      src={student.avatar}
                      alt={`Student ${student.id} avatar`}
                      width={48}
                      height={48}
                      unoptimized
                    />
                    <div className="stats-rank-metrics compact">
                      <div className="stats-rank-stat compact">
                        <span>HP</span>
                        <strong>{student.hp}</strong>
                      </div>
                      <div className="stats-rank-stat compact">
                        <span>Energy</span>
                        <strong>{student.energy}</strong>
                      </div>
                      <div className="stats-rank-stat compact">
                        <span>Lessons</span>
                        <strong>{student.lessonsDone}/20</strong>
                      </div>
                    </div>
                    <button
                      className={`stats-follow-button compact ${
                        isFollowing ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => toggleFollow(student.id)}
                      aria-pressed={isFollowing}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>

                  <div className="stats-rank-bar compact" aria-hidden="true">
                    <span style={{ width: `${lessonProgress}%` }} />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="stats-panel progress-panel">
          <div className="stats-section-head">
            <div className="stats-section-title">Learning progress</div>
            <div className="stats-section-subtitle">
              Progress bars replace circles and align with the new unit model.
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
            <div className="stats-section-title">Performance pulse</div>
            <div className="stats-section-subtitle">
              Fast-read metrics with minimal visual noise.
            </div>
          </div>

          <div className="stats-performance-grid">
            {performanceCards.map((card) => (
              <article key={card.label} className="stats-performance-card">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <p>{card.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-panel streak-panel brutal-streak">
          <div className="stats-section-head">
            <div className="stats-section-title">Streak</div>
            <div className="stats-section-subtitle">
              Brutal, flatter, and still aligned to the site palette.
            </div>
          </div>

          <div className="stats-streak-switch">
            <button
              className={streakView === "week" ? "active" : ""}
              type="button"
              onClick={() => setStreakView("week")}
            >
              Week
            </button>
            <button
              className={streakView === "month" ? "active" : ""}
              type="button"
              onClick={() => setStreakView("month")}
            >
              Month
            </button>
          </div>

          <div className="stats-streak-block">
            <div className="stats-streak-count">{activeStreak.value}</div>
            <div className="stats-streak-copy">
              <strong>{activeStreak.label}</strong>
              <p>{activeStreak.note}</p>
            </div>
          </div>

          <div className={`stats-streak-days ${streakView}`}>
            {activeStreak.days.map((entry) => (
              <span
                key={`${streakView}-${entry.day}`}
                className={entry.active ? "active" : ""}
              >
                {entry.day}
              </span>
            ))}
          </div>

          <div className="stats-streak-footer">
            <div>
              <span>Longest run</span>
              <strong>28 days</strong>
            </div>
            <div>
              <span>Freeze credits</span>
              <strong>02 left</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
