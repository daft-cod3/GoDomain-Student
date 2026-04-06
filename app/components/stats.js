"use client";

import { useEffect, useRef, useState } from "react";
import {
  heroMetrics,
  profileDetails,
  profilePerformanceCards,
  studentProfile,
} from "../data/student-profile";
import { learningUnits } from "../learn";
import { hydrateLearningProgress } from "../learn/progress-store";

const PROFILE_IMAGE_KEY = "godomain-profile-image";
const DEFAULT_PROFILE_IMAGE = "/student-profile-avatar.svg";

function getUnitProgressRows(units) {
  return units.map((unit) => {
    const completedSub = unit.lessons.reduce(
      (s, l) => s + l.lessons.filter((e) => e.completed).length, 0,
    );
    const totalSub = unit.lessons.reduce((s, l) => s + l.lessons.length, 0);
    return {
      id: unit.id,
      label: unit.label,
      title: unit.title,
      progress: totalSub ? Math.round((completedSub / totalSub) * 100) : 0,
      completedLessons: unit.lessons.filter((l) =>
        l.lessons.every((e) => e.completed),
      ).length,
      totalLessons: unit.lessons.length,
      unlocked: unit.unlocked,
    };
  });
}

const profileHighlights = [
  { label: "Track", value: studentProfile.track, meta: "Current learning lane" },
  { label: "Mentor", value: studentProfile.mentor, meta: "Assigned instructor" },
  { label: "Road hours", value: studentProfile.roadHours, meta: "Practical time logged" },
  { label: "Next session", value: studentProfile.nextSession, meta: "Upcoming focus" },
];

const STATS = [
  {
    id: "hp",
    label: "HP",
    value: studentProfile.hp,
    cap: studentProfile.hpCapacity,
    color: "#e05c7a",
    bg: "rgba(224,92,122,0.12)",
    bar: "linear-gradient(90deg,#ff6b9d,#e0365a)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
        <path d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.65-7 9-7 9z" />
      </svg>
    ),
  },
  {
    id: "energy",
    label: "Energy",
    value: studentProfile.energy,
    cap: studentProfile.energyCapacity,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    bar: "linear-gradient(90deg,#4ade80,#16a34a)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" />
      </svg>
    ),
  },
  {
    id: "coins",
    label: "Coins",
    value: studentProfile.coins,
    cap: studentProfile.coinCapacity,
    color: "#f59f00",
    bg: "rgba(245,159,0,0.12)",
    bar: "linear-gradient(90deg,#ffd166,#f59f00)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
        <circle cx="10" cy="10" r="8" fill="#ffd166" stroke="#f59f00" strokeWidth="1.5" />
        <text x="10" y="14" textAnchor="middle" fontSize="8" fontWeight="800" fill="#7b4d00">$</text>
      </svg>
    ),
  },
];

const TABS = [
  { id: "details", label: "Details" },
  { id: "progress", label: "Progress" },
  { id: "snapshot", label: "Snapshot" },
];

function StatPill({ stat }) {
  const pct = Math.round((stat.value / stat.cap) * 100);
  return (
    <div className="sp-pill" style={{ "--sp-color": stat.color, "--sp-bg": stat.bg }}>
      <div className="sp-pill-top">
        <span className="sp-pill-icon" style={{ color: stat.color }}>{stat.icon}</span>
        <span className="sp-pill-label">{stat.label}</span>
        <strong className="sp-pill-val">
          {stat.value}<em>/{stat.cap}</em>
        </strong>
        <span className="sp-pill-pct">{pct}%</span>
      </div>
      <div className="sp-pill-track">
        <span style={{ width: `${pct}%`, background: stat.bar }} />
      </div>
    </div>
  );
}

export default function Stats() {
  const [unitProgress, setUnitProgress] = useState(() => getUnitProgressRows(learningUnits));
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [activeTab, setActiveTab] = useState("details");
  const fileRef = useRef(null);

  useEffect(() => {
    setUnitProgress(getUnitProgressRows(hydrateLearningProgress(learningUnits)));
    const stored = window.localStorage.getItem(PROFILE_IMAGE_KEY);
    if (stored) setProfileImage(stored);
  }, []);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setProfileImage(reader.result);
      window.localStorage.setItem(PROFILE_IMAGE_KEY, reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="sp-shell">

      {/* ── HERO ── */}
      <header className="sp-hero">
        <div className="sp-hero-inner">

          {/* Avatar */}
          <div className="sp-avatar-col">
            <div className="sp-avatar-ring">
              <div className="sp-avatar">
                <img src={profileImage} alt={studentProfile.name} />
              </div>
            </div>
            <button
              className="sp-upload-btn"
              type="button"
              onClick={() => fileRef.current?.click()}
            >
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                <path d="M8 2v8M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Change photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sp-file-input"
              onChange={handleImageChange}
            />
          </div>

          {/* Identity */}
          <div className="sp-identity">
            <span className="sp-eyebrow">Student profile</span>
            <h1 className="sp-name">{studentProfile.name}</h1>
            <div className="sp-badges">
              <span className="sp-badge">{studentProfile.level}</span>
              <span className="sp-badge">{studentProfile.drivingClass}</span>
              <span className="sp-badge sp-badge--online">● Online</span>
            </div>
            <div className="sp-kpis">
              {heroMetrics.map((m) => (
                <div key={m.label} className="sp-kpi">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat bars */}
          <div className="sp-stats-col">
            {STATS.map((s) => <StatPill key={s.id} stat={s} />)}
          </div>

        </div>
      </header>

      {/* ── TABS ── */}
      <div className="sp-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`sp-tab${activeTab === t.id ? " active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === t.id}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── DETAILS ── */}
      {activeTab === "details" && (
        <div className="sp-grid" role="tabpanel">
          {profileDetails.map((d, i) => (
            <article
              key={d.label}
              className="sp-card"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <span className="sp-card-label">{d.label}</span>
              <strong className="sp-card-val">{d.value}</strong>
              <p className="sp-card-hint">{d.hint}</p>
            </article>
          ))}
        </div>
      )}

      {/* ── PROGRESS ── */}
      {activeTab === "progress" && (
        <div className="sp-progress-list" role="tabpanel">
          {unitProgress.map((u, i) => (
            <article
              key={u.id}
              className="sp-progress-card"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="sp-progress-head">
                <div className="sp-progress-title">
                  <strong>{u.label}</strong>
                  <span>{u.title}</span>
                </div>
                <span className={`sp-lock${u.unlocked ? " open" : " locked"}`}>
                  {u.unlocked ? "Open" : "Locked"}
                </span>
              </div>
              <div className="sp-progress-meta">
                <span>{u.completedLessons}/{u.totalLessons} lessons</span>
                <strong>{u.progress}%</strong>
              </div>
              <div className="sp-progress-bar">
                <span style={{ width: `${u.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── SNAPSHOT ── */}
      {activeTab === "snapshot" && (
        <div className="sp-snapshot" role="tabpanel">
          <div className="sp-grid">
            {profileHighlights.map((h, i) => (
              <article
                key={h.label}
                className="sp-card"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <span className="sp-card-label">{h.label}</span>
                <strong className="sp-card-val">{h.value}</strong>
                <p className="sp-card-hint">{h.meta}</p>
              </article>
            ))}
          </div>
          <div className="sp-perf-grid">
            {profilePerformanceCards.map((c, i) => (
              <article
                key={c.label}
                className="sp-perf-card"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <span className="sp-perf-label">{c.label}</span>
                <strong className="sp-perf-val">{c.value}</strong>
                <p className="sp-perf-meta">{c.meta}</p>
              </article>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
