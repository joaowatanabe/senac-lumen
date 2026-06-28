import { useState } from "react";
import { Link } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { useActivities } from "../hooks/useActivities";
import { usePlanner } from "../hooks/usePlanner";
import { useSubjects } from "../hooks/useSubjects";
import { useTheme } from "../hooks/useTheme";

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "Bom dia";
  if (hr < 18) return "Boa tarde";
  return "Boa noite";
}

function getDailyTip(hour: number, pendingCount: number, plannedBlocksCount: number) {
  if (pendingCount === 0 && plannedBlocksCount === 0) {
    return "Seu planejamento está em dia. Aproveite para revisar conteúdos leves ou descansar um pouco.";
  }

  if (hour < 12) {
    return "Comece pelo item mais importante do dia e use um bloco de foco curto para ganhar impulso.";
  }

  if (hour < 18) {
    return "A melhor hora para seguir é organizar a próxima tarefa e finalizar uma entrega sem distrações.";
  }

  return "O fim do dia é ótimo para revisar o que ficou pendente e fechar o que ainda falta.";
}

const DAYS_CONFIG = [
  { dayNum: 1, label: "Seg", letter: "S" },
  { dayNum: 2, label: "Ter", letter: "T" },
  { dayNum: 3, label: "Qua", letter: "Q" },
  { dayNum: 4, label: "Qui", letter: "Q" },
  { dayNum: 5, label: "Sex", letter: "S" },
  { dayNum: 6, label: "Sáb", letter: "S" },
  { dayNum: 0, label: "Dom", letter: "D" },
];

const lightColorMap: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    borderL: string;
    pillBg: string;
    pillText: string;
    dot: string;
    solidBg: string;
  }
> = {
  indigo:  { bg: "bg-zinc-950",  text: "text-zinc-950",  border: "border-zinc-300",   borderL: "border-l-zinc-950",   pillBg: "bg-zinc-100",      pillText: "text-zinc-900",       dot: "bg-zinc-950",  solidBg: "bg-zinc-950" },
  sky:     { bg: "bg-zinc-800",  text: "text-zinc-800",  border: "border-zinc-250",   borderL: "border-l-zinc-800",   pillBg: "bg-zinc-50",       pillText: "text-zinc-800",       dot: "bg-zinc-700",  solidBg: "bg-zinc-800" },
  emerald: { bg: "bg-zinc-600",  text: "text-zinc-650",  border: "border-zinc-200",   borderL: "border-l-zinc-600",   pillBg: "bg-zinc-50/50",    pillText: "text-zinc-700",       dot: "bg-zinc-500",  solidBg: "bg-zinc-600" },
  amber:   { bg: "bg-stone-850", text: "text-stone-850", border: "border-stone-250",  borderL: "border-l-stone-850",  pillBg: "bg-stone-100/50",  pillText: "text-stone-800",      dot: "bg-stone-700", solidBg: "bg-stone-850" },
  rose:    { bg: "bg-slate-850", text: "text-slate-850", border: "border-slate-250",  borderL: "border-l-slate-850",  pillBg: "bg-slate-100/50",  pillText: "text-slate-800",      dot: "bg-slate-700", solidBg: "bg-slate-850" },
  violet:  { bg: "bg-zinc-900",  text: "text-zinc-900",  border: "border-zinc-300",   borderL: "border-l-zinc-900",   pillBg: "bg-zinc-200/50",   pillText: "text-zinc-900",       dot: "bg-zinc-800",  solidBg: "bg-zinc-900" },
  orange:  { bg: "bg-stone-600", text: "text-stone-650", border: "border-stone-200",  borderL: "border-l-stone-600",  pillBg: "bg-stone-50/50",   pillText: "text-stone-700",      dot: "bg-stone-500", solidBg: "bg-stone-600" },
  teal:    { bg: "bg-slate-600", text: "text-slate-650", border: "border-slate-200",  borderL: "border-l-slate-600",  pillBg: "bg-slate-50/50",   pillText: "text-slate-700",      dot: "bg-slate-500", solidBg: "bg-slate-600" },
};

// ─── KPI Card ──────────────────────────────────────────────────────
function KPICard({
  label,
  value,
  suffix,
  sublabel,
  accent,
  to,
  iconCode,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  sublabel?: string;
  accent?: "default" | "red" | "green" | "orange";
  to?: string;
  iconCode?: string;
}) {
  const bgMap = {
    default: "bg-white",
    red: "bg-red-50",
    green: "bg-green-50",
    orange: "bg-orange-50",
  };
  const iconBgMap = {
    default: "bg-gray-100 text-gray-500",
    red: "bg-red-100 text-red-500",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-500",
  };
  const bg = bgMap[accent || "default"];
  const iconBg = iconBgMap[accent || "default"];

  const content = (
    <div className={`${bg} border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${iconBg}`}>
          {iconCode || (accent === "red" ? "⚠" : accent === "green" ? "✓" : accent === "orange" ? "⏱" : "📋")}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">
          {value}{suffix && <span className="text-xl ml-1">{suffix}</span>}
        </p>
        {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
      </div>
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return content;
}

// ─── Subject Badge ─────────────────────────────────────────────────
function SubjectBadge({ name, color }: { name: string; color: string }) {
  const c = lightColorMap[color] || lightColorMap.indigo;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${c.pillBg} ${c.pillText}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {name}
    </span>
  );
}

// ─── Priority Badge ────────────────────────────────────────────────
function PriorityBadge({ priority }: { priority?: string | null }) {
  if (!priority) return null;
  const styles: Record<string, string> = {
    Alta: "bg-red-50 text-red-500",
    Média: "bg-blue-50 text-blue-500",
    Baixa: "bg-green-50 text-green-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[priority] || "bg-gray-100 text-gray-500"}`}>
      {priority}
    </span>
  );
}

// Theme toggle button
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-gray-200 bg-white hover:bg-gray-50 transition"
      title={theme === "dark" ? "Desativar modo escuro" : "Ativar modo escuro"}
    >
      {theme === "dark" ? "🌙 Escuro" : "☀️ Claro"}
    </button>
  );
}

// ─── Deadline Badge ────────────────────────────────────────────────
function DeadlineBadge({ dueDate, isDone }: { dueDate?: string | null; isDone?: boolean }) {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let className = "bg-gray-100 text-gray-500";
  let label = due.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

  if (!isDone) {
    if (diffDays < 0) {
      className = "bg-red-50 text-red-500";
      label = "⏰ Atrasado";
    } else if (diffDays <= 2) {
      className = "bg-orange-50 text-orange-500";
      label = `Urgente · ${label}`;
    }
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${className}`}>
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const { data, isLoading: isDashboardLoading, error: dashboardError, refetch: refetchDashboard } = useDashboard();
  const { activities, toggleStatus, isLoading: isActivitiesLoading } = useActivities();
  const { blocks: plannerBlocks, isLoading: isPlannerLoading } = usePlanner();
  const { subjects } = useSubjects();

  const [subjectFilter, setSubjectFilter] = useState("all");
  const [priorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");

  const greeting = getGreeting();
  const firstName = data?.user?.name ? data.user.name.split(" ")[0] : "Estudante";

  const isLoading = isDashboardLoading || isActivitiesLoading || isPlannerLoading;
  const error = dashboardError;

  const activitiesTodayCount = data?.activitiesToday || 0;
  const plannerBlocksTodayCount = data?.plannerBlocksToday?.length || 0;
  const todaySum = activitiesTodayCount + plannerBlocksTodayCount;

  const totalWeeklyMinutes = data?.weeklyMinutesBySubject?.reduce((sum, s) => sum + s.totalMinutes, 0) || 0;
  const totalWeeklyHours = (totalWeeklyMinutes / 60).toFixed(1);
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayPendingTasks = activities.filter(
    (act) => act.status === "pending" && act.dueDate && act.dueDate.startsWith(todayKey)
  );
  const completedTasksCount = activities.filter((act) => act.status === "completed").length;
  const progressPercent = activities.length > 0 ? Math.round((completedTasksCount / activities.length) * 100) : 0;
  const todayPlannedBlocks = plannerBlocks.filter((block) => block.dayOfWeek === todayDayOfWeek);
  const nextDeadlineTask = [...activities]
    .filter((act) => act.status === "pending" && act.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0];
  const upcomingTasks = [...activities]
    .filter((act) => act.status === "pending" && act.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 3);
  const dailyTip = getDailyTip(new Date().getHours(), todayPendingTasks.length, todayPlannedBlocks.length);
  const summaryLabel = todayPendingTasks.length > 0 || todayPlannedBlocks.length > 0
    ? `Hoje você tem ${todayPendingTasks.length} tarefa${todayPendingTasks.length === 1 ? "" : "s"} para entregar e ${todayPlannedBlocks.length} bloco${todayPlannedBlocks.length === 1 ? "" : "s"} de estudo planejado${todayPlannedBlocks.length === 1 ? "" : "s"}.`
    : "Seu dia está livre até o momento. Aproveite para revisar ou descansar sem culpa.";

  const handleToggleActivity = async (activity: any) => {
    await toggleStatus(activity);
    refetchDashboard();
  };

  const minutesByDay = DAYS_CONFIG.map((d) => {
    const blocksForDay = plannerBlocks.filter((b) => b.dayOfWeek === d.dayNum);
    const totalMin = blocksForDay.reduce((sum, b) => sum + b.durationMinutes, 0);
    return { ...d, totalMinutes: totalMin, blocksCount: blocksForDay.length, blocks: blocksForDay };
  });

  const maxDayMinutes = Math.max(...minutesByDay.map((d) => d.totalMinutes), 60);
  const todayDayOfWeek = new Date().getDay();

  const filteredActivities = activities.filter((act) => {
    const matchesSubject = subjectFilter === "all" || act.subjectId === subjectFilter;
    const matchesPriority = priorityFilter === "all" || act.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || act.status === statusFilter;
    return matchesSubject && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-full bg-surface font-sans w-full">
      {/* Mobile header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 lg:hidden px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-900">Dashboard</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-8 space-y-6">

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 bg-white border border-gray-100 rounded-xl" />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 h-64 bg-white border border-gray-100 rounded-xl" />
              <div className="lg:col-span-5 h-64 bg-white border border-gray-100 rounded-xl" />
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {/* Dashboard content */}
        {!isLoading && !error && data && (
          <>
            {/* Welcome hero card */}
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                      </svg>
                      Foco principal
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {greeting}, {firstName}!
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Você tem <span className="font-semibold text-gray-700">{data.activitiesPending} tarefas</span> pendentes e{" "}
                    <span className="font-semibold text-gray-700">{todaySum} itens</span> para hoje.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <Link
                      to="/activities"
                      className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Ver tarefas →
                    </Link>
                    <Link
                      to="/planner"
                      className="px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-all duration-200"
                    >
                      Abrir calendário
                    </Link>
                    <ThemeToggle />
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:items-end lg:min-w-48">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Progresso da semana</p>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{totalWeeklyHours}</p>
                        <p className="text-[10px] text-gray-500">horas planejadas</p>
                      </div>
                      <div className="flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Pendentes</span>
                          <span className="font-semibold text-gray-700">{data.activitiesPending}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Hoje</span>
                          <span className="font-semibold text-gray-700">{todaySum}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Blocos</span>
                          <span className="font-semibold text-gray-700">{plannerBlocks.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo rápido */}
            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4">
              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🗓️</span>
                  <p className="text-sm font-semibold text-gray-900">Resumo do dia</p>
                </div>
                <p className="text-sm text-gray-700">{summaryLabel}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {nextDeadlineTask
                    ? `Próxima entrega: ${nextDeadlineTask.title}`
                    : "Nenhuma entrega próxima no momento."}
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💡</span>
                  <p className="text-sm font-semibold text-gray-900">Dica do dia</p>
                </div>
                <p className="text-sm text-gray-700">{dailyTip}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">Progresso do seu dia</p>
                  <span className="text-sm font-semibold text-primary">{progressPercent}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {completedTasksCount} de {activities.length} tarefas concluídas
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">Próximos prazos</p>
                <div className="mt-3 space-y-2">
                  {upcomingTasks.length > 0 ? (
                    upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate pr-2">{task.title}</span>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(task.dueDate!).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Nenhuma entrega próxima no momento.</p>
                  )}
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <KPICard
                label="Tarefas pendentes"
                value={data.activitiesPending}
                sublabel="em aberto"
                accent="default"
                to="/activities"
              />
              <KPICard
                label="Para hoje"
                value={todaySum}
                sublabel="itens agendados"
                accent="orange"
                to="/activities"
              />
              <KPICard
                label="Cards para revisar"
                value={data.flashcardsDueToday > 0 ? data.flashcardsDueToday : "Tudo em dia"}
                sublabel={data.flashcardsDueToday > 0 ? "revisões pendentes" : "nenhum card pendente"}
                accent={data.flashcardsDueToday > 0 ? "orange" : "green"}
                to="/flashcards"
                iconCode="🗂"
              />
              <KPICard
                label="Horas planejadas"
                value={totalWeeklyHours}
                suffix="h"
                sublabel="esta semana"
                accent="green"
                to="/planner"
              />
              <KPICard
                label="Matérias ativas"
                value={subjects.length}
                sublabel="disciplinas"
                accent="default"
                to="/subjects"
              />
            </div>

            

            {/* Main 2-column area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* LEFT: Activities */}
              <div className="lg:col-span-7">
                <section className="bg-white border border-[#EEEEEF] rounded-xl shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Tarefas urgentes</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Foco nas próximas entregas</p>
                    </div>
                    <Link
                      to="/activities"
                      className="text-xs text-primary hover:text-primary-hover font-medium"
                    >
                      Ver todas →
                    </Link>
                  </div>

                  {/* Filters */}
                  {subjects.length > 0 && (
                    <div className="px-5 py-3 border-b border-gray-50 space-y-2">
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide shrink-0">Matéria:</span>
                        <button
                          type="button"
                          onClick={() => setSubjectFilter("all")}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                            subjectFilter === "all"
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          Todas
                        </button>
                        {subjects.map((sub) => {
                          const isSelected = subjectFilter === sub.id;
                          const dotColor = lightColorMap[sub.color]?.dot || "bg-indigo-500";
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => setSubjectFilter(sub.id)}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                                isSelected
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : dotColor}`} />
                              {sub.name}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide shrink-0">Status:</span>
                        {[
                          { value: "all", label: "Todas" },
                          { value: "pending", label: "Pendentes" },
                          { value: "completed", label: "Concluídas" },
                        ].map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setStatusFilter(s.value)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                              statusFilter === s.value
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activities list */}
                  <div className="divide-y divide-gray-50">
                    {filteredActivities.length === 0 ? (
                      <div className="text-center py-10 px-5">
                        <p className="text-sm text-gray-400">Nenhuma tarefa encontrada.</p>
                        <p className="text-xs text-gray-400 mt-1">Use o botão "Nova tarefa" para criar.</p>
                      </div>
                    ) : (
                      filteredActivities.slice(0, 5).map((activity) => {
                        const isDone = activity.status === "completed";

                        return (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Checkbox */}
                              <button
                                onClick={() => handleToggleActivity(activity)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                  isDone
                                    ? "border-green-500 bg-green-500 text-white"
                                    : "border-gray-200 hover:border-primary bg-white"
                                }`}
                                title={isDone ? "Desmarcar" : "Concluir"}
                              >
                                {isDone && (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </button>
                              <div className="min-w-0 flex-1">
                                <p className={`text-sm font-medium truncate ${isDone ? "line-through text-gray-400" : "text-gray-900"}`}>
                                  {activity.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                  {activity.subject && (
                                    <SubjectBadge name={activity.subject.name} color={activity.subject.color || "indigo"} />
                                  )}
                                  {activity.type && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                                      {activity.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <PriorityBadge priority={activity.priority} />
                              <DeadlineBadge dueDate={activity.dueDate} isDone={isDone} />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {filteredActivities.length > 5 && (
                    <div className="px-5 py-3 border-t border-gray-50">
                      <Link to="/activities" className="text-xs text-primary hover:text-primary-hover font-medium">
                        Ver todas as {filteredActivities.length} tarefas →
                      </Link>
                    </div>
                  )}
                </section>
              </div>

              {/* RIGHT: Weekly planner preview */}
              <div className="lg:col-span-5 space-y-4">
                <section className="bg-white border border-border rounded-xl shadow-sm">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Semana de estudo</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Sessões agendadas por dia</p>
                    </div>
                    <Link to="/planner" className="text-xs text-primary hover:text-primary-hover font-medium">
                      Abrir →
                    </Link>
                  </div>

                  <div className="p-5">
                    <div className="flex items-end justify-between h-28 gap-2">
                      {minutesByDay.map((day) => {
                        const isTodayActive = day.dayNum === todayDayOfWeek;
                        return (
                          <div key={day.dayNum} className="flex flex-col items-center gap-2 flex-1 group relative">
                            <div className="absolute -top-7 bg-gray-900 text-[10px] text-white px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none font-medium">
                              {day.totalMinutes} min
                            </div>
                            <div className={`w-4 h-20 rounded-full relative overflow-hidden transition-all duration-300 flex flex-col justify-end ${
                              isTodayActive ? "bg-primary-light ring-2 ring-primary/20" : "bg-gray-100"
                            }`}>
                              {day.blocks.map((block, idx) => {
                                const subjectColor = block.subject?.color || "indigo";
                                const colors = lightColorMap[subjectColor] || lightColorMap.indigo;
                                const blockPercent = (block.durationMinutes / maxDayMinutes) * 100;
                                return (
                                  <div
                                    key={block.id || idx}
                                    className={`w-full ${colors.bg} border-t border-white/20`}
                                    style={{ height: `${Math.max(blockPercent, 8)}%` }}
                                    title={`${block.subject?.name || "Sem Matéria"}: ${block.durationMinutes} min`}
                                  />
                                );
                              })}
                            </div>
                            <span className={`text-[10px] font-medium ${isTodayActive ? "text-primary font-bold" : "text-gray-400"}`}>
                              {day.letter}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {subjects.length > 0 && (
                    <div className="px-5 pb-5 border-t border-gray-50 pt-3">
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-2">Matérias</p>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((sub) => (
                          <SubjectBadge key={sub.id} name={sub.name} color={sub.color || "indigo"} />
                        ))}
                      </div>
                    </div>
                  )}
                </section>

                {/* Progress by subject */}
                {subjects.length > 0 && (
                  <section className="bg-white border border-border rounded-xl shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Progresso por disciplina</h3>
                    <div className="space-y-3">
                      {subjects.slice(0, 4).map((sub) => {
                        const weekData = data.weeklyMinutesBySubject?.find((w: any) => w.subjectId === sub.id);
                        const totalMin = weekData?.totalMinutes || 0;
                        const plannedMin = plannerBlocks.filter(b => b.subjectId === sub.id).reduce((s, b) => s + b.durationMinutes, 0);
                        const pct = plannedMin > 0 ? Math.min(100, Math.round((totalMin / plannedMin) * 100)) : 0;
                        const c = lightColorMap[sub.color] || lightColorMap.indigo;
                        return (
                          <div key={sub.id}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                                <span className="text-xs font-medium text-gray-700 truncate max-w-32">{sub.name}</span>
                              </div>
                              <span className="text-xs text-gray-500">{totalMin}min</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${c.bg} rounded-full transition-all duration-500`}
                                style={{ width: `${Math.max(pct, 0)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
