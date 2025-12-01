📌 Sistema de Agendamentos, Pagamentos e Gestão Operacional

Status: Em desenvolvimento
Objetivo: Desenvolver uma aplicação backend robusta para estabelecimentos que precisam gerenciar agendamentos, pagamentos, fluxo financeiro e futuramente produtos, estoque e vendas internas.

O sistema está sendo estruturado para evoluir como um SaaS multi-estabelecimento, permitindo que diferentes negócios utilizem o mesmo backend com total independência operacional.

🚀 Funcionalidades Implementadas
🔐 Autenticação e Controle de Acesso

Registro e login de usuários

Senhas protegidas com bcrypt

Autorização por perfis (Admin e Cliente)

Middleware de autenticação via JWT

📅 Gestão de Agendamentos

Criação de agendamentos com validação de disponibilidade

Consulta dos agendamentos do usuário

Cancelamento com auditoria

Rotas públicas para horários e informações do estabelecimento

💰 Módulo Financeiro

Registro de receitas e despesas

Filtros por tipo, categoria, mês e ano

Resumo financeiro mensal (receitas, despesas e lucro)

Relacionamento direto com o usuário administrador responsável

Estrutura pronta para integrar vendas e checkout

🗄️ Estrutura de Dados e Arquitetura

Banco PostgreSQL modelado com Prisma ORM

Relacionamentos normalizados

Arquitetura modular (Controllers → Services → Prisma)

Base preparada para:

Produtos e estoque

Tarifas dinâmicas

Vendas internas

Checkout unificado

🛠️ Tecnologias Utilizadas

Node.js

Express

PostgreSQL

Prisma ORM

JWT

Bcrypt

Insomnia

📦 Como Executar o Projeto Localmente
1️⃣ Clonar o repositório
git clone https://github.com/eiltonneto/sistema-agendamento-pagamento.git
cd sistema-agendamento-pagamento/backend

2️⃣ Instalar dependências
npm install

3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env contendo:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"

4️⃣ Rodar as migrações
npx prisma migrate dev

5️⃣ Iniciar o servidor
npm run dev


A API estará disponível em:

http://localhost:5000

📁 Estrutura do Projeto
backend/
│
├── database_backups/        # Backups do banco (exportados manualmente)
├── node_modules/            # Dependências do projeto
│
├── prisma/                  # Schemas e migrações do Prisma ORM
│   ├── schema.prisma
│   └── migrations/
│
├── src/                     # Código principal da aplicação
│   ├── controllers/         # Controladores das rotas
│   ├── database/            # Configuração do Prisma Client
│   ├── middlewares/         # Autenticação, autorização e validações
│   ├── routes/              # Definição das rotas da API
│   └── services/            # Regras de negócio
│
├── .env                     # Variáveis de ambiente (local)
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                # Arquivo principal da aplicação (ponto de entrada)
└── README.md                # Documentação do projeto

DiagramaFuncionalidade/      # Documentos e fluxos do sistema (PDFs, diagramas)
Modelo Físico/               # Modelo ER do banco de dados
LogoCDRJ.jpg                 # Logotipo do projeto


🗺️ Roadmap (Próximos Passos)

Controle de produtos e estoque

Tarifas dinâmicas por horário

Sistema de vendas internas

Checkout completo (agendamentos + produtos)

Dashboard administrativo

Integração com gateways de pagamento (Pix)

📝 Considerações Finais

Este projeto está sendo desenvolvido com foco em organização, escalabilidade e boas práticas de arquitetura backend.
A cada módulo implementado, novas habilidades e responsabilidades técnicas são consolidadas, fortalecendo a visão full-stack.