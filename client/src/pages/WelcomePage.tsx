import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ONBOARDING_STEPS = [
  {
    step: 1,
    eyebrow: "OLÁ",
    title: "Bem-vindo ao Lúmen.",
    text: "Um planejador acadêmico minimalista para quem leva os estudos a sério — sem ruído, sem distração."
  },
  {
    step: 2,
    eyebrow: "FOCO",
    title: "Veja o que importa hoje.",
    text: "Prazos próximos ficam destacados em laranja; atrasados, em vermelho. O resto fica em segundo plano."
  },
  {
    step: 3,
    eyebrow: "CONSTÂNCIA",
    title: "Planeje a semana inteira.",
    text: "Agende sessões, acompanhe horas estudadas e mantenha um ritmo sustentável."
  }
];

export default function WelcomePage() {
  const [step, setStep] = useState(1);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redireciona para o dashboard se o usuário já estiver autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-zinc-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  function handleNext() {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      navigate("/login");
    }
  }

  const current = ONBOARDING_STEPS[step - 1];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans flex lg:flex-row flex-col">
      {/* 1. LADO ESQUERDO: Fixo e Escuro (Apenas Desktop) */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#121212] text-white p-12 flex-col justify-between select-none relative overflow-hidden shrink-0">
        {/* Glow effect sutil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-zinc-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <img src="/favicon.png" alt="Lúmen Logo" className="w-10 h-10 object-contain shrink-0" />
          <span className="text-xl font-bold tracking-tight text-white">Lúmen</span>
        </div>

        {/* Área vazia editorial - detalhe sutil */}
        <div className="my-auto relative z-10 opacity-10 font-mono text-[9px] uppercase tracking-[0.2em] leading-loose">
          [ 💡 LUMEN — ACADEMIC STUDY PLANNER ]
          <br />
          [ VERSION 2.0 // PREMIUM EDITION ]
          <br />
          [ SYSTEM ACTIVE // SESSION OPEN ]
        </div>

        {/* Rodapé */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <p className="text-xs font-bold tracking-[0.25em] text-gray-400">
            FOCO. ESTUDO. CONSTÂNCIA.
          </p>
        </div>
      </div>

      {/* 2. LOGO MÓVEL COMPACTO: (Visível Apenas Mobile) */}
      <div className="flex items-center justify-between w-full lg:hidden bg-[#121212] text-white p-5 border-b border-white/5 select-none">
        <div className="flex items-center gap-2.5">
          <img src="/favicon.png" alt="Lúmen Logo" className="w-8 h-8 object-contain shrink-0" />
          <span className="text-base font-bold tracking-tight">Lúmen</span>
        </div>
        <span className="text-[9px] font-bold text-gray-400 tracking-wider">FOCO. ESTUDO. CONSTÂNCIA.</span>
      </div>

      {/* 3. LADO DIREITO: Dinâmico e Claro */}
      <div className="flex-1 flex flex-col justify-between bg-[#f8fafc] p-8 md:p-16 min-h-[calc(100vh-73px)] lg:min-h-screen">
        
        {/* Top margin balance spacer (only desktop) */}
        <div className="hidden lg:block h-10" />

        {/* Conteúdo Dinâmico */}
        <div key={step} className="my-auto max-w-xl w-full mx-auto space-y-6 animate-[fadeIn_0.25s_ease-out]">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
            {current.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight select-none">
            {current.title}
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium">
            {current.text}
          </p>
        </div>

        {/* Controles de Navegação */}
        <div className="max-w-xl w-full mx-auto flex items-center justify-between pt-8 border-t border-gray-200/80">
          {/* Indicadores de Etapa */}
          <div className="flex items-center gap-2 select-none">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  step === s ? "w-8 bg-gray-900" : "w-4 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer uppercase tracking-wider"
            >
              Pular
            </button>
            <button
              onClick={handleNext}
              className="h-11 px-6 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center"
            >
              {step === 3 ? "Começar" : "Próximo"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
