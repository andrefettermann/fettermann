/* pessoaRouters.ts */
import { Request, Response, NextFunction } from 'express';
import * as repositorio from '../../repositories/dojoMongooseRepository';
import * as pessoaRepositorio from '../../repositories/pessoaMongooseRepository';
import { IDojo } from '../../models/dojo';
import { decripta } from '../../utils/crypto';
import { IPessoa } from 'src/models/pessoa';

async function getDojo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const dojo: IDojo | any = await repositorio.getDojo(id);
        if (dojo) {
            dojo.professor.nome = decripta(dojo.professor.nome);

            // busca os alunos do dojo
            const pessoas: IPessoa[] | any = await pessoaRepositorio.getPessoasDojo(dojo._id);
            if (pessoas) {
                pessoas.forEach((p: { nome: string; cpf: string; }) => {
                    p.nome = decripta(p.nome);
                    if (p.cpf) decripta(p.cpf);
                })
                
                pessoas.sort((a: { nome: string; }, b: { nome: string; }) => {
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
                dojo.pessoas = pessoas;
            }
            
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
