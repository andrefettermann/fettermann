/* pessoaRoute.ts */
import express from 'express';
import { convertDdMmYyyyToDate, getCurrentMonth } from '../utils/date';

const router = express.Router();

var mensagem: string = "";

/** Busca todas as pessoas */
router.get('/', async (req, res, next) => {
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/pessoas/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const docs = await response.json();
        res.render('pessoas',
            {
                title: 'Pessoas cadastradas',
                docs,
                total: docs.length,
                mensagem,
                logo: 'images/logo-sm.png',
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca as pessoas ativas ou inativas */
router.get('/situacao/:situacao', async (req, res, next) => {
    const situacao = req.params.situacao;
    try {
        const response = await fetch(
            `${req.protocol}://${req.host}/api/pessoas/situacao/${situacao}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const docs = await response.json();
        res.render('pessoas',
            {
                title: 'Pessoas cadastradas ('+ situacao + ')',
                docs,
                total: docs.length,
                mensagem,
                logo: '/images/logo-sm.png',
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca os aniversariantes do mes informado */
router.get('/aniversariantes/:mes', async (req, res, next) => {
    const mes = req.params.mes;
    try {
        const response = await fetch(
            `${req.protocol}://${req.host}/api/pessoas/aniversariantes/${mes}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const docs = await response.json();
        res.render('pessoas',
            {
                title: 'Pessoas cadastradas (aniversariantes do mês)',
                docs,
                total: docs.length,
                mensagem,
                logo: '/images/logo-sm.png',
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Abre a tela de inclusao dos dados da pessoa*/
router.get('/novo', async (req, res, next) => {
    try {
        const responseDojos = await fetch(`${req.protocol}://${req.host}/api/dojos`);
        const responseGraduacoes = await fetch(`${req.protocol}://${req.host}/api/graduacoes`);

        if (!responseDojos.ok) {
            throw new Error(`HTTP error! Dojos status: ${responseDojos.status}`);
        } else if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }

        const docsDojos = await responseDojos.json();
        const docsGraduacoes = await responseGraduacoes.json();
        res.render('pessoa',
            {
                title: 'Dados da pessoa (Inclusão)',
                doc: "",
                docs_dojos: docsDojos,
                docs_graduacoes: docsGraduacoes,
                total_promocoes: 0,
                total_pagamentos: 0,
                action: '/pessoas/inclui/',
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Abre a tela com os detalhes da pessoa */
router.get('/detalhes/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const responseGraduacoes = await fetch(`${req.protocol}://${req.host}/api/graduacoes`);
        if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }

        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Pessoa status: ${response.status}`);
        }

        const docs_graduacoes = await responseGraduacoes.json();
        const doc = await response.json();
        res.render('pessoa_detalhes',
            {
                title: 'Dados da pessoa (Consulta)',
                doc,
                docs_graduacoes
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Abre a tela para alteracao dos dados da pessoa */
router.get('/edita/:id', async (req, res, next) => {
    var id = req.params.id;

    try {
        const responseDojos = await fetch(`${req.protocol}://${req.host}/api/dojos`);
        const responseGraduacoes = await fetch(`${req.protocol}://${req.host}/api/graduacoes`);

        if (!responseDojos.ok) {
            throw new Error(`HTTP error! Dojos status: ${responseDojos.status}`);
        } else if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }

        const docs_dojos = await responseDojos.json();
        const docs_graduacoes = await responseGraduacoes.json();

        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Pessoa status: ${response.status}`);
        }

        const doc = await response.json();
        res.render('pessoa',
            {
                title: 'Dados da pessoa (Alteração)',
                doc,
                action: '/pessoas/altera/' + id,
                total_pagamentos: doc.pagamentos.length,
                total_promocoes: doc.promocoes.length,
                docs_dojos,
                docs_graduacoes,
                mensagem: ''
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Inclui os dados da pessoa */
router.post('/inclui', async (req, res, next) => {
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/inclui`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Inclusao de pessoa status: ${response.status}`);
        }

        mensagem = 'Pessoa incluída com sucesso!';
        res.redirect('/pessoas');
    } catch (err) {
        next(err);
    }
});

/** Altera os dados da pessoa */
router.post('/altera/:id', async (req, res, next) => {
    var id = req.params.id;
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/altera/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        mensagem = 'Pessoa alterada com sucesso!';
        res.redirect('/pessoas');
    } catch (err) {
        next(err);
    }
});

/** Exclui os dados da organizacao */
router.get('/exclui/:id', async (req, res, next) => {
    const id = req.params.id;
console.log(id)
})

export default router;
