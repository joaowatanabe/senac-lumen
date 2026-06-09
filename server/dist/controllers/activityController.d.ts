import { Request, Response } from "express";
/**
 * GET /api/activities
 * Lista atividades do usuário autenticado.
 * Query params: ?status=pending|completed  &subjectId=uuid
 */
export declare function listActivities(req: Request, res: Response): Promise<void>;
/**
 * POST /api/activities
 * Cria uma atividade vinculada a uma matéria.
 */
export declare function createActivity(req: Request, res: Response): Promise<void>;
/**
 * PATCH /api/activities/:id
 * Edita uma atividade ou muda status.
 */
export declare function updateActivity(req: Request, res: Response): Promise<void>;
/**
 * DELETE /api/activities/:id
 * Deleta uma atividade.
 */
export declare function deleteActivity(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=activityController.d.ts.map