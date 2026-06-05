import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * POST /api/pomodoro/sessions
 * Registra uma nova sessão pomodoro completada.
 */
export async function createSession(req: Request, res: Response): Promise<void> {
  try {
    const { subjectId, durationMinutes } = req.body;

    if (!subjectId || !durationMinutes) {
      res.status(400).json({ message: "Matéria e duração são obrigatórias." });
      return;
    }

    // Verifica se a matéria existe e pertence ao usuário
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject || subject.userId !== req.userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    const session = await prisma.pomodoroSession.create({
      data: {
        subjectId,
        durationMinutes,
        userId: req.userId!,
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Erro ao registrar sessão pomodoro:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * GET /api/pomodoro/today
 * Retorna as sessões de hoje do usuário.
 */
export async function getTodaySessions(req: Request, res: Response): Promise<void> {
  try {
    // Definir início e fim do dia de hoje (em UTC ou local do servidor)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sessions = await prisma.pomodoroSession.findMany({
      where: {
        userId: req.userId!,
        completedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        subject: true,
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    res.json(sessions);
  } catch (error) {
    console.error("Erro ao buscar sessões pomodoro:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
