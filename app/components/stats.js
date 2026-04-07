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
      (sum, lesson) => sum + lesson.lessons.filter((entry) => entry.completed).length,
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
    label: "Next session",
    value: studentProfile.nextSession,
    meta: "Upcoming focus",
  },
];

const statCards = [
  {
    id: "hp",
    label: "HP",
    value: studentProfile.hp,
    cap: studentProfile.hpCapacity,
    bg: "rgba(224,92,122,0.12)",
    accent: "#e05c7a",
    bar: "linear-gradient(90deg,#ff6b9d,#e0365a)",
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
    bg: "rgba(34,197,94,0.12)",
    accent: "#22c55e",
    bar: "linear-gradient(90deg,#4ade80,#16a34a)",
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
    bg: "rgba(245,159,0,0.12)",
    accent: "#f59f00",
    bar: "linear-gradient(90deg,#ffd166,#f59f00)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="15" height="15">
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="#ffd166"
          stroke="#f59f00"
          strokeWidth="1.5"
        />
        <text
          x="10"
          y="14"
          textAnchor="middle"
          fontSize="8"
          fontWeight="800"
          fill="#7b4d00"
        >
          $
        </text>
      </svg>
    ),
  },
];

const tabs = [
  { id: "details", label: "Details" },
  { id: "progress", label: "Progress" },
  { id: "snapshot", label: "Snapshot" },
];

const panelClass =
  "rounded-[28px] border border-[rgba(38,124,255,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(242,248,255,0.92))] p-4 shadow-[0_18px_36px_rgba(7,16,24,0.06)] backdrop-blur-xl dark:border-[rgba(83,162,255,0.16)]";

const cardClass =
  "rounded-[22px] border border-[rgba(38,124,255,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,249,255,0.94))] p-4 shadow-[0_14px_28px_rgba(7,16,24,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(7,16,24,0.08)] dark:border-[rgba(83,162,255,0.16)]";

function StatCard({ stat }) {
  const pct = Math.round((stat.value / stat.cap) * 100);

  return (
    <article
      className="grid gap-3 rounded-[22px] border border-white/12 bg-white/10 p-4 text-white shadow-[0_16px_32px_rgba(7,16,24,0.12)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 max-[560px]:grid-cols-[auto_1fr_auto]">
        <span
          className="grid h-8 w-8 place-items-center rounded-[11px]"
          style={{ background: stat.bg, color: stat.accent }}
        >
          {stat.icon}
        </span>
        <span className="text-xs font-semibold tracking-[0.08em] uppercase text-white/72 max-[560px]:col-span-2 max-[560px]:col-start-2 max-[560px]:row-start-1">
          {stat.label}
        </span>
        <strong className="justify-self-end font-[var(--font-display)] text-xl max-[560px]:col-start-2 max-[560px]:row-start-2 max-[560px]:justify-self-start">
          {stat.value}
          <em className="ml-1 text-xs not-italic text-white/60">/{stat.cap}</em>
        </strong>
        <span className="text-xs font-bold text-white/82 max-[560px]:row-span-2 max-[560px]:row-start-1">
          {pct}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-white/12">
        <span
          className="block h-full rounded-full"
          style={{ width: `${pct}%`, background: stat.bar }}
        />
      </div>
    </article>
  );
}

export default function Stats() {
  const [unitProgress, setUnitProgress] = useState(() =>
    getUnitProgressRows(learningUnits),
  );
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [activeTab, setActiveTab] = useState("details");
  const fileRef = useRef(null);

  useEffect(() => {
    setUnitProgress(getUnitProgressRows(hydrateLearningProgress(learningUnits)));

    const stored = window.localStorage.getItem(PROFILE_IMAGE_KEY);

    if (stored) {
      setProfileImage(stored);
    }
  }, []);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setProfileImage(reader.result);
      window.localStorage.setItem(PROFILE_IMAGE_KEY, reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  const openUnits = unitProgress.filter((unit) => unit.unlocked).length;
  const completedUnits = unitProgress.filter((unit) => unit.progress === 100).length;
  const leadingUnit =
    [...unitProgress].sort((left, right) => right.progress - left.progress)[0] ??
    null;

  return (
    <section className="mx-auto grid max-w-7xl gap-5 text-[var(--text)]">
      <header
        className="relative overflow-hidden rounded-[32px] p-5 text-white shadow-[0_24px_48px_rgba(7,16,24,0.14)] sm:p-6 lg:p-7"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(111,229,31,0.14), transparent 28%), radial-gradient(circle at left center, rgba(38,124,255,0.18), transparent 34%), linear-gradient(135deg, #0f2237 0%, #143356 52%, #205886 100%)",
        }}
      >
        <div className="pointer-events-none absolute -top-16 right-[8%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_62%)] opacity-60" />
        <div className="pointer-events-none absolute -bottom-20 left-[8%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(111,229,31,0.18),transparent_60%)] opacity-60" />

        <div className="relative z-[1] grid gap-5 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="grid items-center gap-5 lg:grid-cols-[auto_minmax(0,1fr)]">
            <div className="grid justify-items-start gap-3">
              <div className="grid h-[148px] w-[148px] place-items-center rounded-[30px] border border-white/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] p-2 shadow-[0_22px_40px_rgba(7,16,24,0.18)]">
                <div className="h-full w-full overflow-hidden rounded-[24px] bg-white/10">
                  <img
                    src={profileImage}
                    alt={studentProfile.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <button
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/12 px-4 text-xs font-extrabold tracking-[0.05em] text-white transition hover:-translate-y-0.5 hover:bg-white/16"
                type="button"
                onClick={() => fileRef.current?.click()}
              >
                <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                  <path
                    d="M8 2v8M4 6l4-4 4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 13h12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Change photo
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </div>

            <div className="grid gap-3">
              <span className="inline-flex w-fit items-center rounded-full bg-white/12 px-3 py-1 text-[11px] font-extrabold tracking-[0.1em] uppercase text-white">
                Student profile
              </span>

              <div className="grid gap-2">
                <h1 className="m-0 font-[var(--font-display)] text-[clamp(32px,4vw,50px)] leading-[0.96]">
                  {studentProfile.name}
                </h1>
                <p className="m-0 max-w-[58ch] text-sm leading-7 text-white/78">
                  A modern learner overview with cleaner hierarchy for profile
                  details, unit progress, and study snapshot metrics.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex min-h-8 items-center rounded-full border border-white/14 bg-white/10 px-3 text-xs font-bold text-white">
                  {studentProfile.level}
                </span>
                <span className="inline-flex min-h-8 items-center rounded-full border border-white/14 bg-white/10 px-3 text-xs font-bold text-white">
                  {studentProfile.drivingClass}
                </span>
                <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(111,229,31,0.22)] bg-[rgba(111,229,31,0.14)] px-3 text-xs font-bold text-white">
                  Online
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="grid gap-1.5 rounded-[20px] border border-white/12 bg-white/8 p-3.5"
                  >
                    <strong className="font-[var(--font-display)] text-2xl">
                      {metric.value}
                    </strong>
                    <span className="text-xs leading-5 text-white/72">
                      {metric.label}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="grid gap-3">
            <article className="grid gap-3 rounded-[24px] border border-white/14 bg-white/10 p-4 shadow-[0_18px_34px_rgba(7,16,24,0.16)] backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-[0.08em] uppercase text-white/72">
                  Current focus
                </span>
                <span className="inline-flex min-h-7 items-center rounded-full bg-white/10 px-3 text-[11px] font-extrabold tracking-[0.06em] uppercase text-white">
                  {openUnits}/4 units open
                </span>
              </div>

              <div className="grid gap-2">
                <strong className="font-[var(--font-display)] text-2xl leading-tight">
                  {studentProfile.nextSession}
                </strong>
                <p className="m-0 text-sm leading-6 text-white/74">
                  Mentor {studentProfile.mentor} is guiding the next practical
                  block while the strongest active unit stays visible here.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-3">
                <article className="grid gap-1 rounded-[18px] bg-white/8 p-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/72">
                    Leading unit
                  </span>
                  <strong className="font-[var(--font-display)] text-lg">
                    {leadingUnit?.label ?? "None"}
                  </strong>
                </article>
                <article className="grid gap-1 rounded-[18px] bg-white/8 p-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/72">
                    Best progress
                  </span>
                  <strong className="font-[var(--font-display)] text-lg">
                    {leadingUnit?.progress ?? 0}%
                  </strong>
                </article>
                <article className="grid gap-1 rounded-[18px] bg-white/8 p-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/72">
                    Units complete
                  </span>
                  <strong className="font-[var(--font-display)] text-lg">
                    {completedUnits}
                  </strong>
                </article>
              </div>
            </article>

            <div className="grid gap-3">
              {statCards.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </aside>
        </div>
      </header>

      <div className="flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full border border-[rgba(38,124,255,0.12)] bg-white/72 p-1.5 shadow-[0_10px_22px_rgba(7,16,24,0.06)] dark:border-[rgba(83,162,255,0.16)] dark:bg-[rgba(13,17,22,0.78)]">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`min-h-10 rounded-full px-4 text-sm font-extrabold transition ${
                active
                  ? "bg-[linear-gradient(135deg,var(--accent-blue)_0%,var(--accent)_100%)] text-white shadow-[0_12px_24px_rgba(38,124,255,0.22)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "details" ? (
        <section className={panelClass} role="tabpanel">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="font-[var(--font-display)] text-xl font-bold">
                Learner details
              </div>
              <div className="text-sm leading-6 text-[var(--muted)]">
                Core profile information and learner record details.
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {profileDetails.map((detail) => (
              <article key={detail.label} className={cardClass}>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--muted)]">
                  {detail.label}
                </span>
                <strong className="font-[var(--font-display)] text-2xl leading-tight">
                  {detail.value}
                </strong>
                <p className="m-0 text-sm leading-6 text-[var(--muted)]">
                  {detail.hint}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "progress" ? (
        <section className={panelClass} role="tabpanel">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="font-[var(--font-display)] text-xl font-bold">
                Unit progress
              </div>
              <div className="text-sm leading-6 text-[var(--muted)]">
                Track unit completion, lesson coverage, and unlocked routes.
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {unitProgress.map((unit) => (
              <article key={unit.id} className={cardClass}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="grid gap-1">
                    <strong className="font-[var(--font-display)] text-xl">
                      {unit.label}
                    </strong>
                    <span className="text-sm text-[var(--muted)]">{unit.title}</span>
                  </div>

                  <span
                    className={`inline-flex w-fit min-h-8 items-center rounded-full px-3 text-[11px] font-extrabold uppercase tracking-[0.06em] ${
                      unit.unlocked
                        ? "border border-[rgba(68,192,107,0.16)] bg-[rgba(68,192,107,0.12)] text-[#268149] dark:text-[#7be48d]"
                        : "border border-[rgba(38,124,255,0.12)] bg-[rgba(38,124,255,0.08)] text-[#2568c7] dark:text-[#9dcbff]"
                    }`}
                  >
                    {unit.unlocked ? "Open" : "Locked"}
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    {unit.completedLessons}/{unit.totalLessons} lessons complete
                  </span>
                  <strong className="font-[var(--font-display)] text-2xl">
                    {unit.progress}%
                  </strong>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-[rgba(28,42,29,0.08)] dark:bg-white/8">
                  <span
                    className="block h-full rounded-full bg-[linear-gradient(90deg,#2f8bff_0%,#6fe51f_100%)]"
                    style={{ width: `${unit.progress}%` }}
                  />
                </div>

                <div className="flex flex-col gap-1 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
                  <span>{unit.unlocked ? "Available now" : "Unlocks later"}</span>
                  <span>{100 - unit.progress}% remaining</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "snapshot" ? (
        <section className={panelClass} role="tabpanel">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="font-[var(--font-display)] text-xl font-bold">
                Study snapshot
              </div>
              <div className="text-sm leading-6 text-[var(--muted)]">
                Short performance and learner-state indicators for quick review.
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="grid gap-3 md:grid-cols-2">
              {profileHighlights.map((highlight) => (
                <article key={highlight.label} className={cardClass}>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--muted)]">
                    {highlight.label}
                  </span>
                  <strong className="font-[var(--font-display)] text-2xl leading-tight">
                    {highlight.value}
                  </strong>
                  <p className="m-0 text-sm leading-6 text-[var(--muted)]">
                    {highlight.meta}
                  </p>
                </article>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {profilePerformanceCards.map((card) => (
                <article key={card.label} className={cardClass}>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--muted)]">
                    {card.label}
                  </span>
                  <strong className="font-[var(--font-display)] text-2xl leading-tight">
                    {card.value}
                  </strong>
                  <p className="m-0 text-sm leading-6 text-[var(--muted)]">
                    {card.meta}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
}
