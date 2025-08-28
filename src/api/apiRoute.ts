/* apiRoute.ts */
import express from 'express';
import apiPessoaController from '../api/controllers/apiPessoaController';
import apiGraduacaoController from '../api/controllers/apiGraduacaoController';
import apiDojoController from '../api/controllers/apiDojoController';

import dojoController from '../controllers/dojoController';
import graduacaoController from '../controllers/graduacaoController';
import pessoaController from '../controllers/pessoaController';

const router = express.Router();

/* Pessoa routes */

router.get('/pessoa/:id', pessoaController.buscaPeloId);

router.get('/pessoas/', pessoaController.buscaTodos);

router.get('/pessoas/situacao/:situacao', pessoaController.buscaSituacao);

router.get('/pessoas/aniversariantes/:mes', pessoaController.buscaAniversariantes);

router.post('/pessoa/inclui/', pessoaController.inclui);

router.patch('/pessoa/altera/:id', pessoaController.atualiza);

router.delete('/pessoa/exclui/:id', apiPessoaController.deletePessoa);

/* Graduacao routes */

router.get('/graduacao/:id', graduacaoController.buscaPeloId);

router.get('/graduacoes/', graduacaoController.buscaTodos);

router.post('/graduacao/',apiGraduacaoController.postGraduacao);

router.patch('/graduacao/:id', apiGraduacaoController.patchGraduacao);

router.delete('/graduacao/:id', apiGraduacaoController.deleteGraduacao);

/* Dojo routes */

router.get('/dojo/:id', dojoController.buscaPeloId);

router.get('/dojos/', dojoController.buscaTodos);

router.post('/dojo/', dojoController.inclui);

router.patch('/dojo/:id', dojoController.atualiza);

router.delete('/dojo/:id', apiDojoController.deleteDojo);

export default router;
