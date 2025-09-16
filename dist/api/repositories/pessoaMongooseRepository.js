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
exports.getPessoa = getPessoa;
exports.getPessoas = getPessoas;
exports.getPessoasSituacao = getPessoasSituacao;
exports.getPessoasAniversario = getPessoasAniversario;
exports.getPessoasDojo = getPessoasDojo;
exports.createPessoa = createPessoa;
exports.updatePessoa = updatePessoa;
const mongodb_1 = require("mongodb");
const crypto_1 = require("../../utils/crypto");
const pessoa_1 = require("../../models/pessoa");
const lookupDojo = {
    $lookup: {
        from: "dojos",
        localField: "id_dojo",
        foreignField: "_id",
        as: "dojo"
    }
};
const lookupGraduacao = {
    $lookup: {
        from: "graduacoes",
        localField: "id_graduacao",
        foreignField: "_id",
        as: "graduacao"
    }
};
function getPessoa(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield pessoa_1.Pessoa.aggregate([
                {
                    $match: { "_id": new mongodb_1.ObjectId(id) }
                },
                lookupDojo,
                lookupGraduacao
                //{$unwind: '$dojo'},
            ]);
            return doc[0];
        }
        catch (error) {
            return error;
        }
    });
}
function getPessoas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield pessoa_1.Pessoa.aggregate([
                lookupDojo,
                lookupGraduacao
                //                {$unwind: '$dojo'}
            ]);
            return docs;
        }
        catch (error) {
            return error;
        }
    });
}
function getPessoasSituacao(situacao) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield pessoa_1.Pessoa.aggregate([
                {
                    $match: { 'situacao': situacao }
                },
                lookupDojo,
                lookupGraduacao
                //{$unwind: '$dojo'},
            ]);
            return docs;
        }
        catch (error) {
            return error;
        }
    });
}
function getPessoasAniversario(mes) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield pessoa_1.Pessoa.aggregate([
                {
                    $match: { 'aniversario': { $regex: mes + '$', $options: 'i' } }
                },
                lookupDojo,
                lookupGraduacao
                //{$unwind: '$dojo'},
            ]);
            return docs;
        }
        catch (error) {
            return error;
        }
    });
}
function getPessoasDojo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield pessoa_1.Pessoa.find({ id_dojo: id });
            return docs;
        }
        catch (error) {
            return error;
        }
    });
}
function createPessoa(doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            doc.nome = (0, crypto_1.encripta)(doc.nome);
            doc.cpf = (0, crypto_1.encripta)(doc.cpf);
            const pessoa = yield pessoa_1.Pessoa.create(doc);
            return pessoa;
        }
        catch (error) {
            return error;
        }
    });
}
;
function updatePessoa(id, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            doc.nome = (0, crypto_1.encripta)(doc.nome);
            doc.cpf = (0, crypto_1.encripta)(doc.cpf);
            const pessoa = yield pessoa_1.Pessoa.findByIdAndUpdate({ "_id": id }, doc, { new: true });
            if (!pessoa) {
                return {
                    status: "Failed",
                    message: "Post not available"
                };
            }
            return {
                status: "Success",
                data: pessoa
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
