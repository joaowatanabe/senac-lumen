import { useState, useEffect, type FormEvent } from "react";
import type { Subject } from "../types";
import { colorMap } from "./SubjectCard";

const AVAILABLE_COLORS = ["indigo", "sky", "emerald", "amber", "rose", "violet", "orange", "teal"];

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
  onSave: (data: { name: string; color: string }) => Promise<void>;
}

export default function SubjectModal({ isOpen, subject, onClose, onSave }: SubjectModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("indigo");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!subject;

  // Preenche o formulário ao abrir para edição
  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setColor(subject.color);
    } else {
      setName("");
      setColor("indigo");
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
      await onSave({ name: name.trim(), color });
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-primary-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
        <h2 className="text-xl font-bold text-white mb-5">
          {isEditing ? "Editar matéria" : "Nova matéria"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Erro */}
          {error && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Nome */}
          <div className="space-y-1.5">
            <label htmlFor="subject-name" className="block text-sm font-medium text-primary-200">
              Nome da matéria
            </label>
            <input
              id="subject-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Matemática"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Seletor de cor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary-200">Cor</label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_COLORS.map((c) => {
                const isSelected = color === c;
                const chipColor = colorMap[c]?.chip || "bg-gray-500";
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? `${chipColor}/20 border-white/30 text-white`
                        : "bg-white/5 border-white/5 text-primary-400 hover:border-white/15 hover:text-primary-200"
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
              disabled={isSubmitting}
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
