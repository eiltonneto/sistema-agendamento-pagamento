import * as GradeService from "../services/grade.service.js";

export async function criarSlot(req, res) {
  try {
    const { id_quadra } = req.params;

    const novo = await GradeService.criarSlot(id_quadra, req.body);

    return res.status(201).json({
      message: "Slot criado com sucesso!",
      slot: novo
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
