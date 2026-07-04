"use client";

import Link from "next/link";
import { useTranslation } from "../components/translations";
import { getLearningDayHref } from "../learn";
import ActiveLessonWorkspace from "../learn/components/active-lesson-workspace";

export default function LessonPageClient({
  lesson,
  previousDay,
  nextDay,
  unit,
  progress,
  completedLessons,
  totalLessons,
  nextIncompleteStep,
  lessonParagraphs,
  lessonVideoChapters,
  lessonGifNotes,
  lessonPoints,
  rewardCards,
  resultCards,
}) {
  const t = useTranslation();

  return (
    <main className="main-content">
      <section className="lesson-page">
        <div className="lesson-hero">
          <div className="lesson-hero-copy">
            <Link className="lesson-back" href="/content">
              {t("lessonPage.backToLearningPath")}
            </Link>
            <span className="lesson-hero-pill">
              {lesson.unitLabel} / {lesson.label} / {progress}%{" "}
              {t("lessonPage.complete")}
            </span>
            <h1 className="lesson-page-title">{lesson.title}</h1>
            <p className="lesson-page-subtitle">{lesson.subtitle}</p>
            <div className="lesson-hero-actions">
              {previousDay
                ? <Link
                    className="lesson-secondary-link"
                    href={getLearningDayHref(previousDay.id)}
                  >
                    {t("lessonPage.previousLesson")}
                  </Link>
                : null}
              {nextDay
                ? <Link
                    className="lesson-primary-link"
                    href={getLearningDayHref(nextDay.id)}
                  >
                    {t("lessonPage.nextLesson")}
                  </Link>
                : null}
            </div>
          </div>

          <div className="lesson-hero-icon">
            <span aria-hidden="true" className="lesson-hero-icon-placeholder" />
          </div>
        </div>

        <ActiveLessonWorkspace lesson={lesson} />

        <div className="lesson-page-grid">
          <div className="lesson-page-main">
            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {t("lessonPage.lessonProgress")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.lessonProgressSubtitle")}
                  </div>
                </div>
                <span className="lesson-page-chip">
                  {completedLessons}/{totalLessons} {t("lessonPage.doneStatus")}
                </span>
              </div>

              <div className="lesson-step-icon-grid">
                {lesson.lessons.map((entry, index) => (
                  <Link
                    key={entry.id}
                    className={`lesson-step-node ${entry.completed ? "done" : ""} ${entry.id === nextIncompleteStep?.id ? "next" : ""}`}
                    href={getLearningDayHref(lesson.id)}
                    aria-label={entry.title}
                  >
                    <div className="lesson-step-node-index">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="lesson-step-node-icon">
                      <span
                        aria-hidden="true"
                        className={`lesson-step-node-icon-${entry.kind}`}
                      />
                    </div>
                    {entry.completed
                      ? <span className="lesson-step-node-status">
                          {t("lessonPage.doneStatus")}
                        </span>
                      : entry.id === nextIncompleteStep?.id
                        ? <span className="lesson-step-node-status">
                            {t("lessonPage.nextStatus")}
                          </span>
                        : null}
                  </Link>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {lesson.overviewTitle ?? t("lessonPage.lessonOverview")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.overviewSubtitle")}
                  </div>
                </div>
              </div>

              <div className="step-paragraph-stack">
                {lessonParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {t("lessonPage.visualLearning")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.visualSubtitle")}
                  </div>
                </div>
              </div>

              <div className="step-media-grid">
                <article className="step-media-card">
                  <div className="step-media-stage gif" aria-hidden="true">
                    <span className="step-media-road" />
                    <span className="step-media-car" />
                    <span className="step-media-sign" />
                  </div>
                  <strong>{t("lessonPage.gifDrill")}</strong>
                  <div className="step-media-copy">
                    {lessonGifNotes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                </article>

                <article className="step-media-card">
                  <div className="step-media-stage video" aria-hidden="true">
                    <span className="step-video-wave first" />
                    <span className="step-video-wave second" />
                    <span className="step-video-play" />
                  </div>
                  <strong>{t("lessonPage.videoGuide")}</strong>
                  <ol className="step-video-list">
                    {lessonVideoChapters.map((chapter) => (
                      <li key={chapter}>{chapter}</li>
                    ))}
                  </ol>
                </article>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {t("lessonPage.keyPoints")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.keyPointsSubtitle")}
                  </div>
                </div>
              </div>

              <ul className="step-point-list">
                {lessonPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {t("lessonPage.resultSystem")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.resultSystemSubtitle")}
                  </div>
                </div>
              </div>

              <div className="lesson-result-grid">
                {resultCards.map((card) => (
                  <article key={card.label} className="lesson-result-card">
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <p>{card.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {t("lessonPage.rewardSystem")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.rewardSystemSubtitle")}
                  </div>
                </div>
              </div>

              <div className="lesson-result-grid">
                {rewardCards.map((card) => (
                  <article key={card.label} className="lesson-result-card">
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <p>{card.note}</p>
                  </article>
                ))}
              </div>

              <div className="lesson-page-callout">
                {t("lessonPage.calloutFinishAll", {
                  lessonLabel: lesson.label,
                })}
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-head">
                <div>
                  <div className="lesson-page-section-title">
                    {t("lessonPage.teacherSupport")}
                  </div>
                  <div className="lesson-page-section-subtitle">
                    {t("lessonPage.teacherSupportSubtitle")}
                  </div>
                </div>
              </div>

              <div className="lesson-support-grid">
                <Link className="lesson-support-card" href="/live">
                  <strong>{t("lessonPage.liveClassRoom")}</strong>
                  <span>{t("lessonPage.liveClassRoomSubtitle")}</span>
                </Link>
                <Link className="lesson-support-card" href="/messages">
                  <strong>{t("lessonPage.messageTeacher")}</strong>
                  <span>{t("lessonPage.messageTeacherSubtitle")}</span>
                </Link>
                <Link className="lesson-support-card" href="/notifications">
                  <strong>{t("notifications.title")}</strong>
                  <span>{t("lessonPage.notificationsSubtitle")}</span>
                </Link>
              </div>
            </section>
          </div>

          <aside className="lesson-page-aside">
            <section className="lesson-page-card">
              <div className="lesson-page-section-title">
                {t("lessonPage.progressSnapshot")}
              </div>
              <div className="lesson-progress-panel">
                <div
                  className="lesson-progress-ring"
                  style={{ "--lesson-progress": `${progress}%` }}
                >
                  <span>{progress}%</span>
                </div>
                <div className="lesson-progress-meta">
                  <strong>
                    {completedLessons} {t("lessonPage.stepsComplete")}
                  </strong>
                  <span>
                    {totalLessons - completedLessons}{" "}
                    {t("lessonPage.stepsRemaining")}
                  </span>
                </div>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-section-title">
                {t("lessonPage.lessonMeta")}
              </div>
              <div className="lesson-support-grid">
                <div className="lesson-support-card">
                  <strong>{unit?.title ?? lesson.unitLabel}</strong>
                  <span>{t("lessonPage.currentUnitLabel")}</span>
                </div>
                <div className="lesson-support-card">
                  <strong>
                    {lesson.isLocked
                      ? t("lessonPage.statusLocked")
                      : t("lessonPage.statusLive")}
                  </strong>
                  <span>
                    {lesson.isLocked
                      ? t("lessonPage.lessonLockedDetail")
                      : t("lessonPage.lessonLiveDetail")}
                  </span>
                </div>
              </div>
            </section>

            <section className="lesson-page-card">
              <div className="lesson-page-section-title">
                {t("lessonPage.nextActions")}
              </div>
              <div className="lesson-next-actions">
                <Link className="lesson-primary-link" href="/live">
                  {t("lessonPage.openLiveLesson")}
                </Link>
                <Link className="lesson-secondary-link" href="/messages">
                  {t("lessonPage.sendTeacherMessage")}
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
