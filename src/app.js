import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import agendamentoRoutes from "./routes/agendamento.routes.js";
import gradeRoutes from "./routes/grade.routes.js";
import financeiroRoutes from "./routes/financeiro.routes.js";

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota principal de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

// ROTAS
app.use("/auth", authRoutes);                     // login e registro
app.use("/usuarios", userRoutes);                 // listar usuários
app.use("/api", publicRoutes);                    // vitrine (quadras / sobre)
app.use("/agendamentos", agendamentoRoutes);      // criar / cancelar / listar
app.use("/api/quadras", gradeRoutes);             // criar grade (admin)
app.use("/financeiro", financeiroRoutes);      

export default app;
