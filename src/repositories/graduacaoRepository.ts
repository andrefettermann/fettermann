import { Document, ObjectId } from "mongodb";
import { GraduacaoSchema } from "../models/schema";
import Graduacao from "../models/graduacao";

function setBean(doc: Document): Graduacao {
    var bean = new Graduacao(doc.ordem, doc.nome);
    bean.setFaixa(doc.faixa);
    bean.setId(doc._id);

    return bean;
}

export async function getGraduacao(id: string): Promise<Graduacao|any> {
    var graduacao: Graduacao;
    try {
        const doc = await GraduacaoSchema.find({"_id": new ObjectId(id)}).lean();
        return doc[0];
    }  catch(error){
        return {
            status: "Failed",
            message: error
        }
    }
}

export async function getGraduacoes(){
    try{
        var graduacoes:Graduacao[] = [];
        const docs = await GraduacaoSchema.find().sort({ order: 1 }).lean();
        //const docs = await PessoaSchema.aggregate([lookupDojos]);
        docs.forEach((doc) => {
            graduacoes.push(setBean(doc));
        })
        return graduacoes;
    }
    catch(error){
        return {
            status: "Failed",
            message: error
        }
    }
}

export async function createGraduacao(data: any){
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
};

export async function updateGraduacao(id: string, data: any){
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
}
