import Sidebar from "../components/sidebar";
import LearnPath from "../learn/components/learning-path-shell";

export default function ContentPage() {
  return (
    <div className="app-shell">
      <Sidebar active="path" />
      <main className="main-content learn-main-content">
        <LearnPath />
      </main>
    </div>
  );
}
