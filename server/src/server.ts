import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import subjectRoutes from "./routes/subjectRoutes";

const app = express();

// Middlewares globais
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);

// Rota de health-check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Porta do servidor
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🟢 Servidor Lúmen rodando em http://localhost:${PORT}`);
});

export default app;
