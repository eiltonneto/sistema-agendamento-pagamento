import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import agendamentoRoutes from "./routes/agendamento.routes.js";

dotenv.config();

// Inicializar app
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.send("Servidor rodando!    ");
});

// Rotas
app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/api", publicRoutes);
app.use("/agendamentos", agendamentoRoutes);

export default app;
