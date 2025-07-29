/* pessoaController.ts */
import { decripta, encripta } from '../utils/crypto';
import * as repositorio from '../repositories/PessoaRepositorio';
import { formatDateToDDMMYYYY } from '../utils/date';

export async function buscaTodos() {
    return new Promise(async (resolve, reject) => {
        repositorio.findAll()
            .then((response: any) => {
                if (response) {                    
                    response.forEach((d: { nome: string; cpf: string; }) => {
                        d.nome = decripta(d.nome);
                        if (d.cpf) decripta(d.cpf);
                    })
                    
                    response.sort((a: { nome: string; }, b: { nome: string; }) => {
                        var fa = a.nome.toLowerCase();
                        var fb = b.nome.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
                resolve(response);
            }).catch((err) => reject(err));
    })
}

export async function buscaPorSituacao(aSituacao: string) {
    return new Promise(async (resolve, reject) => {
        repositorio.findBySituacao(aSituacao)
            .then((response: any) => {
                if (response) {                    
                    response.forEach((d: { nome: string; cpf: string; }) => {
                        d.nome = decripta(d.nome);
                        if (d.cpf) decripta(d.cpf);
                    })
                    
                    response.sort((a: { nome: string; }, b: { nome: string; }) => {
                        var fa = a.nome.toLowerCase();
                        var fb = b.nome.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
                console.log(response)
                resolve(response);
            }).catch((err) => reject(err));
    })
}

export async function buscaPorAniversarioMes(oMes: string) {
    return new Promise(async (resolve, reject) => {
        repositorio.findByAniversarioMes(oMes)
            .then((response: any) => {
                if (response) {                    
                    response.forEach((d: { nome: string; cpf: string; }) => {
                        d.nome = decripta(d.nome);
                        if (d.cpf) decripta(d.cpf);
                    })
                    
                    response.sort((a: { nome: string; }, b: { nome: string; }) => {
                        var fa = a.nome.toLowerCase();
                        var fb = b.nome.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
                console.log(response)
                resolve(response);
            }).catch((err) => reject(err));
    })
}

export async function buscaPorId(oId: string) {
    return new Promise(async (resolve, reject) => {
        repositorio.find(oId)
            .then((response: any) => {
                if (response) {
                    const pessoa = response[0];
                    pessoa.nome = decripta(pessoa.nome);
                    if (pessoa.cpf) pessoa.cpf = decripta(pessoa.cpf);

                    pessoa.promocoes.forEach((p: { data_formatada: string; data: string; })=>{
                        p.data_formatada = formatDateToDDMMYYYY(new Date(p.data));
                    })

                    pessoa.pagamentos.forEach((p: { data_formatada: string; data: string; })=>{
                        p.data_formatada = formatDateToDDMMYYYY(new Date(p.data));
                    })

                }
                
                resolve(response[0]);
            } )
            .catch((err)=> {reject(err)});
    });
}

async function inclui(doc: any) {
    /*
     await repositorio.createPessoa(doc).then((result) => {
            return result;
     }).catch(error=>{
        throw error;

        //return {
        //    'status': 'Failed',
        //    'err': error
        //}
     });
     */
}

async function altera(id: string, doc: any) {
    /*
    await repositorio.updatePessoa(id, doc).then((result) => {
        return result;
     }).catch(error=>{
        throw error;
    });
    */
}

export default {
    inclui,
    altera,
}
