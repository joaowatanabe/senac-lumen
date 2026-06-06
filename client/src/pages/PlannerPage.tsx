import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlanner } from "../hooks/usePlanner";
import { useSubjects } from "../hooks/useSubjects";
import { colorMap } from "../components/SubjectCard";
import BottomNavBar from "../components/BottomNavBar";

const DAYS = [
  { label: "Dom", value: 0 },
  { label: "Seg", value: 1 },
  { label: "Ter", value: 2 },
  { label: "Qua", value: 3 },
  { label: "Qui", value: 4 },
  { label: "Sex", value: 5 },
  { label: "Sáb", value: 6 },
];

const DAYS_FULL = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export default function PlannerPage() {
  const { getBlocksForDay, addBlock, removeBlock, isLoading, error } = usePlanner();
  const { subjects } = useSubjects();

  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDay, setModalDay] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [modalDuration, setModalDuration] = useState(45);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenModal(day: number) {
    setModalDay(day);
    setSelectedSubjectId(subjects[0]?.id || "");
    setModalDuration(45);
    setSubmitError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!selectedSubjectId) {
      setSubmitError("Selecione uma matéria.");
      return;
    }

    if (modalDuration < 15 || modalDuration > 480) {
      setSubmitError("A duração deve ser entre 15 e 480 minutos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addBlock({
        subjectId: selectedSubjectId,
        dayOfWeek: modalDay,
        durationMinutes: modalDuration,
      });
      setIsModalOpen(false);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao adicionar bloco de estudo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteBlock(id: string) {
    try {
      await removeBlock(id);
    } catch (err) {
      alert("Erro ao remover o bloco de estudo.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-white">Planner Semanal</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-primary-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Erro */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-2xl px-5 py-4 text-red-300 text-sm text-center mb-6">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            {subjects.length === 0 ? (
              <div className="text-center py-16 max-w-sm mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-400/20 mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Nenhuma matéria cadastrada
                </h3>
                <p className="text-primary-300 text-sm mb-6">
                  Crie uma matéria antes de planejar sua semana.
                </p>
                <Link
                  to="/subjects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all duration-200 cursor-pointer"
                >
                  Criar matéria
                </Link>
              </div>
            ) : (
              <>
                {/* layout Mobile (menor que md) */}
                <div className="md:hidden flex flex-col w-full">
                  {/* Tabs horizontais */}
                  <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-full overflow-x-auto justify-between no-scrollbar gap-1">
                    {DAYS.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setActiveDay(d.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex-grow text-center min-w-[44px] ${
                          activeDay === d.value
                            ? "bg-primary-600 text-white shadow-md font-semibold"
                            : "text-primary-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>

                  {/* Blocos do dia ativo */}
                  <div className="mt-6 flex flex-col gap-3">
                    {getBlocksForDay(activeDay).length === 0 ? (
                      /* Empty state */
                      <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-3xl mb-2">📅</span>
                        <h4 className="text-sm font-semibold text-white">
                          Nenhum bloco planejado para este dia.
                        </h4>
                        <p className="text-xs text-primary-300 mt-1 max-w-xs">
                          Adicione matérias para organizar sua semana.
                        </p>
                      </div>
                    ) : (
                      getBlocksForDay(activeDay).map((block) => {
                        const colors =
                          colorMap[block.subject?.color || "indigo"] || colorMap.indigo;
                        return (
                          <div
                            key={block.id}
                            className={`flex items-center justify-between gap-3 px-4 py-3 border rounded-xl transition-all duration-200 ${colors.bg} ${colors.border}`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-2.5 h-2.5 rounded-full ${colors.chip} shrink-0`} />
                              <span className={`text-sm font-medium ${colors.text} truncate`}>
                                {block.subject?.name}
                              </span>
                              <span className="text-xs text-white/50 shrink-0 font-medium">
                                {block.durationMinutes}min
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeleteBlock(block.id)}
                              className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
                              title="Remover bloco"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                              </svg>
                            </button>
                          </div>
                        );
                      })
                    )}

                    {/* Botão de adicionar bloco */}
                    <button
                      onClick={() => handleOpenModal(activeDay)}
                      className="mt-2 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-primary-200 hover:text-white text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      Adicionar bloco
                    </button>
                  </div>
                </div>

                {/* layout Desktop (a partir de md) */}
                <div className="hidden md:grid md:grid-cols-7 gap-4 items-start w-full">
                  {DAYS.map((day) => {
                    const dayBlocks = getBlocksForDay(day.value);
                    return (
                      <div
                        key={day.value}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col min-h-[360px] shadow-sm"
                      >
                        <h3 className="text-sm font-bold text-white text-center border-b border-white/10 pb-2 mb-3">
                          {day.label}
                        </h3>

                        <div className="flex flex-col gap-2.5 flex-grow">
                          {dayBlocks.length === 0 ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center py-12 px-2 border border-dashed border-white/10 rounded-xl">
                              <p className="text-xs font-semibold text-white/40">Livre</p>
                            </div>
                          ) : (
                            dayBlocks.map((block) => {
                              const colors =
                                colorMap[block.subject?.color || "indigo"] ||
                                colorMap.indigo;
                              return (
                                <div
                                  key={block.id}
                                  className={`flex items-center justify-between gap-2 px-3 py-2 border rounded-xl transition-all duration-200 hover:scale-[1.02] ${colors.bg} ${colors.border}`}
                                >
                                  <div className="flex flex-col min-w-0">
                                    <span className={`text-xs font-bold ${colors.text} truncate`}>
                                      {block.subject?.name}
                                    </span>
                                    <span className="text-[10px] text-white/50 font-medium mt-0.5">
                                      {block.durationMinutes}min
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteBlock(block.id)}
                                    className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
                                    title="Remover bloco"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-3.5 h-3.5"
                                    >
                                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>

                        <button
                          onClick={() => handleOpenModal(day.value)}
                          className="mt-4 w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-primary-200 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-3.5 h-3.5"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          Adicionar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Modal de criação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-primary-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl animate-[fadeIn_0.15s_ease-out]">
            <h2 className="text-xl font-bold text-white mb-5">Adicionar Bloco de Estudo</h2>

            <form onSubmit={handleSave} className="space-y-4">
              {submitError && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-red-300 text-sm">
                  {submitError}
                </div>
              )}

              {/* Matéria */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-primary-200">Matéria</label>
                {subjects.length === 0 ? (
                  <p className="text-sm text-primary-400 py-2">
                    Nenhuma matéria cadastrada. Por favor, crie uma matéria primeiro.
                  </p>
                ) : (
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
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

              {/* Dia da Semana */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-primary-200">
                  Dia da Semana
                </label>
                <select
                  value={modalDay}
                  onChange={(e) => setModalDay(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 cursor-pointer"
                >
                  {DAYS.map((d) => (
                    <option key={d.value} value={d.value} className="bg-primary-900 text-white">
                      {DAYS_FULL[d.value]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duração */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-primary-200">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  min="15"
                  max="480"
                  step="15"
                  value={modalDuration}
                  onChange={(e) => setModalDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-primary-300 font-medium hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || subjects.length === 0}
                  className="flex-1 py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
