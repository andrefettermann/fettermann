// src/routes/loginRouter.ts
import express from 'express';
import { createToken } from '../middleware/auth';
import dotenv from "dotenv";
import * as usuarioServico from '../servicos/usuario.servico';
import { authMiddleware } from '../middleware/tokenManager';

dotenv.config();

const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
  res.render('login', { erro: 'Informe as suas credenciais de acesso.' }); // Sua view login.ejs
});

// Processa login
router.post('/login', authMiddleware, async (req, res, next) => {
  const { email } = req.body.email;
  const token = req.headers.authorization;

  try {
    const response = await usuarioServico.login(token, req.body);

    if (response.sucesso) {
      const user = { id: 1, username: email };
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
      res.render('login', { erro: 'Credenciais inválidas' });      
    }
  } catch (err: any) {
      console.error('Erro ao processar o login:', {
          status: err.response?.status,
          data: err.response?.data,
      });
      next(err);
  }

  
  // Sua lógica de validação aqui
  /*
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
    */
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/login');
});

export default router;