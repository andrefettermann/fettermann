import { Document, ObjectId } from "mongodb";
import { Graduacao, IGraduacao } from "../models/graduacao";

export async function getGraduacao(id: string) {
    try {
        const docs: any = await Graduacao.findById(id);
        return docs;
    }  catch(error) {
        return error;
    }
}

export async function getGraduacoes(){
    try{
        const docs = await Graduacao.find({});//.sort({ order: 1 }).lean();
        //const docs = await PessoaSchema.aggregate([lookupDojos]);
        return docs;
    }
    catch(error){
        return  error
    }
}

export async function createGraduacao(data: any){
    /*
    try {
        const newGraduacao = await GraduacaoSchema.create(data);
        return {
            status: "Success",
            data: newGraduacao
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error
        };
    }
    */
};

export async function updateGraduacao(id: string, data: any){
    /*
    try{
        const graduacao = await GraduacaoSchema.findByIdAndUpdate({"_id":id}, data, {new: true})

        if(!graduacao){
            return {
                status: "Failed",
                message: "Post not available"
            }
        }

        return {
            status: "Success",
            data: graduacao
        }
    }
    catch(error){
        return {
            status: "Failed",
            data: error
        }
    }
    */
}
