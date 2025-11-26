import prisma from "../database/prisma.js";

// CRIAR AGENDAMENTO
export async function criar(idCliente, data) {
  const { id_slot } = data;

  // Verificar se o slot existe
  const slot = await prisma.grade_horario.findUnique({
    where: { id_slot }
  });

  if (!slot) {
    throw new Error("Slot de horário não encontrado.");
  }

  // Verificar se o slot já está reservado
  const existe = await prisma.agendamento.findFirst({
    where: { id_slot }
  });

  if (existe) {
    throw new Error("Este horário já está reservado.");
  }

  // Criar agendamento
  const novo = await prisma.agendamento.create({
    data: {
      id_cliente: idCliente,
      id_slot,
      status_agendamento: "pendente"
    },
    include: {
      grade_horario: true
    }
  });

  return novo;
}

// LISTAR MEUS AGENDAMENTOS
export async function meusAgendamentos(idCliente) {
  return prisma.agendamento.findMany({
    where: { id_cliente: idCliente },
    include: {
      grade_horario: true
    },
    orderBy: { id_agendamento: "desc" }
  });
}

// CANCELAR AGENDAMENTO
export async function cancelar(idAgendamento, idCliente) {
  const agendamento = await prisma.agendamento.findUnique({
    where: { id_agendamento: Number(idAgendamento) }
  });

  if (!agendamento) {
    throw new Error("Agendamento não encontrado.");
  }

  if (agendamento.id_cliente !== idCliente) {
    throw new Error("Você não pode cancelar este agendamento.");
  }

  const cancelado = await prisma.agendamento.update({
    where: { id_agendamento: Number(idAgendamento) },
    data: {
      status_agendamento: "cancelado",
      cancelado_por: idCliente,
      data_cancelamento: new Date()
    }
  });

  return cancelado;
}
