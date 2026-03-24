"use client";

import { useEffect, useState } from "react";
import {
  moduleProgress,
  profileTools,
  studentProfile,
} from "../data/student-profile";

const THEME_KEY = "godomain-theme";

export default function Setting() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const settingPreferences = [
    {
      label: "Theme mode",
      value: theme === "dark" ? "Dark mode" : "Light mode",
      hint: "Applies across dashboard, lessons, and profile pages.",
    },
    {
      label: "Profile page",
      value: "Moved to Profile",
      hint: "Personal details now live on the page previously labeled Stats.",
    },
    {
      label: "Alerts",
      value: "Lesson reminders on",
      hint: "Uploads, live sessions, and notifications stay visible.",
    },
    {
      label: "Mentor sharing",
      value: "Enabled",
      hint: "Your assigned mentor can review current learner progress.",
    },
  ];

  return (
    <section className="settings-profile">
      <header className="settings-profile-hero card settings-preferences-hero">
        <div className="settings-profile-hero-top">
          <div>
            <div className="settings-profile-eyebrow">Workspace settings</div>
            <h1 className="settings-profile-title">
              Preferences and study tools
            </h1>
            <p className="settings-profile-subtitle">
              Use this page for display mode, alerts, and session tools. The
              personal learner record now lives under Profile.
            </p>
          </div>
          <button
            className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label="Toggle theme"
          >
            <span className="toggle-knob" />
            <span className="toggle-text">
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </span>
          </button>
        </div>

        <div className="settings-preferences-summary">
          <div className="settings-preference-chip">
            <strong>{studentProfile.track}</strong>
            <span>Active learner track</span>
          </div>
          <div className="settings-preference-chip">
            <strong>{studentProfile.nextSession}</strong>
            <span>Next session focus</span>
          </div>
          <div className="settings-preference-chip">
            <strong>{studentProfile.attendance}</strong>
            <span>Attendance status</span>
          </div>
        </div>
      </header>

      <div className="settings-profile-layout">
        <section className="settings-profile-panel card">
          <div className="settings-profile-section-head">
            <div>
              <div className="settings-profile-section-kicker">
                Study preferences
              </div>
              <h3 className="settings-profile-section-title">
                Workspace setup
              </h3>
            </div>
          </div>

          <div className="settings-profile-detail-grid">
            {settingPreferences.map((detail, index) => (
              <article
                key={detail.label}
                className="settings-profile-detail-card"
                style={{ "--tile-delay": `${index * 80}ms` }}
              >
                <div className="settings-profile-detail-label">
                  {detail.label}
                </div>
                <div className="settings-profile-detail-value">
                  {detail.value}
                </div>
                <div className="settings-profile-detail-hint">
                  {detail.hint}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="settings-profile-side">
          <section className="settings-profile-panel settings-progress-panel card">
            <div className="settings-profile-section-kicker">
              Active modules
            </div>
            <h3 className="settings-profile-section-title">Study visibility</h3>
            <p className="settings-profile-panel-note">
              Keep a quick read on the key theory areas that still need
              attention before the next practical session.
            </p>

            <div className="settings-progress-stack">
              {moduleProgress.map((module) => (
                <div key={module.label} className="settings-progress-item">
                  <div className="settings-progress-item-row">
                    <span>{module.label}</span>
                    <span>{module.value}%</span>
                  </div>
                  <div
                    className="settings-progress-mini-track"
                    aria-hidden="true"
                  >
                    <span style={{ width: `${module.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="settings-profile-panel settings-tools-panel card">
            <div className="settings-profile-section-kicker">Tools</div>
            <h3 className="settings-profile-section-title">Quick controls</h3>

            <div className="settings-tools-list">
              {profileTools.map((tool, index) => (
                <article
                  key={tool.title}
                  className="settings-tool-card"
                  style={{ "--tile-delay": `${index * 90}ms` }}
                >
                  <div>
                    <div className="settings-tool-title">{tool.title}</div>
                    <div className="settings-tool-description">
                      {tool.description}
                    </div>
                  </div>
                  <button className="ghost-button" type="button">
                    Manage
                  </button>
                </article>
              ))}
            </div>

            <div className="settings-next-session">
              <div className="settings-next-session-label">Next practical</div>
              <div className="settings-next-session-value">
                {studentProfile.nextSession}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
