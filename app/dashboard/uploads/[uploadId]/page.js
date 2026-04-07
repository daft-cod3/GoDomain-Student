import { notFound } from "next/navigation";
import Sidebar from "../../../components/sidebar";
import TeacherUploadDetail from "../../../components/teacher-upload-detail";
import {
  getTeacherUpload,
  teacherUploadIds,
} from "../../../data/teacher-uploads";

export function generateStaticParams() {
  return teacherUploadIds.map((uploadId) => ({ uploadId }));
}

export default async function TeacherUploadPage({ params }) {
  const { uploadId } = await params;
  const upload = getTeacherUpload(uploadId);

  if (!upload) {
    notFound();
  }

  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <TeacherUploadDetail upload={upload} />
      </main>
    </div>
  );
}
