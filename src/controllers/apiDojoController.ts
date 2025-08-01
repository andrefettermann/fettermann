/* pessoaRouters.ts */
import { Request, Response, NextFunction } from 'express';
import * as repositorio from '../repositories/apiDojoRepository';
import { IDojo } from '../models/dojo';
import { decripta } from '../utils/crypto';

async function getDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const dojo: IDojo | any = await repositorio.getDojo(id);
        if (dojo) {
            dojo.professor.nome = decripta(dojo.professor.nome);
            res.json(dojo);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function getDojos(req: Request, res: Response, next: NextFunction) {
    try {
        const dojos: IDojo[] | any = await repositorio.getDojos();
        if (dojos) {
            dojos.forEach((d: any) => {
                d.professor.nome = decripta(d.professor.nome);
                if (d.professor.cpf) decripta(d.professor.cpf);
            })
            res.json(dojos);
        } else res.sendStatus(404);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function postDojo(req: Request, res: Response, next: NextFunction) {
    const dojo = req.body;
    
    try {
        const result: IDojo | any = await repositorio.createDojo(dojo);
        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function patchDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const graduacao = req.body ;

    try {
        const result: IDojo | any = await repositorio.updateDojo(id, graduacao);
        if (result)
            res.json(result);
        else
            res.sendStatus(404);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function deleteDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    /*
    const success = await repositorio.remove(id);
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
    */
}

export default {
    getDojo,
    getDojos,
    postDojo,
    patchDojo,
    deleteDojo
}
