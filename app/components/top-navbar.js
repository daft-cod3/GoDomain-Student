"use client";

import Image from "next/image";
import Link from "next/link";
import { studentProfile } from "../data/student-profile";
import LanguageToggle from "./language-toggle";
import { useThemePreference } from "./theme-state";

function getPercent(value, capacity) {
  if (!capacity) return 0;
  return Math.round((value / capacity) * 100);
}

/* ── compact stat bar (HP / Energy) ── */
function StatBar({ label, value, capacity, color, track, icon, href }) {
  const pct = getPercent(value, capacity);
  return (
    <Link className="nb2-stat" href={href} aria-label={`${label}: ${value}/${capacity}`} style={{ "--nb2-color": color }}>
      <span className="nb2-stat-icon" aria-hidden="true" style={{ color }}>
        {icon}
      </span>
      <div className="nb2-stat-body">
        <div className="nb2-stat-row">
          <span className="nb2-stat-label">{label}</span>
          <strong className="nb2-stat-val">{value}<em>/{capacity}</em></strong>
        </div>
        <div className="nb2-stat-track" aria-hidden="true">
          <span className="nb2-stat-fill" style={{ width: `${pct}%`, background: track }} />
        </div>
      </div>
    </Link>
  );
}

const HP_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M10 17.5S2.5 13 2.5 7.5a4 4 0 0 1 7.5-1.9A4 4 0 0 1 17.5 7.5C17.5 13 10 17.5 10 17.5z" />
  </svg>
);

const ENERGY_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" />
  </svg>
);

const COIN_ICON = (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22" aria-hidden="true">
    <circle cx="11" cy="11" r="9.5" fill="#ffd166" stroke="#f59f00" strokeWidth="1.5" />
    <text x="11" y="15.2" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7b4d00">$</text>
  </svg>
);

export default function TopNavbar() {
  const { theme, mounted, toggleTheme } = useThemePreference();
  const darkMode = mounted && theme === "dark";

  return (
    <header className="nb2-root">

      {/* ── Brand (left) ── */}
      <Link className="nb2-brand" href="/" aria-label="GoDomain home">
        <span className="nb2-brand-logo">
          <Image src="/godomain-logo.svg" alt="GoDomain" width={30} height={30} />
        </span>
        <span className="nb2-brand-copy">
          <span className="nb2-brand-name">GoDomain</span>
          <span className="nb2-brand-sub">Learning workspace</span>
        </span>
      </Link>

      {/* ── Vitals: HP + Energy side-by-side (centre-left) ── */}
      <div className="nb2-vitals">
        <StatBar
          label="HP"
          value={studentProfile.hp}
          capacity={studentProfile.hpCapacity}
          color="#e05c7a"
          track="linear-gradient(90deg,#ff6b9d,#e0365a)"
          icon={HP_ICON}
          href="/stats"
        />
        <StatBar
          label="EN"
          value={studentProfile.energy}
          capacity={studentProfile.energyCapacity}
          color="#3ecf6e"
          track="linear-gradient(90deg,#58d17a,#1f9f57)"
          icon={ENERGY_ICON}
          href="/stats"
        />
      </div>

      {/* ── Right cluster: Language · Theme · Coins ── */}
      <div className="nb2-controls">

        {/* Language toggle */}
        <div className="nb2-ctrl-wrap">
          <LanguageToggle />
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          className={`nb2-theme${darkMode ? " nb2-theme--dark" : ""}`}
          onClick={toggleTheme}
          aria-pressed={darkMode}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          title={`Switch to ${darkMode ? "light" : "dark"} mode`}
          data-no-translate
        >
          <span className="nb2-theme-track" aria-hidden="true">
            <span className="nb2-theme-thumb">
              {darkMode ? (
                <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
                  <path d="M17.5 10.8A7.5 7.5 0 1 1 9.2 2.5 5.8 5.8 0 0 0 17.5 10.8z" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
                  <circle cx="10" cy="10" r="3.5" />
                  <path d="M10 2v2M10 16v2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M2 10h2M16 10h2M3.5 16.5l1.4-1.4M15.1 4.9l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              )}
            </span>
          </span>
          <span className="nb2-theme-label">{darkMode ? "Dark" : "Light"}</span>
        </button>

        {/* Coins */}
        <Link
          className="nb2-coins"
          href="/stats"
          aria-label={`Coins: ${studentProfile.coins}`}
          title={`Coins: ${studentProfile.coins}`}
        >
          <span className="nb2-coins-icon" aria-hidden="true">{COIN_ICON}</span>
          <div className="nb2-coins-body">
            <strong className="nb2-coins-val">{studentProfile.coins}</strong>
            <span className="nb2-coins-label">coins</span>
          </div>
        </Link>

      </div>
    </header>
  );
}
