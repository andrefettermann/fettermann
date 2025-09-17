import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';

const router = express.Router();

var mensagem = "";

/* Busca todos os dojos */
router.get('/', async (req, res, next) => {
    try {
        const response = await dojoServico.buscaTodos();
        const docs = response.docs;
        res.render('dojos',
            {
                title: 'Dojos cadastrados',
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
        const pessoas = await pessoaServico.buscaTodos();
        const docsPessoas = pessoas.docs;
        res.render('dojo',
            {
                title: 'Dados do dojo (Inclusão)',
                doc: "",
                docs_pessoas: docsPessoas,
                action: '/dojos/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const graduacoes = await graduacaoServico.buscaTodos();
        const response = await dojoServico.busca(id);

        const docs_graduacoes = graduacoes.docs;
        const doc = response.docs;
        res.render('dojo_detalhes',
            {
                title: 'Dados do dojo (Consulta)',
                doc,
                docs_graduacoes,
                action: '/dojos/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const pessoas = await pessoaServico.buscaTodos();
        const docsPessoas = pessoas.docs;

        const response = await dojoServico.busca(id);
        const doc = response.docs;
        res.render('dojo',
            {
                title: 'Dados do dojo (Edição)',
                doc,
                docs_pessoas: docsPessoas,
                action: '/dojos/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', async (req, res, next) => {
    var dados = req.body;
    try {
        const response = await dojoServico.inclui(dados);
        mensagem = 'Dojo incluído com sucesso!';
        res.redirect('/dojos');
    } catch (err) {
        next(err);
    }
});

router.post('/altera/:id', async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        const response = await dojoServico.atualiza(id, dados);
        mensagem = 'Dojo alterado com sucesso!';
        console.log(mensagem)
        res.redirect('/dojos');
    } catch (err) {
        console.log(err)
        next(err);
    }
})

export default router;
