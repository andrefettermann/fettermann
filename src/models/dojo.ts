// models/schema.ts
import * as mongodb from 'mongodb';
import { Document, ObjectId, Schema, model } from 'mongoose';

interface IDojo extends Document {
    nome: string,
    local: string,
    endereco: string,
    cidade: string,
    bairro: string,
    uf: string,
    pais: string,
    url: string,
    email: string,
    id_professor: ObjectId
    //horarios: [
    //    {
    //        horario: string
    //    }
    //]
};

const dojoSchema = new Schema<IDojo>({
    nome: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: false
    },
    endereco: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: false
    },
    bairro: {
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
    id_professor: {
        type: mongodb.ObjectId,
        required: false
    }
    //,
    //horarios: [
    //    {
    //        horario: {
    //            type: String,
    //            required: false
    //        },
    //    }
    //],
})

const Dojo = model<IDojo>('dojos', dojoSchema )

export { Dojo, IDojo };
