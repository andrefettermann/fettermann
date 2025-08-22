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

router.get('/pessoa/:id', apiPessoaController.getPessoa);

router.get('/pessoas/', pessoaController.buscaTodos);

router.get('/pessoas/situacao/:situacao', apiPessoaController.getPessoasSituacao);

router.get('/pessoas/aniversariantes/:mes', apiPessoaController.getPessoasAniversariantes);

router.post('/pessoa/inclui/', apiPessoaController.postPessoa);

router.patch('/pessoa/altera/:id', apiPessoaController.patchPessoa);

router.delete('/pessoa/exclui/:id', apiPessoaController.deletePessoa);

/* Graduacao routes */

router.get('/graduacao/:id', apiGraduacaoController.getGraduacao);

router.get('/graduacoes/', graduacaoController.buscaTodos);

router.post('/graduacao/',apiGraduacaoController.postGraduacao);

router.patch('/graduacao/:id', apiGraduacaoController.patchGraduacao);

router.delete('/graduacao/:id', apiGraduacaoController.deleteGraduacao);

/* Dojo routes */

router.get('/dojo/:id', apiDojoController.getDojo);

router.get('/dojos/', dojoController.getDojos);

router.post('/dojo/', apiDojoController.postDojo);

router.patch('/dojo/:id', apiDojoController.patchDojo);

router.delete('/dojo/:id', apiDojoController.deleteDojo);

export default router;
