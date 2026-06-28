import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePlanner } from "../hooks/usePlanner";
import { useSubjects } from "../hooks/useSubjects";
import { useActivities } from "../hooks/useActivities";
import type { Activity, PlannerBlock } from "../types";

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

const COLOR_FALLBACK: Record<string, string> = {
  indigo: '#4f46e5', sky: '#0ea5e9', emerald: '#10b981',
  amber: '#f59e0b', rose: '#f43f5e', violet: '#7c3aed',
  orange: '#f97316', teal: '#14b8a6',
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
  const [selectedBlock, setSelectedBlock] = useState<PlannerBlock | null>(null);
  const [modalStartTime, setModalStartTime] = useState("07:00");

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      handleOpenModal(new Date().getDay());
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleOpenModal(day: number, defaultStartTime?: string) {
    setModalDay(day);
    setSelectedSubjectId(subjects[0]?.id || "");
    setModalDuration(45);
    setModalStartTime(defaultStartTime || "07:00");
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
        startTime: modalStartTime,
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
    <div className="min-h-full bg-surface text-gray-900 w-full font-sans antialiased">
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
                          const blockColor = COLOR_FALLBACK[block.subject?.color ?? ""] ?? block.subject?.color ?? "#4f46e5";
                          return (
                            <div
                              key={block.id}
                              style={{ borderLeftColor: blockColor }}
                              className="flex items-center justify-between gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 border-l-[4px] transition-all duration-200"
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
                          const taskColor = COLOR_FALLBACK[task.subject?.color ?? ""] ?? task.subject?.color ?? "#4f46e5";
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
                                  <span
                                    style={{ backgroundColor: `${taskColor}18`, color: taskColor }}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                                  >
                                    <span
                                      style={{ backgroundColor: taskColor }}
                                      className="w-1.5 h-1.5 rounded-full"
                                    />
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
                  <div className="grid grid-cols-3 items-center gap-4 mb-6">
                    {/* Lado Esquerdo: Título */}
                    <div>
                      <h1 className="text-xl font-semibold text-gray-900">Planner Semanal</h1>
                      <p className="text-sm text-gray-500 mt-0.5">Aloque blocos de estudo por dia e matéria</p>
                    </div>

                    {/* Centro: Navegação de semana */}
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-xs">
                        <button
                          onClick={() => setWeekOffset(prev => prev - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-all cursor-pointer text-sm font-bold"
                        >
                          ‹
                        </button>
                        <span className="text-sm font-semibold text-gray-700 min-w-[160px] text-center">
                          {getWeekRangeLabel()}
                        </span>
                        <button
                          onClick={() => setWeekOffset(prev => prev + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-all cursor-pointer text-sm font-bold"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* Lado Direito: Ações */}
                    <div className="justify-self-end">
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

                  {/* Grade de horários + painel lateral */}
                  <div className="flex gap-4 w-full">
                    {/* Grade principal (Coluna principal: flex-1) */}
                    <div className="flex-1 bg-white border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
                      
                      {/* Cabeçalho da grade de horários */}
                      <div className="flex border-b border-border bg-gray-50/50 shrink-0">
                        {/* Primeira coluna vazia para os rótulos de hora */}
                        <div className="w-14 border-r border-border shrink-0 h-12" />
                        
                        {/* As 7 colunas de dias */}
                        {weekDates.map((item) => {
                          const isToday = todayDayOfWeek === item.dayOfWeek && weekOffset === 0;
                          return (
                            <div key={item.dayOfWeek} className="flex-1 h-12 flex flex-col items-center justify-center border-l border-border first:border-l-0">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                {DAYS[item.dayOfWeek].label}
                              </span>
                              <div className="mt-1">
                                {isToday ? (
                                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full font-bold text-xs shadow-sm">
                                    {item.dayOfMonth}
                                  </span>
                                ) : (
                                  <span className="text-gray-805 font-bold text-xs">
                                    {item.dayOfMonth}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Linha separada de chips para atividades com dueDate */}
                      <div className="flex border-b border-border bg-gray-50/20 shrink-0 h-6">
                        <div className="w-14 border-r border-border shrink-0 h-full" />
                        {weekDates.map((item) => {
                          const dayTasks = getActivitiesForDay(item.dayOfWeek, activities);
                          return (
                            <div key={item.dayOfWeek} className="flex-1 h-full px-1 flex items-center gap-1 overflow-x-auto no-scrollbar border-l border-gray-100 first:border-l-0 min-w-0">
                              {dayTasks.map((task) => {
                                return (
                                  <div
                                    key={task.id}
                                    className="shrink-0 border-l-2 border-amber-400 bg-amber-50 text-amber-800 text-[10px] px-2 rounded font-medium max-w-full truncate"
                                    title={task.title}
                                  >
                                    {task.title}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      {/* Corpo da grade com scroll vertical */}
                      <div className="overflow-y-auto max-h-[calc(100vh-260px)] flex-1 relative no-scrollbar">
                        <div className="flex relative h-[896px]">
                          {/* Coluna de rótulos de hora */}
                          <div className="w-14 shrink-0 flex flex-col h-full border-r border-border bg-gray-50/5">
                            {Array.from({ length: 16 }, (_, i) => {
                              const hour = 7 + i;
                              const hourLabel = `${hour.toString().padStart(2, "0")}:00`;
                              return (
                                <div key={hour} className="h-[56px] text-[11px] text-gray-400 text-right pr-3 pt-1 select-none border-b border-gray-100 last:border-b-0">
                                  {hourLabel}
                                </div>
                              );
                            })}
                          </div>

                          {/* As 7 colunas correspondentes aos dias */}
                          <div className="flex flex-1 h-full">
                            {weekDates.map((item) => {
                              const dayBlocks = getBlocksForDay(item.dayOfWeek);

                              return (
                                <div
                                  key={item.dayOfWeek}
                                  className="flex-1 border-l border-gray-100 first:border-l-0 relative h-full flex flex-col bg-white"
                                >
                                  {/* Células de fundo/slots de hora */}
                                  {Array.from({ length: 16 }, (_, i) => {
                                    const hour = 7 + i;
                                    return (
                                      <div
                                        key={hour}
                                        onClick={() => handleOpenModal(item.dayOfWeek, `${hour.toString().padStart(2, "0")}:00`)}
                                        className="h-[56px] border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 cursor-pointer"
                                      />
                                    );
                                  })}

                                  {/* Blocos de Planner posicionados absolutamente */}
                                  {dayBlocks.map((block) => {
                                    const blockColor = COLOR_FALLBACK[block.subject?.color ?? ""] ?? block.subject?.color ?? "#4f46e5";
                                    const heightPx = (block.durationMinutes / 60) * 56;
                                    
                                    // Calculate top offset based on startTime
                                    const [startHourStr, startMinStr] = (block.startTime || "07:00").split(":");
                                    const startHour = Number(startHourStr) || 7;
                                    const startMin = Number(startMinStr) || 0;
                                    const topPx = (startHour - 7) * 56 + (startMin / 60) * 56;

                                    return (
                                      <div
                                        key={block.id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedBlock(block);
                                        }}
                                        className="absolute left-1 right-1 p-2 rounded-lg shadow-xs cursor-pointer hover:brightness-95 transition-all select-none overflow-hidden z-10 text-white"
                                        style={{
                                          height: `${heightPx}px`,
                                          top: `${topPx}px`,
                                          backgroundColor: blockColor,
                                        }}
                                      >
                                        <p className="text-[11px] font-extrabold truncate leading-tight">
                                          {block.subject?.name}
                                        </p>
                                        <p className="text-[9px] opacity-70 mt-0.5 leading-none font-semibold">
                                          {block.startTime || "07:00"} ({block.durationMinutes} min)
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Painel lateral direito (w-72 shrink-0) */}
                    <div className="w-72 shrink-0 flex flex-col gap-3">
                      
                      {/* Card 1: Detalhes do bloco selecionado */}
                      <div className="bg-white border border-border rounded-xl p-4 flex flex-col shadow-sm justify-center min-h-[160px]">
                        {selectedBlock === null ? (
                          <div className="flex flex-col items-center justify-center py-6 text-center select-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300 mb-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-500">Selecione um evento</p>
                            <p className="text-xs text-gray-400 mt-1">Clique em um bloco para ver detalhes</p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 align-start text-left">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {selectedBlock.subject?.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {selectedBlock.durationMinutes} minutos
                            </p>
                            <button
                              type="button"
                              onClick={async () => {
                                await handleDeleteBlock(selectedBlock.id);
                                setSelectedBlock(null);
                              }}
                              className="mt-2 w-full h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-semibold transition-all cursor-pointer text-center"
                            >
                              Remover
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Card 2: Sugestão da semana */}
                      <div className="bg-white border border-border rounded-xl p-4 flex flex-col shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 select-none">
                          SUGESTÃO DA SEMANA
                        </span>
                        
                        {(() => {
                          const dayMinutes = [0, 1, 2, 3, 4, 5, 6].map(d => {
                            const blocks = getBlocksForDay(d);
                            const total = blocks.reduce((sum, b) => sum + b.durationMinutes, 0);
                            return { day: d, total };
                          });

                          const totalMinutes = dayMinutes.reduce((sum, d) => sum + d.total, 0);
                          const averageMinutes = totalMinutes / 7;

                          const maxDay = dayMinutes.reduce((max, d) => d.total > max.total ? d : max, dayMinutes[0]);

                          if (maxDay.total > averageMinutes + 120 && maxDay.total > 0) {
                            const dayName = DAYS_FULL[maxDay.day];
                            return (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                Sua carga está concentrada em <span className="font-bold text-zinc-950">{dayName}</span>. Distribua sessões para outros dias para equilibrar o estudo.
                              </p>
                            );
                          }

                          return (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              Sua semana está bem distribuída. Continue assim!
                            </p>
                          );
                        })()}
                      </div>

                    </div>
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

              {/* Horário de início */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Horário de início</label>
                <input
                  type="time"
                  value={modalStartTime}
                  onChange={(e) => setModalStartTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-55 border border-gray-200 text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
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
