import Link from "next/link";
import { getRoadSignHref, roadSignCategories } from "../data/road-signs";

export function RoadSignGraphic({ sign }) {
  const palette = {
    priority: {
      fill: "#ffffff",
      stroke: "#d73a31",
      text: "#13202f",
      accent: "#f3c84d",
    },
    prohibitory: {
      fill: "#ffffff",
      stroke: "#d73a31",
      text: "#13202f",
      accent: "#d73a31",
    },
    warning: {
      fill: "#fff8cf",
      stroke: "#d88d1b",
      text: "#4f3400",
      accent: "#d88d1b",
    },
    informative: {
      fill: "#1a74d8",
      stroke: "#1a74d8",
      text: "#ffffff",
      accent: "#ffffff",
    },
  }[sign.family];

  const fontSize = sign.text?.length > 4 ? 11 : sign.text?.length > 2 ? 15 : 22;
  const textY = sign.shape === "yield" ? 56 : 54;

  return (
    <svg
      className="road-sign-graphic"
      viewBox="0 0 96 96"
      role="img"
      aria-label={sign.label}
    >
      {sign.shape === "octagon"
        ? <polygon
            points="32,10 64,10 86,32 86,64 64,86 32,86 10,64 10,32"
            fill={palette.stroke}
          />
        : null}

      {sign.shape === "yield"
        ? <polygon
            points="48,10 86,76 10,76"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="8"
            strokeLinejoin="round"
          />
        : null}

      {sign.shape === "diamond"
        ? <g>
            <rect
              x="24"
              y="24"
              width="48"
              height="48"
              rx="4"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="8"
              transform="rotate(45 48 48)"
            />
            <rect
              x="34"
              y="34"
              width="28"
              height="28"
              rx="2"
              fill={palette.accent}
              transform="rotate(45 48 48)"
            />
          </g>
        : null}

      {sign.shape === "circle"
        ? <g>
            <circle cx="48" cy="48" r="34" fill={palette.stroke} />
            <circle cx="48" cy="48" r="25" fill={palette.fill} />
          </g>
        : null}

      {sign.shape === "triangle"
        ? <polygon
            points="48,10 86,78 10,78"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="8"
            strokeLinejoin="round"
          />
        : null}

      {sign.shape === "square"
        ? <rect
            x="18"
            y="18"
            width="60"
            height="60"
            rx="14"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="6"
          />
        : null}

      {sign.mark === "bar"
        ? <rect
            x="22"
            y="43"
            width="52"
            height="10"
            rx="5"
            fill={palette.accent}
          />
        : null}

      {sign.text
        ? <text
            x="48"
            y={textY}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight="800"
            fill={palette.text}
            style={{ letterSpacing: sign.text.length > 3 ? "0.6px" : "0" }}
          >
            {sign.text}
          </text>
        : null}

      {sign.mark === "slash"
        ? <line
            x1="24"
            y1="72"
            x2="72"
            y2="24"
            stroke={sign.family === "informative" ? "#ffffff" : palette.stroke}
            strokeWidth="8"
            strokeLinecap="round"
          />
        : null}
    </svg>
  );
}

function SignRow({ title, description, signs }) {
  return (
    <div className="road-sign-group">
      <div className="road-sign-group-head">
        <div className="road-sign-group-title">{title}</div>
        <p>{description}</p>
      </div>

      <ul className="road-sign-row" aria-label={title}>
        {signs.map((sign) => (
          <li key={sign.id} className="road-sign-row-item">
            <Link className="road-sign-card" href={getRoadSignHref(sign.id)}>
              <div className={`road-sign-figure ${sign.family}`}>
                <RoadSignGraphic sign={sign} />
              </div>
              <div className="road-sign-copy">
                <h3>{sign.label}</h3>
                <p>{sign.caption}</p>
              </div>
              <span className="road-sign-link">Open sign guide</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoadSign() {
  return (
    <section className="dash-section road-signs-section">
      <div className="dash-section-head road-signs-head">
        <div>
          <div className="dash-section-title">Road signs</div>
          <div className="dash-section-subtitle">
            Long category rows scroll sideways so the dashboard can hold 20+
            signs without breaking the layout.
          </div>
        </div>
        <div className="road-signs-note">
          Scroll horizontally and open any sign for the full guide.
        </div>
      </div>

      {roadSignCategories.map((category) => (
        <div key={category.id} className="road-sign-category">
          <div className="road-sign-category-head">
            <div className="road-sign-category-title">{category.title}</div>
            <p>{category.description}</p>
          </div>

          {category.groups.map((group) => (
            <SignRow
              key={group.id}
              title={group.title}
              description={group.description}
              signs={group.signs}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
