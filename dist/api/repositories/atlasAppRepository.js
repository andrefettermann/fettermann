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
exports.find = find;
exports.findAll = findAll;
exports.findAllBy = findAllBy;
exports.insert = insert;
exports.update = update;
const realmClient_1 = require("../../realmClient");
function find(nomeFuncaoAtlas, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (0, realmClient_1.getLoggedInUser)();
            const doc = yield user.functions[nomeFuncaoAtlas](id);
            if (doc) {
                return {
                    sucesso: true,
                    doc: doc.result[0]
                };
            }
            else {
                return {
                    sucesso: false,
                    error: doc.result
                };
            }
        }
        catch (error) {
            throw (error);
        }
    });
}
function findAll(nomeFuncaoAtlas) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (0, realmClient_1.getLoggedInUser)();
            const docs = yield user.functions[nomeFuncaoAtlas]();
            if (docs) {
                return {
                    sucesso: true,
                    docs: docs.result
                };
            }
            else {
                return {
                    sucesso: false,
                    error: docs.result
                };
            }
        }
        catch (error) {
            throw (error);
        }
    });
}
function findAllBy(nomeFuncaoAtlas, arg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (0, realmClient_1.getLoggedInUser)();
            const docs = yield user.functions[nomeFuncaoAtlas](arg);
            if (docs) {
                return {
                    sucesso: true,
                    docs: docs.result
                };
            }
            else {
                return {
                    sucesso: false,
                    error: docs.result
                };
            }
        }
        catch (error) {
            console.log(error);
            throw (error);
        }
    });
}
function insert(nomeFuncaoAtlas, dados) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (0, realmClient_1.getLoggedInUser)();
            const doc = yield user.functions[nomeFuncaoAtlas](dados);
            if (doc.success) {
                return {
                    sucesso: true,
                    doc: doc.insertedId
                };
            }
            else {
                return doc;
            }
        }
        catch (error) {
            throw (error);
        }
    });
}
;
function update(nomeFuncaoAtlas, id, dados) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const dojo = await Dojo.findByIdAndUpdate({"_id":id}, data, {new: true})
            const user = (0, realmClient_1.getLoggedInUser)();
            const doc = yield user.functions[nomeFuncaoAtlas](id, dados);
            if (!doc) {
                return {
                    sucesso: false,
                    mensagem: "Nao foi possivel atualizar"
                };
            }
            else if (!doc.success) {
                return {
                    sucesso: false,
                    mensagem: "Nao foi possivel atualizar"
                };
            }
            else {
                return {
                    sucesso: true,
                    doc: doc
                };
            }
        }
        catch (error) {
            throw (error);
        }
    });
}
