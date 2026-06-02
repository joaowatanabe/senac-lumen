function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Logo / Ícone */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-500/20 backdrop-blur-sm border border-primary-400/30">
          <span className="text-4xl">💡</span>
        </div>

        {/* Título */}
        <div>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Lúmen
          </h1>
          <p className="mt-2 text-primary-200 text-lg">
            Seu planner de estudos com Pomodoro
          </p>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-400/30 text-secondary-300 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Setup completo — pronto para desenvolvimento
        </div>

        {/* Stack info */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Express', 'Prisma', 'PostgreSQL'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-primary-100 text-xs font-medium backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
