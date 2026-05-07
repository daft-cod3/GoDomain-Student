"use client";

/* ─────────────────────────────────────────────
   3D Perspective Model
   Pure CSS 3D transforms — no canvas, no WebGL.
   Renders a perspective road scene that matches
   the lesson kind.
───────────────────────────────────────────── */

function RoadScene() {
  return (
    <div className="sl-3d-scene" aria-hidden="true">
      <div className="sl-3d-world">
        {/* Ground plane */}
        <div className="sl-3d-ground" />

        {/* Road surface */}
        <div className="sl-3d-road">
          {/* Lane markings */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="sl-3d-lane-mark"
              style={{ "--mark-i": i }}
            />
          ))}
          {/* Edge lines */}
          <div className="sl-3d-edge sl-3d-edge--left" />
          <div className="sl-3d-edge sl-3d-edge--right" />
        </div>

        {/* Vehicle */}
        <div className="sl-3d-car">
          <div className="sl-3d-car-body">
            <div className="sl-3d-car-roof" />
            <div className="sl-3d-car-windscreen" />
            <div className="sl-3d-car-hood" />
          </div>
          <div className="sl-3d-car-side sl-3d-car-side--left" />
          <div className="sl-3d-car-side sl-3d-car-side--right" />
          <div className="sl-3d-car-top" />
          {/* Wheels */}
          <div className="sl-3d-wheel sl-3d-wheel--fl" />
          <div className="sl-3d-wheel sl-3d-wheel--fr" />
          <div className="sl-3d-wheel sl-3d-wheel--rl" />
          <div className="sl-3d-wheel sl-3d-wheel--rr" />
        </div>

        {/* Road signs on verge */}
        <div className="sl-3d-sign sl-3d-sign--left">
          <div className="sl-3d-sign-face" />
          <div className="sl-3d-sign-post" />
        </div>
        <div className="sl-3d-sign sl-3d-sign--right">
          <div className="sl-3d-sign-face sl-3d-sign-face--warn" />
          <div className="sl-3d-sign-post" />
        </div>

        {/* Horizon buildings */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="sl-3d-building" style={{ "--b-i": i }} />
        ))}
      </div>
    </div>
  );
}

function BoardScene() {
  return (
    <div className="sl-3d-scene sl-3d-scene--board" aria-hidden="true">
      <div className="sl-3d-world">
        <div className="sl-3d-ground sl-3d-ground--board" />

        {/* Board surface */}
        <div className="sl-3d-board-surface">
          {/* Grid lines */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="sl-3d-board-grid-h" style={{ "--gi": i }} />
          ))}
          {[1, 2, 3].map((i) => (
            <div key={i} className="sl-3d-board-grid-v" style={{ "--gi": i }} />
          ))}
          {/* Junction cross */}
          <div className="sl-3d-board-road sl-3d-board-road--h" />
          <div className="sl-3d-board-road sl-3d-board-road--v" />
        </div>

        {/* Miniature car on board */}
        <div className="sl-3d-mini-car">
          <div className="sl-3d-mini-car-body" />
        </div>
      </div>
    </div>
  );
}

function SignsScene() {
  return (
    <div className="sl-3d-scene sl-3d-scene--signs" aria-hidden="true">
      <div className="sl-3d-world">
        <div className="sl-3d-ground" />
        <div className="sl-3d-road" />

        {/* Large sign display */}
        <div className="sl-3d-sign-display">
          <div className="sl-3d-sign-display-face">
            <div className="sl-3d-sign-display-inner" />
          </div>
          <div className="sl-3d-sign-display-side" />
          <div className="sl-3d-sign-display-post" />
        </div>

        {/* Secondary signs */}
        {[0, 1].map((i) => (
          <div key={i} className="sl-3d-sign-sm" style={{ "--si": i }}>
            <div className="sl-3d-sign-sm-face" />
            <div className="sl-3d-sign-post" />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizScene() {
  return (
    <div className="sl-3d-scene sl-3d-scene--quiz" aria-hidden="true">
      <div className="sl-3d-world">
        <div className="sl-3d-ground sl-3d-ground--quiz" />

        {/* Floating quiz cards in 3D */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="sl-3d-quiz-card" style={{ "--qi": i }}>
            <div className="sl-3d-quiz-card-face">
              <div className="sl-3d-quiz-card-line" />
              <div className="sl-3d-quiz-card-line sl-3d-quiz-card-line--short" />
            </div>
            <div className="sl-3d-quiz-card-side" />
          </div>
        ))}

        {/* Trophy */}
        <div className="sl-3d-trophy">
          <div className="sl-3d-trophy-cup" />
          <div className="sl-3d-trophy-base" />
        </div>
      </div>
    </div>
  );
}

const SCENE_MAP = {
  theory: RoadScene,
  board: BoardScene,
  signs: SignsScene,
  quiz: QuizScene,
};

export default function ThreeDModel({ kind, title }) {
  const Scene = SCENE_MAP[kind] ?? RoadScene;
  return (
    <div className="sl-3d-wrap">
      <div className="sl-3d-label">
        <span className="sl-3d-badge">3D View</span>
        <span className="sl-3d-title">{title}</span>
      </div>
      <Scene />
    </div>
  );
}
