"use client";

import Link from "next/link";
import { useTranslation } from "./translations";

function getLocalizedUploadDetail(upload, t) {
  return {
    ...upload,
    title: t(
      `dashboard.teacherUploads.uploads.${upload.id}.title`,
      upload.title,
    ),
    type: t(
      `dashboard.teacherUploads.uploads.${upload.id}.type`,
      upload.type,
    ),
    intro: t(
      `dashboard.teacherUploads.uploads.${upload.id}.intro`,
      upload.intro,
    ),
    highlights: t(
      `dashboard.teacherUploads.uploads.${upload.id}.highlights`,
      upload.highlights,
    ),
    sections: t(
      `dashboard.teacherUploads.uploads.${upload.id}.sections`,
      upload.sections,
    ),
    nextSteps: t(
      `dashboard.teacherUploads.uploads.${upload.id}.nextSteps`,
      upload.nextSteps,
    ),
  };
}

export default function TeacherUploadDetail({ upload }) {
  const isVideo = upload.id === "video-upload";
  const isImage = upload.id === "image-upload";
  const isNotes = upload.id === "resource-upload";

  const t = useTranslation();
  const videoRows = t("teacherUploadDetail.videoRows", [
    { label: "Priority call review", duration: "3:20" },
    { label: "Mirror and signal timing", duration: "2:45" },
    { label: "Entry speed and gap choice", duration: "2:05" },
    { label: "Final turn commitment", duration: "3:40" },
  ]);
  const imageItems = t("teacherUploadDetail.imageItems", [
    { label: "Lane arrows", caption: "6 examples", tone: "blue" },
    { label: "Road markings", caption: "4 close-ups", tone: "green" },
    { label: "Junction signs", caption: "5 scenes", tone: "gold" },
    { label: "Priority lines", caption: "3 comparisons", tone: "rose" },
  ]);
  const noteCards = t("teacherUploadDetail.noteCards", [
    { label: "Warning signs", description: "Quick recall prompts" },
    { label: "Regulatory signs", description: "Action-based notes" },
    { label: "Directional signs", description: "Route reminders" },
    { label: "Safety tips", description: "Fast revision cues" },
  ]);

  const localizedUpload = getLocalizedUploadDetail(upload, t);

  return (
    <section className="upload-detail-page">
      <div className={`upload-detail-hero ${upload.accent}`}>
        <div className="upload-detail-hero-copy">
          <Link className="upload-detail-back" href="/dashboard">
            {t("teacherUploadDetail.backToDashboard")}
          </Link>
          <div className="upload-detail-kicker">
            {localizedUpload.type} / {localizedUpload.teacher}
          </div>
          <h1 className="upload-detail-title">{localizedUpload.title}</h1>
          <p className="upload-detail-summary">{localizedUpload.intro}</p>
          <div className="upload-detail-actions">
            <Link
              className="upload-detail-primary"
              href={upload.relatedLessonHref}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>{t("teacherUploadDetail.openRelatedLessonTitle")}</title>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              {t("teacherUploadDetail.startRelatedLesson")}
            </Link>
            <Link className="upload-detail-secondary" href="/dashboard">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <title>{t("teacherUploadDetail.backToDashboardTitle")}</title>
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t("teacherUploadDetail.backToDashboard")}
            </Link>
          </div>
        </div>

        <div className="upload-detail-metric-grid">
          {localizedUpload.deliverables.map((item) => (
            <article key={item.label} className="upload-detail-metric">
              <span>{t(`teacherUploadDetail.deliverables.${item.label}`, item.label)}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="upload-detail-main upload-detail-main-grid">
        {isVideo && (
          <section className="upload-detail-card upload-detail-media-card">
            <div className="upload-detail-section-head">
              <div>
                <div className="upload-detail-section-title">{t("teacherUploadDetail.videoGuideRows")}</div>
                <div className="upload-detail-section-subtitle">
                  {t("teacherUploadDetail.videoGuideRowsSubtitle")}
                </div>
              </div>
            </div>
            <div className="upload-detail-media-list">
              {videoRows.map((item) => (
                <article key={item.label} className="upload-detail-media-row">
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.duration}</p>
                  </div>
                  <span>{t("teacherUploadDetail.play")}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {isImage && (
          <section className="upload-detail-card upload-detail-media-card">
            <div className="upload-detail-section-head">
              <div>
                <div className="upload-detail-section-title">{t("teacherUploadDetail.imageReview")}</div>
                <div className="upload-detail-section-subtitle">
                  {t("teacherUploadDetail.imageReviewSubtitle")}
                </div>
              </div>
            </div>
            <div className="upload-detail-image-grid">
              {imageItems.map((item) => (
                <article
                  key={item.label}
                  className={`upload-detail-image-card ${item.tone}`}
                >
                  <span className="upload-detail-image-thumb" aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {isNotes && (
          <section className="upload-detail-card upload-detail-media-card">
            <div className="upload-detail-section-head">
              <div>
                <div className="upload-detail-section-title">{t("teacherUploadDetail.notesAndLinks")}</div>
                <div className="upload-detail-section-subtitle">
                  {t("teacherUploadDetail.notesAndLinksSubtitle")}
                </div>
              </div>
            </div>
            <div className="upload-detail-note-grid">
              {noteCards.map((item) => (
                <article key={item.label} className="upload-detail-note-card">
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.description}</p>
                  </div>
                  <Link href="/dashboard" className="upload-detail-note-link">
                    {t("teacherUploadDetail.view")}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="upload-detail-card upload-detail-support-card">
            <div className="upload-detail-section-head">
            <div>
              <div className="upload-detail-section-title">{t("teacherUploadDetail.highlights")}</div>
              <div className="upload-detail-section-subtitle">
                {t("teacherUploadDetail.highlightsSubtitle")}
              </div>
            </div>
            <span className="upload-detail-chip">{t("teacherUploadDetail.updated")}</span>
          </div>

          <div className="upload-detail-highlight-grid">
            {localizedUpload.highlights.map((highlight) => (
              <article key={highlight} className="upload-detail-highlight">
                <strong>{t("teacherUploadDetail.keyPoint")}</strong>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="upload-detail-card upload-detail-support-card">
          <div className="upload-detail-section-head">
            <div>
              <div className="upload-detail-section-title">
                {t("teacherUploadDetail.uploadWalkthrough")}
              </div>
              <div className="upload-detail-section-subtitle">
                {t("teacherUploadDetail.uploadWalkthroughSubtitle")}
              </div>
            </div>
          </div>

          <div className="upload-detail-section-grid">
            {localizedUpload.sections.map((section) => (
              <article key={section.title} className="upload-detail-section">
                <strong>{section.title}</strong>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="upload-detail-card upload-detail-next-card">
          <div className="upload-detail-section-head">
            <div>
              <div className="upload-detail-section-title">{t("teacherUploadDetail.nextSteps")}</div>
              <div className="upload-detail-section-subtitle">
                {t("teacherUploadDetail.nextStepsSubtitle")}
              </div>
            </div>
          </div>

          <ol className="upload-detail-step-list">
            {localizedUpload.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
