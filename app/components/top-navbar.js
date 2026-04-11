import Image from "next/image";
import Link from "next/link";
import { studentProfile } from "../data/student-profile";

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
    label: "HP",
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
    label: "Energy",
  },
};

function NavbarMeter({ tone, value, capacity }) {
  const meta = STAT_META[tone];
  const pct = getPercent(value, capacity);
  return (
    <Link
      className={`top-navbar-meter ${tone}`}
      href="/stats"
      aria-label={`${meta.label}: ${value}/${capacity}`}
      title={`${meta.label}: ${value}/${capacity}`}
      style={{ "--meter-glow": meta.glow, "--meter-color": meta.color }}
    >
      <span className="top-navbar-meter-icon" style={{ color: meta.color }}>
        {meta.icon}
      </span>
      <div className="top-navbar-meter-body">
        <div className="top-navbar-meter-row">
          <span className="top-navbar-meter-label">{meta.label}</span>
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
  return (
    <header className="top-navbar no-search">
      <div className="top-navbar-leading">
        <Link className="top-navbar-brand" href="/dashboard" aria-label="Open GoDomain dashboard">
          <span className="top-navbar-brand-mark">
            <Image
              src="/godomain-logo.svg"
              alt="GoDomain logo"
              width={40}
              height={40}
            />
          </span>
          <span className="top-navbar-brand-copy">
            <span className="top-navbar-brand-label">GoDomain</span>
            <span className="top-navbar-brand-subtitle">Learning workspace</span>
          </span>
        </Link>

        <Link
          className="top-navbar-identity"
          href="/stats"
          aria-label="Open learner profile"
        >
          <span className="top-navbar-overline">Learner</span>
          <strong>{studentProfile.name}</strong>
          <span>{studentProfile.drivingClass}</span>
        </Link>
      </div>


      <div className="top-navbar-stats">
        <NavbarMeter
          tone="hp"
          value={studentProfile.hp}
          capacity={studentProfile.hpCapacity}
        />
        <NavbarMeter
          tone="energy"
          value={studentProfile.energy}
          capacity={studentProfile.energyCapacity}
        />
        <Link
          className="top-navbar-coins"
          href="/stats"
          aria-label={`Coins: ${studentProfile.coins}`}
          title={`Coins: ${studentProfile.coins}`}
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
          <div className="top-navbar-coins-body">
            <span className="top-navbar-coins-label">Coins</span>
            <strong className="top-navbar-coins-val">
              {studentProfile.coins}
            </strong>
          </div>
        </Link>
      </div>
    </header>
  );
}
