// api/client.ts
export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    // força para objeto de strings
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers, // agora não dá erro
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    return res.json();
  }
}
