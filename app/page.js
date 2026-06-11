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

const translations = {
  en: {
    heroTag: "Learner dashboard",
    heroTitle:
      "A focused overview for lessons, uploads, and live driving progress.",
    heroSubtitle:
      "Keep revision, instructor uploads, current unit momentum, and recent milestones in one clear workspace designed for steady practice and quick review.",
    primaryAction: "Open learning path",
    secondaryAction: "View learner profile",
    progressLabel: "Progress",
    roadHoursLabel: "Road hours",
    nextSessionLabel: "Next session",
    recommendedLessons: "Recommended lessons",
    recommendedSubtitle:
      "High-value lesson blocks for revision, recall, and continued progress this week.",
    browseAll: "Browse all",
    badgeFocus: "Focus",
    badgeTrack: "Track",
    badgeReview: "Review",
  },
  luo: {
    heroTag: "Fudu mar onge",
    heroTitle:
      "Wich mar dongo mag loso, gobiro, kod ning'iyo mar yudo gi neno.",
    heroSubtitle:
      "Yudo loso, gombo mag guru, ngima mar lajuok mondo biro bedo gi eniya gi twero gi loso mar bedo maduong'.",
    primaryAction: "Yudo gi loso",
    secondaryAction: "Wiye chang'ru mar onge",
    progressLabel: "Ngima",
    roadHoursLabel: "Nengo mar tinde",
    nextSessionLabel: "Duogo mar gimoro",
    recommendedLessons: "Loso ma dalagi",
    recommendedSubtitle:
      "Loso mag teko mar loso kod loso mar tich, ngere gi winjo mag ngima.",
    browseAll: "Nya mondo gi geno",
    badgeFocus: "Moko",
    badgeTrack: "Handoyo",
    badgeReview: "Tweny",
  },
};

export default function HomePage() {
  const t = useTranslation();

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
                  <div className="floating-badge">{copy.badgeFocus}</div>
                  <div className="floating-badge">{copy.badgeTrack}</div>
                  <div className="floating-badge">{copy.badgeReview}</div>
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
                        {copy.recommendedLessons}
                      </div>
                      <div className="dash-section-subtitle">
                        {copy.recommendedSubtitle}
                      </div>
                    </div>
                    <Link className="dash-link" href="/content">
                      {copy.browseAll}
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
                      <div className="dash-section-title">Recent activity</div>
                      <div className="dash-section-subtitle">
                        Recent milestones, sessions, and assessments connected
                        to the learner record.
                      </div>
                    </div>
                    <Link className="dash-link" href="/stats">
                      View report
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
