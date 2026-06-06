import type { Activity } from "../types";
import { colorMap } from "./SubjectCard";

interface ActivityCardProps {
  activity: Activity;
  onToggle: (activity: Activity) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
}

function formatDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export default function ActivityCard({ activity, onToggle, onEdit, onDelete }: ActivityCardProps) {
  const isDone = activity.status === "completed";
  const subjectColor = activity.subject?.color || "indigo";
  const colors = colorMap[subjectColor] || colorMap.indigo;
  const dueLabel = formatDate(activity.dueDate);

  // Verifica se está atrasada
  const isOverdue =
    !isDone && activity.dueDate && new Date(activity.dueDate) < new Date();

  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 transition-all duration-300 shadow-sm ${
        isDone ? "opacity-55" : "hover:bg-white/[0.07] hover:scale-[1.01]"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(activity)}
        className={`mt-0.5 w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer ${
          isDone
            ? `${colors.chip} border-transparent`
            : `border-white/20 hover:border-primary-400 bg-white/5`
        }`}
      >
        {isDone && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug ${isDone ? "line-through text-primary-500" : "text-white"}`}>
          {activity.title}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {/* Badge da matéria */}
          {activity.subject && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold ${colors.bg} ${colors.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.chip}`} />
              {activity.subject.name}
            </span>
          )}
          {/* Data */}
          {dueLabel && (
            <span className={`text-[11px] font-medium ${isOverdue ? "text-red-400" : "text-primary-400"}`}>
              📅 {dueLabel}
            </span>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(activity)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-primary-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          title="Editar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(activity)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-primary-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
          title="Excluir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
