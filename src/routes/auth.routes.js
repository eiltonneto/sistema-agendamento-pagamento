import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Registro
router.post("/register", AuthController.register);

// Login
router.post("/login", AuthController.login);

// Rota protegida: perfil do usuário logado
router.get("/me", authMiddleware, AuthController.me);

export default router;
