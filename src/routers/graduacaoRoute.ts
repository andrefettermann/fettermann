/* graduacaoRoute.ts */

import express from 'express';

const router = express.Router();

var mensagem = "";

function setDoc(req: any) {
    var doc = {
        'ordem': req.body.ordem,
        'nome': req.body.nome,
        'faixa': req.body.faixa,
        'minimo_horas_treino_exame': req.body.horas_exame,
        'minimo_tempo_exame': req.body.meses_exame,
        'categoria': req.body.categoria,
        'observacoes': req.body.observacoes
    }

    return doc;
}

router.get('/', async (req, res, next) => {
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacoes/`);
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
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`);
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
    var doc = setDoc(req);
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacao/`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(doc) // Convert data to JSON string for the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        mensagem = 'Graduação incluída com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
});

router.post('/altera/:id', async (req, res, next) => {
    var id = req.params.id;
    var doc = setDoc(req);
    try {
        
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(doc) // Convert data to JSON string for the request body
        });
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
})

export default router;
