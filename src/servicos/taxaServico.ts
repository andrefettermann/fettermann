// taxaServico.ts
import { formataValorComDecimais } from '../utils/formata_decimal';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const API_URL = process.env.API_URL;

/**
 * Servico para taxas
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
    if (doc.valor_padrao) {
        doc.valor_padrao = formataValorComDecimais(
            doc.valor_padrao.$numberDecimal.replace('.', ','));
    }

    return doc;
}

export function formataLista(osDados: any): any {
    osDados.forEach((doc: any) => {        
        formata(doc);
    });

    osDados.sort((a: { tipo: string, nome: string; }, b: { tipo: string, nome: string; }) => {
        var tipoa = a.tipo.toLowerCase();
        var tipob = b.tipo.toLowerCase();
        var nomea = a.nome.toLowerCase();
        var nomeb = b.nome.toLowerCase();

        if (tipoa < tipob) {
            return -1;
        }
        if (tipoa > tipob) {
            return 1;
        }

        if (nomea < nomeb) {
            return -1;
        }
        if (nomea > nomeb) {
            return 1;
        }
        return 0;
    });

    return osDados;
}

export async function buscaTodos(token: any): Promise<any> {
    const url = `${API_URL}/api/taxas/lista/todos`;
    return await get(token, url);
}

export async function busca(token: any, id: string): Promise<any> {
    const url = `${API_URL}/api/taxas/busca/${id}`;
    return await get(token, url);
}

export async function inclui(token: any, osDados: any): Promise<any> {
    const url = `${API_URL}/api/taxas/inclui`;
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
    const url = `${API_URL}/api/taxas/altera/${id}`;
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
