"use strict";
/**
 *  graduacaoController.ts
 *
 *  Controller de graduacao.
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
function setDoc(req) {
    var totalTecnicas = req.body.total_tecnicas;
    var doc_tecnicas = [];
    if (totalTecnicas > 0) {
        for (var i = 0; i < req.body.total_tecnicas; i++) {
            var nome = req.body['nome_' + (i + 1)];
            var doc_tecnica = {
                nome
            };
            doc_tecnicas.push(doc_tecnica);
        }
    }
    var doc = {
        'ordem': parseInt(req.body.ordem),
        'nome': req.body.nome,
        'faixa': req.body.faixa,
        'minimo_horas_treino_exame': parseInt(req.body.horas_exame),
        'minimo_tempo_exame': parseInt(req.body.meses_exame),
        'categoria': req.body.categoria,
        'observacoes': req.body.observacoes,
        'tecnicas': doc_tecnicas
    };
    console.log(doc);
    return doc;
}
function buscaPeloId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const response = yield repositorio.find('GetGraduacao', id);
            if (response.sucesso) {
                response.doc.pessoas.forEach((a) => {
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
            const result = yield repositorio.findAll('GetGraduacoes');
            if (result.result = "Success") {
                result.docs.sort((a, b) => {
                    //var fa = a.nome.toLowerCase();
                    //var fb = b.nome.toLowerCase();
                    if (a.ordem < b.ordem) {
                        return -1;
                    }
                    if (a.ordem > b.ordem) {
                        return 1;
                    }
                    return 0;
                });
                return res.status(200).json(result.docs);
            }
            else {
                res.status(500).json({ mensagem: result.error });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error });
        }
    });
}
function inclui(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dados = setDoc(req);
        try {
            const response = yield repositorio.insert('PostGraduacao', dados);
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
            const response = yield repositorio.update('PatchGraduacao', id, dados);
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
