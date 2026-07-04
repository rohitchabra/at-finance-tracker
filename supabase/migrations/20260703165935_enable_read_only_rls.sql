-- Views must use the caller's role so underlying table RLS is enforced.
alter view dashboard_slot_view set (security_invoker = true);
alter view dashboard_summary_view set (security_invoker = true);

-- Enforce RLS even for the table owner (service_role still bypasses RLS).
alter table skill_progress force row level security;
alter table activities force row level security;
alter table dashboard_settings force row level security;
alter table dashboard_slots force row level security;

-- Replace broad read policies with explicit anon + authenticated read-only access.
drop policy if exists "Allow public read on skill_progress" on skill_progress;
drop policy if exists "Allow public read on activities" on activities;
drop policy if exists "Allow public read on dashboard_settings" on dashboard_settings;
drop policy if exists "Allow public read on dashboard_slots" on dashboard_slots;

create policy "anon_authenticated_select"
  on skill_progress
  for select
  to anon, authenticated
  using (true);

create policy "anon_authenticated_select"
  on activities
  for select
  to anon, authenticated
  using (true);

create policy "anon_authenticated_select"
  on dashboard_settings
  for select
  to anon, authenticated
  using (true);

create policy "anon_authenticated_select"
  on dashboard_slots
  for select
  to anon, authenticated
  using (true);

-- Grant read-only access to app roles.
grant select on skill_progress to anon, authenticated;
grant select on activities to anon, authenticated;
grant select on dashboard_settings to anon, authenticated;
grant select on dashboard_slots to anon, authenticated;
grant select on dashboard_slot_view to anon, authenticated;
grant select on dashboard_summary_view to anon, authenticated;

-- Explicitly revoke write privileges.
revoke insert, update, delete, truncate, references, trigger
  on skill_progress, activities, dashboard_settings, dashboard_slots
  from anon, authenticated;

revoke insert, update, delete, truncate, references, trigger
  on dashboard_slot_view, dashboard_summary_view
  from anon, authenticated;
