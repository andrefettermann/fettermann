/**
 *  graduacaoController.ts
 * 
 *  Controller de graduacao.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import GraduacaoRepository  from "../repositories/graduacaoRepository";
import { decripta } from '../utils/crypto';

const repositorio = new GraduacaoRepository()

async function buscaPeloId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response: any = await repositorio.find(id);
        if (response.success) {
            response.doc[0].pessoas.forEach((p: any) => {
                console.log(p.nome)
                p.nome = decripta(p.nome)
            });
            return res.status(200).send(response.doc[0])
        } else {
            console.log(response.error)
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const doc: any = await repositorio.findAll();
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
    buscaPeloId,
    buscaTodos,
}
