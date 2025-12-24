// src/servicos/dojoServico.ts
import axios from 'axios';
import dotenv from 'dotenv'

/**
 * Servicos para o dojo.
 * 
 * @author Andre Fettermann
 */

dotenv.config();

const API_URL = process.env.API_URL;

async function get(token: any, url: string): Promise<any> {
    return await axios.get(url, {
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });
}

export async function buscaTodos(token: any): Promise<any> {
    const url = `${API_URL}/api/dojos/lista/todos`;
    const response = await get(token, url);
    return response.data.docs;
}

export async function buscaAtivos(token: any): Promise<any> {
    const url = `${API_URL}/api/dojos/lista/ativos`;
    const response = await get(token, url);
    return response.data.docs;
}

export async function busca(token: any, id: string): Promise<any> {
    const url = `${API_URL}/api/dojos/busca/`+id;
    const response = await get(token, url);
    return response.data.doc;
}

export async function inclui(token: any, dados: any): Promise<any> {
    const url = `${API_URL}/api/dojos/inclui/`;
    await axios.post(url, 
        dados, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });    
}

export async function atualiza(token: any, id: string, dados: any): Promise<any> {
    const url = `${API_URL}/api/dojos/altera/${id}`;
    const resposta =  await axios.patch(url, 
        dados, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });
    return resposta;
}

export async function incluiProfessor(token: any, id_dojo: string, dados: any): Promise<any> {
    const url = `${API_URL}/api/dojos/${id_dojo}/inclui/professor`;
    const resposta = await axios.patch(url, 
        dados, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });
    return resposta;
}

export async function removeProfessor(token: any, id_dojo: string, id_pessoa: string): Promise<any> {
    const url = `${API_URL}/api/dojos/${id_dojo}/remove/professor/${id_pessoa}`;
    await axios.delete(url, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });    
}