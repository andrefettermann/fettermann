// graduacaoRepository.ts
import { getLoggedInUser } from "../realmClient";

/**
 * Respositorio de acesso aos dados da graduacao no Atlas Services (realm)
 */
export default class GraduacaoRepository {

    async find(id: string) {
        try{
            const user = getLoggedInUser();
            const response: any = await user.functions['GetGraduacao'](id)
            return {
                success: true,
                doc: response.result
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    }

    async findAll(): Promise<any>{
        try{
            const user = getLoggedInUser();
            const response: any = await user.functions['GetGraduacoes']()
            return {
                success: true,
                docs: response.result
            }
        } catch(error){
            return {
                success: false,
                error: error
            }
        }
    }

}

