import Sidebar from "../components/sidebar";

export default function ContentLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar active="path" />
      {children}
    </div>
  );
}
