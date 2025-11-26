import prisma from "../database/prisma.js";

// QUADRAS
export async function getQuadras() {
  return prisma.quadra.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
      imagem: true,
      tipo: true,
      tamanho: true
    }
  });
}

// GRADE DE HORÁRIOS
export async function getGrade(quadraId) {
  return prisma.grade_horario.findMany({
    where: { quadra_id: Number(quadraId) },
    orderBy: { horario: "asc" }
  });
}

// SOBRE (informações institucionais)
export async function getSobre() {
  return {
    nome: "Society Club",
    endereco: "Rua Exemplo, 123 — Fortaleza/CE",
    telefone: "(85) 99999-0000",
    funcionamento: "07h às 00h",
    descricao:
      "Campo society premium com vestiário, estacionamento, iluminação profissional e ambiente familiar."
  };
}

// TABELA DE PREÇOS
export async function getPrecos() {
  return prisma.preco.findMany({
    select: {
      id: true,
      dia_semana: true,
      valor_hora: true,
      promocao: true
    }
  });
}
