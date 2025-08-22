// graduacaoRepository.ts
import { getLoggedInUser } from "../realmClient";

/**
 * Respositorio de acesso aos dados da graduacao no Atlas Services (realm)
 */
export default class GraduacaoRepository {

    async getGraduacoes(): Promise<any>{
        try{
            const user = getLoggedInUser();
            const docs: any = await user.functions['GetGraduacoes']()
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

