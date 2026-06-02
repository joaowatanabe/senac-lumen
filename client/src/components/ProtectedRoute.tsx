import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Componente de rota protegida.
 * Redireciona para /login se o usuário não estiver autenticado.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Aguarda carregar a sessão do localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
