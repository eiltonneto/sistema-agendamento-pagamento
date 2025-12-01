import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import * as GradeController from "../controllers/grade.controller.js";

const router = Router();

// Criar slot de horário (somente admin)
router.post("/:id_quadra/grade", authMiddleware, isAdmin, GradeController.criarSlot);

export default router;
