import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans flex lg:flex-row flex-col">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-12 flex-col justify-between relative overflow-hidden shrink-0 select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
            <span className="text-xl">💡</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Lúmen</span>
        </div>

        <div className="my-auto space-y-6 max-w-md relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
            Organize seus estudos e domine seu tempo.
          </h1>
          <p className="text-zinc-300/80 text-base leading-relaxed font-medium">
            Uma experiência visual e moderna de planner, pomodoro e acompanhamento de tarefas feita para impulsionar o seu aprendizado.
          </p>
        </div>

        <div className="text-xs text-zinc-500/30 font-semibold tracking-wide relative z-10">
          © {new Date().getFullYear()} Lúmen. Todos os direitos reservados.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 min-h-screen bg-[#f8fafc]">
        <div className="flex flex-col items-center mb-8 lg:hidden select-none">
          <div className="w-14 h-14 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Lúmen</h2>
        </div>

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="mb-6 text-center lg:text-left select-none">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Entrar</h2>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
              Continue organizando seus estudos com o Lúmen
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-150 rounded-xl px-4 py-3 text-red-700 text-xs font-semibold leading-relaxed animate-[fadeIn_0.15s_ease-out]">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-gray-55/40 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900/15"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Senha
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-gray-55/40 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none transition-all duration-200 focus:border-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900/15"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-black hover:bg-neutral-900 text-white text-sm font-bold transition-all shadow-md shadow-black/5 active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>

            <p className="text-center text-xs font-bold text-gray-400 mt-6 pt-4 border-t border-gray-100">
              Ainda não tem conta?{" "}
              <Link to="/register" className="text-zinc-900 hover:text-black font-extrabold uppercase tracking-wide transition-colors">
                Criar conta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
