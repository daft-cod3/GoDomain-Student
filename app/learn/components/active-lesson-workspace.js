"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LessonIcon } from "../icons";
import { getLearningDayHref, learningDays } from "../index";
import { LEARNING_PROGRESS_KEY } from "../progress-store";

function readCompletedStepIds(lessonId) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const storedLesson = payload.lessons?.find((l) => l.id === lessonId);
    return new Set(storedLesson?.completedStepIds ?? []);
  } catch {
    return new Set();
  }
}

function writeCompletedStepIds(lessonId, completedStepIds) {
  try {
    const payload = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? "{}",
    );
    const lessons = Array.isArray(payload.lessons) ? payload.lessons : [];
    const nextLesson = {
      id: lessonId,
      completedStepIds: Array.from(completedStepIds),
    };
    const exists = lessons.some((l) => l.id === lessonId);
    const nextLessons = exists
      ? lessons.map((l) => (l.id === lessonId ? nextLesson : l))
      : [...lessons, nextLesson];

    window.localStorage.setItem(
      LEARNING_PROGRESS_KEY,
      JSON.stringify({ ...payload, lessons: nextLessons }),
    );
  } catch {}
}

function cardKindLabel(kind) {
  const labels = {
    intro: "Brief",
    infograph: "Infograph",
    picture: "Picture",
    video: "Video",
    gif: "GIF",
    matching: "Match",
    "picture-quiz": "Picture quiz",
    "audio-quiz": "Audio quiz",
    task: "Practice",
    recap: "Quiz",
  };

  return labels[kind] ?? "Card";
}

function buildFlashCards(lesson) {
  const topics = lesson.overviewTopics ?? [];
  const points = topics.flatMap((topic) => topic.points ?? []);
  const firstPoints = points.length
    ? points
    : lesson.lessons.map((s) => s.detail);
  const topicKinds = ["infograph", "picture", "video", "audio-quiz"];
  const stepKinds = ["task", "matching", "picture-quiz", "audio-quiz"];

  const cards = [
    {
      id: `${lesson.id}-intro`,
      kind: "intro",
      title: lesson.title,
      prompt: lesson.subtitle,
      body:
        lesson.overviewSummary ??
        "Build the main driving routine, then prove it through short checks.",
      points: firstPoints.slice(0, 3),
    },
    ...topics.map((topic, index) => ({
      id: `${lesson.id}-topic-${index + 1}`,
      kind: topicKinds[index % topicKinds.length],
      title: topic.title,
      prompt: lesson.overviewTitle ?? "Lesson content",
      body: topic.points?.[0] ?? lesson.subtitle,
      points: topic.points?.slice(0, 4) ?? [],
    })),
    ...lesson.lessons.map((step, index) => ({
      id: step.id,
      stepId: step.id,
      kind: stepKinds[index % stepKinds.length],
      title: step.title,
      prompt: step.detail,
      body: `Suggested time: ${step.duration ?? "short drill"}`,
      lessonKind: step.kind,
      points: [
        step.detail,
        topics[index]?.points?.[0],
        topics[index]?.points?.[1],
      ].filter(Boolean),
    })),
    ...(lesson.roadOptionIllustrations ?? []).map((option, index) => ({
      id: `${lesson.id}-route-${option.id}`,
      kind: "gif",
      title: option.label,
      prompt: "Model town board route",
      body: option.text,
      image: option.image,
      points: [option.text],
      delay: index,
    })),
    {
      id: `${lesson.id}-recap`,
      kind: "recap",
      title: "Lesson checkpoint",
      prompt: "Final check",
      body: "Confirm the strongest lesson points before the reward summary.",
      points: firstPoints.slice(0, 4),
    },
  ];

  return cards.map((card, index) => ({
    ...card,
    order: index + 1,
  }));
}

function FlashMedia({ card }) {
  if (card.image) {
    return (
      <div className="alw-flash-media alw-flash-media--gif">
        <Image
          src={card.image}
          alt={`${card.title} animation`}
          fill
          sizes="(max-width: 820px) 100vw, 42vw"
          unoptimized
        />
      </div>
    );
  }

  if (card.kind === "video") {
    return (
      <div
        className="alw-flash-media alw-flash-media--video"
        aria-hidden="true"
      >
        <span className="alw-video-road" />
        <span className="alw-video-play" />
        <span className="alw-video-pulse one" />
        <span className="alw-video-pulse two" />
      </div>
    );
  }

  if (card.kind === "audio-quiz") {
    return (
      <div
        className="alw-flash-media alw-flash-media--audio"
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4, 5].map((bar) => (
          <span key={bar} style={{ "--bar": bar + 1 }} />
        ))}
      </div>
    );
  }

  if (card.kind === "picture" || card.kind === "picture-quiz") {
    return (
      <div
        className="alw-flash-media alw-flash-media--picture"
        aria-hidden="true"
      >
        <span className="alw-picture-sky" />
        <span className="alw-picture-road" />
        <span className="alw-picture-car" />
        <span className="alw-picture-sign" />
      </div>
    );
  }

  if (card.kind === "matching") {
    return (
      <div
        className="alw-flash-media alw-flash-media--match"
        aria-hidden="true"
      >
        <span>Control</span>
        <i />
        <span>Action</span>
        <span>Signal</span>
        <i />
        <span>Response</span>
      </div>
    );
  }

  return (
    <div className="alw-flash-media alw-flash-media--info" aria-hidden="true">
      <span className="alw-info-ring" />
      <span className="alw-info-line one" />
      <span className="alw-info-line two" />
      <span className="alw-info-line three" />
    </div>
  );
}

function CompletionView({ lesson, cardCount, completedStepCount }) {
  const accuracy = Math.min(98, 74 + cardCount * 2);
  const hp = 12 + Math.min(18, lesson.lessonNumber * 3);
  const coins = 35 + cardCount * 5;
  const energy = Math.max(8, Math.min(24, cardCount + 6));
  const lessonIndex = learningDays.findIndex((entry) => entry.id === lesson.id);
  const nextLesson =
    lessonIndex >= 0 ? (learningDays[lessonIndex + 1] ?? null) : null;
  const badges = [
    `${lesson.title} Clear`,
    completedStepCount >= lesson.lessons.length ? "Full Route" : "Focused Pass",
    accuracy >= 90 ? "Sharp Recall" : "Steady Builder",
  ];

  return (
    <section className="alw-completion" aria-live="polite">
      <div className="alw-completion-medal" aria-hidden="true">
        <span />
      </div>
      <div className="alw-completion-copy">
        <span className="alw-completion-kicker">Lesson complete</span>
        <h2>{lesson.title}</h2>
        <p>
          Performance is ready for the learner record with rewards applied to
          HP, coins, badges, and energy.
        </p>
      </div>

      <div className="alw-completion-stats">
        <article>
          <span>Performance</span>
          <strong>{accuracy}%</strong>
        </article>
        <article>
          <span>HP earned</span>
          <strong>+{hp}</strong>
        </article>
        <article>
          <span>Coins earned</span>
          <strong>+{coins}</strong>
        </article>
        <article>
          <span>Energy used</span>
          <strong>-{energy}</strong>
        </article>
      </div>

      <div className="alw-badge-row">
        {badges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>

      <div className="alw-completion-actions">
        <Link className="alw-completion-link primary" href="/content">
          Learning path
        </Link>
        <Link
          className="alw-completion-link"
          href={getLearningDayHref(lesson.id)}
        >
          Review cards
        </Link>
        {nextLesson
          ? <Link
              className="alw-completion-link"
              href={getLearningDayHref(nextLesson.id)}
            >
              Next lesson
            </Link>
          : null}
      </div>
    </section>
  );
}

export default function ActiveLessonWorkspace({ lesson }) {
  const cards = useMemo(() => buildFlashCards(lesson), [lesson]);
  const allStepIds = useMemo(
    () => new Set(lesson.lessons.map((step) => step.id)),
    [lesson.lessons],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState(() => new Set());
  const [completedStepIds, setCompletedStepIds] = useState(() => new Set());
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const storedSteps = readCompletedStepIds(lesson.id);
    setCompletedStepIds(storedSteps);

    if (lesson.lessons.length && storedSteps.size >= lesson.lessons.length) {
      setCompletedCards(new Set(cards.map((card) => card.id)));
      setShowCompletion(true);
    }
  }, [cards, lesson.id, lesson.lessons.length]);

  const activeCard = cards[activeIndex] ?? cards[0];
  const completedCount = completedCards.size;
  const progress = cards.length
    ? Math.round((completedCount / cards.length) * 100)
    : 0;
  const isCurrentComplete = activeCard
    ? completedCards.has(activeCard.id)
    : false;
  const isLastCard = activeIndex >= cards.length - 1;

  function completeActiveCard() {
    if (!activeCard) return;

    setCompletedCards((current) => {
      const next = new Set(current);
      next.add(activeCard.id);
      return next;
    });

    if (activeCard.stepId) {
      setCompletedStepIds((current) => {
        const next = new Set(current);
        next.add(activeCard.stepId);
        writeCompletedStepIds(lesson.id, next);
        return next;
      });
    }

    if (isLastCard) {
      writeCompletedStepIds(lesson.id, allStepIds);
      setCompletedStepIds(allStepIds);
      setShowCompletion(true);
      return;
    }

    setActiveIndex((index) => Math.min(index + 1, cards.length - 1));
  }

  function goPrev() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function goNext() {
    if (!isCurrentComplete) return;
    setActiveIndex((index) => Math.min(cards.length - 1, index + 1));
  }

  if (showCompletion) {
    return (
      <section className="alw-shell alw-flash-shell">
        <CompletionView
          lesson={lesson}
          cardCount={cards.length}
          completedStepCount={completedStepIds.size}
        />
      </section>
    );
  }

  return (
    <section className="alw-shell alw-flash-shell">
      <div className="alw-flash-top">
        <div>
          <span className="alw-eyebrow">
            {lesson.unitLabel} / {lesson.label}
          </span>
          <h1 className="alw-title">{lesson.title}</h1>
        </div>
        <div className="alw-flash-meter">
          <strong>{progress}%</strong>
          <span>
            {completedCount}/{cards.length}
          </span>
        </div>
      </div>

      <div className="alw-progress-bar" aria-hidden="true">
        <div className="alw-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {activeCard && (
        <article className={`alw-flash-card alw-card--${activeCard.kind}`}>
          <div className="alw-flash-card-copy">
            <div className="alw-panel-meta">
              <span className="alw-kind-badge">
                {cardKindLabel(activeCard.kind)}
              </span>
              {activeCard.lessonKind
                ? <span className="alw-tab-icon">
                    <LessonIcon kind={activeCard.lessonKind} />
                  </span>
                : null}
              <span className="alw-panel-counter">
                Card {activeCard.order} of {cards.length}
              </span>
            </div>

            <h2 className="alw-panel-title">{activeCard.title}</h2>
            <p className="alw-panel-detail">{activeCard.prompt}</p>
            <p className="alw-flash-body">{activeCard.body}</p>

            {activeCard.points.length
              ? <ul className="alw-topic-points">
                  {activeCard.points.map((point) => (
                    <li key={point} className="alw-topic-point">
                      <span className="alw-topic-bullet" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              : null}
          </div>

          <FlashMedia card={activeCard} />
        </article>
      )}

      <div className="alw-flash-footer">
        <fieldset className="alw-flash-dots">
          <legend className="sr-only">Flash card progress</legend>
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`alw-flash-dot${index === activeIndex ? " active" : ""}${completedCards.has(card.id) ? " done" : ""}`}
              onClick={() => {
                if (
                  index <= activeIndex ||
                  completedCards.has(cards[index - 1]?.id)
                ) {
                  setActiveIndex(index);
                }
              }}
              aria-label={`Card ${index + 1}`}
            />
          ))}
        </fieldset>

        <div className="alw-actions">
          <button
            type="button"
            className="alw-nav-btn"
            onClick={goPrev}
            disabled={activeIndex === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="alw-nav-btn"
            onClick={goNext}
            disabled={!isCurrentComplete || isLastCard}
          >
            Next
          </button>
          <button
            type="button"
            className={`alw-complete-btn${isCurrentComplete ? " alw-complete-btn--done" : ""}`}
            onClick={completeActiveCard}
          >
            {isCurrentComplete
              ? "Completed"
              : isLastCard
                ? "Finish lesson"
                : "Complete card"}
          </button>
        </div>
      </div>
    </section>
  );
}
