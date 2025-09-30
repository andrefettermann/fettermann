/**
 *  dojoController.ts
 * 
 *  Controller de dojo.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import * as repositorio from "../../repositories/atlasAppRepository";
import { decripta } from '../../utils/crypto';

var totalHorarios = 0;

function setDoc(req: any) {
    const doc = {
        'nome': req.body.nome,
        'local': req.body.local,
        'endereco': req.body.endereco,
        'bairro': req.body.bairro,
        'cidade': req.body.cidade,
        'uf': req.body.uf,
        'pais': req.body.pais,
        'url': req.body.url,
        'email': req.body.email,
        'id_professor': req.body.professor_id,
        'horarios': req.body.horarios
    }

    return doc;
}

async function busca(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response: any = await repositorio.find('GetDojo', id);
        if (response.sucesso) {
            if (response.doc.professor[0])
                response.doc.professor[0].nome = 
                    decripta(response.doc.professor[0].nome);

            response.doc.alunos.forEach((a: any) => {
                a.nome = decripta(a.nome);
            })
            return res.status(200).send(response.doc)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: error });
    }
}

async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await repositorio.findAll('GetDojos');
        if (response.sucesso) {
            response.docs.forEach((element: any) => {
                element.professor.forEach((p: any) =>{
                    if (p.nome) p.nome = decripta(p.nome);
                })
            });
           return res.status(200).send(response.docs)
        } else {
            res.status(500).json({ mensagem: response.error });    
        }        
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    const dados = setDoc(req);
    try {
        const response: any = await repositorio.insert('PostDojo', dados);
        if (response.sucesso) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ mensagem: response.error });
        }
    } catch (error) {
        console.log("e: " + error)
        res.status(500).json({ mensagem: error });
    }
}

async function atualiza(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const dados = setDoc(req) ;

    try {
        const response: any = await repositorio.update('PatchDojo', id, dados);
        if (response.success) {
            res.status(201).json(response);
        
        } else {
            res.status(500).json({ mensagem: response.error });
        }
    } catch (error) {
        console.log("e: " + error)
        res.status(500).json({ mensagem: error });
    }
}

export default {
    busca,
    buscaTodos,
    inclui,
    atualiza
}
