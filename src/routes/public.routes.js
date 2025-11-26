import { Router } from "express";
import * as PublicController from "../controllers/public.controller.js";

const router = Router();

// Listar quadras
router.get("/quadras", PublicController.getQuadras);

// Grade de horários de uma quadra
router.get("/grade/:id", PublicController.getGrade);

// Informações institucionais
router.get("/sobre", PublicController.getSobre);

// Preços
router.get("/precos", PublicController.getPrecos);

export default router;
