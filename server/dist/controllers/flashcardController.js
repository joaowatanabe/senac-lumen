"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSM2 = calculateSM2;
exports.createFlashcard = createFlashcard;
exports.getFlashcardsToday = getFlashcardsToday;
exports.reviewFlashcard = reviewFlashcard;
exports.getFlashcardsBySubject = getFlashcardsBySubject;
exports.deleteFlashcard = deleteFlashcard;
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Função pura que calcula o algoritmo SM-2 para repetição espaçada.
 */
function calculateSM2(quality, prevInterval, prevEaseFactor, prevRepetitions) {
    let intervalDays = 0;
    let easeFactor = prevEaseFactor;
    let repetitions = prevRepetitions;
    if (quality >= 3) {
        if (repetitions === 0) {
            intervalDays = 1;
        }
        else if (repetitions === 1) {
            intervalDays = 6;
        }
        else {
            intervalDays = Math.round(prevInterval * easeFactor);
        }
        repetitions++;
        // Recalcula o ease factor (Fator de Facilidade)
        easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    }
    else {
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
async function createFlashcard(req, res) {
    try {
        const { front, back, subjectId } = req.body;
        const userId = req.userId;
        if (!front || !back || !subjectId) {
            res.status(400).json({ message: "Os campos frente, verso e matéria são obrigatórios." });
            return;
        }
        // Verifica se a matéria pertence ao usuário
        const subject = await prisma_1.default.subject.findUnique({
            where: { id: subjectId },
        });
        if (!subject || subject.userId !== userId) {
            res.status(404).json({ message: "Matéria não encontrada." });
            return;
        }
        const flashcard = await prisma_1.default.flashcard.create({
            data: {
                front,
                back,
                subjectId,
                userId,
            },
        });
        res.status(201).json(flashcard);
    }
    catch (error) {
        console.error("Erro ao criar flashcard:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * GET /api/flashcards/today
 * Retorna todos os cards do dia (nextReview <= agora).
 */
async function getFlashcardsToday(req, res) {
    try {
        const userId = req.userId;
        const flashcards = await prisma_1.default.flashcard.findMany({
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
    }
    catch (error) {
        console.error("Erro ao obter flashcards de hoje:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * POST /api/flashcards/:id/review
 * Registra a revisão de um flashcard aplicando o algoritmo SM-2.
 */
async function reviewFlashcard(req, res) {
    try {
        const { id } = req.params;
        const { quality } = req.body;
        const userId = req.userId;
        if (quality === undefined || typeof quality !== "number" || quality < 0 || quality > 5) {
            res.status(400).json({ message: "Avaliação inválida. Deve ser um número de 0 a 5." });
            return;
        }
        const card = await prisma_1.default.flashcard.findUnique({
            where: { id },
        });
        if (!card || card.userId !== userId) {
            res.status(404).json({ message: "Flashcard não encontrado." });
            return;
        }
        const { intervalDays, easeFactor, repetitions, nextReview } = calculateSM2(quality, card.intervalDays, card.easeFactor, card.repetitions);
        const updatedCard = await prisma_1.default.flashcard.update({
            where: { id },
            data: {
                intervalDays,
                easeFactor,
                repetitions,
                nextReview,
            },
        });
        res.json(updatedCard);
    }
    catch (error) {
        console.error("Erro ao revisar flashcard:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * GET /api/flashcards/subject/:subjectId
 * Retorna todos os cards de uma matéria específica.
 */
async function getFlashcardsBySubject(req, res) {
    try {
        const { subjectId } = req.params;
        const userId = req.userId;
        // Verifica se a matéria pertence ao usuário
        const subject = await prisma_1.default.subject.findUnique({
            where: { id: subjectId },
        });
        if (!subject || subject.userId !== userId) {
            res.status(404).json({ message: "Matéria não encontrada." });
            return;
        }
        const flashcards = await prisma_1.default.flashcard.findMany({
            where: {
                subjectId,
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(flashcards);
    }
    catch (error) {
        console.error("Erro ao listar flashcards da matéria:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * DELETE /api/flashcards/:id
 * Exclui um flashcard.
 */
async function deleteFlashcard(req, res) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const card = await prisma_1.default.flashcard.findUnique({
            where: { id },
        });
        if (!card || card.userId !== userId) {
            res.status(404).json({ message: "Flashcard não encontrado." });
            return;
        }
        await prisma_1.default.flashcard.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar flashcard:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
//# sourceMappingURL=flashcardController.js.map