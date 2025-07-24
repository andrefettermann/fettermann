import { Document, ObjectId } from "mongodb";
import { GraduacaoSchema, PessoaSchema } from "../models/schema";
import Pessoa from "../models/pessoa";
import { decripta, encripta } from "../utils/crypto";
import Promocao from "../models/promocao";
import Dojo from "../models/dojo";
import Graduacao from "../models/graduacao";

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

function setBean(doc: Document): Pessoa {
            var pessoa = new Pessoa(decripta(doc.nome), doc.situacao);
            pessoa.setAniversario(doc.aniversario);
            pessoa.setCpf(decripta(doc.cpf));
            pessoa.setDataInicio(doc.data_inicio_aikido);
            pessoa.setDataMatricula(doc.data_matricula);
            pessoa.setMatricula(doc.matricula);

            var dojo = new Dojo(doc.dojo.codigo, doc.dojo.nome);
            pessoa.setDojo(dojo);
            pessoa.setGraduacaoAtual("");

            return pessoa;
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

        docs.sort((a, b) => {
            var fa = a.nome.toLowerCase();
            var fb = b.nome.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

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

export async function getPessoasAtivas() {
    try {
        const docs = await PessoaSchema.find({situacao: 'Ativo'}).sort({ order: 1 }).lean();
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
