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
    const token = req.headers.authorization;
    try {
        const response = await cobrancaServico.buscaTodos(token);
        res.render('cobrancas',
            {
                'docs': response,
                'total': response.length,
                mensagem,
                pageAtiva
            });
        mensagem = "";
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao buscar todas as cobrancas:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.get('/novo', authMiddleware , async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const responsePessoas: any = await pessoaServico.buscaTodos(token);
        const docsPessoas = responsePessoas.data;
    
        const responseTaxas: any = await taxaServico.buscaTodos(token);

        res.render('cobranca',
            {
                title: 'Dados da cobranca (Inclusão)',
                doc: '',
                docs_pessoas: docsPessoas,
                'docs_taxas': responseTaxas,
                action: '/cobrancas/inclui/',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de inclusao:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.get('/pagamento/novo/:id', authMiddleware , async (req, res, next) => {
    const doc = { valor_pago: 0 };
    const token = req.headers.authorization;
    const { id } = req.params;

    try {
        const response = await cobrancaServico.busca(token, id);
        res.render('pagamento',
            {
                'title': 'Dados de pagamento (Inclusão)',
                'id_cobranca': id,
                'id_pagamento': '',
                doc,
                'doc_cobranca': response,
                'action': '/cobrancas/pagamento/inclui',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de inclusao de um pagamento:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        const responsePessoas = await pessoaServico.buscaTodos(token);
        const responseTaxas = await taxaServico.buscaTodos(token);
        const response = await cobrancaServico.busca(token, id);

        res.render('cobranca',
            {
                'title': 'Dados da cobrança (Edição)',
                'doc': response,
                'docs_pessoas': responsePessoas,
                'docs_taxas': responseTaxas,
                'action': '/cobrancas/altera/' + id,
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de edicao de uma cobranca:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

router.get('/pagamento/edita/:id', authMiddleware , async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    
    try {
        const response = await cobrancaServico.buscaPorPagamento(token, id);
        res.render('pagamento',
            {
                'title': 'Dados de pagamento (Edição)',
                'id_cobranca': response._id,
                'id_pagamento': id,
                'doc': response[0].pagamentos[0],
                'doc_cobranca': response[0],
                'action': '/cobrancas/pagamento/altera',
                pageAtiva
            }
        );
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de edicao de um pagamento:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;
    try {        
        const response = await cobrancaServico.busca(token, id);

        res.render('cobranca_detalhes',
            {
                'title': 'Dados da cobrança (Consulta)',
                'doc': response,
                'mensagem': mensagem,
                pageAtiva
            }
        );
        mensagem = '';
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao exibir a pagina de detalhes de uma cobranca:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        
        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await cobrancaServico.inclui(token, dados);

        mensagem = 'Cobrança incluída com sucesso!';
        res.redirect('/cobrancas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao incluir uma cobranca:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
});

router.post('/pagamento/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await cobrancaServico.incluiPagamento(token, dados);

        mensagem = 'Pagamento incluído com sucesso!';
        res.redirect('/cobrancas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao incluir um pagamento:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }

        next(err);
    }
});

router.post('/altera/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const dados = req.body;
    const token = req.headers.authorization;

    try {
        await cobrancaServico.atualiza(token, id, dados);

        mensagem = 'Cobrança alterada com sucesso!';
        res.redirect('/cobrancas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao alterar uma cobranca:', {
                status: err.response?.status,
                data: err.response?.data,
                id
            });
        }
        next(err);
    }
})

router.post('/pagamento/altera', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    const token = req.headers.authorization;
    try {
        await cobrancaServico.atualizaPagamento(token, dados);

        mensagem = 'Pagamento alterado com sucesso!';
        res.redirect('/cobrancas');
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao alterar um pagamento:', {
                status: err.response?.status,
                data: err.response?.data,
            });
        }
        next(err);
    }
})

router.delete('/pagamento/exclui/:id_cobranca/:id_pagamento', authMiddleware, async (req, res, next) => {
    const { id_cobranca } = req.params;
    const { id_pagamento } = req.params;
    const token = req.headers.authorization;

    try {
        const response = await cobrancaServico.excluiPagamento(token, id_cobranca, id_pagamento);
        
        if (!response || !response.sucesso) {
            // Retorna erro como JSON
            return res.status(201).json({ 
                success: false, 
                message: response.mensagem 
            });
        }
        
        // Retorna sucesso como JSON
        res.json({ 
            success: true, 
            message: 'Pagamento excluído com sucesso!' 
        });
    } catch (err: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erro ao excluir um pagamento:', {
                status: err.response?.status,
                data: err.response?.data,
                id_cobranca,
                id_pagamento
            });
        }

        next(err);        
    }
});

export default router;
