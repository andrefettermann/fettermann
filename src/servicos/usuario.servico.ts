// src/servicos/usuario.servico.ts
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

export async function busca(token: any, id: string): Promise<any> {
    const url = `${API_URL}/api/usuarios/busca/`+id;
    const response = await get(token, url);
    return response.data.doc;
}

export async function inclui(token: any, dados: any): Promise<any> {
    const url = `${API_URL}/api/usuarios/inclui/`;
    await axios.post(url, 
        dados, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });    
}

export async function login(token: any, dados: any): Promise<any> {
    const url = `${API_URL}/api/login/`;
    
    const resposta = await axios.post(url, 
        dados, 
        {headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json', // ✅ permitido e seguro
        }
    });

    return resposta.data;
}
