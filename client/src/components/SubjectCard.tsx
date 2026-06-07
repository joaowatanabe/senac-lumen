import type { Subject } from "../types";

const colorMap: Record<string, { bg: string; border: string; text: string; chip: string }> = {
  indigo:  { bg: "bg-indigo-500/10",  border: "border-indigo-400/30",  text: "text-indigo-300",  chip: "bg-indigo-500" },
  sky:     { bg: "bg-sky-500/10",     border: "border-sky-400/30",     text: "text-sky-300",     chip: "bg-sky-500" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-400/30", text: "text-emerald-300", chip: "bg-emerald-500" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-400/30",   text: "text-amber-300",   chip: "bg-amber-500" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-400/30",    text: "text-rose-300",    chip: "bg-rose-500" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-400/30",  text: "text-violet-300",  chip: "bg-violet-500" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-400/30",  text: "text-orange-300",  chip: "bg-orange-500" },
  teal:    { bg: "bg-teal-500/10",    border: "border-teal-400/30",    text: "text-teal-300",    chip: "bg-teal-500" },
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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:bg-white/[0.07] shadow-sm hover:shadow relative group">
      
      {/* Top Section: Icon, Info & Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon Block */}
          <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${colors.bg} border ${colors.border} ${colors.text} text-xl shrink-0`}>
            {subject.icon || "📚"}
          </div>
          
          <div className="min-w-0">
            <span className="font-bold text-white text-base truncate block leading-snug">
              {subject.name}
            </span>
            {subject.category ? (
              <span className="inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-primary-300 border border-white/5 uppercase tracking-wider">
                {subject.category}
              </span>
            ) : (
              <span className="inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-transparent text-primary-400/50 border border-dashed border-white/10 uppercase tracking-wider">
                Geral
              </span>
            )}
          </div>
        </div>

        {/* Actions - Subtle, styled icons */}
        <div className="flex items-center gap-1 opacity-60 hover:opacity-100 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(subject)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-primary-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(subject)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-primary-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
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
        <div className="flex items-center justify-between text-xs text-primary-300/80">
          <span className="font-medium">
            {totalTasks === 0 ? "Sem tarefas" : `${completedTasks} de ${totalTasks} concluídas`}
          </span>
          {totalTasks > 0 && <span className="font-bold text-white">{progressPercent}%</span>}
        </div>
        
        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
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

