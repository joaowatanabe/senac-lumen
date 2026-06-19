import "dotenv/config";
import express, { type Application } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import activityRoutes from "./routes/activityRoutes";
import pomodoroRoutes from "./routes/pomodoroRoutes";
import plannerRoutes from "./routes/plannerRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import flashcardRoutes from "./routes/flashcardRoutes";

const app: Application = express();


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/pomodoro", pomodoroRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", flashcardRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🟢 Servidor Lúmen rodando em http://localhost:${PORT}`);
});

export default app;
