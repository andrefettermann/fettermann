/* graduacaoRoute.ts */

import express from 'express';

const router = express.Router();

var mensagem = "";

router.get('/', async (req, res, next) => {
    try {
        var response = await fetch('http://localhost:3000/api/graduacoes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = await response.json();
        res.render('graduacoes',
            {
                title: 'Graduações cadastradas',
                docs,
                total: docs.length,
                mensagem
            }
        );
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
                action: '/graduacoes/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', async (req, res, next) => {
    var id = req.params.id;

    try {
        var response = await fetch('http://localhost:3000/api/graduacao/' + id);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const doc = await response.json();
        res.render('graduacao',
            {
                title: 'Dados da graduação (Edição)',
                doc,
                action: '/graduacoes/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', async (req, res, next) => {
    /*
        var doc = new Graduacao(req.body.ordem, req.body.nome);
    doc.setFaixa(req.body.faixa);



    controlador.inclui(doc).then((response => {
        mensagem = 'Graduação incluída com sucesso!';
        res.redirect('/graduacoes');
    })).catch((err)=>{
        mensagem = err;
        res.redirect('/graduacoes');
    })
    */
});

router.post('/altera/:id', async (req, res, next) => {
    /*
    var doc = new Graduacao(req.body.ordem, req.body.nome);
    doc.setFaixa(req.body.faixa);
    doc.setId(req.params.id);

    controlador.altera(doc).then(() => {
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    }).catch((err)=>{
        mensagem = err;
        res.redirect('/graduacoes');
    })
    */
})

export default router;
