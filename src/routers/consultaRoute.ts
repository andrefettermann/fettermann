import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
//import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';

import { convertDdMmYyyyToDate, getCurrentMonth } from '../utils/date';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('consulta_publica',
            {
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/* Busca todos os dojos */
router.get('/dojos', async (req, res, next) => {
    try {
        const result: any = await dojoServico.buscaTodos();        
        res.render('consulta_dojos',
            {
                docs: result.docs,
                total: result.docs.length,
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca todas as pessoas */
router.get('/aniversariantes/:mes', authMiddleware, async (req, res, next) => {
    try {
//        const response = 
//            await pessoaServico.buscaAniversariantes(req.params.mes);

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response:any = await axios.get(
            'https://fettermannaikidoapi.vercel.app/api/pessoas/aniversariantes/' 
            + req.params.mes , {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
                'User-Agent': 'PostmanRuntime/7.48.0',
                'Connection': 'keep-alive'
            }
        });

        const docs = response.data;
        res.render('consulta_aniversariantes',
            {
                docs,
                total: docs.length,
                mes: getCurrentMonth()
            }
        );
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
});

/** Busca todas as graduacoes */
router.get('/graduacoes', async (req, res, next) => {
    try {
        const response = await graduacaoServico.buscaTodos();
        res.render('consulta_graduacoes',
            {
                docs: response.docs,
                total: response.docs.length,
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

export default router;
