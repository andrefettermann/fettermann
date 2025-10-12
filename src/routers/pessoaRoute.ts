/* pessoaRoute.ts */
import express from 'express';
import { getCurrentMonth } from '../utils/date';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import * as dojoServico from '../servicos/dojoServico';
import axios from 'axios';
import { authMiddleware } from '../middleware/tokenManager';

const router = express.Router();

const API_URL = process.env.API_URL;
const pageAtiva = 'pessoas';

var mensagem: string = "";

/** Busca todas as pessoas */
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        //const result = await pessoaServico.buscaTodos();

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const respostaPessoas: any = await pessoaServico.buscaTodos(token);
        const docs = respostaPessoas.data;
        res.render('pessoas',
            {
                docs,
                mensagem,
                logo: 'images/logo-sm.png',
                mes: getCurrentMonth(),
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

/** Busca as pessoas ativas ou inativas */
router.get('/situacao/:situacao', authMiddleware, async (req, res, next) => {
    var situacao = req.params.situacao;
    try {
        //const response = await pessoaServico.buscaSituacao(situacao);

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = 
            await pessoaServico.buscaSituacao(token, situacao);
        const docs = resposta.data;
        
        if (situacao === 'Ativo') situacao = "ativa(s)";
        else situacao = "inativa(s)";

        res.render('pessoas',
            {
                docs,
                mensagem,
                logo: '../../images/logo-sm.png',
                mes: getCurrentMonth(),
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

/** Busca os aniversariantes do mes informado */
router.get('/aniversariantes/:mes', authMiddleware, async (req, res, next) => {
    const mes = req.params.mes;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = 
            await pessoaServico.buscaAniversariantes(token, mes);
        const docs = resposta.data;
        res.render('pessoas',
            {
                docs,
                mensagem,
                logo: '/images/logo-sm.png',
                mes: getCurrentMonth(),
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca os professsores */
router.get('/professores', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await pessoaServico.buscaProfessores(token);
        const docs = resposta.data;
        res.render('pessoas',
            {
                docs,
                mensagem,
                logo: '/images/logo-sm.png',
                mes: getCurrentMonth(),
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Abre a tela de inclusao dos dados da pessoa*/
router.get('/novo', authMiddleware, async (req, res, next) => {
    const token = req.cookies?.authToken;
    try {
        //const dojos = await dojoServico.buscaTodos();
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }


        const respostaDojos: any = await dojoServico.buscaTodos(token);

        const graduacoes: any = await graduacaoServico.buscaTodos(token);

        const docsDojos = respostaDojos.data;
        const docsGraduacoes = graduacoes.data;
        res.render('pessoa',
            {
                title: 'Dados da pessoa (Inclusão)',
                doc: "",
                docs_dojos: docsDojos,
                docs_graduacoes: docsGraduacoes,
                total_promocoes: 0,
                total_pagamentos: 0,
                action: '/pessoas/inclui/',
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Abre a tela com os detalhes da pessoa */
router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const respostaGraduacoes: any = await graduacaoServico.buscaTodos(token);
        const docs_graduacoes = respostaGraduacoes.data;

        const respostaPessoas: any = await pessoaServico.busca(token, id);
        const doc = respostaPessoas.data;

        res.render('pessoa_detalhes',
            {
                title: 'Dados da pessoa (Consulta)',
                doc,
                docs_graduacoes,
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

/** Abre a tela para alteracao dos dados da pessoa */
router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const respostaGraduacoes = await graduacaoServico.buscaTodos(token);
        const docs_graduacoes = respostaGraduacoes.data;

        const respostaDojos = await dojoServico.buscaTodos(token);
        const docs_dojos = respostaDojos.data;

        const respostaPessoas: any = await pessoaServico.busca(token, id);
        const doc = respostaPessoas.data;

        res.render('pessoa',
            {
                title: 'Dados da pessoa (Alteração)',
                doc,
                action: '/pessoas/altera/' + id,
                total_pagamentos: doc.pagamentos.length,
                total_promocoes: doc.promocoes.length,
                docs_dojos,
                docs_graduacoes,
                mensagem: '',
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Inclui os dados da pessoa */
router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    try {
        //await pessoaServico.inclui(req.body);
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await pessoaServico.inclui(token, dados);        

        mensagem = 'Pessoa incluída com sucesso!';
        res.redirect('/pessoas');
    } catch (err) {
        next(err);
    }
});

/** Altera os dados da pessoa */
router.post('/altera/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await pessoaServico.atualiza(token, id, dados);

        mensagem = 'Pessoa alterada com sucesso!';
        res.redirect('/pessoas');
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);

        next(err);
    }
});

/** Exclui os dados da pessoa */
router.get('/exclui/:id', async (req, res, next) => {
    const id = req.params.id;
    const token = req.cookies?.authToken;
})

export default router;
