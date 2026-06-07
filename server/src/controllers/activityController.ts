import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/activities
 * Lista atividades do usuário autenticado.
 * Query params: ?status=pending|completed  &subjectId=uuid
 */
export async function listActivities(req: Request, res: Response): Promise<void> {
  try {
    const { status, subjectId } = req.query;

    const where: Record<string, unknown> = { userId: req.userId! };
    if (status === "pending" || status === "completed") {
      where.status = status;
    }
    if (typeof subjectId === "string" && subjectId) {
      where.subjectId = subjectId;
    }

    const activities = await prisma.activity.findMany({
      where,
      include: { subject: true },
      orderBy: [{ status: "asc" }, { dueDate: "asc" }, { createdAt: "desc" }],
    });

    res.json(activities);
  } catch (error) {
    console.error("Erro ao listar atividades:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * POST /api/activities
 * Cria uma atividade vinculada a uma matéria.
 */
export async function createActivity(req: Request, res: Response): Promise<void> {
  try {
    const { title, subjectId, dueDate, type, priority } = req.body;

    if (!title || !subjectId) {
      res.status(400).json({ message: "Título e matéria são obrigatórios." });
      return;
    }

    // Verifica se a matéria pertence ao usuário
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject || subject.userId !== req.userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        subjectId,
        userId: req.userId!,
        type: type || null,
        priority: priority || "Média",
        ...(dueDate && { dueDate: new Date(dueDate) }),
      },
      include: { subject: true },
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * PATCH /api/activities/:id
 * Edita uma atividade ou muda status.
 */
export async function updateActivity(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { title, subjectId, dueDate, status, type, priority } = req.body;

    // Verifica ownership
    const existing = await prisma.activity.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.userId) {
      res.status(404).json({ message: "Atividade não encontrada." });
      return;
    }

    // Valida status se fornecido
    if (status && !["pending", "completed"].includes(status)) {
      res.status(400).json({ message: "Status inválido. Use: pending, completed." });
      return;
    }

    // Valida matéria se trocando
    if (subjectId && subjectId !== existing.subjectId) {
      const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
      if (!subject || subject.userId !== req.userId) {
        res.status(404).json({ message: "Matéria não encontrada." });
        return;
      }
    }

    const updated = await prisma.activity.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(subjectId && { subjectId }),
        ...(status && { status }),
        type: type === undefined ? undefined : (type || null),
        priority: priority === undefined ? undefined : (priority || "Média"),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
      include: { subject: true },
    });

    res.json(updated);
  } catch (error) {
    console.error("Erro ao editar atividade:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * DELETE /api/activities/:id
 * Deleta uma atividade.
 */
export async function deleteActivity(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const existing = await prisma.activity.findUnique({ where: { id } });
    if (!existing || existing.userId !== req.userId) {
      res.status(404).json({ message: "Atividade não encontrada." });
      return;
    }

    await prisma.activity.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar atividade:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
