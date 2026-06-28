-- PostgreSQL schema for GoDomain local auth and progress data

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  display_name TEXT NOT NULL,
  index_number TEXT,
  phone_number TEXT,
  county TEXT,
  driving_school TEXT,
  driving_class TEXT,
  age TEXT,
  track TEXT,
  next_session TEXT,
  progress INTEGER DEFAULT 0,
  lessons_complete TEXT DEFAULT '0 / 0',
  road_hours TEXT DEFAULT '0 hours',
  attendance TEXT DEFAULT '0%',
  coins INTEGER DEFAULT 0,
  coin_capacity INTEGER DEFAULT 100,
  hp INTEGER DEFAULT 100,
  hp_capacity INTEGER DEFAULT 100,
  energy INTEGER DEFAULT 100,
  energy_capacity INTEGER DEFAULT 100,
  level TEXT DEFAULT 'Level 01',
  mentor TEXT,
  quiz_accuracy TEXT,
  live_hours TEXT,
  focus_rate TEXT,
  badges_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '14 days'
);

CREATE TABLE IF NOT EXISTS learning_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed_step_ids JSONB NOT NULL DEFAULT '[]',
  progress_percent INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  detail TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------
-- Lesson/Unit/Step content tables
-- ------------------------------

CREATE TABLE IF NOT EXISTS learning_units (
  unit_id TEXT PRIMARY KEY,
  unit_number INTEGER,
  label TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  unlocked BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS lessons (
  lesson_id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES learning_units(unit_id) ON DELETE CASCADE,
  unit_number INTEGER,
  unit_label TEXT,
  lesson_number INTEGER,
  label TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  overview_title TEXT,
  overview_summary TEXT
);

-- Stores the subtopics/steps that appear under each lesson.
CREATE TABLE IF NOT EXISTS lesson_steps (
  lesson_id TEXT NOT NULL REFERENCES lessons(lesson_id) ON DELETE CASCADE,
  step_id TEXT PRIMARY KEY,
  step_number INTEGER NOT NULL,
  kind TEXT,
  title TEXT NOT NULL,
  duration TEXT,
  detail TEXT NOT NULL
);

-- The “TopicPanel” for each step.
CREATE TABLE IF NOT EXISTS lesson_overview_topics (
  step_id TEXT NOT NULL REFERENCES lesson_steps(step_id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  topic_title TEXT,
  topic_points TEXT[] NOT NULL DEFAULT '{}',
  PRIMARY KEY (step_id)
);

