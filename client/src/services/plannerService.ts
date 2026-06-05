import { apiFetch } from "./api";
import type { PlannerBlock } from "../types";

export interface CreatePlannerBlockData {
  subjectId: string;
  dayOfWeek: number;
  durationMinutes: number;
}

export const plannerService = {
  async list(): Promise<PlannerBlock[]> {
    return apiFetch<PlannerBlock[]>("/api/planner");
  },

  async create(data: CreatePlannerBlockData): Promise<PlannerBlock> {
    return apiFetch<PlannerBlock>("/api/planner", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async remove(id: string): Promise<void> {
    await apiFetch(`/api/planner/${id}`, { method: "DELETE" });
  },
};
