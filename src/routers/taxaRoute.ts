// taxaRoute.ts
import express from 'express';
import * as taxaServico from '../servicos/taxaServico';

/**
 * Router de taxas.
 * 
 * @author Andre Fettermann
 */

const router = express.Router();

var mensagem = "";

router.get('/', async (req, res, next) => {
    try {
        const response = await taxaServico.buscaTodos();
        res.render('taxas',
            {
                docs: response.docs,
                total: response.docs.length,
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
        res.render('taxa',
            {
                title: 'Dados da taxa (Inclusão)',
                doc: "",
                action: '/taxas/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', async (req, res, next) => {
    try {
        const response = await taxaServico.busca(req.params.id);
        res.render('graduacao',
            {
                title: 'Dados da graduação (Edição)',
                doc: response.doc,
                action: '/taxas/altera/' + req.params.id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const response = await taxaServico.busca(id);
        res.render('graduacao_detalhes',
            {
                title: 'Dados da graduação (Consulta)',
                doc: response.doc,
                action: '/taxas/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', async (req, res, next) => {
    const dados = req.body;
    try {
        await taxaServico.inclui(dados);
        mensagem = 'Taxa incluída com sucesso!';
        res.redirect('/taxas');
    } catch (err) {
        next(err);
    }
});

router.post('/altera/:id', async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        await taxaServico.atualiza(id, dados);
        mensagem = 'Taxa alterada com sucesso!';
        res.redirect('/taxas');
    } catch (err) {
        next(err);
    }
})

export default router;
