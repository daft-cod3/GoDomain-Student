import Link from "next/link";

export default function TeacherUploadDetail({ upload }) {
  return (
    <section className="upload-detail-page">
      <div className={`upload-detail-hero ${upload.accent}`}>
        <div className="upload-detail-hero-copy">
          <Link className="upload-detail-back" href="/dashboard">
            Back to dashboard
          </Link>
          <div className="upload-detail-kicker">
            {upload.type} / {upload.teacher}
          </div>
          <h1 className="upload-detail-title">{upload.title}</h1>
          <p className="upload-detail-summary">{upload.intro}</p>
          <div className="upload-detail-actions">
            <Link className="upload-detail-primary" href={upload.relatedLessonHref}>
              Open related lesson
            </Link>
            <Link className="upload-detail-secondary" href="/dashboard">
              Return to dashboard
            </Link>
          </div>
        </div>

        <div className="upload-detail-metric-grid">
          {upload.deliverables.map((item) => (
            <article key={item.label} className="upload-detail-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="upload-detail-main">
        <section className="upload-detail-card">
          <div className="upload-detail-section-head">
            <div>
              <div className="upload-detail-section-title">Highlights</div>
              <div className="upload-detail-section-subtitle">
                The key pieces the learner should notice before moving on.
              </div>
            </div>
            <span className="upload-detail-chip">Updated</span>
          </div>

          <div className="upload-detail-highlight-grid">
            {upload.highlights.map((highlight) => (
              <article key={highlight} className="upload-detail-highlight">
                <strong>Key point</strong>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="upload-detail-card">
          <div className="upload-detail-section-head">
            <div>
              <div className="upload-detail-section-title">
                Upload walkthrough
              </div>
              <div className="upload-detail-section-subtitle">
                A reusable content block that changes with the selected card.
              </div>
            </div>
          </div>

          <div className="upload-detail-section-grid">
            {upload.sections.map((section) => (
              <article key={section.title} className="upload-detail-section">
                <strong>{section.title}</strong>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="upload-detail-card">
          <div className="upload-detail-section-head">
            <div>
              <div className="upload-detail-section-title">Next steps</div>
              <div className="upload-detail-section-subtitle">
                Use these actions to connect the upload back to lesson progress.
              </div>
            </div>
          </div>

          <ol className="upload-detail-step-list">
            {upload.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
