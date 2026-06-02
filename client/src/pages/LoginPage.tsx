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
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 mb-4">
            <span className="text-3xl">💡</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-primary-300 text-sm">
            Entre na sua conta para continuar estudando
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-5"
        >
          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-red-300 text-sm animate-[fadeIn_0.2s_ease-out]">
              {error}
            </div>
          )}

          {/* Campo E-mail */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-primary-200"
            >
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
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Campo Senha */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-primary-200"
            >
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
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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

          {/* Link para registro */}
          <p className="text-center text-sm text-primary-300">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-secondary-400 hover:text-secondary-300 font-medium transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
