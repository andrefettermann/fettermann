// graduacaoController.ts

import { Request, Response, NextFunction } from 'express';
import * as servico from "../../servicos/graduacaoServico";
import { decripta } from '../../utils/crypto';

/**
 *  Controller de graduacao.
 * 
 * @author Andre Fettermann
 */

async function busca(req: Request, res: Response, next: NextFunction) {
    try {
        const result: any = await servico.busca(req.params.id);
        if (result) {
            if (result.sucesso) {
                return res.status(200).send(result.doc)
            } else {
                res.status(500).json({ response: result });
            }
        } else {
            res.status(500).json({ response: result });    
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const result: any = await servico.buscaTodos();
        if (result) {
            if (result.sucesso) {
                return res.status(200).send(result.doc)
            } else {
                res.status(500).json({ result });
            }
        } else {
            res.status(500).json({ result });    
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.inclui(req.body);
        if (response) {
            if (response.sucesso) {
                res.status(201).json(response);
            } else {
                res.status(500).json({ response });
            }
        } else {
            res.status(500).json({ response });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function atualiza(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.atualiza(req.params.id, req.body);
        if (response) {
            if (response.success) {
                res.status(201).json(response);
            } else {
                res.status(500).json({ mensagem: response.error });
            }
        } else {
            res.status(500).json({ mensagem: response.error });
        }
    } catch (error) {
        console.log("e: " + error)
        res.status(500).json({ mensagem: error });
    }
}

export default {
    busca,
    buscaTodos,
    inclui,
    atualiza
}
