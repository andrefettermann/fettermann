// src/services/realmClient.ts
import * as Realm from 'realm-web';
import dotenv from "dotenv";

dotenv.config();

const app = new Realm.App({ id: process.env.ATLAS_APP_ID! });
let currentUser: Realm.User | null = null;
let lastLoginTime = 0;
const LOGIN_TIMEOUT = 30 * 60 * 1000; // 30 minutos


export async function ensureAuthenticated(): Promise<Realm.User> {
  const now = Date.now();
  
  // Verifica se o usuário ainda está válido
  if (currentUser?.isLoggedIn && (now - lastLoginTime) < LOGIN_TIMEOUT) {
    return currentUser;
  }
  
  try {
    const credentials = Realm.Credentials.apiKey(process.env.ATLAS_API_KEY!);
    currentUser = await app.logIn(credentials);
    lastLoginTime = now;
    console.log(`🟢 Usuário autenticado: ${currentUser.id}`);
    return currentUser;
  } catch (error) {
    console.error('❌ Erro na autenticação:', error);
    currentUser = null;
    throw new Error('Falha na autenticação com MongoDB Atlas');
  }
}

export function getLoggedInUser(): Realm.User {
  if (!currentUser || !currentUser.isLoggedIn) {
    throw new Error("Usuário não autenticado");
  }
  return currentUser;
}

export async function logout(): Promise<void> {
  if (currentUser && currentUser.isLoggedIn) {
    await currentUser.logOut();
    console.log("🔒 Usuário desconectado");
    currentUser = null;
    lastLoginTime = 0;
  }
}

// Função legada mantida para compatibilidade
export async function login(email: string, password: string): Promise<Realm.User> {
  return ensureAuthenticated();
}
