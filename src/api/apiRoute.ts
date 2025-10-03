/* apiRoute.ts */
import express from 'express';
import pessoaController from './controllers/pessoaController';
import graduacaoController from './controllers/graduacaoController';
import dojoController from './controllers/dojoController';

const router = express.Router();

/* Pessoa routes */

router.get('/pessoa/:id', pessoaController.busca);

router.get('/pessoas/', pessoaController.buscaTodos);

router.get('/pessoas/situacao/:situacao', pessoaController.buscaSituacao);

router.get('/pessoas/aniversariantes/:mes', pessoaController.buscaAniversariantes);

router.post('/pessoa/inclui/', pessoaController.inclui);

router.patch('/pessoa/altera/:id', pessoaController.atualiza);


/* Graduacao routes */

router.get('/graduacao/:id', graduacaoController.busca);

router.get('/graduacoes/', graduacaoController.buscaTodos);

router.post('/graduacao/',graduacaoController.inclui);

router.patch('/graduacao/:id', graduacaoController.atualiza);


/* Dojo routes */

router.get('/dojo/:id', dojoController.busca);

router.get('/dojos/', dojoController.buscaTodos);

router.post('/dojo/', dojoController.inclui);

router.patch('/dojo/:id', dojoController.atualiza);

export default router;
