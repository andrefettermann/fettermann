/* apiRoute.ts */
import express from 'express';
import pessoaController from '../controllers/apiPessoaController';
import graduacaoController from '../controllers/apiGraduacaoController';

const router = express.Router();

router.get('/pessoa/:id', pessoaController.getPessoa);

router.get('/pessoas/', pessoaController.getPessoas);

router.get('/pessoas/situacao/:situacao', pessoaController.getPessoasSituacao);

router.get('/pessoas/aniversariantes/:mes', pessoaController.getPessoasAniversariantes);

router.post('/pessoa/inclui/', pessoaController.postPessoa);

router.patch('/pessoa/altera/:id', pessoaController.patchPessoa);

router.delete('/pessoa/exclui/:id', pessoaController.deletePessoa);

router.get('/graduacao/:id', graduacaoController.getGraduacao);

router.get('/graduacoes/', graduacaoController.getGraduacoes);

router.post('/graduacao/',graduacaoController.postGraduacao);

router.patch('/graduacao/:id', graduacaoController.patchGraduacao);

router.delete('/graduacao/:id', graduacaoController.deleteGraduacao);


export default router;
