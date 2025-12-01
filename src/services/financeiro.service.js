import prisma from "../database/prisma.js";

export async function registrarLancamento(data, idAdmin) {
  const { tipo, categoria, descricao, valor } = data;

  if (!["receita", "despesa"].includes(tipo)) {
    throw new Error("Tipo inválido. Use 'receita' ou 'despesa'.");
  }

  return prisma.financeiro.create({
    data: {
      tipo,
      categoria,
      descricao,
      valor,
      registrado_por: idAdmin
    }
  });
}

export async function listarLancamentos(filtros = {}) {
  const { tipo, categoria, mes, ano } = filtros;

  return prisma.financeiro.findMany({
    where: {
      ...(tipo && { tipo }),
      ...(categoria && { categoria }),
      ...(mes && ano && {
        data_registro: {
          gte: new Date(`${ano}-${mes}-01`),
          lt: new Date(`${ano}-${mes}-31`)
        }
      })
    },
    include: {
      usuario: {
        select: { nome: true, email: true }
      }
    },
    orderBy: { id_financeiro: "desc" }
  });
}

export async function resumoMensal(mes, ano) {
  const inicio = new Date(`${ano}-${mes}-01`);
  const fim = new Date(`${ano}-${mes}-31`);

  const receitas = await prisma.financeiro.aggregate({
    where: { tipo: "receita", data_registro: { gte: inicio, lt: fim } },
    _sum: { valor: true }
  });

  const despesas = await prisma.financeiro.aggregate({
    where: { tipo: "despesa", data_registro: { gte: inicio, lt: fim } },
    _sum: { valor: true }
  });

  return {
    mes,
    ano,
    total_receitas: receitas._sum.valor || 0,
    total_despesas: despesas._sum.valor || 0,
    lucro: (receitas._sum.valor || 0) - (despesas._sum.valor || 0)
  };
}
