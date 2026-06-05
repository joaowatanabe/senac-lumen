import { apiFetch } from "./api";
import type { PomodoroSession } from "../types";

export interface CreatePomodoroSessionData {
  subjectId: string;
  durationMinutes: number;
}

export const pomodoroService = {
  async getTodaySessions(): Promise<PomodoroSession[]> {
    return apiFetch<PomodoroSession[]>("/api/pomodoro/today");
  },

  async createSession(data: CreatePomodoroSessionData): Promise<PomodoroSession> {
    return apiFetch<PomodoroSession>("/api/pomodoro/sessions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
