// src/servicos/cobrancaServico.ts
import { formataValorComDecimais } from '../utils/formata_decimal';
import axios from 'axios';
import dotenv from 'dotenv'
import { formatDateDDMMAAAA } from '../utils/date';

dotenv.config();

const API_URL = process.env.API_URL;

/**
 * Servico para cobranca
 * 
 * @author Andre Fettermann 
 */

async function get(token: any, url: string): Promise<any> {
    return await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });
}

export function formata(doc: any): any {
    let totalPago: number = 0;

    doc.valor = formataValorComDecimais(
        doc.valor.$numberDecimal.replace('.', ','));
    doc.data_vencimento = formatDateDDMMAAAA(new Date(doc.data_vencimento));
    doc.data_emissao = formatDateDDMMAAAA(new Date(doc.data_emissao));

    if (doc.pagamentos) {
        doc.pagamentos.forEach((p: any) => {
            p.data_pagamento = formatDateDDMMAAAA(new Date(p.data_pagamento));

            p.valor_pago = formataValorComDecimais(
                p.valor_pago.$numberDecimal.replace('.', ','));
            p.desconto = formataValorComDecimais(
                p.desconto.$numberDecimal.replace('.', ','));
            p.juros = formataValorComDecimais(
                p.juros.$numberDecimal.replace('.', ','));

            totalPago = totalPago + parseFloat(p.valor_pago);
        });
    }

    if (totalPago == parseFloat(doc.valor)) {
        doc.situacao = 'pago';
    } else {
        doc.situacao = 'pendente';
    }

    return doc;
}
export function formataLista(osDados: any): any {
    osDados.forEach((doc: any) => {        
        doc = formata(doc)
    });

    return osDados;
}

export async function buscaTodos(token: any): Promise<any> {
    const url = `${API_URL}/api/cobrancas/lista/todos`;
    return await get(token, url);
}

export async function busca(token: any, id: string): Promise<any> {
    const url = `${API_URL}/api/cobrancas/busca/${id}`;
    const resposta: any = await get(token, url);
    return resposta;
}

export async function buscaPorPessoa(token: any, id_pessoa: string): Promise<any> {
    const url = `${API_URL}/api/cobrancas/lista/pessoa/${id_pessoa}`;
    const resposta: any = await get(token, url);
    return resposta;
}

export async function buscaPorTaxa(token: any, id_taxa: string): Promise<any> {
    const url = `${API_URL}/api/cobrancas/lista/taxa/${id_taxa}`;
    const resposta: any = await get(token, url);
    return resposta;
}

export async function buscaPorPagamento(token: any, id_pagamento: string): Promise<any> {
    const url = `${API_URL}/api/cobrancas/pagamento/busca/${id_pagamento}`;
    const resposta: any = await get(token, url);
    return resposta;
}

export async function inclui(token: any, osDados: any): Promise<any> {
    const url = `${API_URL}/api/cobrancas/inclui`;
    return await axios.post(url, 
        osDados, 
        {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        }
    );
}

export async function incluiPagamento(token: any, osDados: any): Promise<any> {
    const url = `${API_URL}/api/cobrancas/pagamento/inclui`;
    return await axios.post(url, 
        osDados, 
        {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        }
    );
}

export async function atualiza(token: any, id: string, osDados: any): Promise<any> {
    const url = `${API_URL}/api/cobrancas/altera/${id}`;
    await axios.patch(url, 
        osDados, 
        {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        }
    );
}

export async function atualizaPagamento(token: any, osDados: any): Promise<any> {
    const url = `${API_URL}/api/cobrancas/pagamento/altera`;
    await axios.patch(url, 
        osDados, 
        {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        }
    );
}
