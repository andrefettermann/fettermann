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

async function buscaDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const doc: any = await repositorio.getDojo(id);
        if (doc.result = "Success") {
            
            doc.docs.forEach((element: any) => {
                element.professor.forEach((p: any) =>{
                    p.nome = decripta(p.nome);
                })
                //element.professor.nome = 
            });

           return res.status(200).send(doc.docs)
        } else {
            res.status(500).json({ mensagem: doc.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }

}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const doc: any = await repositorio.getDojos();
        if (doc.result = "Success") {
            doc.docs.forEach((element: any) => {
                element.professor.forEach((p: any) =>{
                    p.nome = decripta(p.nome);
                })
                //element.professor.nome = 
            });
           return res.status(200).send(doc.docs)
        } else {
            res.status(500).json({ mensagem: doc.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    const dojo = req.body;
    
    try {
        const result: any = await repositorio.createDojo(dojo);
        if (result.sucess) {
            res.status(201).json(result);
        
        } else {
            res.status(500).json({ mensagem: result.error });
        }
    } catch (error) {
        console.log("e: " + error)
        res.status(500).json({ mensagem: error });
    }
}


export default {
    buscaDojo,
    buscaTodos,
    inclui
}
