"use strict";
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
const date_1 = require("../utils/date");
describe('Utilitarios de data', () => {
    test('deveria converter para data', () => __awaiter(void 0, void 0, void 0, function* () {
        const dataConvertida = (0, date_1.convertDdMmYyyyToDate)('19/11/2022');
        console.log(dataConvertida);
        const data = new Date("2022-11-19");
        expect(dataConvertida).toBe(data);
    }));
    test('deveria formatar a data', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = new Date('2022-11-19T00:00:00.000Z');
        const dataFormatada = (0, date_1.formatDateDDMMAAAA)(date);
        expect(dataFormatada).toBe('19/11/2022');
    }));
});
