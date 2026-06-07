import { apiFetch } from "./api";
import type { Activity } from "../types";

export interface CreateActivityData {
  title: string;
  subjectId: string;
  dueDate?: string;
  type?: string;
  priority?: string;
}

export interface UpdateActivityData {
  title?: string;
  subjectId?: string;
  dueDate?: string | null;
  status?: "pending" | "completed";
  type?: string;
  priority?: string;
}

export const activityService = {
  async list(params?: { status?: string; subjectId?: string }): Promise<Activity[]> {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.subjectId) query.set("subjectId", params.subjectId);
    const qs = query.toString();
    return apiFetch<Activity[]>(`/api/activities${qs ? `?${qs}` : ""}`);
  },

  async create(data: CreateActivityData): Promise<Activity> {
    return apiFetch<Activity>("/api/activities", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: UpdateActivityData): Promise<Activity> {
    return apiFetch<Activity>(`/api/activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async remove(id: string): Promise<void> {
    await apiFetch(`/api/activities/${id}`, { method: "DELETE" });
  },
};
