/* dojoRoute.ts */

import express from 'express';
import controlador from '../controllers/dojoController';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        var response = await fetch('http://localhost:3000/dojos/api/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = await response.json();
        res.render('dojos',
            {
                title: 'Dojos cadastrados',
                docs,
                total: docs.length,
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/novo', async (req, res, next) => {
    try {
        var response = await fetch('http://localhost:3000/dojos/api/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const docs = await response.json();
        res.render('dojo',
            {
                title: 'Dados do dojo (Inclusão)',
                doc: "",
                action: '/dojos/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});


router.get('/api/:id', controlador.getDojo);

router.get('/api/', controlador.getDojos);

router.post('/api/', controlador.postDojo);

router.patch('/api/:id', controlador.patchDojo);

router.delete('/api/:id', controlador.deleteDojo);

export default router;
