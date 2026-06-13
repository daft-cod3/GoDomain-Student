"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { studentProfile } from "../data/student-profile";
import { useThemePreference, useLanguagePreference } from "./theme-state";
import { useTranslation } from "./translations";

const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "luo", label: "Luo" },
  { id: "ki", label: "Kikuyu" },
  { id: "sw", label: "Kiswahili" },
];

function getPercent(value, capacity) {
  if (!capacity) return 0;
  return Math.round((value / capacity) * 100);
}

const STAT_META = {
  hp: {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.65-7 9-7 9z"
          fill="currentColor"
        />
      </svg>
    ),
    color: "#e05c7a",
    glow: "rgba(224,92,122,0.28)",
    track: "linear-gradient(90deg,#ff6b9d,#e0365a)",
    labelKey: "topNavbar.hpLabel",
  },
  energy: {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" fill="currentColor" />
      </svg>
    ),
    color: "#3ecf6e",
    glow: "rgba(62,207,110,0.28)",
    track: "linear-gradient(90deg,#58d17a,#1f9f57)",
    labelKey: "topNavbar.energyLabel",
  },
};

function NavbarMeter({ tone, value, capacity }) {
  const t = useTranslation();
  const meta = STAT_META[tone];
  const label = meta.labelKey ? t(meta.labelKey) : meta.label;
  const pct = getPercent(value, capacity);
  return (
    <Link
      className={`top-navbar-meter ${tone}`}
      href="/stats"
      aria-label={`${label}: ${value}/${capacity}`}
      title={`${label}: ${value}/${capacity}`}
      style={{ "--meter-glow": meta.glow, "--meter-color": meta.color }}
    >
      <span className="top-navbar-meter-icon" style={{ color: meta.color }}>
        {meta.icon}
      </span>
      <div className="top-navbar-meter-body">
        <div className="top-navbar-meter-row">
          <span className="top-navbar-meter-label">{label}</span>
          <strong className="top-navbar-meter-val">
            {value}
            <em>/{capacity}</em>
          </strong>
        </div>
        <div className="top-navbar-meter-track" aria-hidden="true">
          <span style={{ width: `${pct}%`, background: meta.track }} />
        </div>
      </div>
    </Link>
  );
}

export default function TopNavbar() {
  const t = useTranslation();
  const { theme, mounted, toggleTheme } = useThemePreference();
  const { language, setLanguage } = useLanguagePreference();
  const darkMode = mounted && theme === "dark";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let active = true;
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (active && data) {
          setProfile(data);
        }
      })
      .catch(() => {
        // keep fallback profile
      });
    return () => {
      active = false;
    };
  }, []);

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  const effectiveProfile = profile || studentProfile;

  return (
    <header className="top-navbar no-search">

      {/* LEFT — logo */}
      <div className="top-navbar-leading">
        <Link
          className="top-navbar-brand"
          href="/"
          aria-label={t("topNavbar.brandLabel")}
        >
          <span className="top-navbar-brand-mark">
            <Image
              src="/godomain-logo.svg"
              alt="GoDomain logo"
              width={30}
              height={30}
            />
          </span>
          <span className="top-navbar-brand-copy">
            <span className="top-navbar-brand-label">
              {t("topNavbar.brandLabel")}
            </span>
            <span className="top-navbar-brand-subtitle">
              {t("topNavbar.brandSubtitle")}
            </span>
          </span>
        </Link>
      </div>

      {/* CENTER — language selector */}
      <div className="top-navbar-center">
        <div className="top-navbar-language">
          <select
            value={language}
            onChange={handleLanguageChange}
            aria-label={t("topNavbar.languageSelectorLabel")}
          >
            {LANGUAGES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT — vitals, coins */}
      <div className="top-navbar-stats top-navbar-stats-right">
        <button
          type="button"
          className={`top-navbar-theme-toggle${darkMode ? " dark" : ""}`}
          onClick={toggleTheme}
          aria-pressed={darkMode}
          aria-label={
            darkMode
              ? t("topNavbar.themeSwitchLight")
              : t("topNavbar.themeSwitchDark")
          }
        >
          <span className="top-navbar-theme-icon" aria-hidden="true">
            {darkMode
              ? <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M13.8 2.8a6.8 6.8 0 1 0 3.4 12.7A7.5 7.5 0 1 1 13.8 2.8Z"
                    fill="currentColor"
                  />
                </svg>
              : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="3.1" fill="currentColor" />
                  <path
                    d="M10 2.2V4.1M10 15.9v1.9M17.8 10h-1.9M4.1 10H2.2M15.5 4.5 14.1 5.9M5.9 14.1 4.5 15.5M15.5 15.5 14.1 14.1M5.9 5.9 4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>}
          </span>
        </button>
        <fieldset className="top-navbar-vitals" aria-label={t("topNavbar.vitalsLabel")}>
          <NavbarMeter
            tone="hp"
            value={effectiveProfile.hp}
            capacity={effectiveProfile.hpCapacity}
          />
          <NavbarMeter
            tone="energy"
            value={effectiveProfile.energy}
            capacity={effectiveProfile.energyCapacity}
          />
        </fieldset>
        <Link
          className="top-navbar-coins"
          href="/stats"
          aria-label={`${t("topNavbar.coinsLabel")}: ${effectiveProfile.coins}`}
          title={`${t("topNavbar.coinsLabel")}: ${effectiveProfile.coins}`}
        >
          <span className="top-navbar-coins-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
                fontSize="9"
                fontWeight="800"
                fill="#7b4d00"
              >
                $
              </text>
            </svg>
          </span>
          <strong className="top-navbar-coins-val">
            {effectiveProfile.coins}
          </strong>
        </Link>
      </div>


      {/* RIGHT — vitals, coins (theme toggle + meters already inside) */}


    </header>
  );
}
