import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/dashboard
 * Retorna dados consolidados para o Dashboard do usuário autenticado.
 */
export async function getDashboardData(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.userId!;

    // 1. Início e fim do dia atual (hoje)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    // 2. Início e fim da semana atual (Segunda-feira a Domingo)
    const startOfWeek = new Date();
    const day = startOfWeek.getDay();
    // Se hoje for Domingo (0), ajusta -6 dias. Senão, ajusta para a Segunda mais próxima (1 - day)
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // 3. Consulta o nome do usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    // 4. Quantidade de atividades pendentes
    const activitiesPending = await prisma.activity.count({
      where: {
        userId,
        status: "pending",
      },
    });

    // 5. Quantidade de atividades para hoje
    const activitiesToday = await prisma.activity.count({
      where: {
        userId,
        dueDate: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    // 6. Sessões de Pomodoro concluídas hoje
    const pomodoroSessionsToday = await prisma.pomodoroSession.count({
      where: {
        userId,
        completedAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    // 7. Blocos do planner para hoje (0 = Dom, 6 = Sáb)
    const currentDayOfWeek = new Date().getDay();
    const plannerBlocks = await prisma.plannerBlock.findMany({
      where: {
        userId,
        dayOfWeek: currentDayOfWeek,
      },
      include: {
        subject: true,
      },
    });

    const plannerBlocksToday = plannerBlocks.map((b) => ({
      id: b.id,
      subjectId: b.subjectId,
      subjectName: b.subject.name,
      color: b.subject.color,
      durationMinutes: b.durationMinutes,
    }));

    // 8. Minutos de Pomodoro na semana atual por matéria
    const weeklySessions = await prisma.pomodoroSession.findMany({
      where: {
        userId,
        completedAt: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
      },
      include: {
        subject: true,
      },
    });

    const weeklyMinutesMap = new Map<
      string,
      { subjectId: string; subjectName: string; color: string; totalMinutes: number }
    >();

    for (const session of weeklySessions) {
      const existing = weeklyMinutesMap.get(session.subjectId);
      if (existing) {
        existing.totalMinutes += session.durationMinutes;
      } else {
        weeklyMinutesMap.set(session.subjectId, {
          subjectId: session.subjectId,
          subjectName: session.subject.name,
          color: session.subject.color,
          totalMinutes: session.durationMinutes,
        });
      }
    }

    // 7.5. Flashcards pendentes para hoje
    const flashcardsDueToday = await prisma.flashcard.count({
      where: {
        userId,
        nextReview: {
          lte: new Date(),
        },
      },
    });

    const weeklyMinutesBySubject = Array.from(weeklyMinutesMap.values());

    res.json({
      user: { name: user.name },
      activitiesPending,
      activitiesToday,
      pomodoroSessionsToday,
      weeklyMinutesBySubject,
      plannerBlocksToday,
      flashcardsDueToday,
    });
  } catch (error) {
    console.error("Erro ao obter dados do dashboard:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
