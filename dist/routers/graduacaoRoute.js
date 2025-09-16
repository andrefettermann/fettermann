"use strict";
/* graduacaoRoute.ts */
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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
var mensagem = "";
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/graduacoes/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = yield response.json();
        res.render('graduacoes', {
            title: 'Graduações cadastradas',
            docs,
            total: docs.length,
            mensagem
        });
        mensagem = "";
    }
    catch (err) {
        next(err);
    }
}));
router.get('/novo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('graduacao', {
            title: 'Dados da graduação (Inclusão)',
            doc: "",
            total_tecnicas: 0,
            action: '/graduacoes/inclui/'
        });
    }
    catch (err) {
        next(err);
    }
}));
router.get('/edita/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const doc = yield response.json();
        res.render('graduacao', {
            title: 'Dados da graduação (Edição)',
            doc,
            total_tecnicas: doc.tecnicas ? doc.tecnicas.length : 0,
            action: '/graduacoes/altera/' + id
        });
    }
    catch (err) {
        next(err);
    }
}));
router.get('/detalhes/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Graduacao status: ${response.status}`);
        }
        const doc = yield response.json();
        res.render('graduacao_detalhes', {
            title: 'Dados da graduação (Consulta)',
            doc,
            action: '/graduacoes/altera/' + id
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/inclui', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/graduacao/`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        mensagem = 'Graduação incluída com sucesso!';
        res.redirect('/graduacoes');
    }
    catch (err) {
        next(err);
    }
}));
router.post('/altera/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/graduacao/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        mensagem = 'Graduação alterada com sucesso!';
        res.redirect('/graduacoes');
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
