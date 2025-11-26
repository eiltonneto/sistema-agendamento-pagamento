-- CreateTable
CREATE TABLE "agendamento" (
    "id_agendamento" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_slot" INTEGER NOT NULL,
    "id_admin_responsavel" INTEGER,
    "status_agendamento" VARCHAR(20) DEFAULT 'pendente',
    "compareceu" BOOLEAN DEFAULT false,
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(6),
    "cancelado_por" INTEGER,
    "data_cancelamento" TIMESTAMP(6),
    "motivo_cancelamento" TEXT,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id_agendamento")
);

-- CreateTable
CREATE TABLE "grade_horario" (
    "id_slot" SERIAL NOT NULL,
    "id_quadra" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "hora_inicio" TIME(6) NOT NULL,
    "hora_fim" TIME(6) NOT NULL,

    CONSTRAINT "grade_horario_pkey" PRIMARY KEY ("id_slot")
);

-- CreateTable
CREATE TABLE "historico_agendamento" (
    "id_historico" SERIAL NOT NULL,
    "id_cliente" INTEGER,
    "id_agendamento" INTEGER,
    "data_agendamento" DATE NOT NULL,
    "status_final" VARCHAR(20),
    "compareceu" BOOLEAN DEFAULT false,
    "observacao" TEXT,

    CONSTRAINT "historico_agendamento_pkey" PRIMARY KEY ("id_historico")
);

-- CreateTable
CREATE TABLE "notificacao" (
    "id_notificacao" SERIAL NOT NULL,
    "id_cliente" INTEGER,
    "id_agendamento" INTEGER,
    "tipo" VARCHAR(20) NOT NULL,
    "fluxo" VARCHAR(20),
    "mensagem" TEXT,
    "status" BOOLEAN DEFAULT false,
    "data_envio" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER,

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id_notificacao")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id_pagamento" SERIAL NOT NULL,
    "id_agendamento" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "metodo_pagamento" VARCHAR(30),
    "valor_total" DECIMAL(10,2) NOT NULL,
    "valor_pago" DECIMAL(10,2) NOT NULL,
    "status_pagamento" VARCHAR(20),
    "data_pagamento" TIMESTAMP(6),
    "id_transacao" VARCHAR(100),
    "comprovante_url" TEXT,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id_pagamento")
);

-- CreateTable
CREATE TABLE "quadra" (
    "id_quadra" SERIAL NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "ativa" BOOLEAN DEFAULT true,
    "id_usuario" INTEGER,

    CONSTRAINT "quadra_pkey" PRIMARY KEY ("id_quadra")
);

-- CreateTable
CREATE TABLE "relatorio" (
    "id_relatorio" SERIAL NOT NULL,
    "tipo" VARCHAR(30),
    "periodo_inicio" DATE,
    "periodo_fim" DATE,
    "total_agendamentos" INTEGER,
    "total_pagamentos" INTEGER,
    "total_cancelamentos" INTEGER,
    "data_geracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relatorio_pkey" PRIMARY KEY ("id_relatorio")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(20),
    "email" VARCHAR(120) NOT NULL,
    "cpf" VARCHAR(14),
    "senha_hash" TEXT NOT NULL,
    "tipo_usuario" VARCHAR(20) NOT NULL,
    "data_cadastro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT true,
    "uuid_usuario_hash" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_cancelado_por_fkey" FOREIGN KEY ("cancelado_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_id_admin_responsavel_fkey" FOREIGN KEY ("id_admin_responsavel") REFERENCES "usuario"("id_usuario") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_id_slot_fkey" FOREIGN KEY ("id_slot") REFERENCES "grade_horario"("id_slot") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grade_horario" ADD CONSTRAINT "grade_horario_id_quadra_fkey" FOREIGN KEY ("id_quadra") REFERENCES "quadra"("id_quadra") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico_agendamento" ADD CONSTRAINT "historico_agendamento_id_agendamento_fkey" FOREIGN KEY ("id_agendamento") REFERENCES "agendamento"("id_agendamento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico_agendamento" ADD CONSTRAINT "historico_agendamento_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_agendamento_fkey" FOREIGN KEY ("id_agendamento") REFERENCES "agendamento"("id_agendamento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_id_agendamento_fkey" FOREIGN KEY ("id_agendamento") REFERENCES "agendamento"("id_agendamento") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quadra" ADD CONSTRAINT "quadra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE SET NULL ON UPDATE NO ACTION;
