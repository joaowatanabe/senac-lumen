"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// POST /api/auth/register — cadastro de novo usuário
router.post("/register", authController_1.register);
// POST /api/auth/login — login com e-mail e senha
router.post("/login", authController_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map