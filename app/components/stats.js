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
    const completedSubLessons = unit.lessons.reduce(
      (sum, lesson) => sum + lesson.lessons.filter((e) => e.completed).length,
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

const statCards = [
  {
    id: "hp",
    label: "HP",
    value: studentProfile.hp,
    cap: studentProfile.hpCapacity,
    bg: "rgba(224,92,122,0.14)",
    accent: "#e05c7a",
    bar: "linear-gradient(90deg,#ff6b9d,#e0365a)",
    glow: "rgba(224,92,122,0.35)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.65-7 9-7 9z" />
      </svg>
    ),
  },
  {
    id: "energy",
    label: "Energy",
    value: studentProfile.energy,
    cap: studentProfile.energyCapacity,
    bg: "rgba(34,197,94,0.14)",
    accent: "#22c55e",
    bar: "linear-gradient(90deg,#4ade80,#16a34a)",
    glow: "rgba(34,197,94,0.35)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" />
      </svg>
    ),
  },
  {
    id: "coins",
    label: "Coins",
    value: studentProfile.coins,
    cap: studentProfile.coinCapacity,
    bg: "rgba(245,159,0,0.14)",
    accent: "#f59f00",
    bar: "linear-gradient(90deg,#ffd166,#f59f00)",
    glow: "rgba(245,159,0,0.35)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="15" height="15">
        <circle cx="10" cy="10" r="8" fill="#ffd166" stroke="#f59f00" strokeWidth="1.5" />
        <text x="10" y="14" textAnchor="middle" fontSize="8" fontWeight="800" fill="#7b4d00">$</text>
      </svg>
    ),
  },
];

const tabs = [
  { id: "details", label: "Details" },
  { id: "progress", label: "Progress" },
  { id: "snapshot", label: "Snapshot" },
];

/* ── Animated progress bar ── */
function AnimBar({ pct, gradient, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 120 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="stats-anim-track">
      <span
        className="stats-anim-fill"
        style={{ width: `${width}%`, background: gradient }}
      />
    </div>
  );
}

/* ── Stat card ── */
function StatCard({ stat, index }) {
  const pct = Math.round((stat.value / stat.cap) * 100);
  const [hovered, setHovered] = useState(false);
  return (
    <article
      className="stats-stat-card"
      style={{ "--stat-glow": stat.glow, animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="stats-stat-row">
        <span className="stats-stat-icon" style={{ background: stat.bg, color: stat.accent }}>
          {stat.icon}
        </span>
        <span className="stats-stat-label">{stat.label}</span>
        <strong className="stats-stat-value">
          {stat.value}
          <em className="stats-stat-cap">/{stat.cap}</em>
        </strong>
        <span
          className="stats-stat-pct"
          style={{ color: stat.accent, transform: hovered ? "scale(1.12)" : "scale(1)" }}
        >
          {pct}%
        </span>
      </div>
      <AnimBar pct={pct} gradient={stat.bar} delay={index * 80} />
    </article>
  );
}

/* ── Detail / highlight card ── */
function InfoCard({ label, value, hint, index }) {
  return (
    <article
      className="stats-info-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="stats-info-kicker">{label}</span>
      <strong className="stats-info-value">{value}</strong>
      {hint && <p className="stats-info-hint">{hint}</p>}
    </article>
  );
}

/* ── Unit progress card ── */
function UnitCard({ unit, index }) {
  return (
    <article
      className="stats-unit-card"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="stats-unit-head">
        <div className="stats-unit-copy">
          <strong className="stats-unit-label">{unit.label}</strong>
          <span className="stats-unit-title">{unit.title}</span>
        </div>
        <span className={`stats-unit-badge${unit.unlocked ? " open" : " locked"}`}>
          {unit.unlocked ? "Open" : "Locked"}
        </span>
      </div>

      <div className="stats-unit-meta">
        <span>{unit.completedLessons}/{unit.totalLessons} lessons</span>
        <strong className="stats-unit-pct">{unit.progress}%</strong>
      </div>

      <AnimBar
        pct={unit.progress}
        gradient="linear-gradient(90deg,#2f8bff 0%,#6fe51f 100%)"
        delay={index * 70}
      />

      <div className="stats-unit-foot">
        <span>{unit.unlocked ? "Available now" : "Unlocks later"}</span>
        <span>{100 - unit.progress}% remaining</span>
      </div>
    </article>
  );
}

/* ── Tab panel wrapper with fade-slide ── */
function TabPanel({ children, active }) {
  const [visible, setVisible] = useState(active);
  const [mounted, setMounted] = useState(active);

  useEffect(() => {
    if (active) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 260);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!mounted) return null;
  return (
    <div
      className="stats-tab-panel"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.26s ease, transform 0.26s ease",
      }}
      role="tabpanel"
    >
      {children}
    </div>
  );
}

export default function Stats() {
  const [unitProgress, setUnitProgress] = useState(() =>
    getUnitProgressRows(learningUnits),
  );
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [activeTab, setActiveTab] = useState("details");
  const [headerVisible, setHeaderVisible] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    setUnitProgress(getUnitProgressRows(hydrateLearningProgress(learningUnits)));
    const stored = window.localStorage.getItem(PROFILE_IMAGE_KEY);
    if (stored) setProfileImage(stored);
    const t = setTimeout(() => setHeaderVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setProfileImage(reader.result);
      window.localStorage.setItem(PROFILE_IMAGE_KEY, reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  const openUnits = unitProgress.filter((u) => u.unlocked).length;
  const completedUnits = unitProgress.filter((u) => u.progress === 100).length;
  const leadingUnit =
    [...unitProgress].sort((a, b) => b.progress - a.progress)[0] ?? null;

  return (
    <section className="stats-shell-v2">

      {/* ── HERO HEADER ── */}
      <header
        className="stats-hero-header"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(22px)",
          transition: "opacity 0.42s ease, transform 0.42s ease",
        }}
      >
        {/* decorative orbs */}
        <span className="stats-orb stats-orb-1" aria-hidden="true" />
        <span className="stats-orb stats-orb-2" aria-hidden="true" />
        <span className="stats-orb stats-orb-3" aria-hidden="true" />

        <div className="stats-hero-inner">
          {/* avatar column */}
          <div className="stats-avatar-col">
            <div className="stats-avatar-ring">
              <div className="stats-avatar-frame">
                <img
                  src={profileImage}
                  alt={studentProfile.name}
                  className="stats-avatar-img"
                />
              </div>
            </div>

            <button
              className="stats-photo-btn"
              type="button"
              onClick={() => fileRef.current?.click()}
            >
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                <path d="M8 2v8M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Change photo
            </button>

            <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
          </div>

          {/* name + chips + metrics */}
          <div className="stats-hero-copy">
            <span className="stats-hero-eyebrow">Student profile</span>

            <h1 className="stats-hero-name">{studentProfile.name}</h1>
            <p className="stats-hero-bio">
              A modern learner overview with cleaner hierarchy for profile details, unit progress, and study snapshot metrics.
            </p>

            <div className="stats-hero-chips">
              <span className="stats-chip">{studentProfile.level}</span>
              <span className="stats-chip">{studentProfile.drivingClass}</span>
              <span className="stats-chip stats-chip-green">Online</span>
            </div>

            <div className="stats-hero-metrics">
              {heroMetrics.map((m, i) => (
                <article key={m.label} className="stats-hero-metric" style={{ animationDelay: `${i * 80}ms` }}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </article>
              ))}
            </div>
          </div>

          {/* focus panel + stat cards */}
          <aside className="stats-hero-aside">
            <article className="stats-focus-card">
              <div className="stats-focus-head">
                <span className="stats-focus-kicker">Current focus</span>
                <span className="stats-focus-badge">{openUnits}/4 units open</span>
              </div>

              <strong className="stats-focus-title">{studentProfile.nextSession}</strong>
              <p className="stats-focus-body">
                Mentor {studentProfile.mentor} is guiding the next practical block while the strongest active unit stays visible here.
              </p>

              <div className="stats-focus-grid">
                <article className="stats-focus-mini">
                  <span>Leading unit</span>
                  <strong>{leadingUnit?.label ?? "None"}</strong>
                </article>
                <article className="stats-focus-mini">
                  <span>Best progress</span>
                  <strong>{leadingUnit?.progress ?? 0}%</strong>
                </article>
                <article className="stats-focus-mini">
                  <span>Units complete</span>
                  <strong>{completedUnits}</strong>
                </article>
              </div>
            </article>

            <div className="stats-stat-stack">
              {statCards.map((stat, i) => (
                <StatCard key={stat.id} stat={stat} index={i} />
              ))}
            </div>
          </aside>
        </div>
      </header>

      {/* ── TAB BAR ── */}
      <div className="stats-tab-bar" role="tablist">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`stats-tab-btn${active ? " active" : ""}`}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {active && <span className="stats-tab-indicator" />}
            </button>
          );
        })}
      </div>

      {/* ── DETAILS TAB ── */}
      <TabPanel active={activeTab === "details"}>
        <div className="stats-panel-v2">
          <div className="stats-panel-head">
            <div className="stats-panel-title">Learner details</div>
            <div className="stats-panel-sub">Core profile information and learner record details.</div>
          </div>
          <div className="stats-grid-2">
            {profileDetails.map((d, i) => (
              <InfoCard key={d.label} label={d.label} value={d.value} hint={d.hint} index={i} />
            ))}
          </div>
        </div>
      </TabPanel>

      {/* ── PROGRESS TAB ── */}
      <TabPanel active={activeTab === "progress"}>
        <div className="stats-panel-v2">
          <div className="stats-panel-head">
            <div className="stats-panel-title">Unit progress</div>
            <div className="stats-panel-sub">Track unit completion, lesson coverage, and unlocked routes.</div>
          </div>
          <div className="stats-grid-1">
            {unitProgress.map((unit, i) => (
              <UnitCard key={unit.id} unit={unit} index={i} />
            ))}
          </div>
        </div>
      </TabPanel>

      {/* ── SNAPSHOT TAB ── */}
      <TabPanel active={activeTab === "snapshot"}>
        <div className="stats-panel-v2">
          <div className="stats-panel-head">
            <div className="stats-panel-title">Study snapshot</div>
            <div className="stats-panel-sub">Short performance and learner-state indicators for quick review.</div>
          </div>
          <div className="stats-snapshot-grid">
            <div className="stats-grid-2">
              {profileHighlights.map((h, i) => (
                <InfoCard key={h.label} label={h.label} value={h.value} hint={h.meta} index={i} />
              ))}
            </div>
            <div className="stats-grid-2">
              {profilePerformanceCards.map((c, i) => (
                <InfoCard key={c.label} label={c.label} value={c.value} hint={c.meta} index={i + 4} />
              ))}
            </div>
          </div>
        </div>
      </TabPanel>

    </section>
  );
}
