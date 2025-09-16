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
const crypto = __importStar(require("../utils/crypto"));
describe('Pessoa repository', () => {
    test('should encrypt and decrypt', () => __awaiter(void 0, void 0, void 0, function* () {
        const encrypted = crypto.encrypt('André Fettermann de Andrade');
        const decrypted = crypto.decrypt(encrypted);
        expect(decrypted).toBe('André Fettermann de Andrade');
    }));
    test('should decrypt', () => __awaiter(void 0, void 0, void 0, function* () {
        let encrypted = '0f7a7d5ba20b93fc16f533d655f7431a8c3a27a9ab4c4a80a6d41caf9c3f5ea2';
        const decrypted = crypto.decrypt(encrypted);
        expect(decrypted).toBe('André Fettermann');
    }));
    test.only('should encrypt', () => __awaiter(void 0, void 0, void 0, function* () {
        const encrypted = crypto.encripta('André Fettermann');
        expect(encrypted).toBe('464c45306073c3eed23d08bb6bf384fa:930377a3c3c246ab85756c1b5f1fb434');
    }));
    test.only('should decrypt', () => __awaiter(void 0, void 0, void 0, function* () {
        let encrypted = '5a2b463ff2718bae988d6b5bcf7c0978:816d16a6833604cc5bb08c6775a7bcec';
        const decrypted = crypto.decripta(encrypted);
        expect(decrypted).toBe('954.520.797-34');
    }));
});
