import * as AuthService from "../services/auth.services.js";

export async function register(req, res) {
  try {
    const result = await AuthService.register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const result = await AuthService.login(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function me(req, res) {
  try {
    const result = await AuthService.me(req.user.id_usuario);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
