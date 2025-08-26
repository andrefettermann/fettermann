/**
 * dojoRoute.ts
 * 
 * Router para acesso a funcionalidade de dojos.
 * 
 * @author Andre Fettermann
 **/

import express from 'express';

const router = express.Router();

var mensagem = "";
var totalHorarios = 0;

function setDoc(req: any) {
    var doc_horarios = [];
    if (totalHorarios > 0) {
        for (var i=0; i<req.body.total_horarios; i++) {
            const horario = req.body['horario_' + (i+1)];
            if (horario) {
                const doc_horario = {
                    'horario':horario
                }
                doc_horarios.push(doc_horario);
            }
        }
    }
    
    const doc = {
        'nome': req.body.nome,
        'endereco': req.body.endereco,
        'bairro': req.body.bairro,
        'cidade': req.body.cidade,
        'uf': req.body.uf,
        'pais': req.body.pais,
        'url': req.body.url,
        'email': req.body.email,
        'id_professor': req.body.professor_id,
        doc_horarios
    }

    return doc;
}

/* Busca todos os dojos */
router.get('/', async (req, res, next) => {
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/dojos/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            //const docs = await response.json();
            const dojos: any = await response.json();
            res.render('dojos',
                {
                    title: 'Dojos cadastrados',
                    dojos,
                    total: dojos.length,
                    mensagem
                }
            );
        }
        mensagem = "";
    } catch (err) {
        next(err);
    }
});

router.get('/novo', async (req, res, next) => {
    try {
        const responsePessoas = await fetch(`${req.protocol}://${req.host}/api/pessoas/`);
        if (!responsePessoas.ok) {
            throw new Error(`HTTP error! Pessoas status: ${responsePessoas.status}`);
        }

        const docsPessoas = await responsePessoas.json();
        res.render('dojo',
            {
                title: 'Dados do dojo (Inclusão)',
                doc: "",
                docs_pessoas: docsPessoas,
                action: '/dojos/inclui/'
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/detalhes/:id', async (req, res, next) => {
    var id = req.params.id;

    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/dojo/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const doc = await response.json();
        res.render('dojo_detalhes',
            {
                title: 'Dados do dojo (Consulta)',
                doc: doc[0],
                action: '/dojos/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.get('/edita/:id', async (req, res, next) => {
    var id = req.params.id;

    try {
        const responsePessoas = await fetch(`${req.protocol}://${req.host}/api/pessoas/`);
        if (!responsePessoas.ok) {
            throw new Error(`HTTP error! Pessoas status: ${responsePessoas.status}`);
        }

        const docsPessoas = await responsePessoas.json();

        const response = await fetch(`${req.protocol}://${req.host}/api/dojo/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const doc = await response.json();
        res.render('dojo',
            {
                title: 'Dados do dojo (Edição)',
                doc,
                docs_pessoas: docsPessoas,
                action: '/dojos/altera/' + id
            }
        );
    } catch (err) {
        next(err);
    }
});

router.post('/inclui', async (req, res, next) => {
    var doc = setDoc(req);
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/dojo/`, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(doc) // Convert data to JSON string for the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        mensagem = 'Dojo incluído com sucesso!';
        res.redirect('/dojos');
    } catch (err) {
        next(err);
    }
});

router.post('/altera/:id', async (req, res, next) => {
    var id = req.params.id;
    var doc = setDoc(req);
    try {
        const response = await fetch(`${req.protocol}://${req.host}/api/dojo/${id}`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(doc) // Convert data to JSON string for the request body
        });
        mensagem = 'Dojo alterado com sucesso!';
        res.redirect('/dojos');
    } catch (err) {
        next(err);
    }
})

export default router;
