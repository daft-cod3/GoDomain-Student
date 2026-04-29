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

function getUnitRows(units) {
  return units.map((unit) => {
    const done = unit.lessons.reduce((s, l) => s + l.lessons.filter((e) => e.completed).length, 0);
    const total = unit.lessons.reduce((s, l) => s + l.lessons.length, 0);
    return {
      id: unit.id,
      label: unit.label,
      title: unit.title,
      progress: total ? Math.round((done / total) * 100) : 0,
      completedLessons: unit.lessons.filter((l) => l.lessons.every((e) => e.completed)).length,
      totalLessons: unit.lessons.length,
      unlocked: unit.unlocked,
    };
  });
}

/* ── Animated bar ── */
function Bar({ pct, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 100 + delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div className="prof-bar-track">
      <div className="prof-bar-fill" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

/* ── Stat pill ── */
function StatPill({ label, value, color, icon }) {
  return (
    <div className="prof-stat-pill" style={{ "--pill-color": color }}>
      <span className="prof-stat-pill-icon">{icon}</span>
      <div className="prof-stat-pill-body">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ── Tab button ── */
function Tab({ id, label, active, onClick }) {
  return (
    <button
      type="button"
      className={`prof-tab${active ? " active" : ""}`}
      onClick={() => onClick(id)}
      role="tab"
      aria-selected={active}
    >
      {label}
    </button>
  );
}

/* ── Info row ── */
function InfoRow({ label, value }) {
  return (
    <div className="prof-info-row">
      <span className="prof-info-label">{label}</span>
      <span className="prof-info-value">{value}</span>
    </div>
  );
}

/* ── Unit bar card ── */
function UnitBar({ unit, index }) {
  return (
    <div className="prof-unit-row" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="prof-unit-row-head">
        <div className="prof-unit-row-copy">
          <span className="prof-unit-row-label">{unit.label}</span>
          <span className="prof-unit-row-title">{unit.title}</span>
        </div>
        <span className={`prof-unit-badge${unit.unlocked ? " open" : ""}`}>
          {unit.progress}%
        </span>
      </div>
      <Bar pct={unit.progress} color="linear-gradient(90deg,#2f8bff,#6fe51f)" delay={index * 60} />
      <div className="prof-unit-row-foot">
        <span>{unit.completedLessons}/{unit.totalLessons} lessons</span>
        <span>{unit.unlocked ? "Open" : "Locked"}</span>
      </div>
    </div>
  );
}

/* ── Achievement badge ── */
function AchBadge({ a, index }) {
  return (
    <div className={`prof-ach${a.unlocked ? " unlocked" : ""}`} style={{ animationDelay: `${index * 50}ms` }}>
      <span className="prof-ach-icon">{a.icon}</span>
      <span className="prof-ach-title">{a.title}</span>
      <span className="prof-ach-state">{a.unlocked ? "✓" : "🔒"}</span>
    </div>
  );
}

const ACHIEVEMENTS = [
  { title: "First Steps", icon: "🚗", unlocked: true },
  { title: "Streak Master", icon: "🔥", unlocked: true },
  { title: "Unit Champion", icon: "🏆", unlocked: false },
  { title: "Road Warrior", icon: "🛣️", unlocked: false },
  { title: "Perfect Score", icon: "💯", unlocked: true },
  { title: "Mentor Meeting", icon: "👨🏫", unlocked: true },
];

const STAT_PILLS = [
  { id: "hp",     label: "HP",     value: `${studentProfile.hp}/${studentProfile.hpCapacity}`,         color: "#e05c7a", icon: "❤️" },
  { id: "energy", label: "Energy", value: `${studentProfile.energy}/${studentProfile.energyCapacity}`, color: "#22c55e", icon: "⚡" },
  { id: "coins",  label: "Coins",  value: `${studentProfile.coins}/${studentProfile.coinCapacity}`,    color: "#f59f00", icon: "🪙" },
  { id: "streak", label: "Streak", value: `${studentProfile.streak || 7} days`,                        color: "#267cff", icon: "🔥" },
];

export default function Stats() {
  const [units, setUnits] = useState(() => getUnitRows(learningUnits));
  const [img, setImg] = useState(DEFAULT_PROFILE_IMAGE);
  const [tab, setTab] = useState("overview");
  const [visible, setVisible] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    setUnits(getUnitRows(hydrateLearningProgress(learningUnits)));
    const stored = window.localStorage.getItem(PROFILE_IMAGE_KEY);
    if (stored) setImg(stored);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setImg(reader.result);
      window.localStorage.setItem(PROFILE_IMAGE_KEY, reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  const completedUnits = units.filter((u) => u.progress === 100).length;
  const overallPct = units.length
    ? Math.round(units.reduce((s, u) => s + u.progress, 0) / units.length)
    : 0;

  return (
    <div className={`prof-shell${visible ? " visible" : ""}`}>

      {/* ── HERO CARD ── */}
      <div className="prof-hero">
        {/* avatar */}
        <div className="prof-avatar-wrap">
          <div className="prof-avatar-ring">
            <img src={img} alt={studentProfile.name} className="prof-avatar-img" />
          </div>
          <button type="button" className="prof-avatar-btn" onClick={() => fileRef.current?.click()}>
            <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
              <path d="M8 2v8M4 6l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        </div>

        {/* identity */}
        <div className="prof-identity">
          <div className="prof-identity-top">
            <div>
              <p className="prof-eyebrow">Student profile</p>
              <h1 className="prof-name">{studentProfile.name}</h1>
              <p className="prof-sub">{studentProfile.indexNumber} · {studentProfile.drivingSchool}</p>
            </div>
            <div className="prof-chips">
              <span className="prof-chip">{studentProfile.level}</span>
              <span className="prof-chip">{studentProfile.drivingClass}</span>
              <span className="prof-chip green">Online</span>
            </div>
          </div>

          {/* key metrics row */}
          <div className="prof-metrics-row">
            {heroMetrics.map((m) => (
              <div key={m.label} className="prof-metric">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
            <div className="prof-metric">
              <strong>{completedUnits}/{units.length}</strong>
              <span>Units done</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT PILLS ── */}
      <div className="prof-pills-row">
        {STAT_PILLS.map((p) => (
          <StatPill key={p.id} {...p} />
        ))}
      </div>

      {/* ── OVERALL PROGRESS ── */}
      <div className="prof-overall">
        <div className="prof-overall-head">
          <span>Overall progress</span>
          <strong>{overallPct}%</strong>
        </div>
        <Bar pct={overallPct} color="linear-gradient(90deg,#2563eb,#58cc02)" />
      </div>

      {/* ── TABS ── */}
      <div className="prof-tabs" role="tablist">
        {[
          { id: "overview",  label: "Overview" },
          { id: "units",     label: "Units" },
          { id: "details",   label: "Details" },
          { id: "badges",    label: "Badges" },
        ].map((t) => (
          <Tab key={t.id} id={t.id} label={t.label} active={tab === t.id} onClick={setTab} />
        ))}
      </div>

      {/* ── TAB PANELS ── */}
      <div className="prof-panel">

        {tab === "overview" && (
          <div className="prof-overview-grid">
            {/* performance cards */}
            {profilePerformanceCards.map((c) => (
              <div key={c.label} className="prof-perf-card">
                <strong className="prof-perf-value">{c.value}</strong>
                <span className="prof-perf-label">{c.label}</span>
                <span className="prof-perf-meta">{c.meta}</span>
              </div>
            ))}
            {/* focus card */}
            <div className="prof-focus-card">
              <span className="prof-focus-kicker">Next session</span>
              <strong className="prof-focus-title">{studentProfile.nextSession}</strong>
              <div className="prof-focus-row">
                <span>Mentor</span>
                <strong>{studentProfile.mentor}</strong>
              </div>
              <div className="prof-focus-row">
                <span>Road hours</span>
                <strong>{studentProfile.roadHours}</strong>
              </div>
              <div className="prof-focus-row">
                <span>Attendance</span>
                <strong>{studentProfile.attendance}</strong>
              </div>
            </div>
          </div>
        )}

        {tab === "units" && (
          <div className="prof-units-list">
            {units.map((u, i) => <UnitBar key={u.id} unit={u} index={i} />)}
          </div>
        )}

        {tab === "details" && (
          <div className="prof-details-list">
            {profileDetails.map((d) => (
              <InfoRow key={d.label} label={d.label} value={d.value} />
            ))}
          </div>
        )}

        {tab === "badges" && (
          <div className="prof-ach-grid">
            {ACHIEVEMENTS.map((a, i) => <AchBadge key={a.title} a={a} index={i} />)}
          </div>
        )}

      </div>
    </div>
  );
}
