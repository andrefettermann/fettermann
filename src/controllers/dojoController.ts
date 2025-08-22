/**
 *  dojoController.ts
 * 
 *  Controller de dojo.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import * as repositorio from "../repositories/dojoRepository";
import { decripta } from '../utils/crypto';

async function getDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
}

async function getDojos(req: Request, res: Response, next: NextFunction) {
    try {
        const doc: any = await repositorio.getDojos();
        if (doc.result = "Success") {
            doc.docs.forEach((element: any) => {
                element.professor.nome = decripta(element.professor.nome);
            });
           return res.status(200).send(doc.docs)
        } else {
            res.status(500).json({ mensagem: doc.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export default {
    getDojo,
    getDojos,
}
