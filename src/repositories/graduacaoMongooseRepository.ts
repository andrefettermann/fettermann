/* apiGraduacaoRepository.ts */
import { ObjectId } from "mongodb";
import { Graduacao, IGraduacao } from "../models/graduacao";

const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        localField: "_id",
        foreignField: "id_graduacao",
        as: "pessoas"
    }
}

export async function getGraduacao(id: string) {
    try {
        const docs: any = await Graduacao.aggregate([
                    {
                        $match: {"_id": new ObjectId(id)}
                    },
                    lookupPessoa,
                ])
        //await Graduacao.findById(id);
        return docs[0];
    }  catch(error) {
        return error;
    }
}

export async function getGraduacoes(){
    try{
        const docs = await Graduacao.find({}).sort({ ordem: 1 }).lean();
        return docs;
    }
    catch(error){
        return  error
    }
}

export async function createGraduacao(data: any){
    try {
        const graduacao = await Graduacao.create(data);
        return graduacao;
    } catch (error) {
        return error;
    }
};

export async function updateGraduacao(id: string, data: any){
    try{
        const graduacao = await Graduacao.findByIdAndUpdate({"_id":id}, data, {new: true})
        if(!graduacao){
            return {
                status: "Failed",
                message: "Post not available"
            }
        }

        return graduacao;
    } catch(error){
        return error;
    }
}

export async function deleteGraduacao(id: String) {
    try {
        const graduacao = await Graduacao.deleteOne({"_id":id});
        return graduacao;
    } catch(error){
        return error;
    }

}