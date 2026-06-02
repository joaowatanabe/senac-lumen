import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    // Validação de senhas iguais
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validação de senha mínima
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ name, email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao criar conta. Tente novamente.");
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
            Crie sua conta
          </h1>
          <p className="mt-2 text-primary-300 text-sm">
            Comece a organizar seus estudos com o Lúmen
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

          {/* Campo Nome */}
          <div className="space-y-1.5">
            <label
              htmlFor="register-name"
              className="block text-sm font-medium text-primary-200"
            >
              Nome
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Campo E-mail */}
          <div className="space-y-1.5">
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-primary-200"
            >
              E-mail
            </label>
            <input
              id="register-email"
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
              htmlFor="register-password"
              className="block text-sm font-medium text-primary-200"
            >
              Senha
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className="space-y-1.5">
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-medium text-primary-200"
            >
              Confirmar senha
            </label>
            <input
              id="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-primary-400/60 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
            />
          </div>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Criando conta...
              </span>
            ) : (
              "Criar conta"
            )}
          </button>

          {/* Link para login */}
          <p className="text-center text-sm text-primary-300">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-secondary-400 hover:text-secondary-300 font-medium transition-colors"
            >
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
