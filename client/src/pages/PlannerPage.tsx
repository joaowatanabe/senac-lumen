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
  indigo:  { bg: "bg-zinc-950 text-white",  text: "text-zinc-950",  border: "border-zinc-300",   borderL: "border-l-zinc-950",   pillBg: "bg-zinc-100",      pillText: "text-zinc-900",       dot: "bg-zinc-950" },
  sky:     { bg: "bg-zinc-800 text-white",  text: "text-zinc-800",  border: "border-zinc-250",   borderL: "border-l-zinc-800",   pillBg: "bg-zinc-55",       pillText: "text-zinc-800",       dot: "bg-zinc-700" },
  emerald: { bg: "bg-zinc-650 text-white",  text: "text-zinc-650",  border: "border-zinc-200",   borderL: "border-l-zinc-600",   pillBg: "bg-zinc-50/50",    pillText: "text-zinc-700",       dot: "bg-zinc-500" },
  amber:   { bg: "bg-stone-850 text-white", text: "text-stone-850", border: "border-stone-250",  borderL: "border-l-stone-850",  pillBg: "bg-stone-100/50",  pillText: "text-stone-800",      dot: "bg-stone-700" },
  rose:    { bg: "bg-slate-850 text-white", text: "text-slate-850", border: "border-slate-250",  borderL: "border-l-slate-850",  pillBg: "bg-slate-100/50",  pillText: "text-slate-800",      dot: "bg-slate-700" },
  violet:  { bg: "bg-zinc-900 text-white",  text: "text-zinc-900",  border: "border-zinc-300",   borderL: "border-l-zinc-900",   pillBg: "bg-zinc-200/50",   pillText: "text-zinc-900",       dot: "bg-zinc-850" },
  orange:  { bg: "bg-stone-650 text-white", text: "text-stone-650", border: "border-stone-200",  borderL: "border-l-stone-600",  pillBg: "bg-stone-50/50",   pillText: "text-stone-700",      dot: "bg-stone-550" },
  teal:    { bg: "bg-slate-650 text-white", text: "text-slate-650", border: "border-slate-200",  borderL: "border-l-slate-600",  pillBg: "bg-slate-50/50",   pillText: "text-slate-700",      dot: "bg-slate-550" },
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
    <div className="min-h-full bg-[#F8F8FA] text-gray-900 w-full font-sans antialiased">
      {/* Header (Móvel apenas) */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 lg:hidden px-4 py-3">
        <div className="max-w-md mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Esta semana</span>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight mt-0.5">Planner Semanal</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-8 lg:py-8">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light border border-border mb-4">
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
                  className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer"
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
                              ? "bg-primary text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`text-[10px] uppercase font-medium tracking-wider ${isSelected ? "text-indigo-200" : "text-gray-400"}`}>
                            {DAYS[item.dayOfWeek].label}
                          </span>
                          <span className={`text-base font-bold mt-1 leading-none ${
                            isSelected 
                              ? "text-white" 
                              : isToday 
                              ? "text-primary font-bold border-b-2 border-primary" 
                              : "text-gray-800"
                          }`}>
                            {item.dayOfMonth}
                          </span>
                          {/* Ponto indicador se possui itens */}
                          {hasItems && (
                            <span className={`w-1 h-1 rounded-full mt-1.5 ${isSelected ? "bg-white" : "bg-primary"}`} />
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
                      className="mt-2 w-full h-10 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-primary text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
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
                      <h1 className="text-xl font-semibold text-gray-900">Planner Semanal</h1>
                      <p className="text-sm text-gray-500 mt-0.5">Aloque blocos de estudo por dia e matéria</p>
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
                        className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer shadow-sm"
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
                          className={`bg-white border rounded-xl p-3 flex flex-col min-h-[440px] shadow-sm transition-all duration-300 ${
                            isToday 
                              ? "border-primary/40 ring-2 ring-primary/10" 
                              : "border-border"
                          }`}
                        >
                          {/* Cabeçalho da coluna do dia */}
                          <div className="text-center border-b border-gray-100 pb-3 mb-3 shrink-0">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                              {DAYS[item.dayOfWeek].label}
                            </p>
                            <div className="mt-1.5 flex justify-center">
                              {isToday ? (
                                <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-semibold text-xs shadow-sm">
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
                            className="mt-3 w-full py-2 border border-dashed border-gray-200 hover:border-primary/40 bg-gray-50/50 hover:bg-primary-light/30 text-gray-400 hover:text-primary rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
                    className="w-full px-4 py-3 rounded-xl bg-gray-55 border border-gray-200 text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-xl bg-gray-55 border border-gray-200 text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-xl bg-gray-55 border border-gray-200 text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || subjects.length === 0}
                  className="flex-1 h-10 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
