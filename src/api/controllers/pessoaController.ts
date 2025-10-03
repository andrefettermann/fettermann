//
// pessoaController.ts
//

import { Request, Response, NextFunction } from 'express';
import * as servico from "../../servicos/pessoaServico";
import { decripta, encripta } from '../../utils/crypto';
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from '../../utils/date';

/**
 *  Controller de pessoa.
 * 
 * @author Andre Fettermann
 */

function decriptaCpf(cpf: any | null | undefined): string {
    if (cpf && cpf !== null && cpf !== undefined && cpf.length > 0) {
        cpf = decripta(cpf);
    } else {
        cpf = "";
    }

    return cpf;
}

async function busca(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.busca(req.params.id);
        if (response) {
            if (response.sucesso) {
                return res.status(200).send(response.doc)
            } else {
                return res.status(204).json( {result: response} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.buscaTodos();
        if (response) {
            if (response.sucesso) {
                return res.status(200).send(response.doc)
            } else {
                return res.status(204).json( {result: response} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function buscaAniversariantes(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = 
                    await servico.buscaAniversariantes(req.params.mes);
        if (response) {
            if (response.sucesso) {
                return res.status(200).send(response.doc)
            } else {
                return res.status(204).json( {response} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function buscaSituacao(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.buscaSituacao(req.params.situacao);
        if (response) {
            if (response.sucesso) {
                return res.status(200).send(response.doc)
            } else {
                return res.status(204).json( {response} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
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
    try {
        const result: any = await servico.inclui(req.body);
        if (result) {
            if (result.sucesso) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ mensagem: result.erro });
            }
        } else {
            res.status(500).json({ result });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function atualiza(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.atualiza(req.params.id, req.body);
        if (response) {
            if (response.sucesso) {
                res.status(201).json(response);
            
            } else {
                res.status(500).json({ mensagem: response.erro });
            }
        } else {
            res.status(500).json({ response });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export default {
    busca,
    buscaTodos,
    buscaAniversariantes,
    buscaSituacao,
    inclui,
    atualiza
}
