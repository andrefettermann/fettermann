// pessoaRepository.ts

import { getLoggedInUser } from "../realmClient";

/**
 * Repository para acesso aos dados de pessoas atraves de Atlas App Services (Realm)
 * 
 * @author Andre Fettermann
 */
export class PessoaRepository {

    async getPessoa(id: string) {}

    async getPessoas(): Promise<any>{
        try{
            const user = getLoggedInUser();
            const docs: any = await user.functions['GetPessoas']()
            return {
                result: "Success",
                docs: docs.result
            }
        } catch(error){
            return {
                result: "Failed",
                error: error
            }
        }
    }
}


