import express from 'express';
import * as dojoServico from '../servicos/dojoServico';
import * as graduacaoServico from '../servicos/graduacaoServico';
import { authMiddleware } from '../middleware/tokenManager';
import { convertDdMmYyyyToDate, getCurrentMonth } from '../utils/date';
import axios from 'axios';
import dotenv from 'dotenv'
import { formataValorComDecimais } from '../utils/formata_decimal';

dotenv.config()

const router = express.Router();

const API_URL = process.env.API_URL;

//const API_URL = "http://localhost:3001/api";

function formataTaxas(osDados: any): any {
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


router.get('/', async (req, res, next) => {
    try {
        res.render('consulta_publica',
            {
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/* Busca todos os dojos */
router.get('/dojos', async (req, res, next) => {
    try {
        const result: any = await dojoServico.buscaTodos();        
        res.render('consulta_dojos',
            {
                docs: result.docs,
                total: result.docs.length,
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca todas as pessoas */
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
        const response:any = await axios.get(url , {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        });

        const docs = response.data;
        res.render('consulta_aniversariantes',
            {
                docs,
                total: docs.length,
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

/** Busca todas as graduacoes */
router.get('/graduacoes', async (req, res, next) => {
    try {
        const response = await graduacaoServico.buscaTodos();
        res.render('consulta_graduacoes',
            {
                docs: response.docs,
                total: response.docs.length,
                mes: getCurrentMonth()
            }
        );
    } catch (err) {
        next(err);
    }
});

/** Busca todas as taxas */
router.get('/taxas', authMiddleware, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const url = API_URL + '/api/taxas/lista/todos';
        const response:any = await axios.get(url , {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
                'User-Agent': 'PostmanRuntime/7.48.0',
                'Connection': 'keep-alive'
            }
        });

        const docs = formataTaxas(response.data);;
        res.render('consulta_taxas',
            {
                docs: docs,
                total: docs.length,
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

export default router;
