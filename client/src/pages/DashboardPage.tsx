import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { useActivities } from "../hooks/useActivities";
import { usePlanner } from "../hooks/usePlanner";
import { useSubjects } from "../hooks/useSubjects";

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "Bom dia";
  if (hr < 18) return "Boa tarde";
  return "Boa noite";
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
  }
> = {
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600", border: "border-indigo-200", borderL: "border-l-indigo-500", pillBg: "bg-indigo-50", pillText: "text-indigo-700", dot: "bg-indigo-500" },
  sky: { bg: "bg-sky-500", text: "text-sky-600", border: "border-sky-200", borderL: "border-l-sky-500", pillBg: "bg-sky-50", pillText: "text-sky-700", dot: "bg-sky-500" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-200", borderL: "border-l-emerald-500", pillBg: "bg-emerald-50", pillText: "text-emerald-700", dot: "bg-emerald-500" },
  amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-200", borderL: "border-l-amber-500", pillBg: "bg-amber-50", pillText: "text-amber-700", dot: "bg-amber-500" },
  rose: { bg: "bg-rose-500", text: "text-rose-600", border: "border-rose-200", borderL: "border-l-rose-500", pillBg: "bg-rose-50", pillText: "text-rose-700", dot: "bg-rose-500" },
  violet: { bg: "bg-violet-600", text: "text-violet-600", border: "border-violet-200", borderL: "border-l-violet-500", pillBg: "bg-violet-50", pillText: "text-violet-700", dot: "bg-violet-500" },
  orange: { bg: "bg-orange-500", text: "text-orange-600", border: "border-orange-200", borderL: "border-l-orange-500", pillBg: "bg-orange-50", pillText: "text-orange-700", dot: "bg-orange-500" },
  teal: { bg: "bg-teal-600", text: "text-teal-600", border: "border-teal-200", borderL: "border-l-teal-500", pillBg: "bg-teal-50", pillText: "text-teal-700", dot: "bg-teal-500" }
};

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data, isLoading: isDashboardLoading, error: dashboardError, refetch: refetchDashboard } = useDashboard();
  const { activities, toggleStatus, isLoading: isActivitiesLoading } = useActivities();
  const { blocks: plannerBlocks, isLoading: isPlannerLoading } = usePlanner();
  const { subjects } = useSubjects();

  // Filter states for activities card
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");

  const greeting = getGreeting();
  const firstName = data?.user?.name ? data.user.name.split(" ")[0] : "Estudante";

  // Loading summary state
  const isLoading = isDashboardLoading || isActivitiesLoading || isPlannerLoading;
  const error = dashboardError;

  // Sum of activities due today + planner blocks scheduled for today
  const activitiesTodayCount = data?.activitiesToday || 0;
  const plannerBlocksTodayCount = data?.plannerBlocksToday?.length || 0;
  const todaySum = activitiesTodayCount + plannerBlocksTodayCount;

  // Calculate total weekly hours focused
  const totalWeeklyMinutes = data?.weeklyMinutesBySubject?.reduce((sum, s) => sum + s.totalMinutes, 0) || 0;
  const totalWeeklyHours = (totalWeeklyMinutes / 60).toFixed(1);

  // Toggling an activity updates the KPIs
  const handleToggleActivity = async (activity: any) => {
    await toggleStatus(activity);
    refetchDashboard();
  };

  // Group planner blocks by day for the mini preview
  const minutesByDay = DAYS_CONFIG.map((d) => {
    const blocksForDay = plannerBlocks.filter((b) => b.dayOfWeek === d.dayNum);
    const totalMin = blocksForDay.reduce((sum, b) => sum + b.durationMinutes, 0);
    return {
      ...d,
      totalMinutes: totalMin,
      blocksCount: blocksForDay.length,
      blocks: blocksForDay,
    };
  });

  const maxDayMinutes = Math.max(...minutesByDay.map((d) => d.totalMinutes), 60);
  const todayDayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday...

  // Filter the list of activities
  const filteredActivities = activities.filter((act) => {
    const matchesSubject = subjectFilter === "all" || act.subjectId === subjectFilter;
    const matchesPriority = priorityFilter === "all" || act.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || act.status === statusFilter;
    return matchesSubject && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-transparent text-gray-900 font-sans w-full">
      {/* Header (Móvel apenas) */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-lg sticky top-0 z-10 lg:hidden px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">Lúmen</h1>
        </div>

        <button
          onClick={logout}
          className="px-3.5 py-1.5 rounded-xl bg-gray-150 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-all cursor-pointer"
        >
          Sair
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-md lg:max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-8 lg:py-8 space-y-6">
        
        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-6">
            <div className="animate-pulse space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded-xl" />
              <div className="h-4 w-36 bg-gray-150 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-28 bg-white border border-gray-200 rounded-2xl" />
                  <div className="h-28 bg-white border border-gray-200 rounded-2xl" />
                  <div className="h-28 bg-white border border-gray-200 rounded-2xl" />
                </div>
                <div className="h-60 bg-white border border-gray-200 rounded-2xl" />
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="h-44 bg-white border border-gray-200 rounded-2xl" />
                <div className="h-48 bg-white border border-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        )}

        {/* Erro */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-400/20 rounded-2xl px-5 py-4 text-red-700 text-sm text-center mb-6">
            {error}
          </div>
        )}

        {/* Dashboard carregado */}
        {!isLoading && !error && data && (
          <>
            {/* Boas-vindas (Desktop) */}
            <div className="hidden lg:block">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Visão geral dos seus estudos</p>
            </div>

            {/* Saudação (Mobile) */}
            <div className="lg:hidden">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {greeting}, {firstName} 👋
              </h2>
              <p className="text-xs text-gray-500 mt-1">Veja seu resumo de hoje</p>
            </div>

            {/* Faixa de KPIs (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Pending Tasks */}
              <Link
                to="/activities"
                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400 hover:scale-[1.01] transition-all duration-300 shadow-sm"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Em aberto
                </span>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="text-3xl font-black text-gray-900">{data.activitiesPending}</p>
                  <span className="text-xs text-gray-500 font-semibold">tarefas pendentes</span>
                </div>
              </Link>

              {/* 2. Today */}
              <Link
                to="/activities"
                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400 hover:scale-[1.01] transition-all duration-300 shadow-sm"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Tarefas e sessões
                </span>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="text-3xl font-black text-gray-900">{todaySum}</p>
                  <span className="text-xs text-gray-500 font-semibold">agendadas para hoje</span>
                </div>
              </Link>

              {/* 3. Hours this week */}
              <Link
                to="/pomodoro"
                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400 hover:scale-[1.01] transition-all duration-300 shadow-sm"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Estudo planejado
                </span>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="text-3xl font-black text-gray-900">{totalWeeklyHours} h</p>
                  <span className="text-xs text-gray-500 font-semibold">focadas esta semana</span>
                </div>
              </Link>
            </div>

            {/* Ações Rápidas (Grid 1x3 ou 3 colunas) */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Matérias", to: "/subjects", icon: "📚" },
                { label: "Planner", to: "/planner", icon: "📅" },
                { label: "Pomodoro", to: "/pomodoro", icon: "🍅" },
              ].map((act) => (
                <Link
                  key={act.to}
                  to={act.to}
                  className="bg-white border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/5 rounded-xl px-4 py-3 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <span className="text-base">{act.icon}</span>
                  <span className="text-xs font-bold text-gray-700">{act.label}</span>
                </Link>
              ))}
            </div>

            {/* Área principal em 2 colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* COLUNA ESQUERDA: Atividades */}
              <div className="lg:col-span-7">
                <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                  
                  {/* Header Seção */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Atividades</h3>
                      <p className="text-xs text-gray-400">Foco nas próximas entregas</p>
                    </div>
                    <Link
                      to="/activities?create=true"
                      className="text-xs bg-gray-900 text-white rounded-xl px-3 py-1.5 font-bold hover:bg-black transition-all shadow-xs"
                    >
                      + Nova tarefa
                    </Link>
                  </div>

                  {/* Chips de filtros no topo */}
                  {subjects.length > 0 && (
                    <div className="flex flex-col gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-150">
                      {/* Filtro Matéria */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Matéria:</span>
                        <button
                          type="button"
                          onClick={() => setSubjectFilter("all")}
                          className={`px-2 py-0.8 rounded-full text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                            subjectFilter === "all"
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
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
                              className={`px-2 py-0.8 rounded-full text-[10px] font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                                isSelected
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : dotColor}`} />
                              {sub.name}
                            </button>
                          );
                        })}
                      </div>

                      {/* Filtro Prioridade */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Prioridade:</span>
                        {["all", "Alta", "Média", "Baixa"].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPriorityFilter(p)}
                            className={`px-2 py-0.8 rounded-full text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                              priorityFilter === p
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {p === "all" ? "Todas" : p}
                          </button>
                        ))}
                      </div>

                      {/* Filtro Status */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Status:</span>
                        {[
                          { value: "all", label: "Todas" },
                          { value: "pending", label: "Pendentes" },
                          { value: "completed", label: "Concluídas" },
                        ].map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setStatusFilter(s.value)}
                            className={`px-2 py-0.8 rounded-full text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                              statusFilter === s.value
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Listagem */}
                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                      <p className="text-sm font-semibold text-gray-400">Nenhuma tarefa pendente!</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Use o botão acima para criar novos itens de estudos.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {filteredActivities.slice(0, 4).map((activity) => {
                        const subjectColor = activity.subject?.color || "indigo";
                        const colors = lightColorMap[subjectColor] || lightColorMap.indigo;
                        
                        // Urgência prazo
                        const isOverdue = activity.dueDate && new Date(activity.dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
                        const isToday = activity.dueDate && new Date(activity.dueDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0);

                        return (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between gap-3 p-3 bg-white border border-gray-100 hover:border-gray-200 rounded-xl shadow-xs transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Checkbox circular */}
                              <button
                                onClick={() => handleToggleActivity(activity)}
                                className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer group ${
                                  activity.status === "completed"
                                    ? "border-green-500 bg-green-500 text-white"
                                    : "border-gray-200 hover:border-indigo-600 bg-gray-50"
                                }`}
                                title={activity.status === "completed" ? "Desmarcar" : "Concluir"}
                              >
                                {activity.status === "completed" ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-indigo-500/25" />
                                )}
                              </button>
                              <div className="min-w-0 flex-1">
                                <p className={`text-sm font-bold truncate leading-tight ${
                                  activity.status === "completed" ? "line-through text-gray-400 font-medium" : "text-gray-900"
                                }`}>
                                  {activity.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[9px] font-bold ${colors.pillBg} ${colors.pillText}`}>
                                    {activity.subject?.name || "Sem Matéria"}
                                  </span>
                                  {activity.type && (
                                    <span className="text-[9px] font-bold text-gray-500 bg-gray-100 rounded-full px-2 py-0.2">
                                      {activity.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Prazo/Urgência alinhado à direita */}
                            {activity.dueDate && (
                              <div className="text-right shrink-0">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isOverdue
                                    ? "bg-red-50 text-red-700 border-red-150 animate-pulse"
                                    : isToday
                                    ? "bg-amber-50 text-amber-700 border-amber-150"
                                    : "bg-gray-50 text-gray-500 border-gray-100"
                                }`}>
                                  {isOverdue ? "⚠️ Atrasado" : isToday ? "⏰ Hoje" : new Date(activity.dueDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Ver todas footer link */}
                  {filteredActivities.length > 0 && (
                    <div className="text-center pt-2">
                      <Link
                        to="/activities"
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-bold uppercase tracking-wider"
                      >
                        Ver todas as atividades →
                      </Link>
                    </div>
                  )}
                </section>
              </div>

              {/* COLUNA DIREITA: Preview do Planner / Semana */}
              <div className="lg:col-span-5">
                <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                  
                  {/* Header Seção */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Semana</h3>
                      <p className="text-xs text-gray-400">Sessões agendadas por dia</p>
                    </div>
                    <Link
                      to="/planner"
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold uppercase tracking-wider"
                    >
                      Abrir
                    </Link>
                  </div>

                  {/* Grid Visual de 7 colunas */}
                  <div className="bg-gray-55/40 border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-end justify-between h-28 px-1.5 gap-2">
                      {minutesByDay.map((day) => {
                        const isTodayActive = day.dayNum === todayDayOfWeek;
                        
                        return (
                          <div key={day.dayNum} className="flex flex-col items-center gap-2 flex-1 group relative">
                            {/* Mini Tooltip on hover */}
                            <div className="absolute -top-7 bg-gray-900 text-[10px] text-white px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none font-bold">
                              {day.totalMinutes} min
                            </div>
                            
                            {/* Vertical Gauge with Stacked Subject Blocks */}
                            <div className={`w-3.5 h-20 rounded-full relative overflow-hidden transition-all duration-300 flex flex-col justify-end ${
                              isTodayActive
                                ? "bg-indigo-50 ring-2 ring-indigo-500/20"
                                : "bg-gray-100"
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
                            
                            {/* Day Letter */}
                            <span className={`text-[10px] font-bold ${
                              isTodayActive ? "text-indigo-600 scale-110 font-extrabold" : "text-gray-400"
                            }`}>
                              {day.letter}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legenda de matérias no rodapé */}
                  {subjects.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Matérias Ativas</p>
                      <div className="flex flex-wrap gap-2.5">
                        {subjects.map((sub) => {
                          const dotColor = lightColorMap[sub.color]?.dot || "bg-indigo-500";
                          return (
                            <div key={sub.id} className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
                              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                              {sub.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
