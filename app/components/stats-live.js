"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "./translations";
import { learningUnits } from "../learn";
import { hydrateLearningProgress, deriveLearningProgress } from "../learn/progress-store";
import { getLearningDayHref } from "../learn";

const PROFILE_IMAGE_KEY = "godomain-profile-image";
const DEFAULT_PROFILE_IMAGE = "/student-profile-avatar.svg";

function cloneUnits(units) {
  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => ({
      ...lesson,
      lessons: lesson.lessons.map((entry) => ({ ...entry })),
    })),
  }));
}

function getUnitRows(units) {
  return units.map((unit) => {
    const done = unit.lessons.reduce(
      (sum, lesson) => sum + lesson.lessons.filter((entry) => entry.completed).length,
      0,
    );
    const total = unit.lessons.reduce((sum, lesson) => sum + lesson.lessons.length, 0);
    return {
      id: unit.id,
      label: unit.label,
      title: unit.title,
      progress: total ? Math.round((done / total) * 100) : 0,
      completedLessons: unit.lessons.filter((lesson) => lesson.lessons.every((entry) => entry.completed)).length,
      totalLessons: unit.lessons.length,
      unlocked: unit.lessons.some((lesson) => lesson.progress > 0 || !lesson.isLocked),
    };
  });
}

function applyRemoteProgress(units, progressRows) {
  const progressMap = new Map(
    progressRows.map((row) => [row.lesson_id, new Set(row.completed_step_ids || [])]),
  );

  return cloneUnits(units).map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => {
      const completedStepIds = progressMap.get(lesson.id);
      if (!completedStepIds) return lesson;

      return {
        ...lesson,
        lessons: lesson.lessons.map((entry) => ({
          ...entry,
          completed: completedStepIds.has(entry.id),
        })),
      };
    }),
  }));
}

function getPercent(value, capacity) {
  if (!capacity) return 0;
  return Math.round((value / capacity) * 100);
}

function Bar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 100 + delay);
    return () => clearTimeout(timer);
  }, [pct, delay]);
  return (
    <div className="prof-bar-track">
      <div className="prof-bar-fill" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

function StatPill({ label, value, capacity, color, icon }) {
  const pct = getPercent(value, capacity);
  return (
    <div className="prof-stat-pill" style={{ "--pill-color": color }}>
      <span className="prof-stat-pill-icon">{icon}</span>
      <div className="prof-stat-pill-body">
        <strong>{capacity ? `${value}/${capacity}` : value}</strong>
        <span>{label}</span>
        {capacity ? (
          <div className="prof-stat-progress" role="progressbar" aria-label={`${label} progress`} aria-valuemin="0" aria-valuemax={capacity} aria-valuenow={value}>
            <i style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 58%, #ffffff))` }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Tab({ id, label, active, onClick }) {
  return (
    <button type="button" className={`prof-tab${active ? " active" : ""}`} onClick={() => onClick(id)} role="tab" aria-selected={active}>
      {label}
    </button>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="prof-info-row">
      <span className="prof-info-label">{label}</span>
      <span className="prof-info-value">{value}</span>
    </div>
  );
}

function UnitBar({ unit, index }) {
  const t = useTranslation();
  return (
    <div className="prof-unit-row" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="prof-unit-row-head">
        <div className="prof-unit-row-copy">
          <span className="prof-unit-row-label">{unit.label}</span>
          <span className="prof-unit-row-title">{unit.title}</span>
        </div>
        <span className={`prof-unit-badge${unit.unlocked ? " open" : ""}`}>{unit.progress}%</span>
      </div>
      <Bar pct={unit.progress} color="linear-gradient(90deg,#2f8bff,#6fe51f)" delay={index * 60} />
      <div className="prof-unit-row-foot">
        <span>{unit.completedLessons}/{unit.totalLessons} lessons</span>
        <span>{unit.unlocked ? t("stats.openText") : t("stats.lockedText")}</span>
      </div>
    </div>
  );
}

function AchBadge({ a, index }) {
  return (
    <div className={`prof-ach${a.unlocked ? " unlocked" : ""}`} style={{ animationDelay: `${index * 50}ms` }}>
      <span className="prof-ach-icon">{a.icon}</span>
      <span className="prof-ach-title">{a.title}</span>
      <span className="prof-ach-state">{a.unlocked ? "✓" : "🔒"}</span>
    </div>
  );
}

function StreakButtons() {
  const t = useTranslation();
  const [selected, setSelected] = useState("Thu");
  const days = [
    { label: "Mon", done: true },
    { label: "Tue", done: true },
    { label: "Wed", done: true },
    { label: "Thu", done: true },
    { label: "Fri", done: false },
  ];
  return (
    <fieldset className="prof-streak-card" aria-label="Five day streak tracker">
      <div className="prof-streak-head">
        <span>{t("stats.weekStreakLabel")}</span>
        <strong>{days.filter((d) => d.done).length}/5</strong>
      </div>
      <div className="prof-streak-days">
        {days.map((day) => (
          <button key={day.label} type="button" className={`prof-streak-day${day.done ? " done" : ""}${selected === day.label ? " active" : ""}`} onClick={() => setSelected(day.label)} aria-pressed={selected === day.label}>
            {day.label}
          </button>
        ))}
      </div>
    </fieldset>
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

export default function StatsLive() {
  const [profile, setProfile] = useState(null);
  const [units, setUnits] = useState(() => getUnitRows(hydrateLearningProgress(learningUnits)));
  const [tab, setTab] = useState("overview");
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [img, setImg] = useState(DEFAULT_PROFILE_IMAGE);
  const fileRef = useRef(null);

  useEffect(() => {
    const storedImage = window.localStorage.getItem(PROFILE_IMAGE_KEY);
    if (storedImage) setImg(storedImage);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, progressRes] = await Promise.all([fetch("/api/profile"), fetch("/api/progress")]);

        if (profileRes.status === 401 || progressRes.status === 401) {
          if (!cancelled) {
            setStatus("unauthorized");
          }
          return;
        }

        if (!profileRes.ok || !progressRes.ok) {
          const message = await profileRes.text();
          throw new Error(message || "Unable to load stats.");
        }

        const [profileData, progressData] = await Promise.all([profileRes.json(), progressRes.json()]);
        if (cancelled) return;

        setProfile(profileData);
        const updatedUnits = applyRemoteProgress(learningUnits, progressData);
        setUnits(getUnitRows(deriveLearningProgress(updatedUnits)));
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load stats.");
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setImg(reader.result);
      window.localStorage.setItem(PROFILE_IMAGE_KEY, reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  const t = useTranslation();

  if (status === "unauthorized") {
    return (
      <div className="prof-shell">
        <div className="prof-hero">
          <div className="prof-identity">
            <h1>{t("stats.unauthorizedTitle")}</h1>
            <p>{t("stats.unauthorizedCopy")}</p>
          </div>
        </div>
      </div>
    );
  }

  const heroMetrics = [
    { label: t("stats.heroMetricLearningProgress"), value: profile ? `${profile.progress}%` : "—" },
    { label: t("stats.heroMetricLessonsComplete"), value: profile ? profile.lessonsComplete : "—" },
    { label: t("stats.heroMetricAttendance"), value: profile ? profile.attendance : "—" },
  ];

  const STAT_PILLS = [
    { id: "hp", label: t("stats.statPillHP"), value: profile?.hp ?? 0, capacity: profile?.hpCapacity ?? 100, color: "#e05c7a", icon: "HP" },
    { id: "energy", label: t("stats.statPillEnergy"), value: profile?.energy ?? 0, capacity: profile?.energyCapacity ?? 100, color: "#22c55e", icon: "EN" },
    { id: "coins", label: t("stats.statPillCoins"), value: profile?.coins ?? 0, capacity: profile?.coinCapacity ?? 100, color: "#f59f00", icon: "$" },
    { id: "streak", label: t("stats.statPillStreak"), value: profile ? `${profile.streak ?? 7} days` : "—", color: "#267cff", icon: "ST" },
  ];

  const profileDetails = [
    { label: t("stats.profileDetailIndexNumber"), value: profile?.indexNumber ?? "—" },
    { label: t("stats.profileDetailFullName"), value: profile?.name ?? "—" },
    { label: t("stats.profileDetailPhoneNumber"), value: profile?.phoneNumber ?? "—" },
    { label: t("stats.profileDetailCounty"), value: profile?.county ?? "—" },
    { label: t("stats.profileDetailDrivingSchool"), value: profile?.drivingSchool ?? "—" },
    { label: t("stats.profileDetailAge"), value: profile?.age ?? "—" },
  ];

  const profilePerformanceCards = [
    { label: t("stats.profilePerformanceTheoryAccuracy"), value: profile?.quizAccuracy ?? "92%", meta: t("stats.profilePerformanceTheoryAccuracyMeta") },
    { label: t("stats.profilePerformanceLiveHours"), value: profile?.liveHours ?? "14.5h", meta: t("stats.profilePerformanceLiveHoursMeta") },
    { label: t("stats.profilePerformanceFocusRate"), value: profile?.focusRate ?? "81%", meta: t("stats.profilePerformanceFocusRateMeta") },
    { label: t("stats.profilePerformanceBadges"), value: profile?.badgesCount ?? 12, meta: t("stats.profilePerformanceBadgesMeta") },
  ];

  const completedUnits = units.filter((u) => u.progress === 100).length;
  const overallPct = units.length ? Math.round(units.reduce((sum, u) => sum + u.progress, 0) / units.length) : 0;

  return (
    <div className={`prof-shell${visible ? " visible" : ""}`}>
      <div className="prof-hero">
        <div className="prof-avatar-wrap">
          <div className="prof-avatar-ring">
            <Image src={img} alt={profile?.name ?? "Learner"} width={96} height={96} unoptimized className="prof-avatar-img" />
          </div>
          <button type="button" className="prof-avatar-btn" onClick={() => fileRef.current?.click()}>
            <svg viewBox="0 0 16 16" fill="none" width="11" height="11" aria-hidden="true">
              <path d="M8 2v8M4 6l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        </div>

        <div className="prof-identity">
          <div className="prof-identity-top">
            <div>
              <p className="prof-eyebrow">{t("stats.profileLabel")}</p>
              <h1 className="prof-name">{profile?.name ?? "Learner"}</h1>
              <p className="prof-sub">
                {profile?.indexNumber ?? "—"} · {profile?.drivingSchool ?? "—"}
              </p>
            </div>
            <div className="prof-chips">
              <span className="prof-chip">{profile?.level ?? "Level 01"}</span>
              <span className="prof-chip">{profile?.drivingClass ?? "Learner"}</span>
              <span className="prof-chip green">Online</span>
            </div>
          </div>

          <div className="prof-metrics-row">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="prof-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
            <div className="prof-metric">
              <strong>
                {completedUnits}/{units.length}
              </strong>
              <span>{t("stats.unitsDoneLabel")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prof-pills-row">
        {STAT_PILLS.map((pill) => (
          <StatPill key={pill.id} {...pill} />
        ))}
      </div>

      <StreakButtons />

      <div className="prof-overall">
        <div className="prof-overall-head">
          <span>{t("stats.overallProgressLabel")}</span>
          <strong>{overallPct}%</strong>
        </div>
        <Bar pct={overallPct} color="linear-gradient(90deg,#2563eb,#58cc02)" />
      </div>

      <div className="prof-tabs" role="tablist">
        {[
          { id: "overview", label: t("stats.tabOverview") },
          { id: "units", label: t("stats.tabUnits") },
          { id: "details", label: t("stats.tabDetails") },
          { id: "badges", label: t("stats.tabBadges") },
        ].map((tabButton) => (
          <Tab key={tabButton.id} id={tabButton.id} label={tabButton.label} active={tab === tabButton.id} onClick={setTab} />
        ))}
      </div>

      <div className="prof-panel">
        {tab === "overview" && (
          <div className="prof-overview-grid">
            {profilePerformanceCards.map((card) => (
              <div key={card.label} className="prof-perf-card">
                <strong className="prof-perf-value">{card.value}</strong>
                <span className="prof-perf-label">{card.label}</span>
                <span className="prof-perf-meta">{card.meta}</span>
              </div>
            ))}
            <div className="prof-focus-card">
              <span className="prof-focus-kicker">{t("dashboard.nextSessionLabel")}</span>
              <strong className="prof-focus-title">{profile?.nextSession ?? "—"}</strong>
              <div className="prof-focus-row">
                <span>{t("stats.mentorLabel")}</span>
                <strong>{profile?.mentor ?? "—"}</strong>
              </div>
              <div className="prof-focus-row">
                <span>{t("stats.roadHoursLabel")}</span>
                <strong>{profile?.roadHours ?? "—"}</strong>
              </div>
              <div className="prof-focus-row">
                <span>{t("stats.attendanceLabel")}</span>
                <strong>{profile?.attendance ?? "—"}</strong>
              </div>
            </div>
          </div>
        )}

        {tab === "units" && (
          <div className="prof-units-list">
            {units.map((unit, index) => (
              <UnitBar key={unit.id} unit={unit} index={index} />
            ))}
          </div>
        )}

        {tab === "details" && (
          <div className="prof-details-list">
            {profileDetails.map((detail) => (
              <InfoRow key={detail.label} label={detail.label} value={detail.value} />
            ))}
          </div>
        )}

        {tab === "badges" && (
          <div className="prof-ach-grid">
            {ACHIEVEMENTS.map((achievement, index) => (
              <AchBadge key={achievement.title} a={achievement} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
