import * as PublicService from "../services/public.service.js";

// LISTAR QUADRAS
export async function getQuadras(req, res) {
  try {
    const quadras = await PublicService.getQuadras();
    return res.json(quadras);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// DETALHE DE UMA QUADRA
export async function getQuadra(req, res) {
  try {
    const { id } = req.params;
    const quadra = await PublicService.getQuadraById(id);

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    return res.json(quadra);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// GRADE DE UMA QUADRA EM UM DIA
export async function getGrade(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({
        error: "O parâmetro 'data' é obrigatório (YYYY-MM-DD)."
      });
    }

    const grade = await PublicService.getGrade(id, data);
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
