import { Document, ObjectId } from "mongodb";
import { DojoSchema } from "../models/schema";
import Dojo from "../models/dojo";

function setBean(doc: Document): Dojo {
    var bean = new Dojo(doc.codigo, doc.nome);
    bean.setBairro(doc.bairro);
    bean.setCidade(doc.cidade);
    bean.setEmail(doc.email);
    bean.setEndereco(doc.endereco);
    bean.setPais(doc.pais);
    bean.setHorarios(doc.horarios);
    bean.setProfessorId(doc.professor_id);
    bean.setUrl(doc.url)

    return bean;
}

export async function getDojos(){
    try{
        var dojos:Dojo[] = [];
        const docs = await DojoSchema.find().sort({ order: 1 }).lean();
        //const docs = await PessoaSchema.aggregate([lookupDojos]);
        docs.forEach((doc) => {
            dojos.push(setBean(doc));
        })
        return dojos;
    }
    catch(error){
        return {
            status: "Failed",
            message: error
        }
    }
}

export async function createDojo(data: any){
    try {
        const newDojo = await DojoSchema.create(data);
        return {
            status: "Success",
            data: newDojo
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error
        };
    }
};

export async function updateDojo(id: string, data: any){
    try{
        const dojo = await DojoSchema.findByIdAndUpdate({"_id":id}, data, {new: true})

        if(!dojo){
            return {
                status: "Failed",
                message: "Post not available"
            }
        }

        return {
            status: "Success",
            data: dojo
        }
    }
    catch(error){
        return {
            status: "Failed",
            data: error
        }
    }
}
