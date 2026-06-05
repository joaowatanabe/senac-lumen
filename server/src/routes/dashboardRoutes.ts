import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import { getDashboardData } from "../controllers/dashboardController";

const router = Router();

router.use(authenticateToken);

router.get("/", getDashboardData);

export default router;
