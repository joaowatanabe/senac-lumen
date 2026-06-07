import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSubjects } from "../hooks/useSubjects";
import SubjectCard from "../components/SubjectCard";
import SubjectModal from "../components/SubjectModal";
import type { Subject } from "../types";

export default function SubjectsPage() {
  const { subjects, isLoading, error, createSubject, updateSubject, deleteSubject } = useSubjects();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Subject | null>(null);

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      handleOpenCreate();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleOpenCreate() {
    setEditingSubject(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(subject: Subject) {
    setEditingSubject(subject);
    setIsModalOpen(true);
  }

  async function handleSave(data: { name: string; color: string; category?: string; icon?: string }) {
    if (editingSubject) {
      await updateSubject(editingSubject.id, data);
    } else {
      await createSubject(data);
    }
  }

  async function handleConfirmDelete() {
    if (deleteConfirm) {
      await deleteSubject(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header (Móvel apenas) */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-10 lg:hidden">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/dashboard" className="text-primary-300 hover:text-white transition-colors cursor-pointer" title="Voltar ao início">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <span className="text-sm font-bold text-white uppercase tracking-wider">Configurações</span>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-md lg:max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-8 lg:py-8">
        {/* Título administrativo com descrição */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Gerenciar Matérias</h1>
            <p className="mt-1 text-primary-300/80 text-sm max-w-xl">
              Cadastre e organize as matérias usadas para rastrear suas atividades, planejar sua grade semanal e registrar sessões Pomodoro.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="h-11 md:w-auto px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-primary-950/20 shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Nova matéria
          </button>
        </div>

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

        {/* Empty state */}
        {!isLoading && !error && subjects.length === 0 && (
          <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm shadow-black/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Nenhuma matéria cadastrada
            </h3>
            <p className="text-primary-300/80 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              Comece cadastrando suas disciplinas. Cada matéria terá uma cor para
              facilitar a organização das suas atividades e sessões de estudo.
            </p>
            <button
              onClick={handleOpenCreate}
              className="h-11 px-5 inline-flex items-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Cadastrar primeira matéria
            </button>
          </div>
        )}

        {/* Lista de matérias */}
        {!isLoading && subjects.length > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onEdit={handleOpenEdit}
                  onDelete={setDeleteConfirm}
                />
              ))}
            </div>
            <p className="text-center text-xs text-primary-400 font-bold uppercase tracking-wider">
              {subjects.length} {subjects.length === 1 ? "matéria cadastrada" : "matérias cadastradas"}
            </p>
          </div>
        )}
      </main>

      {/* Modal de criação/edição */}
      <SubjectModal
        isOpen={isModalOpen}
        subject={editingSubject}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Modal de confirmação de exclusão */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative w-full max-w-sm bg-primary-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
            <h3 className="text-lg font-bold text-white mb-2">Excluir matéria?</h3>
            <p className="text-primary-300 text-sm mb-6">
              A matéria <strong className="text-white">{deleteConfirm.name}</strong> será
              excluída permanentemente, junto com todas as atividades e sessões vinculadas.
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
