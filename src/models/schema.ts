// models/schema.ts
import { Decimal128, ObjectId, Schema, model } from 'mongoose';
import Joi, { required } from 'joi';

export const PessoaSchemaValidate = Joi.object({
    nome: Joi.string().required(),
});

interface IPessoa {
    aniversario: string,
    matricula: string,
    nome: string,
    situacao: string,
    cpf: string,
    data_inicio_aikido: string,
    data_matricula: string,
    codigo_dojo: string,
    graduacao_atual: string,
    pagamentos : [{
        data: Date,
        valor_devido: Decimal128,
        valor_pago: Decimal128,
        descricao: String,
        observacoes: String
    }],
    promocoes: [{
        data: Date,
        graduacao: string,
        codigo_graduacao: string
    }]
};

const pessoaSchema = new Schema<IPessoa>({
    aniversario: {
        type: String,
        required: false
    },
    matricula: {
        type: String,
        required: false
    },
    nome: {
        type: String,
        required: true
    },
    situacao: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: false
    },
    data_inicio_aikido: {
        type: String,
        required: false
    },
    data_matricula: {
        type: String,
        required: false
    },
    codigo_dojo: {
        type: String,
        required: false
    },
    graduacao_atual: {
        type: String,
        required: false
    },
    pagamentos: [
        {
            data: {
                type: Date,
                required: true
            },
            valor_devido: {
                type: Number,
                required: false
            },
            valor_pago: {
                type: Number,
                required: true
            },
            descricao: {
                type: String,
                required: false
            },
            observacoes: {
                type: String,
                required: false
            },
        }
    ],
    promocoes: [
        {
            data: {
                type: Date,
                required: true
            },
            graduacao: {
                type: String,
                required: true
            }
        }
    ]
})

interface IDojo {
    codigo: string,
    nome: string,
    endereco: string,
    cidade: string,
    uf: string,
    pais: string,
    url: string,
    email: string,
    professor_id: ObjectId
    horarios: [
        {
            horario: string
        }
    ]
};

const dojoSchema = new Schema<IDojo>({
    codigo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    professor_id: {
        type: String,
        required: false
    },
    horarios: [
        {
            horario: {
                type: String,
                required: false
            },
        }
    ],
})

interface IGraduacao {
    id: string,
    ordem: number,
    nome: string,
    faixa: string,
};

const graduacaoSchema = new Schema<IGraduacao>({
    id: {
        type: String,
        required: false
    },
    ordem: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    faixa: {
        type: String,
        required: false
    }
})

export const PessoaSchema = model<IPessoa>('pessoas', pessoaSchema )
export const DojoSchema = model<IDojo>('dojos', dojoSchema )
export const GraduacaoSchema = model<IGraduacao>('graduacoes', graduacaoSchema )
