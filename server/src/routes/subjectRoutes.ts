import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import {
  listSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController";

const router = Router();

// Todas as rotas de matérias exigem autenticação
router.use(authenticateToken);

router.get("/", listSubjects);
router.post("/", createSubject);
router.patch("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
