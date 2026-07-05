- [x] Step 0: Gather repo context (read relevant routes/libs).
- [x] Step 1: Remove custom Cache-Control header from app/api/learn-content/[lessonId]/[stepId]/route.js.
- [x] Step 2: Add short TTL in-process memoization in lib/learn-content-db.js for getLessonWithSteps(lessonId).
- [ ] Step 3: Investigate source of Next.js warning about custom Cache-Control for /_next/static/(.*) (likely middleware/headers config).
- [ ] Step 4: Reduce initial compilation/slow first-hit time on / and /content (optimize server component imports / memoize heavy computations).
- [ ] Step 5: Re-test page response times and confirm improvement.

