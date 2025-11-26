import dotenv from "dotenv";

// Carrega variáveis do .env ANTES de importar qualquer módulo
dotenv.config();

import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
