export default function LearnPath() {
  return (
    <div className="learn-shell">
      <header className="learn-top">
        <div className="metric-chip">
          <span className="metric-flag" />
          Spanish
        </div>
        <div className="metric-chip">
          <span className="metric-flame" />
          2520
        </div>
        <div className="metric-chip">
          <span className="metric-gem" />
          26032
        </div>
        <div className="metric-chip">
          <span className="metric-award" />
          Level 8
        </div>
      </header>

      <section className="unit-card">
        <div>
          <div className="unit-eyebrow">SECTION 2, UNIT 2</div>
          <h1 className="unit-title">Express travel needs</h1>
          <div className="unit-subtitle">
            Practice asking for directions, tickets, and timing.
          </div>
        </div>
        <button className="unit-action" type="button">
          Guide
        </button>
      </section>

      <section className="path-area card">
        <div className="path-header">
          <div>
            <div className="path-title">Learning Path</div>
            <div className="path-subtitle">Complete each step to unlock the chest.</div>
          </div>
          <div className="path-progress">68% complete</div>
        </div>

        <div className="path-list">
          <div className="path-step left">
            <div className="path-node completed">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 6H20V18H4V6ZM4 9H20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="path-step-card">
              <div className="path-step-title">Warm-up drills</div>
              <div className="path-step-meta">Completed - 3 stars</div>
              <div className="star-row">
                <span className="star active" />
                <span className="star active" />
                <span className="star active" />
              </div>
              <button className="path-step-action" type="button">
                Review
              </button>
            </div>
          </div>

          <div className="path-step right">
            <div className="path-node completed">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7 4H17L19 8V20H5V8L7 4Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M5 8H19" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="path-step-card">
              <div className="path-step-title">Ticket booking</div>
              <div className="path-step-meta">Completed - 2 stars</div>
              <div className="star-row">
                <span className="star active" />
                <span className="star active" />
                <span className="star" />
              </div>
              <button className="path-step-action" type="button">
                Review
              </button>
            </div>
          </div>

          <div className="path-step left">
            <div className="path-node completed">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="path-step-card">
              <div className="path-step-title">Timing practice</div>
              <div className="path-step-meta">Completed - 18 min</div>
              <button className="path-step-action" type="button">
                Review
              </button>
            </div>
          </div>

          <div className="path-step right">
            <div className="path-node next">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 12C6 9 8 7 11 7C14 7 16 9 16 12V16H6V12Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M9 16V19H13V16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="path-step-card">
              <div className="path-step-title">Live roleplay</div>
              <div className="path-step-meta">Next up - 20 min</div>
              <div className="star-row">
                <span className="star active" />
                <span className="star" />
                <span className="star" />
              </div>
              <button className="path-step-action" type="button">
                Start
              </button>
            </div>
          </div>

          <div className="path-step left">
            <div className="path-node treasure">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 9C4 6 6 4 9 4H15C18 4 20 6 20 9V18H4V9Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M4 10H20" stroke="currentColor" strokeWidth="2" />
                <rect x="10" y="12" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="path-step-card">
              <div className="path-step-title">Chest reward</div>
              <div className="path-step-meta">Bonus unlock available</div>
              <button className="path-step-action" type="button">
                Claim
              </button>
            </div>
          </div>

          <div className="path-step right">
            <div className="path-node locked">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 12C6 9 8 7 11 7C14 7 16 9 16 12V17H6V12Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="11" cy="14" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="path-step-card locked">
              <div className="path-step-title">Checkpoint quiz</div>
              <div className="path-step-meta">Unlock after chest</div>
              <button className="path-step-action locked" type="button" disabled>
                Locked
              </button>
            </div>
          </div>

          <div className="path-step left">
            <div className="path-node locked">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12C5 9 7 7 10 7H14C17 7 19 9 19 12V17H5V12Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M9 17V20H15V17" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="path-step-card locked">
              <div className="path-step-title">Conversation lab</div>
              <div className="path-step-meta">Unlock after quiz</div>
              <button className="path-step-action locked" type="button" disabled>
                Locked
              </button>
            </div>
          </div>

          <div className="path-step right">
            <div className="path-node locked">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 5H16V19H8V5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M10 9H14" stroke="currentColor" strokeWidth="2" />
                <path d="M10 13H14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="path-step-card locked">
              <div className="path-step-title">Final checkpoint</div>
              <div className="path-step-meta">Complete all steps</div>
              <button className="path-step-action locked" type="button" disabled>
                Locked
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
