// src/services/realmClient.ts
import * as Realm from 'realm-web';
import dotenv from "dotenv";

dotenv.config();

const app = new Realm.App({ id: process.env.ATLAS_APP_ID! });

let currentUser: Realm.User | null = null;

export async function login(email: string, password: string): Promise<Realm.User> {
  if (currentUser?.isLoggedIn) {
    return currentUser;
  }

  const credentials = Realm.Credentials.apiKey(process.env.ATLAS_API_KEY!);
  //Realm.Credentials.emailPassword(email, password);
  currentUser = await app.logIn(credentials);
  console.log(`🟢 Usuário autenticado: ${currentUser.id}`);
  return currentUser;
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
  } else {
    console.warn("⚠️ Nenhum usuário logado para fazer logout");
  }
}
