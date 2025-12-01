import prisma from "../database/prisma.js";

export async function criarSlot(id_quadra, dados) {
  const { data, hora_inicio, hora_fim } = dados;

  if (!data || !hora_inicio || !hora_fim) {
    throw new Error("Data, hora início e hora fim são obrigatórios.");
  }

  const dataFormatada = new Date(`${data}T00:00:00`);
  const inicio = new Date(`${data}T${hora_inicio}`);
  const fim = new Date(`${data}T${hora_fim}`);

  if (inicio >= fim) {
    throw new Error("A hora de início deve ser menor que a hora de fim.");
  }

  return prisma.grade_horario.create({
    data: {
      id_quadra: Number(id_quadra),
      data: dataFormatada,
      hora_inicio: inicio,
      hora_fim: fim
    }
  });
}
