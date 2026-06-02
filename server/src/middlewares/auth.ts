import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Estende o tipo Request para incluir userId nas rotas protegidas
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
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "Token de autenticação não fornecido." });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: "JWT_SECRET não configurado no servidor." });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
