import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as taxaServico from '../servicos/taxaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';
import { getCurrentMonth } from '../utils/date';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('consulta_publica',
            {
                mes: getCurrentMonth(),
                pageAtiva: 'inicio'
            }
        );
    } catch (err) {
        next(err);
    }
});

/* Busca todos os dojos */
router.get('/dojos', authMiddleware, async (req, res, next) => {
    try {
        //const result: any = await dojoServico.buscaTodos();
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await dojoServico.buscaTodos(token);
        const docs = resposta.data;

        res.render('consulta_dojos',
            {
                docs: docs,
                total: docs.length,
                mes: getCurrentMonth(),
                pageAtiva: 'dojos'
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

/** Busca todas as pessoas */
router.get('/aniversariantes/:mes', authMiddleware, async (req, res, next) => {
    const mes = req.params.mes;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = 
            await pessoaServico.buscaAniversariantes(token, mes);
        const docs = resposta.data;

        res.render('consulta_aniversariantes',
            {
                docs,
                total: docs.length,
                mes: getCurrentMonth(),
                pageAtiva: 'aniversariantes'
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
router.get('/graduacoes', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta = await graduacaoServico.buscaTodos(token);
        const docs = resposta.data;

        res.render('consulta_graduacoes',
            {
                docs,
                total: docs.length,
                mes: getCurrentMonth(),
                pageAtiva: 'graduacoes'
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca todas as taxas */
router.get('/taxas', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await taxaServico.buscaTodos(token);
        const docs = taxaServico.formata(resposta.data);
        res.render('consulta_taxas',
            {
                docs: docs,
                total: docs.length,
                mes: getCurrentMonth(),
                pageAtiva: 'taxas'
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

export default router;
