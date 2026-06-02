import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

// POST /api/auth/register — cadastro de novo usuário
router.post("/register", register);

// POST /api/auth/login — login com e-mail e senha
router.post("/login", login);

export default router;
