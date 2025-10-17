// taxaRoute.ts
import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/tokenManager';
import * as cobrancaServico from '../servicos/cobrancaServico';
import * as pessoaServico from '../servicos/pessoaServico'
import * as taxaServico from '../servicos/taxaServico'

/**
 * Router de cobrancas.
 * 
 * @author Andre Fettermann
 */

const router = express.Router();

var mensagem = "";

const pageAtiva = 'financeiro';

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await cobrancaServico.buscaTodos(token);
        const docs = cobrancaServico.formataLista(resposta.data);
        res.render('cobrancas',
            {
                docs,
                total: docs.length,
                mensagem,
                pageAtiva
            }
        );
        mensagem = "";
    } catch (err) {
        next(err);
    }
});

router.get('/novo', authMiddleware , async (req, res, next) => {
//    const doc = {
//        "valor_padrao": 0,
//    }

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const resposta_pessoas: any = await pessoaServico.buscaTodos(token);
    const docs_pessoas = resposta_pessoas.data;

    const resposta_taxas: any = await taxaServico.buscaTodos(token);
    const docs_taxas = resposta_taxas.data;

    try {
        res.render('cobranca',
            {
                title: 'Dados da cobranca (Inclusão)',
                doc: '',
                docs_pessoas,
                docs_taxas,
                action: '/cobrancas/inclui/',
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/pagamento/novo/:id', authMiddleware , async (req, res, next) => {
    const doc = {
        valor_pago: 0
    }
    const token = req.headers.authorization;
    const id = req.params.id;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const resposta_cobranca: any = await cobrancaServico.busca(token, id);
    const doc_cobranca = resposta_cobranca.data;

    try {
        res.render('pagamento',
            {
                title: 'Dados de pagamento (Inclusão)',
                id_cobranca: id,
                id_pagamento: '',
                doc,
                doc_cobranca,
                action: '/cobrancas/pagamento/inclui',
                pageAtiva
            }
        );
    } catch (err) {
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

        const resposta_pessoas: any = await pessoaServico.buscaTodos(token);
        const docs_pessoas = resposta_pessoas.data;

        const resposta_taxas: any = await taxaServico.buscaTodos(token);
        const docs_taxas = resposta_taxas.data;

        const resposta: any = await cobrancaServico.busca(token, id);
        const doc = cobrancaServico.formata(resposta.data);

        res.render('cobranca',
            {
                title: 'Dados da cobrança (Edição)',
                doc,
                docs_pessoas,
                docs_taxas,
                action: '/cobrancas/altera/' + id,
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

router.get('/pagamento/edita/:id', authMiddleware , async (req, res, next) => {
    const token = req.headers.authorization;
    const idPagamento = req.params.id;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    
    try {
        const resposta_cobranca: any = 
                        await cobrancaServico.buscaPorPagamento(token, idPagamento);
        const doc_cobranca = cobrancaServico.formata(resposta_cobranca.data);

        res.render('pagamento',
            {
                title: 'Dados de pagamento (Edição)',
                id_cobranca: doc_cobranca._id,
                id_pagamento: idPagamento,
                doc: doc_cobranca.pagamentos[0],
                doc_cobranca,
                action: '/cobrancas/pagamento/altera',
                pageAtiva
            }
        );
    } catch (err) {
        console.log(err)
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

        const resposta: any = await cobrancaServico.busca(token, id);
        const doc = cobrancaServico.formata(resposta.data);

        res.render('cobranca_detalhes',
            {
                title: 'Dados da cobrança (Consulta)',
                doc,
                pageAtiva
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await cobrancaServico.inclui(token, dados);

        mensagem = 'Cobrança incluída com sucesso!';
        res.redirect('/cobrancas');
    } catch (err) {
        next(err);
    }
});

router.post('/pagamento/inclui', authMiddleware, async (req, res, next) => {
    //const id = req.body.id_cobranca;
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await cobrancaServico.incluiPagamento(token, dados);

        mensagem = 'Pagamento incluído com sucesso!';
        res.redirect('/cobrancas');
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

        await cobrancaServico.atualiza(token, id, dados);

        mensagem = 'Cobrança alterada com sucesso!';
        res.redirect('/cobrancas');
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
})

router.post('/pagamento/altera', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        await cobrancaServico.atualizaPagamento(token, dados);

        mensagem = 'Pagamento alterado com sucesso!';
        res.redirect('/cobrancas');
    } catch (err: any) {
        console.error('ERRO COMPLETO:');
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Headers enviados:', err.config?.headers);
        next(err);
    }
})

export default router;
