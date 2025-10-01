import * as repositorio from '../repositories/atlasAppRepository';
import { decripta, encripta } from '../utils/crypto';

var totalHorarios = 0;

function setDoc(osDados: any) {
    const doc = {
        'nome': osDados.nome,
        'local': osDados.local,
        'endereco': osDados.endereco,
        'bairro': osDados.bairro,
        'cidade': osDados.cidade,
        'uf': osDados.uf,
        'pais': osDados.pais,
        'url': osDados.url,
        'email': osDados.email,
        'id_professor': osDados.id_professor,
        'horarios': osDados.horarios
    }

    return doc;
}

export async function busca(oId: string) {
    const id = oId;
    try {
        const response: any = await repositorio.find('GetDojo', id);
        if (response.sucesso) {

            if (response.doc.id_professor) {
                response.doc.id_professor = response.doc.id_professor.toString();
            }
            
            if (response.doc.professor[0]) {
                response.doc.professor[0].nome = 
                    decripta(response.doc.professor[0].nome);
            }

            response.doc.alunos.forEach((a: any) => {
                a.nome = decripta(a.nome);
            })

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
        const response: any = await repositorio.findAll('GetDojos');
        if (response.sucesso) {
            response.docs.forEach((element: any) => {
                
                if (element.id_professor) {
                    element.id_professor = element.id_professor.toString();
                }

                element.professor.forEach((p: any) =>{
                    if (p.nome) p.nome = decripta(p.nome);
                })
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
        const response: any = await repositorio.insert('PostDojo', dados);
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
    console.log(osDados);
    const id = oId;
    const dados = setDoc(osDados) ;

    try {
        const response: any = await repositorio.update('PatchDojo', id, dados);
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
