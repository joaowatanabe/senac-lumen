import { Request, Response } from "express";
/**
 * GET /api/planner
 * Retorna todos os blocos do planner do usuário autenticado.
 */
export declare function listBlocks(req: Request, res: Response): Promise<void>;
/**
 * POST /api/planner
 * Cria um bloco no planner.
 * Body: { subjectId, dayOfWeek, durationMinutes }
 */
export declare function createBlock(req: Request, res: Response): Promise<void>;
/**
 * DELETE /api/planner/:id
 * Remove um bloco do planner.
 */
export declare function deleteBlock(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=plannerController.d.ts.map