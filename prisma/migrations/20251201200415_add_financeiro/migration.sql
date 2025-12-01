-- CreateTable
CREATE TABLE "financeiro" (
    "id_financeiro" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "categoria" TEXT,
    "descricao" TEXT,
    "valor" DECIMAL(65,30) NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registrado_por" INTEGER,

    CONSTRAINT "financeiro_pkey" PRIMARY KEY ("id_financeiro")
);

-- AddForeignKey
ALTER TABLE "financeiro" ADD CONSTRAINT "financeiro_registrado_por_fkey" FOREIGN KEY ("registrado_por") REFERENCES "usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;
