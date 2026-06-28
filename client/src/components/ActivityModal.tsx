import { useState, useEffect, type FormEvent } from "react";
import type { Activity, Subject } from "../types";

const AVAILABLE_TYPES = ["Prova", "Trabalho", "Exercício", "Leitura", "Outros"];
const AVAILABLE_PRIORITIES = ["Alta", "Média", "Baixa"];

interface ActivityModalProps {
  isOpen: boolean;
  activity: Activity | null; // null = criar
  subjects: Subject[];
  onClose: () => void;
  onSave: (data: {
    title: string;
    subjectId: string;
    dueDate?: string | null;
    type?: string | null;
    priority?: string;
  }) => Promise<void>;
}

export default function ActivityModal({ isOpen, activity, subjects, onClose, onSave }: ActivityModalProps) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("Média");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!activity;

  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setSubjectId(activity.subjectId);
      setDueDate(activity.dueDate ? activity.dueDate.split("T")[0] : "");
      setType(activity.type || "");
      setPriority(activity.priority || "Média");
    } else {
      setTitle("");
      setSubjectId(subjects[0]?.id || "");
      setDueDate("");
      setType("");
      setPriority("Média");
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
        type: type || null,
        priority,
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out] max-h-[90vh] overflow-y-auto text-gray-900">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          {isEditing ? "Editar atividade" : "Nova atividade"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-700 text-xs font-semibold leading-relaxed animate-[fadeIn_0.15s_ease-out]">
              ⚠️ {error}
            </div>
          )}

          {/* Título */}
          <div className="space-y-1.5">
            <label htmlFor="activity-title" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Título
            </label>
            <input
              id="activity-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entregar trabalho de cálculo"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          {/* Matéria */}
          <div className="space-y-1.5">
            <label htmlFor="activity-subject" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Matéria
            </label>
            {subjects.length === 0 ? (
              <p className="text-sm text-gray-500 py-2">
                Nenhuma matéria cadastrada. Cadastre uma matéria primeiro.
              </p>
            ) : (
              <select
                id="activity-subject"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 cursor-pointer"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id} className="bg-white text-gray-900">
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tipo de atividade */}
          <div className="space-y-1.5">
            <label htmlFor="activity-type" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Tipo
            </label>
            <select
              id="activity-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 cursor-pointer"
            >
              <option value="" className="bg-white text-gray-400">Selecionar tipo (opcional)</option>
              {AVAILABLE_TYPES.map((t) => (
                <option key={t} value={t} className="bg-white text-gray-900">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Prioridade */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Prioridade</label>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_PRIORITIES.map((p) => {
                const isSelected = priority === p;
                let activeColor = "bg-indigo-50 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500/15";
                if (p === "Alta") activeColor = "bg-red-50 border-red-200 text-red-700 ring-2 ring-red-500/15";
                if (p === "Baixa") activeColor = "bg-emerald-50 border-emerald-200 text-emerald-700 ring-2 ring-emerald-500/15";
                if (p === "Média") activeColor = "bg-amber-50 border-amber-200 text-amber-700 ring-2 ring-amber-500/15";
                
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`h-11 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? `${activeColor} font-bold`
                        : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data de entrega */}
          <div className="space-y-1.5">
            <label htmlFor="activity-date" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Data de entrega <span className="text-gray-400 lowercase">(opcional)</span>
            </label>
            <input
              id="activity-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 [color-scheme:light]"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-gray-500 font-semibold text-sm hover:text-gray-700 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || subjects.length === 0}
              className="flex-1 py-3 px-6 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
