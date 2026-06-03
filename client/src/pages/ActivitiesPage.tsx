import { useState } from "react";
import { useActivities } from "../hooks/useActivities";
import { useSubjects } from "../hooks/useSubjects";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import BottomNavBar from "../components/BottomNavBar";
import type { Activity } from "../types";

export default function ActivitiesPage() {
  const { pending, completed, isLoading, error, createActivity, updateActivity, toggleStatus, deleteActivity } = useActivities();
  const { subjects } = useSubjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Activity | null>(null);

  function handleOpenCreate() {
    setEditingActivity(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(activity: Activity) {
    setEditingActivity(activity);
    setIsModalOpen(true);
  }

  async function handleSave(data: { title: string; subjectId: string; dueDate?: string | null }) {
    if (editingActivity) {
      await updateActivity(editingActivity.id, data);
    } else {
      await createActivity(data);
    }
  }

  async function handleConfirmDelete() {
    if (deleteConfirm) {
      await deleteActivity(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  }

  const hasAny = pending.length > 0 || completed.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-white">Atividades</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
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

        {/* Empty state global */}
        {!isLoading && !error && !hasAny && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-500/10 border border-secondary-400/20 mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Nenhuma atividade cadastrada
            </h3>
            <p className="text-primary-300 text-sm max-w-sm mx-auto mb-6">
              Crie suas atividades acadêmicas vinculadas às matérias. Acompanhe
              prazos e marque como concluídas conforme avança.
            </p>
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Criar primeira atividade
            </button>
          </div>
        )}

        {/* Seção Pendentes */}
        {!isLoading && pending.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-primary-300 uppercase tracking-wider mb-3">
              Pendentes ({pending.length})
            </h2>
            <div className="space-y-2.5">
              {pending.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggle={toggleStatus}
                  onEdit={handleOpenEdit}
                  onDelete={setDeleteConfirm}
                />
              ))}
            </div>
          </section>
        )}

        {/* Seção Concluídas */}
        {!isLoading && completed.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">
              Concluídas ({completed.length})
            </h2>
            <div className="space-y-2.5">
              {completed.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggle={toggleStatus}
                  onEdit={handleOpenEdit}
                  onDelete={setDeleteConfirm}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FAB — Botão flutuante para criar */}
      {!isLoading && hasAny && (
        <button
          onClick={handleOpenCreate}
          className="fixed right-5 bottom-22 z-30 w-14 h-14 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/50 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          title="Nova atividade"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H5.25a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      )}

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
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-primary-300 font-medium hover:bg-white/10 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
