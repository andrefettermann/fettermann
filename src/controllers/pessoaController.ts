/**
 *  pessoaController.ts
 * 
 *  Controller de pessoa.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import { PessoaRepository } from "../repositories/pessoaRepository";
import * as repositorio from "../repositories/repository";
import { decripta, encripta } from '../utils/crypto';
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from '../utils/date';

//const repositorio = new PessoaRepository()

function decriptaCpf(cpf: any | null | undefined): string {
    if (cpf && cpf !== null && cpf !== undefined && cpf.length > 0) {
        cpf = decripta(cpf);
    } else {
        cpf = "";
    }

    return cpf;
}

async function buscaPeloId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const response: any = await repositorio.find('GetPessoa', id);
        if (response.sucesso) {
            let pessoa = response.doc;
            pessoa.nome = decripta(pessoa.nome);
            pessoa.cpf = decriptaCpf(pessoa.cpf);

            pessoa.promocoes.forEach(async (p: any) => {
                p.data_formatada = formatDateDDMMAAAA(p.data);
            })

            pessoa.pagamentos.forEach((p: any) => {
                p.data_formatada = formatDateDDMMAAAA(p.data);
            })

            return res.status(200).send(pessoa)
        } else {
            console.log(response.error)
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: error });
    }

}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await repositorio.findAll('GetPessoas');
        if (response.sucesso) {
            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = decriptaCpf(element.cpf);
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
            console.log(response.error)
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ mensagem: error });
    }
}

async function buscaAniversariantes(req: Request, res: Response, next: NextFunction) {
    const mes = Number(req.params.mes);

    try {
        const response: any = await repositorio.findAllBy('GetAniversariantes', mes);
        if (response.sucesso) {
            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = decriptaCpf(element.cpf);
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
        const response: any = await repositorio.findAllBy('GetPessoasSituacao', situacao);
        if (response.sucesso) {

            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = decriptaCpf(element.cpf);
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

function setDoc(req: any) {
    var totalPromocoes = req.body.total_promocoes;
    var totalPagamentos = req.body.total_pagamentos;

    var doc = {};

    var doc_promocoes = [];
    if (totalPromocoes > 0) {
        for (var i=0; i<req.body.total_promocoes; i++) {
            var graduacao = req.body['id_graduacao_promocao_' + (i+1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': convertDdMmYyyyToDate(req.body['data_promocao_' + (i+1)]),
                    'id_graduacao': req.body['id_graduacao_promocao_' + (i+1)]
                }
                doc_promocoes.push(doc_promocao);
            }
        }
    }

    var doc_pagamentos = [];
    if (totalPagamentos > 0) {
        for (var i=0; i<req.body.total_pagamentos; i++) {
            let data = req.body['data_pagamento_' + (i+1)];
            if (data) {
                var doc_pagamento = {
                    'data': convertDdMmYyyyToDate(req.body['data_pagamento_' + (i+1)]),
                    'valor_pago': Number.parseFloat(req.body['valor_pagamento_' + (i+1)]),
                    'descricao': req.body['descricao_pagamento_' + (i+1)]
                }
                doc_pagamentos.push(doc_pagamento);
            }
        }
    }

    if (req.body.id_dojo == '') {
        doc = {
            'aniversario': req.body.aniversario,
            'matricula': req.body.matricula,
            'nome': encripta(req.body.nome),
            'situacao': req.body.situacao,
            'cpf': req.body.cpf===''?'':encripta(req.body.cpf),
            'data_inicio_aikido': req.body.data_inicio,
            'data_matricula': req.body.data_matricula,
            'id_dojo': null,
            'id_graduacao': req.body.id_graduacao,
            'promocoes': doc_promocoes,
            'pagamentos': doc_pagamentos
        }
    } else {
        doc = {
            'aniversario': req.body.aniversario,
            'matricula': req.body.matricula,
            'nome': encripta(req.body.nome),
            'situacao': req.body.situacao,
            'cpf': req.body.cpf===''?'':encripta(req.body.cpf),
            'data_inicio_aikido': req.body.data_inicio,
            'data_matricula': req.body.data_matricula,
            'graduacao_atual': req.body.graduacao_atual,
            'id_dojo': req.body.id_dojo,
            'id_graduacao': req.body.id_graduacao,
            'promocoes': doc_promocoes,
            'pagamentos': doc_pagamentos
        }
    }

    return doc;
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    const doc = setDoc(req);
    try {
        const response: any = await repositorio.insert('PostPessoa', doc);
        
        if (response.sucesso) {
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
    const doc = setDoc(req);

    try {
        const response: any = await repositorio.update('PatchPessoa', id, doc);
        if (response.sucesso) {
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
