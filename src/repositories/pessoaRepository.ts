// pessoaRepository.ts

import { getLoggedInUser } from "../realmClient";

/**
 * Repository para acesso aos dados de pessoas atraves de Atlas App Services (Realm)
 * 
 * @author Andre Fettermann
 */
export class PessoaRepository {

    async find(id: string) {
        try{
            const user = getLoggedInUser();
            const doc: any = await user.functions['GetPessoa'](id)
            return {
                success: true,
                doc: doc.result
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    }

    async findall(): Promise<any>{
        try{
            const user = getLoggedInUser();
            const docs: any = await user.functions['GetPessoas']()
            return {
                success: true,
                docs: docs.result
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    }

    async findByAniversario(mes: number): Promise<any>{
        try{
            const user = getLoggedInUser();
            const docs: any = await user.functions['GetAniversariantes'](mes)
            return {
                success: true,
                docs: docs.result
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    }

    async findBySituacao(situacao: string): Promise<any>{
        try{
            const user = getLoggedInUser();
            const docs: any = await user.functions['GetPessoasSituacao'](situacao)
            return {
                success: true,
                docs: docs.result
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    }

    async insert(data: any): Promise<any>{
        try {
            const user = getLoggedInUser();
            const response = await user.functions['PostPessoa'](data)
            if (response.success) {
                return {
                    success: true,
                    doc: response.insertedId
                }
            } else {
                return response;
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    };

    async update(id: string, data: any): Promise<any>{
        try{
            //const dojo = await Dojo.findByIdAndUpdate({"_id":id}, data, {new: true})
            const user = getLoggedInUser();
            const response = await user.functions['PatchPessoa'](id,data)

            if(!response){
                return {
                    success: false,
                    message: "Post not available"
                }
            } else if (!response.success) {
                return {
                    success: false,
                    message: "Post not available"
                }
            } else {
                return {
                    success: true,
                    doc: response
                }
            }
        }
        catch(error){
            return {
                success: false,
                message: error
            }
        }
    }

}


