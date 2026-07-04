"use client";

import "../sidebar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    caption: "Uploads & progress",
    icon: "dashboard",
  },
  {
    id: "learn",
    label: "Learn",
    href: "/content",
    caption: "Lessons & units",
    icon: "learn",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/stats",
    caption: "Details & coins",
    icon: "profile",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    caption: "Theme & tools",
    icon: "settings",
  },
];

function getSection(pathname, fallback) {
  if (!pathname || pathname === "/" || pathname.startsWith("/dashboard"))
    return "dashboard";
  if (pathname.startsWith("/content")) return "learn";
  if (pathname.startsWith("/stats")) return "profile";
  if (pathname.startsWith("/settings")) return "settings";
  return fallback;
}

function Icon({ name }) {
  const base = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    width: "18",
    height: "18",
    "aria-hidden": "true",
  };

  /* Dashboard — grid of tiles */
  if (name === "dashboard")
    return (
      <svg {...base} strokeWidth="1.8">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="5" rx="2" />
        <rect x="13" y="11" width="8" height="10" rx="2" />
        <rect x="3" y="14" width="8" height="7" rx="2" />
      </svg>
    );

  /* Learn — graduation cap */
  if (name === "learn")
    return (
      <svg {...base} strokeWidth="1.9">
        <path d="M22 10L12 5 2 10l10 5 10-5z" strokeLinejoin="round" />
        <path
          d="M6 12.5V17c0 1.657 2.686 3 6 3s6-1.343 6-3v-4.5"
          strokeLinecap="round"
        />
        <line x1="22" y1="10" x2="22" y2="15" strokeLinecap="round" />
      </svg>
    );

  /* Profile — user silhouette */
  if (name === "profile")
    return (
      <svg {...base} strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    );

  /* Settings — gear */
  if (name === "settings")
    return (
      <svg {...base} strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );

  return (
    <svg {...base} strokeWidth="1.9">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export default function Sidebar({ active = "dashboard" }) {
  const pathname = usePathname();
  const activeId = getSection(pathname, active);
  const [expanded, setExpanded] = useState(false);
  const collapseTimer = useRef(null);

  useEffect(() => {
    clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setExpanded(false), 1800);
    return () => clearTimeout(collapseTimer.current);
  }, [pathname]);

  useEffect(() => () => clearTimeout(collapseTimer.current), []);

  function handleMouseEnter() {
    clearTimeout(collapseTimer.current);
    setExpanded(true);
  }

  function handleMouseLeave() {
    clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setExpanded(false), 120);
  }

  function handleFocus() {
    clearTimeout(collapseTimer.current);
    setExpanded(true);
  }

  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = setTimeout(() => setExpanded(false), 120);
    }
  }

  return (
    <aside
      className="sb-shell sb-shell--refined"
      data-expanded={expanded ? "true" : "false"}
      aria-label="Primary navigation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div
        className={`sb-panel sb-panel--refined${expanded ? " expanded" : ""}`}
        id="app-sidebar"
      >
        {/* ── Brand ── */}
        <Link className="sb-brand" href="/" title="GoDomain dashboard">
          <span className="sb-brand-mark" aria-hidden="true">
            <Image
              src="/godomain-logo.svg"
              alt="GoDomain"
              width={20}
              height={20}
              priority
            />
          </span>
          <span className="sb-text sb-brand-copy">
            <span className="sb-brand-title">GoDomain</span>
            <span className="sb-brand-sub">Workspace</span>
          </span>
        </Link>

        {/* ── Nav ── */}
        <nav className="sb-nav" aria-label="Main navigation">
          <span className="sb-nav-kicker sb-text">Menu</span>

          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`sb-nav-link${isActive ? " sb-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
              >
                <span className="sb-icon">
                  <Icon name={item.icon} />
                </span>
                <span className="sb-nav-label-always">{item.label}</span>
                <span className="sb-text sb-nav-caption-wrap">
                  <span className="sb-nav-caption">{item.caption}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="sb-footer sb-text">
          <div className="sb-streak">
            <div className="sb-streak-row">
              <span className="sb-streak-label">8-day streak</span>
              <span className="sb-streak-pill">78%</span>
            </div>
            <div className="sb-streak-bar">
              <span style={{ width: "78%" }} />
            </div>
            <p className="sb-streak-note">2 more to unlock bonus gems.</p>
          </div>
          <Link className="sb-cta" href="/content">
            Continue learning
          </Link>
        </div>
      </div>
    </aside>
  );
}
