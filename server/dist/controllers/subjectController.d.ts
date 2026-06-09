import { Request, Response } from "express";
/**
 * GET /api/subjects
 * Lista todas as matérias do usuário autenticado.
 */
export declare function listSubjects(req: Request, res: Response): Promise<void>;
/**
 * POST /api/subjects
 * Cria uma nova matéria para o usuário autenticado.
 */
export declare function createSubject(req: Request, res: Response): Promise<void>;
/**
 * PATCH /api/subjects/:id
 * Edita uma matéria do usuário autenticado.
 */
export declare function updateSubject(req: Request, res: Response): Promise<void>;
/**
 * DELETE /api/subjects/:id
 * Deleta uma matéria do usuário autenticado.
 */
export declare function deleteSubject(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=subjectController.d.ts.map