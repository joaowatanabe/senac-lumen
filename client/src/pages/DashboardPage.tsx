import { useAuth } from "../hooks/useAuth";
import BottomNavBar from "../components/BottomNavBar";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Lúmen
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-300 hidden sm:inline">
              Olá, <span className="text-white font-medium">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary-200 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-5xl mx-auto px-4 py-8 pb-24">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Bom dia, {user?.name?.split(" ")[0]} 👋
          </h2>
          <p className="mt-1 text-primary-300 text-sm">
            Aqui está o resumo dos seus estudos.
          </p>
        </div>

        {/* Cards placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card - Atividades pendentes */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-500/15 flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <span className="text-sm font-medium text-primary-300">
                Atividades pendentes
              </span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-xs text-primary-400 mt-1">
              Nenhuma atividade cadastrada ainda
            </p>
          </div>

          {/* Card - Horas estudadas */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center">
                <span className="text-xl">⏱️</span>
              </div>
              <span className="text-sm font-medium text-primary-300">
                Horas esta semana
              </span>
            </div>
            <p className="text-3xl font-bold text-white">0h</p>
            <p className="text-xs text-primary-400 mt-1">
              Comece uma sessão Pomodoro!
            </p>
          </div>

          {/* Card - Matérias */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <span className="text-sm font-medium text-primary-300">
                Matérias
              </span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-xs text-primary-400 mt-1">
              Cadastre suas matérias para começar
            </p>
          </div>
        </div>

        {/* Mensagem de boas-vindas */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
          <span className="text-4xl mb-3 block">🎉</span>
          <h3 className="text-lg font-semibold text-white mb-2">
            Conta criada com sucesso!
          </h3>
          <p className="text-primary-300 text-sm max-w-md mx-auto">
            Em breve você poderá cadastrar matérias, criar atividades, montar seu
            planner semanal e usar o timer Pomodoro.
          </p>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
