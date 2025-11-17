// src/servicos/pessoaService.ts
import dotenv from 'dotenv'
import axios from 'axios';
import { formatDateDDMMAAAA } from '../utils/date';

dotenv.config()

const API_URL = process.env.API_URL;

interface IPromocao {
    "data": Date,
    "id_graduacao": string
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

    response.data.doc.promocoes.forEach(async (p: any) => {
        p.data_formatada = formatDateDDMMAAAA(new Date(p.data));
    });

    if (!response.data.doc.dojo) {
        response.data.doc.dojo = {}
    }

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

export async function inclui(token: any, osDados: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/inclui/`;

    var docs_promocoes: IPromocao[] = [];
    if (osDados.total_promocoes > 0) {
        for (var i=0; i<osDados.total_promocoes; i++) {
            var graduacao = osDados['id_graduacao_promocao_' + (i+1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': osDados['data_promocao_' + (i+1)],
                    'id_graduacao': osDados['id_graduacao_promocao_' + (i+1)]
                }
                docs_promocoes.push(doc_promocao);
            }
        }
    }

    const dados: any = {
        'aniversario': osDados.aniversario,
        'cpf': osDados.cpf,
        'data_inicio_aikido': osDados.data_inicio_aikido,
        'data_matricula': osDados.data_matricula,
        'id_dojo': osDados.id_dojo,
        'id_graduacao': osDados.id_graduacao,
        'matricula': osDados.matricula,
        'nome': osDados.nome,
        'situacao': osDados.situacao,
        'tipo': osDados.tipo,
        'promocoes': docs_promocoes
    }

    return await axios.post(url, 
            dados, 
            {headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // ✅ permitido e seguro
            }
        });
}

export async function atualiza(token: any, id: string, osDados: any): Promise<any> {
    const url = `${API_URL}/api/pessoas/altera/${id}`;
    
    var docs_promocoes: IPromocao[] = [];
    if (osDados.total_promocoes > 0) {
        for (var i=0; i<osDados.total_promocoes; i++) {
            var graduacao = osDados['id_graduacao_promocao_' + (i+1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': osDados['data_promocao_' + (i+1)],
                    'id_graduacao': osDados['id_graduacao_promocao_' + (i+1)]
                }
                docs_promocoes.push(doc_promocao);
            }
        }
    }

    const dados: any = {
        'aniversario': osDados.aniversario,
        'cpf': osDados.cpf,
        'data_inicio_aikido': osDados.data_inicio_aikido,
        'data_matricula': osDados.data_matricula,
        'id_dojo': osDados.id_dojo,
        'id_graduacao': osDados.id_graduacao,
        'matricula': osDados.matricula,
        'nome': osDados.nome,
        'situacao': osDados.situacao,
        'tipo': osDados.tipo,
        'promocoes': docs_promocoes
    }

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
