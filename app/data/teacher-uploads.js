import { getLearningDayHref } from "../learn";

const uploadBlueprints = [
  {
    id: "image-upload",
    category: "image",
    createdAt: "2026-06-29T08:20:00+03:00",
    type: "Image set",
    title: "Road markings photo wall",
    meta: "Ms. Diaz / 16 images / Updated today",
    summary:
      "Quick visual references for lane edges, center lines, and turn bays.",
    action: "Open image wall",
    icon: "image",
    accent: "mint",
    teacher: "Ms. Diaz",
    relatedLessonId: "unit-1-lesson-3",
    intro:
      "This image wall isolates the road-marking patterns learners keep missing during lane-position drills. It is built for fast visual recall before a road-marking lesson or quiz.",
    teacherNote:
      "Review these examples before the next marking drill so line choice and stopping points are already familiar when practice starts.",
    highlights: [
      "16 annotated road scenes showing center lines, edge lines, and stop boxes.",
      "Close-up comparisons between legal lane guidance and common learner mistakes.",
      "Quick caption prompts designed for short revision breaks before class.",
    ],
    deliverables: [
      { label: "Scenes", value: "16" },
      { label: "Focus area", value: "Road markings" },
      { label: "Best use", value: "Visual revision" },
    ],
    sections: [
      {
        title: "What is inside",
        body: "The pack groups markings into center lines, directional arrows, edge guidance, and stop controls so the learner can compare similar visuals without losing context.",
      },
      {
        title: "How to use it",
        body: "Scan the scene, name the marking, then say the safe response before reading the caption. That sequence builds faster recall than reading first.",
      },
      {
        title: "Why it matters",
        body: "Road markings are often ignored until the learner is already too close. This wall trains earlier recognition and calmer decisions.",
      },
    ],
    nextSteps: [
      "Open the related road-markings lesson and review the lane-arrow examples.",
      "Use the image set before the next quick-check quiz.",
      "Repeat the stop-box examples until the waiting position feels automatic.",
    ],
  },
  {
    id: "image-upload-lane-boxes",
    category: "image",
    createdAt: "2026-06-28T15:40:00+03:00",
    type: "Image set",
    title: "Lane boxes and stop points",
    meta: "Ms. Diaz / 12 images / Updated yesterday",
    summary: "Marked examples for where to wait, turn, and hold the lane line.",
    action: "Open image set",
    icon: "image",
    accent: "mint",
    teacher: "Ms. Diaz",
    relatedLessonId: "unit-1-lesson-3",
    intro:
      "This image set focuses on stop boxes, turn bays, and lane-holding marks so learners can connect the paint on the road to the correct vehicle position.",
    teacherNote:
      "Check the waiting position before reading the caption. The goal is to make the stopping point feel obvious before the vehicle reaches it.",
    highlights: [
      "12 annotated road-marking scenes with clear waiting positions.",
      "Comparisons between early lane setup and late correction.",
      "Short prompts for fast visual review before a board lesson.",
    ],
    deliverables: [
      { label: "Scenes", value: "12" },
      { label: "Focus area", value: "Lane position" },
      { label: "Best use", value: "Position review" },
    ],
    sections: [
      {
        title: "What is inside",
        body: "The pack groups lane boxes, turn bays, and stop points so the learner can compare similar markings without losing the driving context.",
      },
      {
        title: "How to use it",
        body: "Name the marking, point to the correct waiting area, then read the caption to confirm the road response.",
      },
      {
        title: "Why it matters",
        body: "Late positioning around markings creates rushed steering. This set trains earlier recognition and calmer lane control.",
      },
    ],
    nextSteps: [
      "Review the stop-box examples before the next road-markings lesson.",
      "Compare each image with the related lesson notes.",
      "Repeat the turn-bay prompts until the lane choice is automatic.",
    ],
  },
  {
    id: "video-upload",
    category: "video",
    createdAt: "2026-06-29T06:15:00+03:00",
    type: "Video",
    title: "Junction decisions breakdown",
    meta: "Mr. Chen / 12 min / Uploaded 2 hours ago",
    summary:
      "A clean replay of priority calls, blind checks, and entry timing.",
    action: "Watch breakdown",
    icon: "video",
    accent: "violet",
    teacher: "Mr. Chen",
    relatedLessonId: "unit-1-lesson-4",
    intro:
      "This replay breaks junction handling into approach scan, right-of-way judgment, and final turn commitment so learners can see why each decision was made.",
    teacherNote:
      "Pause at each junction entry and say who should move first before listening to the commentary. The benefit comes from predicting, not just watching.",
    highlights: [
      "12-minute teacher narration with slowed-down junction entries.",
      "Priority mistakes called out at the exact moment the risk begins to build.",
      "Turn-by-turn commentary on mirror checks, gap choice, and final steering timing.",
    ],
    deliverables: [
      { label: "Runtime", value: "12 min" },
      { label: "Focus area", value: "Junction rules" },
      { label: "Best use", value: "Replay review" },
    ],
    sections: [
      {
        title: "Chapter flow",
        body: "The video moves from early observation to priority choice, then ends with left-turn and right-turn examples that expose the most common hesitation points.",
      },
      {
        title: "Recommended routine",
        body: "Watch once without stopping, then replay the difficult moments and answer the priority question before the teacher explains it.",
      },
      {
        title: "Expected outcome",
        body: "Learners should leave with cleaner junction timing, less rushed entry, and better awareness of hidden risks near the final turn.",
      },
    ],
    nextSteps: [
      "Replay the blind-check chapter immediately before the junction quiz.",
      "Open the lesson page and compare the teacher examples with the written notes.",
      "Use the messages panel if one junction case still feels unclear.",
    ],
  },
  {
    id: "video-upload-roundabout",
    category: "video",
    createdAt: "2026-06-28T18:05:00+03:00",
    type: "Video",
    title: "Roundabout lane timing",
    meta: "Mr. Chen / 9 min / Uploaded yesterday",
    summary:
      "Slow replay of approach position, signal timing, and clean exits.",
    action: "Watch replay",
    icon: "video",
    accent: "violet",
    teacher: "Mr. Chen",
    relatedLessonId: "unit-3-lesson-3",
    intro:
      "This video slows down roundabout approach, lane holding, signal timing, and exit choice so learners can see the full routine without rushing.",
    teacherNote:
      "Pause before each exit and say whether the vehicle should stay circulating or leave. That prediction is the useful practice.",
    highlights: [
      "9-minute replay with approach and exit markers.",
      "Lane discipline examples for common roundabout mistakes.",
      "Signal timing checks before the final exit decision.",
    ],
    deliverables: [
      { label: "Runtime", value: "9 min" },
      { label: "Focus area", value: "Roundabouts" },
      { label: "Best use", value: "Timing review" },
    ],
    sections: [
      {
        title: "Chapter flow",
        body: "The video starts with approach setup, moves into lane holding, then finishes with exit timing and signal discipline.",
      },
      {
        title: "Recommended routine",
        body: "Watch the full replay once, then repeat the exit sections while calling the lane and signal before the teacher explains it.",
      },
      {
        title: "Expected outcome",
        body: "Learners should leave with better roundabout timing and fewer late exit corrections.",
      },
    ],
    nextSteps: [
      "Replay the exit chapter before the roundabout lesson.",
      "Use the model board to trace the lane after watching.",
      "Message the teacher if the second exit still feels unclear.",
    ],
  },
  {
    id: "quiz-upload",
    category: "link",
    createdAt: "2026-06-27T10:00:00+03:00",
    type: "Quiz link",
    title: "Hazard scan checkpoint",
    meta: "Ms. Omar / 10 questions / Due in 2 days",
    summary:
      "Measure how early you are spotting movement, risk, and blind zones.",
    action: "Start checkpoint",
    icon: "quiz",
    accent: "gold",
    teacher: "Ms. Omar",
    relatedLessonId: "unit-1-lesson-5",
    intro:
      "This checkpoint tests whether the learner can spot hazard clues before the situation becomes urgent. It favors early reading over late reaction.",
    teacherNote:
      "Answer the question using the first clue you notice, not the last dramatic event. The score improves when observation happens earlier.",
    highlights: [
      "10 short hazard-recognition prompts with mixed road scenarios.",
      "Questions focus on blind corners, sudden stops, and hidden movement.",
      "Built to reveal whether the learner is observing early enough or only reacting late.",
    ],
    deliverables: [
      { label: "Questions", value: "10" },
      { label: "Focus area", value: "Hazard awareness" },
      { label: "Best use", value: "Checkpoint score" },
    ],
    sections: [
      {
        title: "Question style",
        body: "Each prompt asks for the earliest risk clue or the safest first response, which keeps attention on anticipation rather than emergency correction.",
      },
      {
        title: "Scoring logic",
        body: "Correct answers reward calm early choices such as speed reduction, wider observation, and leaving more space before the danger is fully visible.",
      },
      {
        title: "Revision link",
        body: "Weak quiz areas should be replayed inside the hazard-awareness lesson so the visual cue and the correct response stay connected.",
      },
    ],
    nextSteps: [
      "Take the checkpoint after revising the hidden-movement examples.",
      "Review any missed question inside the lesson page before repeating the quiz.",
      "Track the score alongside unit progress in the dashboard review area.",
    ],
  },
  {
    id: "resource-upload",
    category: "link",
    createdAt: "2026-06-29T09:05:00+03:00",
    type: "Resource link",
    title: "Traffic sign revision pack",
    meta: "Ms. Bello / Notes + visuals / Updated today",
    summary:
      "Compact notes and visual prompts for warning, order, and direction signs.",
    action: "Open revision pack",
    icon: "link",
    accent: "rose",
    teacher: "Ms. Bello",
    relatedLessonId: "unit-1-lesson-2",
    intro:
      "This revision pack condenses sign categories into fast-reference notes and visual prompts so sign meaning can be checked quickly before lessons or assessments.",
    teacherNote:
      "Do not memorize shapes alone. Say the sign category, then the driver action it demands. That keeps recognition tied to the road response.",
    highlights: [
      "Short notes covering regulatory, warning, and informative signs.",
      "Visual prompts built for faster recognition under quiz pressure.",
      "A compact revision format for frequent repetition instead of long reading sessions.",
    ],
    deliverables: [
      { label: "Format", value: "Notes + visuals" },
      { label: "Focus area", value: "Traffic signs" },
      { label: "Best use", value: "Fast repetition" },
    ],
    sections: [
      {
        title: "Pack structure",
        body: "The material starts with sign groups, then narrows into quick visual prompts and short explanations of what the driver must do immediately after recognition.",
      },
      {
        title: "Best revision loop",
        body: "Study the sign, name the category, state the required action, then move on. Short, repeated cycles are more effective here than one long pass.",
      },
      {
        title: "Assessment support",
        body: "The pack is designed to strengthen both visual recall and the reasoning behind each sign so exam choices feel less random.",
      },
    ],
    nextSteps: [
      "Pair this pack with the traffic-sign lesson before the next revision session.",
      "Repeat the warning-sign group until the action response feels immediate.",
      "Use the dashboard review cards to revisit the notes after a full lesson clear.",
    ],
  },
  {
    id: "resource-upload-parking",
    category: "link",
    createdAt: "2026-06-28T20:10:00+03:00",
    type: "Resource link",
    title: "Parking routine checklist",
    meta: "Ms. Bello / Notes + checklist / Updated yesterday",
    summary:
      "A short checklist for mirror checks, reference points, and corrections.",
    action: "Open checklist",
    icon: "link",
    accent: "rose",
    teacher: "Ms. Bello",
    relatedLessonId: "unit-3-lesson-1",
    intro:
      "This checklist condenses parking into setup, reference point, steering input, correction, and final safety checks.",
    teacherNote:
      "Use the checklist aloud before practising. The routine should sound simple before it is attempted in the vehicle.",
    highlights: [
      "Step-by-step parking sequence for repeated practice.",
      "Reference-point prompts for bay and reverse parking.",
      "Correction checks for common steering and mirror mistakes.",
    ],
    deliverables: [
      { label: "Format", value: "Checklist" },
      { label: "Focus area", value: "Parking" },
      { label: "Best use", value: "Routine prep" },
    ],
    sections: [
      {
        title: "Checklist structure",
        body: "The checklist follows the parking routine from observation to final position so learners can practise without skipping safety checks.",
      },
      {
        title: "Best revision loop",
        body: "Read one step, perform it slowly, then reset and repeat until the order stays consistent.",
      },
      {
        title: "Assessment support",
        body: "The checklist helps reduce rushed corrections by making each reference point and mirror check explicit.",
      },
    ],
    nextSteps: [
      "Open the parking lesson after reading the checklist.",
      "Repeat the mirror-check order before the next practical session.",
      "Review corrections after each attempt instead of waiting until the end.",
    ],
  },
];

export function getTeacherUploadHref(uploadId) {
  return `/dashboard/uploads/${uploadId}`;
}

export const teacherUploads = uploadBlueprints.map((upload) => ({
  ...upload,
  href: getTeacherUploadHref(upload.id),
  relatedLessonHref: getLearningDayHref(upload.relatedLessonId),
}));

export const teacherUploadIds = teacherUploads.map((upload) => upload.id);

export function getTeacherUpload(uploadId) {
  return teacherUploads.find((upload) => upload.id === uploadId) ?? null;
}
