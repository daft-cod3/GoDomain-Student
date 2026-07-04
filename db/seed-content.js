#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { learningUnits } from "../app/learn/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;

  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // Always override so we can reliably use the intended local DATABASE_URL.
    process.env[key] = value;
  }
}

function requiresSsl(connectionString = "") {
  return (
    connectionString.includes("supabase.co") ||
    connectionString.includes("pooler.supabase.com") ||
    connectionString.includes("sslmode=require")
  );
}

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

loadEnvFile();

async function main() {
  const DATABASE_URL = env("DATABASE_URL");
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: requiresSsl(DATABASE_URL) ? { rejectUnauthorized: false } : undefined,
  });

  const clients = await pool.connect();
  try {
    await clients.query("BEGIN");

    for (const u of learningUnits) {
      await clients.query(
        `INSERT INTO learning_units (unit_id, unit_number, label, title, summary, unlocked)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (unit_id) DO UPDATE
         SET unit_number = EXCLUDED.unit_number,
             label = EXCLUDED.label,
             title = EXCLUDED.title,
             summary = EXCLUDED.summary,
             unlocked = EXCLUDED.unlocked`,
        [u.id, u.number, u.label, u.title, u.summary, !!u.unlocked],
      );
    }

    for (const unit of learningUnits) {
      for (const lesson of unit.lessons) {
        await clients.query(
          `INSERT INTO lessons (
              lesson_id, unit_id, unit_number, unit_label,
              lesson_number, label, title, subtitle, icon,
              is_locked, overview_title, overview_summary
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
           ON CONFLICT (lesson_id) DO UPDATE SET
              unit_id = EXCLUDED.unit_id,
              unit_number = EXCLUDED.unit_number,
              unit_label = EXCLUDED.unit_label,
              lesson_number = EXCLUDED.lesson_number,
              label = EXCLUDED.label,
              title = EXCLUDED.title,
              subtitle = EXCLUDED.subtitle,
              icon = EXCLUDED.icon,
              is_locked = EXCLUDED.is_locked,
              overview_title = EXCLUDED.overview_title,
              overview_summary = EXCLUDED.overview_summary`,
          [
            lesson.id,
            unit.id,
            unit.number,
            unit.label,
            lesson.lessonNumber,
            lesson.label,
            lesson.title,
            lesson.subtitle,
            lesson.icon,
            !!lesson.isLocked,
            lesson.overviewTitle,
            lesson.overviewSummary,
          ],
        );

        for (
          let stepIndex = 0;
          stepIndex < lesson.lessons.length;
          stepIndex++
        ) {
          const step = lesson.lessons[stepIndex];

          await clients.query(
            `INSERT INTO lesson_steps (
                lesson_id, step_id, step_number, kind, title, duration, detail
             ) VALUES ($1,$2,$3,$4,$5,$6,$7)
             ON CONFLICT (step_id) DO UPDATE SET
                lesson_id = EXCLUDED.lesson_id,
                step_number = EXCLUDED.step_number,
                kind = EXCLUDED.kind,
                title = EXCLUDED.title,
                duration = EXCLUDED.duration,
                detail = EXCLUDED.detail`,
            [
              lesson.id,
              step.id,
              stepIndex + 1,
              step.kind,
              step.title,
              step.duration,
              step.detail,
            ],
          );

          const overviewTopic = lesson.overviewTopics?.[stepIndex] ?? null;
          if (overviewTopic) {
            await clients.query(
              `INSERT INTO lesson_overview_topics (
                  step_id, step_number, topic_title, topic_points
               ) VALUES ($1,$2,$3,$4)
               ON CONFLICT (step_id) DO UPDATE SET
                  step_number = EXCLUDED.step_number,
                  topic_title = EXCLUDED.topic_title,
                  topic_points = EXCLUDED.topic_points`,
              [
                step.id,
                stepIndex + 1,
                overviewTopic.title ?? null,
                Array.isArray(overviewTopic.points) ? overviewTopic.points : [],
              ],
            );
          }
        }
      }
    }

    await clients.query("COMMIT");
    console.log("Seed complete: lesson content inserted/updated.");
  } catch (e) {
    await clients.query("ROLLBACK");
    console.error("Seed failed:", e);
    process.exitCode = 1;
  } finally {
    clients.release();
    await pool.end();
  }
}

main();
