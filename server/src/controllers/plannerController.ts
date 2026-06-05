import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/planner
 * Retorna todos os blocos do planner do usuário autenticado.
 */
export async function listBlocks(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.userId!;
    const blocks = await prisma.plannerBlock.findMany({
      where: { userId },
      include: { subject: true },
      orderBy: [{ dayOfWeek: "asc" }, { durationMinutes: "desc" }],
    });
    res.json(blocks);
  } catch (error) {
    console.error("Erro ao listar blocos do planner:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * POST /api/planner
 * Cria um bloco no planner.
 * Body: { subjectId, dayOfWeek, durationMinutes }
 */
export async function createBlock(req: Request, res: Response): Promise<void> {
  try {
    const { subjectId, dayOfWeek, durationMinutes } = req.body;

    // Valida campos obrigatórios
    if (subjectId === undefined || dayOfWeek === undefined || durationMinutes === undefined) {
      res.status(400).json({ message: "Todos os campos são obrigatórios: subjectId, dayOfWeek e durationMinutes." });
      return;
    }

    // Valida dia da semana (0-6)
    if (typeof dayOfWeek !== "number" || dayOfWeek < 0 || dayOfWeek > 6) {
      res.status(400).json({ message: "O dia da semana deve ser um número entre 0 (Domingo) e 6 (Sábado)." });
      return;
    }

    // Valida duração (15 a 480 minutos)
    if (typeof durationMinutes !== "number" || durationMinutes < 15 || durationMinutes > 480) {
      res.status(400).json({ message: "A duração deve ser um número entre 15 e 480 minutos." });
      return;
    }

    // Verifica se a matéria pertence ao usuário
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject || subject.userId !== req.userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    const block = await prisma.plannerBlock.create({
      data: {
        userId: req.userId!,
        subjectId,
        dayOfWeek,
        durationMinutes,
      },
      include: { subject: true },
    });

    res.status(201).json(block);
  } catch (error) {
    console.error("Erro ao criar bloco no planner:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * DELETE /api/planner/:id
 * Remove um bloco do planner.
 */
export async function deleteBlock(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    // Verifica ownership do bloco
    const existing = await prisma.plannerBlock.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.userId) {
      res.status(404).json({ message: "Bloco do planner não encontrado." });
      return;
    }

    await prisma.plannerBlock.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar bloco do planner:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
