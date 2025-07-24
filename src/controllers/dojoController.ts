/* pessoaRouters.ts */
import { Request, Response, NextFunction } from 'express';
import Dojo from '../models/dojo';
import * as repositorio from '../repositories/dojoRepository';

async function getDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    /*
    const pessoa = await repositorio.find(id);
    if (pessoa)
        res.json(pessoa);
    else
        res.sendStatus(404);
    */
}

async function getDojos(req: Request, res: Response, next: NextFunction) {
    const response = await repositorio.getDojos();
    res.json(response);
}

async function postDojo(req: Request, res: Response, next: NextFunction) {
    const dojo = req.body as Dojo;
    const result = await repositorio.createDojo(dojo);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const pessoa = req.body as Dojo;
    /*
    const result = await repositorio.update(id, pessoa);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
    */
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
