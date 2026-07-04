export type Status = "Completed" | "In-Progress" | "Not Started";

export type Activity = {
  subject: "Reading" | "Math";
  status: Status;
  lesson: string;
  number: string;
  title: string;
  time: number;
  progress: number;
  total: number;
};

export type WeeklyViewMode = "kanban" | "list";

export type DashboardMetrics = {
  wordProblemSolvingCurrent: number;
  wordProblemSolvingTotal: number;
  wordProblemSolvingNextUp: string;
  storyRetellingCurrent: number;
  storyRetellingTotal: number;
  storyRetellingNextUp: string;
  todayTotalMinutes: number;
  todayActivity1: Activity;
  todayActivity2: Activity;
  todayActivity3: Activity;
  todayActivity4: Activity;
  selectedWeek: string;
  weeklyViewMode: WeeklyViewMode;
  mondayTotalMinutes: number;
  tuesdayTotalMinutes: number;
  wednesdayTotalMinutes: number;
  thursdayTotalMinutes: number;
  fridayTotalMinutes: number;
  mondayActivity: Activity;
  tuesdayActivity: Activity;
  wednesdayActivity: Activity;
  thursdayActivity: Activity;
  fridayActivity: Activity;
};
