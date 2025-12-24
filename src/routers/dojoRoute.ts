// src/routers/dojoRoute.ts
import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacao.servico';
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
    const doc = {
        professor: {
            id: '',
            nome: ''
        }
    }

    try {
        //const response = await pessoaServico.buscaProfessores(token);
        res.render('dojo',
            {
                'title': 'Dados do dojo (Inclusão)',
                doc,
          //      'docs_professores': response,
                'action': '/dojos/inclui/',
                //'total_professores': 0,
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

router.get('/novo_professor/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const professores = await pessoaServico.buscaProfessores(token);
        const dojo = await dojoServico.busca(token, id);
        res.render('professor',
            {
                title: 'Novo professor para dojo',
                docs_professores: professores,
                doc: dojo,
                action: `/dojos/inclui_professor/${id}`,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro na busca do professor:', {
                status: err.response?.status,
                data: err.response?.data,
                id
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
        //const professores = await pessoaServico.buscaProfessores(token);
        const dojo = await dojoServico.busca(token, id);

        res.render('dojo',
            {
                'title': 'Dados do dojo (Edição)',
                'doc': dojo,
          //      'docs_professores': professores,
                'action': `/dojos/altera/${id}`,
            //    'total_professores': dojo.professores.length,
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

router.post('/inclui_professor/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await dojoServico.incluiProfessor(token, id, dados);

        mensagem = 'Professor incluído com sucesso!';
        res.redirect(`/dojos/detalhes/${id}`);
    } catch (err: any) {
        console.error('Erro na inclusao do professor:', {
            status: err.response?.status,
            data: err.response?.data,
        });
        next(err);
    }
});

export default router;
