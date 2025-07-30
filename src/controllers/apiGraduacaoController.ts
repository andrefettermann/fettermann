/* graduacaoRouters.ts */
import { Request, Response, NextFunction } from 'express';
import Graduacao from '../models/graduacao';
import * as repositorio from '../repositories/apiGraduacaoRepository';

async function inclui(doc: Graduacao) {
     await repositorio.createGraduacao(doc).then((result) => {
        return result;
     }).catch(err=>{
        return {
            'status': 'Failed',
            'err': err
        }
     });
}

async function altera(doc: Graduacao) {
    await repositorio.updateGraduacao(doc.getId(), doc).then((result) => {
        return result;
    }).catch(err=>{
        return {
            'status': 'Failed',
            'err': err
        }
     });
}

async function getGraduacao(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const response = await repositorio.getGraduacao(id);
    //if (response)
        res.json(response);
    //else
    //    res.sendStatus(404);
}

async function getGraduacoes(req: Request, res: Response, next: NextFunction) {
    const response = await repositorio.getGraduacoes();
    res.json(response);
}

async function postGraduacao(req: Request, res: Response, next: NextFunction) {
    const graduacao = req.body as Graduacao;
    
    const result = await repositorio.createGraduacao(graduacao);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchGraduacao(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const graduacao = req.body as Graduacao;
    /*
    const result = await repositorio.update(id, pessoa);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
    */
}

async function deleteGraduacao(req: Request, res: Response, next: NextFunction) {
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
    getGraduacao,
    getGraduacoes,
    postGraduacao,
    patchGraduacao,
    deleteGraduacao,
    inclui,
    altera
}
