// taxaServico.ts
import * as repositorio from '../repositories/taxaRepository';

/**
 * Servico para taxas
 * 
 * @author Andre Fettermann 
 */

function setDoc(osDados: any) {
    var doc = {
        'nome': osDados.nome,
        'descricao': osDados.descricao,
        'periodo': osDados.periodo,
        'valor_bruto': parseInt(osDados.valor_bruto),
        'percentual': osDados.categoria,
        'observacoes': osDados.observacoes
    }

    return doc;
}

export async function busca(oId: string): Promise<any> {
    const id = oId;
    try {
        return await repositorio.find(id);
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos(): Promise<any> {
    try {
        var docs: any = []
        const result: any = await repositorio.findAll();
        if (result) {
            result.docs.forEach((t: any) => {
                var doc = {
                    '_id': t._id,
                    'nome': t.nome,
                    'descricao': t.descricao,
                    'periodo': t.periodo,
                    'valor_bruto': t.valor_bruto,
                    'percentual': t.percentual,
                    'valor_liquido': parseInt(t.valor_bruto) * 
                                    (1 - parseFloat(t.percentual) / 100),
                    'observacoes': t.observacoes
                }
                docs.push(doc);
            })

            return {
                sucesso: true,
                docs
            }
        } else {
            return result
        }
    } catch (error) {
        throw error;
    }
}

export async function inclui(osDados: any) {
    const dados = setDoc(osDados);
    try {
        return await repositorio.insert(dados);
    } catch (error) {
        throw error;
    }
}

export async function atualiza(oId: string, osDados: any) {
    const id = oId;
    const dados = setDoc(osDados) ;

    try {
        return await repositorio.update(id, dados);
    } catch (error) {
        throw error;
    }
}

