import express from 'express';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';

const router = express.Router();

var mensagem = "";
const pageAtiva = 'graduacoes';

router.get('/', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await graduacaoServico.buscaTodos(token);
        res.render('graduacoes',
            {
                'title': 'Graduações cadastradas',
                'docs': response,
                'total': response.length,
                mensagem,
                pageAtiva
            }
        );
        mensagem = "";
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar todas as graduacoes:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.get('/novo', authMiddleware, async (req, res, next) => {
    const doc = {
        'minimo_horas_treino_exame': 0,
        'minimo_tempo_exame': 0
    }
    try {
        res.render('graduacao',
            {
                'title': 'Dados da graduação (Inclusão)',
                doc,
                'total_tecnicas': 0,
                'action': '/graduacoes/inclui/',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de inclusao de graducao:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization;

    try {
        const response = await graduacaoServico.busca(token, id);
        res.render('graduacao',
            {
                'title': 'Dados da graduação (Edição)',
                'doc': response,
                'total_tecnicas': response.tecnicas?response.tecnicas.length:0,
                'action': `/graduacoes/altera/${id}`,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar a graduacao:', {
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
        const response = await graduacaoServico.busca(token, id);
        res.render('graduacao_detalhes',
            {
                'title': 'Dados da graduação (Consulta)',
                'doc': response,
                'action': `/graduacoes/altera/${id}`,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar a graduacao:', {
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
        await graduacaoServico.inclui(token, dados);
        mensagem = 'Graduação incluída com sucesso!';
        res.redirect('/graduacoes');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao incluirma graduacao:', {
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
        await graduacaoServico.atualiza(token, id, dados);
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao atualizar uma graduacao:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
})

router.delete('/exclui/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const response = await graduacaoServico.exclui(token, id);

        if (!response.sucesso) {
            // Retorna erro como JSON
            return res.status(201).json({ 
                success: false, 
                message: response.mensagem 
            });
        }
        
        // Retorna sucesso como JSON
        res.json({ 
            success: true, 
            message: 'Graduação excluída com sucesso!' 
        });
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao excluir uma graduacao:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }

        next(err);        
    }
});

export default router;
