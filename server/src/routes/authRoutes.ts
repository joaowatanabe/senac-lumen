import { Router, type IRouter } from "express";
import { register, login } from "../controllers/authController";

const router: IRouter = Router();

// POST /api/auth/register — cadastro de novo usuário
router.post("/register", register);

// POST /api/auth/login — login com e-mail e senha
router.post("/login", login);

export default router;
