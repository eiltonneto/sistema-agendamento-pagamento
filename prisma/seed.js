import prisma from "../src/database/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("Iniciando seed...");

  // 1) Criar ADMIN
  const senhaHash = await bcrypt.hash("admin123", 10);

  const admin = await prisma.usuario.upsert({
    where: { email: "admin@society.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@society.com",
      senha_hash: senhaHash,
      tipo_usuario: "admin"
    }
  });

  console.log("Admin criado:", admin.id_usuario);

  // 2) Criar quadra
  const quadra = await prisma.quadra.create({
    data: {
      nome: "Quadra Society 1",
      ativa: true
    }
  });

  console.log("Quadra criada:", quadra.id_quadra);

  // 3) Criar slot de exemplo
  await prisma.grade_horario.create({
    data: {
      id_quadra: quadra.id_quadra,
      data: new Date("2025-10-26"),
      hora_inicio: new Date("2025-10-26T18:00:00"),
      hora_fim: new Date("2025-10-26T19:00:00")
    }
  });

  console.log("Slot criado com sucesso!");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
