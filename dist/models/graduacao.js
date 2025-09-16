"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graduacao = void 0;
/* graduacao.ts */
const mongoose_1 = require("mongoose");
;
const GraduacaoSchema = new mongoose_1.Schema({
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
}, { collection: 'graduacoes' });
const Graduacao = (0, mongoose_1.model)('graduacoes', GraduacaoSchema);
exports.Graduacao = Graduacao;
