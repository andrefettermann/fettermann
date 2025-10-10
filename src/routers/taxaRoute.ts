// taxaRoute.ts
import express from 'express';
import axios from 'axios';
import { authMiddleware } from '../middleware/tokenManager';
import { formataValorComDecimais } from '../utils/formata_decimal';
import dotenv from 'dotenv'


/**
 * Router de taxas.
 * 
 * @author Andre Fettermann
 */

const router = express.Router();

dotenv.config()

var mensagem = "";

const API_URL = process.env.API_URL;

function formataDoc(osDados: any): any {
    osDados.forEach((element: any) => {        
        if (element.valor_padrao) {
            element.valor_padrao = formataValorComDecimais(
                element.valor_padrao.$numberDecimal.replace('.', ','));
        }
    });

    osDados.sort((a: { tipo: string, nome: string; }, b: { tipo: string, nome: string; }) => {
        var tipoa = a.tipo.toLowerCase();
        var tipob = b.tipo.toLowerCase();
        var nomea = a.nome.toLowerCase();
        var nomeb = b.nome.toLowerCase();

        if (tipoa < tipob) {
            return -1;
        }
        if (tipoa > tipob) {
            return 1;
        }

        if (nomea < nomeb) {
            return -1;
        }
        if (nomea > nomeb) {
            return 1;
        }
        return 0;
    });

    return osDados;
}

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        //const response = await taxaServico.buscaTodos();
        
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = `${API_URL}/api/taxas/lista/todos`;
        const response: any = await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
            'User-Agent': 'PostmanRuntime/7.48.0',
            'Connection': 'keep-alive'
        }
        });

        const docs = formataDoc(response.data);
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
    const doc = {
        "valor_padrao": 0,
    }
    try {
        res.render('taxa',
            {
                title: 'Dados da taxa (Inclusão)',
                doc,
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

        const url = `${API_URL}/api/taxas/busca/${id}`;
        const response: any = await axios.get(url, {
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

        const url = `${API_URL}/api/taxas/busca/${id}`;
        const response: any = await axios.get(url, {
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

        const url = `${API_URL}/api/taxas/inclui`;
        await axios.post(url, 
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

        const url = `${API_URL}/api/taxas/altera/${id}`;
        await axios.patch(url, 
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
