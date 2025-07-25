/* apiRoute.ts */
import express from 'express';
import controlador from '../controllers/apiPessoaController';

const router = express.Router();

router.get('/pessoa/:id', controlador.getPessoa);

router.get('/pessoas/', controlador.getPessoas);

router.get('/pessoas/situacao/:situacao', controlador.getPessoasSituacao);

router.get('/pessoas/aniversariantes/:mes', controlador.getPessoasAniversariantes);

router.post('/pessoa/inclui/', controlador.postPessoa);

router.patch('/pessoa/altera/:id', controlador.patchPessoa);

router.delete('/pessoa/exclui/:id', controlador.deletePessoa);

export default router;
