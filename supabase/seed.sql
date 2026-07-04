insert into skill_progress (skill_key, title, current_value, total_value, next_up, color)
values
  (
    'word_problem_solving',
    'Word Problem Solving',
    6,
    8,
    'Grade 3 (2-Digit Subtraction with Regrouping)',
    'bg-violet-500'
  ),
  (
    'story_retelling',
    'Story Retelling',
    3,
    8,
    'Grade 3 (Long & short vowels)',
    'bg-pink-400'
  );

insert into activities (
  id,
  subject,
  status,
  lesson,
  lesson_number,
  title,
  time_minutes,
  progress,
  progress_total
)
values
  (
    'a0000001-0000-4000-8000-000000000001',
    'Reading',
    'Completed',
    'Lesson-1',
    '02',
    'Vocabulary Practice',
    15,
    4,
    4
  ),
  (
    'a0000002-0000-4000-8000-000000000002',
    'Math',
    'In-Progress',
    'Lesson-2',
    '02',
    'Word Problems',
    30,
    3,
    4
  ),
  (
    'a0000003-0000-4000-8000-000000000003',
    'Reading',
    'Not Started',
    'Lesson-4',
    '02',
    'Answer Questions with Text Evidence',
    20,
    0,
    4
  ),
  (
    'a0000004-0000-4000-8000-000000000004',
    'Math',
    'Not Started',
    'Lesson-5',
    '01',
    'Skills Practice',
    15,
    0,
    4
  ),
  (
    'a0000005-0000-4000-8000-000000000005',
    'Reading',
    'Completed',
    'Lesson-6',
    '02',
    'Consonant Blends vs. Digraphs',
    15,
    4,
    4
  );

insert into dashboard_settings (id, today_total_minutes, selected_week, weekly_view_mode)
values (1, 90, 'Week 1', 'kanban');

insert into dashboard_slots (slot_key, activity_id, total_minutes)
values
  ('today_1', 'a0000001-0000-4000-8000-000000000001', null),
  ('today_2', 'a0000002-0000-4000-8000-000000000002', null),
  ('today_3', 'a0000003-0000-4000-8000-000000000003', null),
  ('today_4', 'a0000004-0000-4000-8000-000000000004', null),
  ('monday', 'a0000001-0000-4000-8000-000000000001', 45),
  ('tuesday', 'a0000002-0000-4000-8000-000000000002', 45),
  ('wednesday', 'a0000003-0000-4000-8000-000000000003', 45),
  ('thursday', 'a0000004-0000-4000-8000-000000000004', 30),
  ('friday', 'a0000005-0000-4000-8000-000000000005', 60);
