// taxaRoute.ts
import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/tokenManager';
import * as taxaServico from '../servicos/taxaServico';
import * as cobrancaServico from '../servicos/cobrancaServico';

/**
 * Router de taxas.
 * 
 * @author Andre Fettermann
 */

const router = express.Router();

var mensagem = "";

const pageAtiva = 'financeiro';

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        //const response = await taxaServico.buscaTodos();
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const resposta: any = await taxaServico.buscaTodos(token);
        const docs = taxaServico.formataLista(resposta.data);
        res.render('taxas',
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

router.get('/novo', async (req, res, next) => {
    const doc = {
        "valor_padrao": 0,
    }
    try {
        res.render('taxa',
            {
                title: 'Dados da taxa (Inclusão)',
                doc,
                action: '/taxas/inclui/',
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

        const resposta: any = await taxaServico.busca(token, id);
        const doc = taxaServico.formata(resposta.data);
        console.log(doc)
        res.render('taxa',
            {
                title: 'Dados da taxa (Edição)',
                doc,
                action: '/taxas/altera/' + id,
                pageAtiva
            }
        );
    } catch (err) {
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

        const resposta_cobrancas: any = 
                        await cobrancaServico.buscaPorTaxa(token, id);
        const docs_cobrancas = 
                    cobrancaServico.formataLista(resposta_cobrancas.data);

        const resposta: any = await taxaServico.busca(token, id);
        const doc = resposta.data;
        res.render('taxa_detalhes',
            {
                title: 'Dados da taxa (Consulta)',
                doc,
                docs_cobrancas,
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

        await taxaServico.inclui(token, dados);

        mensagem = 'Taxa incluída com sucesso!';
        res.redirect('/taxas');
    } catch (err) {
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

        await taxaServico.atualiza(token, id, dados);

        mensagem = 'Taxa alterada com sucesso!';
        res.redirect('/taxas');
    } catch (err) {
        next(err);
    }
})

export default router;
