"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
const mongodb = __importStar(require("mongodb"));
const mongoose_1 = require("mongoose");
;
const PessoaSchema = new mongoose_1.Schema({
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
    id_dojo: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    id_graduacao: {
        type: mongodb.ObjectId,
        default: null,
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
            //            graduacao: {
            //                type: String,
            //                required: true
            //            },
            id_graduacao: {
                type: mongodb.ObjectId,
                default: null,
                required: false
            },
        }
    ]
});
const Pessoa = (0, mongoose_1.model)('pessoas', PessoaSchema);
exports.Pessoa = Pessoa;
