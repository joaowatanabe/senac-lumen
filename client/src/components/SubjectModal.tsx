import { useState, useEffect, type FormEvent } from "react";
import type { Subject } from "../types";
import { colorMap } from "./SubjectCard";

const AVAILABLE_COLORS = ["indigo", "sky", "emerald", "amber", "rose", "violet", "orange", "teal"];
const AVAILABLE_ICONS = ["📚", "💻", "🔬", "📐", "🎨", "🧪", "🌍", "🧠", "📝", "💡"];

const colorLabels: Record<string, string> = {
  indigo: "Índigo",
  sky: "Azul",
  emerald: "Verde",
  amber: "Âmbar",
  rose: "Rosa",
  violet: "Violeta",
  orange: "Laranja",
  teal: "Turquesa",
};

interface SubjectModalProps {
  isOpen: boolean;
  subject: Subject | null; // null = criar, Subject = editar
  onClose: () => void;
  onSave: (data: { name: string; color: string; category?: string; icon?: string }) => Promise<void>;
}

export default function SubjectModal({ isOpen, subject, onClose, onSave }: SubjectModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("indigo");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("📚");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!subject;

  // Preenche o formulário ao abrir para edição
  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setColor(subject.color);
      setCategory(subject.category || "");
      setIcon(subject.icon || "📚");
    } else {
      setName("");
      setColor("indigo");
      setCategory("");
      setIcon("📚");
    }
    setError("");
  }, [subject, isOpen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("O nome da matéria é obrigatório.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        name: name.trim(),
        color,
        category: category.trim() || undefined,
        icon,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar matéria.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out] max-h-[90vh] overflow-y-auto text-gray-900">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          {isEditing ? "Editar matéria" : "Nova matéria"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Erro */}
          {error && (
            <div className="bg-red-50 border border-red-150 rounded-xl px-4 py-3 text-red-700 text-xs font-semibold leading-relaxed animate-[fadeIn_0.15s_ease-out]">
              ⚠️ {error}
            </div>
          )}

          {/* Nome */}
          <div className="space-y-1.5">
            <label htmlFor="subject-name" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Nome da matéria
            </label>
            <input
              id="subject-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Matemática"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          {/* Categoria */}
          <div className="space-y-1.5">
            <label htmlFor="subject-category" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
              Categoria (opcional)
            </label>
            <input
              id="subject-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Exatas, Humanas, Idiomas"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          {/* Seletor de ícone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Ícone</label>
            <div className="grid grid-cols-5 gap-2">
              {AVAILABLE_ICONS.map((i) => {
                const isSelected = icon === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIcon(i)}
                    className={`flex items-center justify-center h-11 rounded-xl border text-xl transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500/15 font-bold"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seletor de cor */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Cor</label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_COLORS.map((c) => {
                const isSelected = color === c;
                const chipColor = colorMap[c]?.chip || "bg-gray-500";
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500/15 font-bold"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${chipColor} shrink-0`} />
                    <span className="truncate">{colorLabels[c]}</span>
                  </button>
                );
              })}
            </div>
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
              disabled={isSubmitting}
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
