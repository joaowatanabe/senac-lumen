import type { Subject } from "../types";

const colorMap: Record<string, { bg: string; border: string; text: string; chip: string }> = {
  indigo:  { bg: "bg-indigo-50",  border: "border-indigo-200",  text: "text-indigo-700",  chip: "bg-indigo-600" },
  sky:     { bg: "bg-sky-50",     border: "border-sky-200",     text: "text-sky-700",     chip: "bg-sky-500" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", chip: "bg-emerald-600" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   chip: "bg-amber-500" },
  rose:    { bg: "bg-rose-50",    border: "border-rose-200",    text: "text-rose-700",    chip: "bg-rose-500" },
  violet:  { bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-700",  chip: "bg-violet-600" },
  orange:  { bg: "bg-orange-50",  border: "border-orange-200",  text: "text-orange-700",  chip: "bg-orange-500" },
  teal:    { bg: "bg-teal-50",    border: "border-teal-200",    text: "text-teal-700",    chip: "bg-teal-600" },
};

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
}

export default function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  const colors = colorMap[subject.color] || colorMap.indigo;
  const activities = subject.activities || [];
  const totalTasks = activities.length;
  const completedTasks = activities.filter((a) => a.status === "completed").length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:border-indigo-400 shadow-sm relative group">
      
      {/* Top Section: Icon, Info & Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon Block */}
          <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${colors.bg} border ${colors.border} ${colors.text} text-xl shrink-0`}>
            {subject.icon || "📚"}
          </div>
          
          <div className="min-w-0">
            <span className="font-bold text-gray-900 text-base truncate block leading-snug">
              {subject.name}
            </span>
            {subject.category ? (
              <span className="inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wider">
                {subject.category}
              </span>
            ) : (
              <span className="inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-transparent text-gray-400 border border-dashed border-gray-200 uppercase tracking-wider">
                Geral
              </span>
            )}
          </div>
        </div>

        {/* Actions - Subtle, styled icons */}
        <div className="flex items-center gap-1 opacity-60 hover:opacity-100 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(subject)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200 cursor-pointer"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(subject)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-650 hover:border-red-150 transition-all border border-gray-200 cursor-pointer"
            title="Excluir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Section: Progress & Tasks count */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">
            {totalTasks === 0 ? "Sem tarefas" : `${completedTasks} de ${totalTasks} concluídas`}
          </span>
          {totalTasks > 0 && <span className="font-bold text-gray-900">{progressPercent}%</span>}
        </div>
        
        <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${colors.chip}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

    </div>
  );
}

export { colorMap };
