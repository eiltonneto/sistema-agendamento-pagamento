import prisma from "../database/prisma.js";

// LISTAR QUADRAS
export async function getQuadras() {
  return prisma.quadra.findMany({
    where: { ativa: true },
    select: {
      id_quadra: true,
      nome: true,
      ativa: true,
    }
  });
}

// DETALHE DE UMA QUADRA
export async function getQuadraById(id) {
  return prisma.quadra.findUnique({
    where: { id_quadra: Number(id) },
    select: {
      id_quadra: true,
      nome: true,
      ativa: true,
    }
  });
}

// LISTAR GRADE DE UMA QUADRA EM UM DIA
export async function getGrade(quadraId, dataISO) {
  const data = new Date(dataISO); // formato: YYYY-MM-DD

  return prisma.grade_horario.findMany({
    where: {
      id_quadra: Number(quadraId),
      data: data
    },
    select: {
      id_slot: true,
      data: true,
      hora_inicio: true,
      hora_fim: true,
      agendamento: {
        select: {
          status_agendamento: true
        }
      }
    },
    orderBy: { hora_inicio: "asc" }
  });
}

// SOBRE O CLUBE (hardcoded por enquanto)
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
