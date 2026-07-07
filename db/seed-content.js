#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { learningUnits } from "../app/learn/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

loadEnvFile();

const PK = {
  learning_units: "unit_id",
  lessons: "lesson_id",
  lesson_steps: "step_id",
  lesson_overview_topics: "step_id",
};

async function upsert(supabase, table, rows) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict: PK[table] });
  if (error) throw new Error(`upsert ${table}: ${error.message}`);
}

async function main() {
  const supabase = createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"));

  const units = learningUnits.map((u) => ({
    unit_id: u.id,
    unit_number: u.number,
    label: u.label,
    title: u.title,
    summary: u.summary,
    unlocked: !!u.unlocked,
  }));
  await upsert(supabase, "learning_units", units);
  console.log(`  learning_units: ${units.length} rows`);

  const lessons = [];
  const steps = [];
  const topics = [];

  for (const unit of learningUnits) {
    for (const lesson of unit.lessons) {
      lessons.push({
        lesson_id: lesson.id,
        unit_id: unit.id,
        unit_number: unit.number,
        unit_label: unit.label,
        lesson_number: lesson.lessonNumber,
        label: lesson.label,
        title: lesson.title,
        subtitle: lesson.subtitle,
        icon: lesson.icon,
        is_locked: !!lesson.isLocked,
        overview_title: lesson.overviewTitle,
        overview_summary: lesson.overviewSummary,
      });

      for (let i = 0; i < lesson.lessons.length; i++) {
        const step = lesson.lessons[i];
        steps.push({
          lesson_id: lesson.id,
          step_id: step.id,
          step_number: i + 1,
          kind: step.kind,
          title: step.title,
          duration: step.duration,
          detail: step.detail,
        });

        const topic = lesson.overviewTopics?.[i] ?? null;
        if (topic) {
          topics.push({
            step_id: step.id,
            step_number: i + 1,
            topic_title: topic.title ?? null,
            topic_points: Array.isArray(topic.points) ? topic.points : [],
          });
        }
      }
    }
  }

  await upsert(supabase, "lessons", lessons);
  console.log(`  lessons: ${lessons.length} rows`);

  await upsert(supabase, "lesson_steps", steps);
  console.log(`  lesson_steps: ${steps.length} rows`);

  if (topics.length > 0) {
    await upsert(supabase, "lesson_overview_topics", topics);
    console.log(`  lesson_overview_topics: ${topics.length} rows`);
  }

  console.log("Seed complete.");
}

main().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exitCode = 1;
});
