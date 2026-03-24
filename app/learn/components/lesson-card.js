import Link from "next/link";
import { getLearningDayHref } from "..";
import { JourneyIcon } from "../icons";

function getCompletedSteps(lesson) {
  return lesson.lessons.filter((entry) => entry.completed).length;
}

function getLessonState(lesson) {
  if (lesson.isLocked) {
    return "Locked";
  }

  if (getCompletedSteps(lesson) === lesson.lessons.length) {
    return "Complete";
  }

  if (getCompletedSteps(lesson) > 0) {
    return "In progress";
  }

  return "Ready";
}

export default function LessonCard({ isActive, lesson, onSelect }) {
  const completedSteps = getCompletedSteps(lesson);
  const lessonState = getLessonState(lesson);
  const lessonContent = (
    <>
      <span className="lp-lesson-head">
        <span className="lp-lesson-index">
          {String(lesson.lessonNumber).padStart(2, "0")}
        </span>
        <span className="lp-lesson-icon">
          <JourneyIcon name={lesson.icon} />
        </span>
        <span className="lp-lesson-state">{lessonState}</span>
      </span>

      <span className="lp-lesson-copy">
        <strong>{lesson.title}</strong>
        <span>{lesson.subtitle}</span>
      </span>

      <span className="lp-lesson-stats">
        <span>{completedSteps}/4 steps done</span>
        <span>{lesson.isLocked ? "Unlock later" : "Open lesson page"}</span>
      </span>

      <span className="lp-lesson-segments" aria-hidden="true">
        {lesson.lessons.map((entry) => (
          <i key={entry.id} className={entry.completed ? "done" : ""} />
        ))}
      </span>
    </>
  );

  return (
    <article
      className={`lp-lesson-card ${isActive ? "active" : ""} ${lesson.isLocked ? "locked" : "open"}`}
      onMouseEnter={() => onSelect(lesson.id)}
    >
      {lesson.isLocked
        ? <button
            className="lp-lesson-hit"
            type="button"
            onClick={() => onSelect(lesson.id)}
            aria-pressed={isActive}
          >
            {lessonContent}
          </button>
        : <Link
            className="lp-lesson-hit"
            href={getLearningDayHref(lesson.id)}
            onFocus={() => onSelect(lesson.id)}
            aria-current={isActive ? "page" : undefined}
          >
            {lessonContent}
          </Link>}

      {lesson.isLocked
        ? <span className="lp-lesson-link disabled">Locked</span>
        : <Link className="lp-lesson-link" href={getLearningDayHref(lesson.id)}>
            Start topic
          </Link>}
    </article>
  );
}
