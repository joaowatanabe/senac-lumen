# Lúmen — Contexto do Projeto

> **Anexe este arquivo em toda sessão com IA para manter o contexto.**
> Projeto: João Vicente Watanabe | SENAC-RS | Dupla (2 alunos) | Maio/2026

---

## O que é o Lúmen

Aplicação **web mobile-first** para estudantes organizarem o tempo de estudo por matéria,
gerenciarem atividades acadêmicas e usarem o **timer Pomodoro** como foco central de produtividade.

**Público-alvo:** Estudantes do ensino médio, universitários e concurseiros.

**Problema resolvido:** Estudantes usam ferramentas desconexas (papel, alarme, planilha) sem
visibilidade do próprio progresso. O Lúmen centraliza planner, atividades e foco em um único lugar simples.

---

## Stack Tecnológica

| Camada         | Tecnologia                          |
|----------------|-------------------------------------|
| Front-end      | React + TypeScript + Tailwind CSS v4|
| Bundler        | Vite v8                             |
| Back-end       | Node.js + Express v5 + TypeScript   |
| Dev runner     | tsx (watch mode)                    |
| ORM            | Prisma v7 (prisma-client generator) |
| Driver adapter | @prisma/adapter-pg                  |
| Banco de dados | PostgreSQL (Postgres.app)           |
| Autenticação   | JWT (jsonwebtoken, expiração 7 dias)|
| Senhas         | bcryptjs (hash com salt 10)         |
| Workspaces     | pnpm workspaces                     |
| Roteamento     | react-router-dom v7                 |

---

## Estrutura do Projeto (atualizada)

```
senac-lumen/
├── client/                  ← React + TypeScript + Tailwind v4 (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── BottomNavBar.tsx       ← nav fixa inferior (4 abas)
│   │   │   ├── SubjectCard.tsx        ← card de matéria com chip colorido
│   │   │   └── SubjectModal.tsx       ← modal criar/editar matéria
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── SubjectsPage.tsx       ← CRUD de matérias
│   │   ├── hooks/
│   │   │   ├── useAuth.tsx            ← Context + hook de autenticação
│   │   │   └── useSubjects.ts         ← hook CRUD matérias
│   │   ├── services/
│   │   │   ├── api.ts                 ← fetch wrapper com JWT + suporte 204
│   │   │   ├── authService.ts         ← chamadas login/register
│   │   │   └── subjectService.ts      ← chamadas CRUD matérias
│   │   ├── types/
│   │   │   └── index.ts               ← tipos compartilhados
│   │   ├── App.tsx                    ← roteamento (BrowserRouter)
│   │   ├── main.tsx
│   │   └── index.css                  ← Tailwind v4 com @theme (indigo/amber)
│   ├── index.html
│   └── vite.config.ts                 ← plugins: react + tailwindcss
├── server/                  ← Express v5 + TypeScript + Prisma v7
│   ├── prisma/
│   │   ├── schema.prisma              ← 5 modelos
│   │   └── migrations/                ← migration "init" aplicada
│   ├── prisma.config.ts               ← config Prisma v7 (datasource via env)
│   ├── src/
│   │   ├── server.ts                  ← entry point Express (CORS, rotas)
│   │   ├── lib/
│   │   │   └── prisma.ts              ← singleton PrismaClient + adapter-pg
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── subjectRoutes.ts       ← CRUD matérias (autenticado)
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── subjectController.ts    ← list/create/update/delete + cascade
│   │   ├── middlewares/
│   │   │   └── auth.ts                ← middleware JWT (authenticateToken)
│   │   └── generated/prisma/          ← client gerado (não editar)
│   ├── .env                           ← DATABASE_URL, JWT_SECRET, PORT
│   └── tsconfig.json                  ← strict: true
├── context/
│   └── lumen-contexto.md              ← ESTE ARQUIVO
├── .env.example
├── package.json                       ← scripts: dev, dev:client, dev:server
└── pnpm-workspace.yaml                ← packages: client, server
```

---

## Escopo do Projeto (MVP)

### ✅ Módulos incluídos

| Módulo | Descrição |
|--------|-----------|
| **Autenticação** | Cadastro (nome, e-mail, senha) + Login/Logout com JWT |
| **Matérias** | CRUD de disciplinas com nome e cor (8 opções predefinidas) |
| **Atividades** | Lista de atividades vinculadas a uma matéria, com data opcional e status (Pendente/Concluída) |
| **Planner Semanal** | Grade simplificada dos 7 dias: alocar blocos de estudo por matéria e dia (sem horário preciso) |
| **Pomodoro** | Timer 25min foco + 5min pausa curta + 15min pausa longa, vinculado a uma matéria ativa |
| **Dashboard** | Resumo do dia: atividades pendentes, horas estudadas na semana por matéria |

### ❌ Fora do escopo (ideias futuras)

- Task Manager completo com prioridades, filtros avançados e alertas automáticos
- Calendário semanal interativo com blocos clicáveis por horário
- Módulo de concursos (metas, cronogramas, conteúdos específicos)
- Histórico detalhado de sessões
- Anotações em atividades
- Notificações push / App nativo / Integração com Google Calendar

---

## Requisitos Funcionais

| ID   | Requisito |
|------|-----------|
| RF01 | Cadastrar conta com nome, e-mail e senha |
| RF02 | Autenticar usuário via e-mail e senha (login/logout) |
| RF03 | CRUD de matérias com nome e cor |
| RF04 | Criar, editar, excluir e concluir atividades vinculadas a uma matéria |
| RF05 | Definir data de entrega opcional para atividades |
| RF06 | Visualizar atividades agrupadas por status (Pendente/Concluída) |
| RF07 | Criar blocos de estudo no planner por matéria e dia da semana |
| RF08 | Iniciar timer Pomodoro vinculado a uma matéria |
| RF09 | Registrar sessão Pomodoro concluída (tempo acumulado por matéria) |
| RF10 | Dashboard com: atividades pendentes, horas estudadas na semana por matéria |

## Requisitos Não Funcionais

| ID    | Requisito                                                                 | Categoria     |
|-------|---------------------------------------------------------------------------|---------------|
| RNF01 | Responsivo — mobile-first, funciona em Android/iOS via browser            | Portabilidade |
| RNF02 | Carrega a página principal em menos de 3 segundos                         | Desempenho    |
| RNF03 | Senhas armazenadas com bcrypt                                              | Segurança     |
| RNF04 | Autenticação via JWT com expiração de 7 dias                              | Segurança     |
| RNF05 | Interface intuitiva — novo usuário cria primeira atividade sem tutorial   | Usabilidade   |

---

## Personas

### Ana Luiza — Universitária Sobrecarregada
- **Perfil:** 20 anos, Administração 3º semestre, trabalha meio período
- **Dores:** Esquece prazos, não sabe por onde começar, ferramentas desconexas
- **Objetivo:** Ver o que precisa fazer hoje, acessível pelo celular
- **Frase:** *"Preciso de algo que me diga o que fazer hoje, sem precisar pensar muito."*

### Rafael — Concurseiro Disciplinado
- **Perfil:** 26 anos, estudo em tempo integral em casa
- **Dores:** Quer rastrear horas por disciplina, identificar onde está defasado
- **Objetivo:** Planejar blocos por matéria e ver progresso no dashboard
- **Frase:** *"Quero saber exatamente quanto tempo investi em cada disciplina esta semana."*

---

## Arquitetura de Telas (Mobile-First)

```
Bottom Navigation (4 abas):
  Dashboard | Atividades | Planner | Pomodoro

Rotas principais:
  /login        — Login com e-mail e senha
  /register     — Cadastro de conta
  /dashboard    — Resumo do dia (tela inicial pós-login)
  /activities   — Lista de atividades por status
  /planner      — Planner semanal por matéria
  /pomodoro     — Timer Pomodoro com seletor de matéria
  /subjects     — Gerenciamento de matérias
```

---

## Design Direction

- **Mobile-first** com responsividade para desktop (breakpoints Tailwind: sm/md/lg)
- **Estilo:** Limpo, moderno, sem excesso visual — foco em produtividade e legibilidade
- **Paleta:** Azul profundo/índigo (foco, confiança) + amarelo suave/âmbar (luz, progresso)
- **Sem bibliotecas de UI** — componentes construídos do zero com Tailwind
- **Componentes-chave:** SubjectBadge (chip colorido), ActivityCard, PlannerBlock,
  PomodoroTimer (SVG progress ring), DashboardProgressBar, BottomNavBar

---

## Notas Técnicas Importantes

> ⚠️ Consulte esta seção antes de fazer alterações no projeto.

### Prisma v7 — Driver Adapter obrigatório
O Prisma v7 **não aceita** `new PrismaClient()` sem opções. É obrigatório passar
um `adapter` ou `accelerateUrl`. Usamos `@prisma/adapter-pg`:
```ts
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
```

### tsx ao invés de ts-node-dev
`ts-node-dev` não é compatível com ESM (Prisma v7 gera `.ts` com ESM imports).
Usamos **tsx** com `tsx watch src/server.ts` para hot-reload.

### Tailwind CSS v4
Não usa `tailwind.config.ts`. A configuração é feita via `@theme {}` dentro de
`client/src/index.css`. As cores custom são `primary-*` (indigo) e `secondary-*` (amber).

### Autenticação
- JWT gerado com `jsonwebtoken`, expiração 7 dias
- Token armazenado em `localStorage` (chaves: `lumen_token`, `lumen_user`)
- `api.ts` injeta `Authorization: Bearer <token>` automaticamente em todas as requisições
- Middleware `authenticateToken` injeta `req.userId` nas rotas protegidas

### Delete com cascade
Ao deletar uma matéria, o controller usa `$transaction` para remover primeiro
todos os `pomodoroSessions`, `activities` e `plannerBlocks` vinculados.

### api.ts — suporte a 204 No Content
`apiFetch` trata respostas 204 (sem body) retornando `undefined`, evitando
erro de JSON parse em operações DELETE.

### Comandos úteis
```bash
pnpm dev              # client (5173) + server (3333) em paralelo
pnpm dev:client       # apenas Vite
pnpm dev:server       # apenas Express
npx prisma migrate dev --name <nome>   # nova migration (rodar dentro de server/)
npx prisma generate   # regenerar client (rodar dentro de server/)
```

---

## API Endpoints (implementados)

| Método | Rota                  | Auth | Descrição                              |
|--------|-----------------------|------|----------------------------------------|
| GET    | /health               | Não  | Health-check do servidor               |
| POST   | /api/auth/register    | Não  | Cadastro {name, email, password} → JWT |
| POST   | /api/auth/login       | Não  | Login {email, password} → JWT + user   |
| GET    | /api/subjects         | Sim  | Lista matérias do usuário              |
| POST   | /api/subjects         | Sim  | Cria matéria {name, color}             |
| PATCH  | /api/subjects/:id     | Sim  | Edita matéria (verifica ownership)     |
| DELETE | /api/subjects/:id     | Sim  | Deleta matéria + cascade (ownership)   |
| GET    | /api/activities       | Sim  | Lista atividades (query opcional)      |
| POST   | /api/activities       | Sim  | Cria atividade {title, subjectId...}   |
| PATCH  | /api/activities/:id   | Sim  | Edita atividade / marca como concluída |
| DELETE | /api/activities/:id   | Sim  | Deleta atividade                       |
| POST   | /api/pomodoro/sessions| Sim  | Registra sessão {subjectId, duration}  |
| GET    | /api/pomodoro/today   | Sim  | Retorna sessões de hoje                |

---

## Schema Prisma (referência — migration "init" aplicada)

```prisma
model User {
  id               String            @id @default(uuid())
  name             String
  email            String            @unique
  passwordHash     String
  createdAt        DateTime          @default(now())
  subjects         Subject[]
  activities       Activity[]
  plannerBlocks    PlannerBlock[]
  pomodoroSessions PomodoroSession[]
}

model Subject {
  id               String            @id @default(uuid())
  name             String
  color            String
  userId           String
  user             User              @relation(fields: [userId], references: [id])
  createdAt        DateTime          @default(now())
  activities       Activity[]
  plannerBlocks    PlannerBlock[]
  pomodoroSessions PomodoroSession[]
}

model Activity {
  id        String    @id @default(uuid())
  title     String
  dueDate   DateTime?
  status    String    @default("pending")
  subjectId String
  userId    String
  subject   Subject   @relation(fields: [subjectId], references: [id])
  user      User      @relation(fields: [userId], references: [id])
  createdAt DateTime  @default(now())
}

model PlannerBlock {
  id              String  @id @default(uuid())
  dayOfWeek       Int
  durationMinutes Int
  subjectId       String
  userId          String
  subject         Subject @relation(fields: [subjectId], references: [id])
  user            User    @relation(fields: [userId], references: [id])
}

model PomodoroSession {
  id              String   @id @default(uuid())
  durationMinutes Int
  completedAt     DateTime @default(now())
  subjectId       String
  userId          String
  subject         Subject  @relation(fields: [subjectId], references: [id])
  user            User     @relation(fields: [userId], references: [id])
}
```

---

## Entregáveis por Fase

### Fase 1 — Engenharia de Software ✅ concluída
- [x] Levantamento de Requisitos (RF e RNF)
- [x] Personas
- [x] Casos de Uso (UML)
- [x] Backlog com Histórias de Usuário e Critérios de Aceitação

### Fase 2 — Programação Web (em andamento)
- [ ] Wireframes/protótipos (Figma)
- [x] Setup do projeto (Vite + React + Express + Prisma + pnpm workspaces)
- [x] Schema Prisma (5 modelos) + migration inicial aplicada
- [x] Autenticação completa (register/login/JWT/middleware/bcrypt)
- [x] Front-end auth (login, register, dashboard placeholder, rotas protegidas)
- [x] CRUD de Matérias (back-end + front-end + cascade delete)
- [x] BottomNavBar com 4 abas (Dashboard, Matérias, Planner, Pomodoro)
- [x] CRUD de Atividades (back-end + front-end)
- [ ] Planner Semanal (back-end + front-end)
- [x] Pomodoro Timer (back-end + front-end)
- [ ] Dashboard com dados reais

### Fase 3 — Mobile
- [x] BottomNavBar mobile-first com 4 abas fixas
- [ ] Adaptações de UX para touch (targets mínimos 44px)

---

## Glossário Rápido

| Termo | Significado no projeto |
|-------|------------------------|
| Matéria | Disciplina de estudo (ex: Matemática) com nome e cor |
| Atividade | Tarefa acadêmica vinculada a uma matéria |
| Bloco Planner | Alocação de tempo de estudo para uma matéria em um dia da semana |
| Sessão Pomodoro | Ciclo de 25min de foco vinculado a uma matéria |
| Dashboard | Tela inicial com resumo do dia e progresso semanal |
