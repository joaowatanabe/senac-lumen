import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * Função pura que calcula o algoritmo SM-2 para repetição espaçada.
 */
export function calculateSM2(
  quality: number,
  prevInterval: number,
  prevEaseFactor: number,
  prevRepetitions: number
) {
  let intervalDays = 0;
  let easeFactor = prevEaseFactor;
  let repetitions = prevRepetitions;

  if (quality >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(prevInterval * easeFactor);
    }
    repetitions++;
    
    // Recalcula o ease factor (Fator de Facilidade)
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  } else {
    repetitions = 0;
    intervalDays = 1;
  }

  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + intervalDays);

  return {
    intervalDays,
    easeFactor,
    repetitions,
    nextReview,
  };
}

/**
 * POST /api/flashcards
 * Cria um novo flashcard.
 */
export async function createFlashcard(req: Request, res: Response): Promise<void> {
  try {
    const { front, back, subjectId } = req.body;
    const userId = req.userId!;

    if (!front || !back || !subjectId) {
      res.status(400).json({ message: "Os campos frente, verso e matéria são obrigatórios." });
      return;
    }

    // Verifica se a matéria pertence ao usuário
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject || subject.userId !== userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    const flashcard = await prisma.flashcard.create({
      data: {
        front,
        back,
        subjectId,
        userId,
      },
    });

    res.status(201).json(flashcard);
  } catch (error) {
    console.error("Erro ao criar flashcard:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * GET /api/flashcards/today
 * Retorna todos os cards do dia (nextReview <= agora).
 */
export async function getFlashcardsToday(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.userId!;
    
    const flashcards = await prisma.flashcard.findMany({
      where: {
        userId,
        nextReview: {
          lte: new Date(),
        },
      },
      include: {
        subject: true,
      },
      orderBy: {
        nextReview: "asc",
      },
    });

    res.json(flashcards);
  } catch (error) {
    console.error("Erro ao obter flashcards de hoje:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * POST /api/flashcards/:id/review
 * Registra a revisão de um flashcard aplicando o algoritmo SM-2.
 */
export async function reviewFlashcard(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const { quality } = req.body;
    const userId = req.userId!;

    if (quality === undefined || typeof quality !== "number" || quality < 0 || quality > 5) {
      res.status(400).json({ message: "Avaliação inválida. Deve ser um número de 0 a 5." });
      return;
    }

    const card = await prisma.flashcard.findUnique({
      where: { id },
    });

    if (!card || card.userId !== userId) {
      res.status(404).json({ message: "Flashcard não encontrado." });
      return;
    }

    const { intervalDays, easeFactor, repetitions, nextReview } = calculateSM2(
      quality,
      card.intervalDays,
      card.easeFactor,
      card.repetitions
    );

    const updatedCard = await prisma.flashcard.update({
      where: { id },
      data: {
        intervalDays,
        easeFactor,
        repetitions,
        nextReview,
      },
    });

    res.json(updatedCard);
  } catch (error) {
    console.error("Erro ao revisar flashcard:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * GET /api/flashcards/subject/:subjectId
 * Retorna todos os cards de uma matéria específica.
 */
export async function getFlashcardsBySubject(req: Request, res: Response): Promise<void> {
  try {
    const { subjectId } = req.params as { subjectId: string };
    const userId = req.userId!;

    // Verifica se a matéria pertence ao usuário
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject || subject.userId !== userId) {
      res.status(404).json({ message: "Matéria não encontrada." });
      return;
    }

    const flashcards = await prisma.flashcard.findMany({
      where: {
        subjectId,
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(flashcards);
  } catch (error) {
    console.error("Erro ao listar flashcards da matéria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

/**
 * DELETE /api/flashcards/:id
 * Exclui um flashcard.
 */
export async function deleteFlashcard(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const userId = req.userId!;

    const card = await prisma.flashcard.findUnique({
      where: { id },
    });

    if (!card || card.userId !== userId) {
      res.status(404).json({ message: "Flashcard não encontrado." });
      return;
    }

    await prisma.flashcard.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar flashcard:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
