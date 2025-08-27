/**
 *  pessoaController.ts
 * 
 *  Controller de pessoa.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import { PessoaRepository } from "../repositories/pessoaRepository";
import { decripta, encripta } from '../utils/crypto';
import { formatDateDDMMAAAA } from '../utils/date';

const repositorio = new PessoaRepository()

async function buscaPeloId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response: any = await repositorio.find(id);
        if (response.success) {            
            response.doc.forEach((p: any) => {
                p.nome = decripta(p.nome);
                p.cpf = p.cpf?"":decripta(p.cpf)

                p.promocoes.forEach((p: any) => {
                    p.data_formatada = formatDateDDMMAAAA(p.data);
                })

                p.pagamentos.forEach((p: any) => {
                    p.data_formatada = formatDateDDMMAAAA(p.data);
                })
            });
            
           return res.status(200).send(response.doc)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await repositorio.findall();
        if (response.success) {
            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = element.cpf?"":decripta(element.cpf)
            });

            response.docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

           return res.status(200).json(response.docs)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function buscaAniversariantes(req: Request, res: Response, next: NextFunction) {
    const mes = Number(req.params.mes);
    try {
        const response: any = await repositorio.findByAniversario(mes);
        if (response.success) {
            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = element.cpf?"":decripta(element.cpf)
            });

            response.docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

           return res.status(200).json(response.docs)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function buscaSituacao(req: Request, res: Response, next: NextFunction) {
    const situacao = req.params.situacao;
    try {
        const response: any = await repositorio.findBySituacao(situacao);
        if (response.success) {
            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = element.cpf?"":decripta(element.cpf)
            });

            response.docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

           return res.status(200).json(response.docs)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;

    dados.nome = encripta(dados.nome);
    if (dados.cpf) dados.cpf = encripta(dados.cpf);
    
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
    buscaAniversariantes,
    buscaSituacao,
    inclui,
    atualiza
}
