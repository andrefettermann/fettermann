// src/models/pessoa.ts
import * as mongodb from 'mongodb';
import { Decimal128, model, ObjectId, Schema } from "mongoose";

/**
 * Interface de dados da pessoa.
 * 
 * @author Andre Fettermann
 */
interface IPessoa {
    aniversario: string,
    matricula: string,
    nome: string,
    situacao: string,
    cpf: string,
    data_inicio_aikido: string,
    data_matricula: string,
    id_dojo: ObjectId,
    id_graduacao: ObjectId,
    promocoes: [{
        data: string,
        id_graduacao: string,
    }]
};


/**
 * Schema de pessoa.
 * 
 * @author Andre Fettermann
 */
const PessoaSchema = new Schema<IPessoa>({
    aniversario: {
        type: String,
        required: false
    },
    matricula: {
        type: String,
        required: false
    },
    nome: {
        type: String,
        required: true
    },
    situacao: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: false
    },
    data_inicio_aikido: {
        type: String,
        required: false
    },
    data_matricula: {
        type: String,
        required: false
    },
    id_dojo: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    id_graduacao: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    promocoes: [
        {
            data: {
                type: Date,
                required: true
            },
            id_graduacao: {
                type: mongodb.ObjectId,
                default: null,
                required: false
            },
        }
    ]
})

const Pessoa = model<IPessoa>('pessoas', PessoaSchema);

export { Pessoa, IPessoa };