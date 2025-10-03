
import dotenv from 'dotenv';
import app from './app';
import { connectDB } from "./db";
import { User } from 'realm-web';
import { login, logout } from './realmClient';

dotenv.config();

async function start() {
    const PORT = parseInt(`${process.env.PORT || 3000}`);
    await connectDB(); // só continua depois que conectar
    app.listen(PORT, () => console.log("🚀 Server rodando na porta 3000"));
}

start();
