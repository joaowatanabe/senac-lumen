"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get("/", dashboardController_1.getDashboardData);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map