/* pessoaRouters.ts */
import * as repositorio from '../repositories/pessoaRepository';

async function inclui(doc: any) {
     await repositorio.createPessoa(doc).then((result) => {
            return result;
     }).catch(error=>{
        throw error;

        //return {
        //    'status': 'Failed',
        //    'err': error
        //}
     });
}

async function altera(id: string, doc: any) {
    await repositorio.updatePessoa(id, doc).then((result) => {
        return result;
     }).catch(error=>{
        throw error;
    });
}

export default {
    inclui,
    altera
}
