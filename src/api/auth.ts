// api/auth.ts
import { ApiClient } from "./client";

const api = new ApiClient("http://localhost:3000"); // troca pela URL do Vercel

interface LoginResponse {
  message: string;
  token: string; // útil para Bearer
}

export async function login(email: string, senha: string, useBearer = true) {
  const res = await api.request<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });

  if (useBearer) {
    // Guarda token para uso manual no header
    api.setToken(res.token);
    localStorage.setItem("authToken", res.token);
  }

  return res;
}

export async function getDadosSensiveis() {
  return api.request<{ segredo: string; user: any }>("/dados-sensiveis");
}
