import Link from "next/link";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "path", label: "Road Map", href: "/content" },
  { id: "stats", label: "Progress", href: "/stats" },
  { id: "practice", label: "Simulator", href: "/dashboard" },
  { id: "achievements", label: "Badges", href: "/dashboard" },
  { id: "settings", label: "Settings", href: "/settings" },
];

export default function Sidebar({ active = "dashboard" }) {
  return (
    <aside className="sidebar card">
      <div className="sidebar-brand">
        <div className="brand-mark">G</div>
        <div>
          <div className="brand-title">GoDomain</div>
          <div className="brand-subtitle">Driving School</div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">AR</div>
        <div>
          <div className="profile-name">Ari Rowe</div>
          <div className="profile-meta">Module 2 · Lesson 2</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = item.id === active;
          return (
            <Link
              key={item.id}
              className={`nav-link ${isActive ? "active" : ""}`}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`nav-icon ${item.id}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="streak-card">
          <div className="streak-value">8-day streak</div>
          <div className="streak-meta">
            Keep it going to unlock the next road badge.
          </div>
        </div>
        <button className="cta-button" type="button">
          Start driving session
        </button>
      </div>
    </aside>
  );
}
