const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { collectMigrations } = require("./migrate");

test("collectMigrations discovers service-scoped migrations in deterministic order", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "godomain-migrations-"));

  fs.mkdirSync(path.join(tempDir, "auth"), { recursive: true });
  fs.mkdirSync(path.join(tempDir, "learning"), { recursive: true });
  fs.mkdirSync(path.join(tempDir, "content"), { recursive: true });

  fs.writeFileSync(path.join(tempDir, "learning", "002_second.sql"), "SELECT 2;");
  fs.writeFileSync(path.join(tempDir, "auth", "001_first.sql"), "SELECT 1;");
  fs.writeFileSync(path.join(tempDir, "content", "001_seed.sql"), "SELECT 3;");

  const migrations = collectMigrations(tempDir);

  assert.deepEqual(
    migrations.map((migration) => migration.relativePath),
    [
      "auth/001_first.sql",
      "content/001_seed.sql",
      "learning/002_second.sql",
    ],
  );
});
