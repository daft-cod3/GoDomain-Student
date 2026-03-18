export default function HomePage() {
  return (
    <main className="landing">
      <header className="landing-nav card">
        <div className="landing-brand">
          <div className="brand-mark">GD</div>
          <div>
            <div className="brand-title">GoDomain</div>
            <div className="brand-subtitle">Digital driving school</div>
          </div>
        </div>
        <div className="landing-nav-actions">
          <a className="landing-nav-link" href="/dashboard">
            Log in
          </a>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <p className="landing-eyebrow">Digital driving school</p>
          <h1 className="landing-title font-display">
            Learn the road without the boredom.
          </h1>
          <p className="landing-lede">
            GoDomain brings road theory, practice drills, instructor feedback,
            and progress tracking into one digital workspace so every learner
            can move from first lesson to test day with clarity.
          </p>
          <div className="landing-cta-row">
            <a className="landing-cta" href="/dashboard">
              Enter the school portal
            </a>
            <a className="landing-ghost" href="#overview">
              See what you get
            </a>
          </div>
          <div className="landing-badges">
            <span className="landing-badge">Personalized road routes</span>
            <span className="landing-badge">Live driving progress</span>
            <span className="landing-badge">Instructor feedback loop</span>
          </div>
        </div>

        <div className="landing-panel card">
          <form className="landing-form" action="/dashboard">
            <div className="landing-form-header">
              <h2 className="landing-form-title font-display">
                Sign in to continue
              </h2>
              <p className="landing-form-subtitle">
                Use your school or fleet credentials to continue.
              </p>
            </div>
            <div className="landing-socials">
              <button className="landing-social google" type="button">
                <span className="social-dot" aria-hidden="true" />
                Continue with Google
              </button>
              <button className="landing-social facebook" type="button">
                <span className="social-dot" aria-hidden="true" />
                Continue with Facebook
              </button>
            </div>
            <div className="landing-divider">
              <span>or sign in with email</span>
            </div>
            <label className="landing-label">
              Email address
              <input
                className="landing-input"
                type="email"
                name="email"
                placeholder="you@domain.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="landing-label">
              Password
              <input
                className="landing-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="landing-cta landing-submit" type="submit">
              Continue to the driving portal
            </button>
            <p className="landing-form-hint">
              New here? Contact your instructor or administrator to get access.
            </p>
          </form>
        </div>
      </section>

      <section id="overview" className="landing-section">
        <div className="landing-section-head">
          <div>
            <p className="landing-section-eyebrow">Why GoDomain</p>
            <h3 className="landing-section-title font-display">
              Built to keep every driver on track
            </h3>
          </div>
          <p className="landing-section-lede">
            Capture goals, guide learners through every milestone, and surface
            the road insights that matter most.
          </p>
        </div>
        <div className="landing-feature-grid">
          <article className="landing-feature card">
            <h4 className="landing-feature-title">Structured road lessons</h4>
            <p className="landing-feature-text">
              Organize theory, practice, and review into clear sequences so the
              next stop is always obvious.
            </p>
          </article>
          <article className="landing-feature card">
            <h4 className="landing-feature-title">Real-time progress</h4>
            <p className="landing-feature-text">
              Track engagement, streaks, and performance signals at a glance.
            </p>
          </article>
          <article className="landing-feature card">
            <h4 className="landing-feature-title">Support that scales</h4>
            <p className="landing-feature-text">
              Give instructors the context they need to step in fast.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-section landing-steps">
        <div className="landing-step card">
          <div className="landing-step-number">01</div>
          <div>
            <h4 className="landing-step-title">Log in with your credentials</h4>
            <p className="landing-step-text">
              Securely access your personalized driving dashboard in seconds.
            </p>
          </div>
        </div>
        <div className="landing-step card">
          <div className="landing-step-number">02</div>
          <div>
            <h4 className="landing-step-title">Pick up where you left off</h4>
            <p className="landing-step-text">
              Continue lessons, complete practice runs, and follow the
              recommended next steps.
            </p>
          </div>
        </div>
        <div className="landing-step card">
          <div className="landing-step-number">03</div>
          <div>
            <h4 className="landing-step-title">See progress instantly</h4>
            <p className="landing-step-text">
              Review your achievements, streaks, and goals all in one place.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>
          GoDomain keeps driving lessons connected across learners, instructors,
          and fleets. Log in above to enter the main site.
        </p>
      </footer>
    </main>
  );
}
