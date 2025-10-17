// src/servicos/pessoaService.ts
import dotenv from 'dotenv'
import axios from 'axios';
import { formataValorComDecimais } from '../utils/formata_decimal';
import { formatDateDDMMAAAA } from '../utils/date';

dotenv.config()

const API_URL = process.env.API_URL;

export function formata(doc: any): any {
    doc.promocoes.forEach(async (p: any) => {
        p.data_formatada = formatDateDDMMAAAA(new Date(p.data));
    });

    doc.pagamentos.forEach((p: any) => {
        p.data_formatada = formatDateDDMMAAAA(new Date(p.data));
        //p.valor_pago = formataValorComDecimais(
        //    p.valor_pago.$numberDecimal.replace('.', ','));
    });

    return doc;
}

export function formataLista(osDados: any): any {
    osDados.forEach((doc: any) => {        
        doc = formata(doc)
    });

    return osDados;
}

async function get(token: any, url: string): Promise<any> {
    return await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });
}

export async function busca(token: any, id: string): Promise<any> {
    const url = `${API_URL}/api/pessoas/busca/${id}`;
    const resposta: any = await get(token, url);
    return resposta;
}

export async function buscaTodos(token: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/todos`;
    return await get(token, url);
}

export async function buscaSituacao(token: any, situacao: string): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/situacao/${situacao}`;
    return await get(token, url);
}

export async function buscaAniversariantes(token: any, mes: string): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/aniversariantes/${mes}`;
    return await get(token, url);
}

export async function buscaProfessores(token: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/professores/`;
    return await get(token, url);
}

export async function inclui(token: any, dados: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/inclui/`;
    return await axios.post(url, 
            dados, 
            {headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        });
}

export async function atualiza(token: any, id: string, dados: string): Promise<any> {
    const url = `${API_URL}/api/pessoas/altera/${id}`;
    
    const resposta: any = await axios.patch(url, 
        dados, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });
    return resposta;
}

/*
function setDoc(osDados: any) {
    var totalPromocoes = osDados.total_promocoes;
    var totalPagamentos = osDados.total_pagamentos;

    var doc = {};

    var doc_promocoes = [];
    if (totalPromocoes > 0) {
        for (var i=0; i<osDados.total_promocoes; i++) {
            var graduacao = osDados['id_graduacao_promocao_' + (i+1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': convertDdMmYyyyToDate(
                        osDados['data_promocao_' + (i+1)]),
                    'id_graduacao': osDados['id_graduacao_promocao_' + (i+1)]
                }
                doc_promocoes.push(doc_promocao);
            }
        }
    }

    var doc_pagamentos = [];
    if (totalPagamentos > 0) {
        for (var i=0; i<osDados.total_pagamentos; i++) {
            let data = osDados['data_pagamento_' + (i+1)];
            if (data) {
                var doc_pagamento = {
                    'data': convertDdMmYyyyToDate(
                        osDados['data_pagamento_' + (i+1)]),
                    'valor_pago': Number.parseFloat(
                        osDados['valor_pagamento_' + (i+1)]),
                    'descricao': osDados['descricao_pagamento_' + (i+1)]
                }
                doc_pagamentos.push(doc_pagamento);
            }
        }
    }

    doc = {
        'aniversario': osDados.aniversario,
        'matricula': osDados.matricula,
        'nome': osDados.nome,
        'situacao': osDados.situacao,
        'cpf': osDados.cpf===''?'':osDados.cpf,
        'data_inicio_aikido': osDados.data_inicio,
        'data_matricula': osDados.data_matricula,
        'is_professor': osDados.is_professor?true:false,
        'id_dojo': osDados.id_dojo == ''?null:osDados.id_dojo,
        'id_graduacao': osDados.id_graduacao,
        'promocoes': doc_promocoes,
        'pagamentos': doc_pagamentos
    }

    return doc;
}

function decriptaCpf(cpf: any | null | undefined): string {
    if (cpf && cpf !== null && cpf !== undefined && cpf.length > 0) {
        return decripta(cpf);
    }
    return "";
}

export async function buscaTodos(): Promise<any> {
    try {
        const response: any = await repositorio.findAll();
        
        if (response.sucesso) {
            response.docs.forEach((element: any) => {
                element._id = element._id.toString();
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
            //console.log(response.docs)
            return {
                sucesso: true,
                docs: response.docs
            };
        } else {
            return {
                sucesso: false,
                erro: response.erro
            };
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaAniversariantes(oMes: string): Promise<any> {
    const mes = oMes;

    try {
        const response: any = await repositorio.findByAniversario(mes);
        if (response.sucesso) {
            response.docs.forEach((element: any) => {
                element.nome = decripta(element.nome);
                element.cpf = decriptaCpf(element.cpf);
            });

            return {
                sucesso: true,
                docs: response.docs
            };
        } else {
            return response;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaSituacao(aSituacao: string): Promise<any> {
    const situacao = aSituacao;
    try {
        const response: any = await repositorio.findBySituacao(situacao);
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

            return {
                sucesso: true,
                docs: response.docs
            };
        } else {
            return response;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaProfessores(): Promise<any> {
    try {
        const response: any = await repositorio.findByIsProfessor(true);
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

            return {
                sucesso: true,
                docs: response.docs
            };
        } else {
            return response;
        }        
    } catch (error) {
        throw error;
    }
}

export async function inclui(osDados: any): Promise<any> {
    const dados = setDoc(osDados);
    try {
        const response: any = await repositorio.insert(dados);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function atualiza(oId: string, osDados: any): Promise<any> {
    const id = oId;
    const dados = setDoc(osDados);

    try {
        const response: any = await repositorio.update(id, dados);
        return response;
    } catch (error) {
        throw error;
    }

}

export async function busca(oId: string): Promise<any> {
    const id = oId;
    try {
        const response: any = await repositorio.find(id);
        if (response.sucesso) {
            let pessoa = response.doc;
            pessoa.nome = decripta(pessoa.nome);
            pessoa.cpf = decriptaCpf(pessoa.cpf);

            if (pessoa.id_graduacao) {
                pessoa.id_graduacao = pessoa.id_graduacao.toString();
            }

            if (pessoa.id_dojo) {
                pessoa.id_dojo = pessoa.id_dojo.toString();
            }

            pessoa.promocoes.forEach(async (p: any) => {
                p.data_formatada = formatDateDDMMAAAA(p.data);
                if (p._id) {
                    p._id = p._id.toString();
                }
            });

            pessoa.pagamentos.forEach((p: any) => {
                p.data_formatada = formatDateDDMMAAAA(p.data);
            });

            return {
                sucesso: true,
                doc: pessoa
            };
        } else {
            return response;
        }        
    } catch (error) {
        throw error;
    }
}
*/
