"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const pomodoroController_1 = require("../controllers/pomodoroController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.post("/sessions", pomodoroController_1.createSession);
router.get("/today", pomodoroController_1.getTodaySessions);
exports.default = router;
//# sourceMappingURL=pomodoroRoutes.js.map