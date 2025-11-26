import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/agendamento.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";


const router = Router();

// CLIENTE
router.post("/", authMiddleware, controller.criar);
router.get("/me", authMiddleware, controller.meusAgendamentos);
router.patch("/:id/cancelar", authMiddleware, controller.cancelar);

// ADMIN
router.get("/", authMiddleware, isAdmin, controller.listarTodos);

export default router;
