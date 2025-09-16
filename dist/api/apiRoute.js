"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* apiRoute.ts */
const express_1 = __importDefault(require("express"));
const pessoaMongooseController_1 = __importDefault(require("./controllers/pessoaMongooseController"));
const graduacaoMongooseController_1 = __importDefault(require("./controllers/graduacaoMongooseController"));
const dojoMongooseController_1 = __importDefault(require("./controllers/dojoMongooseController"));
const dojoController_1 = __importDefault(require("./controllers/dojoController"));
const graduacaoController_1 = __importDefault(require("./controllers/graduacaoController"));
const pessoaController_1 = __importDefault(require("./controllers/pessoaController"));
const router = express_1.default.Router();
/* Pessoa routes */
router.get('/pessoa/:id', pessoaController_1.default.buscaPeloId);
router.get('/pessoas/', pessoaController_1.default.buscaTodos);
router.get('/pessoas/situacao/:situacao', pessoaController_1.default.buscaSituacao);
router.get('/pessoas/aniversariantes/:mes', pessoaController_1.default.buscaAniversariantes);
router.post('/pessoa/inclui/', pessoaController_1.default.inclui);
router.patch('/pessoa/altera/:id', pessoaController_1.default.atualiza);
router.delete('/pessoa/exclui/:id', pessoaMongooseController_1.default.deletePessoa);
/* Graduacao routes */
router.get('/graduacao/:id', graduacaoController_1.default.buscaPeloId);
router.get('/graduacoes/', graduacaoController_1.default.buscaTodos);
router.post('/graduacao/', graduacaoController_1.default.inclui);
router.patch('/graduacao/:id', graduacaoController_1.default.atualiza);
router.delete('/graduacao/:id', graduacaoMongooseController_1.default.deleteGraduacao);
/* Dojo routes */
router.get('/dojo/:id', dojoController_1.default.buscaPeloId);
router.get('/dojos/', dojoController_1.default.buscaTodos);
router.post('/dojo/', dojoController_1.default.inclui);
router.patch('/dojo/:id', dojoController_1.default.atualiza);
router.delete('/dojo/:id', dojoMongooseController_1.default.deleteDojo);
exports.default = router;
