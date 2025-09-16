"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraduacao = getGraduacao;
exports.getGraduacoes = getGraduacoes;
exports.createGraduacao = createGraduacao;
exports.updateGraduacao = updateGraduacao;
exports.deleteGraduacao = deleteGraduacao;
/* apiGraduacaoRepository.ts */
const mongodb_1 = require("mongodb");
const graduacao_1 = require("../../models/graduacao");
const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        localField: "_id",
        foreignField: "id_graduacao",
        as: "pessoas"
    }
};
function getGraduacao(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield graduacao_1.Graduacao.aggregate([
                {
                    $match: { "_id": new mongodb_1.ObjectId(id) }
                },
                lookupPessoa,
            ]);
            //await Graduacao.findById(id);
            return docs[0];
        }
        catch (error) {
            return error;
        }
    });
}
function getGraduacoes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield graduacao_1.Graduacao.find({}).sort({ ordem: 1 }).lean();
            return docs;
        }
        catch (error) {
            return error;
        }
    });
}
function createGraduacao(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const graduacao = yield graduacao_1.Graduacao.create(data);
            return graduacao;
        }
        catch (error) {
            return error;
        }
    });
}
;
function updateGraduacao(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const graduacao = yield graduacao_1.Graduacao.findByIdAndUpdate({ "_id": id }, data, { new: true });
            if (!graduacao) {
                return {
                    status: "Failed",
                    message: "Post not available"
                };
            }
            return graduacao;
        }
        catch (error) {
            return error;
        }
    });
}
function deleteGraduacao(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const graduacao = yield graduacao_1.Graduacao.deleteOne({ "_id": id });
            return graduacao;
        }
        catch (error) {
            return error;
        }
    });
}
