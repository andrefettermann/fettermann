import express from 'express';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';

const router = express.Router();

var mensagem = "";
const pageAtiva = 'graduacoes';

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await graduacaoServico.buscaTodos(token);
        const docs = resposta.data;
        res.render('graduacoes',
            {
                title: 'Graduações cadastradas',
                docs,
                total: docs.length,
                mensagem,
                pageAtiva
            }
        );
        mensagem = "";
    } catch (err) {
        next(err);
    }
});

router.get('/novo', async (req, res, next) => {
    try {
        res.render('graduacao',
            {
                title: 'Dados da graduação (Inclusão)',
                doc: "",
                total_tecnicas: 0,
                action: '/graduacoes/inclui/',
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response = await graduacaoServico.busca(token, id);
        const doc = response.data;
        res.render('graduacao',
            {
                title: 'Dados da graduação (Edição)',
                doc,
                total_tecnicas: doc.tecnicas?doc.tecnicas.length:0,
                action: '/graduacoes/altera/' + id,
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response = await graduacaoServico.busca(token, id);
        const doc = response.data;
        res.render('graduacao_detalhes',
            {
                title: 'Dados da graduação (Consulta)',
                doc,
                action: '/graduacoes/altera/' + id,
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await graduacaoServico.inclui(token, dados);
        mensagem = 'Graduação incluída com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
});

router.post('/altera/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await graduacaoServico.atualiza(token, id, dados);
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
})

export default router;
