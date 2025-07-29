/* pessoaRouters.ts */
import { Request, Response, NextFunction } from 'express';
import Pessoa from '../models/pessoa';
import * as repositorio from '../repositories/pessoaRepository';
import * as pessoaRepositorio from '../repositories/PessoaRepositorio';
import { decripta } from '../utils/crypto';
import { formatDateToDDMMYYYY } from '../utils/date';


async function getPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    //const doc = await repositorio.getPessoa(id);
    const docs: any = await pessoaRepositorio.find(id);
    
    if (docs) {
        const pessoa = docs[0];
        pessoa.nome = decripta(pessoa.nome);

        if (pessoa.cpf) pessoa.cpf = decripta(pessoa.cpf);

        pessoa.promocoes.forEach((p: { data_formatada: string; data: string; })=>{
            p.data_formatada = formatDateToDDMMYYYY(new Date(p.data));
        })

        pessoa.pagamentos.forEach((p: { data_formatada: string; data: string; })=>{
            p.data_formatada = formatDateToDDMMYYYY(new Date(p.data));
        })

        res.json(pessoa);
    } else {
        res.sendStatus(404);
    }
}

async function getPessoas(req: Request, res: Response, next: NextFunction) {
    const docs: any = await pessoaRepositorio.findAll();
    if (docs) {
        docs.forEach((d: { nome: string; cpf: string; }) => {
            d.nome = decripta(d.nome);
            if (d.cpf) decripta(d.cpf);
        })
        
        docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

        res.json(docs);
    } else {
        res.sendStatus(404);
    }
}

async function getPessoasSituacao(req: Request, res: Response, next: NextFunction) {
    const situacao = req.params.situacao;
    const docs: any = await pessoaRepositorio.findBySituacao(situacao);
    if (docs) {
        docs.forEach((d: { nome: string; cpf: string; }) => {
            d.nome = decripta(d.nome);
            if (d.cpf) decripta(d.cpf);
        })
        
        docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

        res.json(docs);
    } else {
        res.sendStatus(404);
    }
}

async function getPessoasAniversariantes(req: Request, res: Response, next: NextFunction) {
    const mes = req.params.mes;

    const docs: any = await repositorio.getPessoasAniversario(mes);
    if (docs) {
        docs.forEach((d: { nome: string; cpf: string; }) => {
            d.nome = decripta(d.nome);
            if (d.cpf) decripta(d.cpf);
        })
        
        docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

        res.json(docs);
    } else {
        res.sendStatus(404);
    }
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
    getPessoasSituacao,
    getPessoasAniversariantes,
    postPessoa,
    patchPessoa,
    deletePessoa,
}
