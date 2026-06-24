import Link from "next/link";
import { learningUnits } from "../learn";
import LearnCard from "./components/learnCard";

export default function SubLearnIndexPage() {
  return (
    <main className="sl-index-root">
      <div className="sl-index-hero">
        <div className="sl-index-hero-copy">
          <span className="sl-index-eyebrow">Learning Path</span>
          <h1 className="sl-index-title">Sublesson Library</h1>
          <p className="sl-index-subtitle">
            Every lesson broken into focused subtopics. Pick any card to start,
            continue, or revise at your own pace.
          </p>
        </div>
        <Link href="/content" className="sl-index-back">
          Back to learning path
        </Link>
      </div>

      {learningUnits
        .filter((unit) => unit && unit.id && Array.isArray(unit.lessons))
        .map((unit) => {
          const safeLessons = unit.lessons.filter(
            (lesson) => lesson && lesson.id && Array.isArray(lesson.lessons),
          );

          const completedLessons = safeLessons.filter((lesson) =>
            lesson.lessons.every((step) => step?.completed),
          ).length;

          return (
            <section key={unit.id} className="sl-index-unit">
              <div className="sl-index-unit-head">
                <div className="sl-index-unit-info">
                  <span className="sl-index-unit-label">{unit.label}</span>
                  <h2 className="sl-index-unit-title">{unit.title}</h2>
                  <p className="sl-index-unit-summary">{unit.summary}</p>
                </div>
                <div className="sl-index-unit-stats">
                  <span className="sl-index-unit-stat">
                    <strong>{completedLessons}</strong>
                    <em>/{safeLessons.length} done</em>
                  </span>
                  <span className="sl-index-unit-stat">
                    <strong>{unit.progress ?? 0}%</strong>
                    <em>progress</em>
                  </span>
                </div>
              </div>

              <div className="sl-index-cards">
                {safeLessons.map((lesson) => (
                  <LearnCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </section>
          );
        })}
    </main>
  );
}
