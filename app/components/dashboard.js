import Link from "next/link";
import { getLearningDayHref, learningDays } from "../learn";
import ContentReview from "../learn/components/contReview";
import RoadSign from "./roadSign";
import TeacherUploadsSection from "./teacher-uploads-section";

const lessonPerformance = {
  "unit-1-lesson-1": 78,
  "unit-1-lesson-2": 62,
  "unit-1-lesson-3": 57,
  "unit-1-lesson-4": 43,
  "unit-1-lesson-5": 68,
};

const worstPerformedLesson = [...learningDays]
  .filter((lesson) => !lesson.isLocked)
  .sort(
    (a, b) =>
      (lessonPerformance[a.id] ?? a.progress ?? 0) -
      (lessonPerformance[b.id] ?? b.progress ?? 0),
  )[0];

function HeroIcon({ path }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export default function Dashboard() {
  const recommendationScore = worstPerformedLesson
    ? (lessonPerformance[worstPerformedLesson.id] ??
      worstPerformedLesson.progress ??
      0)
    : 0;

  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">Progress hub</div>
            <h1 className="dash-hero-title">
              Track the live unit, lesson momentum, and review unlocks in one
              place.
            </h1>
            <p className="dash-hero-subtitle">
              Work through notes, boards, signs, and quizzes on the learning
              path. The dashboard now keeps the active unit snapshot, current
              lesson progress, and finished review cards together.
            </p>
            <div className="dash-hero-actions">
              <Link className="dash-hero-button primary" href="/content">
                <HeroIcon path={<path d="M5 12h14M12 5l7 7-7 7" />} />
                Open learning path
              </Link>
              <Link className="dash-hero-button secondary" href="/stats">
                <HeroIcon
                  path={
                    <>
                      <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z" />
                      <path d="M9 19V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10" />
                      <path d="M15 19V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z" />
                    </>
                  }
                />
                View progress
              </Link>
            </div>

            {worstPerformedLesson
              ? <Link
                  className="dash-hero-recommendation"
                  href={getLearningDayHref(worstPerformedLesson.id)}
                >
                  <span className="dash-recommend-icon" aria-hidden="true">
                    <HeroIcon
                      path={
                        <>
                          <path d="M4 19V5" />
                          <path d="M4 19h16" />
                          <path d="m8 15 3-4 3 2 4-6" />
                          <path d="M18 7h-4" />
                          <path d="M18 7v4" />
                        </>
                      }
                    />
                  </span>
                  <span>
                    <strong>{worstPerformedLesson.title}</strong>
                    <small>
                      Worst performed lesson / {recommendationScore}% score
                    </small>
                  </span>
                </Link>
              : null}
          </div>

          <div className="dash-hero-art">
            <div className="book-stack">
              <span className="book book-one" />
              <span className="book book-two" />
              <span className="book book-three" />
              <span className="book book-four" />
              <span className="book book-five" />
            </div>
            <div className="book-stand">
              <span />
              <span />
            </div>
            <div className="floating-elements" aria-hidden="true">
              <div className="floating-badge">
                <HeroIcon
                  path={
                    <>
                      <path d="M7 17h10" />
                      <path d="M6 17v-4l2-5h8l2 5v4" />
                      <path d="M8 17v2" />
                      <path d="M16 17v2" />
                    </>
                  }
                />
              </div>
              <div className="floating-badge">
                <HeroIcon
                  path={
                    <>
                      <path d="M4 19.5V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2" />
                      <path d="M8 7h6" />
                      <path d="M8 11h5" />
                    </>
                  }
                />
              </div>
              <div className="floating-badge">
                <HeroIcon
                  path={
                    <>
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 4v4" />
                      <path d="M20 12h-4" />
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <div className="dash-body">
          <div className="dash-main">
            <TeacherUploadsSection />
            <ContentReview />
          </div>
        </div>

        <RoadSign />
      </div>
    </div>
  );
}
