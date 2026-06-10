import { Router, type IRouter } from "express";
import { authenticateToken } from "../middlewares/auth";
import { createSession, getTodaySessions } from "../controllers/pomodoroController";

const router: IRouter = Router();

router.use(authenticateToken);

router.post("/sessions", createSession);
router.get("/today", getTodaySessions);

export default router;
