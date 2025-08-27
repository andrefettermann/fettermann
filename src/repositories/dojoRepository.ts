import { getLoggedInUser } from "../realmClient";
import { Dojo } from "../models/dojo";

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

export async function find(id: string) {
    try{
        const user = getLoggedInUser();
        const doc: any = await user.functions['GetDojo'](id)
        
        return {
            sucess: true,
            docs: doc.result
        }
    } catch(error){
        return {
            sucess: false,
            error: error
        }
    }
}

export async function findAll(): Promise<any>{
    try{
        const user = getLoggedInUser();
        const docs: any = await user.functions['GetDojos']()
        
        return {
            sucess: true,
            docs: docs.result
        }
    } catch(error){
        return {
            sucess: false,
            error: error
        }
    }
}

export async function insert(data: any){
    try {
        const user = getLoggedInUser();
        const doc = await user.functions['PostDojo'](data)

        if (doc.success) {
            return {
                sucess: true,
                doc: doc.result
            }
        } else {
            return doc;
        }
    } catch(error){
        return {
            sucess: false,
            error: error
        }
    }
};

export async function update(id: string, data: any){
    try{
        //const dojo = await Dojo.findByIdAndUpdate({"_id":id}, data, {new: true})
        const user = getLoggedInUser();
        const doc = await user.functions['PatchDojo'](id,data)

        if(!doc){
            return {
                status: "Failed",
                message: "Post not available"
            }
        } else if (!doc.success) {
            return {
                status: "Failed",
                message: "Post not available"
            }
        } else {
            return doc;
        }

    }
    catch(error){
        return error;
    }
}
