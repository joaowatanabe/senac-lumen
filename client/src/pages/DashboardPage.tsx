import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { useActivities } from "../hooks/useActivities";
import { usePlanner } from "../hooks/usePlanner";
import { colorMap } from "../components/SubjectCard";

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

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data, isLoading: isDashboardLoading, error: dashboardError, refetch: refetchDashboard } = useDashboard();
  const { pending: pendingActivities, toggleStatus, isLoading: isActivitiesLoading } = useActivities();
  const { blocks: plannerBlocks, isLoading: isPlannerLoading } = usePlanner();

  const greeting = getGreeting();
  const firstName = data?.user?.name ? data.user.name.split(" ")[0] : "Estudante";

  // Loading summary state
  const isLoading = isDashboardLoading || isActivitiesLoading || isPlannerLoading;
  const error = dashboardError;

  // Calcular total planejado hoje
  const totalPlannerMinutes = data?.plannerBlocksToday?.reduce(
    (sum, b) => sum + b.durationMinutes,
    0
  ) || 0;

  // Encontrar o maior número de minutos semanais para escalar a barra de progresso
  const maxWeeklyMinutes = data?.weeklyMinutesBySubject
    ? Math.max(...data.weeklyMinutesBySubject.map((s) => s.totalMinutes), 1)
    : 1;

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
    };
  });

  const maxDayMinutes = Math.max(...minutesByDay.map((d) => d.totalMinutes), 60);
  const todayDayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday...

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header (Móvel apenas) */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-10 lg:hidden">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">Lúmen</h1>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary-200 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-md lg:max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-8 lg:py-8">
        
        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-6">
            {/* Header skeleton */}
            <div className="animate-pulse space-y-2.5">
              <div className="h-8 w-48 bg-white/10 rounded-xl" />
              <div className="h-4 w-36 bg-white/5 rounded-lg" />
            </div>

            {/* Layout skeleton (Responsive columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column Skeleton */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 gap-4 animate-pulse">
                  <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
                  <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
                  <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
                  <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
                </div>
                <div className="h-60 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
              </div>

              {/* Right Column Skeleton */}
              <div className="lg:col-span-5 space-y-6">
                <div className="h-44 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
                <div className="h-48 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Erro */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-2xl px-5 py-4 text-red-300 text-sm text-center mb-6">
            {error}
          </div>
        )}

        {/* Dashboard carregado */}
        {!isLoading && !error && data && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* COLUNA ESQUERDA: Saudação, KPIs, Atividades */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Saudação */}
              <div className="space-y-0.5">
                <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                  {greeting}, {firstName} 👋
                </h2>
                <p className="text-primary-300/80 text-sm font-medium">Veja seu resumo de hoje</p>
              </div>

              {/* Grid 2x2 de KPIs */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Card 1: Pendentes */}
                <Link
                  to="/activities"
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.01] shadow-sm shadow-black/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📋</span>
                    <span className="text-[10px] font-bold text-primary-200 uppercase tracking-wider">
                      Pendentes
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white tracking-tight">{data.activitiesPending}</p>
                    <p className="text-[10px] text-primary-400 font-semibold mt-0.5">
                      {data.activitiesPending === 1 ? "atividade" : "atividades"}
                    </p>
                  </div>
                </Link>

                {/* Card 2: Hoje */}
                <Link
                  to="/activities"
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.01] shadow-sm shadow-black/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✅</span>
                    <span className="text-[10px] font-bold text-primary-200 uppercase tracking-wider">
                      Hoje
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white tracking-tight">{data.activitiesToday}</p>
                    <p className="text-[10px] text-primary-400 font-semibold mt-0.5">
                      {data.activitiesToday === 1 ? "atividade" : "atividades"}
                    </p>
                  </div>
                </Link>

                {/* Card 3: Pomodoro */}
                <Link
                  to="/pomodoro"
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.01] shadow-sm shadow-black/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🍅</span>
                    <span className="text-[10px] font-bold text-primary-200 uppercase tracking-wider">
                      Pomodoro
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white tracking-tight">{data.pomodoroSessionsToday}</p>
                    <p className="text-[10px] text-primary-400 font-semibold mt-0.5">
                      {data.pomodoroSessionsToday === 1 ? "ciclo hoje" : "ciclos hoje"}
                    </p>
                  </div>
                </Link>

                {/* Card 4: Planejado */}
                <Link
                  to="/planner"
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.01] shadow-sm shadow-black/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📅</span>
                    <span className="text-[10px] font-bold text-primary-200 uppercase tracking-wider">
                      Planejado
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white tracking-tight">{totalPlannerMinutes}</p>
                    <p className="text-[10px] text-primary-400 font-semibold mt-0.5">min hoje</p>
                  </div>
                </Link>
              </div>

              {/* Seção de Atividades Recentes (Checkable list) */}
              <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm shadow-black/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-primary-200 uppercase tracking-widest flex items-center gap-2">
                    <span>📋</span> Tarefas Recentes
                  </h3>
                  <Link
                    to="/activities"
                    className="text-xs text-primary-400 hover:text-primary-300 font-bold uppercase tracking-wider transition-colors"
                  >
                    Ver todas →
                  </Link>
                </div>

                {pendingActivities.length === 0 ? (
                  <div className="text-center py-8 bg-white/[0.02] border border-white/5 rounded-xl px-4">
                    <p className="text-sm font-medium text-white/40">Nenhuma tarefa pendente!</p>
                    <p className="text-xs text-primary-400/70 mt-1">
                      Tudo em dia ou comece criando uma nova tarefa.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {pendingActivities.slice(0, 4).map((activity) => {
                      const subjectColor = activity.subject?.color || "indigo";
                      const colors = colorMap[subjectColor] || colorMap.indigo;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between gap-3 p-3.5 bg-white/5 hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Checkbox */}
                            <button
                              onClick={() => handleToggleActivity(activity)}
                              className="w-5.5 h-5.5 rounded-full border border-white/25 hover:border-primary-400 flex items-center justify-center shrink-0 transition-colors cursor-pointer group"
                              title="Marcar como concluída"
                            >
                              <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-primary-500/30" />
                            </button>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{activity.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} border ${colors.border}`}>
                                  {activity.subject?.name || "Sem Matéria"}
                                </span>
                                {activity.dueDate && (
                                  <span className="text-[10px] text-primary-400 font-medium">
                                    Prazo: {new Date(activity.dueDate).toLocaleDateString("pt-BR")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            {/* COLUNA DIREITA: Preview do Planner, Progresso de Foco, Ações rápidas */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Mini Preview do Planner (Sua Semana) */}
              <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm shadow-black/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-primary-200 uppercase tracking-widest flex items-center gap-2">
                    <span>📅</span> Sua Semana (Planner)
                  </h3>
                  <Link
                    to="/planner"
                    className="text-xs text-primary-400 hover:text-primary-300 font-bold uppercase tracking-wider transition-colors"
                  >
                    Abrir Planner →
                  </Link>
                </div>

                {/* Grid Visual de 7 colunas verticais */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <div className="flex items-end justify-between h-24 px-1.5 gap-2">
                    {minutesByDay.map((day) => {
                      const isTodayActive = day.dayNum === todayDayOfWeek;
                      const fillPercent = Math.min((day.totalMinutes / maxDayMinutes) * 100, 100);
                      
                      return (
                        <div key={day.dayNum} className="flex flex-col items-center gap-2 flex-1 group">
                          {/* Mini Tooltip on hover */}
                          <div className="absolute -translate-y-8 bg-primary-950/90 text-[10px] text-white px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none font-bold">
                            {day.totalMinutes} min ({day.blocksCount} b)
                          </div>
                          
                          {/* Vertical Gauge */}
                          <div className={`w-3.5 h-16 rounded-full relative overflow-hidden transition-all duration-300 ${
                            isTodayActive
                              ? "bg-white/15 ring-2 ring-primary-500/50"
                              : "bg-white/5"
                          }`}>
                            <div
                              className={`w-full rounded-full absolute bottom-0 transition-all duration-500 ease-out ${
                                isTodayActive ? "bg-amber-400" : "bg-primary-500"
                              }`}
                              style={{ height: `${day.totalMinutes > 0 ? Math.max(fillPercent, 8) : 0}%` }}
                            />
                          </div>
                          
                          {/* Day Letter */}
                          <span className={`text-[10px] font-bold ${
                            isTodayActive ? "text-amber-400 scale-110 font-black" : "text-primary-400"
                          }`}>
                            {day.letter}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Progresso de Foco da Semana (Foco Semanal) */}
              <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm shadow-black/5 space-y-4">
                <h3 className="text-xs font-bold text-primary-200 uppercase tracking-widest flex items-center gap-2">
                  <span>📊</span> Foco da Semana (Minutos)
                </h3>

                {data.weeklyMinutesBySubject.length === 0 ? (
                  <div className="text-center py-6 bg-white/[0.02] border border-white/5 rounded-xl px-4">
                    <p className="text-sm font-medium text-white/40">
                      Nenhuma sessão de foco registrada.
                    </p>
                    <p className="text-xs text-primary-400/70 mt-1 max-w-xs mx-auto">
                      Selecione uma matéria e inicie o timer Pomodoro para pontuar.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.weeklyMinutesBySubject.map((subj) => {
                      const colors = colorMap[subj.color] || colorMap.indigo;
                      const percent = (subj.totalMinutes / maxWeeklyMinutes) * 100;
                      return (
                        <div key={subj.subjectId} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{subj.subjectName}</span>
                            <span className="font-semibold text-white/60">
                              {subj.totalMinutes} min
                            </span>
                          </div>
                          {/* Barra de progresso */}
                          <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${colors.chip} transition-all duration-500 ease-out`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Ações Rápidas */}
              <div className="space-y-3">
                {/* Gerenciar matérias card */}
                <Link
                  to="/subjects"
                  className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.01] transition-all duration-300 shadow-sm shadow-black/5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                      <span className="text-lg">📚</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white leading-tight">Gerenciar matérias</h4>
                      <p className="text-[11px] text-primary-300/70 truncate mt-0.5">Cadastre disciplinas e gerencie cores</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-400 group-hover:text-white shrink-0 transition-colors">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </Link>

                {/* Pomodoro quick link */}
                <Link
                  to="/pomodoro"
                  className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-md shadow-primary-950/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm"
                >
                  🍅 Iniciar Pomodoro
                </Link>
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}
