/* pessoaRouters.ts */
import { Request, Response, NextFunction } from 'express';
import * as repositorio from '../repositories/apiPessoaRepository';
import { decripta } from '../utils/crypto';
import { formatDateToDDMMYYYY } from '../utils/date';
import { IPessoa } from 'src/models/pessoa';

async function getPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const pessoa: IPessoa | any = await repositorio.getPessoa(id);
        
        if (pessoa) {
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
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function getPessoas(req: Request, res: Response, next: NextFunction) {
    try {
        const docs: IPessoa[] |  any = await repositorio.getPessoas();
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
            res.status(200).json(docs);
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function getPessoasSituacao(req: Request, res: Response, next: NextFunction) {
    const situacao = req.params.situacao;
    try {
        const docs: IPessoa[] | any = await repositorio.getPessoasSituacao(situacao);
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
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function getPessoasAniversariantes(req: Request, res: Response, next: NextFunction) {
    const mes = req.params.mes;
    try {
        const docs: IPessoa[] | any = await repositorio.getPessoasAniversario(mes);
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
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function postPessoa(req: Request, res: Response, next: NextFunction) {
    const doc = req.body;
    try {
        const result = await repositorio.createPessoa(doc);
        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }    
}

async function patchPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const pessoa = req.body;

    try {
        const result = await repositorio.updatePessoa(id, pessoa);
        if (result)
            res.json(result);
        else
            res.sendStatus(404);
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
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
