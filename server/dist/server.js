"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const subjectRoutes_1 = __importDefault(require("./routes/subjectRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const pomodoroRoutes_1 = __importDefault(require("./routes/pomodoroRoutes"));
const plannerRoutes_1 = __importDefault(require("./routes/plannerRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const flashcardRoutes_1 = __importDefault(require("./routes/flashcardRoutes"));
const app = (0, express_1.default)();
// Middlewares globais
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use(express_1.default.json());
// Rotas
app.use("/api/auth", authRoutes_1.default);
app.use("/api/subjects", subjectRoutes_1.default);
app.use("/api/activities", activityRoutes_1.default);
app.use("/api/pomodoro", pomodoroRoutes_1.default);
app.use("/api/planner", plannerRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api", flashcardRoutes_1.default);
// Rota de health-check
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Porta do servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🟢 Servidor Lúmen rodando em http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map