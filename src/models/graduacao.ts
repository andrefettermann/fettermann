/* graduacao.ts */
import { model, ObjectId, Schema } from "mongoose";

interface IGraduacao {
    ordem: number,
    nome: string,
    faixa: string,
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
    }
})

const Graduacao = model<IGraduacao>('graduacoes', GraduacaoSchema);

export { Graduacao, IGraduacao };