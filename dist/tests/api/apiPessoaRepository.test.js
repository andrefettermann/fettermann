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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/userController.test.ts
const db_1 = require("../../db");
const repositorio = __importStar(require("../../api/repositories/pessoaMongooseRepository"));
describe('Pessoa repository', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.db;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.close)();
    }));
    test('nao deveria incluir pessoa sem os dados obrigatorios', () => __awaiter(void 0, void 0, void 0, function* () {
        const doc = {
            'aniversario': '',
            'matricula': '',
            'nome': '',
            'situacao': '',
            'cpf': '',
            'data_inicio_aikido': '',
            'data_matricula': '',
            'codigo_dojo': '',
            'graduacao_atual': '',
            'pagamentos': [],
            'promocoes': []
        };
        try {
            const response = yield repositorio.createPessoa(doc);
            expect(response._id).toBeNull();
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria incluir uma pessoa', () => __awaiter(void 0, void 0, void 0, function* () {
        const doc = {
            'aniversario': '14/01',
            'matricula': '6327',
            'nome': 'XXX',
            'situacao': 'Inativo',
            'cpf': '',
            'data_inicio_aikido': '03/11/2013',
            'data_matricula': '03/11/2013',
            'codigo_dojo': '',
            'graduacao_atual': '1° Kyu',
            'pagamentos': [],
            'promocoes': []
        };
        try {
            const response = yield repositorio.createPessoa(doc);
            expect(response._id).not.toBeNull();
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('should update', () => __awaiter(void 0, void 0, void 0, function* () {
        //const response = await updatePessoa('', newPessoa);
    }));
    test.only('deveria retornar todas as pessoas cadastradas', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoas = yield repositorio.getPessoas();
            expect(pessoas.length).toBe(5);
        }
        catch (err) {
            console.log(err);
        }
    }));
    test('deveria retornar as pessoas em atividade', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoas = yield repositorio.getPessoasSituacao('Ativo');
            expect(pessoas.length).toBe(5);
        }
        catch (err) {
            console.log(err);
        }
    }));
    test('deveria retornar as pessoas sem atividade', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoas = yield repositorio.getPessoasSituacao('Inativo');
            expect(pessoas.length).toBe(0);
        }
        catch (err) {
            console.log(err);
        }
    }));
    test('deveria retornar os aniversariantes', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoas = yield repositorio.getPessoasAniversario('11');
            expect(pessoas.length).toBe(0);
        }
        catch (err) {
            console.log(err);
        }
    }));
    test('deveria retornar os alunos de um dojo', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoas = yield repositorio.getPessoasDojo('688bf3b6670789903d6d15e4');
            expect(pessoas.length).toBe(2);
        }
        catch (err) {
            console.log(err);
        }
    }));
    test('deveria retornar uma pessoa pelo id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoa = yield repositorio.getPessoa('68836238624ac36ce1d37dac');
            expect(pessoa.nome).toBe('2b6a1600aa0286cd252fdd9f5d825489:edd3d1b029cdeac6b1a347ab9f14c55958f32e155571a9ce11a650234c21a512');
        }
        catch (err) {
            console.log(err);
        }
    }));
});
