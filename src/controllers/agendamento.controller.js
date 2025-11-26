import * as AgendamentoService from "../services/agendamento.service.js";

export async function criar(req, res) {
  try {
    console.log("ID DO CLIENTE >>>", req.user);
    console.log("BODY RECEBIDO >>>", req.body);


    const idCliente = req.user.id_usuario;

    const novo = await AgendamentoService.criar(idCliente, req.body);

    return res.json(novo);

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
    const { id } = req.params;
    const idCliente = req.user.id_usuario;

    const result = await AgendamentoService.cancelar(id, idCliente);

    return res.json({
      message: "Agendamento cancelado com sucesso!",
      agendamento: result
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function listarTodos(req, res) {
  try {
    const result = await AgendamentoService.listarTodos(req.query);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

