export function isAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (req.user.tipo_usuario !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }

    next();

  } catch (error) {
    return res.status(500).json({ error: "Erro ao validar administrador." });
  }
}
