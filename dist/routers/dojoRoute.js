"use strict";
/**
 * dojoRoute.ts
 *
 * Router para acesso a funcionalidade de dojos.
 *
 * @author Andre Fettermann
 **/
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
/* Busca todos os dojos */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/dojos/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {
            //const docs = await response.json();
            const dojos = yield response.json();
            res.render('dojos', {
                title: 'Dojos cadastrados',
                dojos,
                total: dojos.length,
                mensagem
            });
        }
        mensagem = "";
    }
    catch (err) {
        next(err);
    }
}));
router.get('/novo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responsePessoas = yield fetch(`${req.protocol}://${req.host}/api/pessoas/`);
        if (!responsePessoas.ok) {
            throw new Error(`HTTP error! Pessoas status: ${responsePessoas.status}`);
        }
        const docsPessoas = yield responsePessoas.json();
        res.render('dojo', {
            title: 'Dados do dojo (Inclusão)',
            doc: "",
            docs_pessoas: docsPessoas,
            action: '/dojos/inclui/'
        });
    }
    catch (err) {
        next(err);
    }
}));
router.get('/detalhes/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const responseGraduacoes = yield fetch(`${req.protocol}://${req.host}/api/graduacoes`);
        if (!responseGraduacoes.ok) {
            throw new Error(`HTTP error! Graduacoes status: ${responseGraduacoes.status}`);
        }
        const response = yield fetch(`${req.protocol}://${req.host}/api/dojo/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs_graduacoes = yield responseGraduacoes.json();
        const doc = yield response.json();
        res.render('dojo_detalhes', {
            title: 'Dados do dojo (Consulta)',
            doc,
            docs_graduacoes,
            action: '/dojos/altera/' + id
        });
    }
    catch (err) {
        next(err);
    }
}));
router.get('/edita/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const responsePessoas = yield fetch(`${req.protocol}://${req.host}/api/pessoas/`);
        if (!responsePessoas.ok) {
            throw new Error(`HTTP error! Pessoas status: ${responsePessoas.status}`);
        }
        const docsPessoas = yield responsePessoas.json();
        const responseDojo = yield fetch(`${req.protocol}://${req.host}/api/dojo/${id}`);
        if (!responseDojo.ok) {
            throw new Error(`HTTP error! status: ${responseDojo.status}`);
        }
        const doc = yield responseDojo.json();
        res.render('dojo', {
            title: 'Dados do dojo (Edição)',
            doc,
            docs_pessoas: docsPessoas,
            action: '/dojos/altera/' + id
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/inclui', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //var doc = setDoc(req);
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/dojo/`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        mensagem = 'Dojo incluído com sucesso!';
        res.redirect('/dojos');
    }
    catch (err) {
        next(err);
    }
}));
router.post('/altera/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const response = yield fetch(`${req.protocol}://${req.host}/api/dojo/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(req.body) // Convert data to JSON string for the request body
        });
        mensagem = 'Dojo alterado com sucesso!';
        res.redirect('/dojos');
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
