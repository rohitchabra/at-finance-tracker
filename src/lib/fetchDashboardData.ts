import { getSupabase } from "@/lib/supabase/client";
import type { Activity, DashboardMetrics, Status, WeeklyViewMode } from "@/types/dashboard";

type DashboardSummaryRow = {
  today_total_minutes: number;
  selected_week: string;
  weekly_view_mode: WeeklyViewMode;
  word_problem_solving_current: number;
  word_problem_solving_total: number;
  word_problem_solving_next_up: string;
  story_retelling_current: number;
  story_retelling_total: number;
  story_retelling_next_up: string;
};

type DashboardSlotRow = {
  slot_key: string;
  total_minutes: number | null;
  subject: "Reading" | "Math";
  status: Status;
  lesson: string;
  lesson_number: string;
  title: string;
  time_minutes: number;
  progress: number;
  progress_total: number;
};

function mapSlotToActivity(row: DashboardSlotRow): Activity {
  return {
    subject: row.subject,
    status: row.status,
    lesson: row.lesson,
    number: row.lesson_number,
    title: row.title,
    time: row.time_minutes,
    progress: row.progress,
    total: row.progress_total,
  };
}

function getSlotRow(slots: DashboardSlotRow[], slotKey: string): DashboardSlotRow {
  const slot = slots.find((entry) => entry.slot_key === slotKey);
  if (!slot) {
    throw new Error(`Missing slot: ${slotKey}`);
  }
  return slot;
}

export async function fetchDashboardData(): Promise<DashboardMetrics> {
  const supabase = getSupabase();
  const [summaryResult, slotsResult] = await Promise.all([
    supabase.from("dashboard_summary_view").select("*").single(),
    supabase.from("dashboard_slot_view").select("*"),
  ]);

  if (summaryResult.error) throw summaryResult.error;
  if (slotsResult.error) throw slotsResult.error;

  const summary = summaryResult.data as DashboardSummaryRow;
  const slots = slotsResult.data as DashboardSlotRow[];

  return {
    wordProblemSolvingCurrent: summary.word_problem_solving_current,
    wordProblemSolvingTotal: summary.word_problem_solving_total,
    wordProblemSolvingNextUp: summary.word_problem_solving_next_up,
    storyRetellingCurrent: summary.story_retelling_current,
    storyRetellingTotal: summary.story_retelling_total,
    storyRetellingNextUp: summary.story_retelling_next_up,
    todayTotalMinutes: summary.today_total_minutes,
    todayActivity1: mapSlotToActivity(getSlotRow(slots, "today_1")),
    todayActivity2: mapSlotToActivity(getSlotRow(slots, "today_2")),
    todayActivity3: mapSlotToActivity(getSlotRow(slots, "today_3")),
    todayActivity4: mapSlotToActivity(getSlotRow(slots, "today_4")),
    selectedWeek: summary.selected_week,
    weeklyViewMode: summary.weekly_view_mode,
    mondayTotalMinutes: getSlotRow(slots, "monday").total_minutes ?? 0,
    tuesdayTotalMinutes: getSlotRow(slots, "tuesday").total_minutes ?? 0,
    wednesdayTotalMinutes: getSlotRow(slots, "wednesday").total_minutes ?? 0,
    thursdayTotalMinutes: getSlotRow(slots, "thursday").total_minutes ?? 0,
    fridayTotalMinutes: getSlotRow(slots, "friday").total_minutes ?? 0,
    mondayActivity: mapSlotToActivity(getSlotRow(slots, "monday")),
    tuesdayActivity: mapSlotToActivity(getSlotRow(slots, "tuesday")),
    wednesdayActivity: mapSlotToActivity(getSlotRow(slots, "wednesday")),
    thursdayActivity: mapSlotToActivity(getSlotRow(slots, "thursday")),
    fridayActivity: mapSlotToActivity(getSlotRow(slots, "friday")),
  };
}
