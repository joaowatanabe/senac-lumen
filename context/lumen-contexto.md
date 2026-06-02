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

| Camada        | Tecnologia                          |
|---------------|-------------------------------------|
| Front-end     | React + TypeScript + Tailwind CSS   |
| Bundler       | Vite                                |
| Back-end      | Node.js + Express + TypeScript      |
| ORM           | Prisma                              |
| Banco de dados| PostgreSQL                          |
| Autenticação  | JWT (expiração 7 dias)              |
| Senhas        | bcrypt hash                         |
| Workspaces    | pnpm workspaces                     |

---

## Estrutura do Projeto

```
lumen/
├── client/           ← React + TypeScript + Tailwind (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/   ← chamadas à API (fetch)
│   │   └── types/      ← tipos TypeScript compartilhados
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.config.ts
├── server/           ← Express + TypeScript + Prisma
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── prisma/
│   └── tsconfig.json
├── .env.example
└── package.json
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

## Schema Prisma (referência)

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
- [ ] Setup do projeto (Vite + React + Express + Prisma)
- [ ] Desenvolvimento front-end (React + Tailwind)
- [ ] Desenvolvimento back-end (Express + Prisma + PostgreSQL)

### Fase 3 — Mobile
- [ ] Layout responsivo mobile-first com bottom navigation
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
