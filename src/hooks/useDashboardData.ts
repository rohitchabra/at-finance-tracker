"use client";

import { useEffect, useState } from "react";
import { fetchDashboardData } from "@/lib/fetchDashboardData";
import type { Activity, WeeklyViewMode } from "@/types/dashboard";

export function useDashboardData() {
  const [wordProblemSolvingCurrent, setWordProblemSolvingCurrent] = useState(0);
  const [wordProblemSolvingTotal, setWordProblemSolvingTotal] = useState(0);
  const [wordProblemSolvingNextUp, setWordProblemSolvingNextUp] = useState("");
  const [storyRetellingCurrent, setStoryRetellingCurrent] = useState(0);
  const [storyRetellingTotal, setStoryRetellingTotal] = useState(0);
  const [storyRetellingNextUp, setStoryRetellingNextUp] = useState("");
  const [todayTotalMinutes, setTodayTotalMinutes] = useState(0);
  const [todayActivity1, setTodayActivity1] = useState<Activity | null>(null);
  const [todayActivity2, setTodayActivity2] = useState<Activity | null>(null);
  const [todayActivity3, setTodayActivity3] = useState<Activity | null>(null);
  const [todayActivity4, setTodayActivity4] = useState<Activity | null>(null);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [weeklyViewMode, setWeeklyViewMode] = useState<WeeklyViewMode>("kanban");
  const [mondayTotalMinutes, setMondayTotalMinutes] = useState(0);
  const [tuesdayTotalMinutes, setTuesdayTotalMinutes] = useState(0);
  const [wednesdayTotalMinutes, setWednesdayTotalMinutes] = useState(0);
  const [thursdayTotalMinutes, setThursdayTotalMinutes] = useState(0);
  const [fridayTotalMinutes, setFridayTotalMinutes] = useState(0);
  const [mondayActivity, setMondayActivity] = useState<Activity | null>(null);
  const [tuesdayActivity, setTuesdayActivity] = useState<Activity | null>(null);
  const [wednesdayActivity, setWednesdayActivity] = useState<Activity | null>(null);
  const [thursdayActivity, setThursdayActivity] = useState<Activity | null>(null);
  const [fridayActivity, setFridayActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchDashboardData();

        if (cancelled) return;

        setWordProblemSolvingCurrent(data.wordProblemSolvingCurrent);
        setWordProblemSolvingTotal(data.wordProblemSolvingTotal);
        setWordProblemSolvingNextUp(data.wordProblemSolvingNextUp);
        setStoryRetellingCurrent(data.storyRetellingCurrent);
        setStoryRetellingTotal(data.storyRetellingTotal);
        setStoryRetellingNextUp(data.storyRetellingNextUp);
        setTodayTotalMinutes(data.todayTotalMinutes);
        setTodayActivity1(data.todayActivity1);
        setTodayActivity2(data.todayActivity2);
        setTodayActivity3(data.todayActivity3);
        setTodayActivity4(data.todayActivity4);
        setSelectedWeek(data.selectedWeek);
        setWeeklyViewMode(data.weeklyViewMode);
        setMondayTotalMinutes(data.mondayTotalMinutes);
        setTuesdayTotalMinutes(data.tuesdayTotalMinutes);
        setWednesdayTotalMinutes(data.wednesdayTotalMinutes);
        setThursdayTotalMinutes(data.thursdayTotalMinutes);
        setFridayTotalMinutes(data.fridayTotalMinutes);
        setMondayActivity(data.mondayActivity);
        setTuesdayActivity(data.tuesdayActivity);
        setWednesdayActivity(data.wednesdayActivity);
        setThursdayActivity(data.thursdayActivity);
        setFridayActivity(data.fridayActivity);
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to load dashboard data.";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
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
  };
}
