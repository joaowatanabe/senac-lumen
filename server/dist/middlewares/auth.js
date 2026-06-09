"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware de autenticação JWT.
 * Verifica o token no header Authorization: Bearer <token>
 * e injeta req.userId nas rotas protegidas.
 */
function authenticateToken(req, res, next) {
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
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.userId = payload.userId;
        next();
    }
    catch {
        res.status(401).json({ message: "Token inválido ou expirado." });
    }
}
//# sourceMappingURL=auth.js.map