import * as AgendamentoService from "../services/agendamento.service.js";

export async function criar(req, res) {
  try {
    const result = await AgendamentoService.criar(req.user.id_usuario, req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function meusAgendamentos(req, res) {
  try {
    const result = await AgendamentoService.meusAgendamentos(req.user.id_usuario);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function cancelar(req, res) {
  try {
    const result = await AgendamentoService.cancelar(req.params.id, req.user.id_usuario);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
