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
const db_1 = require("../../db");
const repositorio = __importStar(require("../../api/repositories/graduacaoMongooseRepository"));
describe('Pessoa repository', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.db;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, db_1.close)();
    }));
    test('deveria incluir', () => __awaiter(void 0, void 0, void 0, function* () {
        var doc = {
            ordem: 100,
            nome: 'Teste de inclusao com sucesso',
            faixa: 'Dourada'
        };
        try {
            const response = yield repositorio.createGraduacao(doc);
            expect(response.ordem).toBe(100);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria alterar', () => __awaiter(void 0, void 0, void 0, function* () {
        var doc = {
            ordem: 100,
            nome: 'Teste de alteracao com sucesso',
            faixa: 'Prateada'
        };
        try {
            const response = yield repositorio.updateGraduacao("688a968854488e9b3a033299", doc);
            expect(response.faixa).toBe('Prateada');
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria excluir', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.deleteGraduacao("688a968854488e9b3a033299");
            expect(response.deletedCount).toBe(1);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test.only('deveria retornar uma graduacao pelo id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.getGraduacao('687eca2600d5db1747476461');
            expect(response.nome).toBe('3º Kyu');
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria retornar todas as graduacoes', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const graduacoes = yield repositorio.getGraduacoes();
            expect(graduacoes.length).toBe(11);
        }
        catch (err) {
            expect(err).toBeNull();
        }
    }));
});
