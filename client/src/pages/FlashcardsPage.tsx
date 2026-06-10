import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { flashcardService } from "../services/flashcardService";
import { useSubjects } from "../hooks/useSubjects";
import type { Flashcard } from "../types";
import FlashcardReview from "../components/FlashcardReview";

export default function FlashcardsPage() {
  const [activeTab, setActiveTab] = useState<"review" | "manage">("review");
  const { subjects, isLoading: isLoadingSubjects } = useSubjects();

  // --- States for Review Mode ---
  const [reviewCards, setReviewCards] = useState<Flashcard[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [revisionsCount, setRevisionsCount] = useState(0);

  // --- States for Manage Mode ---
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [manageCards, setManageCards] = useState<Flashcard[]>([]);
  const [isLoadingManage, setIsLoadingManage] = useState(false);
  const [manageError, setManageError] = useState<string | null>(null);

  // Form states
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [isSubmittingCard, setIsSubmittingCard] = useState(false);

  // --- Load Review Cards ---
  const loadReviewCards = useCallback(async () => {
    try {
      setIsLoadingReview(true);
      setReviewError(null);
      const cards = await flashcardService.getFlashcardsToday();
      setReviewCards(cards);
      setCurrentReviewIndex(0);
      setRevisionsCount(0);
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : "Erro ao carregar revisões.");
    } finally {
      setIsLoadingReview(false);
    }
  }, []);

  // --- Load Manage Cards ---
  const loadManageCards = useCallback(async (subjectId: string) => {
    if (!subjectId) {
      setManageCards([]);
      return;
    }
    try {
      setIsLoadingManage(true);
      setManageError(null);
      const cards = await flashcardService.getFlashcardsBySubject(subjectId);
      setManageCards(cards);
    } catch (err) {
      setManageError(err instanceof Error ? err.message : "Erro ao carregar flashcards.");
    } finally {
      setIsLoadingManage(false);
    }
  }, []);

  // Set default subject on load
  useEffect(() => {
    if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [subjects, selectedSubjectId]);

  // Load manage cards when subject changes
  useEffect(() => {
    if (selectedSubjectId && activeTab === "manage") {
      loadManageCards(selectedSubjectId);
    }
  }, [selectedSubjectId, activeTab, loadManageCards]);

  // Load review cards on component mount or tab change
  useEffect(() => {
    if (activeTab === "review") {
      loadReviewCards();
    }
  }, [activeTab, loadReviewCards]);

  // --- Actions ---
  const handleReview = async (quality: number) => {
    const currentCard = reviewCards[currentReviewIndex];
    if (!currentCard) return;

    try {
      await flashcardService.reviewFlashcard(currentCard.id, quality);
      setRevisionsCount((prev) => prev + 1);
      setCurrentReviewIndex((prev) => prev + 1);
    } catch (err) {
      alert("Erro ao enviar avaliação: " + (err instanceof Error ? err.message : "Erro desconhecido"));
    }
  };

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim() || !selectedSubjectId) {
      alert("Frente e verso são obrigatórios.");
      return;
    }

    try {
      setIsSubmittingCard(true);
      await flashcardService.createFlashcard({
        front: newFront.trim(),
        back: newBack.trim(),
        subjectId: selectedSubjectId,
      });
      setNewFront("");
      setNewBack("");
      // Reload list
      await loadManageCards(selectedSubjectId);
    } catch (err) {
      alert("Erro ao criar flashcard: " + (err instanceof Error ? err.message : "Erro desconhecido"));
    } finally {
      setIsSubmittingCard(false);
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este flashcard?")) {
      return;
    }

    try {
      await flashcardService.deleteFlashcard(id);
      setManageCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Erro ao excluir flashcard: " + (err instanceof Error ? err.message : "Erro desconhecido"));
    }
  };

  return (
    <div className="min-h-full bg-surface font-sans w-full">
      {/* Mobile Header */}
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-10 lg:hidden px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-bold text-zinc-900">Flashcards</h1>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-24 lg:pb-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Estudo por Flashcards</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Use repetição espaçada para memorizar conceitos chave</p>
          </div>

          {/* Segmented Tab Selector */}
          <div className="flex bg-zinc-100 p-0.5 rounded-xl self-start">
            <button
              onClick={() => setActiveTab("review")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "review"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              Revisar hoje
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "manage"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              Gerenciar
            </button>
          </div>
        </div>

        {/* ─── TAB: REVIEW ─────────────────────────────────────────── */}
        {activeTab === "review" && (
          <div className="space-y-6">
            {isLoadingReview ? (
              <div className="h-64 bg-white border border-zinc-200 rounded-2xl animate-pulse flex items-center justify-center">
                <span className="text-sm text-zinc-400">Carregando revisões...</span>
              </div>
            ) : reviewError ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-center">
                {reviewError}
              </div>
            ) : reviewCards.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">Tudo em dia!</h3>
                  <p className="text-sm text-zinc-500 mt-1">Nenhum card pendente para revisão hoje.</p>
                </div>
                <button
                  onClick={() => setActiveTab("manage")}
                  className="px-4 py-2 text-xs font-semibold bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Criar novos flashcards
                </button>
              </div>
            ) : currentReviewIndex < reviewCards.length ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-zinc-400 font-medium px-1">
                  <span>Revisando hoje</span>
                  <span>
                    Card {currentReviewIndex + 1} de {reviewCards.length}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-zinc-950 h-full transition-all duration-300"
                    style={{ width: `${((currentReviewIndex + 1) / reviewCards.length) * 100}%` }}
                  />
                </div>

                <FlashcardReview
                  flashcard={reviewCards[currentReviewIndex]}
                  onReview={handleReview}
                />
              </div>
            ) : (
              // Conclusion screen
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
                  🎉
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Sessão Finalizada!</h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    Você revisou com sucesso <span className="font-semibold text-zinc-850">{revisionsCount} flashcards</span>.
                  </p>
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={loadReviewCards}
                    className="px-4 py-2 text-xs font-semibold border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-all cursor-pointer"
                  >
                    Recarregar
                  </button>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-xs font-semibold bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                  >
                    Voltar ao Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB: MANAGE ─────────────────────────────────────────── */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {/* Subject Selector */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                  Matéria selecionada
                </label>
                {isLoadingSubjects ? (
                  <div className="h-10 bg-zinc-100 rounded-xl animate-pulse" />
                ) : subjects.length === 0 ? (
                  <div className="text-sm text-zinc-500 py-2">
                    Nenhuma matéria encontrada.{" "}
                    <Link to="/subjects" className="text-zinc-950 font-semibold hover:underline">
                      Crie uma matéria primeiro
                    </Link>
                    .
                  </div>
                ) : (
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 transition-all cursor-pointer"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Add New Card Form */}
              {selectedSubjectId && (
                <form onSubmit={handleCreateCard} className="border-t border-zinc-100 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                    Novo Flashcard
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Frente (Pergunta ou Termo)"
                      value={newFront}
                      onChange={(e) => setNewFront(e.target.value)}
                      className="px-3 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Verso (Resposta ou Significado)"
                      value={newBack}
                      onChange={(e) => setNewBack(e.target.value)}
                      className="px-3 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingCard}
                    className="w-full px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer text-center"
                  >
                    {isSubmittingCard ? "Adicionando..." : "Adicionar Flashcard"}
                  </button>
                </form>
              )}
            </div>

            {/* List of Flashcards */}
            {selectedSubjectId && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-700 px-1 uppercase tracking-wide">
                  Flashcards Cadastrados ({manageCards.length})
                </h3>

                {isLoadingManage ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-white border border-zinc-200 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : manageError ? (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-center">
                    {manageError}
                  </div>
                ) : manageCards.length === 0 ? (
                  <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center text-sm text-zinc-400">
                    Nenhum flashcard cadastrado para esta matéria ainda.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {manageCards.map((card) => (
                      <div
                        key={card.id}
                        className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-all"
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">Frente:</span>
                            <p className="text-sm font-semibold text-zinc-800 truncate">{card.front}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">Verso:</span>
                            <p className="text-sm text-zinc-500 truncate">{card.back}</p>
                          </div>
                          <div className="text-[9px] text-zinc-400 flex items-center gap-2 pt-0.5">
                            <span>Próxima revisão: {new Date(card.nextReview).toLocaleDateString()}</span>
                            <span>·</span>
                            <span>Repetições: {card.repetitions}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer shrink-0"
                          title="Excluir card"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
