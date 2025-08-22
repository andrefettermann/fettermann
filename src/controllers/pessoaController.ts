/**
 *  pessoaController.ts
 * 
 *  Controller de pessoa.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import { PessoaRepository } from "../repositories/pessoaRepository";
import { decripta } from '../utils/crypto';

const repositorio = new PessoaRepository()

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const doc: any = await repositorio.getPessoas();
        if (doc.result = "Success") {
            doc.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = element.cpf?"":decripta(element.cpf)
            });

            doc.docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

           return res.status(200).json(doc.docs)
        } else {
            res.status(500).json({ mensagem: doc.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export default {
    buscaTodos,
}
