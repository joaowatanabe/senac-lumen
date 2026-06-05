import { useState, useEffect } from "react";
import { usePomodoro } from "../hooks/usePomodoro";
import { useSubjects } from "../hooks/useSubjects";
import BottomNavBar from "../components/BottomNavBar";

const PHASE_NAMES = {
  focus: "Foco",
  shortBreak: "Pausa Curta",
  longBreak: "Pausa Longa",
};

const PHASE_COLORS = {
  focus: "stroke-indigo-400 text-indigo-400",
  shortBreak: "stroke-emerald-400 text-emerald-400",
  longBreak: "stroke-sky-400 text-sky-400",
};

const TOTAL_DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
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

  // Esconder nav se estiver em foco E rodando
  const isFocusMode = phase === "focus" && isRunning;

  // Calculo do progresso para o anel SVG
  const totalDuration = TOTAL_DURATIONS[phase];
  const progress = (timeLeft / totalDuration) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col justify-center ${
      isFocusMode 
        ? "bg-black" 
        : "bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800"
    }`}>
      
      <main className="w-full max-w-md mx-auto px-4 pt-6 pb-24 flex flex-col items-center justify-center flex-grow">
        
        {/* Título, Subtítulo e Badge */}
        {!isFocusMode && (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl font-semibold text-white">Pomodoro</h1>
            <p className="text-sm opacity-70 text-white mt-0.5">{PHASE_NAMES[phase]}</p>
            <div className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/5 mt-1 text-sm text-white font-medium shadow-sm">
              🔥 {cycles} {cycles === 1 ? "ciclo hoje" : "ciclos hoje"}
            </div>
          </div>
        )}

        {/* Seleção de matéria (escondido no modo foco) */}
        {!isFocusMode && (
          <div className="w-full max-w-xs mt-6 mx-auto transition-opacity">
            <select
              id="pomodoro-subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={isRunning}
              className="w-full px-4 py-3 rounded-xl bg-indigo-800/50 border border-indigo-600/50 text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 cursor-pointer text-center text-sm"
            >
              <option value="" className="bg-primary-900">Selecione uma matéria</option>
              {!subjectsLoading && subjects.map((s) => (
                <option key={s.id} value={s.id} className="bg-primary-900">
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Fases Tabs (escondido no modo foco) */}
        {!isFocusMode && (
          <div className="flex bg-white/5 p-1 rounded-full mt-4 border border-white/10 shadow-inner">
            {(["focus", "shortBreak", "longBreak"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPhase(p)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  phase === p 
                    ? "bg-white/15 text-white shadow-sm" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {PHASE_NAMES[p]}
              </button>
            ))}
          </div>
        )}

        {/* Timer Circular */}
        <div className="relative flex items-center justify-center mt-8 transition-transform duration-500">
          <svg className="w-[280px] h-[280px] transform -rotate-90">
            {/* Círculo de fundo */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              strokeWidth="8"
              fill="transparent"
              className="stroke-indigo-800"
            />
            {/* Círculo de progresso */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${PHASE_COLORS[phase]}`}
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-6xl font-bold tracking-tight tabular-nums text-white">
              {formatTime(timeLeft)}
            </span>
            {isFocusMode && (
              <span className="text-xs font-semibold text-indigo-300 mt-2 tracking-widest uppercase animate-pulse">
                Foco Profundo
              </span>
            )}
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={resetTimer}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white opacity-70 hover:opacity-100 hover:bg-white/10 transition-all cursor-pointer"
            title="Reiniciar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0014.536-5.04.75.75 0 00-.507-.913z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            onClick={toggleTimer}
            disabled={phase === "focus" && !selectedSubject && !isRunning}
            className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
              phase === "focus" && !selectedSubject && !isRunning
                ? "bg-indigo-950/40 text-white/30 border border-white/5 cursor-not-allowed"
                : isRunning
                  ? "bg-red-500/15 text-red-400 border border-red-500/30 shadow-red-500/10 hover:bg-red-500/25"
                  : "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500"
            }`}
          >
            {isRunning ? (
              // Icon Pause
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              // Icon Play
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={skipPhase}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white opacity-70 hover:opacity-100 hover:bg-white/10 transition-all cursor-pointer"
            title="Pular Fase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Alerta caso tente iniciar foco sem matéria */}
        {!isRunning && phase === "focus" && !selectedSubject && (
          <p className="mt-6 text-sm text-amber-400 bg-amber-400/10 px-4 py-2 rounded-lg border border-amber-400/20">
            Selecione uma matéria antes de iniciar o foco.
          </p>
        )}
      </main>

      {/* Esconde a bottom nav no modo foco */}
      {!isFocusMode && <BottomNavBar />}
    </div>
  );
}
