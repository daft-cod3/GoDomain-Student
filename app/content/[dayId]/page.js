import { notFound } from "next/navigation";
import { getLearningDay, learningDayIds } from "../../learn";
import ActiveLessonWorkspace from "../../learn/components/active-lesson-workspace";

export function generateStaticParams() {
  return learningDayIds.map((dayId) => ({ dayId }));
}

export default async function LearningDayPage({ params }) {
  const { dayId } = await params;
  const lesson = getLearningDay(dayId);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="lesson-flash-main">
      <ActiveLessonWorkspace lesson={lesson} />
    </main>
  );
}
