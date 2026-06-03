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

  return (
    <div
      className={`${colors.bg} border ${colors.border} rounded-2xl p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Chip de cor */}
        <div className={`w-4 h-4 rounded-full ${colors.chip} shrink-0`} />
        <span className={`font-medium ${colors.text} truncate`}>
          {subject.name}
        </span>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(subject)}
          className="p-2 rounded-lg hover:bg-white/10 text-primary-400 hover:text-white transition-colors cursor-pointer"
          title="Editar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(subject)}
          className="p-2 rounded-lg hover:bg-red-500/15 text-primary-400 hover:text-red-400 transition-colors cursor-pointer"
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

export { colorMap };
