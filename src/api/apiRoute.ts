/* apiRoute.ts */
import express from 'express';
import graduacaoController from './controllers/graduacaoController';
import dojoController from './controllers/dojoController';
import { login } from './auth';

const router = express.Router();

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
