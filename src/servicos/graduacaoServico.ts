import axios from 'axios';
import dotenv from 'dotenv'

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
    const url = `${API_URL}/api/graduacoes/lista/todos`;
    const resposta: any = await get(token, url);
    return resposta;
}

export async function busca(token: any, id: string): Promise<any> {
    const url = `${API_URL}/api/graduacoes/busca/${id}`;
    return await get(token, url);
}

export async function inclui(token: any, osDados: any): Promise<any> {
    const url = `${API_URL}/api/graduacoes/inclui`;
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
    const url = `${API_URL}/api/graduacoes/altera/${id}`;
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

/*

*/
