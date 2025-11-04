// src/routers/dojoRoute.ts
import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';

const router = express.Router();
const pageAtiva = 'dojos';

var mensagem = '';

/* Busca todos os dojos */
router.get('/', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await dojoServico.buscaTodos(token);
        res.render('dojos',
            {
                'docs': response,
                'total': response.length,
                mensagem,
                pageAtiva
            }
        );
        mensagem = '';
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na busca de dojos:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

router.get('/novo', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await pessoaServico.buscaProfessores(token);
        const docs = response.data.docs;

        res.render('dojo',
            {
                'title': 'Dados do dojo (Inclusão)',
                'doc': "",
                'docs_pessoas': response,
                'action': '/dojos/inclui/',
                mensagem,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na busca de dojos:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const responseGraduacoes = await graduacaoServico.buscaTodos(token);
        const response = await dojoServico.busca(token, id);

        res.render('dojo_detalhes',
            {
                'title': 'Dados do dojo (Consulta)',
                'doc': response,
                'docs_graduacoes': responseGraduacoes,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na busca do dojo:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }
        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const responsePessoas = await pessoaServico.buscaProfessores(token);
        const responseDojo = await dojoServico.busca(token, id);

        res.render('dojo',
            {
                'title': 'Dados do dojo (Edição)',
                'doc': responseDojo,
                'docs_pessoas': responsePessoas,
                'action': `/dojos/altera/${id}`,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na busca do dojo:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }

        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    var dados = req.body;
    const token = req.headers.authorization;

    try {
        await dojoServico.inclui(token, dados);

        mensagem = 'Dojo incluído com sucesso!';
        res.redirect('/dojos');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na inclusao do dojo:', {
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
        await dojoServico.atualiza(token, id, dados);

        mensagem = 'Dojo alterado com sucesso!';
        res.redirect('/dojos');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na inclusao do dojo:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
})

export default router;
