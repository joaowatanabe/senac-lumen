"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get("/", activityController_1.listActivities);
router.post("/", activityController_1.createActivity);
router.patch("/:id", activityController_1.updateActivity);
router.delete("/:id", activityController_1.deleteActivity);
exports.default = router;
//# sourceMappingURL=activityRoutes.js.map