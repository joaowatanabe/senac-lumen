import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/subjects
 * Lista todas as matérias do usuário autenticado.
 */
export async function listSubjects(req: Request, res: Response): Promise<void> {
  try {
    const subjects = await prisma.subject.findMany({
      where: { userId: req.userId! },
      include: {
        activities: true,
      },
      orderBy: { createdAt: "asc" },
    });

    res.json(subjects);
  } catch (error) {
    console.error("Erro ao listar matérias:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * POST /api/subjects
 * Cria uma nova matéria para o usuário autenticado.
 */
export async function createSubject(req: Request, res: Response): Promise<void> {
  try {
    const { name, color, category, icon } = req.body;

    if (!name || !color) {
      res.status(400).json({ message: "Nome e cor são obrigatórios." });
      return;
    }

    const validColors = ["indigo", "sky", "emerald", "amber", "rose", "violet", "orange", "teal"];
    if (!validColors.includes(color)) {
      res.status(400).json({ message: `Cor inválida. Use: ${validColors.join(", ")}` });
      return;
    }

    const subject = await prisma.subject.create({
      data: { 
        name, 
        color, 
        category: category || null,
        icon: icon || null,
        userId: req.userId! 
      },
    });

    res.status(201).json(subject);
  } catch (error) {
    console.error("Erro ao criar matéria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * PATCH /api/subjects/:id
 * Edita uma matéria do usuário autenticado.
 */
export async function updateSubject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const { name, color, category, icon } = req.body;

    // Verifica ownership
    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    if (color) {
      const validColors = ["indigo", "sky", "emerald", "amber", "rose", "violet", "orange", "teal"];
      if (!validColors.includes(color)) {
        res.status(400).json({ message: `Cor inválida. Use: ${validColors.join(", ")}` });
        return;
      }
    }

    const updated = await prisma.subject.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(color && { color }),
        category: category === undefined ? undefined : (category || null),
        icon: icon === undefined ? undefined : (icon || null),
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Erro ao editar matéria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * DELETE /api/subjects/:id
 * Deleta uma matéria do usuário autenticado.
 */
export async function deleteSubject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params as { id: string };

    // Verifica ownership
    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    // Deleta em cascata: registros dependentes primeiro, depois a matéria
    await prisma.$transaction([
      prisma.pomodoroSession.deleteMany({ where: { subjectId: id } }),
      prisma.activity.deleteMany({ where: { subjectId: id } }),
      prisma.plannerBlock.deleteMany({ where: { subjectId: id } }),
      prisma.subject.delete({ where: { id } }),
    ]);

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar matéria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
