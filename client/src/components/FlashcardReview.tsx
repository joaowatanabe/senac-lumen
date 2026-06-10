import { useState } from "react";
import type { Flashcard } from "../types";

interface FlashcardReviewProps {
  flashcard: Flashcard;
  onReview: (quality: number) => void;
}

export default function FlashcardReview({ flashcard, onReview }: FlashcardReviewProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFeedback = (quality: number) => {
    onReview(quality);
    setIsFlipped(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 3D Card Container */}
      <div 
        className="w-full h-64 cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* FRONT (Frente) */}
          <div
            className="absolute inset-0 w-full h-full bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Frente</span>
              {flashcard.subject && (
                <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800">
                  {flashcard.subject.name}
                </span>
              )}
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <p className="text-xl font-medium text-zinc-900 whitespace-pre-wrap leading-relaxed">
                {flashcard.front}
              </p>
            </div>
            
            <div className="text-center text-xs text-zinc-400 font-medium animate-pulse">
              Clique no card para revelar a resposta
            </div>
          </div>

          {/* BACK (Verso) */}
          <div
            className="absolute inset-0 w-full h-full bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            onClick={(e) => e.stopPropagation()} // Evita flipar de volta ao clicar no verso
          >
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Verso</span>
              {flashcard.subject && (
                <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800">
                  {flashcard.subject.name}
                </span>
              )}
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center px-4 overflow-y-auto">
              <p className="text-xl font-medium text-zinc-900 whitespace-pre-wrap leading-relaxed">
                {flashcard.back}
              </p>
            </div>
            
            <div className="text-center text-xs text-zinc-400 font-medium">
              Avalie o seu nível de facilidade abaixo
            </div>
          </div>
        </div>
      </div>

      {/* Buttons / Controls */}
      <div className="w-full flex justify-center">
        {!isFlipped ? (
          <button
            onClick={() => setIsFlipped(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 text-white hover:bg-zinc-800 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Revelar resposta
          </button>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            <button
              onClick={() => handleFeedback(0)}
              className="px-4 py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 hover:text-red-800 text-sm font-semibold rounded-xl transition-all active:scale-95 cursor-pointer text-center"
            >
              Errei
            </button>
            <button
              onClick={() => handleFeedback(2)}
              className="px-4 py-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 hover:text-amber-800 text-sm font-semibold rounded-xl transition-all active:scale-95 cursor-pointer text-center"
            >
              Difícil
            </button>
            <button
              onClick={() => handleFeedback(4)}
              className="px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 hover:text-blue-800 text-sm font-semibold rounded-xl transition-all active:scale-95 cursor-pointer text-center"
            >
              Bom
            </button>
            <button
              onClick={() => handleFeedback(5)}
              className="px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 hover:text-green-800 text-sm font-semibold rounded-xl transition-all active:scale-95 cursor-pointer text-center"
            >
              Fácil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
