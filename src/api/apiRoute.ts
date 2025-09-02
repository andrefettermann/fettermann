/* apiRoute.ts */
import express from 'express';
import pessoaMongooseController from './controllers/pessoaMongooseController';
import graduacaoMongooseController from './controllers/graduacaoMongooseController';
import dojoMongooseController from './controllers/dojoMongooseController';

import dojoController from './controllers/dojoController';
import graduacaoController from './controllers/graduacaoController';
import pessoaController from './controllers/pessoaController';

const router = express.Router();

/* Pessoa routes */

router.get('/pessoa/:id', pessoaController.buscaPeloId);

router.get('/pessoas/', pessoaController.buscaTodos);

router.get('/pessoas/situacao/:situacao', pessoaController.buscaSituacao);

router.get('/pessoas/aniversariantes/:mes', pessoaController.buscaAniversariantes);

router.post('/pessoa/inclui/', pessoaController.inclui);

router.patch('/pessoa/altera/:id', pessoaController.atualiza);

router.delete('/pessoa/exclui/:id', pessoaMongooseController.deletePessoa);

/* Graduacao routes */

router.get('/graduacao/:id', graduacaoController.buscaPeloId);

router.get('/graduacoes/', graduacaoController.buscaTodos);

router.post('/graduacao/',graduacaoController.inclui);

router.patch('/graduacao/:id', graduacaoController.atualiza);

router.delete('/graduacao/:id', graduacaoMongooseController.deleteGraduacao);

/* Dojo routes */

router.get('/dojo/:id', dojoController.buscaPeloId);

router.get('/dojos/', dojoController.buscaTodos);

router.post('/dojo/', dojoController.inclui);

router.patch('/dojo/:id', dojoController.atualiza);

router.delete('/dojo/:id', dojoMongooseController.deleteDojo);

export default router;
