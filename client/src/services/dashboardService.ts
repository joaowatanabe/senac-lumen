import { apiFetch } from "./api";

export interface DashboardData {
  user: {
    name: string;
  };
  activitiesPending: number;
  activitiesToday: number;
  pomodoroSessionsToday: number;
  weeklyMinutesBySubject: {
    subjectId: string;
    subjectName: string;
    color: string;
    totalMinutes: number;
  }[];
  plannerBlocksToday: {
    id: string;
    subjectId: string;
    subjectName: string;
    color: string;
    durationMinutes: number;
  }[];
}

export const dashboardService = {
  async getSummary(): Promise<DashboardData> {
    return apiFetch<DashboardData>("/api/dashboard");
  },
};
