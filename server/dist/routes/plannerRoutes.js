"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const plannerController_1 = require("../controllers/plannerController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get("/", plannerController_1.listBlocks);
router.post("/", plannerController_1.createBlock);
router.delete("/:id", plannerController_1.deleteBlock);
exports.default = router;
//# sourceMappingURL=plannerRoutes.js.map