import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePlanner } from "../hooks/usePlanner";
import { useSubjects } from "../hooks/useSubjects";
import { useActivities } from "../hooks/useActivities";
import type { Activity } from "../types";

const DAYS = [
  { label: "Dom", value: 0 },
  { label: "Seg", value: 1 },
  { label: "Ter", value: 2 },
  { label: "Qua", value: 3 },
  { label: "Qui", value: 4 },
  { label: "Sex", value: 5 },
  { label: "Sáb", value: 6 },
];

const DAYS_FULL = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
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
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600",
    border: "border-indigo-100",
    borderL: "border-l-indigo-500",
    pillBg: "bg-indigo-50",
    pillText: "text-indigo-700",
    dot: "bg-indigo-500"
  },
  sky: {
    bg: "bg-sky-500 text-white",
    text: "text-sky-600",
    border: "border-sky-100",
    borderL: "border-l-sky-500",
    pillBg: "bg-sky-50",
    pillText: "text-sky-700",
    dot: "bg-sky-500"
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600",
    border: "border-emerald-100",
    borderL: "border-l-emerald-500",
    pillBg: "bg-emerald-50",
    pillText: "text-emerald-700",
    dot: "bg-emerald-500"
  },
  amber: {
    bg: "bg-amber-500 text-white",
    text: "text-amber-600",
    border: "border-amber-100",
    borderL: "border-l-amber-500",
    pillBg: "bg-amber-50",
    pillText: "text-amber-700",
    dot: "bg-amber-500"
  },
  rose: {
    bg: "bg-rose-500 text-white",
    text: "text-rose-600",
    border: "border-rose-100",
    borderL: "border-l-rose-500",
    pillBg: "bg-rose-50",
    pillText: "text-rose-700",
    dot: "bg-rose-500"
  },
  violet: {
    bg: "bg-violet-600 text-white",
    text: "text-violet-600",
    border: "border-violet-100",
    borderL: "border-l-violet-500",
    pillBg: "bg-violet-50",
    pillText: "text-violet-700",
    dot: "bg-violet-500"
  },
  orange: {
    bg: "bg-orange-500 text-white",
    text: "text-orange-600",
    border: "border-orange-100",
    borderL: "border-l-orange-500",
    pillBg: "bg-orange-50",
    pillText: "text-orange-700",
    dot: "bg-orange-500"
  },
  teal: {
    bg: "bg-teal-600 text-white",
    text: "text-teal-600",
    border: "border-teal-100",
    borderL: "border-l-teal-500",
    pillBg: "bg-teal-50",
    pillText: "text-teal-700",
    dot: "bg-teal-500"
  }
};

export default function PlannerPage() {
  const { getBlocksForDay, addBlock, removeBlock, isLoading, error } = usePlanner();
  const { subjects } = useSubjects();
  const { activities } = useActivities();

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDay, setModalDay] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [modalDuration, setModalDuration] = useState(45);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      handleOpenModal(new Date().getDay());
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleOpenModal(day: number) {
    setModalDay(day);
    setSelectedSubjectId(subjects[0]?.id || "");
    setModalDuration(45);
    setSubmitError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!selectedSubjectId) {
      setSubmitError("Selecione uma matéria.");
      return;
    }

    if (modalDuration < 15 || modalDuration > 480) {
      setSubmitError("A duração deve ser entre 15 e 480 minutos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addBlock({
        subjectId: selectedSubjectId,
        dayOfWeek: modalDay,
        durationMinutes: modalDuration,
      });
      setIsModalOpen(false);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao adicionar bloco de estudo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteBlock(id: string) {
    try {
      await removeBlock(id);
    } catch (err) {
      alert("Erro ao remover o bloco de estudo.");
    }
  }

  // Get date information for the week based on active offset
  function getDaysOfWeekDates(offset = 0) {
    const current = new Date();
    current.setDate(current.getDate() + offset * 7);
    const dayOfWeek = current.getDay(); // 0 = Dom, 6 = Sáb
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - dayOfWeek); // Back to Sunday of that week

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      weekDates.push({
        dayOfWeek: i,
        dayOfMonth: d.getDate(),
        monthName: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
        date: d,
      });
    }
    return weekDates;
  }

  function getWeekRangeLabel() {
    const dates = getDaysOfWeekDates(weekOffset);
    const start = dates[0].date;
    const end = dates[6].date;
    const startDay = start.getDate().toString().padStart(2, "0");
    const startMonth = start.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
    const endDay = end.getDate().toString().padStart(2, "0");
    const endMonth = end.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
    
    return `${startDay} de ${startMonth} – ${endDay} de ${endMonth}`;
  }

  function getSectionHeaderLabel(dayOfWeek: number) {
    const dates = getDaysOfWeekDates(weekOffset);
    const target = dates[dayOfWeek];
    const isToday = new Date().getDay() === dayOfWeek && weekOffset === 0;
    if (isToday) {
      return `Hoje, ${target.dayOfMonth}`;
    }
    return `${DAYS[dayOfWeek].label}, ${target.dayOfMonth}`;
  }

  function getActivitiesForDay(day: number, activitiesList: Activity[]) {
    const dates = getDaysOfWeekDates(weekOffset);
    const dayDateStr = dates[day].date.toISOString().split("T")[0]; // YYYY-MM-DD
    
    return activitiesList.filter((act) => {
      if (!act.dueDate) return false;
      const actDateStr = act.dueDate.split("T")[0]; // YYYY-MM-DD
      return actDateStr === dayDateStr;
    });
  }

  const weekDates = getDaysOfWeekDates(weekOffset);
  const todayDayOfWeek = new Date().getDay();

  const currentDayBlocks = getBlocksForDay(activeDay);
  const currentDayTasks = getActivitiesForDay(activeDay, activities);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900 w-full font-sans antialiased">
      {/* Header (Móvel apenas) */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-lg sticky top-0 z-10 lg:hidden px-4 py-3.5">
        <div className="max-w-md mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Esta semana</span>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight mt-0.5">Planner Semanal</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-md lg:max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-8 lg:py-8">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Erro */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-400/20 rounded-2xl px-5 py-4 text-red-700 text-sm text-center mb-6">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            {subjects.length === 0 ? (
              <div className="text-center py-12 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm max-w-sm mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Nenhuma matéria cadastrada
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Crie uma matéria antes de planejar sua semana.
                </p>
                <Link
                  to="/subjects"
                  className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all duration-300 shadow-md shadow-indigo-600/10 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  Criar matéria
                </Link>
              </div>
            ) : (
              <>
                {/* 1. LAYOUT MOBILE (< lg) */}
                <div className="lg:hidden flex flex-col w-full">
                  {/* Header text info */}
                  <div className="mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Esta semana</span>
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mt-0.5">Planner Semanal</h2>
                    <p className="text-sm text-gray-500 mt-1">Aloque blocos de estudo por dia e matéria</p>
                  </div>

                  {/* Row de navegação de dias */}
                  <div className="grid grid-cols-7 gap-1 bg-white p-2 rounded-2xl border border-gray-150 shadow-xs">
                    {weekDates.map((item) => {
                      const isSelected = activeDay === item.dayOfWeek;
                      const isToday = todayDayOfWeek === item.dayOfWeek && weekOffset === 0;
                      const dayBlocks = getBlocksForDay(item.dayOfWeek);
                      const dayTasks = getActivitiesForDay(item.dayOfWeek, activities);
                      const hasItems = dayBlocks.length > 0 || dayTasks.length > 0;

                      return (
                        <button
                          key={item.dayOfWeek}
                          type="button"
                          onClick={() => setActiveDay(item.dayOfWeek)}
                          className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? "text-indigo-200" : "text-gray-400"}`}>
                            {DAYS[item.dayOfWeek].label}
                          </span>
                          <span className={`text-base font-bold mt-1 leading-none ${
                            isSelected 
                              ? "text-white" 
                              : isToday 
                              ? "text-indigo-600 font-extrabold border-b-2 border-indigo-600" 
                              : "text-gray-800"
                          }`}>
                            {item.dayOfMonth}
                          </span>
                          {/* Ponto indicador se possui itens */}
                          {hasItems && (
                            <span className={`w-1 h-1 rounded-full mt-1.5 ${isSelected ? "bg-white" : "bg-indigo-400"}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Section Title e Cabeçalho do dia ativo */}
                  <div className="mt-6 flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Blocos do dia</span>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-150 rounded-full px-3 py-1">
                      {getSectionHeaderLabel(activeDay)}
                    </span>
                  </div>

                  {/* Lista de cards para o dia ativo */}
                  <div className="flex flex-col gap-3">
                    {currentDayBlocks.length === 0 && currentDayTasks.length === 0 ? (
                      /* Empty state para o dia */
                      <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-gray-150 shadow-xs py-14">
                        <span className="text-3xl mb-3">📅</span>
                        <h4 className="text-sm font-bold text-gray-900">
                          Nenhum bloco planejado
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
                          Adicione matérias para organizar sua semana de estudos.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* 1. Blocos de Planner */}
                        {currentDayBlocks.map((block) => {
                          const subjectColor = block.subject?.color || "indigo";
                          const colors = lightColorMap[subjectColor] || lightColorMap.indigo;
                          return (
                            <div
                              key={block.id}
                              className={`flex items-center justify-between gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 border-l-[4px] ${colors.borderL} transition-all duration-200`}
                            >
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-bold text-gray-900 truncate">
                                    {block.subject?.name}
                                  </span>
                                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5 font-medium shrink-0">
                                    {block.durationMinutes}min
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium mt-1">
                                  {block.subject?.category || "Estudo geral"}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDeleteBlock(block.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer shrink-0 text-xl font-bold leading-none"
                                title="Remover bloco"
                              >
                                &times;
                              </button>
                            </div>
                          );
                        })}

                        {/* 2. Tarefas / Atividades */}
                        {currentDayTasks.map((task) => {
                          const subjectColor = task.subject?.color || "indigo";
                          const colors = lightColorMap[subjectColor] || lightColorMap.indigo;
                          return (
                            <div
                              key={task.id}
                              className="flex items-center justify-between gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 border-l-[4px] border-l-amber-500 transition-all duration-200"
                            >
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-bold text-gray-900 truncate">
                                    {task.title}
                                  </span>
                                  <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5 shrink-0">
                                    Tarefa
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${colors.pillBg} ${colors.pillText}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                                    {task.subject?.name}
                                  </span>
                                  {task.status === "completed" && (
                                    <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full">
                                      ✓ Concluída
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {/* Botão de adicionar bloco móvel */}
                    <button
                      onClick={() => handleOpenModal(activeDay)}
                      className="mt-2 w-full h-11 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-indigo-600 text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      Adicionar bloco
                    </button>
                  </div>
                </div>

                {/* 2. LAYOUT DESKTOP (>= lg) */}
                <div className="hidden lg:flex lg:flex-col w-full">
                  {/* Header Seção */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Planner Semanal</h1>
                      <p className="text-xs text-gray-500 mt-1">Aloque blocos de estudo por dia e matéria</p>
                    </div>

                    {/* Controles de navegação de semana */}
                    <div className="flex items-center gap-2.5">
                      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-xs">
                        <button
                          onClick={() => setWeekOffset(prev => prev - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer text-xs font-bold"
                          title="Semana anterior"
                        >
                          &lt;
                        </button>
                        <button
                          onClick={() => setWeekOffset(0)}
                          className="px-3 h-8 flex items-center justify-center text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer border-x border-gray-150"
                        >
                          Hoje
                        </button>
                        <button
                          onClick={() => setWeekOffset(prev => prev + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer text-xs font-bold"
                          title="Próxima semana"
                        >
                          &gt;
                        </button>
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {getWeekRangeLabel()}
                      </span>
                    </div>

                    {/* Ações canto direito */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert("Filtros em desenvolvimento")}
                        className="h-10 px-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                        </svg>
                        Filtros
                      </button>
                      <button
                        onClick={() => handleOpenModal(new Date().getDay())}
                        className="h-10 px-4.5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        + Agendar
                      </button>
                    </div>
                  </div>

                  {/* Grade de 7 colunas */}
                  <div className="grid grid-cols-7 gap-3.5 items-start w-full">
                    {weekDates.map((item) => {
                      const isToday = todayDayOfWeek === item.dayOfWeek && weekOffset === 0;
                      const dayBlocks = getBlocksForDay(item.dayOfWeek);
                      const dayTasks = getActivitiesForDay(item.dayOfWeek, activities);

                      return (
                        <div
                          key={item.dayOfWeek}
                          className={`bg-white border rounded-2xl p-3 flex flex-col min-h-[440px] shadow-sm transition-all duration-300 ${
                            isToday 
                              ? "border-indigo-400 ring-2 ring-indigo-500/10 bg-indigo-50/5" 
                              : "border-gray-200"
                          }`}
                        >
                          {/* Cabeçalho da coluna do dia */}
                          <div className="text-center border-b border-gray-100 pb-3 mb-3 shrink-0">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                              {DAYS[item.dayOfWeek].label}
                            </p>
                            <div className="mt-1.5 flex justify-center">
                              {isToday ? (
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold text-xs shadow-sm">
                                  {item.dayOfMonth}
                                </span>
                              ) : (
                                <span className="w-8 h-8 flex items-center justify-center text-gray-800 font-bold text-xs">
                                  {item.dayOfMonth}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Lista interna de cards */}
                          <div className="flex-grow flex flex-col gap-2 overflow-y-auto max-h-[310px] no-scrollbar">
                            {dayBlocks.length === 0 && dayTasks.length === 0 ? (
                              <div className="flex-grow flex flex-col items-center justify-center text-center py-16 border border-dashed border-gray-150 rounded-xl bg-gray-50/50">
                                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Livre</p>
                              </div>
                            ) : (
                              <>
                                {/* Blocos (cards de fundo da matéria) */}
                                {dayBlocks.map((block) => {
                                  const subjectColor = block.subject?.color || "indigo";
                                  const colors = lightColorMap[subjectColor] || lightColorMap.indigo;
                                  return (
                                    <div
                                      key={block.id}
                                      className={`flex items-start justify-between gap-1.5 p-2.5 rounded-lg shadow-xs ${colors.bg} relative group hover:scale-[1.02] transition-all duration-150`}
                                    >
                                      <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-extrabold truncate leading-tight">
                                          {block.subject?.name}
                                        </p>
                                        <p className="text-[9px] opacity-75 font-semibold mt-0.5 leading-none">
                                          {block.durationMinutes} min
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => handleDeleteBlock(block.id)}
                                        className="w-4 h-4 flex items-center justify-center rounded bg-white/20 text-white hover:bg-white/40 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shrink-0 text-xs font-bold leading-none"
                                        title="Excluir"
                                      >
                                        &times;
                                      </button>
                                    </div>
                                  );
                                })}

                                {/* Tarefas associadas ao dia (borda amarela) */}
                                {dayTasks.map((task) => {
                                  const subjectColor = task.subject?.color || "indigo";
                                  const colors = lightColorMap[subjectColor] || lightColorMap.indigo;
                                  return (
                                    <div
                                      key={task.id}
                                      className="flex flex-col gap-1 p-2 bg-white border border-gray-150 rounded-lg shadow-xs border-l-[3px] border-l-amber-500"
                                    >
                                      <p className="text-[10px] font-bold text-gray-800 leading-tight truncate" title={task.title}>
                                        {task.title}
                                      </p>
                                      <span className={`inline-block text-[8px] font-extrabold px-1.5 py-0.2 rounded-full self-start ${colors.pillBg} ${colors.pillText} truncate max-w-full`}>
                                        {task.subject?.name}
                                      </span>
                                    </div>
                                  );
                                })}
                              </>
                            )}
                          </div>

                          {/* Adicionar por coluna */}
                          <button
                            onClick={() => handleOpenModal(item.dayOfWeek)}
                            className="mt-3 w-full py-2 border border-dashed border-gray-200 hover:border-indigo-400 bg-gray-50/50 hover:bg-indigo-50/20 text-gray-400 hover:text-indigo-600 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            Adicionar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Modal de criação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Adicionar Bloco de Estudo</h2>

            <form onSubmit={handleSave} className="space-y-4">
              {submitError && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              {/* Matéria */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Matéria</label>
                {subjects.length === 0 ? (
                  <p className="text-sm text-gray-500 py-2">
                    Nenhuma matéria cadastrada. Por favor, crie uma matéria primeiro.
                  </p>
                ) : (
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id} className="bg-white text-gray-900">
                        {s.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Dia da Semana */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Dia da Semana
                </label>
                <select
                  value={modalDay}
                  onChange={(e) => setModalDay(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                >
                  {DAYS.map((d) => (
                    <option key={d.value} value={d.value} className="bg-white text-gray-900">
                      {DAYS_FULL[d.value]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duração */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  min="15"
                  max="480"
                  step="15"
                  value={modalDuration}
                  onChange={(e) => setModalDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || subjects.length === 0}
                  className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
