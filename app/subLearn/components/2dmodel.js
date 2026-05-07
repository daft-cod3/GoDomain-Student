"use client";

/* ─────────────────────────────────────────────
   2D Road / Board Diagram
   Renders a top-down SVG scene that matches the
   lesson kind: theory, board, signs, or quiz.
───────────────────────────────────────────── */

function TheoryDiagram() {
  return (
    <svg
      className="sl-2d-svg"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Theory diagram: road overview"
    >
      {/* Sky */}
      <rect width="320" height="200" fill="#e8f4fd" rx="12" />

      {/* Road surface */}
      <rect x="80" y="0" width="160" height="200" fill="#6b7280" />

      {/* Lane markings */}
      {[10, 50, 90, 130, 170].map((y) => (
        <rect
          key={y}
          x="157"
          y={y}
          width="6"
          height="28"
          fill="#fbbf24"
          rx="2"
        />
      ))}

      {/* Edge lines */}
      <rect x="80" y="0" width="4" height="200" fill="#ffffff" opacity="0.7" />
      <rect x="236" y="0" width="4" height="200" fill="#ffffff" opacity="0.7" />

      {/* Car top-down */}
      <g transform="translate(140, 110)">
        <rect x="0" y="0" width="40" height="60" rx="8" fill="#2563eb" />
        <rect
          x="6"
          y="8"
          width="28"
          height="18"
          rx="4"
          fill="#bfdbfe"
          opacity="0.9"
        />
        <rect x="4" y="50" width="12" height="8" rx="2" fill="#1e3a5f" />
        <rect x="24" y="50" width="12" height="8" rx="2" fill="#1e3a5f" />
        <rect x="4" y="2" width="12" height="8" rx="2" fill="#1e3a5f" />
        <rect x="24" y="2" width="12" height="8" rx="2" fill="#1e3a5f" />
        {/* Headlights */}
        <rect x="6" y="0" width="10" height="4" rx="2" fill="#fef08a" />
        <rect x="24" y="0" width="10" height="4" rx="2" fill="#fef08a" />
      </g>

      {/* Observation arrows */}
      <g stroke="#10b981" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M160 105 L160 70" markerEnd="url(#arrowGreen)" />
        <path d="M160 105 L120 85" markerEnd="url(#arrowGreen)" />
        <path d="M160 105 L200 85" markerEnd="url(#arrowGreen)" />
      </g>
      <defs>
        <marker
          id="arrowGreen"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
        </marker>
      </defs>

      {/* Labels */}
      <text x="30" y="105" fontSize="10" fill="#374151" fontWeight="700">
        Observe
      </text>
      <text x="255" y="105" fontSize="10" fill="#374151" fontWeight="700">
        Mirror
      </text>
      <text x="130" y="60" fontSize="10" fill="#374151" fontWeight="700">
        Ahead
      </text>
    </svg>
  );
}

function BoardDiagram() {
  return (
    <svg
      className="sl-2d-svg"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Board diagram: model town layout"
    >
      <rect width="320" height="200" fill="#f0fdf4" rx="12" />

      {/* Roads */}
      {/* Horizontal main road */}
      <rect x="0" y="85" width="320" height="30" fill="#9ca3af" />
      {/* Vertical cross road */}
      <rect x="145" y="0" width="30" height="200" fill="#9ca3af" />

      {/* Lane markings horizontal */}
      {[20, 60, 100, 180, 220, 260, 300].map((x) => (
        <rect
          key={x}
          x={x}
          y="98"
          width="20"
          height="4"
          fill="#fbbf24"
          rx="1"
        />
      ))}
      {/* Lane markings vertical */}
      {[20, 55, 90, 125, 155, 190].map((y) => (
        <rect
          key={y}
          x="158"
          y={y}
          width="4"
          height="20"
          fill="#fbbf24"
          rx="1"
        />
      ))}

      {/* Junction box */}
      <rect x="145" y="85" width="30" height="30" fill="#d1d5db" />
      <rect
        x="148"
        y="88"
        width="24"
        height="24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />

      {/* Stop lines */}
      <rect x="145" y="83" width="30" height="3" fill="#ffffff" />
      <rect x="145" y="114" width="30" height="3" fill="#ffffff" />
      <rect x="143" y="85" width="3" height="30" fill="#ffffff" />
      <rect x="174" y="85" width="3" height="30" fill="#ffffff" />

      {/* Car at junction */}
      <g transform="translate(110, 88)">
        <rect x="0" y="0" width="28" height="18" rx="5" fill="#2563eb" />
        <rect
          x="4"
          y="3"
          width="20"
          height="8"
          rx="3"
          fill="#bfdbfe"
          opacity="0.9"
        />
      </g>

      {/* Parking bay */}
      <rect
        x="20"
        y="20"
        width="60"
        height="40"
        fill="#e5e7eb"
        stroke="#6b7280"
        strokeWidth="1"
        rx="4"
      />
      <text
        x="50"
        y="44"
        fontSize="9"
        fill="#374151"
        textAnchor="middle"
        fontWeight="700"
      >
        PARK
      </text>
      {[30, 45, 60].map((x) => (
        <rect key={x} x={x} y="20" width="1.5" height="40" fill="#9ca3af" />
      ))}

      {/* Pedestrian crossing */}
      {[0, 6, 12, 18, 24].map((i) => (
        <rect
          key={i}
          x={240 + i * 5}
          y="85"
          width="4"
          height="30"
          fill="#ffffff"
          opacity="0.6"
        />
      ))}

      {/* Labels */}
      <text x="50" y="78" fontSize="9" fill="#374151" fontWeight="600">
        Parking
      </text>
      <text x="240" y="78" fontSize="9" fill="#374151" fontWeight="600">
        Crossing
      </text>
      <text x="155" y="145" fontSize="9" fill="#374151" fontWeight="600">
        Junction
      </text>
    </svg>
  );
}

function SignsDiagram() {
  return (
    <svg
      className="sl-2d-svg"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Signs diagram: road sign categories"
    >
      <rect width="320" height="200" fill="#fffbeb" rx="12" />

      {/* Road strip */}
      <rect x="0" y="140" width="320" height="40" fill="#6b7280" />
      {[20, 60, 100, 140, 180, 220, 260, 300].map((x) => (
        <rect
          key={x}
          x={x}
          y="157"
          width="20"
          height="4"
          fill="#fbbf24"
          rx="1"
        />
      ))}

      {/* STOP sign */}
      <g transform="translate(30, 30)">
        <polygon
          points="20,0 40,0 56,16 56,36 40,52 20,52 4,36 4,16"
          fill="#dc2626"
        />
        <polygon
          points="22,4 38,4 52,18 52,34 38,48 22,48 8,34 8,18"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text
          x="30"
          y="32"
          fontSize="11"
          fill="#ffffff"
          textAnchor="middle"
          fontWeight="900"
        >
          STOP
        </text>
        <rect x="27" y="52" width="6" height="30" fill="#6b7280" />
      </g>

      {/* Warning triangle */}
      <g transform="translate(130, 20)">
        <polygon
          points="30,0 60,52 0,52"
          fill="#fbbf24"
          stroke="#d97706"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polygon
          points="30,8 54,48 6,48"
          fill="none"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text x="30" y="40" fontSize="18" textAnchor="middle">
          !
        </text>
        <rect x="27" y="52" width="6" height="30" fill="#6b7280" />
      </g>

      {/* Info sign */}
      <g transform="translate(230, 30)">
        <rect x="0" y="0" width="56" height="40" rx="6" fill="#1d4ed8" />
        <text
          x="28"
          y="16"
          fontSize="8"
          fill="#ffffff"
          textAnchor="middle"
          fontWeight="700"
        >
          TOWN
        </text>
        <text x="28" y="26" fontSize="8" fill="#ffffff" textAnchor="middle">
          CENTRE
        </text>
        <path
          d="M20 32 L28 32 L36 32"
          stroke="#ffffff"
          strokeWidth="2"
          markerEnd="url(#arrowW)"
        />
        <rect x="25" y="40" width="6" height="30" fill="#6b7280" />
        <defs>
          <marker
            id="arrowW"
            markerWidth="5"
            markerHeight="5"
            refX="2.5"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#ffffff" />
          </marker>
        </defs>
      </g>

      {/* Labels */}
      <text
        x="58"
        y="100"
        fontSize="9"
        fill="#374151"
        textAnchor="middle"
        fontWeight="700"
      >
        Regulatory
      </text>
      <text
        x="160"
        y="100"
        fontSize="9"
        fill="#374151"
        textAnchor="middle"
        fontWeight="700"
      >
        Warning
      </text>
      <text
        x="258"
        y="100"
        fontSize="9"
        fill="#374151"
        textAnchor="middle"
        fontWeight="700"
      >
        Informative
      </text>
    </svg>
  );
}

function QuizDiagram() {
  const questions = [
    { q: "What does a solid center line mean?", a: "No overtaking" },
    { q: "When must you give way?", a: "At yield signs" },
    { q: "What is the safe following distance?", a: "3-second gap" },
  ];

  return (
    <svg
      className="sl-2d-svg"
      viewBox="0 0 320 200"
      role="img"
      aria-label="Quiz diagram: knowledge check"
    >
      <rect width="320" height="200" fill="#f5f3ff" rx="12" />

      {/* Quiz cards */}
      {questions.map((item, i) => (
        <g key={item.q} transform={`translate(16, ${16 + i * 58})`}>
          <rect
            width="288"
            height="50"
            rx="8"
            fill="#ffffff"
            stroke="#c4b5fd"
            strokeWidth="1.5"
          />
          <rect
            width="288"
            height="50"
            rx="8"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="0"
            opacity="0.1"
          />
          <circle cx="20" cy="25" r="12" fill="#8b5cf6" />
          <text
            x="20"
            y="29"
            fontSize="10"
            fill="#ffffff"
            textAnchor="middle"
            fontWeight="800"
          >
            {i + 1}
          </text>
          <text x="42" y="20" fontSize="9" fill="#374151" fontWeight="700">
            {item.q}
          </text>
          <text x="42" y="36" fontSize="9" fill="#7c3aed">
            {item.a}
          </text>
          {/* Check mark */}
          <circle cx="268" cy="25" r="10" fill="#d1fae5" />
          <path
            d="M263 25 L267 29 L274 21"
            stroke="#059669"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

const DIAGRAM_MAP = {
  theory: TheoryDiagram,
  board: BoardDiagram,
  signs: SignsDiagram,
  quiz: QuizDiagram,
};

export default function TwoDModel({ kind, title }) {
  const Diagram = DIAGRAM_MAP[kind] ?? BoardDiagram;
  return (
    <div className="sl-2d-wrap">
      <div className="sl-2d-label">
        <span className="sl-2d-badge">2D View</span>
        <span className="sl-2d-title">{title}</span>
      </div>
      <Diagram />
    </div>
  );
}
