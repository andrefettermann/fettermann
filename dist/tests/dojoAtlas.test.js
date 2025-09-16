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
// npm test dojoAtlasFunctions.test
describe('Dojos repository com Atlas Functions', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, realmClient_1.login)("", "");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, realmClient_1.logout)();
    }));
    test('deveria retornar todos os dojos', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.findAll('GetDojos');
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test.only('deveria retornar o dojo pelo id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield repositorio.find('GetDojo', '68acfce3dd14e40a73a6eb54');
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
        }
    }));
    test('deveria incluir', () => __awaiter(void 0, void 0, void 0, function* () {
        var doc = {
            nome: 'Teste de inclusao com sucesso',
            endereco: 'Teste',
            cidade: 'Teste',
            uf: 'RJ',
            pais: 'BR',
            url: 'wwww',
            email: '@email',
            horarios: [],
            id_professor: '6876d21a80066b9538e06444'
        };
        try {
            const response = yield repositorio.insert('PostDojo', doc);
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
    test('deveria alterar', () => __awaiter(void 0, void 0, void 0, function* () {
        var doc = {
            nome: 'Teste de alteracao com sucesso',
            endereco: 'Teste 2',
            cidade: 'Teste',
            uf: 'RJ',
            pais: 'BR',
            url: 'wwww',
            email: '@email',
            horarios: [],
            id_professor: '6876d21a80066b9538e06444'
        };
        try {
            const response = yield repositorio.update('PatchDojo', '68acfce3dd14e40a73a6eb54', doc);
            console.log(">>>>> " + response.sucesso);
            expect(response.sucesso).toBe(true);
        }
        catch (err) {
            console.log(err);
            expect(err).toBeNull();
        }
    }));
});
