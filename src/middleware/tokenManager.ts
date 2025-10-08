import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

interface TokenData {
  token: string;
  expiresAt: number;
}

class TokenManager {
  private tokenData: TokenData | null = null;
  private refreshPromise: Promise<string> | null = null;
  private apiUrl: string;
  private credentials: { username: string; password: string };

  constructor(apiUrl: string, credentials: { username: string; password: string }) {
    this.apiUrl = apiUrl;
    this.credentials = credentials;
  }

  private async fetchNewToken(): Promise<TokenData> {
    try {
      // Cria o header Basic Auth
      const credentials = Buffer.from(
        `${this.credentials.username}:${this.credentials.password}`
      ).toString('base64');
      
      const response = await axios.post(
        `${this.apiUrl}/gera-token`,
        {}, // body vazio
        {
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        }
      );
      
      // Ajuste conforme a resposta da sua API
      const { token, expiresIn } = response.data;
      
      // Calcula quando o token expira (em milissegundos)
      // Subtrai 5 minutos de margem para renovar antes de expirar
      const expiresAt = Date.now() + (expiresIn * 1000) - (5 * 60 * 1000);
      
      return { token, expiresAt };
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw new Error('Falha ao obter token de autenticação');
    }
  }

  private isTokenValid(): boolean {
    if (!this.tokenData) return false;
    return Date.now() < this.tokenData.expiresAt;
  }

  async getToken(): Promise<string> {
    // Se já existe uma requisição em andamento, retorna ela
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // Se o token é válido, retorna ele
    if (this.isTokenValid()) {
      return this.tokenData!.token;
    }

    // Caso contrário, obtém um novo token
    this.refreshPromise = (async () => {
      try {
        this.tokenData = await this.fetchNewToken();
        return this.tokenData.token;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  // Método para invalidar o token manualmente (ex: em caso de erro 401)
  invalidateToken(): void {
    this.tokenData = null;
  }
}

// Instância singleton do gerenciador de token
export const tokenManager = new TokenManager(
  process.env.API_URL || 'https://fettermannaikidoapi.vercel.app/',
  {
    username: process.env.API_USERNAME || '',
    password: process.env.API_PASSWORD || ''
  }
);

export async function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = (await tokenManager.getToken()).trim();
    req.headers.authorization = `Bearer ${token}`;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter token de autenticação' });
  }
}