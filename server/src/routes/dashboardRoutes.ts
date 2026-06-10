import { Router, type IRouter } from "express";
import { authenticateToken } from "../middlewares/auth";
import { getDashboardData } from "../controllers/dashboardController";

const router: IRouter = Router();

router.use(authenticateToken);

router.get("/", getDashboardData);

export default router;
