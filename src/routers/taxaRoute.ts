// taxaRoute.ts
import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/tokenManager';
import * as taxaServico from '../servicos/taxaServico';
import * as cobrancaServico from '../servicos/cobrancaServico';
import { formataMoeda } from '../utils/formata_decimal';

/**
 * Router de taxas.
 * 
 * @author Andre Fettermann
 */

const router = express.Router();

var mensagem = "";

const pageAtiva = 'financeiro';

router.get('/', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await taxaServico.buscaTodos(token);
        res.render('taxas',
            {
                'docs': response,
                'total': response.length,
                mensagem,
                pageAtiva
            }
        );
        mensagem = "";
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar todas as taxas:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.get('/novo', authMiddleware, async (req, res, next) => {
    const doc = {
        "valor_padrao": 0,
    }
    try {
        res.render('taxa',
            {
                'title': 'Dados da taxa (Inclusão)',
                'doc': doc,
                'action': '/taxas/inclui/',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de inclusao de taxa:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const response = await taxaServico.busca(token, id);
        res.render('taxa',
            {
                'title': 'Dados da taxa (Edição)',
                'doc': response,
                'action': `/taxas/altera/${id}`,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar a taxa:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }

        next(err);
    }
});

router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization;

    try {
        const responseCobrancas = 
                        await cobrancaServico.buscaPorTaxa(token, id);
        const response = await taxaServico.busca(token, id);

        response.valor_padrao = formataMoeda(response.valor_padrao);

        res.render('taxa_detalhes',
            {
                'title': 'Dados da taxa (Consulta)',
                'doc': response,
                'docs_cobrancas': responseCobrancas,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar a taxa:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }

        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await taxaServico.inclui(token, dados);

        mensagem = 'Taxa incluída com sucesso!';
        res.redirect('/taxas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao incluir uma taxa:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.post('/altera/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await taxaServico.atualiza(token, id, dados);

        mensagem = 'Taxa alterada com sucesso!';
        res.redirect('/taxas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao atualizar a taxa:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }

        next(err);
    }
})

export default router;
