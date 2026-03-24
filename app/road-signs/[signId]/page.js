import Link from "next/link";
import { notFound } from "next/navigation";
import { RoadSignGraphic } from "../../components/roadSign";
import Sidebar from "../../components/sidebar";
import {
  getRoadSignById,
  getRoadSignHref,
  roadSignIds,
  roadSigns,
} from "../../data/road-signs";

export function generateStaticParams() {
  return roadSignIds.map((signId) => ({ signId }));
}

export default async function RoadSignDetailPage({ params }) {
  const { signId } = await params;
  const sign = getRoadSignById(signId);

  if (!sign) {
    notFound();
  }

  const relatedSigns = roadSigns
    .filter(
      (entry) =>
        entry.id !== sign.id &&
        (entry.groupId === sign.groupId ||
          entry.categoryId === sign.categoryId),
    )
    .slice(0, 4);

  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <section className="road-sign-page">
          <header className="road-sign-detail-hero">
            <div className="road-sign-detail-copy">
              <Link className="road-sign-back" href="/dashboard">
                Back to dashboard
              </Link>
              <span className="road-sign-detail-pill">
                {sign.categoryTitle} / {sign.groupTitle}
              </span>
              <h1 className="road-sign-detail-title">{sign.label}</h1>
              <p className="road-sign-detail-subtitle">{sign.caption}</p>
            </div>

            <div className="road-sign-detail-figure">
              <div className={`road-sign-figure ${sign.family}`}>
                <RoadSignGraphic sign={sign} />
              </div>
            </div>
          </header>

          <div className="road-sign-detail-layout">
            <section className="road-sign-detail-card">
              <div className="road-sign-detail-card-title">
                Where it is placed
              </div>
              <p>{sign.placement}</p>
            </section>

            <section className="road-sign-detail-card">
              <div className="road-sign-detail-card-title">
                Why it is put up
              </div>
              <p>{sign.reason}</p>
            </section>

            <section className="road-sign-detail-card">
              <div className="road-sign-detail-card-title">
                Penalties for disobeying
              </div>
              <ul className="road-sign-detail-list">
                {sign.penalties.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>

            <section className="road-sign-detail-card">
              <div className="road-sign-detail-card-title">
                Precautions to take
              </div>
              <ul className="road-sign-detail-list">
                {sign.precautions.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="road-sign-detail-card road-sign-related-card">
            <div className="road-sign-detail-card-head">
              <div>
                <div className="road-sign-detail-card-title">Related signs</div>
                <p className="road-sign-detail-note">
                  Open nearby rules and hazards from the same dashboard
                  category.
                </p>
              </div>
            </div>

            <div className="road-sign-related-grid">
              {relatedSigns.map((entry) => (
                <Link
                  key={entry.id}
                  className="road-sign-related-item"
                  href={getRoadSignHref(entry.id)}
                >
                  <div className={`road-sign-figure ${entry.family}`}>
                    <RoadSignGraphic sign={entry} />
                  </div>
                  <strong>{entry.label}</strong>
                  <span>{entry.groupTitle}</span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
