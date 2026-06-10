import { Request, Response } from "express";
/**
 * Função pura que calcula o algoritmo SM-2 para repetição espaçada.
 */
export declare function calculateSM2(quality: number, prevInterval: number, prevEaseFactor: number, prevRepetitions: number): {
    intervalDays: number;
    easeFactor: number;
    repetitions: number;
    nextReview: Date;
};
/**
 * POST /api/flashcards
 * Cria um novo flashcard.
 */
export declare function createFlashcard(req: Request, res: Response): Promise<void>;
/**
 * GET /api/flashcards/today
 * Retorna todos os cards do dia (nextReview <= agora).
 */
export declare function getFlashcardsToday(req: Request, res: Response): Promise<void>;
/**
 * POST /api/flashcards/:id/review
 * Registra a revisão de um flashcard aplicando o algoritmo SM-2.
 */
export declare function reviewFlashcard(req: Request, res: Response): Promise<void>;
/**
 * GET /api/flashcards/subject/:subjectId
 * Retorna todos os cards de uma matéria específica.
 */
export declare function getFlashcardsBySubject(req: Request, res: Response): Promise<void>;
/**
 * DELETE /api/flashcards/:id
 * Exclui um flashcard.
 */
export declare function deleteFlashcard(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=flashcardController.d.ts.map