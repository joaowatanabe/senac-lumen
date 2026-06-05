import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";
import type { DashboardData } from "../services/dashboardService";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const summary = await dashboardService.getSummary();
      setData(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar o dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}
