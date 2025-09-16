"use strict";
/**
 *  dojoController.ts
 *
 *  Controller de dojo.
 *
 * @author Andre Fettermann
 */
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
const repositorio = __importStar(require("../repositories/atlasAppRepository"));
const crypto_1 = require("../../utils/crypto");
var totalHorarios = 0;
function setDoc(req) {
    var doc_horarios = [];
    if (totalHorarios > 0) {
        for (var i = 0; i < req.body.total_horarios; i++) {
            const horario = req.body['horario_' + (i + 1)];
            if (horario) {
                const doc_horario = {
                    'horario': horario
                };
                doc_horarios.push(doc_horario);
            }
        }
    }
    const doc = {
        'nome': req.body.nome,
        'endereco': req.body.endereco,
        'bairro': req.body.bairro,
        'cidade': req.body.cidade,
        'uf': req.body.uf,
        'pais': req.body.pais,
        'url': req.body.url,
        'email': req.body.email,
        'id_professor': req.body.professor_id,
        doc_horarios
    };
    return doc;
}
function buscaPeloId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const response = yield repositorio.find('GetDojo', id);
            if (response.sucesso) {
                if (response.doc.professor[0])
                    response.doc.professor[0].nome = (0, crypto_1.decripta)(response.doc.professor[0].nome);
                response.doc.alunos.forEach((a) => {
                    a.nome = (0, crypto_1.decripta)(a.nome);
                });
                return res.status(200).send(response.doc);
            }
            else {
                res.status(500).json({ mensagem: response.error });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error });
        }
    });
}
function buscaTodos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield repositorio.findAll('GetDojos');
            if (response.sucesso) {
                response.docs.forEach((element) => {
                    element.professor.forEach((p) => {
                        if (p.nome)
                            p.nome = (0, crypto_1.decripta)(p.nome);
                    });
                });
                return res.status(200).send(response.docs);
            }
            else {
                res.status(500).json({ mensagem: response.error });
            }
        }
        catch (error) {
            res.status(500).json({ mensagem: error });
        }
    });
}
function inclui(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dados = setDoc(req);
        try {
            const response = yield repositorio.insert('PostDojo', dados);
            if (response.sucesso) {
                res.status(201).json(response);
            }
            else {
                res.status(500).json({ mensagem: response.error });
            }
        }
        catch (error) {
            console.log("e: " + error);
            res.status(500).json({ mensagem: error });
        }
    });
}
function atualiza(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const dados = setDoc(req);
        try {
            const response = yield repositorio.update('PatchDojo', id, dados);
            if (response.success) {
                res.status(201).json(response);
            }
            else {
                res.status(500).json({ mensagem: response.error });
            }
        }
        catch (error) {
            console.log("e: " + error);
            res.status(500).json({ mensagem: error });
        }
    });
}
exports.default = {
    buscaPeloId,
    buscaTodos,
    inclui,
    atualiza
};
