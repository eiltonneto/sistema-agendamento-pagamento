import * as FinanceiroService from "../services/financeiro.service.js";

export async function registrar(req, res) {
  try {
    const idAdmin = req.user.id_usuario;
    const result = await FinanceiroService.registrarLancamento(req.body, idAdmin);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function listar(req, res) {
  try {
    const result = await FinanceiroService.listarLancamentos(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function resumo(req, res) {
  try {
    const { mes, ano } = req.query;
    const result = await FinanceiroService.resumoMensal(mes, ano);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
