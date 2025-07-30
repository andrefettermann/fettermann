/* apiGraduacaoController.ts */
import { Request, Response, NextFunction } from 'express';
import * as repositorio from '../repositories/apiGraduacaoRepository';
import { IGraduacao } from 'src/models/graduacao';


async function getGraduacao(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const graduacao: IGraduacao | any = await repositorio.getGraduacao(id);
        if (graduacao)
            res.json(graduacao);
        else
            res.sendStatus(404);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function getGraduacoes(req: Request, res: Response, next: NextFunction) {
    try {
        const graduacoes: IGraduacao[] | any = await repositorio.getGraduacoes();
        if (graduacoes) 
            res.json(graduacoes);
        else res.sendStatus(404);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function postGraduacao(req: Request, res: Response, next: NextFunction) {
    const graduacao = req.body;
    
    try {
        const result: IGraduacao | any = await repositorio.createGraduacao(graduacao);
        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }

}

async function patchGraduacao(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const graduacao = req.body ;

    try {
        const result: IGraduacao | any = await repositorio.updateGraduacao(id, graduacao);
        if (result)
            res.json(result);
        else
            res.sendStatus(404);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }

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
}
