import { Request, Response } from "express";
/**
 * POST /api/pomodoro/sessions
 * Registra uma nova sessão pomodoro completada.
 */
export declare function createSession(req: Request, res: Response): Promise<void>;
/**
 * GET /api/pomodoro/today
 * Retorna as sessões de hoje do usuário.
 */
export declare function getTodaySessions(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=pomodoroController.d.ts.map