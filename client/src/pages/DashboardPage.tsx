import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { colorMap } from "../components/SubjectCard";

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "Bom dia";
  if (hr < 18) return "Boa tarde";
  return "Boa noite";
}

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data, isLoading, error } = useDashboard();

  const greeting = getGreeting();
  const firstName = data?.user?.name ? data.user.name.split(" ")[0] : "Estudante";

  // Calcular total planejado hoje
  const totalPlannerMinutes = data?.plannerBlocksToday?.reduce(
    (sum, b) => sum + b.durationMinutes,
    0
  ) || 0;

  // Encontrar o maior número de minutos semanais para escalar a barra de progresso
  const maxWeeklyMinutes = data?.weeklyMinutesBySubject
    ? Math.max(...data.weeklyMinutesBySubject.map((s) => s.totalMinutes), 1)
    : 1;

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
            className="px-4.5 py-2 rounded-xl bg-white/5 border border-white/10 text-primary-200 text-sm font-semibold hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
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

            {/* Grid 2x2 skeleton */}
            <div className="grid grid-cols-2 gap-4 animate-pulse">
              <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
              <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
              <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
              <div className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
            </div>

            {/* List sections skeleton */}
            <div className="animate-pulse space-y-4">
              <div className="h-5 w-32 bg-white/10 rounded-lg" />
              <div className="h-20 bg-white/5 border border-white/5 rounded-2xl" />
            </div>

            <div className="animate-pulse space-y-4">
              <div className="h-5 w-40 bg-white/10 rounded-lg" />
              <div className="h-24 bg-white/5 border border-white/5 rounded-2xl" />
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
          <div className="space-y-6">
            {/* Saudação */}
            <div className="space-y-0.5">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {greeting}, {firstName} 👋
              </h2>
              <p className="text-primary-300/80 text-sm font-medium">Veja seu resumo de hoje</p>
            </div>

            {/* Grid 2x2 de KPIs */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Card 1: Pendentes */}
              <Link
                to="/activities"
                className="bg-white/5 border border-white/10 rounded-2xl p-4.5 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] shadow-sm shadow-black/5"
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
                className="bg-white/5 border border-white/10 rounded-2xl p-4.5 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] shadow-sm shadow-black/5"
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
                className="bg-white/5 border border-white/10 rounded-2xl p-4.5 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] shadow-sm shadow-black/5"
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
                className="bg-white/5 border border-white/10 rounded-2xl p-4.5 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] shadow-sm shadow-black/5"
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

            {/* Gerenciar matérias card */}
            <Link
              to="/subjects"
              className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.01] transition-all duration-300 shadow-sm shadow-black/5 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                  <span className="text-lg">📚</span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white leading-tight">Gerenciar matérias</h4>
                  <p className="text-[11px] text-primary-300/70 truncate mt-0.5">Organize suas disciplinas e cores</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-400 shrink-0">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>

            {/* Hoje no Planner */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm shadow-black/5 space-y-4">
              <h3 className="text-xs font-bold text-primary-200 uppercase tracking-widest flex items-center gap-2">
                <span>📅</span> Hoje no Planner
              </h3>

              {data.plannerBlocksToday.length === 0 ? (
                <div className="text-center py-6 bg-white/[0.02] border border-white/5 rounded-xl px-4">
                  <p className="text-sm font-medium text-white/40">
                    Nenhum bloco planejado para hoje.
                  </p>
                  <p className="text-xs text-primary-400/70 mt-1 max-w-xs mx-auto">
                    Aproveite para descansar ou adicione matérias ao seu planner.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {data.plannerBlocksToday.map((block) => {
                    const colors =
                      colorMap[block.color || "indigo"] || colorMap.indigo;
                    return (
                      <div
                        key={block.id}
                        className={`flex items-center gap-3 px-4.5 py-3 border rounded-xl bg-white/5 ${colors.border}`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${colors.chip} shrink-0 ring-4 ring-white/10`} />
                        <span className="text-sm font-bold text-white truncate flex-grow">
                          {block.subjectName}
                        </span>
                        <span className="text-xs text-white/50 font-semibold shrink-0">
                          {block.durationMinutes}min
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Progresso da Semana */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm shadow-black/5 space-y-4">
              <h3 className="text-xs font-bold text-primary-200 uppercase tracking-widest flex items-center gap-2">
                <span>📊</span> Progresso da Semana
              </h3>

              {data.weeklyMinutesBySubject.length === 0 ? (
                <div className="text-center py-6 bg-white/[0.02] border border-white/5 rounded-xl px-4">
                  <p className="text-sm font-medium text-white/40">
                    Nenhuma sessão de foco registrada esta semana.
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
                      <div key={subj.subjectId} className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{subj.subjectName}</span>
                          <span className="font-semibold text-white/60">
                            {subj.totalMinutes} min
                          </span>
                        </div>
                        {/* Barra de progresso */}
                        <div className="w-full h-2.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
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

            {/* Botão de atalho */}
            <div className="flex justify-center pt-2">
              <Link
                to="/pomodoro"
                className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-md shadow-primary-950/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                Iniciar Pomodoro →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
