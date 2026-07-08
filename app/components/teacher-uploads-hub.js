import Link from "next/link";
import { teacherUploads } from "../data/teacher-uploads";

const uploadGroups = [
  {
    id: "video",
    title: "Video uploads",
    eyebrow: "Watch",
    description:
      "Teacher replays and narrated breakdowns grouped for quick revision.",
    icon: "video",
    accent: "violet",
  },
  {
    id: "image",
    title: "Image uploads",
    eyebrow: "Review",
    description:
      "Photo walls, road markings, and visual references in one scan-friendly section.",
    icon: "image",
    accent: "mint",
  },
  {
    id: "link",
    title: "Links and resources",
    eyebrow: "Open",
    description:
      "Revision packs, checkpoints, notes, and external learning resources.",
    icon: "link",
    accent: "rose",
  },
];

function UploadHubIcon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "video") {
    return (
      <svg {...props}>
        <rect x="3" y="6" width="13" height="12" rx="3" />
        <path d="m16 10 5-3v10l-5-3" />
      </svg>
    );
  }

  if (name === "image") {
    return (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="m21 15-4.2-4.2a2 2 0 0 0-2.8 0L6 19" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19.07" />
    </svg>
  );
}

function getUploads(categoryId) {
  return teacherUploads
    .filter((upload) => upload.category === categoryId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export default function TeacherUploadsHub() {
  const totalUploads = teacherUploads.length;

  return (
    <section className="uploads-hub-page">
      <div className="uploads-hub-hero">
        <div>
          <Link className="upload-detail-back" href="/dashboard">
            Back to dashboard
          </Link>
          <div className="uploads-hub-kicker">Teacher uploads</div>
          <h1 className="uploads-hub-title">
            Videos, images, and links organized for fast revision.
          </h1>
          <p className="uploads-hub-summary">
            Browse every teacher upload by media type, then open the individual
            resource for the full walkthrough, highlights, and next steps.
          </p>
        </div>

        <div className="uploads-hub-overview" aria-label="Upload summary">
          <strong>{totalUploads}</strong>
          <span>total resources</span>
        </div>
      </div>

      <div className="uploads-hub-sections">
        {uploadGroups.map((group) => {
          const uploads = getUploads(group.id);

          return (
            <section
              key={group.id}
              id={group.id}
              className={`uploads-hub-section ${group.accent}`}
            >
              <div className="uploads-hub-section-head">
                <span className="uploads-hub-section-icon">
                  <UploadHubIcon name={group.icon} />
                </span>
                <div>
                  <span>{group.eyebrow}</span>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
              </div>

              <div className="uploads-hub-grid">
                {uploads.map((upload) => (
                  <Link
                    key={upload.id}
                    className="uploads-hub-card"
                    href={upload.href}
                  >
                    <div className="uploads-hub-card-top">
                      <span className={`teacher-icon ${upload.icon}`} />
                      <span>{upload.type}</span>
                    </div>
                    <strong>{upload.title}</strong>
                    <p>{upload.summary}</p>
                    <div className="uploads-hub-card-meta">
                      <span>{upload.teacher}</span>
                      <span>{upload.action}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
