create view dashboard_slot_view as
select
  ds.slot_key,
  ds.total_minutes,
  a.subject,
  a.status,
  a.lesson,
  a.lesson_number,
  a.title,
  a.time_minutes,
  a.progress,
  a.progress_total
from dashboard_slots ds
join activities a on a.id = ds.activity_id;

create view dashboard_summary_view as
select
  s.today_total_minutes,
  s.selected_week,
  s.weekly_view_mode,
  wps.current_value as word_problem_solving_current,
  wps.total_value as word_problem_solving_total,
  wps.next_up as word_problem_solving_next_up,
  sr.current_value as story_retelling_current,
  sr.total_value as story_retelling_total,
  sr.next_up as story_retelling_next_up
from dashboard_settings s
cross join skill_progress wps
cross join skill_progress sr
where wps.skill_key = 'word_problem_solving'
  and sr.skill_key = 'story_retelling';

grant select on dashboard_slot_view to anon, authenticated;
grant select on dashboard_summary_view to anon, authenticated;
