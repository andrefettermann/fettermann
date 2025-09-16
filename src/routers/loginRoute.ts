// routes/authRouter.ts
import express from 'express';
import { createToken } from '../middleware/auth';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
  res.render('login', { error: null }); // Sua view login.ejs
});

// Processa login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Sua lógica de validação aqui
  if (username === 'admin' && password === process.env.ADMIN_SENHA) {
    const user = { id: 1, username: 'admin' };
    const token = createToken(user);
    
    res.cookie('authToken', token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, // 30 min
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
      //sameSite: 'strict'
    });
    console.log("Login com sucesso")
    res.redirect('/pessoas');
  } else {
    res.render('login', { error: 'Credenciais inválidas' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/login');
});

export default router;