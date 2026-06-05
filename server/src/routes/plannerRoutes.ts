import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import {
  listBlocks,
  createBlock,
  deleteBlock,
} from "../controllers/plannerController";

const router = Router();

router.use(authenticateToken);

router.get("/", listBlocks);
router.post("/", createBlock);
router.delete("/:id", deleteBlock);

export default router;
