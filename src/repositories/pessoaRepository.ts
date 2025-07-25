import { Document, ObjectId } from "mongodb";
import { PessoaSchema } from "../models/schema";
import { decripta, encripta } from "../utils/crypto";
import Dojo from "../models/dojo";

const lookupDojo = {
    $lookup: {
        from: "dojos",
        localField: "codigo_dojo",
        foreignField: "codigo",
        as: "dojo"
    }
}

const lookupGraduacao = {
    $lookup: {
        from: "graduacoes",
        localField: "codigo_graduacao",
        foreignField: "_id",
        as: "grads"
    }
}

export async function getPessoa(id: string) {
    try {
        const doc = await PessoaSchema.aggregate([
                    {
                        $match: {"_id": new ObjectId(id)}
                    },  
                    lookupDojo
                ])
        return {
            status: 'Success',
            data: doc[0]
        }
    }
    catch(error){
        return {
            status: "Failed",
            message: error
        }
    }
}

export async function getPessoas(){
    try{
        const docs = await PessoaSchema.aggregate([lookupDojo]);

        return {
            status: 'Success',
            data: docs
        }
    }
    catch(error){
        return {
            status: "Failed",
            message: error
        }
    }
}

export  async function getPessoasSituacao(situacao: string) {
    try {
        const docs = await PessoaSchema.aggregate([
                    {
                        $match: {'situacao': situacao}
                    },  
                    lookupDojo
                ]);
        return {
            status: 'Success',
            data: docs
        }
    }
    catch(error){
        console.log(error);
        return {
            status: "Failed",
            message: error
        }
    }
}

export async function getPessoasAniversario(mes: string) {
    try {
        const docs = await PessoaSchema.aggregate([
            {
                $match: {'aniversario': { $regex: mes + '$', $options: 'i' }}
            },  
            lookupDojo
        ]);
        return {
            status: 'Success',
            data: docs
        }
    }    catch(error){
        console.log(error);
        return {
            status: "Failed",
            message: error
        }
    }
}

export async function createPessoa(doc: any){
    try {
        doc.nome = encripta(doc.nome);
        doc.cpf = encripta(doc.cpf);

        const newPessoa = await PessoaSchema.create(doc);

        return {
            status: "Success",
            data: newPessoa
        };
    } catch (error) {
        console.log(error)
        throw error
//        return {
//            status: "Failed",
//            mensagem: error
//        };
    }
};

export async function updatePessoa(id: string, doc: any){
    try{
        doc.nome = encripta(doc.nome);
        doc.cpf = encripta(doc.cpf);

        const pessoa = await PessoaSchema.findByIdAndUpdate({"_id":id}, doc, {new: true})

        if(!pessoa){
            return {
                status: "Failed",
                message: "Post not available"
            }
        }

        return {
            status: "Success",
            data: pessoa
        }
    }
    catch(error){
        console.log(error)
        throw error
//        return {
//            status: "Failed",
//            mensagem: error
//        };
    }
}
