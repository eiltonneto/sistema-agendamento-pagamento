import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);

export default router;   // 👈 ESSA LINHA É O QUE ESTAVA FALTANDO
