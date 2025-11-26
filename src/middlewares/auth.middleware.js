import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    // esperado formato: "Bearer token"
    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ error: "Token inválido." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // salva info do usuário dentro da request
    req.user = {
      id_usuario: decoded.id_usuario,
      tipo_usuario: decoded.tipo_usuario,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
