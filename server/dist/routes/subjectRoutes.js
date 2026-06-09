"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const subjectController_1 = require("../controllers/subjectController");
const router = (0, express_1.Router)();
// Todas as rotas de matérias exigem autenticação
router.use(auth_1.authenticateToken);
router.get("/", subjectController_1.listSubjects);
router.post("/", subjectController_1.createSubject);
router.patch("/:id", subjectController_1.updateSubject);
router.delete("/:id", subjectController_1.deleteSubject);
exports.default = router;
//# sourceMappingURL=subjectRoutes.js.map