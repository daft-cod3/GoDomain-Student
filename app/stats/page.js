import Sidebar from "../components/sidebar";
import Stats from "../components/stats";

export default function StatsPage() {
  return (
    <div className="app-shell">
      <Sidebar active="stats" />
      <main className="main-content">
        <Stats />
      </main>
    </div>
  );
}
