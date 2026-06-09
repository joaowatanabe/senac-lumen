import { Request, Response } from "express";
/**
 * POST /api/auth/register
 * Cadastra um novo usuário com nome, e-mail e senha.
 */
export declare function register(req: Request, res: Response): Promise<void>;
/**
 * POST /api/auth/login
 * Autentica um usuário com e-mail e senha.
 */
export declare function login(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=authController.d.ts.map