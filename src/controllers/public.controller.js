import * as PublicService from "../services/public.service.js";

// QUADRAS
export async function getQuadras(req, res) {
  try {
    const quadras = await PublicService.getQuadras();
    return res.json(quadras);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// GRADE DE HORÁRIOS
export async function getGrade(req, res) {
  try {
    const { id } = req.params;
    const grade = await PublicService.getGrade(id);
    return res.json(grade);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// SOBRE O CLUBE
export async function getSobre(req, res) {
  try {
    const sobre = await PublicService.getSobre();
    return res.json(sobre);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// TABELA DE PREÇOS
export async function getPrecos(req, res) {
  try {
    const precos = await PublicService.getPrecos();
    return res.json(precos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
