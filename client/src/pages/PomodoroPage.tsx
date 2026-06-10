import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { usePomodoro } from "../hooks/usePomodoro";
import { useSubjects } from "../hooks/useSubjects";
import { usePlanner } from "../hooks/usePlanner";

const PHASE_NAMES = {
  focus: "Foco",
  shortBreak: "Pausa Curta",
  longBreak: "Pausa Longa",
};

const TOTAL_DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const badgeColorMap: Record<string, string> = {
  indigo: "bg-zinc-900 text-white",
  sky: "bg-zinc-100 text-zinc-800",
  emerald: "bg-zinc-100 text-zinc-700",
  amber: "bg-stone-100 text-stone-800",
  rose: "bg-slate-100 text-slate-850",
  violet: "bg-zinc-200 text-zinc-900",
  orange: "bg-stone-100 text-stone-700",
  teal: "bg-slate-100 text-slate-700",
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroPage() {
  const {
    phase,
    timeLeft,
    isRunning,
    cycles,
    selectedSubject,
    setSelectedSubject,
    toggleTimer,
    resetTimer,
    skipPhase,
    setPhase,
  } = usePomodoro();

  const { subjects, isLoading: subjectsLoading } = useSubjects();
  const { getBlocksForDay } = usePlanner();
  const { setIsFocusMode } = useOutletContext<{ setIsFocusMode: (val: boolean) => void }>() || {};

  const [isManuallyFocused, setIsManuallyFocused] = useState(false);

  // Focus mode is active if focus timer is running OR if the user manually maximized
  const activeFocus = (phase === "focus" && isRunning) || isManuallyFocused;

  useEffect(() => {
    if (setIsFocusMode) {
      setIsFocusMode(activeFocus);
    }
    return () => {
      if (setIsFocusMode) {
        setIsFocusMode(false);
      }
    };
  }, [activeFocus, setIsFocusMode]);

  // Handle focus mode exit
  const handleExitFocus = () => {
    setIsManuallyFocused(false);
  };

  // SVG circular progress calculation
  const totalDuration = TOTAL_DURATIONS[phase];
  const progress = (timeLeft / totalDuration) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Retrieve today's scheduled planner blocks
  const todayDayOfWeek = new Date().getDay();
  const todayBlocks = getBlocksForDay(todayDayOfWeek);

  return (
    <div className={`min-h-full w-full font-sans antialiased transition-all duration-300 ${
      activeFocus 
        ? "bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col justify-center items-center px-4 text-white" 
        : "bg-surface text-gray-900 pb-24"
    }`}>
      {/* Header (hidden in focus) */}
      {!activeFocus && (
        <header className="max-w-md mx-auto w-full px-4 pt-6 pb-2 text-left">
          <span className="text-xs uppercase font-bold tracking-wide text-gray-400">Foco</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Pomodoro</h1>
        </header>
      )}

      {/* Container principal */}
      <main className={`w-full max-w-md mx-auto px-4 ${activeFocus ? "py-0 flex flex-col items-center justify-center" : "py-4 flex flex-col gap-6"}`}>
        
        {/* Card Principal do Timer */}
        <div className="bg-gradient-to-br from-zinc-900 to-black text-white rounded-2xl p-6 shadow-xl w-full flex flex-col items-center relative">
          
          {/* Topo do card */}
          <div className="w-full flex items-center justify-between gap-3 shrink-0">
            {/* Pill de seleção de matéria + fase */}
            <div className="relative inline-flex items-center bg-white/20 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-white/25 transition-all cursor-pointer">
              <span>
                {PHASE_NAMES[phase]} · {subjects.find(s => s.id === selectedSubject)?.name || "Selecionar"} ▾
              </span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={isRunning}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <option value="" className="bg-zinc-900 text-white">Selecionar Matéria</option>
                {!subjectsLoading && subjects.map((s) => (
                  <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão expandir/minimizar */}
            {activeFocus ? (
              <button
                onClick={handleExitFocus}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                title="Minimizar foco"
              >
                {/* Minimize icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3 3M15 9V4.5M15 9h4.5M15 9l6-6M9 15v4.5M9 15H4.5M9 15l-6 6M15 15v4.5M15 15h4.5M15 15l6 6" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setIsManuallyFocused(true)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                title="Expandir modo foco"
              >
                {/* Maximize icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                </svg>
              </button>
            )}
          </div>

          {/* Timer circular (centro) */}
          <div className="relative flex items-center justify-center my-7 transition-transform duration-500 shrink-0">
            <svg className="w-[220px] h-[220px] transform -rotate-90">
              {/* Círculo de fundo */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                strokeWidth="5"
                fill="transparent"
                className="stroke-white/20"
              />
              {/* Círculo de progresso */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-1000 ease-linear stroke-white"
              />
            </svg>
            
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-extrabold tracking-tight tabular-nums text-white">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[11px] text-white/70 mt-1.5 font-medium">
                ciclos hoje · {cycles}
              </span>
            </div>
          </div>

          {/* Controles (base) */}
          <div className="flex items-center gap-4 shrink-0 w-full justify-center">
            {/* Reiniciar */}
            <button
              onClick={resetTimer}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/25 transition-all cursor-pointer"
              title="Reiniciar timer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>

            {/* Iniciar/Pausar */}
            <button
              onClick={toggleTimer}
              disabled={(phase === "focus" && !selectedSubject && !isRunning) || subjects.length === 0}
              className="bg-white text-zinc-900 hover:bg-neutral-50 rounded-full px-8 py-3 font-bold shadow-md active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm shrink-0 min-w-[125px]"
            >
              {isRunning ? "⏸ Pausar" : "▶ Iniciar"}
            </button>

            {/* Pular fase */}
            <button
              onClick={skipPhase}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/25 transition-all cursor-pointer"
              title="Pular fase"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M13.25 5v10a.75.75 0 01-1.5 0V5a.75.75 0 011.5 0zM3.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L6.94 10 3.22 6.28a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </div>

          {/* Alerta de matéria ausente */}
          {!isRunning && phase === "focus" && !selectedSubject && subjects.length > 0 && (
            <p className="mt-4 text-[10px] bg-white/10 text-white/90 border border-white/10 px-4 py-2 rounded-xl text-center w-full font-semibold">
              Selecione uma matéria acima antes de iniciar o foco.
            </p>
          )}
        </div>

        {/* Elementos visíveis apenas fora do modo foco */}
        {!activeFocus && (
          <>
            {/* Tabs de fase */}
            <div className="bg-white border border-gray-200 rounded-xl p-1 flex justify-between gap-1 shadow-xs">
              {(["focus", "shortBreak", "longBreak"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPhase(p)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer flex-1 text-center ${
                    phase === p 
                      ? "bg-gray-100 text-gray-900 shadow-xs" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {PHASE_NAMES[p]}
                </button>
              ))}
            </div>

            {/* Seção de blocos planejados */}
            <div className="flex flex-col mt-2">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Blocos planejados</h3>
              <div className="flex flex-col gap-3">
                {todayBlocks.length === 0 ? (
                  <div className="bg-white border border-gray-150 rounded-xl py-8 px-4 text-center shadow-xs">
                    <p className="text-sm text-gray-400">Nenhum bloco planejado para hoje.</p>
                  </div>
                ) : (
                  todayBlocks.map((block) => {
                    const subjectColor = block.subject?.color || "indigo";
                    const badgeClasses = badgeColorMap[subjectColor] || badgeColorMap.indigo;
                    return (
                      <div
                        key={block.id}
                        className="bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3 flex items-center gap-3.5"
                      >
                        <div className={`rounded-lg px-2.5 py-1 text-xs font-bold shrink-0 ${badgeClasses}`}>
                          {block.durationMinutes}m
                        </div>
                        <div className="min-w-0 flex-grow">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {block.subject?.name}
                          </p>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">
                            {block.subject?.category || "Estudo"}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
