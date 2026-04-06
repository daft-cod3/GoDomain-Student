"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    caption: "Uploads & progress",
    icon: "dashboard",
  },
  {
    id: "path",
    label: "Learning Path",
    href: "/content",
    caption: "Lesson circles",
    icon: "path",
  },
  {
    id: "stats",
    label: "Profile",
    href: "/stats",
    caption: "Details & coins",
    icon: "stats",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    caption: "Theme & tools",
    icon: "settings",
  },
];

const UTIL_ITEMS = [
  {
    id: "live",
    label: "Live",
    href: "/live",
    caption: "Session room",
    badge: "Now",
  },
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    caption: "Inbox",
    badge: "Inbox",
  },
  {
    id: "notifications",
    label: "Alerts",
    href: "/notifications",
    caption: "Updates",
    badge: "3 new",
  },
];

const COLLAPSE_KEY = "godomain-sidebar-collapsed";

function getSection(pathname, fallback) {
  if (!pathname || pathname === "/" || pathname.startsWith("/dashboard")) {
    return "dashboard";
  }
  if (pathname.startsWith("/content")) {
    return "path";
  }
  if (pathname.startsWith("/stats")) {
    return "stats";
  }
  if (pathname.startsWith("/settings")) {
    return "settings";
  }
  return fallback;
}

function Icon({ name }) {
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
  };

  if (name === "dashboard") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path
          d="M4 5H11V11H4V5ZM13 5H20V8H13V5ZM13 10H20V19H13V10ZM4 13H11V19H4V13Z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "path") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path d="M5 18C9 18 9 6 13 6C17 6 17 18 21 18" strokeLinecap="round" />
        <circle cx="5" cy="18" r="2" fill="currentColor" stroke="none" />
        <circle cx="13" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="21" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "stats") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path d="M5 19V11M12 19V5M19 19V14" strokeLinecap="round" />
        <path d="M4 19H20" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <circle cx="12" cy="12" r="3.5" />
        <path
          d="M19 12c0-.5-.1-1-.2-1.5l1.7-1.3-1.7-3-2 .8c-.7-.6-1.5-1.1-2.4-1.3L14.1 3.5h-3.4l-.3 2.2C9.5 5.9 8.7 6.4 8 7l-2-.8-1.7 3L6 10.5C5.9 11 5.8 11.5 5.8 12s.1 1 .2 1.5L4.3 14.8l1.7 3 2-.8c.7.6 1.5 1.1 2.4 1.3l.3 2.2h3.4l.3-2.2c.9-.2 1.7-.7 2.4-1.3l2 .8 1.7-3-1.7-1.3c.1-.5.2-1 .2-1.5z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "live") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <rect x="4" y="6" width="11" height="12" rx="2.5" />
        <path d="M15 10L20 7V17L15 14V10Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "messages") {
    return (
      <svg {...props}>
        <title>{title}</title>
        <path d="M5 6H19V15H8L5 18V6Z" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <title>{title}</title>
      <path
        d="M7 10C7 7.2 9 5 12 5C15 5 17 7.2 17 10V13L19 15H5L7 13V10Z"
        strokeLinejoin="round"
      />
      <path
        d="M10 18C10.5 18.8 11.2 19.2 12 19.2C12.8 19.2 13.5 18.8 14 18"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Sidebar({ active = "dashboard" }) {
  const pathname = usePathname();
  const activeSection = getSection(pathname, active);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "true" : "false");
  }, [collapsed]);

  useEffect(() => {
    if (pathname) {
      setMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className={`sb-shell${collapsed ? " collapsed" : ""}`}>
      <div className="sb-mobile-bar">
        <button
          className={`sb-hamburger${menuOpen ? " open" : ""}`}
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="sb-mobile-copy">
          <span className="sb-mobile-title">GoDomain</span>
          <span className="sb-mobile-sub">Learning route</span>
        </div>

        <div className="sb-mobile-avatar">AR</div>
      </div>

      <button
        className={`sb-overlay${menuOpen ? " open" : ""}`}
        type="button"
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`sb-panel${menuOpen ? " open" : ""}${collapsed ? " collapsed" : ""}`}
        id="app-sidebar"
      >
        <div className="sb-brand-row">
          <button
            className="sb-collapse-btn"
            type="button"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="sb-brand-mark">G</div>

          <div className="sb-brand-copy">
            <span className="sb-brand-name">GoDomain</span>
            <span className="sb-brand-sub">Student workspace</span>
          </div>

          <button
            className="sb-close-btn"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M7 7L17 17M17 7L7 17" />
            </svg>
          </button>
        </div>

        <div className="sb-content">
          <Link
            href="/stats"
            className="sb-profile-card"
            onClick={() => setMenuOpen(false)}
            title={collapsed ? "Open profile" : undefined}
          >
            <div className="sb-profile-avatar">AR</div>
            <div className="sb-profile-info">
              <span className="sb-profile-name">Ari Rowe</span>
              <span className="sb-profile-meta">Class B / Unit 7</span>
              <div className="sb-profile-bar">
                <span style={{ width: "78%" }} />
              </div>
            </div>
            <div className="sb-profile-side">
              <span className="sb-profile-progress-tag">78% done</span>
              <span className="sb-profile-dot" />
            </div>
          </Link>

          <section className="sb-section">
            <div className="sb-section-head">
              <span className="sb-section-kicker">Main route</span>
              <span className="sb-section-badge">{NAV_ITEMS.length} views</span>
            </div>

            <nav className="sb-nav" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === activeSection;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`sb-nav-link${isActive ? " active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={`sb-nav-icon sb-icon-${item.id}`}>
                      <Icon name={item.icon} />
                    </span>
                    <span className="sb-nav-text">
                      <span className="sb-nav-label">{item.label}</span>
                      <span className="sb-nav-caption">{item.caption}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </section>

          <section className="sb-section sb-section-tools">
            <div className="sb-section-head">
              <span className="sb-section-kicker">Quick access</span>
              <span className="sb-section-badge">Fast tools</span>
            </div>

            <div className="sb-quick-grid">
              {UTIL_ITEMS.map((item, index) => {
                const isActive =
                  pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const isWide = index === UTIL_ITEMS.length - 1 && UTIL_ITEMS.length % 2 === 1;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`sb-quick-link${isActive ? " active" : ""}${isWide ? " wide" : ""}`}
                    aria-label={item.label}
                    onClick={() => setMenuOpen(false)}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sb-quick-icon">
                      <Icon name={item.id} />
                    </span>
                    <span className="sb-quick-copy">
                      <span className="sb-quick-text">{item.label}</span>
                      <span className="sb-quick-meta">{item.caption}</span>
                    </span>
                    <span className="sb-quick-pill">{item.badge}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <div className="sb-footer">
          <div className="sb-streak">
            <div className="sb-streak-top">
              <span className="sb-streak-label">8-day streak</span>
              <span className="sb-streak-pill">78%</span>
            </div>

            <div className="sb-streak-bar">
              <span style={{ width: "78%" }} />
            </div>

            <p className="sb-streak-note">
              2 more activities to unlock bonus gems.
            </p>
          </div>

          <Link
            className="sb-cta"
            href="/content"
            onClick={() => setMenuOpen(false)}
          >
            Continue learning
          </Link>
        </div>
      </aside>
    </div>
  );
}
