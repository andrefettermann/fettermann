import { Request, Response, NextFunction } from 'express';
import * as repositorio from '../repositories/atlasAppRepository';
import { decripta, encripta } from '../utils/crypto';

function setDoc(osDados: any) {
    var totalTecnicas = osDados.total_tecnicas;
    var doc_tecnicas = [];
    if (totalTecnicas > 0) {
        for (var i=0; i<osDados.total_tecnicas; i++) {
            var nome = osDados['nome_' + (i+1)];
            var doc_tecnica = { nome  };
            doc_tecnicas.push(doc_tecnica);
        }
    }
    
    var doc = {
        'ordem': parseInt(osDados.ordem),
        'nome': osDados.nome,
        'faixa': osDados.faixa,
        'minimo_horas_treino_exame': parseInt(osDados.horas_exame),
        'minimo_tempo_exame': parseInt(osDados.meses_exame),
        'categoria': osDados.categoria,
        'observacoes': osDados.observacoes,
        'tecnicas': doc_tecnicas
    }

    return doc;
}

export async function busca(oId: string) {
    const id = oId;
    try {
        const response: any = await repositorio.find('GetGraduacao', id);
        if (response.sucesso) {
            response.doc.pessoas.forEach((a: any) => {
                a.nome = decripta(a.nome);
            });

            return {
                sucesso: true,
                docs: response.doc
            };
        } else {
            throw response.error;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos() {
    try {
        const response: any = await repositorio.findAll('GetGraduacoes');
        if (response.result = "Success") {

            response.docs.forEach((g: any) => {
                g._id = g._id.toString();
            })

            response.docs.sort((a: { ordem: number; }, b: { ordem: number; }) => {
                //var fa = a.nome.toLowerCase();
                //var fb = b.nome.toLowerCase();

                if (a.ordem < b.ordem) {
                    return -1;
                }
                if (a.ordem > b.ordem) {
                    return 1;
                }
                return 0;
            });
            return {
                sucesso: true,
                docs: response.docs
            };
        } else {
            throw response.error;
        }        
    } catch (error) {
        throw error;
    }
}

export async function inclui(osDados: any) {
    const dados = setDoc(osDados);
    try {
        const response: any = await repositorio.insert('PostGraduacao', dados);
        if (response.sucesso) {
            return {
                sucesso: true,
                docs: response.docs
            };            
        } else {
            throw response.error;
        }
    } catch (error) {
        throw error;
    }
}

export async function atualiza(oId: string, osDados: any) {
    const id = oId;
    const dados = setDoc(osDados) ;

    try {
        const response: any = 
            await repositorio.update('PatchGraduacao', id, dados);
        if (response.sucesso) {
            return {
                sucesso: true,
                docs: response.docs
            };
        } else {
            throw response.error;
        }
    } catch (error) {
        throw error;
    }
}

