import { Router, type IRouter } from "express";
import { authenticateToken } from "../middlewares/auth";
import {
  createFlashcard,
  getFlashcardsToday,
  reviewFlashcard,
  getFlashcardsBySubject,
  deleteFlashcard,
} from "../controllers/flashcardController";

const router: IRouter = Router();

// Todas as rotas de flashcards exigem autenticação
router.use(authenticateToken);

router.post("/flashcards", createFlashcard);
router.get("/flashcards/today", getFlashcardsToday);
router.put("/flashcards/:id/review", reviewFlashcard);
router.get("/subjects/:subjectId/flashcards", getFlashcardsBySubject);
router.delete("/flashcards/:id", deleteFlashcard);

export default router;
