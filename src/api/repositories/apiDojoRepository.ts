import { Document, ObjectId } from "mongodb";
import { Dojo } from "../../models/dojo";

const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        localField: "id_professor",
        foreignField: "_id",
        as: "professor"
    }
}

const projectDojos = {
    $project: {
        _id: 1,
        codigo: 1,
        nome: 1,
        cidade: 1,
        'professor.nome': 1,
    } 
}

const projectDojo = {
    $project: {
        _id: 1,
        codigo: 1,
        nome: 1,
        endereco: 1,
        cidade: 1,
        bairro: 1,
        uf: 1,
        pais: 1,
        url: 1,
        email: 1,
        horarios: 1,
        id_professor: 1,
        'professor.nome': 1,
    } 
}

export async function getDojo(id: string) {
    try {
        const docs: any = await Dojo.aggregate([
                            {
                                $match: {"_id": new ObjectId(id)}
                            },  
                            lookupPessoa,
                            {$unwind: '$professor'},
                            projectDojo,
                        ])
        return docs[0];
    }  catch(error) {
        return error;
    }
}

export async function getDojos(){
    try{
        const docs = await Dojo.aggregate(
            [
                lookupPessoa,
                {$unwind: '$professor'},
                projectDojos,
            ]).sort({ nome: 1 });
        //find({}).sort({ nome: 1 }).lean();
        return docs;
    } catch(error){
        return  error
    }
}

export async function createDojo(data: any){
    try {
        const doc = await Dojo.create(data);
        return doc;
    } catch (error) {
        return error;
    }
};

export async function updateDojo(id: string, data: any){
    try{
        const dojo = await Dojo.findByIdAndUpdate({"_id":id}, data, {new: true})

        if(!dojo){
            return {
                status: "Failed",
                message: "Post not available"
            }
        }

        return dojo;
    }
    catch(error){
        return error;
    }
}
