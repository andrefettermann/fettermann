// models/schema.ts
import { Decimal128, ObjectId, Schema, model } from 'mongoose';
import Joi, { required } from 'joi';

export const PessoaSchemaValidate = Joi.object({
    nome: Joi.string().required(),
});


interface IDojo {
    codigo: string,
    nome: string,
    endereco: string,
    cidade: string,
    uf: string,
    pais: string,
    url: string,
    email: string,
    professor_id: ObjectId
    horarios: [
        {
            horario: string
        }
    ]
};

const dojoSchema = new Schema<IDojo>({
    codigo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    professor_id: {
        type: String,
        required: false
    },
    horarios: [
        {
            horario: {
                type: String,
                required: false
            },
        }
    ],
})

export const DojoSchema = model<IDojo>('dojos', dojoSchema )

