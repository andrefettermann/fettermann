// dojoController.ts

import { Request, Response, NextFunction } from 'express';
import * as servico from "../../servicos/dojoServico";
//import { decripta } from '../../utils/crypto';

/**
 *  Controller de dojo.
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
                return res.status(204).json( {result} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const result: any = await servico.buscaTodos();
        if (result) {
            if (result.sucesso) {
                return res.status(200).send(result.docs)
            } else {
                res.status(500).json({ mensagem: result });
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
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
                res.status(500).json({ mensagem: response });
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao incluir os dados" });
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
            res.status(500).json({ mensagem: "Erro ao atualizar os dados" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export default {
    busca,
    buscaTodos,
    inclui,
    atualiza
}
