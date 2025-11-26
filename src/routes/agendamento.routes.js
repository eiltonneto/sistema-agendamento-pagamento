import { Router } from "express";
import * as AgendamentoController from "../controllers/agendamento.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Criar agendamento
router.post("/", authMiddleware, AgendamentoController.criar);

// Listar meus agendamentos
router.get("/me", authMiddleware, AgendamentoController.meusAgendamentos);

// Cancelar agendamento
router.patch("/:id/cancelar", authMiddleware, AgendamentoController.cancelar);

export default router;
