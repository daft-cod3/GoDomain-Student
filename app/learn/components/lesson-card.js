import Link from "next/link";
import { getLearningDayHref } from "..";
import { JourneyIcon } from "../icons";

function getCompletedSteps(lesson) {
  return (
    lesson.completedSteps ??
    lesson.lessons.filter((entry) => entry.completed).length
  );
}

function getLessonState(lesson, isRecommended) {
  if (lesson.isLocked) {
    return "Locked";
  }

  if (lesson.progress === 100) {
    return "Complete";
  }

  if (isRecommended) {
    return "Up next";
  }

  if (getCompletedSteps(lesson) > 0) {
    return "In progress";
  }

  return "Ready";
}

export default function LessonCard({
  currentLessonId,
  isActive,
  lesson,
  onSelect,
  pathIndex = 0,
}) {
  const isRecommended = lesson.id === currentLessonId;
  const lessonState = getLessonState(lesson, isRecommended);

  const lessonCircle = (
    <>
      <span className="lp-lesson-icon">
        <JourneyIcon name={lesson.icon} />
      </span>
      <span className="lp-lesson-node-progress">{lesson.progress}%</span>
    </>
  );

  return (
    <article
      className={`lp-stack-card${isActive ? " active" : ""}${lesson.isLocked ? " locked" : " open"}${lesson.progress === 100 ? " complete" : ""}${isRecommended ? " recommended" : ""}`}
      style={{ "--card-index": pathIndex }}
      onMouseEnter={() => onSelect(lesson.id)}
    >
      {/* connector line between cards */}
      {pathIndex > 0 && <span className="lp-stack-connector" aria-hidden="true" />}

      <div className="lp-stack-node">
        {lesson.isLocked
          ? <button
              className="lp-stack-hit"
              type="button"
              onClick={() => onSelect(lesson.id)}
              onFocus={() => onSelect(lesson.id)}
              aria-pressed={isActive}
            >
              {lessonCircle}
            </button>
          : <Link
              className="lp-stack-hit"
              href={getLearningDayHref(lesson.id)}
              onClick={() => onSelect(lesson.id)}
              onFocus={() => onSelect(lesson.id)}
              aria-current={isActive ? "page" : undefined}
            >
              {lessonCircle}
            </Link>}
      </div>

      <div className="lp-stack-info">
        <div className="lp-stack-info-top">
          <span className="lp-stack-index">{lesson.label}</span>
          <span className="lp-stack-state">{lessonState}</span>
        </div>
        <strong className="lp-stack-title">{lesson.title}</strong>
        <span className="lp-stack-desc">{lesson.summary ?? lesson.unitLabel}</span>

        <div className="lp-stack-progress-row">
          <div className="lp-stack-track" aria-hidden="true">
            <span style={{ width: `${lesson.progress}%` }} />
          </div>
          <span className="lp-stack-pct">{lesson.progress}%</span>
        </div>

        <span className="lp-stack-segments" aria-hidden="true">
          {lesson.lessons.map((entry) => (
            <i key={entry.id} className={entry.completed ? "done" : ""} />
          ))}
        </span>
      </div>
    </article>
  );
}
