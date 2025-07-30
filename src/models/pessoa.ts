import { Decimal128, model, Schema } from "mongoose";

// Pessoa.ts
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

const PessoaSchema = new Schema<IPessoa>({
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

const Pessoa = model<IPessoa>('pessoas', PessoaSchema);

export { Pessoa, IPessoa };