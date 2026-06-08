import { useState, useEffect } from "react";
import { useSubjects } from "../hooks/useSubjects";
import { activityService } from "../services/activityService";
import { pomodoroService } from "../services/pomodoroService";

interface GlobalCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalCreateModal({ isOpen, onClose }: GlobalCreateModalProps) {
  const { subjects } = useSubjects();
  
  const [activeTab, setActiveTab] = useState<"tarefa" | "sessao">("tarefa");
  
  // Form states - Tarefa
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [type, setType] = useState("Tarefa");
  const [priority, setPriority] = useState("Média");
  const [dueDate, setDueDate] = useState("");
  
  // Form states - Sessão
  const [sessionSubjectId, setSessionSubjectId] = useState("");
  const [duration, setDuration] = useState(25);
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setActiveTab("tarefa");
      setTitle("");
      setSubjectId(subjects[0]?.id || "");
      setType("Tarefa");
      setPriority("Média");
      setDueDate("");
      
      setSessionSubjectId(subjects[0]?.id || "");
      setDuration(25);
      setError("");
      setToastMessage("");
    }
  }, [isOpen, subjects]);

  // Toast auto-clear and reload
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => {
        setToastMessage("");
        onClose();
        window.location.reload();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [toastMessage, onClose]);

  if (!isOpen) return null;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (activeTab === "tarefa") {
        if (!title.trim()) {
          throw new Error("O título da tarefa é obrigatório.");
        }
        if (!subjectId) {
          throw new Error("Selecione uma matéria.");
        }
        await activityService.create({
          title: title.trim(),
          subjectId,
          dueDate: dueDate || undefined,
          type,
          priority,
        });
        setToastMessage("Tarefa criada com sucesso!");
      } else {
        if (!sessionSubjectId) {
          throw new Error("Selecione uma matéria para a sessão.");
        }
        if (duration <= 0) {
          throw new Error("A duração deve ser maior que 0 minutos.");
        }
        await pomodoroService.createSession({
          subjectId: sessionSubjectId,
          durationMinutes: duration,
        });
        setToastMessage("Sessão registrada com sucesso!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar requisição.");
      setIsSubmitting(false);
    }
  }

  // Mapeamento local para bolinhas coloridas de matéria
  const dotColorMap: Record<string, string> = {
    indigo: "bg-indigo-500",
    sky: "bg-sky-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white font-semibold rounded-2xl px-5 py-3 shadow-xl flex items-center gap-2 animate-[fadeIn_0.15s_ease-out]">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal/Sheet Content Box */}
      <div className="relative w-full lg:max-w-lg bg-white rounded-t-3xl lg:rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out] z-50 max-h-[90vh] overflow-y-auto text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Criar novo</h2>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all cursor-pointer font-extrabold text-lg"
          >
            &times;
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="bg-gray-100 rounded-xl p-1 flex w-full gap-1 mb-6">
          <button
            type="button"
            onClick={() => { setError(""); setActiveTab("tarefa"); }}
            className={`py-2 px-3 flex-1 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "tarefa"
                ? "bg-white shadow-xs text-gray-900"
                : "text-gray-400 hover:text-gray-650"
            }`}
          >
            {/* List Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.002 5.25h-.002v.008h.002V12zm-.002 5.25h-.002v.008h.002v-.008z" />
            </svg>
            Tarefa
          </button>
          <button
            type="button"
            onClick={() => { setError(""); setActiveTab("sessao"); }}
            className={`py-2 px-3 flex-1 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "sessao"
                ? "bg-white shadow-xs text-gray-900"
                : "text-gray-400 hover:text-gray-655"
            }`}
          >
            {/* Clock Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sessão
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 text-xs rounded-xl px-4 py-3 font-semibold border border-red-150">
              {error}
            </div>
          )}

          {activeTab === "tarefa" ? (
            /* MODO TAREFA */
            <>
              {/* Título */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Título</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex.: Lista de funções"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
                />
              </div>

              {/* Disciplina Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Disciplina</label>
                {subjects.length === 0 ? (
                  <p className="text-xs text-gray-400 py-1">Nenhuma matéria criada. Crie matérias primeiro.</p>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                    {subjects.map((sub) => {
                      const isSelected = subjectId === sub.id;
                      const dotBg = dotColorMap[sub.color] || "bg-indigo-500";
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setSubjectId(sub.id)}
                          className={`px-3 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : dotBg}`} />
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Tipo</label>
                <div className="flex bg-gray-150 p-1 rounded-xl gap-1">
                  {[
                    { id: "Tarefa", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.002 5.25h-.002v.008h.002V12zm-.002 5.25h-.002v.008h.002v-.008z" />
                      </svg>
                    )},
                    { id: "Trabalho", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                    )},
                    { id: "Prova", icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84a50.58 50.58 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    )},
                  ].map((item) => {
                    const isSelected = type === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setType(item.id)}
                        className={`py-2 flex-1 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-black text-white"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {item.icon}
                        {item.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prioridade */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Prioridade</label>
                <div className="flex bg-gray-150 p-1 rounded-xl gap-1">
                  {["Baixa", "Média", "Alta"].map((item) => {
                    const isSelected = priority === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setPriority(item)}
                        className={`py-2 flex-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? "bg-black text-white"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prazo */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Prazo (opcional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
                />
              </div>
            </>
          ) : (
            /* MODO SESSÃO */
            <>
              {/* Matéria dropdown select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Matéria</label>
                {subjects.length === 0 ? (
                  <p className="text-xs text-gray-400 py-1">Nenhuma matéria criada. Crie matérias primeiro.</p>
                ) : (
                  <select
                    value={sessionSubjectId}
                    onChange={(e) => setSessionSubjectId(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all cursor-pointer"
                  >
                    <option value="">Selecione uma matéria</option>
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Duração */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Duração (minutos)</label>
                <input
                  type="number"
                  min="1"
                  max="480"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all"
                />
              </div>
            </>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              type="button"
              className="py-3 px-4 rounded-xl text-gray-500 font-semibold text-sm hover:text-gray-700 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isSubmitting ? "Criando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
