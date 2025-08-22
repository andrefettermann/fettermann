/**
 *  graduacaoController.ts
 * 
 *  Controller de graduacao.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import GraduacaoRepository  from "../repositories/graduacaoRepository";

const repositorio = new GraduacaoRepository()

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const doc: any = await repositorio.getGraduacoes();
        if (doc.result = "Success") {
           return res.status(200).json(doc.docs)
        } else {
            res.status(500).json({ mensagem: doc.error });    
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: error });
    }
}

export default {
    buscaTodos,
}
