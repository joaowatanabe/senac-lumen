import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
/**
 * Middleware de autenticação JWT.
 * Verifica o token no header Authorization: Bearer <token>
 * e injeta req.userId nas rotas protegidas.
 */
export declare function authenticateToken(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map