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
    <div className="min-h-full bg-surface font-sans w-full">
      {/* Mobile header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 lg:hidden">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/dashboard" className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="Voltar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <span className="text-base font-bold text-gray-900">Disciplinas</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 lg:pb-8 space-y-6">

        {/* Desktop actions row */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500 max-w-xl">
            Cadastre e organize as matérias para rastrear atividades, planejar sua grade semanal e registrar sessões de estudo.
          </p>
          <button
            onClick={handleOpenCreate}
            className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer shadow-sm shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Nova matéria
          </button>
        </div>

        {/* Mobile add button */}
        <div className="lg:hidden">
          <button
            onClick={handleOpenCreate}
            className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer"
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
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && subjects.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-white p-6 shadow-sm max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-light border border-border mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Nenhuma matéria cadastrada</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto mb-6 leading-relaxed">
              Comece cadastrando suas disciplinas. Cada matéria terá uma cor para facilitar a organização.
            </p>
            <button
              onClick={handleOpenCreate}
              className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Cadastrar primeira matéria
            </button>
          </div>
        )}

        {/* Subjects grid */}
        {!isLoading && subjects.length > 0 && (
          <div className="space-y-4">
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
            <p className="text-center text-xs text-gray-400 font-medium">
              {subjects.length} {subjects.length === 1 ? "matéria cadastrada" : "matérias cadastradas"}
            </p>
          </div>
        )}
      </main>

      {/* Subject modal */}
      <SubjectModal
        isOpen={isModalOpen}
        subject={editingSubject}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-white border border-gray-100 rounded-xl p-6 shadow-2xl text-gray-900">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Excluir matéria?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              A matéria <strong className="text-gray-900">{deleteConfirm.name}</strong> será excluída permanentemente, junto com todas as atividades e sessões vinculadas.
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
