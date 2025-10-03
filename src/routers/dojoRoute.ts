import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';

const router = express.Router();

var mensagem = "";

/* Busca todos os dojos */
router.get('/', async (req, res, next) => {
    try {
        const response: any = await dojoServico.buscaTodos();
        if (!response.sucesso) mensagem = response.erro;
        
        res.render('dojos',
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
        const resultPessoas: any = await pessoaServico.buscaTodos();
        if (!resultPessoas.sucesso) mensagem = resultPessoas.erro;
        
        res.render('dojo',
            {
                title: 'Dados do dojo (Inclusão)',
                doc: "",
                docs_pessoas: resultPessoas.docs,
                action: '/dojos/inclui/',
                mensagem
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const responseGraduacoes = await graduacaoServico.buscaTodos();
        const responseDojo = await dojoServico.busca(id);
        res.render('dojo_detalhes',
            {
                title: 'Dados do dojo (Consulta)',
                doc: responseDojo.doc,
                docs_graduacoes: responseGraduacoes.docs,
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
        const responsePessoas = await pessoaServico.buscaTodos();
        const responseDojo = await dojoServico.busca(id);
        res.render('dojo',
            {
                title: 'Dados do dojo (Edição)',
                doc: responseDojo.doc,
                docs_pessoas: responsePessoas.docs,
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
        await dojoServico.inclui(dados);
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
        await dojoServico.atualiza(id, dados);
        mensagem = 'Dojo alterado com sucesso!';
        console.log(mensagem)
        res.redirect('/dojos');
    } catch (err) {
        next(err);
    }
})

export default router;
