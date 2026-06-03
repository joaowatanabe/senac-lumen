import { useState, useEffect, type FormEvent } from "react";
import type { Activity, Subject } from "../types";

interface ActivityModalProps {
  isOpen: boolean;
  activity: Activity | null; // null = criar
  subjects: Subject[];
  onClose: () => void;
  onSave: (data: { title: string; subjectId: string; dueDate?: string | null }) => Promise<void>;
}

export default function ActivityModal({ isOpen, activity, subjects, onClose, onSave }: ActivityModalProps) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!activity;

  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setSubjectId(activity.subjectId);
      setDueDate(activity.dueDate ? activity.dueDate.split("T")[0] : "");
    } else {
      setTitle("");
      setSubjectId(subjects[0]?.id || "");
      setDueDate("");
    }
    setError("");
  }, [activity, isOpen, subjects]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }
    if (!subjectId) {
      setError("Selecione uma matéria.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        subjectId,
        dueDate: dueDate || null,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar atividade.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-primary-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
        <h2 className="text-xl font-bold text-white mb-5">
          {isEditing ? "Editar atividade" : "Nova atividade"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Título */}
          <div className="space-y-1.5">
            <label htmlFor="activity-title" className="block text-sm font-medium text-primary-200">
              Título
            </label>
            <input
              id="activity-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entregar trabalho de cálculo"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Matéria */}
          <div className="space-y-1.5">
            <label htmlFor="activity-subject" className="block text-sm font-medium text-primary-200">
              Matéria
            </label>
            {subjects.length === 0 ? (
              <p className="text-sm text-primary-400 py-2">
                Nenhuma matéria cadastrada. Cadastre uma matéria primeiro.
              </p>
            ) : (
              <select
                id="activity-subject"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 cursor-pointer"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id} className="bg-primary-900 text-white">
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Data de entrega */}
          <div className="space-y-1.5">
            <label htmlFor="activity-date" className="block text-sm font-medium text-primary-200">
              Data de entrega <span className="text-primary-500">(opcional)</span>
            </label>
            <input
              id="activity-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 [color-scheme:dark]"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-primary-300 font-medium hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || subjects.length === 0}
              className="flex-1 py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
