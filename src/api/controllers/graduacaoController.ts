/**
 *  graduacaoController.ts
 * 
 *  Controller de graduacao.
 * 
 * @author Andre Fettermann
 */

import { Request, Response, NextFunction } from 'express';
import * as repositorio from "../repositories/atlasAppRepository";
import { decripta } from '../../utils/crypto';

function setDoc(req: any) {
    var doc = {
        'ordem': req.body.ordem,
        'nome': req.body.nome,
        'faixa': req.body.faixa,
        'minimo_horas_treino_exame': req.body.horas_exame,
        'minimo_tempo_exame': req.body.meses_exame,
        'categoria': req.body.categoria,
        'observacoes': req.body.observacoes
    }

    return doc;
}

async function buscaPeloId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response: any = await repositorio.find('GetGraduacao', id);
        if (response.sucesso) {
            response.doc.pessoas.forEach((a: any) => {
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
        const doc: any = await repositorio.findAll('GetGraduacoes');
        if (doc.result = "Success") {
           return res.status(200).json(doc.docs)
        } else {
            res.status(500).json({ mensagem: doc.error });    
        }        
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: error });
    }
}

async function inclui(req: Request, res: Response, next: NextFunction) {
    const dados = setDoc(req);
    try {
        const response: any = await repositorio.insert('PostGraduacao', dados);
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
        const response: any = await repositorio.update('PatchGraduacao', id, dados);
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
    buscaPeloId,
    buscaTodos,
    inclui,
    atualiza
}
