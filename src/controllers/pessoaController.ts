/* pessoaRouters.ts */
import { Request, Response, NextFunction } from 'express';
import Pessoa from '../models/pessoa';
import * as repositorio from '../repositories/pessoaRepository';
import { decripta } from '../utils/crypto';

function formatDateToDDMMYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

async function inclui(doc: any) {
     await repositorio.createPessoa(doc).then((result) => {
            return result;
     }).catch(error=>{
        throw error;

        //return {
        //    'status': 'Failed',
        //    'err': error
        //}
     });
}

async function altera(id: string, doc: any) {
    await repositorio.updatePessoa(id, doc).then((result) => {
        return result;
     }).catch(error=>{
        throw error;
    });
}

async function getPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const doc = await repositorio.getPessoa(id);
    
    if (doc) {
        doc.data.nome = decripta(doc.data.nome);

        if (doc.data.cpf) doc.data.cpf = decripta(doc.data.cpf);

        doc.data.promocoes.forEach((p: { data_formatada: string; data: string; })=>{
            p.data_formatada = formatDateToDDMMYYYY(new Date(p.data));
        })

        doc.data.pagamentos.forEach((p: { data_formatada: string; data: string; })=>{
            p.data_formatada = formatDateToDDMMYYYY(new Date(p.data));
        })

        res.json(doc);
    } else {
        res.sendStatus(404);
    }
}

async function getPessoas(req: Request, res: Response, next: NextFunction) {
    const docs = await repositorio.getPessoas();
    if (docs.status === 'Success') {
        docs.data?.forEach(d => {
            d.nome = decripta(d.nome);
            if (d.cpf) decripta(d.cpf);
        })
    }
    
    res.json(docs.data);
}

async function getPessoasAtivas(req: Request, res: Response, next: NextFunction) {
    const docs = await repositorio.getPessoasAtivas();
    if (docs.status === 'Success') {
        docs.data?.forEach(d => {
            d.nome = decripta(d.nome);
            if (d.cpf) decripta(d.cpf);
        })
    }
    res.json(docs);
}

async function postPessoa(req: Request, res: Response, next: NextFunction) {
    const pessoa = req.body as Pessoa;
    const result = await repositorio.createPessoa(pessoa);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const pessoa = req.body as Pessoa;
    /*
    const result = await repositorio.update(id, pessoa);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
    */
}

async function deletePessoa(req: Request, res: Response, next: NextFunction) {
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
    getPessoa,
    getPessoas,
    getPessoasAtivas,
    postPessoa,
    patchPessoa,
    deletePessoa,
    inclui,
    altera
}
