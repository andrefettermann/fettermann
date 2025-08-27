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

async function buscaPeloId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response: any = await repositorio.find(id);
        if (response.result = "Success") {
            
            response.docs.forEach((element: any) => {
                element.professor.forEach((p: any) =>{
                    p.nome = decripta(p.nome);
                })
            });
           return res.status(200).send(response.docs)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await repositorio.findAll();
        if (response.result = "Success") {
            response.docs.forEach((element: any) => {
                element.professor.forEach((p: any) =>{
                    p.nome = decripta(p.nome);
                })
                //element.professor.nome = 
            });
           return res.status(200).send(response.docs)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;
    
    try {
        const response: any = await repositorio.insert(dados);
        if (response.success) {
            res.status(201).json(response);
        
        } else {
            res.status(500).json({ mensagem: response.error });
        }
    } catch (error) {
        console.log("e: " + error)
        res.status(500).json({ mensagem: error });
    }
}

async function atualiza(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const dados = req.body ;

    try {
        const response: any = await repositorio.update(id, dados);
        if (response.success) {
            res.status(201).json(response);
        
        } else {
            res.status(500).json({ mensagem: response.error });
        }
    } catch (error) {
        console.log("e: " + error)
        res.status(500).json({ mensagem: error });
    }
}

export default {
    buscaPeloId,
    buscaTodos,
    inclui,
    atualiza
}
