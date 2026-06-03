import { useState, useEffect, useCallback } from "react";
import { subjectService } from "../services/subjectService";
import type { CreateSubjectData, UpdateSubjectData } from "../services/subjectService";
import type { Subject } from "../types";

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    try {
      setError(null);
      const data = await subjectService.list();
      setSubjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar matérias.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const createSubject = useCallback(async (data: CreateSubjectData) => {
    const created = await subjectService.create(data);
    setSubjects((prev) => [...prev, created]);
    return created;
  }, []);

  const updateSubject = useCallback(async (id: string, data: UpdateSubjectData) => {
    const updated = await subjectService.update(id, data);
    setSubjects((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  }, []);

  const deleteSubject = useCallback(async (id: string) => {
    await subjectService.remove(id);
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return {
    subjects,
    isLoading,
    error,
    createSubject,
    updateSubject,
    deleteSubject,
    refetch: fetchSubjects,
  };
}
