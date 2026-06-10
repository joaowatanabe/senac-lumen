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

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "Alta" | "Média" | "Baixa">("all");
  const [subjectFilter, setSubjectFilter] = useState<"all" | string>("all");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "subject" | "status">("dueDate");
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

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

  function isActivityUrgent(act: Activity) {
    if (!act.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDays = new Date(today);
    twoDays.setDate(today.getDate() + 2);
    
    const due = new Date(act.dueDate);
    due.setHours(0, 0, 0, 0);
    
    return due.getTime() <= twoDays.getTime();
  }

  function getSortedActivities(list: Activity[]) {
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === "priority") {
        const priorityOrder: Record<string, number> = { "Alta": 0, "Média": 1, "Baixa": 2 };
        const aOrder = a.priority ? (priorityOrder[a.priority] ?? 3) : 3;
        const bOrder = b.priority ? (priorityOrder[b.priority] ?? 3) : 3;
        return aOrder - bOrder;
      }
      if (sortBy === "subject") {
        const aName = a.subject?.name || "";
        const bName = b.subject?.name || "";
        return aName.localeCompare(bName);
      }
      if (sortBy === "status") {
        const aStatus = a.status === "completed" ? 1 : 0;
        const bStatus = b.status === "completed" ? 1 : 0;
        return aStatus - bStatus;
      }
      return 0;
    });
    return sorted;
  }

  const sortedVisibleActivities = getSortedActivities(visibleActivities);

  function renderBoardCard(act: Activity) {
    const isDone = act.status === "completed";
    const subjectColor = act.subject?.color || "indigo";
    const colors = colorMap[subjectColor] || colorMap.indigo;
    const dueLabel = formatDate(act.dueDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = act.dueDate ? new Date(act.dueDate) : null;
    if (due) due.setHours(0, 0, 0, 0);

    const isOverdue = !isDone && due && due < today;
    const isToday = !isDone && due && due.getTime() === today.getTime();
    const isTomorrow = !isDone && due && due.getTime() === (today.getTime() + 24 * 60 * 60 * 1000);
    
    const isExam = act.type && (act.type.toLowerCase().includes("prova") || act.type.toLowerCase().includes("exame") || act.type.toLowerCase().includes("teste"));
    
    return (
      <div
        key={act.id}
        className="bg-white border border-gray-200 rounded-xl p-4 mb-3 hover:shadow-sm transition-all cursor-pointer select-none"
        onClick={() => handleOpenEdit(act)}
      >
        <div className="flex items-center justify-between mb-2">
          {act.subject ? (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
              • {act.subject.name}
            </span>
          ) : (
            <span className="text-gray-300 text-xs">—</span>
          )}
          {act.type && (
            <span className="text-gray-400" title={act.type}>
              {isExam ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              )}
            </span>
          )}
        </div>
        <p className={`text-sm font-semibold leading-snug mb-3 ${isDone ? "line-through text-gray-400" : "text-gray-900"}`}>
          {act.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isOverdue && <span className="text-red-500 font-bold">Atrasado • </span>}
            {isToday && <span className="text-orange-500 font-bold">Hoje • </span>}
            {isTomorrow && <span className="text-orange-500 font-bold">Amanhã • </span>}
            {dueLabel || "Sem prazo"}
          </span>
          <span className={`w-2 h-2 rounded-full ${
            act.priority === "Alta" ? "bg-red-400" :
            act.priority === "Média" ? "bg-amber-400" : "bg-gray-300"
          }`} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F8F8FA]">
      {/* Mobile header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 lg:hidden">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-base font-bold text-gray-900">Tarefas</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-8">

        {/* Desktop Header */}
        {!isLoading && !error && subjects.length > 0 && (
          <div className="hidden lg:block mb-6 select-none">
            {/* Linha 1: pills de filtro rápido */}
            <div className="flex items-center gap-2 mb-4">
              {/* Pill Matéria */}
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="h-8 px-3 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 cursor-pointer hover:border-gray-300 outline-none"
              >
                <option value="all">Matéria</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Pill Prioridade */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="h-8 px-3 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 cursor-pointer hover:border-gray-300 outline-none"
              >
                <option value="all">Prioridade</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>

              {/* Pill Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-8 px-3 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 cursor-pointer hover:border-gray-300 outline-none"
              >
                <option value="all">Status</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídas</option>
              </select>
            </div>

            {/* Linha 2: barra de controles */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Buscar tarefas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Toggle Lista/Quadro */}
              <div className="flex bg-white border border-gray-200 rounded-lg p-0.5 shadow-xs">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-gray-100 text-gray-900 font-bold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Lista
                </button>
                <button
                  onClick={() => setViewMode("board")}
                  className={`flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    viewMode === "board"
                      ? "bg-gray-100 text-gray-900 font-bold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                  </svg>
                  Quadro
                </button>
              </div>

              {/* Ordenar */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer outline-none hover:border-gray-300"
              >
                <option value="dueDate">Ordenar: Prazo</option>
                <option value="priority">Ordenar: Prioridade</option>
                <option value="subject">Ordenar: Disciplina</option>
                <option value="status">Ordenar: Status</option>
              </select>

              {/* Nova */}
              <button
                onClick={handleOpenCreate}
                className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-all cursor-pointer"
              >
                + Nova
              </button>
            </div>
          </div>
        )}

        {/* Filter bar */}
        {!isLoading && !error && hasAnyData && (
          <div className="mb-6 bg-white border border-border rounded-xl p-4 shadow-sm space-y-3 lg:hidden">
              {/* Search */}
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Buscar por título ou tipo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide shrink-0">Status:</span>
              {[
                { id: "all", label: "Todas" },
                { id: "pending", label: "Pendentes" },
                { id: "completed", label: "Concluídas" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setStatusFilter(opt.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === opt.id
                      ? "bg-primary border-transparent text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Priority filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide shrink-0">Prioridade:</span>
              {[
                { id: "all", label: "Todas" },
                { id: "Alta", label: "Alta" },
                { id: "Média", label: "Média" },
                { id: "Baixa", label: "Baixa" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPriorityFilter(opt.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                    priorityFilter === opt.id
                      ? "bg-primary border-transparent text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Subject filter */}
            {subjects.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide shrink-0">Matéria:</span>
                <button
                  onClick={() => setSubjectFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                    subjectFilter === "all"
                      ? "bg-primary border-transparent text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
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
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? `${colors.bg} ${colors.border} ${colors.text} ring-1 ring-primary/20`
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
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
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {/* No subjects */}
        {!isLoading && !error && subjects.length === 0 && (
          <div className="text-center py-10 bg-white border border-border rounded-xl p-6 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-light border border-border mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Nenhuma matéria cadastrada</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              Você precisa criar uma matéria antes de adicionar atividades.
            </p>
            <Link
              to="/subjects"
              className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer"
            >
              Criar matéria
            </Link>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && subjects.length > 0 && (!hasAnyData || visibleActivities.length === 0) && (
          <div className="text-center py-10 bg-white border border-border rounded-xl p-6 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-55 border border-gray-200 mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {!hasAnyData ? "Nenhuma atividade cadastrada" : "Nenhuma atividade corresponde aos filtros"}
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              {!hasAnyData
                ? "Crie suas atividades acadêmicas vinculadas às matérias."
                : "Tente limpar os filtros para encontrar o que procura."}
            </p>
            {!hasAnyData ? (
              <button
                onClick={handleOpenCreate}
                className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Criar primeira atividade
              </button>
            ) : (
              <button
                onClick={() => { setSearchQuery(""); setStatusFilter("all"); setPriorityFilter("all"); setSubjectFilter("all"); }}
                className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium transition-all cursor-pointer hover:bg-gray-50"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* Activities list */}
        {!isLoading && !error && visibleActivities.length > 0 && (
          <div>
            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
              {statusFilter === "all" ? (
                <>
                  {hasAnyPending && (
                    <div className="space-y-3">
                      <h2 className="text-xs font-semibold text-primary uppercase tracking-wide px-1">
                        Pendentes ({filteredPending.length})
                      </h2>
                      {filteredPending.map((act) => (
                        <ActivityCard key={act.id} activity={act} onToggle={toggleStatus} onEdit={handleOpenEdit} onDelete={setDeleteConfirm} />
                      ))}
                    </div>
                  )}
                  {hasAnyCompleted && (
                    <div className="space-y-3 mt-6">
                      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
                        Concluídas ({filteredCompleted.length})
                      </h2>
                      {filteredCompleted.map((act) => (
                        <ActivityCard key={act.id} activity={act} onToggle={toggleStatus} onEdit={handleOpenEdit} onDelete={setDeleteConfirm} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  {visibleActivities.map((act) => (
                    <ActivityCard key={act.id} activity={act} onToggle={toggleStatus} onEdit={handleOpenEdit} onDelete={setDeleteConfirm} />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop View (List or Board) */}
            <div className="hidden lg:block">
              {viewMode === "list" ? (
                <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full border-collapse text-left text-sm text-gray-900">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide w-12 text-center">✓</th>
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">Tarefa</th>
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">Disciplina</th>
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide">Tipo</th>
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide w-24">Prioridade</th>
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide w-32">Prazo</th>
                        <th className="px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wide w-20 text-right">···</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {sortedVisibleActivities.map((act) => {
                        const isDone = act.status === "completed";
                        const subjectColor = act.subject?.color || "indigo";
                        const colors = colorMap[subjectColor] || colorMap.indigo;
                        const dueLabel = formatDate(act.dueDate);

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        const tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);
                        
                        const twoDays = new Date(today);
                        twoDays.setDate(today.getDate() + 2);
                        
                        const threeDays = new Date(today);
                        threeDays.setDate(today.getDate() + 3);

                        const due = act.dueDate ? new Date(act.dueDate) : null;
                        if (due) due.setHours(0, 0, 0, 0);

                        const isOverdue = !isDone && due && due < today;
                        const isToday = !isDone && due && due.getTime() === today.getTime();
                        const isTomorrow = !isDone && due && due.getTime() === tomorrow.getTime();
                        const isSoon = !isDone && due && (due.getTime() === twoDays.getTime() || due.getTime() === threeDays.getTime());

                        return (
                          <tr
                            key={act.id}
                            className={`transition-colors duration-150 ${isDone ? "opacity-60 bg-gray-50/30" : "hover:bg-gray-50/40"}`}
                          >
                            <td className="px-5 py-3.5 text-center">
                              <button
                                onClick={() => toggleStatus(act)}
                                className={`w-5 h-5 mx-auto rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                                  isDone
                                    ? "bg-gray-900 border-gray-900 text-white"
                                    : "border-gray-300 bg-white hover:border-gray-400"
                                }`}
                              >
                                {isDone && (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </button>
                            </td>

                            <td className="px-5 py-3.5">
                              <div className="flex flex-col">
                                <span className={`font-medium text-sm leading-snug ${isDone ? "line-through text-gray-400" : "text-gray-900"}`}>
                                  {act.title}
                                </span>
                                {(act as any).description && (
                                  <span className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">
                                    {(act as any).description}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="px-5 py-3.5">
                              {act.subject ? (
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${colors.chip}`} />
                                  {act.subject.name}
                                </span>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>

                            <td className="px-5 py-3.5">
                              {act.type ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                  {act.type}
                                </span>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>

                            <td className="px-5 py-3.5">
                              {act.priority ? (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  act.priority === "Alta"
                                    ? "bg-red-50 text-red-500"
                                    : act.priority === "Baixa"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-blue-50 text-blue-500"
                                }`}>
                                  {act.priority}
                                </span>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>

                            <td className="px-5 py-3.5">
                              {dueLabel ? (
                                <span className={`text-xs font-medium inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border ${
                                  isOverdue
                                    ? "bg-red-50 text-red-500 border-red-100"
                                    : isToday
                                    ? "bg-orange-50 text-orange-500 border-orange-100"
                                    : isTomorrow
                                    ? "bg-orange-50 text-orange-500 border-orange-100"
                                    : isSoon
                                    ? "bg-orange-50 text-orange-500 border-orange-100"
                                    : "bg-gray-50 text-gray-500 border-gray-150"
                                }`}>
                                  {isOverdue && <span className="mr-0.5 text-xs">⚠</span>}
                                  {isToday && <span className="mr-0.5 text-xs">⏰</span>}
                                  {isTomorrow && (
                                    <>
                                      <span className="mr-0.5 text-xs">⚠</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    </>
                                  )}
                                  {isSoon && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 shrink-0">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )}
                                  {!isOverdue && !isToday && !isTomorrow && !isSoon && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 shrink-0 opacity-40">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
                                  )}
                                  <span>
                                    {isOverdue ? "Atrasado" : isToday ? "Hoje" : isTomorrow ? "Amanhã" : ""} {dueLabel}
                                  </span>
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">Sem prazo</span>
                              )}
                            </td>

                            <td className="px-5 py-3.5 text-right relative">
                              <div className="inline-block text-left">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdownId(activeDropdownId === act.id ? null : act.id);
                                  }}
                                  className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-white text-gray-400 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 transition-all cursor-pointer text-lg font-bold"
                                >
                                  ···
                                </button>
                                
                                {activeDropdownId === act.id && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-30"
                                      onClick={() => setActiveDropdownId(null)}
                                    />
                                    <div className="absolute right-0 mt-1 w-32 rounded-xl bg-white border border-gray-100 shadow-lg py-1 z-40 text-left">
                                      <button
                                        onClick={() => {
                                          setActiveDropdownId(null);
                                          handleOpenEdit(act);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                                          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                        </svg>
                                        Editar
                                      </button>
                                      <button
                                        onClick={() => {
                                          setActiveDropdownId(null);
                                          setDeleteConfirm(act);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50/50 transition-colors flex items-center gap-2 cursor-pointer"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-red-400">
                                          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4z" clipRule="evenodd" />
                                        </svg>
                                        Excluir
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Board View */
                <div className="grid grid-cols-3 gap-4 text-left">
                  {/* Coluna A fazer */}
                  <div className="bg-gray-50/30 border border-gray-150 rounded-xl p-4 min-h-[450px]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-700">A fazer</span>
                      <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">
                        {sortedVisibleActivities.filter(act => act.status === "pending" && !isActivityUrgent(act)).length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {sortedVisibleActivities
                        .filter(act => act.status === "pending" && !isActivityUrgent(act))
                        .map(act => renderBoardCard(act))}
                      {sortedVisibleActivities.filter(act => act.status === "pending" && !isActivityUrgent(act)).length === 0 && (
                        <div className="text-center py-12 text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
                          Nenhuma tarefa
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coluna Em andamento */}
                  <div className="bg-gray-50/30 border border-gray-150 rounded-xl p-4 min-h-[450px] border-t-2 border-t-blue-400">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-600">Em andamento</span>
                      <span className="text-xs bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 font-medium">
                        {sortedVisibleActivities.filter(act => act.status === "pending" && isActivityUrgent(act)).length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {sortedVisibleActivities
                        .filter(act => act.status === "pending" && isActivityUrgent(act))
                        .map(act => renderBoardCard(act))}
                      {sortedVisibleActivities.filter(act => act.status === "pending" && isActivityUrgent(act)).length === 0 && (
                        <div className="text-center py-12 text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
                          Nenhuma tarefa em andamento
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coluna Concluída */}
                  <div className="bg-gray-50/30 border border-gray-150 rounded-xl p-4 min-h-[450px] border-t-2 border-t-green-400">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-green-600">Concluída</span>
                      <span className="text-xs bg-green-50 text-green-600 rounded-full px-2 py-0.5 font-medium">
                        {sortedVisibleActivities.filter(act => act.status === "completed").length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {sortedVisibleActivities
                        .filter(act => act.status === "completed")
                        .map(act => renderBoardCard(act))}
                      {sortedVisibleActivities.filter(act => act.status === "completed").length === 0 && (
                        <div className="text-center py-12 text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
                          Nenhuma tarefa concluída
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-gray-400 font-medium mt-6">
              {visibleActivities.length} {visibleActivities.length === 1 ? "atividade listada" : "atividades listadas"}
            </p>
          </div>
        )}
      </main>

      <ActivityModal
        isOpen={isModalOpen}
        activity={editingActivity}
        subjects={subjects}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-100 rounded-xl p-6 shadow-2xl text-gray-900">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Excluir atividade?</h3>
            <p className="text-gray-500 text-sm mb-6">
              A atividade <strong className="text-gray-900">{deleteConfirm.title}</strong> será excluída permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 h-10 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-all cursor-pointer"
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
