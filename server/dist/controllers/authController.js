"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const SALT_ROUNDS = 10;
const JWT_EXPIRATION = "7d"; // Token válido por 7 dias
/**
 * Gera um JWT com o userId como payload.
 */
function generateToken(userId) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET não configurado.");
    return jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: JWT_EXPIRATION });
}
/**
 * POST /api/auth/register
 * Cadastra um novo usuário com nome, e-mail e senha.
 */
async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        // Validação dos campos obrigatórios
        if (!name || !email || !password) {
            res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
            return;
        }
        // Validação simples de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: "Formato de e-mail inválido." });
            return;
        }
        // Validação de senha (mínimo 6 caracteres)
        if (password.length < 6) {
            res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
            return;
        }
        // Verifica se o e-mail já está cadastrado
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: "Este e-mail já está cadastrado." });
            return;
        }
        // Hash da senha com bcrypt
        const passwordHash = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
        // Cria o usuário no banco
        const user = await prisma_1.default.user.create({
            data: { name, email, passwordHash },
        });
        // Gera o token JWT
        const token = generateToken(user.id);
        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt.toISOString(),
            },
        });
    }
    catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
/**
 * POST /api/auth/login
 * Autentica um usuário com e-mail e senha.
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;
        // Validação dos campos obrigatórios
        if (!email || !password) {
            res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            return;
        }
        // Busca o usuário pelo e-mail
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "E-mail ou senha incorretos." });
            return;
        }
        // Verifica a senha com bcrypt
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ message: "E-mail ou senha incorretos." });
            return;
        }
        // Gera o token JWT
        const token = generateToken(user.id);
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt.toISOString(),
            },
        });
    }
    catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}
//# sourceMappingURL=authController.js.map