import { useState, useEffect, useCallback } from "react";
import { pomodoroService } from "../services/pomodoroService";

type Phase = "focus" | "shortBreak" | "longBreak";

const PHASE_DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function usePomodoro() {
  const [phase, setPhase] = useState<Phase>("focus");
  const [timeLeft, setTimeLeft] = useState(PHASE_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0); // number of focus cycles completed today
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const fetchTodaySessions = useCallback(async () => {
    try {
      const sessions = await pomodoroService.getTodaySessions();
      setCycles(sessions.length);
    } catch (error) {
      console.error("Erro ao carregar sessões de hoje:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodaySessions();
  }, [fetchTodaySessions]);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Phase finished
      handlePhaseComplete();
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = useCallback(async () => {
    setIsRunning(false);

    if (phase === "focus") {
      const newCycles = cycles + 1;
      setCycles(newCycles);

      // Salva a sessão no backend se houver matéria selecionada
      if (selectedSubject) {
        try {
          await pomodoroService.createSession({
            subjectId: selectedSubject,
            durationMinutes: 25,
          });
        } catch (error) {
          console.error("Erro ao salvar sessão:", error);
        }
      }

      if (newCycles % 4 === 0) {
        setPhase("longBreak");
        setTimeLeft(PHASE_DURATIONS.longBreak);
      } else {
        setPhase("shortBreak");
        setTimeLeft(PHASE_DURATIONS.shortBreak);
      }
    } else {
      // Finished break -> start focus
      setPhase("focus");
      setTimeLeft(PHASE_DURATIONS.focus);
    }
  }, [phase, cycles, selectedSubject]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(PHASE_DURATIONS[phase]);
  };

  const skipPhase = () => {
    setIsRunning(false);
    handlePhaseComplete();
  };

  return {
    phase,
    timeLeft,
    isRunning,
    cycles,
    selectedSubject,
    setSelectedSubject,
    toggleTimer,
    resetTimer,
    skipPhase,
    setPhase: (newPhase: Phase) => {
      setIsRunning(false);
      setPhase(newPhase);
      setTimeLeft(PHASE_DURATIONS[newPhase]);
    },
  };
}
