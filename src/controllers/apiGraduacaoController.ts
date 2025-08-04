/* apiGraduacaoController.ts */
import { Request, Response, NextFunction } from 'express';
import * as repositorio from '../repositories/apiGraduacaoRepository';
import * as pessoaRepositorio from '../repositories/apiPessoaRepository';
import { IGraduacao } from '../models/graduacao';
import { decripta } from '../utils/crypto';

async function getGraduacao(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const graduacao: IGraduacao | any = await repositorio.getGraduacao(id);
        if (graduacao)
            // busca os alunos na graduacao
            if (graduacao.pessoas) {
                
                graduacao.pessoas.forEach((p: { nome: string; cpf: string; }) => {
                    p.nome = decripta(p.nome);
                    if (p.cpf) decripta(p.cpf);
                })
                
                graduacao.pessoas.sort((a: { nome: string; }, b: { nome: string; }) => {
                    var fa = a.nome.toLowerCase();
                    var fb = b.nome.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
            }

            res.json(graduacao);
    } catch (error) {
        console.log(error)
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
