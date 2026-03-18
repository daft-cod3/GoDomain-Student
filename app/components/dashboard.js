export default function Dashboard() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <header className="dash-topbar">
          <div className="dash-search">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20L17 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search routes, instructors, lessons"
            />
          </div>
          <div className="dash-top-actions">
            <span className="dash-live">Live route</span>
            <button className="dash-icon" type="button" aria-label="Messages">
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 6H19V15H8L5 18V6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="dash-icon"
              type="button"
              aria-label="Notifications"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9C6 6 8 4 12 4C16 4 18 6 18 9V13L20 15H4L6 13V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 17C9.6 18.2 10.7 19 12 19C13.3 19 14.4 18.2 15 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="dash-avatar">AR</div>
          </div>
        </header>

        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">Driving school</div>
            <h1 className="dash-hero-title">Hi Ari, your route is ready.</h1>
            <p className="dash-hero-subtitle">
              The next sequence in Module 2 is unlocked. Keep your streak to
              earn instructor feedback and premium practice routes.
            </p>
            <button className="dash-hero-button" type="button">
              Open route
            </button>
          </div>
          <div className="dash-hero-art" aria-hidden="true">
            <div className="book-stack road-stack">
              <span className="book book-one" />
              <span className="book book-two" />
              <span className="book book-three" />
              <span className="book book-four" />
              <span className="book book-five" />
            </div>
            <div className="book-stand road-stand">
              <span />
              <span />
            </div>
          </div>
        </section>

        <div className="dash-body">
          <div className="dash-main">
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Instructor uploads</div>
                  <div className="dash-section-subtitle">
                    New videos, image guides, quizzes, and links from your
                    instructor.
                  </div>
                </div>
                <button className="dash-link" type="button">
                  View all
                </button>
              </div>
              <div className="teacher-grid">
                <article className="teacher-card">
                  <div className="teacher-card-top">
                    <span className="teacher-icon video" />
                    <span className="teacher-type">Video</span>
                    <span className="teacher-badge">New upload</span>
                  </div>
                  <div className="teacher-title">Mirror check routine</div>
                  <div className="teacher-meta">
                    Ms. Diaz - 12 min - Uploaded 2 hours ago
                  </div>
                  <button className="teacher-action" type="button">
                    Play video
                  </button>
                </article>
                <article className="teacher-card">
                  <div className="teacher-card-top">
                    <span className="teacher-icon image" />
                    <span className="teacher-type">Image set</span>
                    <span className="teacher-badge">New upload</span>
                  </div>
                  <div className="teacher-title">Road sign gallery</div>
                  <div className="teacher-meta">
                    Mr. Chen - 8 images - Uploaded yesterday
                  </div>
                  <button className="teacher-action" type="button">
                    View images
                  </button>
                </article>
                <article className="teacher-card">
                  <div className="teacher-card-top">
                    <span className="teacher-icon quiz" />
                    <span className="teacher-type">Quiz</span>
                    <span className="teacher-badge">New upload</span>
                  </div>
                  <div className="teacher-title">Parking bay quiz</div>
                  <div className="teacher-meta">
                    Ms. Omar - 10 questions - Due in 2 days
                  </div>
                  <button className="teacher-action" type="button">
                    Start quiz
                  </button>
                </article>
                <article className="teacher-card">
                  <div className="teacher-card-top">
                    <span className="teacher-icon link" />
                    <span className="teacher-type">Resource</span>
                    <span className="teacher-badge">New upload</span>
                  </div>
                  <div className="teacher-title">Traffic rules link</div>
                  <div className="teacher-meta">
                    Ms. Bello - External link - Updated today
                  </div>
                  <button className="teacher-action" type="button">
                    Open link
                  </button>
                </article>
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Popular routes</div>
                  <div className="dash-section-subtitle">
                    Curated lessons for fast progress.
                  </div>
                </div>
                <button className="dash-link" type="button">
                  View all
                </button>
              </div>
              <div className="dash-card-grid">
                <article className="dash-course-card">
                  <div className="dash-card-art art-lilac" />
                  <div className="dash-card-title">Theory basics</div>
                  <div className="dash-card-meta">12 lessons - 4.8 rating</div>
                </article>
                <article className="dash-course-card">
                  <div className="dash-card-art art-peach" />
                  <div className="dash-card-title">Steering control</div>
                  <div className="dash-card-meta">9 lessons - 4.6 rating</div>
                </article>
                <article className="dash-course-card">
                  <div className="dash-card-art art-mint" />
                  <div className="dash-card-title">Daily checks</div>
                  <div className="dash-card-meta">14 lessons - 4.9 rating</div>
                </article>
                <article className="dash-course-card">
                  <div className="dash-card-art art-sky" />
                  <div className="dash-card-title">Test prep</div>
                  <div className="dash-card-meta">7 lessons - 4.7 rating</div>
                </article>
              </div>
            </section>

            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">In progress</div>
                  <div className="dash-section-subtitle">
                    Continue where you left off.
                  </div>
                </div>
                <button className="dash-link" type="button">
                  View all
                </button>
              </div>
              <div className="dash-card-grid">
                <article className="dash-course-card">
                  <div className="dash-card-art art-violet" />
                  <div className="dash-card-title">Clutch drills</div>
                  <div className="dash-card-meta">Lesson 5 - 36 min left</div>
                </article>
                <article className="dash-course-card">
                  <div className="dash-card-art art-rose" />
                  <div className="dash-card-title">Traffic spotting</div>
                  <div className="dash-card-meta">Lesson 3 - 22 min left</div>
                </article>
                <article className="dash-course-card">
                  <div className="dash-card-art art-amber" />
                  <div className="dash-card-title">Signal pack</div>
                  <div className="dash-card-meta">Lesson 8 - 41 min left</div>
                </article>
                <article className="dash-course-card">
                  <div className="dash-card-art art-aqua" />
                  <div className="dash-card-title">Road roleplay</div>
                  <div className="dash-card-meta">Lesson 2 - 18 min left</div>
                </article>
              </div>
            </section>
          </div>

          <aside className="dash-rail">
            <div className="dash-rail-card">
              <div className="dash-rail-head">
                <div>
                  <div className="dash-rail-title">Road test unlock</div>
                  <div className="dash-rail-subtitle">
                    Complete 3 sessions to unlock your next badge.
                  </div>
                </div>
                <button
                  className="dash-toggle"
                  type="button"
                  aria-label="Toggle"
                >
                  <span />
                </button>
              </div>
              <div className="dash-rail-progress">
                <div className="dash-progress-row">
                  <span>Daily streak</span>
                  <span>2/3</span>
                </div>
                <div className="dash-progress">
                  <span style={{ width: "66%" }} />
                </div>
                <div className="dash-badge-row">
                  <span className="dash-mini-avatar">LP</span>
                  <span className="dash-mini-avatar">JS</span>
                  <span className="dash-mini-avatar">AK</span>
                </div>
              </div>
            </div>

            <div className="dash-rail-card">
              <div className="dash-rail-title">Top instructors</div>
              <div className="dash-rail-list">
                <div className="dash-rail-item">
                  <span className="dash-rail-avatar">GM</span>
                  <div>
                    <div className="dash-rail-name">Gina Moore</div>
                    <div className="dash-rail-meta">Observation - 4.9</div>
                  </div>
                  <button className="dash-rail-action" type="button">
                    Schedule
                  </button>
                </div>
                <div className="dash-rail-item">
                  <span className="dash-rail-avatar">PS</span>
                  <div>
                    <div className="dash-rail-name">Priya Singh</div>
                    <div className="dash-rail-meta">Theory - 4.8</div>
                  </div>
                  <button className="dash-rail-action" type="button">
                    Schedule
                  </button>
                </div>
                <div className="dash-rail-item">
                  <span className="dash-rail-avatar">JW</span>
                  <div>
                    <div className="dash-rail-name">Jun Wei</div>
                    <div className="dash-rail-meta">Practical - 4.7</div>
                  </div>
                  <button className="dash-rail-action" type="button">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
