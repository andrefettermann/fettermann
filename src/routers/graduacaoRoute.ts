/* graduacaoRoute.ts */

import express from 'express';

const router = express.Router();

var mensagem = "";


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
                total_tecnicas: 0,
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
                total_tecnicas: doc.tecnicas?doc.tecnicas.length:0,
                action: '/graduacoes/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    var id = req.params.id;

    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Graduacao status: ${response.status}`);
        }

        const doc = await response.json();
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
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacao/`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
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
    try {
        
        const response = await fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    } catch (err) {
        next(err);
    }
})

export default router;
