import { apiFetch } from "./api";
import type { Flashcard } from "../types";

export interface CreateFlashcardData {
  front: string;
  back: string;
  subjectId: string;
}

export const flashcardService = {
  async createFlashcard(data: CreateFlashcardData): Promise<Flashcard> {
    return apiFetch<Flashcard>("/api/flashcards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getFlashcardsToday(): Promise<Flashcard[]> {
    return apiFetch<Flashcard[]>("/api/flashcards/today");
  },

  async reviewFlashcard(id: string, quality: number): Promise<Flashcard> {
    return apiFetch<Flashcard>(`/api/flashcards/${id}/review`, {
      method: "PUT",
      body: JSON.stringify({ quality }),
    });
  },

  async getFlashcardsBySubject(subjectId: string): Promise<Flashcard[]> {
    return apiFetch<Flashcard[]>(`/api/subjects/${subjectId}/flashcards`);
  },

  async deleteFlashcard(id: string): Promise<void> {
    await apiFetch(`/api/flashcards/${id}`, {
      method: "DELETE",
    });
  },
};
