import Sidebar from "../components/sidebar";
import StatsLive from "../components/stats-live";

export default function StatsPage() {
  return (
    <div className="app-shell">
      <Sidebar active="stats" />
      <main className="main-content">
        <StatsLive />
      </main>
    </div>
  );
}
