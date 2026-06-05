import { useState, useEffect, useCallback } from "react";
import { plannerService } from "../services/plannerService";
import type { CreatePlannerBlockData } from "../services/plannerService";
import type { PlannerBlock } from "../types";

export function usePlanner() {
  const [blocks, setBlocks] = useState<PlannerBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocks = useCallback(async () => {
    try {
      setError(null);
      const data = await plannerService.list();
      setBlocks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar o planner.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  const addBlock = useCallback(async (data: CreatePlannerBlockData) => {
    const created = await plannerService.create(data);
    setBlocks((prev) => [...prev, created]);
    return created;
  }, []);

  const removeBlock = useCallback(async (id: string) => {
    const originalBlocks = [...blocks];
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    try {
      await plannerService.remove(id);
    } catch (err) {
      setBlocks(originalBlocks);
      throw err;
    }
  }, [blocks]);

  const getBlocksForDay = useCallback(
    (day: number) => {
      return blocks.filter((b) => b.dayOfWeek === day);
    },
    [blocks]
  );

  return {
    blocks,
    isLoading,
    error,
    addBlock,
    removeBlock,
    getBlocksForDay,
    refetch: fetchBlocks,
  };
}
