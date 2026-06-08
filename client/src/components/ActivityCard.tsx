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
  // Use UTC safe slicing to prevent timezone offsets shifting the date
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

export default function ActivityCard({ activity, onToggle, onEdit, onDelete }: ActivityCardProps) {
  const isDone = activity.status === "completed";
  const subjectColor = activity.subject?.color || "indigo";
  const colors = colorMap[subjectColor] || colorMap.indigo;
  const dueLabel = formatDate(activity.dueDate);

  // Verifica se está atrasada (data no passado e não concluída)
  const isOverdue = !isDone && activity.dueDate && (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(activity.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  })();

  // Verifica se vence hoje
  const isToday = !isDone && activity.dueDate && (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(activity.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  })();

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-4 flex items-start gap-3.5 transition-all duration-300 shadow-sm relative group ${
        isDone ? "opacity-55" : "hover:scale-[1.01] hover:border-indigo-400"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(activity)}
        className={`mt-0.5 w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer ${
          isDone
            ? `bg-emerald-500 border-transparent text-white`
            : `border-gray-300 bg-gray-50 hover:border-indigo-500`
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
        <p className={`text-sm font-semibold leading-snug ${isDone ? "line-through text-gray-400" : "text-gray-900"}`}>
          {activity.title}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {/* Badge da matéria */}
          {activity.subject && (
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.chip}`} />
              {activity.subject.name}
            </span>
          )}

          {/* Badge de Tipo */}
          {activity.type && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold bg-gray-150 text-gray-650 border border-gray-250 uppercase tracking-wide">
              {activity.type}
            </span>
          )}

          {/* Badge de Prioridade */}
          {activity.priority && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wide ${
              activity.priority === "Alta"
                ? "bg-red-50 text-red-700 border-red-200"
                : activity.priority === "Baixa"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {activity.priority}
            </span>
          )}

          {/* Data */}
          {dueLabel && (
            <span className={`text-[10px] font-bold flex items-center gap-1 px-2 py-0.5 rounded-lg border ${
              isOverdue
                ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                : isToday
                ? "bg-amber-50 text-amber-700 border-amber-200 font-bold"
                : "bg-gray-50 text-gray-500 border-gray-200"
            }`}>
              {isOverdue ? "⚠️ Atrasado: " : isToday ? "⏰ Hoje: " : "📅 "}
              {dueLabel}
            </span>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-1 shrink-0 opacity-60 hover:opacity-100 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(activity)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200 cursor-pointer"
          title="Editar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(activity)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-650 hover:border-red-150 transition-all border border-gray-200 cursor-pointer"
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
