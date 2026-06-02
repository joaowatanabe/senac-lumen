import { apiFetch } from "./api";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";

/**
 * Serviço de autenticação — chamadas à API de auth
 */
export const authService = {
  /**
   * Cadastra um novo usuário
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Autentica um usuário existente
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
