import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { colorMap } from "../components/SubjectCard";
import BottomNavBar from "../components/BottomNavBar";

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
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">Lúmen</h1>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary-200 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-xl mx-auto px-4 py-6 pb-24">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-6">
            {/* Header skeleton */}
            <div className="animate-pulse space-y-2">
              <div className="h-7 w-48 bg-white/10 rounded-lg" />
              <div className="h-4 w-36 bg-white/5 rounded-md" />
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
              <div className="h-5 w-32 bg-white/10 rounded-md" />
              <div className="h-20 bg-white/5 border border-white/5 rounded-2xl" />
            </div>

            <div className="animate-pulse space-y-4">
              <div className="h-5 w-40 bg-white/10 rounded-md" />
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
            <div>
              <h2 className="text-2xl font-bold text-white">
                {greeting}, {firstName} 👋
              </h2>
              <p className="mt-0.5 text-primary-300 text-sm">Veja seu resumo de hoje</p>
            </div>

            {/* Grid 2x2 de KPIs */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Card 1: Pendentes */}
              <Link
                to="/activities"
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📋</span>
                  <span className="text-xs font-semibold text-primary-200 uppercase tracking-wide">
                    Pendentes
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-2xl font-bold text-white">{data.activitiesPending}</p>
                  <p className="text-[10px] text-primary-400 font-medium">
                    {data.activitiesPending === 1 ? "atividade" : "atividades"}
                  </p>
                </div>
              </Link>

              {/* Card 2: Hoje */}
              <Link
                to="/activities"
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">✅</span>
                  <span className="text-xs font-semibold text-primary-200 uppercase tracking-wide">
                    Hoje
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-2xl font-bold text-white">{data.activitiesToday}</p>
                  <p className="text-[10px] text-primary-400 font-medium">
                    {data.activitiesToday === 1 ? "atividade" : "atividades"}
                  </p>
                </div>
              </Link>

              {/* Card 3: Pomodoro */}
              <Link
                to="/pomodoro"
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍅</span>
                  <span className="text-xs font-semibold text-primary-200 uppercase tracking-wide">
                    Pomodoro
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-2xl font-bold text-white">{data.pomodoroSessionsToday}</p>
                  <p className="text-[10px] text-primary-400 font-medium">
                    {data.pomodoroSessionsToday === 1 ? "ciclo hoje" : "ciclos hoje"}
                  </p>
                </div>
              </Link>

              {/* Card 4: Planejado */}
              <Link
                to="/planner"
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📅</span>
                  <span className="text-xs font-semibold text-primary-200 uppercase tracking-wide">
                    Planejado
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-2xl font-bold text-white">{totalPlannerMinutes}</p>
                  <p className="text-[10px] text-primary-400 font-medium">min hoje</p>
                </div>
              </Link>
            </div>

            {/* Hoje no Planner */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>📅</span> Hoje no Planner
              </h3>

              {data.plannerBlocksToday.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm font-medium text-white/50">
                    Nenhum bloco planejado para hoje.
                  </p>
                  <p className="text-xs text-primary-400 mt-1">
                    Aproveite para descansar ou adicione matérias ao seu planner.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.plannerBlocksToday.map((block) => {
                    const colors =
                      colorMap[block.color || "indigo"] || colorMap.indigo;
                    return (
                      <div
                        key={block.id}
                        className={`flex items-center gap-2.5 px-4.5 py-3 border rounded-xl ${colors.bg} ${colors.border}`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${colors.chip} shrink-0`} />
                        <span className={`text-sm font-medium ${colors.text} truncate flex-grow`}>
                          {block.subjectName}
                        </span>
                        <span className="text-xs text-white/40 font-semibold shrink-0">
                          {block.durationMinutes}min
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Progresso da Semana */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>📊</span> Progresso da Semana
              </h3>

              {data.weeklyMinutesBySubject.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm font-medium text-white/50">
                    Nenhuma sessão de foco registrada esta semana.
                  </p>
                  <p className="text-xs text-primary-400 mt-1">
                    Selecione uma matéria e inicie o timer Pomodoro para pontuar.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.weeklyMinutesBySubject.map((subj) => {
                    const colors = colorMap[subj.color] || colorMap.indigo;
                    const percent = (subj.totalMinutes / maxWeeklyMinutes) * 100;
                    return (
                      <div key={subj.subjectId} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{subj.subjectName}</span>
                          <span className="font-medium text-white/60">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-md shadow-primary-900/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full text-center"
              >
                Iniciar Pomodoro →
              </Link>
            </div>
          </div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}
