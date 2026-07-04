"use client";

import {
  BookOpen,
  Calculator,
  ChevronDown,
  Clock,
  HelpCircle,
  LayoutGrid,
  List,
  LogOut,
  Printer,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import type { Activity, Status } from "@/types/dashboard";

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Completed: "bg-emerald-100 text-emerald-700",
    "In-Progress": "bg-orange-100 text-orange-600",
    "Not Started": "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SubjectIcon({ subject }: { subject: "Reading" | "Math" }) {
  const Icon = subject === "Reading" ? BookOpen : Calculator;
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
        subject === "Reading" ? "bg-sky-50 text-sky-500" : "bg-violet-50 text-violet-500"
      }`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

function ActivityCard({
  activity,
  compact = false,
}: {
  activity: Activity;
  compact?: boolean;
}) {
  const progressPercent = (activity.progress / activity.total) * 100;
  const isComplete = activity.status === "Completed";
  const inProgress = activity.status === "In-Progress";

  return (
    <div
      className={`flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">{activity.subject}</p>
          <p className="text-xs text-gray-400">{activity.lesson}</p>
        </div>
        <StatusBadge status={activity.status} />
      </div>

      <div className="mb-3 flex items-start gap-3">
        <span className="text-3xl font-bold leading-none text-gray-900">
          {activity.number}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug text-gray-800">
            {activity.title}
          </p>
        </div>
        <SubjectIcon subject={activity.subject} />
      </div>

      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-400">
        <Clock className="h-3.5 w-3.5" />
        <span>Time: {activity.time} minutes</span>
      </div>

      <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all ${
              isComplete
                ? "bg-emerald-500"
                : inProgress
                  ? "bg-emerald-400"
                  : "bg-gray-200"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="ml-2 shrink-0">
          {activity.progress}/{activity.total}
        </span>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
      >
        View Lesson
      </button>
    </div>
  );
}

function SkillCard({
  title,
  current,
  total,
  color,
  nextUp,
}: {
  title: string;
  current: number;
  total: number;
  color: string;
  nextUp: string;
}) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {current}/{total}
          </span>
          <Trophy className="h-4 w-4 text-amber-400" />
        </div>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">
        Next up: <span className="text-gray-600">{nextUp}</span>
      </p>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex w-[72px] shrink-0 flex-col justify-between bg-zinc-950 py-6">
      <div className="flex flex-col items-center gap-1 px-2">
        <button
          type="button"
          className="flex w-full flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <Users className="h-5 w-5" />
          <span className="text-center text-[10px] leading-tight">My Students</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 px-2">
        {[
          { icon: Settings, label: "Settings" },
          { icon: HelpCircle, label: "Help" },
          { icon: LogOut, label: "Dashboard" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="flex w-full flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <Icon className="h-5 w-5" />
            <span className="text-center text-[10px] leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  const {
    wordProblemSolvingCurrent,
    wordProblemSolvingTotal,
    wordProblemSolvingNextUp,
    storyRetellingCurrent,
    storyRetellingTotal,
    storyRetellingNextUp,
    todayTotalMinutes,
    todayActivity1,
    todayActivity2,
    todayActivity3,
    todayActivity4,
    selectedWeek,
    weeklyViewMode,
    mondayTotalMinutes,
    tuesdayTotalMinutes,
    wednesdayTotalMinutes,
    thursdayTotalMinutes,
    fridayTotalMinutes,
    mondayActivity,
    tuesdayActivity,
    wednesdayActivity,
    thursdayActivity,
    fridayActivity,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-red-600">
        {error}
      </div>
    );
  }

  const todayActivities = [
    todayActivity1,
    todayActivity2,
    todayActivity3,
    todayActivity4,
  ].filter((activity): activity is Activity => activity !== null);

  const weeklyDays = [
    { day: "Monday", totalTime: mondayTotalMinutes, activity: mondayActivity },
    { day: "Tuesday", totalTime: tuesdayTotalMinutes, activity: tuesdayActivity },
    {
      day: "Wednesday",
      totalTime: wednesdayTotalMinutes,
      activity: wednesdayActivity,
    },
    { day: "Thursday", totalTime: thursdayTotalMinutes, activity: thursdayActivity },
    { day: "Friday", totalTime: fridayTotalMinutes, activity: fridayActivity },
  ].filter(
    (entry): entry is { day: string; totalTime: number; activity: Activity } =>
      entry.activity !== null,
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-x-auto p-6">
        <div className="mx-auto max-w-[1100px] space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SkillCard
              title="Word Problem Solving"
              current={wordProblemSolvingCurrent}
              total={wordProblemSolvingTotal}
              color="bg-violet-500"
              nextUp={wordProblemSolvingNextUp}
            />
            <SkillCard
              title="Story Retelling"
              current={storyRetellingCurrent}
              total={storyRetellingTotal}
              color="bg-pink-400"
              nextUp={storyRetellingNextUp}
            />
          </div>

          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-900">Today&apos;s Activity</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>
                    Total time :{" "}
                    <strong className="text-gray-800">{todayTotalMinutes} Minute</strong>
                  </span>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                >
                  <Printer className="h-4 w-4" />
                  Print Activity
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {todayActivities.map((activity) => (
                <ActivityCard
                  key={`${activity.lesson}-${activity.title}`}
                  activity={activity}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-900">Weekly Activity</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Next Week :</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm"
                  >
                    {selectedWeek}
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium ${
                      weeklyViewMode === "kanban"
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Kanban
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${
                      weeklyViewMode === "list"
                        ? "bg-blue-600 font-medium text-white"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                    List
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {weeklyDays.map(({ day, totalTime, activity }) => (
                <div key={day} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-sm font-semibold text-gray-800">{day}</span>
                    <span className="text-xs text-gray-400">
                      Total Time: {totalTime} min
                    </span>
                  </div>
                  <ActivityCard activity={activity} compact />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
