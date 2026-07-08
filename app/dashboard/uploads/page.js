import Sidebar from "../../components/sidebar";
import TeacherUploadsHub from "../../components/teacher-uploads-hub";

export default function TeacherUploadsHubPage() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <TeacherUploadsHub />
      </main>
    </div>
  );
}
