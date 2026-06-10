"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const flashcardController_1 = require("../controllers/flashcardController");
const router = (0, express_1.Router)();
// Todas as rotas de flashcards exigem autenticação
router.use(auth_1.authenticateToken);
router.post("/flashcards", flashcardController_1.createFlashcard);
router.get("/flashcards/today", flashcardController_1.getFlashcardsToday);
router.put("/flashcards/:id/review", flashcardController_1.reviewFlashcard);
router.get("/subjects/:subjectId/flashcards", flashcardController_1.getFlashcardsBySubject);
router.delete("/flashcards/:id", flashcardController_1.deleteFlashcard);
exports.default = router;
//# sourceMappingURL=flashcardRoutes.js.map