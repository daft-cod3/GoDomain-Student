import { useTranslation } from "../components/translations";
import Sidebar from "../components/sidebar";

const notifications = [
  {
    id: "notice-video",
    titleKey: "notifications.noticeVideoTitle",
    bodyKey: "notifications.noticeVideoBody",
    time: "2 hours ago",
    tone: "accent",
  },
  {
    id: "notice-quiz",
    titleKey: "notifications.noticeQuizTitle",
    bodyKey: "notifications.noticeQuizBody",
    time: "Today",
    tone: "warm",
  },
  {
    id: "notice-live",
    titleKey: "notifications.noticeLiveTitle",
    bodyKey: "notifications.noticeLiveBody",
    time: "Today",
    tone: "cool",
  },
  {
    id: "notice-message",
    titleKey: "notifications.noticeMessageTitle",
    bodyKey: "notifications.noticeMessageBody",
    time: "Just now",
    tone: "accent",
  },
];

export default function NotificationsPage() {
  const t = useTranslation();

  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <section className="notifications-page">
          <div className="notifications-hero">
            <div>
              <div className="notifications-eyebrow">{t("notifications.title")}</div>
              <h1 className="notifications-title">{t("notifications.title")}</h1>
              <p className="notifications-subtitle">
                {t("notifications.subtitle")}
              </p>
            </div>
          </div>

          <div className="notifications-list">
            {notifications.map((item) => (
              <article
                key={item.id}
                className={`notification-card ${item.tone}`}
              >
                <div className="notification-time">{item.time}</div>
                <div className="notification-title">{t(item.titleKey)}</div>
                <p>{t(item.bodyKey)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
