"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "./translations";
import { getLearningDayHref } from "../learn";
import ContentReview from "../learn/components/contReview";
import ModelTownBoard from "./modelTownBoard";
import RoadSign from "./roadSign";
import TeacherUploadsSection from "./teacher-uploads-section";

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

const activityTypeIcons = {
  Achievement: "🏆",
  Session: "👨‍🏫",
  Badge: "🥇",
  Quiz: "🎯",
  default: "📚",
};

function getRelativeDate(value) {
  if (!value) return "Just now";
  const date = new Date(value);
  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSeconds < 60) return "Just now";
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
  return `${Math.floor(diffSeconds / 86400)} days ago`;
}

export default function DashboardLive() {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [profileRes, activitiesRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/activities"),
        ]);

        if (profileRes.status === 401 || activitiesRes.status === 401) {
          if (!cancelled) {
            setStatus("unauthorized");
          }
          return;
        }

        if (!profileRes.ok || !activitiesRes.ok) {
          const errorText = await profileRes.text();
          throw new Error(errorText || "Unable to load dashboard data.");
        }

        const [profileData, activityData] = await Promise.all([
          profileRes.json(),
          activitiesRes.json(),
        ]);

        if (!cancelled) {
          setProfile(profileData);
          setActivities(activityData);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load dashboard.");
          setStatus("error");
        }
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const t = useTranslation();

  const heroMetrics = useMemo(
    () => [
      {
        label: t("dashboard.progressLabel"),
        value: profile ? `${profile.progress}%` : "—",
      },
      {
        label: t("dashboard.roadHoursLabel"),
        value: profile ? profile.roadHours : "—",
      },
      {
        label: t("dashboard.nextSessionLabel"),
        value: profile ? profile.nextSession : "—",
      },
    ],
    [profile, t],
  );

  if (status === "unauthorized") {
    return (
      <div className="dashboard-shell">
        <div className="dashboard-panel">
          <section className="dash-hero">
            <div className="dash-hero-content">
              <div className="dash-hero-tag">{t("dashboard.heroTag")}</div>
              <h1 className="dash-hero-title">
                {t("dashboard.heroTitleUnauthorized")}
              </h1>
              <p className="dash-hero-subtitle">
                {t("dashboard.heroSubtitleUnauthorized")}
              </p>
              <div className="dash-hero-actions">
                <Link className="dash-hero-button primary" href="/login">
                  {t("dashboard.heroSignInNow")}
                </Link>
              </div>
            </div>
          </section>
          <div className="dash-body">
            <div className="dash-main">
              <section className="dash-section">
                <div className="dash-section-head">
                  <div>
                    <div className="dash-section-title">
                      {t("dashboard.sectionNeedAccount")}
                    </div>
                    <div className="dash-section-subtitle">
                      {t("dashboard.sectionRegisterCopy")}
                    </div>
                  </div>
                </div>
                <div className="dash-section-note">
                  {t("dashboard.sectionReturnCopy")}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">{t("dashboard.heroTag")}</div>
            <h1 className="dash-hero-title">{t("dashboard.heroTitle")}</h1>
            <p className="dash-hero-subtitle">{t("dashboard.heroSubtitle")}</p>
            <div className="dash-hero-actions">
              <Link className="dash-hero-button primary" href="/content">
                {t("dashboard.primaryAction")}
              </Link>
              <Link className="dash-hero-button secondary" href="/stats">
                {t("dashboard.secondaryAction")}
              </Link>
            </div>
            <div className="dash-hero-metrics">
              {heroMetrics.map((metric) => (
                <article key={metric.label} className="dash-hero-metric">
                  <span className="dash-hero-metric-label">{metric.label}</span>
                  <strong className="dash-hero-metric-value">
                    {metric.value}
                  </strong>
                </article>
              ))}
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
                    Latest updates and milestones from your learning history.
                  </div>
                </div>
                <Link className="dash-link" href="/stats">
                  View report
                </Link>
              </div>
              <div className="dash-activity-list">
                {status === "loading" && (
                  <div className="dash-activity-empty">Loading activity…</div>
                )}
                {status === "error" && (
                  <div className="dash-activity-empty">{error}</div>
                )}
                {activities.length === 0 && status === "ready" && (
                  <div className="dash-activity-empty">
                    No recent activity yet. Complete a lesson to start the feed.
                  </div>
                )}
                {activities.map((item) => (
                  <div key={item.id} className="dash-activity-item">
                    <div className="dash-activity-icon-wrapper">
                      <span className="dash-activity-icon">
                        {activityTypeIcons[item.type] ||
                          activityTypeIcons.default}
                      </span>
                    </div>
                    <div className="dash-activity-content">
                      <div className="dash-activity-copy">
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                      <span className="dash-activity-time">
                        {getRelativeDate(item.created_at)}
                      </span>
                    </div>
                    <div className="dash-activity-badge">{item.type}</div>
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
  );
}
