import express from 'express';
import * as graduacaoServico from '../servicos/graduacaoServico';

const router = express.Router();

var mensagem = "";

router.get('/', async (req, res, next) => {
    try {
        const response = await graduacaoServico.buscaTodos();
        const docs = response.docs;
        res.render('graduacoes',
            {
                title: 'Graduações cadastradas',
                docs,
                total: docs.length,
                mensagem
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
                action: '/graduacoes/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const response = await graduacaoServico.busca(id);
        const doc = await response.docs;
        res.render('graduacao',
            {
                title: 'Dados da graduação (Edição)',
                doc,
                total_tecnicas: doc.tecnicas?doc.tecnicas.length:0,
                action: '/graduacoes/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const response = await graduacaoServico.busca(id);
        const doc = await response.docs;
        res.render('graduacao_detalhes',
            {
                title: 'Dados da graduação (Consulta)',
                doc,
                action: '/graduacoes/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', async (req, res, next) => {
    const dados = req.body;
    try {
        await graduacaoServico.inclui(dados);
        mensagem = 'Graduação incluída com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
});

router.post('/altera/:id', async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        await graduacaoServico.atualiza(id, dados);
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
})

export default router;
