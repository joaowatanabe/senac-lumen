import { apiFetch } from "./api";
import type { Subject } from "../types";

export interface CreateSubjectData {
  name: string;
  color: string;
}

export interface UpdateSubjectData {
  name?: string;
  color?: string;
}

export const subjectService = {
  async list(): Promise<Subject[]> {
    return apiFetch<Subject[]>("/api/subjects");
  },

  async create(data: CreateSubjectData): Promise<Subject> {
    return apiFetch<Subject>("/api/subjects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: UpdateSubjectData): Promise<Subject> {
    return apiFetch<Subject>(`/api/subjects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async remove(id: string): Promise<void> {
    await apiFetch(`/api/subjects/${id}`, { method: "DELETE" });
  },
};
