import prisma from "../database/prisma.js";

export async function listUsers() {
  const users = await prisma.usuario.findMany();
  return users;
}
