/* graduacao.ts */
import { model, Schema } from "mongoose";

interface IGraduacao {
    ordem: number,
    nome: string,
    faixa: string,
    minimo_horas_treino_exame: number,
    minimo_tempo_exame: number,
    categoria: string,
    observacoes: string
};

const GraduacaoSchema = new Schema<IGraduacao>({
    ordem: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    faixa: {
        type: String,
        required: false
    },
    minimo_horas_treino_exame: {
        type: Number,
        required: false
    },
    minimo_tempo_exame: {
        type: Number,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    observacoes: {
        type: String,
        required: true
    }
}, {collection : 'graduacoes'})

const Graduacao = model<IGraduacao>('graduacoes', GraduacaoSchema);

export { Graduacao, IGraduacao };