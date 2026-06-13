"use client";

import { useTranslation } from "./components/translations";
import Link from "next/link";
import ModelTownBoard from "./components/modelTownBoard";
import RoadSign from "./components/roadSign";
import DashboardSidebar from "./components/sidebar";
import TeacherUploadsSection from "./components/teacher-uploads-section";
import { studentProfile } from "./data/student-profile";
import { getLearningDayHref } from "./learn";
import ContentReview from "./learn/components/contReview";

const popularLessons = [
  {
    id: "controls",
    title: "Vehicle controls",
    meta: "4 sub-lessons / Foundation setup",
    tag: "Popular",
    href: getLearningDayHref("unit-1-lesson-1"),
    art: "art-lilac",
  },
  {
    id: "signs",
    title: "Traffic signs",
    meta: "4 sub-lessons / Fast recall drill",
    tag: "Revision",
    href: getLearningDayHref("unit-1-lesson-2"),
    art: "art-peach",
  },
  {
    id: "junctions",
    title: "Junction rules",
    meta: "4 sub-lessons / Risk-heavy topic",
    tag: "Priority",
    href: getLearningDayHref("unit-1-lesson-4"),
    art: "art-mint",
  },
  {
    id: "hazard",
    title: "Hazard awareness",
    meta: "4 sub-lessons / Scan discipline",
    tag: "Focus",
    href: getLearningDayHref("unit-1-lesson-5"),
    art: "art-sky",
  },
];

const recentActivity = [
  {
    title: "Completed Unit 1",
    body: "Finished all lessons in Unit 1 with 95% accuracy.",
    time: "2 hours ago",
    tag: "Achievement",
    short: "U1",
  },
  {
    title: "Mentor session",
    body: "Reviewed current progress and next parking drill with Priya Singh.",
    time: "1 day ago",
    tag: "Session",
    short: "MS",
  },
  {
    title: "Badge unlocked",
    body: "Earned the Streak Master badge after seven active days.",
    time: "3 days ago",
    tag: "Badge",
    short: "BD",
  },
  {
    title: "Quiz completed",
    body: "Scored 88% on the Traffic Signs checkpoint.",
    time: "5 days ago",
    tag: "Quiz",
    short: "QZ",
  },
];

function DashboardIcon({ name }) {
  const props = {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    "aria-hidden": "true",
  };

  if (name === "path") {
    return (
      <svg {...props}>
        <title>Learning path</title>
        <path
          d="M3.5 14.5C6.7 14.5 6.8 5.5 10 5.5C13.2 5.5 13.3 14.5 16.5 14.5"
          strokeLinecap="round"
        />
        <circle cx="3.5" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="10" cy="5.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "stats") {
    return (
      <svg {...props}>
        <title>Learner profile</title>
        <path
          d="M4.5 15.5V9.5M10 15.5V4.5M15.5 15.5V11.5"
          strokeLinecap="round"
        />
        <path d="M4 15.5H16" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <title>Dashboard icon</title>
      <circle cx="10" cy="10" r="4" />
    </svg>
  );
}

export default function HomePage() {
  const t = useTranslation();

  const popularLessons = [
    {
      id: "controls",
      title: t("dashboard.popularLessons.controls.title"),
      meta: t("dashboard.popularLessons.controls.meta"),
      tag: t("dashboard.popularLessons.controls.tag"),
      href: getLearningDayHref("unit-1-lesson-1"),
      art: "art-lilac",
    },
    {
      id: "signs",
      title: t("dashboard.popularLessons.signs.title"),
      meta: t("dashboard.popularLessons.signs.meta"),
      tag: t("dashboard.popularLessons.signs.tag"),
      href: getLearningDayHref("unit-1-lesson-2"),
      art: "art-peach",
    },
    {
      id: "junctions",
      title: t("dashboard.popularLessons.junctions.title"),
      meta: t("dashboard.popularLessons.junctions.meta"),
      tag: t("dashboard.popularLessons.junctions.tag"),
      href: getLearningDayHref("unit-1-lesson-4"),
      art: "art-mint",
    },
    {
      id: "hazard",
      title: t("dashboard.popularLessons.hazard.title"),
      meta: t("dashboard.popularLessons.hazard.meta"),
      tag: t("dashboard.popularLessons.hazard.tag"),
      href: getLearningDayHref("unit-1-lesson-5"),
      art: "art-sky",
    },
  ];

  const recentActivity = [
    {
      title: t("dashboard.recentActivity.unit1.title"),
      body: t("dashboard.recentActivity.unit1.body"),
      time: t("dashboard.recentActivity.unit1.time"),
      tag: t("dashboard.recentActivity.unit1.tag"),
      short: "U1",
    },
    {
      title: t("dashboard.recentActivity.mentor.title"),
      body: t("dashboard.recentActivity.mentor.body"),
      time: t("dashboard.recentActivity.mentor.time"),
      tag: t("dashboard.recentActivity.mentor.tag"),
      short: "MS",
    },
    {
      title: t("dashboard.recentActivity.badge.title"),
      body: t("dashboard.recentActivity.badge.body"),
      time: t("dashboard.recentActivity.badge.time"),
      tag: t("dashboard.recentActivity.badge.tag"),
      short: "BD",
    },
    {
      title: t("dashboard.recentActivity.quiz.title"),
      body: t("dashboard.recentActivity.quiz.body"),
      time: t("dashboard.recentActivity.quiz.time"),
      tag: t("dashboard.recentActivity.quiz.tag"),
      short: "QZ",
    },
  ];

  return (
    <div className="app-shell">
      <DashboardSidebar active="dashboard" />
      <main className="main-content">
        <div className="dashboard-shell">
          <div className="dashboard-panel">
            <section className="dash-hero">
              <div className="dash-hero-content">
                <div className="dash-hero-tag">{t("dashboard.heroTag")}</div>
                <h1 className="dash-hero-title">{t("dashboard.heroTitle")}</h1>
                <p className="dash-hero-subtitle">{t("dashboard.heroSubtitle")}</p>
                <div className="dash-hero-actions">
                  <Link className="dash-hero-button primary" href="/content">
                    <DashboardIcon name="path" />
                    {t("dashboard.primaryAction")}
                  </Link>
                  <Link className="dash-hero-button secondary" href="/stats">
                    <DashboardIcon name="stats" />
                    {t("dashboard.secondaryAction")}
                  </Link>
                </div>
                <div className="dash-hero-metrics">
                  <article className="dash-hero-metric">
                    <span className="dash-hero-metric-label">{t("dashboard.progressLabel")}</span>
                    <strong className="dash-hero-metric-value">
                      {studentProfile.progress}%
                    </strong>
                  </article>
                  <article className="dash-hero-metric">
                    <span className="dash-hero-metric-label">{t("dashboard.roadHoursLabel")}</span>
                    <strong className="dash-hero-metric-value">
                      {studentProfile.roadHours}
                    </strong>
                  </article>
                  <article className="dash-hero-metric">
                    <span className="dash-hero-metric-label">{t("dashboard.nextSessionLabel")}</span>
                    <strong className="dash-hero-metric-value">
                      {studentProfile.nextSession}
                    </strong>
                  </article>
                </div>
              </div>

              <div className="dash-hero-art" aria-hidden="true">
                <div className="book-stack">
                  <span className="book book-one" />
                  <span className="book book-two" />
                  <span className="book book-three" />
                  <span className="book book-four" />
                  <span className="book book-five" />
                </div>
                <div className="book-stand">
                  <span />
                  <span />
                </div>
                <div className="floating-elements">
                  <div className="floating-badge">{t("dashboard.badgeFocus")}</div>
                  <div className="floating-badge">{t("dashboard.badgeTrack")}</div>
                  <div className="floating-badge">{t("dashboard.badgeReview")}</div>
                </div>
              </div>
            </section>

            <div className="dash-body">
              <div className="dash-main">
                <TeacherUploadsSection />

                <ContentReview />

                <section className="dash-section">
                  <div className="dash-section-head">
                    <div>
                      <div className="dash-section-title">
                        {t("dashboard.recommendedLessonsTitle")}
                      </div>
                      <div className="dash-section-subtitle">
                        {t("dashboard.recommendedLessonsSubtitle")}
                      </div>
                    </div>
                    <Link className="dash-link" href="/content">
                      {t("dashboard.browseAll")}
                      <DashboardIcon name="path" />
                    </Link>
                  </div>
                  <div className="dash-card-grid">
                    {popularLessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        className="dash-course-card"
                        href={lesson.href}
                      >
                        <div className={`dash-card-art ${lesson.art}`} />
                        <div className="dash-card-row">
                          <div className="dash-card-title">{lesson.title}</div>
                          <span className="dash-card-tag">{lesson.tag}</span>
                        </div>
                        <div className="dash-card-meta">{lesson.meta}</div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="dash-section">
                  <div className="dash-section-head">
                    <div>
                      <div className="dash-section-title">{t("dashboard.recentActivityTitle")}</div>
                      <div className="dash-section-subtitle">
                        {t("dashboard.recentActivitySubtitle")}
                      </div>
                    </div>
                    <Link className="dash-link" href="/stats">
                      {t("dashboard.viewReport")}
                      <DashboardIcon name="stats" />
                    </Link>
                  </div>
                  <div className="dash-activity-list">
                    {recentActivity.map((item) => (
                      <div key={item.title} className="dash-activity-item">
                        <div className="dash-activity-icon-wrapper">
                          <span className="dash-activity-icon">
                            {item.short}
                          </span>
                        </div>
                        <div className="dash-activity-content">
                          <div className="dash-activity-copy">
                            <strong>{item.title}</strong>
                            <p>{item.body}</p>
                          </div>
                          <span className="dash-activity-time">
                            {item.time}
                          </span>
                        </div>
                        <div className="dash-activity-badge">{item.tag}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <RoadSign />
            <ModelTownBoard />
          </div>
        </div>
      </main>
    </div>
  );
}
