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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* pessoaRoute.ts */
const express_1 = __importDefault(require("express"));
const date_1 = require("../utils/date");
const router = express_1.default.Router();
var mensagem = "";
/** Busca todas as pessoas */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoas/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = yield response.json();
        res.render('pessoas', {
            title: 'Pessoas cadastradas',
            docs,
            total: docs.length,
            mensagem,
            logo: 'images/logo-sm.png',
            mes: (0, date_1.getCurrentMonth)()
        });
    }
    catch (err) {
        next(err);
    }
}));
/** Busca as pessoas ativas ou inativas */
router.get('/situacao/:situacao', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const situacao = req.params.situacao;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoas/situacao/${situacao}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = yield response.json();
        res.render('pessoas', {
            title: 'Pessoas cadastradas (' + situacao + ')',
            docs,
            total: docs.length,
            mensagem,
            logo: '/images/logo-sm.png',
            mes: (0, date_1.getCurrentMonth)()
        });
    }
    catch (err) {
        next(err);
    }
}));
/** Busca os aniversariantes do mes informado */
router.get('/aniversariantes/:mes', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const mes = req.params.mes;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoas/aniversariantes/${mes}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = yield response.json();
        res.render('pessoas', {
            title: 'Pessoas cadastradas (aniversariantes do mês)',
            docs,
            total: docs.length,
            mensagem,
            logo: '/images/logo-sm.png',
            mes: (0, date_1.getCurrentMonth)()
        });
    }
    catch (err) {
        next(err);
    }
}));
/** Abre a tela de inclusao dos dados da pessoa*/
router.get('/novo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDojos = yield fetch(`${req.protocol}://${req.host}/api/dojos`);
        const responseGraduacoes = yield fetch(`${req.protocol}://${req.host}/api/graduacoes`);
        if (!responseDojos.ok) {
            throw new Error(`HTTP error! Dojos status: ${responseDojos.status}`);
        }
        else if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }
        const docsDojos = yield responseDojos.json();
        const docsGraduacoes = yield responseGraduacoes.json();
        res.render('pessoa', {
            title: 'Dados da pessoa (Inclusão)',
            doc: "",
            docs_dojos: docsDojos,
            docs_graduacoes: docsGraduacoes,
            total_promocoes: 0,
            total_pagamentos: 0,
            action: '/pessoas/inclui/',
        });
    }
    catch (err) {
        next(err);
    }
}));
/** Abre a tela com os detalhes da pessoa */
router.get('/detalhes/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const responseGraduacoes = yield fetch(`${req.protocol}://${req.host}/api/graduacoes`);
        if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoa/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Pessoa status: ${response.status}`);
        }
        const docs_graduacoes = yield responseGraduacoes.json();
        const doc = yield response.json();
        res.render('pessoa_detalhes', {
            title: 'Dados da pessoa (Consulta)',
            doc,
            docs_graduacoes
        });
    }
    catch (err) {
        next(err);
    }
}));
/** Abre a tela para alteracao dos dados da pessoa */
router.get('/edita/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const responseDojos = yield fetch(`${req.protocol}://${req.host}/api/dojos`);
        const responseGraduacoes = yield fetch(`${req.protocol}://${req.host}/api/graduacoes`);
        if (!responseDojos.ok) {
            throw new Error(`HTTP error! Dojos status: ${responseDojos.status}`);
        }
        else if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }
        const docs_dojos = yield responseDojos.json();
        const docs_graduacoes = yield responseGraduacoes.json();
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoa/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Pessoa status: ${response.status}`);
        }
        const doc = yield response.json();
        res.render('pessoa', {
            title: 'Dados da pessoa (Alteração)',
            doc,
            action: '/pessoas/altera/' + id,
            total_pagamentos: doc.pagamentos.length,
            total_promocoes: doc.promocoes.length,
            docs_dojos,
            docs_graduacoes,
            mensagem: ''
        });
    }
    catch (err) {
        next(err);
    }
}));
/** Inclui os dados da pessoa */
router.post('/inclui', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoa/inclui`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Inclusao de pessoa status: ${response.status}`);
        }
        mensagem = 'Pessoa incluída com sucesso!';
        res.redirect('/pessoas');
    }
    catch (err) {
        next(err);
    }
}));
/** Altera os dados da pessoa */
router.post('/altera/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/pessoa/altera/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        mensagem = 'Pessoa alterada com sucesso!';
        res.redirect('/pessoas');
    }
    catch (err) {
        next(err);
    }
}));
/** Exclui os dados da organizacao */
router.get('/exclui/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
}));
exports.default = router;
