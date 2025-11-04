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
    const response = await get(token, url);
    return response.data.doc;
}

export async function buscaTodos(token: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/todos`;
    const response = await get(token, url);
    return response.data.docs;
}

export async function buscaSituacao(token: any, situacao: string): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/situacao/${situacao}`;
    const response = await get(token, url);
    return response.data.docs;
}

export async function buscaAniversariantes(token: any, mes: string): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/aniversariantes/${mes}`;
    const response = await get(token, url);
    return response.data.docs;
}

export async function buscaProfessores(token: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/lista/professores/`;
    const response = await get(token, url);
    return response.data.docs;
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
