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

  return (
    <div className="min-h-full bg-[#F8F8FA]">
      {/* Mobile header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 lg:hidden">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-base font-bold text-gray-900">Tarefas</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-8">

        {/* Desktop page header */}
        <div className="hidden lg:flex mb-6 items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Gerencie suas tarefas, prazos e prioridades acadêmicas.
            </p>
          </div>
          {!isLoading && !error && subjects.length > 0 && (
            <button
              onClick={handleOpenCreate}
              className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Nova atividade
            </button>
          )}
        </div>

        {/* Filter bar */}
        {!isLoading && !error && hasAnyData && (
            <div className="mb-6 bg-white border border-border rounded-xl p-4 shadow-sm space-y-3">
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

            {/* Desktop table */}
            <div className="hidden lg:block bg-white border border-border rounded-xl overflow-hidden shadow-sm">
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
                  {visibleActivities.map((act) => {
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
                                ? "bg-green-500 border-transparent text-white"
                                : "border-gray-200 bg-white hover:border-primary"
                            }`}
                          >
                            {isDone && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className={`font-medium text-sm leading-snug ${isDone ? "line-through text-gray-400" : "text-gray-900"}`}>
                            {act.title}
                          </span>
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
                            <span className={`text-xs font-medium inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
                              isOverdue
                                ? "bg-red-50 text-red-500"
                                : isToday
                                ? "bg-orange-50 text-orange-500"
                                : "bg-gray-100 text-gray-500"
                            }`}>
                              {isOverdue ? "⚠ " : isToday ? "⏰ " : ""}
                              {dueLabel}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">Sem prazo</span>
                          )}
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(act)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-400 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 transition-all cursor-pointer"
                              title="Editar"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(act)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-400 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all cursor-pointer"
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
