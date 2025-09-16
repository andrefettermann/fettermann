"use strict";
/**
 *  pessoaController.ts
 *
 *  Controller de pessoa.
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
const date_1 = require("../../utils/date");
//const repositorio = new PessoaRepository()
function decriptaCpf(cpf) {
    if (cpf && cpf !== null && cpf !== undefined && cpf.length > 0) {
        cpf = (0, crypto_1.decripta)(cpf);
    }
    else {
        cpf = "";
    }
    return cpf;
}
function buscaPeloId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const response = yield repositorio.find('GetPessoa', id);
            if (response.sucesso) {
                let pessoa = response.doc;
                pessoa.nome = (0, crypto_1.decripta)(pessoa.nome);
                pessoa.cpf = decriptaCpf(pessoa.cpf);
                pessoa.promocoes.forEach((p) => __awaiter(this, void 0, void 0, function* () {
                    p.data_formatada = (0, date_1.formatDateDDMMAAAA)(p.data);
                }));
                pessoa.pagamentos.forEach((p) => {
                    p.data_formatada = (0, date_1.formatDateDDMMAAAA)(p.data);
                });
                return res.status(200).send(pessoa);
            }
            else {
                console.log(response.error);
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
            const response = yield repositorio.findAll('GetPessoas');
            if (response.sucesso) {
                response.docs.forEach((element) => {
                    element.nome = (0, crypto_1.decripta)(element.nome);
                    element.cpf = decriptaCpf(element.cpf);
                });
                response.docs.sort((a, b) => {
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
                return res.status(200).json(response.docs);
            }
            else {
                console.log(response.error);
                res.status(500).json({ mensagem: response.error });
            }
        }
        catch (error) {
            console.log("Error: " + error);
            res.status(500).json({ mensagem: error });
        }
    });
}
function buscaAniversariantes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mes = Number(req.params.mes);
        try {
            const response = yield repositorio.findAllBy('GetAniversariantes', mes);
            if (response.sucesso) {
                response.docs.forEach((element) => {
                    element.nome = (0, crypto_1.decripta)(element.nome);
                    element.cpf = decriptaCpf(element.cpf);
                });
                response.docs.sort((a, b) => {
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
                return res.status(200).json(response.docs);
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
function buscaSituacao(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const situacao = req.params.situacao;
        try {
            const response = yield repositorio.findAllBy('GetPessoasSituacao', situacao);
            if (response.sucesso) {
                response.docs.forEach((element) => {
                    element.nome = (0, crypto_1.decripta)(element.nome);
                    element.cpf = decriptaCpf(element.cpf);
                });
                response.docs.sort((a, b) => {
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
                return res.status(200).json(response.docs);
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
function setDoc(req) {
    var totalPromocoes = req.body.total_promocoes;
    var totalPagamentos = req.body.total_pagamentos;
    var doc = {};
    var doc_promocoes = [];
    if (totalPromocoes > 0) {
        for (var i = 0; i < req.body.total_promocoes; i++) {
            var graduacao = req.body['id_graduacao_promocao_' + (i + 1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': (0, date_1.convertDdMmYyyyToDate)(req.body['data_promocao_' + (i + 1)]),
                    'id_graduacao': req.body['id_graduacao_promocao_' + (i + 1)]
                };
                doc_promocoes.push(doc_promocao);
            }
        }
    }
    var doc_pagamentos = [];
    if (totalPagamentos > 0) {
        for (var i = 0; i < req.body.total_pagamentos; i++) {
            let data = req.body['data_pagamento_' + (i + 1)];
            if (data) {
                var doc_pagamento = {
                    'data': (0, date_1.convertDdMmYyyyToDate)(req.body['data_pagamento_' + (i + 1)]),
                    'valor_pago': Number.parseFloat(req.body['valor_pagamento_' + (i + 1)]),
                    'descricao': req.body['descricao_pagamento_' + (i + 1)]
                };
                doc_pagamentos.push(doc_pagamento);
            }
        }
    }
    if (req.body.id_dojo == '') {
        doc = {
            'aniversario': req.body.aniversario,
            'matricula': req.body.matricula,
            'nome': (0, crypto_1.encripta)(req.body.nome),
            'situacao': req.body.situacao,
            'cpf': req.body.cpf === '' ? '' : (0, crypto_1.encripta)(req.body.cpf),
            'data_inicio_aikido': req.body.data_inicio,
            'data_matricula': req.body.data_matricula,
            'id_dojo': null,
            'id_graduacao': req.body.id_graduacao,
            'promocoes': doc_promocoes,
            'pagamentos': doc_pagamentos
        };
    }
    else {
        doc = {
            'aniversario': req.body.aniversario,
            'matricula': req.body.matricula,
            'nome': (0, crypto_1.encripta)(req.body.nome),
            'situacao': req.body.situacao,
            'cpf': req.body.cpf === '' ? '' : (0, crypto_1.encripta)(req.body.cpf),
            'data_inicio_aikido': req.body.data_inicio,
            'data_matricula': req.body.data_matricula,
            'graduacao_atual': req.body.graduacao_atual,
            'id_dojo': req.body.id_dojo,
            'id_graduacao': req.body.id_graduacao,
            'promocoes': doc_promocoes,
            'pagamentos': doc_pagamentos
        };
    }
    return doc;
}
function inclui(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = setDoc(req);
        try {
            const response = yield repositorio.insert('PostPessoa', doc);
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
        const doc = setDoc(req);
        try {
            const response = yield repositorio.update('PatchPessoa', id, doc);
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
exports.default = {
    buscaPeloId,
    buscaTodos,
    buscaAniversariantes,
    buscaSituacao,
    inclui,
    atualiza
};
