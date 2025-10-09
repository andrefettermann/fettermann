// taxaRoute.ts
import express from 'express';
import * as taxaServico from '../servicos/taxaServico';
import axios from 'axios';
import { authMiddleware } from '../middleware/tokenManager';

/**
 * Router de taxas.
 * 
 * @author Andre Fettermann
 */

const router = express.Router();

var mensagem = "";

const API_URL = "https://fettermannaikidoapi.vercel.app/api";
//const API_URL = "http://localhost:3001/api";

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        //const response = await taxaServico.buscaTodos();
        
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response: any = await axios.get(API_URL + '/taxas/lista/todos', {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        const docs = response.data;
        res.render('taxas',
            {
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
        res.render('taxa',
            {
                title: 'Dados da taxa (Inclusão)',
                doc: "",
                action: '/taxas/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        //const response = await taxaServico.busca(req.params.id);

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response: any = await axios.get(API_URL + '/taxas/busca/' + id, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
        });

        const doc = response.data;
        res.render('taxa',
            {
                title: 'Dados da taxa (Edição)',
                doc,
                action: '/taxas/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    try {
        //const response = await taxaServico.busca(id);
                const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response: any = await axios.get(API_URL + '/taxas/busca/' + id, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
        });

        const doc = response.data;
        res.render('taxa_detalhes',
            {
                title: 'Dados da taxa (Consulta)',
                doc,
                //action: '/taxas/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', authMiddleware, async (req, res, next) => {
    const dados = req.body;
    try {
//        await taxaServico.inclui(dados);

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response: any = await axios.post(API_URL + '/taxas/inclui', 
            dados, 
            {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
        });

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
        //await taxaServico.atualiza(id, dados);
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const response: any = await axios.patch(API_URL + '/taxas/altera/' + id, 
            dados, 
            {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
        });
        mensagem = 'Taxa alterada com sucesso!';
        res.redirect('/taxas');
    } catch (err) {
        next(err);
    }
})

export default router;
