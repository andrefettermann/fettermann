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
exports.getDojo = getDojo;
exports.getDojos = getDojos;
exports.createDojo = createDojo;
exports.updateDojo = updateDojo;
const mongodb_1 = require("mongodb");
const dojo_1 = require("../../models/dojo");
const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        localField: "id_professor",
        foreignField: "_id",
        as: "professor"
    }
};
const projectDojos = {
    $project: {
        _id: 1,
        codigo: 1,
        nome: 1,
        cidade: 1,
        'professor.nome': 1,
    }
};
const projectDojo = {
    $project: {
        _id: 1,
        codigo: 1,
        nome: 1,
        endereco: 1,
        cidade: 1,
        bairro: 1,
        uf: 1,
        pais: 1,
        url: 1,
        email: 1,
        horarios: 1,
        id_professor: 1,
        'professor.nome': 1,
    }
};
function getDojo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield dojo_1.Dojo.aggregate([
                {
                    $match: { "_id": new mongodb_1.ObjectId(id) }
                },
                lookupPessoa,
                { $unwind: '$professor' },
                projectDojo,
            ]);
            return docs[0];
        }
        catch (error) {
            return error;
        }
    });
}
function getDojos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield dojo_1.Dojo.aggregate([
                lookupPessoa,
                { $unwind: '$professor' },
                projectDojos,
            ]).sort({ nome: 1 });
            //find({}).sort({ nome: 1 }).lean();
            return docs;
        }
        catch (error) {
            return error;
        }
    });
}
function createDojo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield dojo_1.Dojo.create(data);
            return doc;
        }
        catch (error) {
            return error;
        }
    });
}
;
function updateDojo(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dojo = yield dojo_1.Dojo.findByIdAndUpdate({ "_id": id }, data, { new: true });
            if (!dojo) {
                return {
                    status: "Failed",
                    message: "Post not available"
                };
            }
            return dojo;
        }
        catch (error) {
            return error;
        }
    });
}
