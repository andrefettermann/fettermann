import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';

import { convertDdMmYyyyToDate, getCurrentMonth } from '../utils/date';

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
router.get('/aniversariantes/:mes', async (req, res, next) => {
    try {
        const response = 
            await pessoaServico.buscaAniversariantes(req.params.mes);
        res.render('consulta_aniversariantes',
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
