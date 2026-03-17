import Dashboard from "../components/dashboard";
import Sidebar from "../components/sidebar";

export default function DashboardPage() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  );
}
