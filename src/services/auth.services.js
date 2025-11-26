import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js";

export async function register(data) {
  const { nome, email, senha } = data;

  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) throw new Error("Email já cadastrado.");

  const hash = await bcrypt.hash(senha, 10);

const novo = await prisma.usuario.create({
  data: {
    nome,
    email,
    senha_hash: hash,   // <- CORRETO
    tipo_usuario: "cliente",
    status: true
  }
});

  return novo;
}

export async function login(data) {
  const { email, senha } = data;

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado.");

  const valid = await bcrypt.compare(senha, user.senha_hash);

  if (!valid) throw new Error("Senha incorreta.");

  const token = jwt.sign(
    { 
    id_usuario: user.id_usuario,
    tipo_usuario: user.tipo_usuario,
  },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    id_usuario: user.id_usuario,
    nome: user.nome,
    email: user.email,
    tipo_usuario: user.tipo_usuario,
    token
  };
}

export async function me(id_usuario) {
  return prisma.usuario.findUnique({
    where: { id_usuario },
    select: {
      id_usuario: true,
      nome: true,
      email: true,
      tipo_usuario: true,
      status: true,
      data_cadastro: true
    }
  });
}
