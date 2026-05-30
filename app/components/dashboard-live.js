"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

  const heroMetrics = useMemo(() => [
    {
      label: "Progress",
      value: profile ? `${profile.progress}%` : "—",
    },
    {
      label: "Road hours",
      value: profile ? profile.roadHours : "—",
    },
    {
      label: "Next session",
      value: profile ? profile.nextSession : "—",
    },
  ], [profile]);

  if (status === "unauthorized") {
    return (
      <div className="dashboard-shell">
        <div className="dashboard-panel">
          <section className="dash-hero">
            <div className="dash-hero-content">
              <div className="dash-hero-tag">Learner dashboard</div>
              <h1 className="dash-hero-title">Sign in to view your live progress.</h1>
              <p className="dash-hero-subtitle">
                Connect your local learner profile and keep your dashboard data
                synced to PostgreSQL.
              </p>
              <div className="dash-hero-actions">
                <Link className="dash-hero-button primary" href="/login">
                  Sign in now
                </Link>
              </div>
            </div>
          </section>
          <div className="dash-body">
            <div className="dash-main">
              <section className="dash-section">
                <div className="dash-section-head">
                  <div>
                    <div className="dash-section-title">Need an account?</div>
                    <div className="dash-section-subtitle">
                      Register with your email to save progress and activity.
                    </div>
                  </div>
                </div>
                <div className="dash-section-note">
                  Then return to the dashboard to continue with real data.
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
            <div className="dash-hero-tag">Learner dashboard</div>
            <h1 className="dash-hero-title">
              Track your progress, activity, and review items in one place.
            </h1>
            <p className="dash-hero-subtitle">
              Your learner dashboard now reflects your authenticated local
              profile and real activity stored in PostgreSQL.
            </p>
            <div className="dash-hero-actions">
              <Link className="dash-hero-button primary" href="/content">
                Open learning path
              </Link>
              <Link className="dash-hero-button secondary" href="/stats">
                View learner profile
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
              <div className="floating-badge">Focus</div>
              <div className="floating-badge">Track</div>
              <div className="floating-badge">Review</div>
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
                  <div className="dash-section-title">Recommended lessons</div>
                  <div className="dash-section-subtitle">
                    High-value lesson blocks for revision, recall, and progress.
                  </div>
                </div>
                <Link className="dash-link" href="/content">
                  Browse all
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
                        {activityTypeIcons[item.type] || activityTypeIcons.default}
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
