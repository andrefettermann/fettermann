/* pessoaRoute.ts */
import express from 'express';
import { convertDdMmYyyyToDate, getCurrentMonth } from '../utils/date';
import * as pessoaServico from '../servicos/pessoaServico';
import * as dojoServico from '../servicos/dojoServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import axios from 'axios';
import { authMiddleware } from '../middleware/tokenManager';
import dotenv from 'dotenv'

const router = express.Router();

dotenv.config()

const API_URL = process.env.API_URL;
//const API_URL = "http://localhost:3001/api";

var mensagem: string = "";

/** Busca todas as pessoas */
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        //const result = await pessoaServico.buscaTodos();

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = API_URL + '/api/pessoas/lista/todos';
        const response: any = await axios.get(url , {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        const docs = response.data;
        res.render('pessoas',
            {
                title: docs.length + ' pessoa(s) encontrada(s)',
                docs,
                total: docs.length,
                mensagem,
                logo: 'images/logo-sm.png',
                mes: getCurrentMonth()
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

        const url = API_URL + '/api/pessoas/lista/situacao/' + situacao;
        const response: any = await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        if (situacao === 'Ativo') situacao = "ativa(s)";
        else situacao = "inativa(s)";

        const docs = response.data;
        res.render('pessoas',
            {
                title: docs.length + ' pessoa(s) '+ situacao + ' encontrada(s)',
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
router.get('/aniversariantes/:mes', authMiddleware, async (req, res, next) => {
    const mes = req.params.mes;
    try {
//        const response = 
//            await pessoaServico.buscaAniversariantes(req.params.mes);

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = API_URL + '/api/pessoas/lista/aniversariantes/' + mes;
        const response:any = await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        const docs = response.data;
        res.render('pessoas',
            {
                title: docs.length + ' aniversariante(s) do mês encontrado(s)',
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

/** Busca os professsores */
router.get('/professores', authMiddleware, async (req, res, next) => {
    try {
        //const response = 
        //    await pessoaServico.buscaProfessores();
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = API_URL + '/api/pessoas/lista/professores/';
        const response:any = await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        const docs = response.data;
        res.render('pessoas',
            {
                title: docs.length + ' professor(es) encontrado(s)',
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
    const token = req.cookies?.authToken;
    try {
        const dojos = await dojoServico.buscaTodos();
        const graduacoes = await graduacaoServico.buscaTodos();

        const docsDojos = dojos.docs;
        const docsGraduacoes = graduacoes.docs;
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
router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    try {
        const graduacoes = await graduacaoServico.buscaTodos();
        //const response = await pessoaServico.busca(id);

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = API_URL + '/api/pessoas/busca/' + id;
        const response:any = await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        const docs_graduacoes = graduacoes.docs;
        const doc = response.data;
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
router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    try {
        const dojos = await dojoServico.buscaTodos();
        const graduacoes = await graduacaoServico.buscaTodos();

        //const response = await pessoaServico.busca(id);
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = API_URL + '/api/pessoas/busca/' + id;
        const response:any = await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });


        const docs_dojos = dojos.docs;
        const docs_graduacoes = graduacoes.docs;
        const doc = response.data;
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
        const response = await pessoaServico.inclui(req.body);
        mensagem = 'Pessoa incluída com sucesso!';
        res.redirect('/pessoas');
    } catch (err) {
        next(err);
    }
});

/** Altera os dados da pessoa */
router.post('/altera/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const response = await pessoaServico.atualiza(id, req.body);
        mensagem = 'Pessoa alterada com sucesso!';
        res.redirect('/pessoas');
    } catch (err) {
        next(err);
    }
});

/** Exclui os dados da organizacao */
router.get('/exclui/:id', async (req, res, next) => {
    const id = req.params.id;
    const token = req.cookies?.authToken;
})

export default router;
