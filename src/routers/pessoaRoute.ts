/* pessoaRoute.ts */
import express from 'express';
import { convertDdMmYyyyToDate } from '../utils/date';

const router = express.Router();

var mensagem: string = "";

function getCurrentMonth() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return month;
}

function setDoc(req: any) {
    var totalPromocoes = req.body.total_promocoes;
    var totalPagamentos = req.body.total_pagamentos;

    var doc = {};

    var doc_promocoes = [];
    if (totalPromocoes > 0) {
        for (var i=0; i<req.body.total_promocoes; i++) {
            var graduacao = req.body['graduacao_promocao_' + (i+1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': convertDdMmYyyyToDate(req.body['data_promocao_' + (i+1)]),
                    'graduacao': req.body['graduacao_promocao_' + (i+1)]
                }
                doc_promocoes.push(doc_promocao);
            }
        }
    }

    var doc_pagamentos = [];
    if (totalPagamentos > 0) {
        for (var i=0; i<req.body.total_pagamentos; i++) {
            let data = req.body['data_pagamento_' + (i+1)];
            if (data) {
                var doc_pagamento = {
                    'data': convertDdMmYyyyToDate(req.body['data_pagamento_' + (i+1)]),
                    'valor_pago': Number.parseFloat(req.body['valor_pagamento_' + (i+1)]),
                    'descricao': req.body['descricao_pagamento_' + (i+1)]
                }
                doc_pagamentos.push(doc_pagamento);
            }
        }
    }


    if (req.body.id_dojo == '') {
        doc = {
            'aniversario': req.body.aniversario,
            'matricula': req.body.matricula,
            'nome': req.body.nome,
            'situacao': req.body.situacao,
            'cpf': req.body.cpf,
            'data_inicio_aikido': req.body.data_inicio,
            'data_matricula': req.body.data_matricula,
            'graduacao_atual': req.body.graduacao_atual,
            'id_dojo': null,
            'promocoes': doc_promocoes,
            'pagamentos': doc_pagamentos
        }
    } else {
        doc = {
            'aniversario': req.body.aniversario,
            'matricula': req.body.matricula,
            'nome': req.body.nome,
            'situacao': req.body.situacao,
            'cpf': req.body.cpf,
            'data_inicio_aikido': req.body.data_inicio,
            'data_matricula': req.body.data_matricula,
            'graduacao_atual': req.body.graduacao_atual,
            'id_dojo': req.body.id_dojo,
            'promocoes': doc_promocoes,
            'pagamentos': doc_pagamentos
        }
    }

    return doc;
}

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
                title: 'Pessoas cadastradas (em atividade)',
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
        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const doc = await response.json();
        res.render('pessoa_detalhes',
            {
                title: 'Dados da pessoa (Consulta)',
                doc,
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
    var doc = setDoc(req);
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/inclui`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(doc) // Convert data to JSON string for the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
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
    var doc = setDoc(req);
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/pessoa/altera/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(doc) // Convert data to JSON string for the request body
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


export default router;
