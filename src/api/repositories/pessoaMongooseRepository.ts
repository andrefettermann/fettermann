import { Document, ObjectId } from "mongodb";
import { decripta, encripta } from "../../utils/crypto";
import { IPessoa, Pessoa } from "../../models/pessoa";

const lookupDojo = {
    $lookup: {
        from: "dojos",
        localField: "id_dojo",
        foreignField: "_id",
        as: "dojo"
    }
}

const lookupGraduacao = {
    $lookup: {
        from: "graduacoes",
        localField: "id_graduacao",
        foreignField: "_id",
        as: "graduacao"
    }
}

export async function getPessoa(id: string) {
    try {
        const doc: IPessoa[] = await Pessoa.aggregate([
                    {
                        $match: {"_id": new ObjectId(id)}
                    },
                    lookupDojo,
                    lookupGraduacao
                    //{$unwind: '$dojo'},
                ])
        return doc[0];
    } catch(error){
        return error;
    }
}

export async function getPessoas(){
    try{
        const docs: IPessoa[] = await Pessoa.aggregate(
            [
                lookupDojo,
                lookupGraduacao
//                {$unwind: '$dojo'}
            ],
        );
        return docs;
    } catch(error){
        return error;
    }
}

export  async function getPessoasSituacao(situacao: string) {
    try {
        const docs: IPessoa[] = await Pessoa.aggregate([
                    {
                        $match: {'situacao': situacao}
                    },  
                    lookupDojo,
                    lookupGraduacao
                    //{$unwind: '$dojo'},
                ]);
        return docs;
    }
    catch(error){
        return error;
    }
}

export async function getPessoasAniversario(mes: string) {
    try {
        const docs: IPessoa[] = await Pessoa.aggregate([
            {
                $match: {'aniversario': { $regex: mes + '$', $options: 'i' }}
            },  
            lookupDojo,
            lookupGraduacao
            //{$unwind: '$dojo'},
        ]);
        return docs
    } catch(error){
        return error;
    }
}

export async function getPessoasDojo(id: string) {
    try {
        const docs: IPessoa[] = await Pessoa.find({id_dojo: id});
        return docs
    } catch(error){
        return error;
    }
}

export async function createPessoa(doc: any){
    try {
        doc.nome = encripta(doc.nome);
        doc.cpf = encripta(doc.cpf);

        const pessoa = await Pessoa.create(doc);
        return pessoa;
    } catch (error) {
        return error
    }
};

export async function updatePessoa(id: string, doc: any){
    try{
        doc.nome = encripta(doc.nome);
        doc.cpf = encripta(doc.cpf);

        const pessoa = await Pessoa.findByIdAndUpdate({"_id":id}, doc, {new: true})

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
    } catch(error){
        console.log(error)
        throw error
    }
}
