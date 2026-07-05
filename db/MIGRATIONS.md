# Database migrations

This project keeps one shared database, but each change is applied as an isolated migration file under db/migrations/.

## Rules
- Create a new SQL file for every schema or data change.
- Use a numbered prefix such as 001_, 002_, 003_ so the order is deterministic.
- Keep each migration focused on one concern (for example: schema, RLS, seed data, backfill).
- Prefer additive changes first; if a change is destructive, write it explicitly and document the reason.
- Do not edit old migration files after they have been applied in a shared environment.

## Example
- db/migrations/shared/001_init_core_schema.sql
- db/migrations/shared/002_enable_rls_helpers.sql
- db/migrations/shared/003_add_profile_indexes.sql
