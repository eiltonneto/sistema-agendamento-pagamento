import { Router } from "express";
import * as Controller from "../controllers/financeiro.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/", authMiddleware, isAdmin, Controller.registrar);
router.get("/", authMiddleware, isAdmin, Controller.listar);
router.get("/resumo", authMiddleware, isAdmin, Controller.resumo);

export default router;
