/* pessoaRoute.ts */
import express from 'express';
import { getCurrentMonth } from '../utils/date';
import * as pessoaServico from '../servicos/pessoaServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import * as dojoServico from '../servicos/dojoServico';
import * as cobrancaServico from '../servicos/cobrancaServico';
import { authMiddleware } from '../middleware/tokenManager';

const router = express.Router();

const pageAtiva = 'pessoas';

var mensagem: string = "";

/** Busca todas as pessoas */
router.get('/', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const response = await pessoaServico.buscaTodos(token);
        res.render('pessoas',
            {
                'docs': response,
                'logo': 'images/logo-sm.png',
                'mes': getCurrentMonth(),
                mensagem,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar todas as pessoas:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

/** Busca as pessoas ativas ou inativas */
router.get('/situacao/:situacao', authMiddleware, async (req, res, next) => {
    var { situacao } = req.params;
    const token = req.headers.authorization;

    try {
        const response = await pessoaServico.buscaSituacao(token, situacao);
        
        if (situacao === 'Ativo') situacao = "ativa(s)";
        else situacao = "inativa(s)";

        res.render('pessoas',
            {
                'docs': response,
                'logo': '../../images/logo-sm.png',
                'mes': getCurrentMonth(),
                mensagem,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar situação:', {
                status: err.response?.status,
                data: err.response?.data,
                situacao: req.params.situacao
            });
        }
        next(err);
    }
});

/** Busca os aniversariantes do mes informado */
router.get('/aniversariantes/:mes', authMiddleware, async (req, res, next) => {
    const { mes } = req.params;
    const token = req.headers.authorization;

    try {
        const response = 
            await pessoaServico.buscaAniversariantes(token, mes);
        res.render('pessoas',
            {
                'docs': response,
                'logo': '/images/logo-sm.png',
                'mes': getCurrentMonth(),
                mensagem,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar os aniversariantes:', {
                status: err.response?.status,
                data: err.response?.data,
                mes: req.params.mes
            });
        }
        next(err);
    }
});

/** Busca os professsores */
router.get('/professores', authMiddleware, async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const response = await pessoaServico.buscaProfessores(token);
        res.render('pessoas',
            {
                'docs': response,
                'logo': '/images/logo-sm.png',
                'mes': getCurrentMonth(),
                mensagem,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar os professores:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

/** Abre a tela de inclusao dos dados da pessoa*/
router.get('/novo', authMiddleware, async (req, res, next) => {
    const token = req.cookies?.authToken;

    try {
        const responseDojos = await dojoServico.buscaTodos(token);
        const responseGraduacoes = await graduacaoServico.buscaTodos(token);

        res.render('pessoa',
            {
                'title': 'Dados da pessoa (Inclusão)',
                'doc': "",
                'docs_dojos': responseDojos,
                'docs_graduacoes': responseGraduacoes,
                'total_promocoes': 0,
                'total_pagamentos': 0,
                'action': '/pessoas/inclui/',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir o formulario de novo dojo:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

/** Abre a tela com os detalhes da pessoa */
router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const responseGraduacoes = await graduacaoServico.buscaTodos(token);
        const responseCobrancas = await cobrancaServico.buscaPorPessoa(token, id);
        const response = await pessoaServico.busca(token, id);

        res.render('pessoa_detalhes',
            {
                'title': 'Dados da pessoa (Consulta)',
                'doc': response,
                'docs_graduacoes': responseGraduacoes,
                'docs_cobrancas': responseCobrancas,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar a pessoa:', {
                status: err.response?.status,
                data: err.response?.data,
                id: req.params.id
            });
        }
        next(err);
    }
});

/** Abre a tela para alteracao dos dados da pessoa */
router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const responseGraduacoes = await graduacaoServico.buscaTodos(token);
        const responseDojos = await dojoServico.buscaTodos(token);
        const response = await pessoaServico.busca(token, id);

        res.render('pessoa',
            {
                'title': 'Dados da pessoa (Alteração)',
                'doc': response,
                'action': `/pessoas/altera/${id}`,
                'total_promocoes': response.promocoes.length,
                'docs_dojos': responseDojos,
                'docs_graduacoes': responseGraduacoes,
                'mensagem': '',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar a pessoa:', {
                status: err.response?.status,
                data: err.response?.data,
                id: req.params.id
            });
        }

        next(err);
    }
});

/** Inclui os dados da pessoa */
router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await pessoaServico.inclui(token, dados);        

        mensagem = 'Pessoa incluída com sucesso!';
        res.redirect('/pessoas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao incluir a pessoa:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

/** Altera os dados da pessoa */
router.post('/altera/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await pessoaServico.atualiza(token, id, dados);

        mensagem = 'Pessoa alterada com sucesso!';
        res.redirect('/pessoas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar alterar a pessoa:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

/** Exclui os dados da pessoa */
router.get('/exclui/:id', async (req, res, next) => {
    const id = req.params.id;
    const token = req.cookies?.authToken;
})

export default router;
