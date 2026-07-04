create type activity_subject as enum ('Reading', 'Math');
create type activity_status as enum ('Completed', 'In-Progress', 'Not Started');
create type weekly_view_mode as enum ('kanban', 'list');

create table skill_progress (
  skill_key text primary key,
  title text not null,
  current_value integer not null check (current_value >= 0),
  total_value integer not null check (total_value > 0),
  next_up text not null,
  color text not null
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  subject activity_subject not null,
  status activity_status not null,
  lesson text not null,
  lesson_number text not null,
  title text not null,
  time_minutes integer not null check (time_minutes >= 0),
  progress integer not null check (progress >= 0),
  progress_total integer not null check (progress_total > 0)
);

create table dashboard_settings (
  id integer primary key default 1 check (id = 1),
  today_total_minutes integer not null check (today_total_minutes >= 0),
  selected_week text not null,
  weekly_view_mode weekly_view_mode not null default 'kanban'
);

create table dashboard_slots (
  slot_key text primary key,
  activity_id uuid not null references activities (id) on delete cascade,
  total_minutes integer check (total_minutes >= 0)
);

alter table skill_progress enable row level security;
alter table activities enable row level security;
alter table dashboard_settings enable row level security;
alter table dashboard_slots enable row level security;

create policy "Allow public read on skill_progress"
  on skill_progress for select
  using (true);

create policy "Allow public read on activities"
  on activities for select
  using (true);

create policy "Allow public read on dashboard_settings"
  on dashboard_settings for select
  using (true);

create policy "Allow public read on dashboard_slots"
  on dashboard_slots for select
  using (true);
