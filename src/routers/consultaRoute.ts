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

/**
* Busca todos os dojos ativos.
* 
* @author Andre Fettermann
*/
router.get('/dojos', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await dojoServico.buscaAtivos(token);
        res.render('consulta_dojos',
            {
                'docs': response,
                'total': response.length,
                'mes': getCurrentMonth(),
                'pageAtiva': 'dojos'
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na consulta publica de dojos:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

/** 
 * Busca os aniversariantes do mes.
 * 
 * @author Andre Fettermann
 */
router.get('/aniversariantes/:mes', authMiddleware, async (req, res, next) => {
    const mes = req.params.mes;
    const token = req.headers.authorization;

    try {
        const response = await pessoaServico.buscaAniversariantes(token, mes);
        res.render('consulta_aniversariantes',
            {
                'docs': response,
                'total': response.length,
                'mes': getCurrentMonth(),
                'pageAtiva': 'aniversariantes'
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na consulta publica de dojos:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

/** 
 * Busca todas as graduacoes.
 * 
 * @author Andre Fettermann
 */
router.get('/graduacoes', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const response = await graduacaoServico.buscaTodos(token);
        res.render('consulta_graduacoes',
            {
                'docs': response,
                'total': response.length,
                'mes': getCurrentMonth(),
                'pageAtiva': 'graduacoes'
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na consulta publica de dojos:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

/** Busca todas as taxas */
router.get('/taxas', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await taxaServico.buscaTodos(token);
        res.render('consulta_taxas',
            {
                'docs': response,
                'total': response.length,
                'mes': getCurrentMonth(),
                'pageAtiva': 'taxas'
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na consulta publica de dojos:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

export default router;
