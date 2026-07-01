-- Example incremental migration showing how to add a new index safely.
CREATE INDEX IF NOT EXISTS profiles_display_name_idx ON public.profiles (display_name);
