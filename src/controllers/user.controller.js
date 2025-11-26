import { listUsers } from "../services/user.service.js";

export async function getUsers(req, res) {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}
