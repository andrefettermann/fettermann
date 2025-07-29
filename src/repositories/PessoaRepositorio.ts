import { Document, ObjectId } from "mongodb";
import { PessoaSchema } from "../models/schema";
import { decripta, encripta } from "../utils/crypto";
import Dojo from "../models/dojo";

const lookupDojo = {
    $lookup: {
        from: "dojos",
        localField: "codigo_dojo",
        foreignField: "codigo",
        as: "dojo"
    }
}

const lookupGraduacao = {
    $lookup: {
        from: "graduacoes",
        localField: "codigo_graduacao",
        foreignField: "_id",
        as: "grads"
    }
}

export async function findAll() {
    return new Promise(async (resolve, reject) => {
        await PessoaSchema.aggregate([lookupDojo])
        .then((response) => {
            resolve(response);
        })
        .catch((err)=>reject(err))}
    )};

export async function find(oId: string) {
    return new Promise(async (resolve, reject) => {
        await PessoaSchema.aggregate([
            {
                $match: {"_id": new ObjectId(oId)}
            },  
            lookupDojo
            ])
        .then((response) => {
            resolve(response);
        })
        .catch((err)=>reject(err));
    });
}

export async function findBySituacao(aSituacao: string) {
    return new Promise(async (resolve, reject) => {
        await PessoaSchema.aggregate([
            {
                $match: {'situacao': aSituacao}
            },  
            lookupDojo
        ]).then((response) => {
            resolve(response);
        })
        .catch((err) => reject(err));
    });
}

export async function findByAniversarioMes(oMes: string) {
    return new Promise(async (resolve, reject) => {
        await PessoaSchema.aggregate([
            {
                $match: {'aniversario': { $regex: oMes + '$', $options: 'i' }}
            },  
            lookupDojo
        ]).then((response) => {
            resolve(response);
        }).catch((err) => reject(err));
    });
}