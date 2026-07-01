"use client";

import Link from "next/link";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { teacherUploads } from "../data/teacher-uploads";

const UNSEEN_UPLOADS_KEY = "godomain-unseen-uploads";

function getInitialUnseenMap() {
  return teacherUploads.reduce((acc, upload) => {
    acc[upload.id] = true;
    return acc;
  }, {});
}

function persistUnseenMap(nextMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(UNSEEN_UPLOADS_KEY, JSON.stringify(nextMap));
}

const DASHBOARD_UPLOAD_CATEGORIES = [
  { id: "video", accent: "violet" },
  { id: "image", accent: "mint" },
  { id: "link", accent: "rose" },
];

function getRecentUploadsByCategory(categoryId) {
  return teacherUploads
    .filter((upload) => upload.category === categoryId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);
}

function UploadCard({ category, uploads, unseen, onMarkSeen }) {
  return (
    <article
      className={`teacher-card teacher-card-link ${category.accent}${
        unseen ? " is-unseen" : " is-seen"
      }`}
    >
      <div className="teacher-recent-list">
        {uploads.map((upload) => (
          <Link
            key={upload.id}
            className="teacher-recent-upload"
            href={upload.href}
          >
            <span
              className={`teacher-icon ${upload.icon}`}
              aria-hidden="true"
            />
            <span>{upload.title}</span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className={`teacher-new-button${unseen ? " unseen" : " seen"}`}
        aria-pressed={!unseen}
        onClick={() => onMarkSeen(uploads.map((upload) => upload.id))}
      >
        <span>{unseen ? "New" : "Seen"}</span>
        {unseen
          ? <span className="teacher-new-popup">+{uploads.length}</span>
          : null}
      </button>
    </article>
  );
}

export default function TeacherUploadsSection() {
  const [unseenMap, setUnseenMap] = useState(() => getInitialUnseenMap());
  const [optimisticUnseenMap, setOptimisticUnseenMap] = useOptimistic(
    unseenMap,
    (currentState, nextState) => ({ ...currentState, ...nextState }),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(UNSEEN_UPLOADS_KEY);
    if (!stored) {
      persistUnseenMap(getInitialUnseenMap());
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const nextState = {
        ...getInitialUnseenMap(),
        ...parsed,
      };
      setUnseenMap(nextState);
    } catch {
      persistUnseenMap(getInitialUnseenMap());
    }
  }, []);

  function handleMarkSeen(uploadIds) {
    const seenUpdates = uploadIds.reduce((acc, uploadId) => {
      acc[uploadId] = false;
      return acc;
    }, {});

    startTransition(() => {
      setOptimisticUnseenMap(seenUpdates);
    });

    setUnseenMap((currentState) => {
      const nextState = {
        ...currentState,
        ...seenUpdates,
      };
      persistUnseenMap(nextState);
      return nextState;
    });
  }

  const dashboardUploadGroups = DASHBOARD_UPLOAD_CATEGORIES.map((category) => ({
    ...category,
    uploads: getRecentUploadsByCategory(category.id),
  })).filter((category) => category.uploads.length);

  return (
    <section className="dash-section teacher-uploads-section">
      <div className="dash-section-head">
        <div>
          <div className="dash-section-title">Teacher uploads</div>
          <div className="dash-section-subtitle">
            Essential revision content grouped as videos, images, and notes.
          </div>
        </div>
        <div className="teacher-uploads-summary">
          <span className="teacher-summary-pill">
            {Object.values(optimisticUnseenMap).filter((value) => value).length}{" "}
            unseen
          </span>
        </div>
      </div>

      <div className="teacher-grid teacher-grid-three">
        {dashboardUploadGroups.map((category) => (
          <UploadCard
            key={category.id}
            category={category}
            uploads={category.uploads}
            unseen={category.uploads.some(
              (upload) => optimisticUnseenMap[upload.id],
            )}
            onMarkSeen={handleMarkSeen}
          />
        ))}
      </div>
    </section>
  );
}
