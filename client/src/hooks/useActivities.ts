import { useState, useEffect, useCallback } from "react";
import { activityService } from "../services/activityService";
import type { CreateActivityData, UpdateActivityData } from "../services/activityService";
import type { Activity } from "../types";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setError(null);
      const data = await activityService.list();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar atividades.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const createActivity = useCallback(async (data: CreateActivityData) => {
    const created = await activityService.create(data);
    setActivities((prev) => [...prev, created]);
    return created;
  }, []);

  const updateActivity = useCallback(async (id: string, data: UpdateActivityData) => {
    const updated = await activityService.update(id, data);
    setActivities((prev) => prev.map((a) => (a.id === id ? updated : a)));
    return updated;
  }, []);

  const toggleStatus = useCallback(async (activity: Activity) => {
    const newStatus = activity.status === "pending" ? "completed" : "pending";
    // Atualização otimista
    setActivities((prev) =>
      prev.map((a) => (a.id === activity.id ? { ...a, status: newStatus } : a))
    );
    try {
      await activityService.update(activity.id, { status: newStatus });
    } catch {
      // Reverte se falhar
      setActivities((prev) =>
        prev.map((a) => (a.id === activity.id ? { ...a, status: activity.status } : a))
      );
    }
  }, []);

  const deleteActivity = useCallback(async (id: string) => {
    await activityService.remove(id);
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const pending = activities.filter((a) => a.status === "pending");
  const completed = activities.filter((a) => a.status === "completed");

  return {
    activities,
    pending,
    completed,
    isLoading,
    error,
    createActivity,
    updateActivity,
    toggleStatus,
    deleteActivity,
    refetch: fetchActivities,
  };
}
