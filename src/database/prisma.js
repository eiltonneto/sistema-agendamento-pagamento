import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("PRISMA FOI CARREGADO");
export default prisma;
