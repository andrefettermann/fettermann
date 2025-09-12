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
        'ordem': parseInt(req.body.ordem),
        'nome': req.body.nome,
        'faixa': req.body.faixa,
        'minimo_horas_treino_exame': parseInt(req.body.horas_exame),
        'minimo_tempo_exame': parseInt(req.body.meses_exame),
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
        const result: any = await repositorio.findAll('GetGraduacoes');
        if (result.result = "Success") {
            result.docs.sort((a: { ordem: number; }, b: { ordem: number; }) => {
                //var fa = a.nome.toLowerCase();
                //var fb = b.nome.toLowerCase();

                if (a.ordem < b.ordem) {
                    return -1;
                }
                if (a.ordem > b.ordem) {
                    return 1;
                }
                return 0;
            });

           return res.status(200).json(result.docs)
        } else {
            res.status(500).json({ mensagem: result.error });    
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
