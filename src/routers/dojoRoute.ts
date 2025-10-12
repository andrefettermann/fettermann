// src/routers/dojoRoute.ts
import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';

const router = express.Router();
const pageAtiva = 'dojos';

var mensagem = '';

/* Busca todos os dojos */
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await dojoServico.buscaTodos(token);
        const docs = resposta.data;

        res.render('dojos',
            {
                docs: docs,
                total: docs.length,
                mensagem,
                pageAtiva
            }
        );
        mensagem = "";
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
});

router.get('/novo', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const respostaPessoas: any = await pessoaServico.buscaProfessores(token);
        console.log(respostaPessoas.data)
        const docs_pessoas = respostaPessoas.data;

        res.render('dojo',
            {
                title: 'Dados do dojo (Inclusão)',
                doc: "",
                docs_pessoas,
                action: '/dojos/inclui/',
                mensagem,
                pageAtiva
            }
        );
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
});

router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const respostaGraduacoes = await graduacaoServico.buscaTodos(token);

        const resposta: any = await dojoServico.busca(token, id);
        const doc = resposta.data;
        res.render('dojo_detalhes',
            {
                title: 'Dados do dojo (Consulta)',
                doc,
                docs_graduacoes: respostaGraduacoes.data,
                action: '/dojos/altera/' + id,
                pageAtiva
            }
        );
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const respostaPessoas: any = 
            await pessoaServico.buscaProfessores(token);
        const docs_pessoas = respostaPessoas.data;

        const resposta: any = await dojoServico.busca(token, id);
        const doc = resposta.data;
        res.render('dojo',
            {
                title: 'Dados do dojo (Edição)',
                doc,
                docs_pessoas,
                action: '/dojos/altera/' + id,
                pageAtiva
            }
        );
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);

        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    var dados = req.body;
    try {
        //await dojoServico.inclui(dados);
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await dojoServico.inclui(token, dados);

        mensagem = 'Dojo incluído com sucesso!';
        res.redirect('/dojos');
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
});

router.post('/altera/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await dojoServico.atualiza(token, id, dados);

        mensagem = 'Dojo alterado com sucesso!';
        res.redirect('/dojos');
    } catch (err: any) {
        console.error(">>>>>>>>>>> " + err);
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
})

export default router;
