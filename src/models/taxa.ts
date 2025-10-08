// models/taxa.ts
import * as mongodb from 'mongodb';
import { Document, ObjectId, Schema, model } from 'mongoose';

/**
 * Interface de dados da taxa.
 * 
 * @author Andre Fettermann
 */
interface ITaxa extends Document {
    nome: string,
    descricao: string,
    periodo: string,
    valor_bruto: number,
    percentual: number,
    observacoes: string
};

const taxaSchema = new Schema<ITaxa>({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    periodo: {
        type: String,
        required: false
    },
    valor_bruto: {
        type: Number,
        required: false
    },
    percentual: {
        type: Number,
        required: false
    },
    observacoes: {
        type: String,
        required: false
    }
})

const Taxa = model<ITaxa>('taxas', taxaSchema )

export { Taxa, ITaxa };
