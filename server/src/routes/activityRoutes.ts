import { Router, type IRouter } from "express";
import { authenticateToken } from "../middlewares/auth";
import {
  listActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController";

const router: IRouter = Router();

router.use(authenticateToken);

router.get("/", listActivities);
router.post("/", createActivity);
router.patch("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
