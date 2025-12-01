import { Router } from "express";
import * as PublicController from "../controllers/public.controller.js";

const router = Router();

// Listar quadras
router.get("/quadras", PublicController.getQuadras);

// Detalhe de quadra
router.get("/quadras/:id", PublicController.getQuadra);

// Grade de horários (com query param ?data=YYYY-MM-DD)
router.get("/quadras/:id/grade", PublicController.getGrade);

// Informações institucionais
router.get("/sobre", PublicController.getSobre);

export default router;
