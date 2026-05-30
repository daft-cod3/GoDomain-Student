import { getUserFromRequest } from "../../../lib/auth.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const user = await getUserFromRequest(request);

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.display_name,
      indexNumber: user.index_number,
      phoneNumber: user.phone_number,
      county: user.county,
      drivingSchool: user.driving_school,
      drivingClass: user.driving_class,
      age: user.age,
      track: user.track,
      nextSession: user.next_session,
      progress: user.progress,
      lessonsComplete: user.lessons_complete,
      roadHours: user.road_hours,
      attendance: user.attendance,
      coins: user.coins,
      coinCapacity: user.coin_capacity,
      hp: user.hp,
      hpCapacity: user.hp_capacity,
      energy: user.energy,
      energyCapacity: user.energy_capacity,
      level: user.level,
      mentor: user.mentor,
      quizAccuracy: user.quiz_accuracy,
      liveHours: user.live_hours,
      focusRate: user.focus_rate,
      badgesCount: user.badges_count,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
