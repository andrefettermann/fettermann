// tests/userController.test.ts
import { IGraduacao } from "src/models/graduacao";
import { db, close } from "../db";
import * as repositorio from "../repositories/apiGraduacaoRepository";

describe('Pessoa repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('deveria incluir', async () => {
    var doc = {
      ordem: 100,
      nome: 'Teste de inclusao com sucesso',
      faixa: 'Dourada'
    }

    try {
      const response: IGraduacao | any = await repositorio.createGraduacao(doc);
      expect(response.ordem).toBe(100);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

  test('deveria alterar', async() => {
    var doc = {
      ordem: 100,
      nome: 'Teste de alteracao com sucesso',
      faixa: 'Prateada'
    }
    try {
      const response: IGraduacao | any = await repositorio.updateGraduacao("688a968854488e9b3a033299", doc);
      expect(response.faixa).toBe('Prateada');
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

  test.only('deveria excluir', async() => {
    try {
      const response: IGraduacao | any = await repositorio.deleteGraduacao("688a968854488e9b3a033299");
      expect(response.deletedCount).toBe(1);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

  test('deveria retornar uma graduacao pelo id', async () => {
    try {
      const response: any = await repositorio.getGraduacao('687ebd93337f4a6e6cc653ea');
      expect(response.nome).toBe('6º Kyu');
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar todas as graduacoes', async () => {
    try {
      const graduacoes: any = await repositorio.getGraduacoes();
      expect(graduacoes.length).toBe(11);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

});
