"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const repositorio = __importStar(require("../repositories/pessoaMongooseRepository"));
const crypto_1 = require("../../utils/crypto");
const date_1 = require("../../utils/date");
function getPessoa(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const doc = yield repositorio.getPessoa(id);
            if (doc) {
                doc.nome = (0, crypto_1.decripta)(doc.nome);
                if (doc.cpf)
                    doc.cpf = (0, crypto_1.decripta)(doc.cpf);
                doc.promocoes.forEach((p) => {
                    p.data_formatada = (0, date_1.formatDateDDMMAAAA)(new Date(p.data));
                });
                doc.pagamentos.forEach((p) => {
                    p.data_formatada = (0, date_1.formatDateDDMMAAAA)(new Date(p.data));
                });
                res.status(200).json(doc);
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function getPessoas(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield repositorio.getPessoas();
            if (docs) {
                docs.forEach((d) => __awaiter(this, void 0, void 0, function* () {
                    d.nome = (0, crypto_1.decripta)(d.nome);
                    if (d.cpf)
                        (0, crypto_1.decripta)(d.cpf);
                }));
                docs.sort((a, b) => {
                    var fa = a.nome.toLowerCase();
                    var fb = b.nome.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                res.status(200).json(docs);
            }
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function getPessoasSituacao(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const situacao = req.params.situacao;
        try {
            const docs = yield repositorio.getPessoasSituacao(situacao);
            if (docs) {
                docs.forEach((d) => {
                    d.nome = (0, crypto_1.decripta)(d.nome);
                    if (d.cpf)
                        (0, crypto_1.decripta)(d.cpf);
                });
                docs.sort((a, b) => {
                    var fa = a.nome.toLowerCase();
                    var fb = b.nome.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                res.json(docs);
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function getPessoasAniversariantes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mes = req.params.mes;
        try {
            const docs = yield repositorio.getPessoasAniversario(mes);
            if (docs) {
                docs.forEach((d) => {
                    d.nome = (0, crypto_1.decripta)(d.nome);
                    if (d.cpf)
                        (0, crypto_1.decripta)(d.cpf);
                });
                docs.sort((a, b) => {
                    var fa = a.nome.toLowerCase();
                    var fb = b.nome.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                res.json(docs);
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function postPessoa(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = req.body;
        try {
            const result = yield repositorio.createPessoa(doc);
            if (result)
                res.status(201).json(result);
            else
                res.sendStatus(400);
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function patchPessoa(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const pessoa = req.body;
        try {
            const result = yield repositorio.updatePessoa(id, pessoa);
            if (result)
                res.json(result);
            else
                res.sendStatus(404);
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function deletePessoa(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        /*
        const success = await repositorio.remove(id);
        if (success)
            res.sendStatus(204);
        else
            res.sendStatus(404);
        */
    });
}
exports.default = {
    getPessoa,
    getPessoas,
    getPessoasSituacao,
    getPessoasAniversariantes,
    postPessoa,
    patchPessoa,
    deletePessoa,
};
