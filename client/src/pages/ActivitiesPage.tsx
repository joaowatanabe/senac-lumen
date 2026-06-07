import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useActivities } from "../hooks/useActivities";
import { useSubjects } from "../hooks/useSubjects";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import { colorMap } from "../components/SubjectCard";
import type { Activity } from "../types";

function formatDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  // Use UTC safe slicing to prevent timezone offsets shifting the date
  const parts = dateStr.split("T")[0].split("-");
  if (parts.length === 3) {
    const month = parts[1];
    const day = parts[2];
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const monthIdx = parseInt(month, 10) - 1;
    return `${day} de ${months[monthIdx] || month}`;
  }
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export default function ActivitiesPage() {
  const { pending, completed, isLoading, error, createActivity, updateActivity, toggleStatus, deleteActivity } = useActivities();
  const { subjects } = useSubjects();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Activity | null>(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "Alta" | "Média" | "Baixa">("all");
  const [subjectFilter, setSubjectFilter] = useState<"all" | string>("all");

  function handleOpenCreate() {
    setEditingActivity(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(activity: Activity) {
    setEditingActivity(activity);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      handleOpenCreate();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  async function handleSave(data: {
    title: string;
    subjectId: string;
    dueDate?: string | null;
    type?: string | null;
    priority?: string;
  }) {
    const formattedData = {
      ...data,
      dueDate: data.dueDate || undefined,
      type: data.type || undefined,
      priority: data.priority || undefined,
    };
    if (editingActivity) {
      await updateActivity(editingActivity.id, formattedData);
    } else {
      await createActivity(formattedData);
    }
  }

  async function handleConfirmDelete() {
    if (deleteConfirm) {
      await deleteActivity(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  }

  // Filter lists based on search query, priority, and subject selection
  const filterList = (list: Activity[]) => {
    return list.filter((act) => {
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.type && act.type.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPriority = priorityFilter === "all" || act.priority === priorityFilter;
      const matchesSubject = subjectFilter === "all" || act.subjectId === subjectFilter;
      return matchesSearch && matchesPriority && matchesSubject;
    });
  };

  const filteredPending = filterList(pending);
  const filteredCompleted = filterList(completed);

  const hasAnyPending = filteredPending.length > 0;
  const hasAnyCompleted = filteredCompleted.length > 0;
  const hasAnyData = pending.length > 0 || completed.length > 0;

  // Determine which list to render in the table or card view
  const getRenderableActivities = () => {
    let list: Activity[] = [];
    if (statusFilter === "all" || statusFilter === "pending") {
      list = [...list, ...filteredPending];
    }
    if (statusFilter === "all" || statusFilter === "completed") {
      list = [...list, ...filteredCompleted];
    }
    return list;
  };

  const visibleActivities = getRenderableActivities();

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header (Móvel apenas) */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-10 lg:hidden">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-white tracking-tight">Atividades</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-md lg:max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-8 lg:py-8">
        
        {/* Title, description & action button */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Atividades</h1>
            <p className="mt-1 text-primary-300/80 text-sm">
              Gerencie suas tarefas, prazos, prioridades e acompanhe seu progresso de estudos.
            </p>
          </div>
          {!isLoading && !error && subjects.length > 0 && (
            <button
              onClick={handleOpenCreate}
              className="h-11 md:w-auto px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-primary-950/20 shrink-0 font-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Nova atividade
            </button>
          )}
        </div>

        {/* Search and Filters Panel */}
        {!isLoading && !error && hasAnyData && (
          <div className="mb-6 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-4.5 shadow-sm">
            {/* Search Box */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar por título ou tipo de atividade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-primary-400/70 outline-none transition-all focus:border-primary-400 focus:ring-2 focus:ring-primary-400/15"
              />
            </div>

            {/* Filter Chips Bar */}
            <div className="flex flex-col gap-3">
              {/* Status Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                <span className="text-[10px] font-extrabold text-primary-400 uppercase tracking-wider mr-1">Status:</span>
                {[
                  { id: "all", label: "Todas" },
                  { id: "pending", label: "Pendentes" },
                  { id: "completed", label: "Concluídas" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setStatusFilter(opt.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      statusFilter === opt.id
                        ? "bg-white/15 border-white/30 text-white"
                        : "bg-white/5 border-white/5 text-primary-400 hover:border-white/15"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Priority Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                <span className="text-[10px] font-extrabold text-primary-400 uppercase tracking-wider mr-1">Prioridade:</span>
                {[
                  { id: "all", label: "Todas" },
                  { id: "Alta", label: "Alta 🔴" },
                  { id: "Média", label: "Média 🟡" },
                  { id: "Baixa", label: "Baixa 🟢" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPriorityFilter(opt.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      priorityFilter === opt.id
                        ? "bg-white/15 border-white/30 text-white"
                        : "bg-white/5 border-white/5 text-primary-400 hover:border-white/15"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Subject Chips */}
              {subjects.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                  <span className="text-[10px] font-extrabold text-primary-400 uppercase tracking-wider mr-1">Matéria:</span>
                  <button
                    onClick={() => setSubjectFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      subjectFilter === "all"
                        ? "bg-white/15 border-white/30 text-white"
                        : "bg-white/5 border-white/5 text-primary-400 hover:border-white/15"
                    }`}
                  >
                    Todas
                  </button>
                  {subjects.map((sub) => {
                    const colors = colorMap[sub.color] || colorMap.indigo;
                    const isSelected = subjectFilter === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSubjectFilter(sub.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          isSelected
                            ? `${colors.bg} ${colors.border} ${colors.text} ring-2 ring-white/10`
                            : "bg-white/5 border-white/5 text-primary-400 hover:border-white/15"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.chip}`} />
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-primary-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Erro */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-2xl px-5 py-4 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Empty state específico para quando não há matérias */}
        {!isLoading && !error && subjects.length === 0 && (
          <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm shadow-black/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Nenhuma matéria cadastrada
            </h3>
            <p className="text-primary-300/80 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              Você precisa criar uma matéria antes de adicionar atividades.
            </p>
            <Link
              to="/subjects"
              className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Criar matéria
            </Link>
          </div>
        )}

        {/* Empty state global ou filtros vazios */}
        {!isLoading && !error && subjects.length > 0 && (!hasAnyData || visibleActivities.length === 0) && (
          <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm shadow-black/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {!hasAnyData ? "Nenhuma atividade cadastrada" : "Nenhuma atividade corresponde aos filtros"}
            </h3>
            <p className="text-primary-300/80 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              {!hasAnyData
                ? "Crie suas atividades acadêmicas vinculadas às matérias. Acompanhe prazos e marque como concluídas conforme avança."
                : "Tente limpar os filtros de busca, prioridade ou disciplina para encontrar o que procura."}
            </p>
            {!hasAnyData ? (
              <button
                onClick={handleOpenCreate}
                className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Criar primeira atividade
              </button>
            ) : (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                  setSubjectFilter("all");
                }}
                className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-primary-200 text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer hover:bg-white/10"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* LISTAGEM RESPONSIVA */}
        {!isLoading && !error && visibleActivities.length > 0 && (
          <div>
            {/* 1. MÓVEL: Lista de Cards (< lg) */}
            <div className="lg:hidden space-y-3">
              {statusFilter === "all" ? (
                <>
                  {hasAnyPending && (
                    <div className="space-y-3">
                      <h2 className="text-[10px] font-extrabold text-primary-200 uppercase tracking-widest px-1">Pendentes ({filteredPending.length})</h2>
                      {filteredPending.map((act) => (
                        <ActivityCard key={act.id} activity={act} onToggle={toggleStatus} onEdit={handleOpenEdit} onDelete={setDeleteConfirm} />
                      ))}
                    </div>
                  )}
                  {hasAnyCompleted && (
                    <div className="space-y-3 mt-6">
                      <h2 className="text-[10px] font-extrabold text-primary-400 uppercase tracking-widest px-1">Concluídas ({filteredCompleted.length})</h2>
                      {filteredCompleted.map((act) => (
                        <ActivityCard key={act.id} activity={act} onToggle={toggleStatus} onEdit={handleOpenEdit} onDelete={setDeleteConfirm} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-extrabold text-primary-200 uppercase tracking-widest px-1">
                    {statusFilter === "pending" ? `Pendentes (${visibleActivities.length})` : `Concluídas (${visibleActivities.length})`}
                  </h2>
                  {visibleActivities.map((act) => (
                    <ActivityCard key={act.id} activity={act} onToggle={toggleStatus} onEdit={handleOpenEdit} onDelete={setDeleteConfirm} />
                  ))}
                </div>
              )}
            </div>

            {/* 2. DESKTOP: Tabela estruturada (>= lg) */}
            <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
              <table className="w-full border-collapse text-left text-xs text-white">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-primary-300">
                    <th className="px-6 py-4 font-bold uppercase tracking-wider w-16 text-center">Status</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Atividade</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Matéria</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider w-28">Prioridade</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider w-36">Prazo</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider w-24 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visibleActivities.map((act) => {
                    const isDone = act.status === "completed";
                    const subjectColor = act.subject?.color || "indigo";
                    const colors = colorMap[subjectColor] || colorMap.indigo;
                    const dueLabel = formatDate(act.dueDate);

                    // Urgência prazo
                    const isOverdue = !isDone && act.dueDate && new Date(act.dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
                    const isToday = !isDone && act.dueDate && new Date(act.dueDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0);

                    return (
                      <tr
                        key={act.id}
                        className={`transition-colors duration-150 ${isDone ? "opacity-55 bg-black/[0.01]" : "hover:bg-white/[0.02]"}`}
                      >
                        {/* Checkbox */}
                        <td className="px-6 py-3.5 text-center">
                          <button
                            onClick={() => toggleStatus(act)}
                            className={`w-5 h-5 mx-auto rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                              isDone
                                ? `${colors.chip} border-transparent`
                                : `border-white/20 hover:border-primary-400 bg-white/5`
                            }`}
                          >
                            {isDone && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </td>

                        {/* Atividade */}
                        <td className="px-6 py-3.5">
                          <span className={`font-semibold text-sm leading-snug ${isDone ? "line-through text-primary-500 font-medium" : "text-white"}`}>
                            {act.title}
                          </span>
                        </td>

                        {/* Matéria */}
                        <td className="px-6 py-3.5">
                          {act.subject ? (
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${colors.chip}`} />
                              {act.subject.name}
                            </span>
                          ) : (
                            <span className="text-primary-500 font-semibold">—</span>
                          )}
                        </td>

                        {/* Tipo */}
                        <td className="px-6 py-3.5">
                          {act.type ? (
                            <span className="inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/5 text-primary-300 border border-white/5 uppercase tracking-wide">
                              {act.type}
                            </span>
                          ) : (
                            <span className="text-primary-500/50">—</span>
                          )}
                        </td>

                        {/* Prioridade */}
                        <td className="px-6 py-3.5">
                          {act.priority ? (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wide ${
                              act.priority === "Alta"
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : act.priority === "Baixa"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}>
                              {act.priority}
                            </span>
                          ) : (
                            <span className="text-primary-500/50">—</span>
                          )}
                        </td>

                        {/* Prazo */}
                        <td className="px-6 py-3.5">
                          {dueLabel ? (
                            <span className={`text-[10px] font-bold inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border ${
                              isOverdue
                                ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse"
                                : isToday
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                : "bg-white/5 text-primary-400 border-white/5"
                            }`}>
                              {isOverdue ? "⚠️ Atrasado: " : isToday ? "⏰ Hoje: " : "📅 "}
                              {dueLabel}
                            </span>
                          ) : (
                            <span className="text-primary-500/50 font-semibold">Sem prazo</span>
                          )}
                        </td>

                        {/* Ações */}
                        <td className="px-6 py-3.5 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(act)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-primary-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                              title="Editar"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(act)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-primary-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                              title="Excluir"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totalizador de rodapé */}
            <p className="text-center text-xs text-primary-400 mt-6 font-bold uppercase tracking-wider">
              {visibleActivities.length} {visibleActivities.length === 1 ? "atividade listada" : "atividades listadas"}
            </p>
          </div>
        )}
      </main>

      {/* Modal de criação/edição */}
      <ActivityModal
        isOpen={isModalOpen}
        activity={editingActivity}
        subjects={subjects}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Modal de confirmação de exclusão */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-primary-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
            <h3 className="text-lg font-bold text-white mb-2">Excluir atividade?</h3>
            <p className="text-primary-300 text-sm mb-6">
              A atividade <strong className="text-white">{deleteConfirm.title}</strong> será
              excluída permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 text-primary-300 text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
