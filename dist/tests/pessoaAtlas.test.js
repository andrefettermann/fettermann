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
const repositorio = __importStar(require("../api/repositories/atlasAppRepository"));
const realmClient_1 = require("../realmClient");
const crypto_1 = require("../utils/crypto");
describe('Pessoas repository com Atlas Functions', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, realmClient_1.login)("", "");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, realmClient_1.logout)();
    }));
    test('deveria retornar todas as pessoas', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.findAll('GetPessoas');
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria retornar os aniversariantes do mes informado', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.findAllBy('GetAniversariantes', 8);
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria retornar as pessoas em atividade', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.findAllBy('GetPessoasSituacao', 'Ativo');
            //console.log(response)
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria retornar as pessoas inativas', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.findAllBy('GetPessoasSituacao', 'Inativo');
            //console.log(response)
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria retornar a pessoa pelo id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.find('GetPessoa', '68836238624ac36ce1d37dac');
            console.log(response);
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria incluir uma pessoa', () => __awaiter(void 0, void 0, void 0, function* () {
        const dados = {
            aniversario: '01/01',
            matricula: '',
            nome: (0, crypto_1.encripta)('Teste unitario'),
            situacao: 'Ativo',
            cpf: (0, crypto_1.encripta)('123.456.789-10'),
            data_inicio_aikido: '01/01',
            data_matricula: '01/01',
            pagamentos: [],
            promocoes: [],
            id_dojo: '688bf3b6670789903d6d15e4',
            id_graduacao: '687ecaa2e04853cb4ac79b8c'
        };
        try {
            const response = yield repositorio.insert('PostPessoa', dados);
            console.log(response);
            expect(response.success).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria atualizar uma pessoa', () => __awaiter(void 0, void 0, void 0, function* () {
        const dados = {
            aniversario: '02/02',
            matricula: '',
            nome: (0, crypto_1.encripta)('Teste unitario de alteracao'),
            situacao: 'Ativo',
            cpf: (0, crypto_1.encripta)('123.456.789-10'),
            data_inicio_aikido: '01/01',
            data_matricula: '01/01',
            pagamentos: [],
            promocoes: [],
            id_dojo: '688bf3b6670789903d6d15e4',
            id_graduacao: '687ecaa2e04853cb4ac79b8c'
        };
        try {
            const response = yield repositorio.update('PatchPessoa', '68afbb081f53025a4fa19440', dados);
            console.log(response);
            expect(response.success).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
});
