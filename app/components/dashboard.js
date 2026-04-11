import Link from "next/link";
import { teacherUploads } from "../data/teacher-uploads";
import { getLearningDayHref } from "../learn";
import ContentReview from "../learn/components/contReview";
import ModelTownBoard from "./modelTownBoard";
import RoadSign from "./roadSign";

const popularLessons = [
  {
    id: "controls",
    title: "Vehicle controls",
    meta: "4 sub-lessons / Foundation setup",
    tag: "Hot",
    href: getLearningDayHref("unit-1-lesson-1"),
    art: "art-lilac",
  },
  {
    id: "signs",
    title: "Traffic signs",
    meta: "4 sub-lessons / Fast recall drill",
    tag: "Trending",
    href: getLearningDayHref("unit-1-lesson-2"),
    art: "art-peach",
  },
  {
    id: "junctions",
    title: "Junction rules",
    meta: "4 sub-lessons / Risk-heavy topic",
    tag: "Popular",
    href: getLearningDayHref("unit-1-lesson-4"),
    art: "art-mint",
  },
  {
    id: "hazard",
    title: "Hazard awareness",
    meta: "4 sub-lessons / Scan discipline",
    tag: "Top pick",
    href: getLearningDayHref("unit-1-lesson-5"),
    art: "art-sky",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-panel">
        <header className="dash-topbar">
          <div className="dash-top-actions">
            <span className="dash-status-pill">Low-motion workspace</span>
            <div className="dash-avatar">AR</div>
          </div>
        </header>

        <section className="dash-hero">
          <div className="dash-hero-content">
            <div className="dash-hero-tag">Student progress hub</div>
            <h1 className="dash-hero-title">
              Track the live unit, lesson momentum, and review unlocks in one place.
            </h1>
            <p className="dash-hero-subtitle">
              Work through notes, boards, signs, and quizzes on the learning
              path. The dashboard now keeps the active unit snapshot, current
              lesson progress, and finished review cards together.
            </p>
            <Link className="dash-hero-button" href="/content">
              Open learning path
            </Link>
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
          </div>
        </section>

        <div className="dash-body">
          <div className="dash-main">
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Teacher uploads</div>
                  <div className="dash-section-subtitle">
                    Open each card for its own dedicated upload page with
                    teacher-specific content.
                  </div>
                </div>
              </div>
              <div className="teacher-grid">
                {teacherUploads.map((upload) => (
                  <Link
                    key={upload.id}
                    className={`teacher-card teacher-card-link ${upload.accent}`}
                    href={upload.href}
                  >
                    <div className="teacher-card-top">
                      <span className={`teacher-icon ${upload.icon}`} />
                      <span className="teacher-type">{upload.type}</span>
                      <span className="teacher-badge">Latest</span>
                    </div>
                    <div className="teacher-title">{upload.title}</div>
                    <div className="teacher-meta">{upload.meta}</div>
                    <p className="teacher-summary">{upload.summary}</p>
                    <div className="teacher-card-footer">
                      <span className="teacher-card-status">
                        Teacher shared
                      </span>
                      <span className="teacher-action">{upload.action}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <ContentReview />

            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <div className="dash-section-title">Popular</div>
                  <div className="dash-section-subtitle">
                    Most-revisited lessons and revision packs this week.
                  </div>
                </div>
                <Link className="dash-link" href="/content">
                  View all
                </Link>
              </div>
              <div className="dash-card-grid">
                {popularLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    className="dash-course-card"
                    href={lesson.href}
                  >
                    <div className={`dash-card-art ${lesson.art}`} />
                    <div className="dash-card-row">
                      <div className="dash-card-title">{lesson.title}</div>
                      <span className="dash-card-tag">{lesson.tag}</span>
                    </div>
                    <div className="dash-card-meta">{lesson.meta}</div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        <RoadSign />
        <ModelTownBoard />
      </div>
    </div>
  );
}
