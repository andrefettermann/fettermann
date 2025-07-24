/* pessoaRoute.ts */

import express from 'express';
import controlador from '../controllers/pessoaController';
import { convertDdMmYyyyToDate } from '../utils/date';

const router = express.Router();

var mensagem: string = "";

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

    doc = {
        'aniversario': req.body.aniversario,
        'matricula': req.body.matricula,
        'nome': req.body.nome,
        'situacao': req.body.situacao,
        'cpf': req.body.cpf,
        'data_inicio_aikido': req.body.data_inicio,
        'data_matricula': req.body.data_matricula,
        'codigo_dojo': req.body.dojo,
        'graduacao_atual': req.body.graduacao_atual,
        'promocoes': doc_promocoes,
        'pagamentos': doc_pagamentos
    }

    return doc;
}

router.get('/', async (req, res, next) => {
    try {
        var response = await fetch('http://localhost:3000/pessoas/api/');
        
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
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/filtro/ativos', async (req, res, next) => {
    try {
        var response = await fetch('http://localhost:3000/pessoas/api/filtro/ativos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = await response.json();
        res.render('pessoas',
            {
                title: 'Pessoas cadastradas (em atividade)',
                docs,
                total: docs.length,
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/novo', async (req, res, next) => {
    try {
        var dojos = await fetch('http://localhost:3000/dojos/api/');
        var graduacoes = await fetch('http://localhost:3000/graduacoes/api/');
        if (!dojos.ok) {
            throw new Error(`HTTP error! status: ${dojos.status}`);
        } else if (!graduacoes.ok) {
            throw new Error(`HTTP error! status: ${graduacoes.status}`);
        }

        const docs_dojos = await dojos.json();
        const docs_graduacoes = await graduacoes.json();

        res.render('pessoa',
            {
                title: 'Dados da pessoa (Inclusão)',
                doc: "",
                docs_dojos,
                docs_graduacoes,
                total_promocoes: 0,
                total_pagamentos: 0,
                action: '/pessoas/inclui/',
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    try {
        var docs = await fetch('http://localhost:3000/pessoas/api/' + req.params.id);
        if (!docs.ok) {
            throw new Error(`HTTP error! status: ${docs.status}`);
        }

        const result = await docs.json();
        const doc = result.data;

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

router.get('/edita/:id', async (req, res, next) => {
    var id = req.params.id;

    try {
        var dojos = await fetch('http://localhost:3000/dojos/api/');
        var graduacoes = await fetch('http://localhost:3000/graduacoes/api/');

        if (!dojos.ok) {
            throw new Error(`HTTP error! status: ${dojos.status}`);
        } else if (!graduacoes.ok) {
            throw new Error(`HTTP error! status: ${graduacoes.status}`);
        }

        const docs_dojos = await dojos.json();
        const docs_graduacoes = await graduacoes.json();

        const docs = await fetch('http://localhost:3000/pessoas/api/' + id);
        if (!docs.ok) {
            throw new Error(`HTTP error! status: ${docs.status}`);
        }

        const result = await docs.json();
        const doc = result.data;

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

router.post('/inclui', async (req, res, next) => {
    var doc = setDoc(req);

    controlador.inclui(doc).then((response) => {
        mensagem = 'Pessoa incluída com sucesso!';
        res.redirect('/pessoas');
    }).catch((err)=>{
        mensagem = err;
        res.redirect('/pessoas');
    })
});

router.post('/altera/:id', async (req, res, next) => {
    var id = req.params.id;

    var doc = setDoc(req);

    controlador.altera(id, doc).then((response) => {
        mensagem = 'Pessoa alterada com sucesso!';
        res.redirect('/pessoas');
    }).catch((err)=>{
        mensagem = err;
        res.redirect('/pessoas');
    })
});

router.get('/api/:id', controlador.getPessoa);

router.get('/api/', controlador.getPessoas);

router.get('/api/filtro/ativos', controlador.getPessoasAtivas)

router.post('/api/', controlador.postPessoa);

router.patch('/api/:id', controlador.patchPessoa);

router.delete('/api/:id', controlador.deletePessoa);

export default router;
